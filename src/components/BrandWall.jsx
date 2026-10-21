import { Link } from "react-router-dom";
import { cx } from "../lib/format";
import Icon from "./Icon";

/**
 * Skiltvegg med merkelogoer: hvert merke på en lys plate med lik høyde, små
 * nagler i hjørnene og diskret skygge, navnet under. Logoene er lokale SVG-er
 * (ingen eksterne kall) og vises uendret; høyden per merke settes i brands.js
 * så de får lik visuell tyngde. Merker uten ren SVG viser navnet på platen.
 * 3 kolonner på mobil, 6 fra 1024 px. Ingenting ruller av seg selv.
 * Merke- og produktnavn har translate="no", så nettleseren ikke oversetter dem.
 */
function Rivet({ className }) {
  return (
    <span
      className={cx(
        "absolute h-1.5 w-1.5 rounded-pill bg-brand-border-strong shadow-[inset_0_1px_0_rgb(255_255_255/0.7)]",
        className,
      )}
      aria-hidden="true"
    />
  );
}

export default function BrandWall({ items = [], label, link, tone = "dark", className }) {
  const dark = tone === "dark";
  if (!items.length) return null;

  return (
    <div className={cx("flex flex-col gap-4", className)}>
      {(label || link) && (
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          {label && (
            <p
              className={cx(
                "text-sm font-semibold",
                dark ? "text-brand-muted-inverse" : "text-brand-muted",
              )}
            >
              {label}
            </p>
          )}
          {link && (
            <Link
              to={link.to}
              className={cx(
                "link-underline text-sm",
                dark
                  ? "border-brand-accent-light text-brand-text-inverse hover:text-brand-accent-light"
                  : "border-brand-accent-deep text-brand-text hover:text-brand-accent-deep",
              )}
            >
              {link.label}
              <Icon name="ArrowRight" size={16} strokeWidth={2.2} />
            </Link>
          )}
        </div>
      )}
      <ul
        className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:gap-4 lg:grid-cols-6"
        aria-label={label}
      >
        {items.map((brand) => (
          <li key={brand.slug} className="flex min-w-0 flex-col items-center gap-2">
            <span
              className={cx(
                "relative flex h-[72px] w-full items-center justify-center overflow-hidden border px-4 md:h-24 md:px-5",
                dark
                  ? "border-brand-border-strong bg-brand-bg shadow-lg shadow-brand-primary-dark/60"
                  : "border-brand-border-strong bg-brand-card shadow-md shadow-brand-primary/15",
              )}
            >
              <Rivet className="left-1.5 top-1.5" />
              <Rivet className="right-1.5 top-1.5" />
              <Rivet className="bottom-1.5 left-1.5" />
              <Rivet className="bottom-1.5 right-1.5" />
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  width={brand.w}
                  height={brand.h}
                  loading="lazy"
                  decoding="async"
                  translate="no"
                  className="max-h-[60%] w-auto max-w-full object-contain"
                  style={{ height: brand.logoHeight }}
                />
              ) : (
                <span
                  className="break-words text-center font-display text-[15px] leading-tight tracking-wide text-brand-text sm:text-lg md:text-2xl"
                  translate="no"
                >
                  {brand.name}
                </span>
              )}
            </span>
            <span
              className={cx(
                "max-w-full truncate text-[13px] font-semibold",
                dark ? "text-brand-muted-inverse" : "text-brand-muted",
              )}
              translate="no"
            >
              {brand.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
