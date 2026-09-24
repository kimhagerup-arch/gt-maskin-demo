import Button from "../components/Button";
import Icon from "../components/Icon";
import PageHero from "../components/PageHero";
import Picture from "../components/Picture";
import Placeholder from "../components/Placeholder";
import Reveal from "../components/Reveal";
import SafariBanner from "../components/SafariBanner";
import { companyFacts } from "../data/companyFacts";
import { rental } from "../data/rental";
import { rentalSection, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { cx, formatPrice } from "../lib/format";

export default function Utleie() {
  useSeoMeta(seo.utleie);
  const t = rentalSection.page;

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
        <Button href={companyFacts.links.rental} external arrow className="self-start">
          {rentalSection.bookLabel}
        </Button>
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
                className="grid gap-6 py-12 md:gap-10 md:py-16 lg:grid-cols-12"
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
                  <Button
                    href={item.bookingUrl}
                    external
                    arrow
                    variant="dark"
                    className="self-start"
                  >
                    {rentalSection.bookLabel}
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
                    <Placeholder
                      tone="light"
                      label={rentalSection.imageLabel}
                      className="aspect-[16/9] border border-brand-border"
                    />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-pad bg-brand-primary text-brand-text-inverse">
        <div className="container-site flex flex-col gap-6">
          <SafariBanner />
          <p className="text-sm text-brand-muted-inverse">{t.priceNote}</p>
        </div>
      </section>
    </>
  );
}
