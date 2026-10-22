import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import BrandWall from "../components/BrandWall";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Picture from "../components/Picture";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import Breadcrumbs from "../components/katalog/Breadcrumbs";
import CatalogSearch from "../components/katalog/CatalogSearch";
import CatalogSteps from "../components/katalog/CatalogSteps";
import CatalogTabs from "../components/katalog/CatalogTabs";
import CatalogTree from "../components/katalog/CatalogTree";
import MyCarChip from "../components/katalog/MyCarChip";
import PartsList, { SortSelect } from "../components/katalog/PartsList";
import SourceRequest from "../components/katalog/SourceRequest";
import StoreVideo from "../components/katalog/StoreVideo";
import { useCart } from "../context/CartContext";
import { brands } from "../data/brands";
import { categories } from "../data/catalog";
import { products } from "../data/products";
import { partsSection, seo } from "../data/siteContent";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { Link, Navigate } from "../i18n/LocaleLink";
import { stripLocale } from "../i18n/locale";
import {
  CLOTHES_CATEGORY,
  OIL_CATEGORY,
  SHOP,
  categoryPath,
  countBy,
  parseCategoryPath,
  parseVehiclePath,
  productPath,
  productsFor,
  searchCatalog,
  vehicleLabel,
  vehiclePath,
} from "../lib/catalog";
import { cx } from "../lib/format";
import { expandCar, setMyCar, useMyCar } from "../lib/myCar";

// Butikkbilder fotografert 21.10.2026 (ingen personer i bakgrunnen).
const STORE_IMAGES = [
  { image: "/images/butikk/butikk-mobil-vegg", alt: "Butikken med capser, klær og oljehyller" },
  { image: "/images/butikk/butikk-stetson-capser", alt: "Capser på hylla i butikken" },
  { image: "/images/butikk/butikk-bord-klaer-capser", alt: "Bord med T-skjorter og capser" },
  { image: "/images/butikk/butikk-hylle-kjemi", alt: "Hylle med rustbeskyttelse og kjemi" },
];

/** Gamle lenker (?gruppe= og ?kategori= fra runde 2) til de nye stiene. */
const OLD_CATEGORY = {
  klaer: categoryPath({ category: CLOTHES_CATEGORY, type: "klaer" }),
  "capser-og-tilbehor": categoryPath({ category: CLOTHES_CATEGORY, type: "capser-og-tilbehor" }),
  "us-biler": vehiclePath(),
  tesla: vehiclePath({ brand: "tesla" }),
  "motor-og-drivverk": categoryPath({ category: "motor" }),
  bremser: categoryPath({ category: "bremser" }),
  understell: categoryPath({ category: "understell-og-styring" }),
  tilbehor: categoryPath({ category: OIL_CATEGORY }),
};

const EMPTY = { brand: null, model: null, year: null, category: null, type: null };

function countLabel(n) {
  const s = partsSection.catalog.countSuffix;
  return `${n} ${n === 1 ? s.one : s.many}`;
}

/**
 * Butikken: delekatalog etter bil og etter kategori, søk, tette varelister og
 * «Min bil». Tilstanden er adressen:
 *   /deler/bil/<merke>/<modell>/<år>/<kategori>/<deltype>
 *   /deler/kategori/<kategori>/<deltype>
 *   /deler/sok?q=<søk>
 * Fra 1024 px står treet i en venstre kolonne, på mobil vises ett nivå om gangen.
 */
