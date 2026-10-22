import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { partsSection } from "../../data/siteContent";
import { Link } from "../../i18n/LocaleLink";
import {
  SORT_MODES,
  fitStatus,
  formatFits,
  groupByType,
  productPath,
  sortProducts,
} from "../../lib/catalog";
import { cx, formatPrice } from "../../lib/format";
import Icon from "../Icon";
import ProductCard from "../ProductCard";
import ProductThumb from "./ProductThumb";

const PAGE = 50;

function stockLabel(product) {
  const t = partsSection.card;
  if (product.stock === null || product.stock === undefined) return t.stockUnknown;
  return product.stock > 0 ? t.inStock : t.outOfStock;
}

/** Liten merkelapp i raden: «Eksempel», «Passer din bil», «Passer alle biler». */
function Badge({ children, tone = "muted" }) {
  return (
    <span
      className={cx(
        "inline-flex h-5 items-center whitespace-nowrap px-1.5 text-[10px] font-bold uppercase tracking-[0.14em]",
        tone === "accent" && "bg-brand-accent text-brand-primary",
        tone === "dark" && "bg-brand-primary text-brand-text-inverse",
        tone === "muted" && "border border-brand-border-strong text-brand-muted",
      )}
    >
      {children}
    </span>
  );
}

/**
 * Én tett rad per vare: lite bilde eller kategoriikon, navn, merke og varenummer,
 * kort «passer til», lagerstatus, pris med tabulære sifre og «Legg i kurv».
 * På mobil to linjer: pris og knapp på samme linje under navnet.
 */
export function PartRow({ product, myCar, showFits = true }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);
  const l = partsSection.catalog.list;
  const card = partsSection.card;
  const fit = fitStatus(product, myCar);
  const fits = showFits ? formatFits(product) : [];
  const needsSize = Array.isArray(product.sizes) && product.sizes.length > 0;
  const to = productPath(product);

  useEffect(() => {
    if (!added) return undefined;
    const timer = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(timer);
  }, [added]);

  const meta = [product.brand, product.sku ? `${l.skuLabel} ${product.sku}` : null].filter(Boolean);

  return (
    <li className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-x-3 gap-y-1.5 border-b border-brand-border py-2.5 md:grid-cols-[44px_minmax(0,1fr)_8.5rem_7rem_auto] md:gap-x-4">
      <ProductThumb product={product} size={44} className="row-span-2 h-11 w-11 md:row-span-1" />
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Link
            to={to}
            className="font-semibold leading-snug text-brand-text hover:text-brand-accent-deep"
            translate="no"
          >
            {product.title}
          </Link>
          {product.placeholder && <Badge>{card.exampleTag}</Badge>}
          {fit === "ja" && <Badge tone="dark">{card.fitsMyCar}</Badge>}
          {fit === "alle" && <Badge>{card.fitsAll}</Badge>}
        </div>
        <p className="truncate text-xs text-brand-muted">
          <span translate="no">{meta.join(" · ")}</span>
          {fits.length > 0 && (
            <span>
              {meta.length ? " · " : ""}
              {l.fitsLabel} {fits.join(", ")}
            </span>
          )}
        </p>
      </div>
      <span className="hidden text-xs text-brand-muted md:block">{stockLabel(product)}</span>
      <div className="col-start-2 flex items-center justify-between gap-3 md:contents">
        <span className="text-xs text-brand-muted md:hidden">{stockLabel(product)}</span>
        <span className="ml-auto whitespace-nowrap font-display text-xl tabular-nums text-brand-accent-deep md:ml-0 md:text-right">
          {formatPrice(product.price)}
        </span>
        {needsSize ? (
          <Link
            to={to}
            className="inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-button bg-brand-primary px-3 text-[13px] font-bold text-brand-text-inverse transition-colors hover:bg-brand-primary-light"
          >
            {l.chooseSize}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              cart.add(product);
              setAdded(true);
            }}
            aria-label={`${l.addToCart}: ${product.title}`}
            className={cx(
              "inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-button px-3 text-[13px] font-bold transition-colors",
              added
                ? "bg-brand-accent text-brand-primary"
                : "bg-brand-primary text-brand-text-inverse hover:bg-brand-primary-light",
            )}
          >
            {added ? (
              <>
                <Icon name="Check" size={16} strokeWidth={2.5} />
                {l.added}
              </>
            ) : (
              l.addToCart
            )}
          </button>
        )}
      </div>
    </li>
  );
}

/** Sorteringsvalg: relevans, pris lav til høy, pris høy til lav. */
export function SortSelect({ value, onChange, id = "sortering" }) {
  const c = partsSection.catalog;
  return (
    <div className="flex items-center gap-2 text-sm">
      <label htmlFor={id} className="font-semibold text-brand-muted">
        {c.sortLabel}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-field border border-brand-border-strong bg-brand-card px-2 text-sm text-brand-text focus:border-brand-primary focus:outline-none"
      >
        {SORT_MODES.map((mode) => (
          <option key={mode} value={mode}>
            {c.sort[mode]}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Varelisten: deler som tette rader gruppert per deltype med overskrift, klær og
 * utstyr som rutenett med kort. Viser 50 om gangen med «Vis flere».
 */
export default function PartsList({
  items,
  myCar,
  sort = "relevans",
  grid = false,
  showFits = true,
}) {
  const c = partsSection.catalog;
  // Nullstilles via `key` fra siden når utvalget skifter.
  const [shown, setShown] = useState(PAGE);

  const sorted = sortProducts(items, sort);
  const visible = sorted.slice(0, shown);
  const more = sorted.length - visible.length;

  const showMore = more > 0 && (
    <div className="flex flex-wrap items-center gap-3 pt-2 text-sm text-brand-muted">
      <button
        type="button"
        onClick={() => setShown((n) => n + PAGE)}
        className="inline-flex h-10 items-center rounded-button border border-brand-border-strong bg-brand-card px-4 font-bold text-brand-text hover:border-brand-primary"
      >
        {c.showMore}
      </button>
      <span>
        {visible.length} {c.shownOf} {sorted.length}
      </span>
    </div>
  );

  if (grid) {
    return (
      <div className="flex flex-col gap-4">
        <ul className="grid grid-cols-2 gap-3 md:gap-6 xl:grid-cols-3">
          {visible.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} myCar={myCar} />
            </li>
          ))}
        </ul>
        {showMore}
      </div>
    );
  }

  const groups = groupByType(visible);
  return (
    <div className="flex flex-col gap-6">
      {groups.map(({ category, type, items: rows }) => (
        <section key={`${category.slug}/${type.slug}`} className="flex flex-col gap-1">
          <h3 className="flex items-center gap-2 border-b-2 border-brand-primary pb-1.5 text-base font-bold md:text-[17px]">
            <Icon
              name={category.icon}
              size={18}
              strokeWidth={2}
              className="text-brand-accent-deep"
            />
            {type.name}
            <span className="text-sm font-semibold text-brand-muted">({rows.length})</span>
          </h3>
          <ul>
            {rows.map((product) => (
              <PartRow key={product.slug} product={product} myCar={myCar} showFits={showFits} />
            ))}
          </ul>
        </section>
      ))}
      {showMore}
    </div>
  );
}
