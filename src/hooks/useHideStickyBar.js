import { useEffect } from "react";
import { BOOKING_VISIBLE_EVENT } from "../components/StickyMobileBar";

/**
 * Skjuler den sticky mobil-CTA-en mens elementet i `ref` er i viewport.
 * Samme CustomEvent som BookingForm sender, så alle skjemaer oppfører seg likt.
 */
export function useHideStickyBar(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.dispatchEvent(
          new CustomEvent(BOOKING_VISIBLE_EVENT, { detail: entry.isIntersecting }),
        );
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.dispatchEvent(new CustomEvent(BOOKING_VISIBLE_EVENT, { detail: false }));
    };
  }, [ref]);
}
