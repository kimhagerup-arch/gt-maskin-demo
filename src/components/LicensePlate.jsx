import { cx } from "../lib/format";

const SCREWS = [
  "left-1.5 top-1.5",
  "right-1.5 top-1.5",
  "left-1.5 bottom-1.5",
  "right-1.5 bottom-1.5",
];

/**
 * Lite amerikansk bilskilt: lys plate med preget skrift, skruer i hjørnene,
 * «ALTA · NORWAY» øverst og modell og årsmodell i midten («CAMARO 69»).
 * Pynt for Min bil; hele bilen leses av skjermlesere via `label`.
 */
export default function LicensePlate({ top, main, label, className }) {
  return (
    <span
      className={cx(
        "plate relative inline-flex shrink-0 flex-col items-center justify-center px-5 py-1.5 text-brand-primary",
        className,
      )}
      role="img"
      aria-label={label}
    >
      {SCREWS.map((pos) => (
        <span key={pos} className={cx("plate-screw absolute", pos)} aria-hidden="true" />
      ))}
      <span
        className="plate-top text-[9px] font-bold uppercase tracking-[0.3em] leading-none"
        aria-hidden="true"
        translate="no"
      >
        {top}
      </span>
      <span
        className="plate-main font-display text-[26px] uppercase leading-none tracking-[0.08em]"
        aria-hidden="true"
        translate="no"
      >
        {main}
      </span>
    </span>
  );
}
