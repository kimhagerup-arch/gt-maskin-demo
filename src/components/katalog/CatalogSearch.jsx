import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { partsSection } from "../../data/siteContent";
import {
  categoryPath,
  productPath,
  searchCatalog,
  searchPath,
  vehicleLabel,
  vehiclePath,
} from "../../lib/catalog";
import { cx, formatPrice } from "../../lib/format";
import Icon from "../Icon";

const MAX = { vehicles: 4, categories: 4, products: 5 };
const MIN_CHARS = 2;

/** Flat liste med forslag, gruppert i biler, kategorier og varer, pluss «Vis alle treff». */
function buildOptions(result, value) {
  const c = partsSection.catalog;
  if (!result) return [];
  const options = [];
  const best = result.best;
  for (const v of result.vehicles.slice(0, MAX.vehicles)) {
    const withCategory = v.year && best ? { ...v, category: best.category, type: best.type } : v;
    options.push({
      group: "vehicles",
      id: `v-${v.brand.slug}-${v.model?.slug || ""}-${v.year || ""}`,
      label: vehicleLabel(v),
      sub: v.year && best ? (best.type || best.category).name : null,
      to: vehiclePath(withCategory),
    });
  }
  const typeOptions = result.types.map((t) => ({
    group: "categories",
    id: `t-${t.category.slug}-${t.type.slug}`,
    label: t.type.name,
    sub: t.category.name,
    to: categoryPath({ category: t.category, type: t.type }),
  }));
  const categoryOptions = result.categories.map((cat) => ({
    group: "categories",
    id: `c-${cat.slug}`,
    label: cat.name,
    sub: null,
    to: categoryPath({ category: cat }),
  }));
  // Beste treff først: eksakt kategori («eksos») før deltypene som begynner på ordet.
  const cats = best?.type
    ? [...typeOptions, ...categoryOptions]
    : [...categoryOptions, ...typeOptions];
  options.push(...cats.slice(0, MAX.categories));
  for (const p of result.products.slice(0, MAX.products)) {
    options.push({
      group: "products",
      id: `p-${p.slug}`,
      label: p.title,
      sub: [p.brand, p.sku].filter(Boolean).join(" · "),
      price: p.price,
      to: productPath(p),
    });
  }
  options.push({
    group: "all",
    id: "all",
    label: `${c.suggestionAllResults} «${value.trim()}»`,
    to: searchPath(value.trim()),
  });
  return options;
}

/**
 * Ett søkefelt for alt: årsmodell, merke, modell, kategori, deltype, varenavn og
 * varenummer i vilkårlig rekkefølge. Forslag under feltet mens man skriver
 * (combobox med piltaster, Enter og Escape). Enter uten valgt forslag går til
 * resultatsiden; et eksakt varenummer går rett til varen.
 */
