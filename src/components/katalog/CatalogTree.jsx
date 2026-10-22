import { useEffect, useRef, useState } from "react";
import { categories, partCategories } from "../../data/catalog";
import { partsSection } from "../../data/siteContent";
import { decadesFor, lastYear, otherVehicle, vehicles } from "../../data/vehicles";
import { Link, useNavigate } from "../../i18n/LocaleLink";
import { OIL_CATEGORY, categoryPath, vehicleLabel, vehiclePath } from "../../lib/catalog";
import { cx } from "../../lib/format";
import Icon from "../Icon";
import BrandLogoButtons from "./BrandLogoButtons";
import { requestLink } from "./SourceRequest";

const LETTER_BAR_MIN = 12;

/** Knapp i treet med pluss og minus. Enter og mellomrom virker som på alle knapper. */
function TreeButton({ expanded, onClick, children, count, dim = false, icon, className }) {
  return (
    <button
      type="button"
      aria-expanded={expanded}
      onClick={onClick}
      className={cx(
        "flex min-h-10 w-full items-center gap-2 py-1.5 pr-2 text-left text-[15px] transition-colors hover:text-brand-accent-deep",
        expanded ? "font-bold text-brand-text" : "font-semibold",
        dim && !expanded ? "text-brand-muted" : "text-brand-text",
        className,
      )}
    >
      <span
        className={cx(
          "flex h-5 w-5 shrink-0 items-center justify-center border",
          expanded
            ? "border-brand-primary bg-brand-primary text-brand-text-inverse"
            : "border-brand-border-strong bg-brand-card text-brand-text",
        )}
        aria-hidden="true"
      >
        <Icon name={expanded ? "Minus" : "Plus"} size={12} strokeWidth={2.5} />
      </span>
      {icon && <Icon name={icon} size={16} strokeWidth={2} className="shrink-0 text-brand-muted" />}
      <span className="min-w-0 flex-1 leading-tight" translate="no">
        {children}
      </span>
      {count !== undefined && (
        <span className="shrink-0 text-xs font-semibold tabular-nums text-brand-muted">
          {count}
        </span>
      )}
    </button>
  );
}

/** Blad i treet (deltype): lenke med aria-current. */
function Leaf({ to, current, children, count, dim }) {
  return (
    <Link
      to={to}
      aria-current={current ? "page" : undefined}
      className={cx(
        "flex min-h-9 items-center gap-2 py-1 pl-7 pr-2 text-sm transition-colors hover:text-brand-accent-deep",
        current ? "font-bold text-brand-accent-deep" : dim ? "text-brand-muted" : "text-brand-text",
      )}
    >
      <span className="min-w-0 flex-1" translate="no">
        {children}
      </span>
      {count !== undefined && (
        <span className="shrink-0 text-xs font-semibold tabular-nums text-brand-muted">
          {count}
        </span>
      )}
    </Link>
  );
}

function Nested({ children, className }) {
  return <ul className={cx("ml-2.5 border-l border-brand-border pl-2", className)}>{children}</ul>;
}

