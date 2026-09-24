import { cx } from "../lib/format";

/** Merkenavn som tekstchips. Aldri logoer. */
export default function BrandChips({ prefix, brands, tone = "light", className }) {
  const dark = tone === "dark";
  return (
    <div className={cx("flex flex-wrap items-center gap-2", className)}>
      {prefix && (
        <span
          className={cx(
            "mr-1 text-sm font-semibold",
            dark ? "text-brand-muted-inverse" : "text-brand-muted",
          )}
        >
          {prefix}
        </span>
      )}
      <ul className="flex flex-wrap gap-2">
        {brands.map((brand) => (
          <li
            key={brand}
            className={cx(
              "inline-flex h-9 items-center border px-3.5 text-sm font-semibold",
              dark
                ? "border-brand-border-dark-strong text-brand-text-inverse"
                : "border-brand-border-strong text-brand-text",
            )}
          >
            {brand}
          </li>
        ))}
      </ul>
    </div>
  );
}
