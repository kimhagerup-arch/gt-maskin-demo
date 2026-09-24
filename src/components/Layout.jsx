import { Outlet } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import Footer from "./Footer";
import Header from "./Header";
import StickyMobileBar from "./StickyMobileBar";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#innhold"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-brand-accent focus:px-4 focus:py-2 focus:text-brand-primary"
      >
        Hopp til innhold
      </a>
      <Header />
      <main id="innhold" className="flex-1 pb-14 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <StickyMobileBar />
      <CartDrawer />
    </div>
  );
}
