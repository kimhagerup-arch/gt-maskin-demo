import { brands } from "../../data/brands";
import { Link } from "../../i18n/LocaleLink";
import { vehiclePath } from "../../lib/catalog";
import { cx } from "../../lib/format";

/**
 * Merkene med logo som knapper for å velge merke: samme lyse plate som
 * skiltveggen, men uten nagler, så den leses som en knapp. Logoene er lokale
 * SVG-er og vises uendret. `compact` gir lavere plater i treet på desktop.
 */
export default function BrandLogoButtons({ items, activeSlug, compact = false, className }) {
  if (!items.length) return null;
  const meta = new Map(brands.parts.map((b) => [b.slug, b]));
  return (
    <ul className={cx("grid grid-cols-3 gap-2", className)}>
      {items.map((brand) => {
        const m = meta.get(brand.slug);
        const active = activeSlug === brand.slug;
        return (
          <li key={brand.slug}>
            <Link
              to={vehiclePath({ brand })}
              aria-current={active ? "true" : undefined}
              aria-label={brand.name}
              className={cx(
                "flex w-full items-center justify-center border bg-brand-bg px-3 transition-colors hover:border-brand-primary",
                compact ? "h-12" : "h-16",
                active
                  ? "border-brand-primary shadow-[inset_0_0_0_1px_rgb(var(--brand-primary))]"
                  : "border-brand-border-strong",
              )}
            >
              {brand.logo && m ? (
                <img
                  src={brand.logo}
                  alt=""
                  width={m.w}
                  height={m.h}
                  loading="eager"
                  fetchpriority="low"
                  decoding="async"
                  translate="no"
                  className="w-auto max-w-full object-contain"
                  style={{ height: Math.round(m.logoHeight * (compact ? 0.65 : 0.85)) }}
                />
              ) : (
                <span className="font-display text-lg tracking-wide text-brand-text" translate="no">
                  {brand.name}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
