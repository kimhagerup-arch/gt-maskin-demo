// Tegner USA-flagget én gang som tekstur på et canvas, fra riktig geometri:
// proporsjon 10:19, 13 striper, 50 stjerner i 9 rader (seks og fem vekselvis),
// og stjernefeltet 2/5 av bredden og 7/13 av høyden. Fargene leses fra
// flagg-tokenene på :root, så flagget bruker designsystemets farger.
// Brukes av WavingFlag (WebGL) og av reserveløsningen (stillbilde med folder).

export const FLAG_W = 1140;
export const FLAG_H = 600;

const STRIPE = FLAG_H / 13;
const CANTON_W = FLAG_W * 0.4;
const CANTON_H = STRIPE * 7;

/** Farge-token («178 34 52») fra :root som «rgb(178 34 52)». */
export function token(name, fallback) {
  if (typeof document === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value ? `rgb(${value})` : fallback;
}

export function flagColors() {
  return {
    red: token("--flag-red", "rgb(178 34 52)"),
    white: token("--flag-white", "rgb(255 255 255)"),
    blue: token("--flag-blue", "rgb(60 59 110)"),
  };
}

function star(ctx, cx, cy, r) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? r : r * 0.4;
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

/** Flagget som canvas (FLAG_W × FLAG_H). */
export function drawFlag(scale = 1) {
  const canvas = document.createElement("canvas");
  canvas.width = FLAG_W * scale;
  canvas.height = FLAG_H * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.scale(scale, scale);
  const { red, white, blue } = flagColors();
  for (let i = 0; i < 13; i++) {
    ctx.fillStyle = i % 2 === 0 ? red : white;
    ctx.fillRect(0, i * STRIPE, FLAG_W, STRIPE + 0.6);
  }
  ctx.fillStyle = blue;
  ctx.fillRect(0, 0, CANTON_W, CANTON_H);
  ctx.fillStyle = white;
  const rows = 9;
  const dy = CANTON_H / (rows + 1);
  const dx = CANTON_W / 12;
  for (let r = 0; r < rows; r++) {
    const cols = r % 2 === 0 ? 6 : 5;
    for (let c = 0; c < cols; c++) {
      star(ctx, dx + c * dx * 2 + (r % 2 === 0 ? 0 : dx), dy * (r + 1), STRIPE * 0.34);
    }
  }
  return canvas;
}

/**
 * Bølgen som brukes både i WebGL (vertex shader) og i stillbildet: tre bølger med
 * ulik lengde og fart fra stangsiden (x = 0) mot den frie enden (x = 1), med
 * større utslag ytterst. Returnerer høyden (-1 til 1, før skalering med x).
 */
export const WAVES = [
  { k: 6.3, speed: 1.7, amp: 0.55, ky: 1.2 },
  { k: 11.0, speed: 2.6, amp: 0.3, ky: 2.7 },
  { k: 2.8, speed: 0.9, amp: 0.25, ky: 0.6 },
];

export function waveHeight(x, y, t) {
  let h = 0;
  for (const w of WAVES) h += w.amp * Math.sin(w.k * x - w.speed * t + w.ky * y);
  return h * (0.15 + 0.85 * x);
}

/**
 * Stillbilde med folder og lys (reserveløsningen): flagget tegnes kolonne for
 * kolonne med en liten vertikal forskyvning fra bølgen, og lyset legges på
 * etterpå (lysere på toppene, mørkere i dalene). Ingen skjøter, bare 1 px
 * kolonner av samme bilde.
 */
export function drawStillFlag(width, height, crop = "center") {
  const base = drawFlag(1);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  // Utsnitt: dekk flaten (som object-fit: cover), anker venstre, midten eller høyre.
  const scale = Math.max(width / FLAG_W, height / FLAG_H);
  const drawW = FLAG_W * scale;
  const drawH = FLAG_H * scale;
  const offsetX = crop === "left" ? 0 : crop === "right" ? width - drawW : (width - drawW) / 2;
  const offsetY = (height - drawH) / 2;
  const t = 1.3;
  const amplitude = height * 0.028;
  const cols = width;
  for (let i = 0; i < cols; i++) {
    const x = i / cols;
    const dy = waveHeight(x, 0.5, t) * amplitude;
    const sx = ((i - offsetX) / drawW) * FLAG_W;
    if (sx < 0 || sx >= FLAG_W) continue;
    ctx.drawImage(base, Math.floor(sx), 0, 1, FLAG_H, i, offsetY + dy, 1, drawH);
  }
  // Lys i foldene: helningen gir lys ovenfra (ned mot dalene blir mørkere).
  const light = ctx.createImageData(width, 1);
  for (let i = 0; i < width; i++) {
    const x = i / cols;
    const slope = (waveHeight(x + 0.002, 0.5, t) - waveHeight(x - 0.002, 0.5, t)) / 0.004;
    const shade = Math.max(-1, Math.min(1, slope * 0.11));
    const v = shade > 0 ? 255 : 0;
    const a = Math.min(0.42, Math.abs(shade) * 0.5);
    light.data.set([v, v, v, Math.round(a * 255)], i * 4);
  }
  const strip = document.createElement("canvas");
  strip.width = width;
  strip.height = 1;
  strip.getContext("2d").putImageData(light, 0, 0);
  ctx.drawImage(strip, 0, 0, width, 1, 0, 0, width, height);
  return canvas;
}
