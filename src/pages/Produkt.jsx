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
import { cx, formatPrice } from "../lib/format";

export default function Produkt() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const cart = useCart();
  const t = partsSection.product;
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState(false);

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

  const group = product.group || "deler";
  const backTo = `/deler?gruppe=${group}`;
  const backLabel = t.backByGroup[group] || t.back;
  const requestLabel = t.requestByGroup[group] || t.request;
  const imageKey = product.image || product.placeholderImage;
  const hasSizes = Array.isArray(product.sizes);
  const sizesKnown = hasSizes && product.sizes.length > 0;

  const stockLabel =
    product.stock === null
      ? partsSection.card.stockUnknown
      : product.stock > 0
        ? partsSection.card.inStock
        : partsSection.card.outOfStock;

  const addToCart = () => {
    if (sizesKnown && !size) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    cart.add(product, 1, sizesKnown ? size : null);
    setAdded(true);
  };

  return (
    <section className="section-pad bg-brand-bg text-brand-text">
      <div className="container-site flex flex-col gap-6 md:gap-8">
        <Link
          to={backTo}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-muted hover:text-brand-text"
        >
          <Icon name="ChevronLeft" size={18} strokeWidth={2.2} />
          {backLabel}
        </Link>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="relative aspect-[4/3] overflow-hidden border border-brand-border lg:col-span-7">
            {imageKey ? (
              <Picture
                src={imageKey}
                alt={product.image ? product.title : `Eksempel: ${product.placeholderLabel}`}
                sizes="(min-width: 1024px) 680px, 100vw"
                className="h-full w-full"
                imgClassName={cx(
                  "h-full w-full object-cover",
                  product.placeholder && "saturate-[.85]",
                )}
                tone="light"
              />
            ) : (
              <Placeholder
                tone="light"
                label={product.placeholderLabel || partsSection.card.imageLabel}
                className="h-full w-full"
              />
            )}
            {product.placeholder && imageKey && (
              <>
                <span className="absolute left-0 top-0 bg-brand-primary px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent-light">
                  {t.placeholderTag}
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-primary/90 to-transparent px-4 pb-3 pt-8 text-sm font-semibold text-brand-text-inverse">
                  {product.placeholderLabel}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col gap-5 lg:col-span-5">
            <span
              className="text-xs font-bold uppercase tracking-[0.15em] text-brand-muted"
              translate="no"
            >
              {product.brand}
            </span>
            <h1 className="font-display text-5xl tracking-wide md:text-6xl" translate="no">
              {product.title}
            </h1>
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

            {hasSizes && (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="storrelse"
                  className="text-xs font-bold uppercase tracking-wider text-brand-muted"
                >
                  {t.sizeLabel}
                </label>
                <select
                  id="storrelse"
                  value={size}
                  onChange={(e) => {
                    setSize(e.target.value);
                    setSizeError(false);
                  }}
                  disabled={!sizesKnown}
                  aria-invalid={sizeError || undefined}
                  aria-describedby={sizeError ? "storrelse-feil" : undefined}
                  className={cx(
                    "h-12 w-full max-w-xs border bg-brand-card px-3.5 text-base text-brand-text focus:border-brand-primary focus:outline-none disabled:cursor-not-allowed disabled:border-dashed disabled:text-brand-muted",
                    sizeError ? "border-brand-accent-deep" : "border-brand-border-strong",
                  )}
                >
                  {sizesKnown ? (
                    <>
                      <option value="">{t.sizeChoose}</option>
                      {product.sizes.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value="">{t.sizePlaceholder}</option>
                  )}
                </select>
                <p
                  id="storrelse-feil"
                  aria-live="polite"
                  className="min-h-[1.25rem] text-sm text-brand-accent-deep"
                >
                  {sizeError ? t.sizeRequired : ""}
                </p>
              </div>
            )}

            <p className="leading-relaxed text-brand-muted">
              {product.description || t.descriptionFallback}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={addToCart} variant={added ? "primary" : "dark"} aria-live="polite">
                {added ? partsSection.card.added : t.addToCart}
              </Button>
              <Button
                to={`/kontakt?vare=${encodeURIComponent(product.slug)}`}
                variant="light"
                className="border border-brand-border-strong"
              >
                {requestLabel}
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
