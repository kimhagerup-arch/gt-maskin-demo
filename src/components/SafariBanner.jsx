import { useEffect, useRef, useState } from "react";
import { safari } from "../data/rental";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cx } from "../lib/format";
import { getImage } from "../lib/images";
import Button from "./Button";
import Picture from "./Picture";

/** Tre scootere i kolonne: størrelse, høyde over bunnen, forsinkelse og varighet. */
const SLEDS = [
  {
    id: "a",
    width: "w-[150px] md:w-[210px]",
    bottom: "bottom-[2%] md:bottom-[6%]",
    delay: "-3.5s",
    duration: "14s",
  },
  {
    id: "b",
    width: "w-[125px] md:w-[175px]",
    bottom: "bottom-[8%] md:bottom-[14%]",
    delay: "0.5s",
    duration: "15.5s",
  },
  {
    id: "c",
    width: "w-[100px] md:w-[140px]",
    bottom: "bottom-[14%] md:bottom-[21%]",
    delay: "4s",
    duration: "16s",
  },
];

/**
 * Safari-banner med fjellbakgrunn og tre snøscootere som kjører over snøflaten.
 * Kun transform og opacity animeres. Animasjonen kjører bare mens banneret er i
 * viewport, og ved prefers-reduced-motion står én scooter stille. Scooterne er
 * dekor (alt="" og aria-hidden), teksten og knappen ligger over.
 */
export default function SafariBanner() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);
  const sled = getImage(safari.sledImage);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const running = inView && !reduced;
  const sleds = reduced ? SLEDS.slice(0, 1) : SLEDS;

  return (
    <div
      ref={ref}
      data-safari
      className="relative isolate min-h-[300px] overflow-hidden border border-brand-border-dark bg-brand-primary text-brand-text-inverse md:min-h-[320px]"
    >
      {/* Bakgrunn */}
      <div className="absolute inset-0" aria-hidden="true">
        <Picture
          src={safari.image}
          alt=""
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="h-full w-full"
          imgClassName="h-full w-full object-cover"
          objectPosition="50% 62%"
        />
        <div className="absolute inset-0 bg-brand-primary/80 md:bg-transparent md:bg-gradient-to-r md:from-brand-primary/95 md:via-brand-primary/70 md:to-brand-primary/5" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-primary/50 to-transparent" />
      </div>

      {/* Scootere */}
      {sled && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {sleds.map((s, i) => (
            <div
              key={s.id}
              className={cx(
                "safari-lane absolute inset-x-0",
                s.bottom,
                reduced && "safari-lane-static",
                running && "is-running",
              )}
              style={{ animationDelay: s.delay, animationDuration: s.duration, zIndex: 3 - i }}
            >
              <div
                className={cx("safari-sled relative", s.width)}
                style={{ animationDelay: s.delay }}
              >
                <span className="safari-shadow absolute -bottom-1 left-[8%] right-[8%] h-3 rounded-[50%] bg-brand-primary/60 blur-[5px]" />
                <span
                  className={cx(
                    "safari-snow absolute -left-[10%] bottom-[2%] h-[30%] w-[28%] rounded-[50%] bg-brand-bg/45 blur-[6px]",
                    running && "is-running",
                  )}
                  style={{ animationDelay: s.delay }}
                />
                <picture className="relative block">
                  <source
                    type="image/webp"
                    srcSet={`${safari.sledImage}-400.webp 400w, ${safari.sledImage}-800.webp 800w`}
                    sizes="210px"
                  />
                  <img
                    src={`${safari.sledImage}-400.png`}
                    srcSet={`${safari.sledImage}-400.png 400w, ${safari.sledImage}-800.png 800w`}
                    sizes="210px"
                    width={sled.width}
                    height={sled.height}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-auto w-full drop-shadow-[0_6px_6px_rgba(0,0,0,0.35)]"
                  />
                </picture>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Innhold */}
      <div className="relative z-10 flex max-w-xl flex-col gap-4 px-6 pb-32 pt-8 md:px-10 md:py-12">
        <p className="kicker text-brand-accent-light">{safari.kicker}</p>
        <h3 className="font-display text-4xl tracking-wide md:text-5xl">{safari.title}</h3>
        <p
          data-safari-text
          className="max-w-md text-base leading-relaxed text-brand-text-inverse md:text-[17px]"
        >
          {safari.text}
        </p>
        <Button href={safari.url} external arrow size="sm" className="self-start">
          {safari.ctaLabel}
        </Button>
      </div>

      <p
        data-safari-credit
        className="absolute bottom-2 right-3 z-10 bg-brand-primary px-2 py-0.5 text-[11px] text-brand-text-inverse"
      >
        {safari.credit}
      </p>
    </div>
  );
}
