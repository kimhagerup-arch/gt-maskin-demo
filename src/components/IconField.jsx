import { cx } from "../lib/format";
import Icon from "./Icon";

/**
 * Designet ikonfelt for objekter uten bilde: lucide-ikon på mørk flate med
 * aksentstrek og stille skråstriper. Ser ferdig ut, i motsetning til en plassholder.
 */
export default function IconField({ icon, label, className, size = 72 }) {
  return (
    <div
      className={cx(
        "relative flex items-center justify-center overflow-hidden bg-brand-primary bg-stripes-dark text-brand-text-inverse",
        className,
      )}
    >
      <span className="absolute inset-x-0 top-0 h-1 bg-brand-accent" aria-hidden="true" />
      <span className="absolute bottom-4 left-4 h-px w-10 bg-brand-accent" aria-hidden="true" />
      <span className="flex flex-col items-center gap-3">
        <span className="flex h-24 w-24 items-center justify-center border border-brand-border-dark-strong bg-brand-primary-light text-brand-accent-light">
          <Icon name={icon} size={size * 0.6} strokeWidth={1.5} />
        </span>
        {label && (
          <span className="font-display text-2xl tracking-[0.12em] text-brand-muted-inverse">
            {label}
          </span>
        )}
      </span>
    </div>
  );
}
