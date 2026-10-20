import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { companyFacts } from "../data/companyFacts";
import { nav } from "../data/siteContent";
import { cx } from "../lib/format";
import Button from "./Button";
import Icon from "./Icon";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SocialIcons from "./SocialIcons";

const MENU_ID = "mobilmeny";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const location = useLocation();
  const cart = useCart();

  const close = useCallback(() => setOpen(false), []);

  // Lukk menyen ved rutebytte.
  // biome-ignore lint/correctness/useExhaustiveDependencies: menyen skal lukkes ved hvert rutebytte
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border-dark bg-brand-primary">
      <div className="container-site flex h-16 items-center justify-between md:h-[88px]">
        <Logo />

        <nav className="hidden items-center gap-3.5 lg:flex xl:gap-7" aria-label="Hovedmeny">
          {nav.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cx(
                  "whitespace-nowrap border-b-2 py-1 text-[14px] font-semibold tracking-[0.02em] transition-colors duration-150 xl:text-[15px]",
                  isActive
                    ? "border-brand-accent text-brand-text-inverse"
                    : "border-transparent text-brand-text-inverse hover:border-brand-outline",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 xl:gap-4">
          <SocialIcons className="hidden lg:flex" />
          <a
            href={companyFacts.phone.href}
            className="hidden items-center gap-2 text-base font-bold tracking-[0.02em] text-brand-text-inverse transition-colors hover:text-brand-accent-light xl:inline-flex"
          >
            <Icon name="Phone" size={18} strokeWidth={2} />
            {companyFacts.phone.display}
          </a>

          {cart.count > 0 && (
            <button
              type="button"
              onClick={cart.open}
              className="relative flex h-11 w-11 items-center justify-center rounded-pill border border-brand-border-dark-strong text-brand-text-inverse transition-colors hover:border-brand-accent-light"
              aria-label={`${nav.cartLabel}, ${cart.count} ${cart.count === 1 ? "vare" : "varer"}`}
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
            aria-label={`Ring ${companyFacts.phone.display}`}
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

      <MobileMenu id={MENU_ID} open={open} onClose={close} returnFocusRef={menuButtonRef} />
    </header>
  );
}
