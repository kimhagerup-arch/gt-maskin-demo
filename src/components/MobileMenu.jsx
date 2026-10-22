import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { companyFacts } from "../data/companyFacts";
import { nav, socialLinks } from "../data/siteContent";
import { cx } from "../lib/format";
import Button from "./Button";
import Icon from "./Icon";
import InstallButton from "./InstallButton";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";

/**
 * Fullskjerms mobilmeny. Lukkes med Escape, ved klikk på lenke og ved rutebytte
 * (Header håndterer rutebytte). Fokus flyttes inn ved åpning og tilbake ved lukking.
 */
export default function MobileMenu({ id, open, onClose, returnFocusRef }) {
  const firstLinkRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 30);

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
      returnFocusRef?.current?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  return (
    <div
      id={id}
      ref={panelRef}
      className={cx(
        "fixed inset-0 z-50 flex flex-col bg-brand-primary text-brand-text-inverse lg:hidden",
        open ? "animate-fade-in" : "hidden",
      )}
      aria-hidden={!open}
    >
      <div className="flex h-16 items-center justify-between border-b border-brand-border-dark px-6">
        <Logo size="sm" />
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-pill border border-brand-border-dark-strong text-brand-text-inverse"
          aria-label={nav.menuClose}
        >
          <Icon name="X" size={22} strokeWidth={2} />
        </button>
      </div>
      <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-8" aria-label="Hovedmeny">
        <ul className="flex flex-col">
          {nav.items.map((item, index) => (
            <li key={item.to} className="border-b border-brand-border-dark">
              <NavLink
                ref={index === 0 ? firstLinkRef : undefined}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  cx(
                    "flex min-h-[64px] items-center justify-between py-4 font-display text-4xl tracking-wide transition-colors",
                    isActive ? "text-brand-accent-light" : "text-brand-text-inverse",
                  )
                }
              >
                <span>{item.label}</span>
                <Icon name="ArrowRight" size={22} strokeWidth={2} className="text-brand-outline" />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col gap-3 border-t border-brand-border-dark px-6 py-6">
        <a
          href={companyFacts.phone.href}
          className="inline-flex h-12 items-center justify-center gap-2.5 border-[1.5px] border-brand-outline text-[17px] font-semibold"
        >
          <Icon name="Phone" size={18} strokeWidth={2} />
          {companyFacts.phone.display}
        </a>
        <Button to={nav.cta.to} onClick={onClose} arrow>
          {nav.cta.label}
        </Button>
        <SocialIcons label={socialLinks.follow} className="justify-center pt-1" />
        <p className="text-center text-sm text-brand-muted-inverse">
          {companyFacts.address.full} · {companyFacts.hours.short}
        </p>
        <InstallButton className="w-full" onDone={onClose} />
      </div>
    </div>
  );
}