/** Bokstavlinje for å hoppe i lange lister. */
function LetterBar({ letters, onJump }) {
  const c = partsSection.catalog;
  return (
    <div role="group" aria-label={c.letterBarLabel} className="flex flex-wrap gap-1">
      {letters.map((letter) => (
        <button
          key={letter}
          type="button"
          onClick={() => onJump(letter)}
          className="flex h-7 w-7 items-center justify-center border border-brand-border-strong bg-brand-card text-xs font-bold text-brand-text hover:border-brand-primary"
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

/** Kategorier og deltyper under et nivå, med antall. Kategorier uten varer står dempet. */
function CategoryBranches({ list, sel, counts, pathFor }) {
  const navigate = useNavigate();
  return (
    <ul>
      {list.map((category) => {
        const open = sel.category?.slug === category.slug;
        const n = counts.category(category);
        return (
          <li key={category.slug}>
            <TreeButton
              expanded={open}
              count={n}
              dim={n === 0}
              icon={category.icon}
              onClick={() => navigate(open ? pathFor({}) : pathFor({ category }))}
            >
              {category.name}
            </TreeButton>
            {open && (
              <Nested>
                {category.types.map((type) => {
                  const tn = counts.type(category, type);
                  return (
                    <li key={type.slug}>
                      <Leaf
                        to={pathFor({ category, type })}
                        current={sel.type?.slug === type.slug}
                        count={tn}
                        dim={tn === 0}
                      >
                        {type.name}
                      </Leaf>
                    </li>
                  );
                })}
              </Nested>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Årsmodeller per tiår under en modell. Tiåret med valgt år (eller det nyeste) er åpent. */
function YearBranches({ sel }) {
  const decades = decadesFor(sel.model);
  const selectedDecade = sel.year ? Math.floor(sel.year / 10) * 10 : decades[0]?.decade;
  const [openDecade, setOpenDecade] = useState(selectedDecade);
  useEffect(() => {
    setOpenDecade(selectedDecade);
  }, [selectedDecade]);
  return (
    <ul>
      {decades.map((d) => {
        const open = openDecade === d.decade;
        return (
          <li key={d.decade}>
            <TreeButton
              expanded={open}
              onClick={() => setOpenDecade(open ? null : d.decade)}
              className="min-h-9 text-sm"
            >
              {d.label}
            </TreeButton>
            {open && (
              <ul className="flex flex-wrap gap-1 pb-2 pl-7">
                {d.years.map((y) => {
                  const current = sel.year === y;
                  return (
                    <li key={y}>
                      <Link
                        to={vehiclePath({ brand: sel.brand, model: sel.model, year: y })}
                        aria-current={current ? "page" : undefined}
                        className={cx(
                          "flex h-8 min-w-[3.25rem] items-center justify-center border px-1.5 text-sm font-semibold tabular-nums transition-colors",
                          current
                            ? "border-brand-primary bg-brand-primary text-brand-text-inverse"
                            : "border-brand-border-strong bg-brand-card text-brand-text hover:border-brand-primary",
                        )}
                      >
                        {y}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Katalogtreet på desktop. Etter bil: merke › modell › årsmodell › kategori ›
 * deltype, med pluss og minus som folder ut på stedet. Bare én gren er åpen per
 * nivå, fordi tilstanden er adressen. Alle kategorier: kategori › deltype.
 */
export default function CatalogTree({ mode, sel, counts, myCar }) {
  const c = partsSection.catalog;
  const navigate = useNavigate();
  const listRef = useRef(null);

  if (mode === "kategori") {
    return (
      <nav aria-label={c.treeLabel} className="flex flex-col gap-2 p-3">
        <CategoryBranches list={categories} sel={sel} counts={counts} pathFor={categoryPath} />
      </nav>
    );
  }

  const sorted = [...vehicles].sort((a, b) => a.name.localeCompare(b.name, "nb"));
  const withLogo = vehicles.filter((b) => b.logo);
  const letters = [...new Set(sorted.map((b) => b.name[0].toUpperCase()))];
  const jump = (letter) => {
    const el = listRef.current?.querySelector(`[data-letter="${letter}"]`);
    el?.scrollIntoView({ block: "nearest" });
    el?.querySelector("button")?.focus();
  };
  const pathFor = (over) =>
    vehiclePath({ brand: sel.brand, model: sel.model, year: sel.year, ...over });

  return (
    <nav aria-label={c.treeLabel} className="flex flex-col gap-3 p-3">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">
        {c.brandsWithLogo}
      </p>
      <BrandLogoButtons items={withLogo} activeSlug={sel.brand?.slug} compact />
      <p className="pt-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">
        {c.allBrands}
      </p>
      {sorted.length >= LETTER_BAR_MIN && <LetterBar letters={letters} onJump={jump} />}
      <ul ref={listRef}>
        {sorted.map((brand, i) => {
          const open = sel.brand?.slug === brand.slug;
          const first =
            i === 0 || sorted[i - 1].name[0].toUpperCase() !== brand.name[0].toUpperCase();
          return (
            <li key={brand.slug} data-letter={first ? brand.name[0].toUpperCase() : undefined}>
              <TreeButton
                expanded={open}
                onClick={() => navigate(open ? vehiclePath() : vehiclePath({ brand }))}
              >
                {brand.name}
              </TreeButton>
              {open && (
                <Nested>
                  {brand.models.map((model) => {
                    const mOpen = sel.model?.slug === model.slug;
                    return (
                      <li key={model.slug}>
                        <TreeButton
                          expanded={mOpen}
                          onClick={() =>
                            navigate(mOpen ? vehiclePath({ brand }) : vehiclePath({ brand, model }))
                          }
                          count={`${model.from}-${lastYear(model)}`}
                        >
                          {model.name}
                        </TreeButton>
                        {mOpen && (
                          <Nested>
                            <li>
                              <YearBranches sel={sel} />
                            </li>
                            {sel.year && (
                              <li className="mt-1 border-t border-brand-border pt-2">
                                <p className="px-1 pb-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-muted">
                                  {c.partsFor} <span translate="no">{vehicleLabel(sel)}</span>
                                </p>
                                <CategoryBranches
                                  list={partCategories}
                                  sel={sel}
                                  counts={counts}
                                  pathFor={pathFor}
                                />
                                <p className="px-1 pb-1 pt-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-muted">
                                  {c.fitsAllGroup}
                                </p>
                                <CategoryBranches
                                  list={categories.filter((cat) => cat.slug === OIL_CATEGORY)}
                                  sel={sel}
                                  counts={counts}
                                  pathFor={pathFor}
                                />
                              </li>
                            )}
                          </Nested>
                        )}
                      </li>
                    );
                  })}
                </Nested>
              )}
            </li>
          );
        })}
        <li className="mt-2 border-t border-brand-border pt-2">
          <Link
            to={requestLink({ vehicle: myCar ? vehicleLabel(myCar) : undefined })}
            className="flex min-h-10 items-center gap-2 py-1.5 text-[15px] font-semibold text-brand-muted hover:text-brand-accent-deep"
          >
            <Icon name="CircleHelp" size={16} strokeWidth={2} />
            {otherVehicle.name}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
