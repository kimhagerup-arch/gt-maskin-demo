import { placeholderLabels } from "../data/siteContent";
import { cx } from "../lib/format";

/**
 * Felles plassholder der bilde eller innhold mangler: stiplet kant, nedtonet
 * tekst og en liten etikett «Fylles inn». Samme uttrykk overalt.
 * tone: "dark" (på mørk flate) eller "light" (på lys flate).
 */
export default function Placeholder({ label, tone = "dark", className, children, tag = true }) {
  const dark = tone === "dark";
  return (
    <div
      className={cx(
        "relative flex items-center justify-center border border-dashed p-4 text-center text-[13px] font-semibold tracking-wider",
        dark
          ? "border-brand-outline bg-brand-primary-soft bg-stripes-dark text-brand-placeholder"
          : "border-brand-border-strong bg-brand-surface bg-stripes-light text-brand-muted",
        className,
      )}
    >
      {tag && label && (
        <span
          className={cx(
            "absolute left-2 top-2 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]",
            dark ? "bg-brand-primary text-brand-placeholder" : "bg-brand-card text-brand-muted",
          )}
        >
          {placeholderLabels.fill}
        </span>
      )}
      {children || <span>{label}</span>}
    </div>
  );
}
