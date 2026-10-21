import { useCallback, useEffect, useRef, useState } from "react";
import { sliderLabels } from "../data/siteContent";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cx } from "../lib/format";
import Reveal from "./Reveal";

const MOBILE = "(max-width: 767px)";

/** Venstre innmarg i sporet (sporet går ut til skjermkanten, kortene starter innenfor). */
const padding = (el) => Number.parseFloat(getComputedStyle(el).paddingLeft || "0") || 0;

/**
 * Kortliste som er en vannrett slider under 768 px og et vanlig rutenett fra
 * 768 px. Mobil: scroll-snap, sporet går ut til skjermkanten så neste kort
 * stikker inn fra høyre, sveip med fingeren, og klikkbare prikker under som
 * viser hvor man er. Vertikal rulling kapres aldri (ren nettleserrulling, og
 * sporet kan ikke rulle loddrett). Tab går gjennom kortene, og kortet som får
 * fokus rulles inn. Ingen myk rulling ved prefers-reduced-motion.
 *
 * items: liste, renderItem(item, index) gir kortet, keyOf(item) gir nøkkel.
 * gridClassName: kolonner fra md (f.eks. "md:grid-cols-2 lg:grid-cols-3").
 */
export default function MobileSlider({
  items = [],
  renderItem,
  keyOf = (item) => item.id || item.slug,
  label,
  gridClassName = "md:grid-cols-2 lg:grid-cols-3",
  itemClassName = "w-[82%] sm:w-[60%]",
  tone = "light",
  className,
}) {
  const trackRef = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const count = items.length;

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const start = el.getBoundingClientRect().left + padding(el);
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    [...el.children].forEach((li, i) => {
      const dist = Math.abs(li.getBoundingClientRect().left - start);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure]);

  const goTo = (index) => {
    const el = trackRef.current;
    const li = el?.children[index];
    if (!el || !li) return;
    el.scrollTo({ left: li.offsetLeft - padding(el), behavior: reduced ? "auto" : "smooth" });
  };

  // Kortet som får fokus (Tab) rulles inn i sporet på mobil.
  const onFocus = (e) => {
    if (!window.matchMedia(MOBILE).matches) return;
    const li = e.target.closest("li");
    const el = trackRef.current;
    if (!li || !el || li.parentElement !== el) return;
    el.scrollTo({ left: li.offsetLeft - padding(el), behavior: reduced ? "auto" : "smooth" });
  };

  const dark = tone === "dark";

  return (
    <div className={cx("flex flex-col gap-4 md:gap-0", className)}>
      <ul
        ref={trackRef}
        aria-label={label}
        onFocus={onFocus}
        className={cx(
          "scrollbar-none relative -mx-6 -my-3 flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden scroll-px-6 px-6 py-3",
          "md:mx-0 md:my-0 md:grid md:gap-6 md:overflow-visible md:px-0 md:py-0",
          gridClassName,
        )}
      >
        {items.map((item, i) => (
          <Reveal
            as="li"
            key={keyOf(item, i)}
            delay={(i % 3) * 60}
            className={cx("shrink-0 snap-start md:w-auto", itemClassName)}
          >
            {renderItem(item, i)}
          </Reveal>
        ))}
      </ul>

      {count > 1 && (
        <div
          className="flex items-center justify-center md:hidden"
          role="group"
          aria-label={sliderLabels.dotsLabel}
        >
          {items.map((item, i) => {
            const current = i === active;
            return (
              <button
                key={keyOf(item, i)}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${sliderLabels.goTo} ${i + 1} ${sliderLabels.of} ${count}`}
                aria-current={current ? "true" : undefined}
                className="flex h-11 w-7 items-center justify-center"
              >
                <span
                  className={cx(
                    "block h-2.5 rounded-pill transition-[width,background-color] duration-200",
                    current
                      ? "w-6 bg-brand-accent"
                      : dark
                        ? "w-2.5 bg-brand-border-dark-strong"
                        : "w-2.5 bg-brand-border-strong",
                  )}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
