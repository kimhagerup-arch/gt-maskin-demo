import { useId } from "react";
import { cx } from "../lib/format";

/**
 * Pinstriping, tegnet for hånd i SVG: en hovedlinje med løkke, en tynnere
 * følgelinje og små dråper i endene. Venstre halvdel speiles om midten, og
 * i midten sitter en spiss. Varianten «under» speiles vertikalt.
 */
function Pinstripe({ flip = false, className }) {
  const half = (
    <>
      <path
        d="M95 16 C 84 16, 79 8, 66 8.5 C 57 9, 53 15, 45 15 C 38 15, 35 8.5, 41 8 C 47 7.5, 45 16, 36 17 C 27 18, 20 13, 10 15 C 6 15.8, 3 17, 1 18.5"
        strokeWidth="1.5"
      />
      <path
        d="M92 20.5 C 85 21, 80 19, 72 19.6 C 66 20, 61 23.5, 52 22.5 C 48 22, 46 20.5, 44 19.5"
        strokeWidth="1"
      />
      <path d="M31 22 C 27 22.5, 23 24, 15 23.5" strokeWidth="1" />
      <path
        d="M0.3 18.6 C 2 17.5, 4 16.5, 6 16.2 C 4 17.5, 2.5 18.6, 0.3 18.6 Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M14.6 23.5 C 16 22.6, 18 22.3, 20 22.6 C 18 23.5, 16.5 24.2, 14.6 23.5 Z"
        fill="currentColor"
        stroke="none"
      />
    </>
  );
  return (
    <svg
      viewBox="0 0 200 30"
      className={cx("h-auto w-full text-brand-accent", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g
        transform={flip ? "translate(0 30) scale(1 -1)" : undefined}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {half}
        <g transform="translate(200 0) scale(-1 1)">{half}</g>
        <path d="M100 7.5 L 102.4 16 L 100 24.5 L 97.6 16 Z" fill="currentColor" stroke="none" />
        <circle cx="100" cy="16" r="0.8" className="fill-brand-primary" stroke="none" />
      </g>
    </svg>
  );
}

const RIVETS = ["left-2 top-2", "right-2 top-2", "left-2 bottom-2", "right-2 bottom-2"];

/**
 * Kustom-emblem for hero: mørkt emaljeskilt med dobbel kant, nagler i hjørnene,
 * pinstriping over og under, skriptfont på «Kustom» og bred Bebas på «Speedshop».
 * All pynt er aria-hidden, teksten er ekte tekst. Eneste bevegelse er en svak glans
 * ved hover på desktop; med prefers-reduced-motion slås overgangen av globalt.
 */
export default function KustomEmblem({ badge, className }) {
  const noiseId = useId();

  return (
    <div
      className={cx(
        "group relative w-[204px] -rotate-3 rounded-[14px] border-[3px] border-brand-primary-dark bg-gradient-to-br from-brand-primary-light via-brand-primary to-brand-primary-dark text-center text-brand-text-inverse shadow-2xl shadow-brand-primary-dark/80 md:w-[236px]",
        className,
      )}
      data-emblem
    >
      {/* Svak støytekstur som slitt emalje */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full rounded-[11px] opacity-[0.14] mix-blend-screen"
        aria-hidden="true"
        focusable="false"
      >
        <filter id={noiseId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${noiseId})`} />
      </svg>

      {/* Kobberlinje innenfor den mørke rammen */}
      <div
        className="pointer-events-none absolute inset-[5px] rounded-[9px] border border-brand-accent/80"
        aria-hidden="true"
      />

      {/* Nagler */}
      {RIVETS.map((pos) => (
        <span
          key={pos}
          className={cx(
            "pointer-events-none absolute h-[7px] w-[7px] rounded-full bg-gradient-to-br from-brand-muted-inverse via-brand-outline to-brand-primary-dark shadow-[0_1px_0_rgb(var(--brand-text-inverse)/0.25)]",
            pos,
          )}
          aria-hidden="true"
        />
      ))}

      {/* Glans ved hover (desktop) */}
      <div
        className="pointer-events-none absolute inset-0 hidden rounded-[11px] bg-gradient-to-br from-brand-text-inverse/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center px-5 pb-3.5 pt-3 md:px-6 md:pb-4">
        <Pinstripe className="w-[128px] md:w-[148px]" />
        <span className="-mt-1 block h-[38px] font-script text-[34px] leading-[38px] text-brand-accent-light md:h-[42px] md:text-[38px] md:leading-[42px]">
          {badge.script}
        </span>
        <span className="block font-display text-[26px] uppercase leading-none tracking-[0.26em] md:text-[29px]">
          {badge.main}
        </span>
        <span className="mt-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.32em] text-brand-muted-inverse before:block before:h-px before:w-4 before:bg-brand-accent/70 after:block after:h-px after:w-4 after:bg-brand-accent/70">
          {badge.place}
        </span>
        <Pinstripe flip className="mt-0.5 w-[128px] md:w-[148px]" />
        <p className="mt-1 text-[12px] font-semibold leading-snug text-brand-text-inverse md:text-[13px]">
          {badge.text}
        </p>
      </div>
    </div>
  );
}