export default function CatalogSearch({ initial = "", myCar, className }) {
  const c = partsSection.catalog;
  const navigate = useNavigate();
  const location = useLocation();
  const inputId = useId();
  const listId = useId();
  const inputRef = useRef(null);
  const [value, setValue] = useState(initial);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  // Nytt søk i adressen (resultatsiden) oppdaterer feltet; ellers lukkes forslagene ved rutebytte.
  // biome-ignore lint/correctness/useExhaustiveDependencies: forslagene skal lukkes ved hvert rutebytte
  useEffect(() => {
    setValue(initial);
    setOpen(false);
    setActive(-1);
  }, [initial, location.pathname]);

  const result = useMemo(
    () => (value.trim().length >= MIN_CHARS ? searchCatalog(value, { myCar }) : null),
    [value, myCar],
  );
  const options = useMemo(() => buildOptions(result, value), [result, value]);
  const expanded = open && options.length > 0;

  const go = (to) => {
    setOpen(false);
    setActive(-1);
    navigate(to);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const q = value.trim();
    if (active >= 0 && options[active]) return go(options[active].to);
    if (!q) return undefined;
    if (result?.exact) return go(productPath(result.exact));
    return go(searchPath(q));
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (options.length ? (i + 1) % options.length : -1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (options.length ? (i <= 0 ? options.length - 1 : i - 1) : -1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  const groups = [];
  options.forEach((opt, index) => {
    const last = groups[groups.length - 1];
    if (last && last.key === opt.group) last.items.push({ ...opt, index });
    else groups.push({ key: opt.group, items: [{ ...opt, index }] });
  });

  return (
    <form role="search" onSubmit={onSubmit} className={cx("flex flex-col gap-1", className)}>
      <label htmlFor={inputId} className="sr-only">
        {c.searchLabel}
      </label>
      <div className="relative">
        <Icon
          name="Search"
          size={20}
          strokeWidth={2}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
        />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          role="combobox"
          aria-expanded={expanded}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            expanded && active >= 0 && options[active]
              ? `${listId}-${options[active].id}`
              : undefined
          }
          autoComplete="off"
          enterKeyHint="search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKeyDown}
          placeholder={c.searchPlaceholder}
          className="h-12 w-full rounded-field border border-brand-border-strong bg-brand-card pl-11 pr-[6.5rem] text-base text-brand-text placeholder:text-brand-muted focus:border-brand-primary focus:outline-none md:h-[52px]"
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              setValue("");
              setActive(-1);
              inputRef.current?.focus();
            }}
            aria-label={c.searchClear}
            className="absolute right-[4.25rem] top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-pill text-brand-muted hover:text-brand-text"
          >
            <Icon name="X" size={16} strokeWidth={2.2} />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2 rounded-button bg-brand-primary px-3.5 text-sm font-bold text-brand-text-inverse transition-colors hover:bg-brand-primary-light"
        >
          {c.searchButton}
        </button>

        <div
          id={listId}
          role="listbox"
          aria-label={c.suggestionsLabel}
          tabIndex={-1}
          hidden={!expanded}
          className="absolute left-0 right-0 top-full z-30 mt-1 max-h-[60vh] overflow-y-auto border border-brand-border-strong bg-brand-card shadow-lg shadow-brand-primary/15"
        >
          {groups.map((group) => (
            <div
              key={group.key}
              role="group"
              aria-label={c.suggestionGroups[group.key] || group.key}
              className="border-b border-brand-border last:border-b-0"
            >
              {c.suggestionGroups[group.key] && (
                <p
                  aria-hidden="true"
                  className="px-3 pb-0.5 pt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-muted"
                >
                  {c.suggestionGroups[group.key]}
                </p>
              )}
              {group.items.map((opt) => (
                // biome-ignore lint/a11y/useKeyWithClickEvents: tastatur håndteres på combobox-feltet (aria-activedescendant)
                <div
                  key={opt.id}
                  id={`${listId}-${opt.id}`}
                  role="option"
                  tabIndex={-1}
                  aria-selected={opt.index === active}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActive(opt.index)}
                  onClick={() => go(opt.to)}
                  className={cx(
                    "flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm",
                    opt.index === active ? "bg-brand-surface" : "hover:bg-brand-bg",
                    opt.group === "all" && "font-bold",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-brand-text" translate="no">
                      {opt.label}
                    </span>
                    {opt.sub && (
                      <span className="block truncate text-xs text-brand-muted" translate="no">
                        {opt.sub}
                      </span>
                    )}
                  </span>
                  {opt.price !== undefined && (
                    <span className="shrink-0 font-display text-base tabular-nums text-brand-accent-deep">
                      {formatPrice(opt.price)} {partsSection.card.priceSuffix}
                    </span>
                  )}
                  {opt.group === "all" && (
                    <Icon name="ArrowRight" size={16} strokeWidth={2.2} className="shrink-0" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-brand-muted">{c.searchHint}</p>
    </form>
  );
}
