import CarCard from "../components/CarCard";
import CarWantedForm from "../components/CarWantedForm";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import { cars, exampleCars } from "../data/cars";
import { carsSection, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";

function CarGrid({ items, dense = false }) {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {items.map((car, i) => (
        <Reveal as="li" key={car.slug} delay={dense ? 0 : (i % 3) * 60}>
          <CarCard car={car} />
        </Reveal>
      ))}
    </ul>
  );
}

export default function BilerTilSalgs() {
  useSeoMeta(seo.biler);
  const t = carsSection.page;
  const w = carsSection.wanted;
  const forSale = cars.filter((c) => !c.sold);
  const sold = cars.filter((c) => c.sold);
  const showExamples = cars.length === 0;

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

      {/* 2. Inne hos oss nå */}
      <section className="section-pad bg-brand-primary text-brand-text-inverse">
        <div className="container-site flex flex-col gap-6 md:gap-8">
          <SectionHeader kicker={t.nowKicker} title={t.nowTitle} />
          {forSale.length ? (
            <CarGrid items={forSale} />
          ) : (
            <div className="flex flex-col gap-2 border border-brand-border-dark bg-brand-primary-light p-8">
              <p className="text-xl font-bold">{carsSection.empty.title}</p>
              <p className="text-brand-muted-inverse">{carsSection.empty.text}</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Vi skaffer */}
      <section className="section-pad border-t border-brand-border-dark bg-brand-primary-dark text-brand-text-inverse">
        <div className="container-site grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <p className="kicker text-brand-accent-light">{w.kicker}</p>
            <h2 className="h2-section">{w.title}</h2>
            <p className="max-w-md text-lg leading-relaxed text-brand-muted-inverse">{w.lead}</p>
          </div>
          <CarWantedForm className="lg:col-span-7" />
        </div>
      </section>

      {/* 4. Solgte biler */}
      {sold.length > 0 && (
        <section className="section-pad bg-brand-primary text-brand-text-inverse">
          <div className="container-site flex flex-col gap-6 md:gap-8">
            <SectionHeader kicker={t.soldKicker} title={t.soldTitle} />
            <CarGrid items={sold} dense />
          </div>
        </section>
      )}

      {/* 5. Slik presenteres bilene (kun når ingen ekte biler finnes) */}
      {showExamples && (
        <section className="section-pad bg-brand-primary text-brand-text-inverse">
          <div className="container-site flex flex-col gap-6 md:gap-8">
            <SectionHeader
              kicker={t.examplesKicker}
              title={t.examplesTitle}
              lead={t.examplesText}
            />
            <CarGrid items={exampleCars} dense />
          </div>
        </section>
      )}
    </>
  );
}
