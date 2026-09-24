import CarCard from "../components/CarCard";
import CtaBand from "../components/CtaBand";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { cars } from "../data/cars";
import { carsSection, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function BilerTilSalgs() {
  useSeoMeta(seo.biler);
  const t = carsSection.page;
  const forSale = cars.filter((c) => !c.sold);
  const sold = cars.filter((c) => c.sold);

  return (
    <>
      <PageHero
        kicker={t.kicker}
        title={t.title}
        lead={t.lead}
        image={t.heroImage}
        imageAlt={t.heroAlt}
        imagePosition="60% 50%"
      />

      <section className="section-pad bg-brand-primary text-brand-text-inverse">
        <div className="container-site flex flex-col gap-8">
          {forSale.length ? (
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {forSale.map((car, i) => (
                <Reveal as="li" key={car.slug} delay={(i % 3) * 60}>
                  <CarCard car={car} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col gap-2 border border-brand-border-dark bg-brand-primary-light p-8">
              <p className="text-xl font-bold">{carsSection.empty.title}</p>
              <p className="text-brand-muted-inverse">{carsSection.empty.text}</p>
            </div>
          )}
          {sold.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-brand-muted-inverse">
                {carsSection.card.sold}
              </h2>
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {sold.map((car) => (
                  <li key={car.slug}>
                    <CarCard car={car} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <CtaBand kicker={t.kicker} title={t.askTitle} text={t.askText} cta={t.askCta} />
    </>
  );
}
