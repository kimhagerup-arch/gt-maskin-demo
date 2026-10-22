import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { companyFacts } from "../data/companyFacts";
import { a11y, header as headerText, nav } from "../data/siteContent";
import { NavLink } from "../i18n/LocaleLink";
import { cx } from "../lib/format";
import { useVegas } from "../lib/vegas";
import Button from "./Button";
import FlagBand from "./FlagBand";
import Icon from "./Icon";
import LangSwitch from "./LangSwitch";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import NeonPlate from "./NeonPlate";
import OpenSign from "./OpenSign";
import SocialIcons from "./SocialIcons";

const MENU_ID = "mobilmeny";
const SCROLLED_AT = 24;

/**
 * Header i USA- og Las Vegas-stil (runde 5b): stjerner og striper som smalt bånd
 * øverst, logoen på en skiltplate med neonkant, aktiv side med neonrør under,
 * ÅPEN-skilt ved telefonnummeret fra 1280 px, språkvelger med flagg på alle
 * bredder. Ved rulling blir headeren litt slankere (platen krymper) og får en
 * tynn kromkant nederst, uten at boksen endrer høyde (ingen CLS). Høyden er den
 * samme som før: 64 px på mobil, 88 px fra 768 px.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);
  const location = useLocation();
  const cart = useCart();
  const { on: vegas } = useVegas();

  const close = useCallback(() => setOpen(false), []);

  // Lukk menyen ved rutebytte.
  // biome-ignore lint/correctness/useExhaustiveDependencies: menyen skal lukkes ved hvert rutebytte
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > SCROLLED_AT));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className="sticky top-0 z-40 border-b border-brand-border-dark bg-brand-primary"
      data-scrolled={scrolled || undefined}
    >
      <FlagBand />
      <div className="container-site flex h-16 items-center justify-between md:h-[88px]">
        <NeonPlate className="header-plate">
          <Logo linkClassName="px-2 py-1 md:px-2.5" />
        </NeonPlate>

        <nav className="hidden items-center gap-3.5 lg:flex xl:gap-5" aria-label={a11y.mainMenu}>
          {nav.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="nav-neon whitespace-nowrap py-1 text-[14px] font-semibold tracking-[0.02em] text-brand-text-inverse transition-colors duration-150 xl:text-[15px]"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-2.5 xl:gap-3 lg:ml-6">
          {/* Facebook og Snapchat bare på brede skjermer; de står også i hero, footer og mobilmeny. */}
          <SocialIcons className="hidden 2xl:flex" />
          <a
            href={companyFacts.phone.href}
            className="hidden items-center gap-2 whitespace-nowrap text-[15px] font-bold tracking-[0.02em] text-brand-text-inverse transition-colors hover:text-brand-accent-light xl:inline-flex"
          >
            <Icon name="Phone" size={18} strokeWidth={2} />
            {companyFacts.phone.display}
          </a>
          <OpenSign className="hidden xl:inline-flex" />

          <LangSwitch />

          {cart.count > 0 && (
            <button
              type="button"
              onClick={cart.open}
              className="relative flex h-11 w-11 items-center justify-center rounded-pill border border-brand-border-dark-strong text-brand-text-inverse transition-colors hover:border-brand-accent-light"
              aria-label={`${nav.cartLabel}, ${cart.count} ${cart.count === 1 ? a11y.item : a11y.items}`}
            >
              <Icon name="ShoppingCart" size={20} strokeWidth={2} />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-pill bg-brand-accent px-1 text-[11px] font-bold text-brand-primary">
                {cart.count}
              </span>
            </button>
          )}

          <a
            href={companyFacts.phone.href}
            className="flex h-11 w-11 items-center justify-center rounded-pill bg-brand-accent text-brand-primary md:hidden"
            aria-label={`${a11y.callAria} ${companyFacts.phone.display}`}
          >
            <Icon name="Phone" size={20} strokeWidth={2} />
          </a>

          <Button to={nav.cta.to} size="sm" className="hidden whitespace-nowrap md:inline-flex">
            {nav.cta.label}
          </Button>

          <button
            ref={menuButtonRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-pill border border-brand-border-dark-strong text-brand-text-inverse lg:hidden"
            aria-label={open ? nav.menuClose : nav.menuOpen}
            aria-expanded={open}
            aria-controls={MENU_ID}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "X" : "Menu"} size={22} strokeWidth={2} />
          </button>
        </div>
      </div>
      <span className={cx("chrome-edge", scrolled && "is-on")} aria-hidden="true" />
      <span className="sr-only" aria-live="polite">
        {vegas ? headerText.vegas.on : ""}
      </span>

      <MobileMenu id={MENU_ID} open={open} onClose={close} returnFocusRef={menuButtonRef} />
    </header>
  );
}
