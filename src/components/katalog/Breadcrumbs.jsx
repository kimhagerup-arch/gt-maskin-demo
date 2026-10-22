import { partsSection } from "../../data/siteContent";
import { Link } from "../../i18n/LocaleLink";
import { cx } from "../../lib/format";
import Icon from "../Icon";

/**
 * Brødsmuler over varelisten: hvert nivå er en lenke til sin sti, siste er
 * gjeldende side. `crumbs`: [{ label, to }].
 */
export default function Breadcrumbs({ crumbs, className, tone = "light" }) {
  // Bare roten («Butikk») gir ingen brødsmuler.
  if (!crumbs || crumbs.length < 2) return null;
  const dark = tone === "dark";
  return (
    <nav aria-label={partsSection.catalog.breadcrumbsLabel} className={className}>
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.to || crumb.label} className="flex items-center gap-1">
              {last ? (
                <span
                  aria-current="page"
                  className={cx("font-bold", dark ? "text-brand-text-inverse" : "text-brand-text")}
                >
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    to={crumb.to}
                    className={cx(
                      "font-semibold underline-offset-2 hover:underline",
                      dark ? "text-brand-muted-inverse" : "text-brand-muted",
                    )}
                  >
                    {crumb.label}
                  </Link>
                  <Icon
                    name="ChevronRight"
                    size={14}
                    strokeWidth={2.2}
                    className={dark ? "text-brand-outline" : "text-brand-border-strong"}
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
