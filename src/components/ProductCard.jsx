import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { partsSection } from "../data/siteContent";
import { cx, formatPrice } from "../lib/format";
import Icon from "./Icon";
import Picture from "./Picture";
import Placeholder from "./Placeholder";

export default function ProductCard({ product }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);

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
      <Link
        to={`/deler/${product.slug}`}
        className="block aspect-[4/3] overflow-hidden"
        aria-label={product.title}
      >
        {product.image ? (
          <Picture
            src={product.image}
            alt={product.title}
            sizes="(min-width: 1024px) 282px, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full"
            tone="light"
          />
        ) : (
          <Placeholder
            tone="light"
            label={product.placeholderLabel || partsSection.card.imageLabel}
            className="h-full w-full"
          />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 px-4 pb-4 pt-4 md:px-5 md:pb-5">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-brand-muted">
          {product.brand}
        </span>
        <h3 className="text-base font-bold md:text-[17px]">
          <Link to={`/deler/${product.slug}`} className="hover:text-brand-accent-deep">
            {product.title}
          </Link>
        </h3>
        <span className="text-xs text-brand-muted">{stockLabel}</span>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="font-display text-2xl text-brand-accent-deep">
            {formatPrice(product.price)} {partsSection.card.priceSuffix}
          </span>
          <button
            type="button"
            onClick={() => {
              cart.add(product);
              setAdded(true);
            }}
            className={cx(
              "inline-flex h-10 items-center gap-1.5 px-3.5 text-[13px] font-bold transition-colors",
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
        </div>
      </div>
    </article>
  );
}
