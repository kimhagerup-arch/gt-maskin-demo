import { useEffect, useRef, useState } from "react";
import { useAfterLoad } from "../hooks/useAfterLoad";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { WAVES, drawFlag, drawStillFlag } from "../lib/flagTexture";
import { cx } from "../lib/format";

const COLS = 72;
const ROWS = 36;
const MAX_DPR = 1.5;
const MOBILE_FPS = 30;
const GL_DELAY_MS = 2500;

/** GLSL krever flyttall med desimaler, så konstantene skrives som «11.000», ikke «11». */
const f = (n) => n.toFixed(3);

const VERT = `
attribute vec2 a_pos;
uniform float u_time;
uniform float u_aspect;
uniform float u_amp;
uniform vec2 u_uvScale;
uniform vec2 u_uvOffset;
varying vec2 v_uv;
varying vec3 v_normal;
varying float v_height;

float wave(float x, float y, float t) {
  float h = 0.0;
  h += ${f(WAVES[0].amp)} * sin(${f(WAVES[0].k)} * x - ${f(WAVES[0].speed)} * t + ${f(WAVES[0].ky)} * y);
  h += ${f(WAVES[1].amp)} * sin(${f(WAVES[1].k)} * x - ${f(WAVES[1].speed)} * t + ${f(WAVES[1].ky)} * y);
  h += ${f(WAVES[2].amp)} * sin(${f(WAVES[2].k)} * x - ${f(WAVES[2].speed)} * t + ${f(WAVES[2].ky)} * y);
  return h * (0.15 + 0.85 * x);
}

void main() {
  float x = a_pos.x;
  float y = a_pos.y;
  float h = wave(x, y, u_time);
  float e = 0.004;
  float dx = (wave(x + e, y, u_time) - wave(x - e, y, u_time)) / (2.0 * e);
  float dy = (wave(x, y + e, u_time) - wave(x, y - e, u_time)) / (2.0 * e);
  // Normal fra helningen: flagget ligger i xy-planet, bølgen er dybde (z).
  v_normal = normalize(vec3(-dx * u_amp * 0.9, -dy * u_amp * 0.9 / u_aspect, 1.0));
  v_height = h;
  v_uv = a_pos * u_uvScale + u_uvOffset;
  // Liten forskyvning i bildeplanet, så kantene vaier litt (sett fra siden).
  float sway = h * u_amp * 0.035;
  gl_Position = vec4(x * 2.0 - 1.0, 1.0 - y * 2.0 + sway, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform sampler2D u_tex;
uniform float u_opacity;
varying vec2 v_uv;
varying vec3 v_normal;
varying float v_height;

void main() {
  vec4 c = texture2D(u_tex, v_uv);
  vec3 n = normalize(v_normal);
  // Diffust lys ovenfra og litt forfra, svak glans på toppene, mørkere i dalene.
  vec3 light = normalize(vec3(-0.25, 0.75, 0.6));
  float diffuse = max(dot(n, light), 0.0);
  vec3 view = vec3(0.0, 0.0, 1.0);
  vec3 h = normalize(light + view);
  float spec = pow(max(dot(n, h), 0.0), 28.0) * 0.18;
  float shade = 0.56 + 0.44 * diffuse + spec + v_height * 0.05;
  gl_FragColor = vec4(c.rgb * shade, c.a) * u_opacity;
}
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/** Nett av COLS × ROWS ruter som én sammenhengende flate (indeksert, ingen skjøter). */
function buildMesh() {
  const positions = [];
  for (let r = 0; r <= ROWS; r++) {
    for (let c = 0; c <= COLS; c++) positions.push(c / COLS, r / ROWS);
  }
  const indices = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = r * (COLS + 1) + c;
      indices.push(i, i + 1, i + COLS + 1, i + 1, i + COLS + 2, i + COLS + 1);
    }
  }
  return { positions: new Float32Array(positions), indices: new Uint16Array(indices) };
}

/** Utsnitt som dekker flaten (object-fit: cover) med anker venstre, midten eller høyre. */
function coverUv(width, height, crop) {
  const flagAspect = 19 / 10;
  const canvasAspect = width / height;
  if (canvasAspect >= flagAspect) {
    const sy = flagAspect / canvasAspect;
    return { scale: [1, sy], offset: [0, (1 - sy) / 2] };
  }
  const sx = canvasAspect / flagAspect;
  const ox = crop === "left" ? 0 : crop === "right" ? 1 - sx : (1 - sx) / 2;
  return { scale: [sx, 1], offset: [ox, 0] };
}

function savesData() {
  return typeof navigator !== "undefined" && Boolean(navigator.connection?.saveData);
}

/**
 * USA-flagg i vind, tegnet i WebGL uten bibliotek: ett sammenhengende nett
 * (72 × 36 ruter) uten skjøter, med tre bølger av ulik lengde og fart fra
 * stangsiden mot den frie enden og større utslag ytterst, og lys og skygge i
 * foldene (diffust lys ovenfra, svak glans på toppene, mørkere i dalene).
 * Flagget tegnes én gang som tekstur fra riktig geometri (lib/flagTexture.js).
 *
 * Først vises et stillbilde (canvas 2D med folder og lys), WebGL tones inn
 * 2,5 s etter load, så LCP og CLS ikke påvirkes. Maks 30 bilder i sekundet på
 * mobil, oppløsning maks 1,5x. Pauser utenfor skjermen og i skjult fane.
 * Stillbildet alene ved prefers-reduced-motion, Save-Data og når WebGL mangler.
 * Vegas-modus (html.vegas) gir friskere vind. Ren pynt: aria-hidden.
 *
 * crop: «left» (stjernefeltet synlig), «right» (stripene) eller «center».
 */
export default function WavingFlag({ className, opacity = 0.3, crop = "left", speed = 1 }) {
  const wrapRef = useRef(null);
  const stillRef = useRef(null);
  const glRef = useRef(null);
  const reduced = useReducedMotion();
  const loaded = useAfterLoad();
  const [settled, setSettled] = useState(false);
  const [glReady, setGlReady] = useState(false);
  const [glFailed, setGlFailed] = useState(false);
  const inView = useRef(true);

  useEffect(() => {
    if (!loaded) return undefined;
    const timer = window.setTimeout(() => setSettled(true), GL_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  // Stillbildet: tegnes ved mount og ved endret størrelse.
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = stillRef.current;
    if (!wrap || !canvas) return undefined;
    let frame = 0;
    const draw = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      if (canvas.width === w && canvas.height === h) return;
      const still = drawStillFlag(w, h, crop);
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")?.drawImage(still, 0, 0);
    };
    draw();
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    });
    observer.observe(wrap);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [crop]);

  // Synlighet: pauser utenfor skjermen.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
    });
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  const useGl = settled && !reduced && !savesData() && !glFailed;

  // WebGL: startes først når stillbildet står og siden er lastet.
  useEffect(() => {
    if (!useGl) return undefined;
    const wrap = wrapRef.current;
    const canvas = glRef.current;
    if (!wrap || !canvas) return undefined;
    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true }) ||
      canvas.getContext("experimental-webgl");
    if (!gl) {
      setGlFailed(true);
      return undefined;
    }
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setGlFailed(true);
      return undefined;
    }
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setGlFailed(true);
      return undefined;
    }
    gl.useProgram(program);

    const mesh = buildMesh();
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.positions, gl.STATIC_DRAW);
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, drawFlag(1));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const u = {
      time: gl.getUniformLocation(program, "u_time"),
      aspect: gl.getUniformLocation(program, "u_aspect"),
      amp: gl.getUniformLocation(program, "u_amp"),
      uvScale: gl.getUniformLocation(program, "u_uvScale"),
      uvOffset: gl.getUniformLocation(program, "u_uvOffset"),
      opacity: gl.getUniformLocation(program, "u_opacity"),
    };
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const minFrameMs = mobile ? 1000 / MOBILE_FPS : 0;
    let frame = 0;
    let last = 0;
    let simTime = 0;
    let lastTick = performance.now();
    let hidden = document.visibilityState === "hidden";

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      const uv = coverUv(rect.width, rect.height, crop);
      gl.uniform2f(u.uvScale, uv.scale[0], uv.scale[1]);
      gl.uniform2f(u.uvOffset, uv.offset[0], uv.offset[1]);
      gl.uniform1f(u.aspect, rect.width / Math.max(1, rect.height));
      gl.uniform1f(u.amp, 1.0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const onVisibility = () => {
      hidden = document.visibilityState === "hidden";
      lastTick = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const render = (now) => {
      frame = requestAnimationFrame(render);
      if (hidden || !inView.current) {
        lastTick = now;
        return;
      }
      if (now - last < minFrameMs) return;
      last = now;
      const vegas = document.documentElement.classList.contains("vegas") ? 1.9 : 1;
      simTime += ((now - lastTick) / 1000) * speed * vegas;
      lastTick = now;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(u.time, simTime);
      gl.uniform1f(u.opacity, 1);
      gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0);
    };
    frame = requestAnimationFrame(render);
    setGlReady(true);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteTexture(texture);
      gl.deleteBuffer(posBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteProgram(program);
      setGlReady(false);
    };
  }, [useGl, crop, speed]);

  return (
    <div
      ref={wrapRef}
      className={cx("flag-wave pointer-events-none select-none overflow-hidden", className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas ref={stillRef} className="absolute inset-0 block h-full w-full" />
      {useGl && (
        <canvas
          ref={glRef}
          className={cx(
            "absolute inset-0 block h-full w-full transition-opacity duration-[1200ms] ease-out",
            glReady ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}
