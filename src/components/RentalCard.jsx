import { rentalSection } from "../data/siteContent";
import { Link } from "../i18n/LocaleLink";
import { formatPrice } from "../lib/format";
import Icon from "./Icon";
import IconField from "./IconField";
import Picture from "./Picture";

/** Utleiekort på forsiden. Uten bilde vises et designet ikonfelt. Lenker til /utleie. */
export default function RentalCard({ item, compact = false }) {
  return (
    <article className="flex h-full flex-col border border-brand-border-dark bg-brand-primary-light transition-colors hover:border-brand-accent-light">
      <div className="aspect-[16/10] overflow-hidden">
        {item.image ? (
          <Picture
            src={item.image}
            alt={item.imageAlt}
            sizes="(min-width: 1024px) 282px, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full"
            objectPosition={item.imagePosition}
          />
        ) : (
          <IconField icon={item.icon} label={item.title} className="h-full w-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-7">
        <Icon name={item.icon} size={30} strokeWidth={1.8} className="text-brand-accent-light" />
        <h3 className="text-lg font-bold md:text-[22px]">{item.title}</h3>
        <p className="text-[15px] leading-relaxed text-brand-muted-inverse">{item.text}</p>
        <div className="mt-auto flex flex-col gap-0.5 pt-2">
          <span className="font-display text-3xl text-brand-text-inverse">
            {formatPrice(item.price)} {item.unit}
          </span>
          <span className="text-[13px] text-brand-muted-inverse">{item.note}</span>
        </div>
        {!compact && (
          <Link
            to={`/utleie#${item.slug}`}
            className="mt-2 inline-flex h-11 items-center justify-center gap-2 border-[1.5px] border-brand-outline px-4 text-sm font-bold transition-colors hover:border-brand-accent-light hover:text-brand-accent-light"
          >
            {rentalSection.cardLink}
            <Icon name="ArrowRight" size={16} strokeWidth={2} />
          </Link>
        )}
      </div>
    </article>
  );
}
