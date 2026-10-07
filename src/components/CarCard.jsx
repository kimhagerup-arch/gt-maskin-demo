import { Link } from "react-router-dom";
import { carsSection } from "../data/siteContent";
import { cx, formatPrice } from "../lib/format";
import Picture from "./Picture";
import Placeholder from "./Placeholder";

/** Bilkort. Solgte biler får «Solgt»-merke og nedtonet bilde. Lenker til detaljsiden. */
export default function CarCard({ car }) {
  const image = car.images?.[0];
  const href = `/biler-til-salgs/${car.slug}`;
  return (
    <article className="flex h-full flex-col border border-brand-border-dark bg-brand-primary-light transition-colors hover:border-brand-accent-light">
      <Link
        to={href}
        className="relative block aspect-[4/3] overflow-hidden"
        aria-label={`${carsSection.card.details}: ${car.title} ${car.year}`}
      >
        {image ? (
          <Picture
            src={image}
            alt={car.imageAlts?.[0] || `${car.title} ${car.year}`}
            sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
            className="h-full w-full"
            imgClassName={cx("h-full w-full object-cover", car.sold && "opacity-50 saturate-50")}
          />
        ) : (
          <Placeholder
            label={car.placeholderLabel || carsSection.card.imageLabel}
            className={cx("h-full w-full", car.sold && "opacity-60")}
          />
        )}
        {car.placeholder && (
          <span className="absolute right-0 top-0 bg-brand-primary px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent-light">
            {carsSection.card.exampleTag}
          </span>
        )}
        {car.sold && (
          <span className="absolute left-0 top-0 bg-brand-accent px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-primary">
            {carsSection.card.sold}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 px-5 py-5 md:px-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-bold md:text-xl">
            <Link to={href} className="hover:text-brand-accent-light">
              {car.title}
            </Link>
          </h3>
          <span
            className={cx(
              "shrink-0 font-display text-2xl md:text-[26px]",
              car.sold ? "text-brand-muted-inverse line-through" : "text-brand-accent-light",
            )}
          >
            {formatPrice(car.price)} {carsSection.card.priceSuffix}
          </span>
        </div>
        <p className="text-sm text-brand-muted-inverse">
          {car.year} · {car.km} · {car.engine}
        </p>
        {car.description && (
          <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-brand-muted-inverse">
            {car.description}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold">
          <Link to={href} className="text-brand-text-inverse underline-offset-4 hover:underline">
            {carsSection.card.details}
          </Link>
          {!car.sold && (
            <Link
              to={`/kontakt?bil=${encodeURIComponent(car.slug)}`}
              className="text-brand-accent-light underline-offset-4 hover:underline"
            >
              {carsSection.card.ask}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
