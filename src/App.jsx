import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RouteFallback from "./components/RouteFallback";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";

const Verksted = lazy(() => import("./pages/Verksted"));
const Deler = lazy(() => import("./pages/Deler"));
const Produkt = lazy(() => import("./pages/Produkt"));
const Kasse = lazy(() => import("./pages/Kasse"));
const BilerTilSalgs = lazy(() => import("./pages/BilerTilSalgs"));
const Utleie = lazy(() => import("./pages/Utleie"));
const OmOss = lazy(() => import("./pages/OmOss"));
const Bestill = lazy(() => import("./pages/Bestill"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Personvern = lazy(() => import("./pages/Personvern"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<RouteFallback />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="verksted"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Verksted />
              </Suspense>
            }
          />
          <Route
            path="deler"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Deler />
              </Suspense>
            }
          />
          <Route
            path="deler/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Produkt />
              </Suspense>
            }
          />
          <Route
            path="kasse"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Kasse />
              </Suspense>
            }
          />
          <Route
            path="biler-til-salgs"
            element={
              <Suspense fallback={<RouteFallback />}>
                <BilerTilSalgs />
              </Suspense>
            }
          />
          <Route
            path="utleie"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Utleie />
              </Suspense>
            }
          />
          <Route
            path="om-oss"
            element={
              <Suspense fallback={<RouteFallback />}>
                <OmOss />
              </Suspense>
            }
          />
          <Route
            path="bestill"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Bestill />
              </Suspense>
            }
          />
          <Route
            path="kontakt"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Kontakt />
              </Suspense>
            }
          />
          <Route
            path="personvern"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Personvern />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </CartProvider>
  );
}
