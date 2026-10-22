import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Picture from "../components/Picture";
import Breadcrumbs from "../components/katalog/Breadcrumbs";
import { PartRow } from "../components/katalog/PartsList";
import ProductThumb from "../components/katalog/ProductThumb";
import { requestLink } from "../components/katalog/SourceRequest";
import { useCart } from "../context/CartContext";
import { getCategory, getType } from "../data/catalog";
import { getProduct } from "../data/products";
import { partsSection, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";
import {
  CLOTHES_CATEGORY,
  categoryPath,
  fitStatus,
  formatFits,
  productsFor,
  vehicleLabel,
} from "../lib/catalog";
import { cx, formatPrice } from "../lib/format";
import { expandCar, useMyCar } from "../lib/myCar";

const MORE_IN_TYPE = 6;

export default function Produkt() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const cart = useCart();
  const myCar = useMyCar();
  const t = partsSection.product;
  const c = partsSection.catalog;
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

  const category = getCategory(product.category);
  const type = getType(product.category, product.type);
  const isClothes = product.category === CLOTHES_CATEGORY;
  const imageKey = product.image || product.placeholderImage;
  const hasSizes = Array.isArray(product.sizes);
  const sizesKnown = hasSizes && product.sizes.length > 0;
  const fits = formatFits(product);
  const fit = fitStatus(product, myCar);
  const myCarLabel = myCar ? vehicleLabel(expandCar(myCar)) : "";
  const more = productsFor({ category: product.category, type: product.type })
    .filter((p) => p.slug !== product.slug)
    .slice(0, MORE_IN_TYPE);

  const crumbs = [{ label: t.back, to: categoryPath() }];
  if (category) crumbs.push({ label: category.name, to: categoryPath({ category }) });
  if (type) crumbs.push({ label: type.name, to: categoryPath({ category, type }) });
  crumbs.push({ label: product.title, to: `/deler/${product.slug}` });

  const stockLabel =
    product.stock === null
      ? partsSection.card.stockUnknown
      : product.stock > 0
        ? partsSection.card.inStock
        : partsSection.card.outOfStock;

  const fitLine =
    fit === "alle"
      ? { text: t.fitsAll, tone: "muted" }
      : fit === "ja"
        ? { text: `${t.fitsMyCar}: ${myCarLabel}`, tone: "dark" }
        : fit === "nei"
          ? { text: `${t.fitsNotMyCar} (${myCarLabel})`, tone: "accent" }
          : { text: t.fitsNoCar, tone: "muted" };

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
        <Breadcrumbs crumbs={crumbs} />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="relative aspect-[4/3] overflow-hidden border border-brand-border lg:col-span-7">
            {imageKey ? (
              <Picture
                src={imageKey}
                alt={product.image ? product.title : ""}
                sizes="(min-width: 1024px) 680px, 100vw"
                className="h-full w-full"
                imgClassName={cx(
                  "h-full w-full object-cover",
                  product.placeholder && "saturate-[.85]",
                )}
                tone="light"
              />
            ) : (
              <ProductThumb product={product} className="h-full w-full" iconSize={96} />
            )}
            {product.placeholder && (
              <span className="absolute left-0 top-0 bg-brand-primary px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent-light">
                {partsSection.card.exampleTag}
              </span>
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
            <p className="font-display text-4xl tabular-nums text-brand-accent-deep">
              {formatPrice(product.price)} {partsSection.card.priceSuffix}
            </p>

            <p
              className={cx(
                "inline-flex items-start gap-2 self-start px-3 py-2 text-sm font-semibold",
                fitLine.tone === "dark" && "bg-brand-primary text-brand-text-inverse",
                fitLine.tone === "accent" && "bg-brand-accent text-brand-primary",
                fitLine.tone === "muted" && "border border-brand-border-strong text-brand-text",
              )}
            >
              <Icon
                name={fit === "ja" || fit === "alle" ? "Check" : "CircleHelp"}
                size={18}
                strokeWidth={2.2}
                className="mt-0.5 shrink-0"
              />
              <span>{fitLine.text}</span>
            </p>

            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
              <dt className="font-bold text-brand-muted">{t.categoryLabel}</dt>
              <dd>{category?.name || product.category}</dd>
              <dt className="font-bold text-brand-muted">{t.typeLabel}</dt>
              <dd>{type?.name || product.type}</dd>
              <dt className="font-bold text-brand-muted">{t.skuLabel}</dt>
              <dd translate="no">{product.sku || "[varenummer]"}</dd>
              <dt className="font-bold text-brand-muted">{t.stockLabel}</dt>
              <dd>{stockLabel}</dd>
              <dt className="font-bold text-brand-muted">{t.fitsLabel}</dt>
              <dd translate="no">{product.universal ? t.fitsAll : fits.join(", ")}</dd>
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
                to={requestLink({ item: product.slug, vehicle: myCarLabel || undefined })}
                variant="light"
                className="border border-brand-border-strong"
              >
                {isClothes ? t.requestClothes : t.request}
              </Button>
            </div>
            <p className="border-l-2 border-brand-accent pl-4 text-sm text-brand-muted">
              {partsSection.page.mockNote}
            </p>
          </div>
        </div>

        {more.length > 0 && type && (
          <div className="flex flex-col gap-2">
            <h2 className="flex items-center justify-between gap-3 border-b-2 border-brand-primary pb-1.5 text-base font-bold md:text-[17px]">
              <span>
                {t.moreInType}: {type.name}
              </span>
              <Link
                to={categoryPath({ category, type })}
                className="text-sm font-semibold text-brand-muted hover:text-brand-accent-deep"
              >
                {c.tabs.kategori}
              </Link>
            </h2>
            <ul>
              {more.map((p) => (
                <PartRow key={p.slug} product={p} myCar={myCar} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
