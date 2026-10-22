import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { partsSection } from "../data/siteContent";
import { fitStatus } from "../lib/catalog";
import { cx, formatPrice } from "../lib/format";
import Icon from "./Icon";
import Picture from "./Picture";
import ProductThumb from "./katalog/ProductThumb";

/**
 * Varekort i rutenett (klær og utstyr, forsiden). Uten bilde vises ikonet til
 * kategorien. Eksempelvarer får en liten «Eksempel»-pille, og varer som passer
 * Min bil får «Passer din bil».
 */
export default function ProductCard({ product, myCar = null }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);
  const imageKey = product.image || product.placeholderImage;
  const needsSize = Array.isArray(product.sizes) && product.sizes.length > 0;
  const fit = fitStatus(product, myCar);

  useEffect(() => {
    if (!added) return undefined;
    const t = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(t);
  }, [added]);

  const stockLabel =
    product.stock === null
      ? partsSection.card.stockUnknown
      : product.stock > 0
        ? partsSection.card.inStock
        : partsSection.card.outOfStock;

  return (
    <article className="flex h-full flex-col border border-brand-border bg-brand-card transition-colors hover:border-brand-accent">
      <Link to={`/deler/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        {/* Lenketeksten er tittelen; bildet har derfor tom alt. */}
        <span className="sr-only" translate="no">
          {product.title}
        </span>
        {imageKey ? (
          <Picture
            src={imageKey}
            alt=""
            sizes="(min-width: 1024px) 282px, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full"
            imgClassName={cx("h-full w-full object-cover", product.placeholder && "saturate-[.85]")}
            tone="light"
          />
        ) : (
          <ProductThumb product={product} className="h-full w-full" iconSize={56} />
        )}
        {product.placeholder && (
          <span className="absolute left-2 top-2 bg-brand-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-accent-light">
            {partsSection.card.exampleTag}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 px-4 pb-4 pt-4 md:px-5 md:pb-5">
        <span
          className="text-xs font-bold uppercase tracking-[0.12em] text-brand-muted"
          translate="no"
        >
          {product.brand}
        </span>
        <h3 className="text-base font-bold md:text-[17px]" translate="no">
          <Link to={`/deler/${product.slug}`} className="hover:text-brand-accent-deep">
            {product.title}
          </Link>
        </h3>
        <span className="text-xs text-brand-muted">
          {stockLabel}
          {fit === "ja" && (
            <span className="ml-2 inline-flex h-5 items-center bg-brand-primary px-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-text-inverse">
              {partsSection.card.fitsMyCar}
            </span>
          )}
        </span>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
          <span className="whitespace-nowrap font-display text-xl tabular-nums text-brand-accent-deep md:text-2xl">
            {formatPrice(product.price)} {partsSection.card.priceSuffix}
          </span>
          {needsSize ? (
            <Link
              to={`/deler/${product.slug}`}
              className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-button bg-brand-primary px-3 text-[13px] font-bold text-brand-text-inverse transition-colors hover:bg-brand-primary-light md:px-3.5"
            >
              {partsSection.product.sizeChoose}
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => {
                cart.add(product);
                setAdded(true);
              }}
              className={cx(
                "inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-button px-3 text-[13px] font-bold transition-colors md:px-3.5",
                added
                  ? "bg-brand-accent text-brand-primary"
                  : "bg-brand-primary text-brand-text-inverse hover:bg-brand-primary-light",
              )}
              aria-live="polite"
            >
              {added ? (
                <>
                  <Icon name="Check" size={16} strokeWidth={2.5} />
                  {partsSection.card.added}
                </>
              ) : (
                partsSection.card.addToCart
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
