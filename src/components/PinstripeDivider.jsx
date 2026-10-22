import { cx } from "../lib/format";

/**
 * Håndtegnet kustom-ornament i SVG som skille mellom seksjoner, i samme stil
 * som pinstripingen på kustom-emblemet: en hovedlinje med sløyfer og en tynn
 * følgelinje, speilet om midten, og en spiss i midten. Ingen bevegelse. Pynt,
 * aria-hidden. tone: «dark» (på mørk flate) eller «light».
 */
export default function PinstripeDivider({ tone = "dark", className }) {
  const half = (
    <>
      <path
        d="M160 18 C 146 18, 140 9, 124 9.5 C 112 10, 106 18, 94 17.5 C 86 17, 82 10, 88 9 C 95 8, 93 18, 83 19.5 C 72 21, 63 14, 48 16 C 38 17.5, 30 21, 18 20 C 11 19.5, 6 19, 1 20.5"
        strokeWidth="1.6"
      />
      <path
        d="M156 23 C 146 23.5, 139 21, 128 21.6 C 120 22, 114 25.5, 102 24.5 C 96 24, 93 22.5, 90 21.5"
        strokeWidth="1"
      />
      <path d="M70 26 C 64 26.5, 58 28, 44 27.5" strokeWidth="1" />
      <path
        d="M0.3 20.6 C 3 19, 6 18, 9 17.8 C 6 19.5, 3.5 20.8, 0.3 20.6 Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M43.6 27.5 C 46 26.6, 48 26.3, 51 26.6 C 48.5 27.8, 46.5 28.3, 43.6 27.5 Z"
        fill="currentColor"
        stroke="none"
      />
    </>
  );
  return (
    <div
      className={cx(
        "flex justify-center overflow-hidden px-4",
        tone === "dark"
          ? "bg-brand-primary text-brand-accent"
          : "bg-brand-bg text-brand-accent-deep",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 36"
        className="h-7 w-full max-w-[640px] md:h-9"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {half}
          <g transform="translate(320 0) scale(-1 1)">{half}</g>
          <path d="M160 8 L 163 18 L 160 28 L 157 18 Z" fill="currentColor" stroke="none" />
        </g>
      </svg>
    </div>
  );
}
