import { useCallback, useRef, useState } from "react";
import { carsSection } from "../data/siteContent";
import { cx } from "../lib/format";
import Icon from "./Icon";
import Picture from "./Picture";
import Placeholder from "./Placeholder";

/**
 * Bildegalleri for en bil: ett stort bilde, piler, tastatur (venstre/høyre)
 * og swipe på berøringsskjerm. Uten bilder vises plassholder.
 */
export default function CarGallery({ images = [], alts = [], title, placeholderLabel, dimmed }) {
  const t = carsSection.detail.gallery;
  const [index, setIndex] = useState(0);
  const touchStart = useRef(null);
  const count = images.length;

  const go = useCallback(
    (delta) => {
      if (!count) return;
      setIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  if (!count) {
    return (
      <div className="aspect-[4/3] overflow-hidden border border-brand-border-dark">
        <Placeholder
          label={placeholderLabel || carsSection.card.imageLabel}
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    // Piltastene virker når fokus står på en av knappene i galleriet.
    <section
      className="flex flex-col gap-3"
      aria-roledescription="galleri"
      aria-label={`${t.label}: ${title}`}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative aspect-[4/3] overflow-hidden border border-brand-border-dark bg-brand-primary-soft">
        {images.map((key, i) => (
          <div
            key={key}
            className={cx(
              "absolute inset-0 transition-opacity duration-300",
              i === index ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-hidden={i !== index}
          >
            <Picture
              src={key}
              alt={alts[i] || `${title}, bilde ${i + 1}`}
              sizes="(min-width: 1024px) 760px, 100vw"
              className="h-full w-full"
              imgClassName={cx("h-full w-full object-cover", dimmed && "opacity-50 saturate-50")}
              loading={i === 0 ? "eager" : "lazy"}
              priority={i === 0}
            />
          </div>
        ))}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-brand-primary/85 text-brand-text-inverse transition-colors hover:bg-brand-accent hover:text-brand-primary"
              aria-label={t.prev}
            >
              <Icon name="ChevronLeft" size={24} strokeWidth={2.2} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-brand-primary/85 text-brand-text-inverse transition-colors hover:bg-brand-accent hover:text-brand-primary"
              aria-label={t.next}
            >
              <Icon name="ChevronRight" size={24} strokeWidth={2.2} />
            </button>
            <span
              className="absolute bottom-3 right-3 bg-brand-primary/85 px-2.5 py-1 text-xs font-bold text-brand-text-inverse"
              aria-live="polite"
            >
              {index + 1} {t.of} {count}
            </span>
          </>
        )}
      </div>
      {count > 1 && (
        <ul className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((key, i) => (
            <li key={key}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${t.goTo} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={cx(
                  "block aspect-[4/3] w-full overflow-hidden border-2 transition-colors",
                  i === index
                    ? "border-brand-accent"
                    : "border-transparent hover:border-brand-outline",
                )}
              >
                <Picture src={key} alt="" sizes="120px" className="h-full w-full" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
