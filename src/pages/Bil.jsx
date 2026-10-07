import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import CarGallery from "../components/CarGallery";
import Icon from "../components/Icon";
import { findCar } from "../data/cars";
import { companyFacts } from "../data/companyFacts";
import { carsSection, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { formatPrice } from "../lib/format";
import NotFound from "./NotFound";

export default function Bil() {
  const { slug } = useParams();
  const car = findCar(slug);
  const t = carsSection.detail;

  useSeoMeta(
    car
      ? {
          title: `${car.title} ${car.year} | Biler til salgs | GT Maskin AS`,
          description: seo.biler.description,
        }
      : seo.notFound,
  );

  if (!car) return <NotFound />;

  const specs = [
    { label: t.specs.year, value: car.year },
    { label: t.specs.km, value: car.km },
    { label: t.specs.engine, value: car.engine },
    {
      label: t.specs.price,
      value: `${formatPrice(car.price)} ${carsSection.card.priceSuffix}`,
      accent: true,
    },
  ];

  return (
    <section className="section-pad bg-brand-primary text-brand-text-inverse">
      <div className="container-site flex flex-col gap-8">
        <Link
          to="/biler-til-salgs"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-muted-inverse hover:text-brand-text-inverse"
        >
          <Icon name="ChevronLeft" size={18} strokeWidth={2.2} />
          {t.back}
        </Link>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <CarGallery
              images={car.images}
              alts={car.imageAlts}
              title={`${car.title} ${car.year}`}
              placeholderLabel={car.placeholderLabel}
              dimmed={car.sold}
            />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="flex flex-col gap-3">
              <p className="kicker text-brand-accent-light">{carsSection.kicker}</p>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="h1-page">{car.title}</h1>
                {car.sold && (
                  <span className="bg-brand-accent px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                    {carsSection.card.sold}
                  </span>
                )}
                {car.placeholder && (
                  <span className="border border-brand-outline px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-accent-light">
                    {carsSection.card.exampleTag}
                  </span>
                )}
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-3 md:gap-4">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col gap-1 border border-brand-border-dark bg-brand-primary-light px-4 py-4 md:px-[22px] md:py-5"
                >
                  <dt className="text-[13px] font-bold uppercase tracking-[0.15em] text-brand-muted-inverse">
                    {s.label}
                  </dt>
                  <dd
                    className={
                      s.accent
                        ? "font-display text-3xl leading-none text-brand-accent-light md:text-[36px]"
                        : "font-display text-3xl leading-none md:text-[36px]"
                    }
                  >
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold md:text-[22px]">{t.descriptionTitle}</h2>
              <p className="leading-relaxed text-brand-muted-inverse">
                {car.description || t.descriptionFallback}
              </p>
            </div>

            {car.placeholder && (
              <p className="border-l-2 border-brand-accent pl-4 text-sm text-brand-muted-inverse">
                {t.exampleNote}
              </p>
            )}

            {!car.sold && (
              <div className="flex flex-col gap-3">
                <Button
                  to={`/kontakt?bil=${encodeURIComponent(car.slug)}`}
                  arrow
                  className="self-start"
                >
                  {t.ask}
                </Button>
                <p className="text-sm text-brand-muted-inverse">
                  {t.callPrefix}{" "}
                  <a
                    href={companyFacts.phone.href}
                    className="font-semibold text-brand-text-inverse hover:text-brand-accent-light"
                  >
                    {companyFacts.phone.display}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
