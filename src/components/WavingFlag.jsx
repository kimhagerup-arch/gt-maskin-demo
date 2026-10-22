import { useEffect, useMemo, useRef, useState } from "react";
import { cx } from "../lib/format";

const SLICES = 14;
const W = 1140;
const H = 600;
const STRIPE = H / 13;
const CANTON_W = W * 0.4;
const CANTON_H = STRIPE * 7;
const STAR =
  "M0,-10 L2.9,-3.1 L10,-3.1 L4.3,1.2 L6.2,8.1 L0,4 L-6.2,8.1 L-4.3,1.2 L-10,-3.1 L-2.9,-3.1 Z";

/** 50 stjerner: ni rader som veksler mellom seks og fem. */
function stars() {
  const out = [];
  const rows = 9;
  const dy = CANTON_H / (rows + 1);
  const dx = CANTON_W / 12;
  for (let r = 0; r < rows; r++) {
    const cols = r % 2 === 0 ? 6 : 5;
    for (let c = 0; c < cols; c++) {
      out.push({ x: dx + c * dx * 2 + (r % 2 === 0 ? 0 : dx), y: dy * (r + 1) });
    }
  }
  return out;
}

/** Leser et farge-token («178 34 52») fra :root, så flagget bruker designsystemets farger. */
function token(name) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return `rgb(${value})`;
}

/** Hele flagget som én SVG (13 striper, 50 stjerner) kodet som data-URI til CSS-bakgrunn. */
function flagDataUri() {
  const red = token("--flag-red");
  const white = token("--flag-white");
  const blue = token("--flag-blue");
  const stripes = Array.from(
    { length: 13 },
    (_, i) =>
      `<rect y="${(i * STRIPE).toFixed(2)}" width="${W}" height="${(STRIPE + 0.5).toFixed(2)}" fill="${i % 2 === 0 ? red : white}"/>`,
  ).join("");
  const starPaths = stars()
    .map(
      (s) =>
        `<path d="${STAR}" transform="translate(${s.x.toFixed(1)} ${s.y.toFixed(1)}) scale(1.5)" fill="${white}"/>`,
    )
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${stripes}<rect width="${CANTON_W}" height="${CANTON_H.toFixed(2)}" fill="${blue}"/>${starPaths}<linearGradient id="s" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0.18"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.12"/><stop offset="1" stop-color="#000" stop-opacity="0.22"/></linearGradient><rect width="${W}" height="${H}" fill="url(#s)"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * USA-flagg som vaier i vinden, laget i SVG og CSS uten video og uten bibliotek:
 * riktige proporsjoner (10:19), 13 striper og 50 stjerner. Flagget er én SVG
 * (data-URI) som bakgrunn på 14 vertikale skiver, og skivene beveger seg opp og
 * ned i en bølge (bare transform), så nettleseren tegner flagget én gang og
 * flytter bare skivene. Monteres først når rammen nærmer seg skjermen, pauser
 * utenfor skjermen og i skjult fane, og står stille ved prefers-reduced-motion
 * (index.css). Ligger dempet på mørk bunn. Ren pynt: aria-hidden.
 */
export default function WavingFlag({ className, opacity = 0.3 }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setNear(true);
      setInView(true);
      return undefined;
    }
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          nearObserver.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    const viewObserver = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    nearObserver.observe(el);
    viewObserver.observe(el);
    return () => {
      nearObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  const image = useMemo(() => (near ? flagDataUri() : null), [near]);

  return (
    <div
      ref={ref}
      className={cx("flag-wave pointer-events-none select-none", !inView && "is-still", className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      {image && (
        <div className="flex h-full w-full">
          {Array.from({ length: SLICES }, (_, i) => (
            <span
              key={i}
              className="flag-slice block h-full flex-1"
              style={{
                "--i": i,
                backgroundImage: image,
                backgroundSize: `${SLICES * 100}% 100%`,
                backgroundPosition: `${(i / (SLICES - 1)) * 100}% 0`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
