import { Link } from "react-router-dom";
import { carsSection } from "../data/siteContent";
import { formatPrice } from "../lib/format";
import Picture from "./Picture";
import Placeholder from "./Placeholder";

export default function CarCard({ car }) {
  const image = car.images?.[0];
  return (
    <article className="flex h-full flex-col border border-brand-border-dark bg-brand-primary-light transition-colors hover:border-brand-accent-light">
      <div className="relative aspect-[4/3] overflow-hidden">
        {image ? (
          <Picture
            src={image}
            alt={`${car.title} ${car.year}`}
            sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
            className="h-full w-full"
          />
        ) : (
          <Placeholder
            label={car.placeholderLabel || carsSection.card.imageLabel}
            className="h-full w-full"
          />
        )}
        {car.sold && (
          <span className="absolute left-0 top-0 bg-brand-accent px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-primary">
            {carsSection.card.sold}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-5 py-5 md:px-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-bold md:text-xl">{car.title}</h3>
          <span className="shrink-0 font-display text-2xl text-brand-accent-light md:text-[26px]">
            {formatPrice(car.price)} {carsSection.card.priceSuffix}
          </span>
        </div>
        <p className="text-sm text-brand-muted-inverse">
          {car.year} · {car.km} · {car.engine}
        </p>
        {car.description && (
          <p className="mt-2 text-[15px] leading-relaxed text-brand-muted-inverse">
            {car.description}
          </p>
        )}
        <Link
          to={`/kontakt?bil=${encodeURIComponent(car.slug)}`}
          className="mt-3 inline-flex items-center gap-2 self-start text-sm font-bold text-brand-text-inverse underline-offset-4 hover:underline"
        >
          {carsSection.card.ask}
        </Link>
      </div>
    </article>
  );
}
