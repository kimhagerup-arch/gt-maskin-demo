import { useEffect, useState } from "react";
import { companyFacts } from "../data/companyFacts";
import { a11y, nav } from "../data/siteContent";
import { Link } from "../i18n/LocaleLink";
import { cx } from "../lib/format";
import Icon from "./Icon";

export const BOOKING_VISIBLE_EVENT = "gtm:booking-visible";

/**
 * Diskret sticky bunnlinje på mobil med «Ring» og «Bestill time».
 * Skjules når bestillingsskjemaet er i viewport (BookingForm sender event).
 */
export default function StickyMobileBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onVisible = (e) => setHidden(Boolean(e.detail));
    window.addEventListener(BOOKING_VISIBLE_EVENT, onVisible);
    return () => window.removeEventListener(BOOKING_VISIBLE_EVENT, onVisible);
  }, []);

  return (
    <nav
      aria-label={a11y.quickLinks}
      className={cx(
        "fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-brand-border-dark bg-brand-primary/95 backdrop-blur transition-transform duration-200 md:hidden",
        hidden && "translate-y-full",
      )}
      aria-hidden={hidden}
    >
      <a
        href={companyFacts.phone.href}
        className="flex h-14 items-center justify-center gap-2 text-[15px] font-bold text-brand-text-inverse"
        tabIndex={hidden ? -1 : 0}
      >
        <Icon name="Phone" size={18} strokeWidth={2} className="text-brand-accent-light" />
        <span translate="no">{nav.mobileCall}</span>
      </a>
      <Link
        to={nav.cta.to}
        className="flex h-14 items-center justify-center gap-2 bg-brand-accent text-[15px] font-bold text-brand-primary"
        tabIndex={hidden ? -1 : 0}
      >
        {nav.cta.label}
        <Icon name="ArrowRight" size={18} strokeWidth={2.2} />
      </Link>
    </nav>
  );
}
