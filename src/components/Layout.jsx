import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { a11y } from "../data/siteContent";
import { installVegasAndVisibility } from "../lib/vegas";
import CartDrawer from "./CartDrawer";
import DraftBanner from "./DraftBanner";
import Footer from "./Footer";
import Header from "./Header";
import InstallPrompt from "./InstallPrompt";
import LangStripe from "./LangStripe";
import StickyMobileBar from "./StickyMobileBar";
import StructuredData from "./StructuredData";

export default function Layout() {
  // Pause av animasjoner i skjult fane og Vegas-tastene (lib/vegas.js), én gang.
  useEffect(() => {
    installVegasAndVisibility();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#innhold"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-brand-accent focus:px-4 focus:py-2 focus:text-brand-primary"
      >
        {a11y.skipToContent}
      </a>
      <DraftBanner />
      <LangStripe />
      <StructuredData />
      <Header />
      <main id="innhold" className="flex-1 pb-14 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <StickyMobileBar />
      <InstallPrompt />
      <CartDrawer />
    </div>
  );
}
