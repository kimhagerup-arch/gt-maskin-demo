import { useCallback, useEffect, useRef, useState } from "react";
import { a11y, hero } from "../data/siteContent";
import { useAfterLoad } from "../hooks/useAfterLoad";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cx } from "../lib/format";
import Picture from "./Picture";

const INTERVAL_MS = 5000;
const SWIPE_PX = 40;
/** De andre bildene monteres først så lenge etter window load, så de ikke
 * konkurrerer med første bilde og teksten om båndbredden (LCP). */
const REST_DELAY_MS = 2500;

/**
 * Bildeshow med bilene i forsidens hero, i en ramme med lyspærer som løper
 * rundt (gammelt marquee-skilt). Rolig krysstoning hvert 5. sekund med langsom
 * zoom. Pause ved hover, ved fokus og når fanen ikke er synlig. Sveip på mobil
 * og små prikker. Ved prefers-reduced-motion: ingen zoom, ingen automatisk
 * bytte, og pærene står stille.
 *
 * Ytelse: første bilde lastes eagert (LCP, forhåndslastet av gtm-hero-preload),
 * resten monteres 2,5 s etter window load, så de ikke konkurrerer med første
 * bilde og teksten (på en rask linje kommer load før første maling). Alle lag er absolutt plassert i en boks
 * med fast størrelse, så ingenting flytter seg (CLS 0).
 */
export default function HeroSlideshow({ slides = [], className, sizes }) {
  const reduced = useReducedMotion();
  const loaded = useAfterLoad();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(
    () => typeof document !== "undefined" && document.visibilityState === "hidden",
  );
  const [restReady, setRestReady] = useState(false);
  const touch = useRef(null);
  const count = slides.length;

  useEffect(() => {
    if (!loaded) return undefined;
    const timer = window.setTimeout(() => setRestReady(true), REST_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  const go = useCallback((next) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Automatisk bytte: bare når resten av bildene er lastet, ikke pauset,
  // fanen er synlig og brukeren ikke har bedt om redusert bevegelse.
  useEffect(() => {
    if (reduced || paused || hidden || !restReady || count < 2) return undefined;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [reduced, paused, hidden, restReady, count]);

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse") return;
    touch.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return;
    go(index + (dx < 0 ? 1 : -1));
  };

  if (!count) return null;

  return (
    <div
      className={cx("marquee-frame relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      {/* Lyspærene: fire kanter med stille og løpende pærer (index.css). */}
      <span className="marquee-bulbs marquee-bulbs-x top-0" aria-hidden="true" />
      <span className="marquee-bulbs marquee-bulbs-x bottom-0" aria-hidden="true" />
      <span className="marquee-bulbs marquee-bulbs-y left-0" aria-hidden="true" />
      <span className="marquee-bulbs marquee-bulbs-y right-0" aria-hidden="true" />

      <div
        className="relative h-full w-full touch-pan-y overflow-hidden bg-brand-primary-soft"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          touch.current = null;
        }}
        aria-roledescription={a11y.slideshowRole}
        aria-label={hero.slideshowLabel}
      >
        {slides.map((slide, i) => {
          const active = i === index;
          const mount = i === 0 || restReady;
          return (
            <div
              key={slide.image}
              className={cx(
                "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out",
                active ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={!active}
            >
              {mount && (
                <Picture
                  src={slide.image}
                  alt={slide.alt}
                  sizes={sizes}
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                  objectPosition={slide.position}
                  className="h-full w-full"
                  imgClassName={cx(
                    "h-full w-full object-cover",
                    !reduced && "hero-zoom",
                    !reduced && active && "hero-zoom-on",
                  )}
                  fallbackLabel="[Bilde av bil]"
                />
              )}
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <div
          className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-1"
          role="group"
          aria-label={hero.slideshowDots}
        >
          {slides.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => go(i)}
              aria-label={`${hero.slideshowGoTo} ${i + 1} ${hero.slideshowOf} ${count}`}
              aria-current={i === index ? "true" : undefined}
              className="flex h-8 w-5 items-center justify-center"
            >
              <span
                className={cx(
                  "block h-2 rounded-pill shadow-sm shadow-brand-primary-dark/60 transition-[width,background-color] duration-200",
                  i === index ? "w-5 bg-brand-accent" : "w-2 bg-brand-text-inverse/70",
                )}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
