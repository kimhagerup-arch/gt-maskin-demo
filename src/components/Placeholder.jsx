import { cx } from "../lib/format";

/**
 * Plassholder med skrå striper der bilde eller innhold mangler.
 * tone: "dark" (på mørk flate) eller "light" (på lys flate).
 */
export default function Placeholder({ label, tone = "dark", className, children }) {
  const dark = tone === "dark";
  return (
    <div
      className={cx(
        "flex items-center justify-center p-4 text-center text-[13px] font-semibold tracking-wider",
        dark
          ? "bg-brand-primary-soft bg-stripes-dark text-brand-placeholder"
          : "bg-brand-surface bg-stripes-light text-brand-muted",
        className,
      )}
    >
      {children || <span>{label}</span>}
    </div>
  );
}
