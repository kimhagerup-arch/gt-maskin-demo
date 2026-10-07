import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BrandChips from "../components/BrandChips";
import Button from "../components/Button";
import Icon from "../components/Icon";
import PageHero from "../components/PageHero";
import Picture from "../components/Picture";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import { useCart } from "../context/CartContext";
import { brands } from "../data/brands";
import { categorySlug, getGroup, groups, products } from "../data/products";
import { partsSection, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { cx } from "../lib/format";

const STORE_IMAGES = [
  { image: "/images/butikk/butikk-oljehylle", alt: "Oljehylle i butikken hos GT Maskin" },
  { image: "/images/butikk/butikk-rustbeskyttelse", alt: "Hylle med rustbeskyttelse i butikken" },
  { image: "/images/butikk/butikk-klaer", alt: "Arbeidsklær på stativ i butikken" },
  { image: "/images/butikk/butikk-capser", alt: "Capser i butikken" },
];

function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[[\]]/g, "");
}

/**
 * Butikken. Veksler mellom «Deler» og «Klær og utstyr», med kategorichips for valgt
 * gruppe. Valgt gruppe og kategori ligger i URL-en (?gruppe=klaer&kategori=klaer),
 * så lenker kan deles og tilbakeknappen virker.
 */
export default function Deler() {
  useSeoMeta(seo.deler);
  const cart = useCart();
  const t = partsSection.page;
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");

  const group = getGroup(params.get("gruppe"));
  const gt = t.groups[group.slug] || t.groups.deler;
  const categoryParam = params.get("kategori");
  const category = group.categories.find((c) => categorySlug(c) === categoryParam) || null;

  const setGroup = (slug) => {
    setParams({ gruppe: slug });
    setQuery("");
  };
  const setCategory = (label) => {
    const next = { gruppe: group.slug };
    if (label) next.kategori = categorySlug(label);
    setParams(next);
  };

  const visible = useMemo(() => {
    const q = normalize(query).trim();
    return products.filter((p) => {
      if ((p.group || "deler") !== group.slug) return false;
      if (category && p.category !== category) return false;
      if (!q) return true;
      const haystack = normalize(
        [p.title, p.brand, p.category, p.placeholderLabel, p.sku, ...(p.fits || [])].join(" "),
      );
      return haystack.includes(q);
    });
  }, [group.slug, category, query]);

  const chipClass = (active) =>
    cx(
      "h-10 shrink-0 border px-4 text-sm font-semibold transition-colors",
      active
        ? "border-brand-primary bg-brand-primary text-brand-text-inverse"
        : "border-brand-border-strong bg-transparent text-brand-text hover:border-brand-primary",
    );

  return (
    <>
      <PageHero kicker={t.kicker} title={t.title} lead={t.lead} compact>
        <BrandChips prefix={partsSection.brandsPrefix} brands={brands.parts} tone="dark" />
      </PageHero>

      <section className="section-pad bg-brand-bg text-brand-text">
        <div className="container-site flex flex-col gap-6 md:gap-8">
          {/* Gruppeveksler */}
          <div
            className="grid grid-cols-2 border border-brand-border-strong bg-brand-card p-1 sm:inline-grid sm:self-start"
            role="group"
            aria-label={t.groupLabel}
          >
            {groups.map((g) => {
              const active = g.slug === group.slug;
              return (
                <button
                  key={g.slug}
                  type="button"
                  onClick={() => setGroup(g.slug)}
                  aria-pressed={active}
                  className={cx(
                    "h-11 px-5 text-[15px] font-bold transition-colors sm:min-w-[180px]",
                    active
                      ? "bg-brand-primary text-brand-text-inverse"
                      : "text-brand-text hover:bg-brand-surface",
                  )}
                >
                  {g.label}
                </button>
              );
            })}
          </div>

          <p className="max-w-2xl text-[17px] leading-relaxed text-brand-muted">{gt.lead}</p>

          {/* Kategorier og søk */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div
              className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
              role="group"
              aria-label="Kategorier"
            >
              <button
                type="button"
                onClick={() => setCategory(null)}
                aria-pressed={!category}
                className={chipClass(!category)}
              >
                {group.allLabel}
              </button>
              {group.categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={c === category}
                  className={chipClass(c === category)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="delesok" className="sr-only">
                {gt.searchLabel}
              </label>
              <div className="relative w-full md:w-72">
                <Icon
                  name="Search"
                  size={18}
                  strokeWidth={2}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
                />
                <input
                  id="delesok"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={gt.searchPlaceholder}
                  className="h-11 w-full border border-brand-border-strong bg-brand-card pl-10 pr-3 text-base text-brand-text placeholder:text-brand-muted focus:border-brand-primary focus:outline-none"
                />
              </div>
              {cart.count > 0 && (
                <button
                  type="button"
                  onClick={cart.open}
                  className="inline-flex h-11 shrink-0 items-center gap-2 bg-brand-primary px-4 text-sm font-bold text-brand-text-inverse"
                  aria-label={`${partsSection.cart.title}, ${cart.count} ${cart.count === 1 ? partsSection.cart.item : partsSection.cart.items}`}
                >
                  <Icon name="ShoppingCart" size={18} strokeWidth={2} />
                  {cart.count}
                </button>
              )}
            </div>
          </div>

          <h2 className="sr-only">{t.gridTitle}</h2>
          <p className="text-sm text-brand-muted" aria-live="polite">
            {visible.length} {gt.resultsLabel}
          </p>

          {visible.length ? (
            <ul className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
              {visible.map((product, i) => (
                <Reveal as="li" key={product.slug} delay={(i % 4) * 40}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-start gap-4 border border-brand-border bg-brand-card p-8">
              <p className="text-lg font-bold">{gt.noResults}</p>
              <Button to={gt.requestCta.to} variant="dark" size="sm" arrow>
                {gt.requestCta.label}
              </Button>
            </div>
          )}

          <p className="border-l-2 border-brand-accent pl-4 text-sm text-brand-muted">
            {t.mockNote}
          </p>
        </div>
      </section>

      {/* Butikken i Myggveien */}
      <section className="section-pad bg-brand-primary text-brand-text-inverse">
        <div className="container-site flex flex-col gap-8 md:gap-10">
          <SectionHeader kicker={t.storeKicker} title={t.storeTitle} lead={t.storeText} />
          <BrandChips prefix={t.storeBrandsPrefix} brands={brands.store} tone="dark" />
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            {STORE_IMAGES.map((img, i) => (
              <Reveal
                as="li"
                key={img.image}
                delay={i * 50}
                className="aspect-[3/4] overflow-hidden border border-brand-border-dark"
              >
                <Picture
                  src={img.image}
                  alt={img.alt}
                  sizes="(min-width: 1024px) 282px, 50vw"
                  className="h-full w-full"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
