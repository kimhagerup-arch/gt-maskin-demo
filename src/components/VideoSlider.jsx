import { useCallback, useEffect, useRef, useState } from "react";
import { videoSection } from "../data/siteContent";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cx } from "../lib/format";
import Icon from "./Icon";

/**
 * Vannrett liste med kort. Mobil: sveip med scroll-snap, sporet går ut til
 * skjermkanten så neste kort synes i kanten. Desktop: piler som blar ett kort
 * om gangen og er deaktivert i hver ende. Ingen bibliotek. Tastatur: kortene
 * er knapper, og nettleseren ruller et fokusert kort inn i sporet selv.
 * prefers-reduced-motion gir rulling uten animasjon.
 */
export default function VideoSlider({ title, label, children, className }) {
  const trackRef = useRef(null);
  const reduced = useReducedMotion();
  const [edges, setEdges] = useState({ start: true, end: true });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    observer?.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const step = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector("li");
    const gap = Number.parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const width = first ? first.getBoundingClientRect().width + gap : el.clientWidth / 2;
    el.scrollBy({ left: direction * width, behavior: reduced ? "auto" : "smooth" });
  };

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-pill border border-brand-border-dark-strong text-brand-text-inverse transition-colors hover:border-brand-accent-light hover:text-brand-accent-light disabled:cursor-default disabled:opacity-35 disabled:hover:border-brand-border-dark-strong disabled:hover:text-brand-text-inverse";

  return (
    <div className={cx("flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between gap-4">
        {title}
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            className={arrow}
            onClick={() => step(-1)}
            disabled={edges.start}
            aria-label={videoSection.prev}
          >
            <Icon name="ChevronLeft" size={22} strokeWidth={2} />
          </button>
          <button
            type="button"
            className={arrow}
            onClick={() => step(1)}
            disabled={edges.end}
            aria-label={videoSection.next}
          >
            <Icon name="ChevronRight" size={22} strokeWidth={2} />
          </button>
        </div>
      </div>
      <ul
        ref={trackRef}
        aria-label={label}
        className="scrollbar-none -mx-4 -my-1 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 py-1 md:mx-0 md:scroll-px-0 md:gap-4 md:px-0"
      >
        {children}
      </ul>
    </div>
  );
}
