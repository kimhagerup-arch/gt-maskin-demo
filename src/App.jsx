import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import RouteFallback from "./components/RouteFallback";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import { LocaleProvider } from "./i18n/LocaleContext";
import { EN_PREFIX, readStoredLocale } from "./i18n/locale";
import Home from "./pages/Home";

const Verksted = lazy(() => import("./pages/Verksted"));
const Deler = lazy(() => import("./pages/Deler"));
const Produkt = lazy(() => import("./pages/Produkt"));
const Kasse = lazy(() => import("./pages/Kasse"));
const BilerTilSalgs = lazy(() => import("./pages/BilerTilSalgs"));
const Bil = lazy(() => import("./pages/Bil"));
const Video = lazy(() => import("./pages/Video"));
const Utleie = lazy(() => import("./pages/Utleie"));
const OmOss = lazy(() => import("./pages/OmOss"));
const Bestill = lazy(() => import("./pages/Bestill"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Personvern = lazy(() => import("./pages/Personvern"));
const NotFound = lazy(() => import("./pages/NotFound"));

const lazyPage = (Page) => (
  <Suspense fallback={<RouteFallback />}>
    <Page />
  </Suspense>
);

/** Sidene, samme stier på norsk (/) og engelsk (/en). Stiene i adressen er norske. */
const PAGES = [
  ["verksted", Verksted],
  // Butikken: samme side for roten, «etter bil», «alle kategorier» og søk.
  // De faste segmentene bil, kategori og sok vinner over deler/:slug.
  ["deler", Deler],
  ["deler/bil/*", Deler],
  ["deler/kategori/*", Deler],
  ["deler/sok", Deler],
  ["deler/:slug", Produkt],
  ["kasse", Kasse],
  ["biler-til-salgs", BilerTilSalgs],
  ["biler-til-salgs/:slug", Bil],
  ["video", Video],
  ["utleie", Utleie],
  ["om-oss", OmOss],
  ["bestill", Bestill],
  ["kontakt", Kontakt],
  ["personvern", Personvern],
  ["*", NotFound],
];

function pages() {
  return [
    <Route key="index" index element={lazyPage(Home)} />,
    ...PAGES.map(([path, Page]) => <Route key={path} path={path} element={lazyPage(Page)} />),
  ];
}

/**
 * Rot per språk: LocaleProvider gjør språket aktivt for datamodulene, og Layout
 * er nøklet på språk så hele treet rendres på nytt ved bytte. Den som har valgt
 * engelsk (localStorage) og kommer inn på /, sendes til /en.
 */
function LocaleRoot({ locale }) {
  const { pathname, search } = useLocation();
  if (locale === "nb" && pathname === "/" && readStoredLocale() === "en") {
    return <Navigate to={`${EN_PREFIX}${search || ""}`} replace />;
  }
  return (
    <LocaleProvider locale={locale}>
      <Layout key={locale} />
    </LocaleProvider>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LocaleRoot locale="nb" />}>
          {pages()}
        </Route>
        <Route path={EN_PREFIX} element={<LocaleRoot locale="en" />}>
          {pages()}
        </Route>
      </Routes>
    </CartProvider>
  );
}