export default function Deler() {
  useSeoMeta(seo.deler);
  const cart = useCart();
  const t = partsSection.page;
  const c = partsSection.catalog;
  const location = useLocation();
  const { "*": splat = "" } = useParams();
  const [searchParams] = useSearchParams();
  const myCar = useMyCar();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [sort, setSort] = useState("relevans");

  const path = stripLocale(location.pathname).replace(/\/$/, "");
  const mode =
    path === SHOP
      ? "root"
      : path.startsWith(`${SHOP}/bil`)
        ? "bil"
        : path.startsWith(`${SHOP}/kategori`)
          ? "kategori"
          : path === `${SHOP}/sok`
            ? "sok"
            : "root";
  const query = mode === "sok" ? (searchParams.get("q") || "").trim() : "";

  const sel = useMemo(() => {
    if (mode === "bil") return parseVehiclePath(splat);
    if (mode === "kategori") return parseCategoryPath(splat);
    return EMPTY;
  }, [mode, splat]);

  // Husk bilen når merke, modell og årsmodell er valgt.
  const brandSlug = sel.brand?.slug;
  const modelSlug = sel.model?.slug;
  const year = sel.year;
  useEffect(() => {
    if (brandSlug && modelSlug && year) setMyCar({ brand: brandSlug, model: modelSlug, year });
  }, [brandSlug, modelSlug, year]);

  // Treets tall: i «etter bil» telles bare det som passer bilen, ellers alt.
  const scope = useMemo(
    () =>
      mode === "bil"
        ? productsFor({ brand: sel.brand, model: sel.model, year: sel.year })
        : products,
    [mode, sel.brand, sel.model, sel.year],
  );
  const counts = useMemo(() => countBy(scope), [scope]);

  const search = useMemo(
    () => (mode === "sok" && query ? searchCatalog(query, { myCar }) : null),
    [mode, query, myCar],
  );

  const items = useMemo(() => {
    if (mode === "sok") return search ? search.products : [];
    return productsFor(sel);
  }, [mode, sel, search]);

  // Gamle lenker og rot.
  if (mode === "root") {
    const gruppe = searchParams.get("gruppe");
    const kategori = searchParams.get("kategori");
    if (kategori && OLD_CATEGORY[kategori]) return <Navigate replace to={OLD_CATEGORY[kategori]} />;
    if (gruppe === "klaer")
      return <Navigate replace to={categoryPath({ category: CLOTHES_CATEGORY })} />;
    if (gruppe === "deler") return <Navigate replace to={categoryPath()} />;
    return <Navigate replace to={myCar ? vehiclePath(myCar) : vehiclePath()} />;
  }
  // Ugyldige segmenter i stien: gå til den gyldige delen.
  if (mode === "bil" && vehiclePath(sel) !== path)
    return <Navigate replace to={vehiclePath(sel)} />;
  if (mode === "kategori" && categoryPath(sel) !== path) {
    return <Navigate replace to={categoryPath(sel)} />;
  }
  // Eksakt varenummer går rett til varen.
  if (search?.exact) return <Navigate replace to={productPath(search.exact)} />;

  const activeTab =
    mode === "bil"
      ? "bil"
      : mode === "kategori"
        ? sel.category?.slug === OIL_CATEGORY
          ? "olje"
          : sel.category?.slug === CLOTHES_CATEGORY
            ? "klaer"
            : "kategori"
        : null;

  // Brødsmuler og tilbake-sti.
  const crumbs = [{ label: c.shopCrumb, to: mode === "kategori" ? categoryPath() : vehiclePath() }];
  if (mode === "bil") {
    if (sel.brand) crumbs.push({ label: sel.brand.name, to: vehiclePath({ brand: sel.brand }) });
    if (sel.model) {
      crumbs.push({
        label: sel.model.name,
        to: vehiclePath({ brand: sel.brand, model: sel.model }),
      });
    }
    if (sel.year) {
      crumbs.push({
        label: String(sel.year),
        to: vehiclePath({ brand: sel.brand, model: sel.model, year: sel.year }),
      });
    }
  }
  if (sel.category) {
    crumbs.push({
      label: sel.category.name,
      to:
        mode === "bil"
          ? vehiclePath({ ...sel, type: null })
          : categoryPath({ category: sel.category }),
    });
  }
  if (sel.type) {
    crumbs.push({
      label: sel.type.name,
      to: mode === "bil" ? vehiclePath(sel) : categoryPath(sel),
    });
  }
  if (mode === "sok") crumbs.push({ label: `${c.resultsFor} «${query}»`, to: path });
  const backTo = crumbs.length > 1 ? crumbs[crumbs.length - 2].to : null;

  const vehicleText = sel.brand ? vehicleLabel(sel) : myCar ? vehicleLabel(expandCar(myCar)) : "";
  const requestItem = mode === "sok" ? query : sel.type?.name || sel.category?.name || undefined;
  const grid = sel.category?.slug === CLOTHES_CATEGORY;

  // På mobil vises varelisten når kategori eller deltype er valgt, eller ved søk.
  const showList = mode === "sok" || isDesktop || Boolean(sel.category);

  const listHeader = (title, sub) => (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        {title && (
          <h2 className="text-xl font-bold md:text-2xl" translate="no">
            {title}
          </h2>
        )}
        <p className="text-sm text-brand-muted" aria-live="polite">
          {countLabel(items.length)}
          {sub ? ` · ${sub}` : ""}
        </p>
      </div>
      {items.length > 1 && <SortSelect value={sort} onChange={setSort} />}
    </div>
  );

  let main = null;
  if (mode === "sok") {
    const vehicle = search?.vehicle;
    const category = search?.best?.category || null;
    const type = search?.best?.type || null;
    main = (
      <div className="flex flex-col gap-5">
        {listHeader(`${c.resultsFor} «${query}»`)}
        {vehicle?.brand && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border border-brand-border bg-brand-card px-4 py-3 text-sm">
            <span className="text-brand-muted">{c.resultsVehicle}</span>
            <strong translate="no">{vehicleLabel(vehicle)}</strong>
            <Link
              to={vehiclePath({ ...vehicle, category, type })}
              className="link-underline border-brand-accent-deep text-sm text-brand-text hover:text-brand-accent-deep"
            >
              {c.showVehicleParts} <span translate="no">{vehicleLabel(vehicle)}</span>
              <Icon name="ArrowRight" size={16} strokeWidth={2.2} />
            </Link>
          </div>
        )}
        {items.length ? (
          <PartsList key={path + query} items={items} myCar={myCar} sort={sort} />
        ) : (
          <div className="flex flex-col gap-1 border border-brand-border bg-brand-card p-5">
            <p className="text-lg font-bold">{c.noResultsTitle}</p>
            <p className="text-sm text-brand-muted">{c.noResultsText}</p>
          </div>
        )}
        <SourceRequest item={query} vehicle={vehicleText} ctaLabel={c.source.ctaSearch} />
      </div>
    );
  } else if (mode === "kategori" && !sel.category) {
    main = (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold md:text-2xl">{c.allCategoriesTitle}</h2>
          <p className="text-sm text-brand-muted">{c.allCategoriesIntro}</p>
        </div>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {categories.map((category) => {
            const n = counts.category(category);
            return (
              <li key={category.slug}>
                <Link
                  to={categoryPath({ category })}
                  className="flex h-full flex-col gap-3 border border-brand-border bg-brand-card p-4 transition-colors hover:border-brand-accent"
                >
                  <span className="flex h-10 w-10 items-center justify-center bg-brand-primary text-brand-text-inverse">
                    <Icon name={category.icon} size={22} strokeWidth={1.8} />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-bold leading-snug">{category.name}</span>
                    <span className="text-xs text-brand-muted">{countLabel(n)}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else if (mode === "bil" && !sel.brand) {
    main = (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1 border border-brand-border bg-brand-card p-5">
          <p className="text-lg font-bold">{c.chooseBrand}</p>
          <p className="text-sm text-brand-muted">{c.pickBrandIntro}</p>
          {!myCar && <p className="text-sm text-brand-muted">{c.myCar.hint}</p>}
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold md:text-2xl">{c.fitsAllGroup}</h2>
          <PartsList
            key="universal"
            items={productsFor({ category: OIL_CATEGORY })}
            myCar={myCar}
            sort={sort}
            showFits={false}
          />
        </div>
      </div>
    );
  } else {
    const title =
      sel.type?.name ||
      sel.category?.name ||
      (sel.brand ? `${c.partsFor} ${vehicleLabel(sel)}` : c.allCategoriesTitle);
    const hint =
      mode === "bil" && !sel.model
        ? c.narrowModel
        : mode === "bil" && !sel.year
          ? c.narrowYear
          : null;
    main = (
      <div className="flex flex-col gap-5">
        {/* På mobil står overskriften allerede i den trinnvise listen. */}
        {listHeader(
          isDesktop ? title : null,
          mode === "bil" && sel.category ? vehicleLabel(sel) : null,
        )}
        {hint && (
          <p className="border-l-2 border-brand-accent pl-3 text-sm text-brand-muted">{hint}</p>
        )}
        {items.length ? (
          <PartsList
            key={path}
            items={items}
            myCar={myCar}
            sort={sort}
            grid={grid}
            showFits={mode !== "bil" || !sel.year}
          />
        ) : (
          <p className="text-sm text-brand-muted">{c.categoryEmpty}</p>
        )}
        {!grid && <SourceRequest item={requestItem} vehicle={vehicleText} />}
      </div>
    );
  }

  return (
    <>
      {/* Lav stripe med tittel: katalogen skal stå i første skjermbilde. */}
      <section className="border-b border-brand-border-dark bg-brand-primary text-brand-text-inverse">
        <div className="container-site flex flex-col gap-2 py-5 md:flex-row md:items-end md:justify-between md:gap-8 md:py-7">
          <div className="flex flex-col gap-1.5">
            <p className="kicker text-brand-accent-light">{t.kicker}</p>
            <h1 className="font-display text-4xl leading-[0.95] tracking-wide md:text-6xl">
              {t.title}
            </h1>
          </div>
          <p className="hidden max-w-xl text-[15px] leading-relaxed text-brand-muted-inverse md:block">
            {t.lead}
          </p>
        </div>
      </section>

      <section className="bg-brand-bg py-5 text-brand-text md:py-8">
        <div className="container-site flex flex-col gap-4 md:gap-5">
          {/* Søk og handlekurv */}
          <div className="flex items-start gap-2 md:gap-3">
            <CatalogSearch initial={query} myCar={myCar} className="min-w-0 flex-1" />
            <button
              type="button"
              onClick={cart.open}
              className={cx(
                "relative flex h-12 shrink-0 items-center gap-2 rounded-field border px-3 text-sm font-bold transition-colors md:h-[52px] md:px-4",
                cart.count > 0
                  ? "border-brand-primary bg-brand-primary text-brand-text-inverse"
                  : "border-brand-border-strong bg-brand-card text-brand-text hover:border-brand-primary",
              )}
              aria-label={`${partsSection.cart.title}, ${cart.count} ${cart.count === 1 ? partsSection.cart.item : partsSection.cart.items}`}
            >
              <Icon name="ShoppingCart" size={20} strokeWidth={2} />
              <span className="tabular-nums">{cart.count}</span>
            </button>
          </div>

          <MyCarChip car={myCar} />
          <CatalogTabs active={activeTab} myCar={myCar ? expandCar(myCar) : null} />

          <div className="lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start lg:gap-8">
            {isDesktop ? (
              <div className="border border-brand-border bg-brand-card lg:sticky lg:top-[104px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
                {mode === "sok" ? (
                  <CatalogTree
                    mode="kategori"
                    sel={EMPTY}
                    counts={countBy(products)}
                    myCar={myCar}
                  />
                ) : (
                  <CatalogTree mode={mode} sel={sel} counts={counts} myCar={myCar} />
                )}
              </div>
            ) : (
              mode !== "sok" && (
                <CatalogSteps
                  mode={mode}
                  sel={sel}
                  counts={counts}
                  crumbs={crumbs}
                  backTo={backTo}
                  myCar={myCar}
                />
              )
            )}

            <div className={cx("flex min-w-0 flex-col gap-4", !isDesktop && "mt-6")}>
              {(isDesktop || mode === "sok") && <Breadcrumbs crumbs={crumbs} />}
              {showList && main}
            </div>
          </div>

          <p className="border-l-2 border-brand-accent pl-4 text-sm text-brand-muted">
            {t.mockNote}
          </p>
        </div>
      </section>

      {/* Butikken i Myggveien */}
      <section className="section-pad bg-brand-primary text-brand-text-inverse">
        <div className="container-site flex flex-col gap-6 md:gap-8">
          <SectionHeader kicker={t.storeKicker} title={t.storeTitle} />
          <BrandWall items={brands.store} label={t.storeBrandsPrefix} tone="dark" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-6">
            <StoreVideo
              src={t.storeVideo}
              poster={t.storeVideoPoster}
              alt={t.storeVideoAlt}
              className="col-span-2 aspect-video md:row-span-2"
            />
            {STORE_IMAGES.map((img, i) => (
              <Reveal
                key={img.image}
                delay={i * 50}
                className="aspect-[4/3] overflow-hidden border border-brand-border-dark md:aspect-auto md:h-full"
              >
                <Picture
                  src={img.image}
                  alt={img.alt}
                  sizes="(min-width: 1024px) 282px, 50vw"
                  className="h-full w-full"
                />
              </Reveal>
            ))}
          </div>
          <Button to={vehiclePath()} variant="outlineDark" size="sm" arrow className="self-start">
            {c.tabs.bil}
          </Button>
        </div>
      </section>
    </>
  );
}
