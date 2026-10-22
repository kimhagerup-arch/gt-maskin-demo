import { useEffect, useRef, useState } from "react";
import { cx } from "../lib/format";

const SLICES = 14;
const W = 1140;
const H = 600;
const STRIPE = H / 13;
const CANTON_W = W * 0.4;
const CANTON_H = STRIPE * 7;

/** 50 stjerner: ni rader som veksler mellom seks og fem. */
function stars() {
  const out = [];
  const rows = 9;
  const dy = CANTON_H / (rows + 1);
  for (let r = 0; r < rows; r++) {
    const cols = r % 2 === 0 ? 6 : 5;
    const dx = CANTON_W / 12;
    for (let c = 0; c < cols; c++) {
      out.push({ x: dx + c * dx * 2 + (r % 2 === 0 ? 0 : dx), y: dy * (r + 1) });
    }
  }
  return out;
}

const STARS = stars();
const STAR =
  "M0,-10 L2.9,-3.1 L10,-3.1 L4.3,1.2 L6.2,8.1 L0,4 L-6.2,8.1 L-4.3,1.2 L-10,-3.1 L-2.9,-3.1 Z";

/**
 * USA-flagg som vaier i vinden, laget i SVG og CSS uten video og uten bibliotek:
 * riktige proporsjoner (10:19), 13 striper og 50 stjerner. Flagget er delt i
 * vertikale skiver som beveger seg opp og ned i en bølge (bare transform og
 * opacity). Ligger dempet på mørk bunn. Animasjonen pauser utenfor skjermen og i
 * skjult fane, og står stille ved prefers-reduced-motion (index.css). Ren pynt:
 * aria-hidden.
 */
export default function WavingFlag({ className, opacity = 0.35 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const id = useRef(`flag-${Math.random().toString(36).slice(2, 8)}`).current;

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "80px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const sliceW = W / SLICES;

  return (
    <div
      ref={ref}
      className={cx("flag-wave pointer-events-none select-none", !inView && "is-still", className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <g id={`${id}-flag`}>
            {Array.from({ length: 13 }, (_, i) => (
              <rect
                key={i}
                y={i * STRIPE}
                width={W}
                height={STRIPE + 0.5}
                className={i % 2 === 0 ? "fill-flag-red" : "fill-flag-white"}
              />
            ))}
            <rect width={CANTON_W} height={CANTON_H} className="fill-flag-blue" />
            {STARS.map((s) => (
              <path
                key={`${s.x}-${s.y}`}
                d={STAR}
                transform={`translate(${s.x} ${s.y}) scale(1.5)`}
                className="fill-flag-white"
              />
            ))}
          </g>
          {Array.from({ length: SLICES }, (_, i) => (
            <clipPath key={i} id={`${id}-c${i}`}>
              <rect x={i * sliceW} width={sliceW + 0.8} height={H} />
            </clipPath>
          ))}
          <linearGradient id={`${id}-shade`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#000" stopOpacity="0.18" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.12" />
            <stop offset="1" stopColor="#000" stopOpacity="0.22" />
          </linearGradient>
        </defs>
        {Array.from({ length: SLICES }, (_, i) => (
          <g key={i} className="flag-slice" style={{ "--i": i }} clipPath={`url(#${id}-c${i})`}>
            <use href={`#${id}-flag`} />
          </g>
        ))}
        {/* Lys og skygge over folden, så flagget får dybde. */}
        <rect width={W} height={H} fill={`url(#${id}-shade)`} />
      </svg>
    </div>
  );
}
