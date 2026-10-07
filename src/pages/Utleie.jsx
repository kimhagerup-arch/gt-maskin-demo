import Button from "../components/Button";
import Icon from "../components/Icon";
import IconField from "../components/IconField";
import PageHero from "../components/PageHero";
import Picture from "../components/Picture";
import RentalForm from "../components/RentalForm";
import Reveal from "../components/Reveal";
import SafariBanner from "../components/SafariBanner";
import { rental } from "../data/rental";
import { rentalSection, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { cx, formatPrice } from "../lib/format";

/**
 * Samlesiden for utleie: snøscooter 60 og 120 hk, ATV, tilhenger og
 * biltransporthenger, safari (norsemantrail.com) og utleieforespørsel.
 */
export default function Utleie() {
  useSeoMeta(seo.utleie);
  const t = rentalSection.page;
  const formHref = `#${rentalSection.request.id}`;

  return (
    <>
      <PageHero
        kicker={t.kicker}
        title={t.title}
        lead={t.lead}
        image={t.heroImage}
        imageAlt={t.heroAlt}
        imagePosition="50% 60%"
      >
        <div className="flex flex-col gap-4">
          <Button href={formHref} arrow className="self-start">
            {rentalSection.bookLabel}
          </Button>
          <nav aria-label={t.shortcutsLabel} className="flex flex-wrap gap-2 text-sm">
            {rental.map((item) => (
              <a
                key={item.slug}
                href={`#${item.slug}`}
                className="inline-flex h-10 items-center border border-brand-outline px-3 font-semibold text-brand-text-inverse transition-colors hover:border-brand-accent-light"
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </PageHero>

      <section className="bg-brand-bg text-brand-text">
        <div className="container-site flex flex-col divide-y divide-brand-border">
          {rental.map((item, i) => {
            const flip = i % 2 === 1;
            const images = [
              item.image && { src: item.image, alt: item.imageAlt, position: item.imagePosition },
              item.image2 && { src: item.image2, alt: item.image2Alt },
            ].filter(Boolean);
            return (
              <Reveal
                as="article"
                key={item.slug}
                id={item.slug}
                className="grid scroll-mt-24 gap-6 py-12 md:gap-10 md:py-16 lg:grid-cols-12"
              >
                <div
                  className={cx(
                    "flex flex-col gap-4 lg:col-span-5",
                    flip ? "lg:order-2 lg:col-start-8" : "",
                  )}
                >
                  <Icon
                    name={item.icon}
                    size={32}
                    strokeWidth={1.8}
                    className="text-brand-accent-deep"
                  />
                  <h2 className="font-display text-4xl tracking-wide md:text-5xl">{item.title}</h2>
                  <p className="text-[17px] leading-relaxed text-brand-muted">{item.text}</p>
                  <div className="flex flex-col gap-0.5 border border-brand-border bg-brand-card p-5">
                    <span className="font-display text-4xl">
                      {formatPrice(item.price)} {item.unit}
                    </span>
                    <span className="text-sm text-brand-muted">{item.note}</span>
                  </div>
                  <Button href={formHref} arrow variant="dark" className="self-start">
                    {rentalSection.askLabel}
                  </Button>
                </div>
                <div
                  className={cx(
                    "grid gap-3 md:gap-4 lg:col-span-7",
                    images.length > 1 ? "grid-cols-2" : "grid-cols-1",
                    flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-6",
                  )}
                >
                  {images.length ? (
                    images.map((img) => (
                      <div
                        key={img.src}
                        className={cx(
                          "overflow-hidden border border-brand-border",
                          images.length > 1 ? "aspect-[4/3]" : "aspect-[16/9]",
                        )}
                      >
                        <Picture
                          src={img.src}
                          alt={img.alt}
                          sizes="(min-width: 1024px) 680px, 100vw"
                          className="h-full w-full"
                          tone="light"
                          objectPosition={img.position}
                        />
                      </div>
                    ))
                  ) : (
                    <IconField
                      icon={item.icon}
                      label={item.title}
                      className="aspect-[16/9] border border-brand-border"
                      size={96}
                    />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Safari */}
      <section className="section-pad bg-brand-primary text-brand-text-inverse">
        <div className="container-site flex flex-col gap-6">
          <SafariBanner />
        </div>
      </section>

      {/* Utleieforespørsel */}
      <section className="section-pad border-t border-brand-border-dark bg-brand-primary-dark text-brand-text-inverse">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <p className="kicker text-brand-accent-light">{rentalSection.request.kicker}</p>
            <h2 className="h2-section">{rentalSection.request.heading}</h2>
            <p className="max-w-md text-lg leading-relaxed text-brand-muted-inverse">
              {rentalSection.request.intro}
            </p>
            <p className="text-sm text-brand-muted-inverse">{t.priceNote}</p>
          </div>
          <RentalForm className="lg:col-span-7" />
        </div>
      </section>
    </>
  );
}
