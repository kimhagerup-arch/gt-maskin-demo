import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Picture from "../components/Picture";
import Placeholder from "../components/Placeholder";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { partsSection, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { formatPrice } from "../lib/format";

export default function Produkt() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const cart = useCart();
  const t = partsSection.product;
  const [added, setAdded] = useState(false);

  useSeoMeta(
    product
      ? { title: `${product.title} | GT Maskin AS`, description: seo.produkt.description }
      : seo.notFound,
  );

  useEffect(() => {
    if (!added) return undefined;
    const timer = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(timer);
  }, [added]);

  if (!product) {
    return (
      <section className="section-pad bg-brand-bg text-brand-text">
        <div className="container-site flex flex-col items-start gap-4">
          <p className="text-xl font-bold">{t.notFound}</p>
          <Button to="/deler" variant="dark" size="sm">
            {t.back}
          </Button>
        </div>
      </section>
    );
  }

  const stockLabel =
    product.stock === null
      ? partsSection.card.stockUnknown
      : product.stock > 0
        ? partsSection.card.inStock
        : partsSection.card.outOfStock;

  return (
    <section className="section-pad bg-brand-bg text-brand-text">
      <div className="container-site flex flex-col gap-8">
        <Link
          to="/deler"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-muted hover:text-brand-text"
        >
          <Icon name="ChevronLeft" size={18} strokeWidth={2.2} />
          {t.back}
        </Link>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="aspect-[4/3] overflow-hidden border border-brand-border lg:col-span-7">
            {product.image ? (
              <Picture
                src={product.image}
                alt={product.title}
                sizes="(min-width: 1024px) 680px, 100vw"
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
          </div>

          <div className="flex flex-col gap-5 lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-brand-muted">
              {product.brand}
            </span>
            <h1 className="font-display text-5xl tracking-wide md:text-6xl">{product.title}</h1>
            <p className="font-display text-4xl text-brand-accent-deep">
              {formatPrice(product.price)} {partsSection.card.priceSuffix}
            </p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
              <dt className="font-bold text-brand-muted">{t.categoryLabel}</dt>
              <dd>{product.category}</dd>
              <dt className="font-bold text-brand-muted">{t.skuLabel}</dt>
              <dd>{product.sku || "[varenummer]"}</dd>
              <dt className="font-bold text-brand-muted">{t.stockLabel}</dt>
              <dd>{stockLabel}</dd>
              {product.fits?.length > 0 && (
                <>
                  <dt className="font-bold text-brand-muted">{t.fitsLabel}</dt>
                  <dd>{product.fits.join(", ")}</dd>
                </>
              )}
            </dl>
            <p className="leading-relaxed text-brand-muted">
              {product.description || t.descriptionFallback}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => {
                  cart.add(product);
                  setAdded(true);
                }}
                variant={added ? "primary" : "dark"}
                aria-live="polite"
              >
                {added ? partsSection.card.added : t.addToCart}
              </Button>
              <Button
                to={`/kontakt?vare=${encodeURIComponent(product.slug)}`}
                variant="light"
                className="border border-brand-border-strong"
              >
                {t.request}
              </Button>
            </div>
            <p className="border-l-2 border-brand-accent pl-4 text-sm text-brand-muted">
              {partsSection.page.mockNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
