import { partsSection } from "../../data/siteContent";
import { Link } from "../../i18n/LocaleLink";
import { CLOTHES_CATEGORY, OIL_CATEGORY, categoryPath, vehiclePath } from "../../lib/catalog";
import { cx } from "../../lib/format";

/**
 * De fire inngangene i butikken som faner. «Deler etter bil» åpner på Min bil
 * når den er valgt. To rader på mobil, én rad fra 640 px.
 */
export default function CatalogTabs({ active, myCar, className }) {
  const c = partsSection.catalog;
  const tabs = [
    { key: "bil", label: c.tabs.bil, to: myCar ? vehiclePath(myCar) : vehiclePath() },
    { key: "kategori", label: c.tabs.kategori, to: categoryPath() },
    { key: "olje", label: c.tabs.olje, to: categoryPath({ category: OIL_CATEGORY }) },
    { key: "klaer", label: c.tabs.klaer, to: categoryPath({ category: CLOTHES_CATEGORY }) },
  ];
  return (
    <nav aria-label={c.tabsLabel} className={className}>
      <ul className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap">
        {tabs.map((tab) => {
          const isActive = active === tab.key;
          return (
            <li key={tab.key} className="min-w-0">
              <Link
                to={tab.to}
                aria-current={isActive ? "page" : undefined}
                className={cx(
                  "flex h-11 items-center justify-center rounded-button border px-3 text-center text-[14px] font-bold leading-tight transition-colors sm:px-4 sm:text-[15px]",
                  isActive
                    ? "border-brand-primary bg-brand-primary text-brand-text-inverse"
                    : "border-brand-border-strong bg-brand-card text-brand-text hover:border-brand-primary",
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
