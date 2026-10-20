import { Link } from "react-router-dom";
import Button from "../components/Button";
import CtaBand from "../components/CtaBand";
import Icon from "../components/Icon";
import PageHero from "../components/PageHero";
import Picture from "../components/Picture";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import { companyFacts } from "../data/companyFacts";
import { workshopGallery, workshopSections } from "../data/services";
import { seo, workshopPage } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";
import { cx } from "../lib/format";

export default function Verksted() {
  useSeoMeta(seo.verksted);

  return (
    <>
      <PageHero
        kicker={workshopPage.kicker}
        title={workshopPage.title}
        lead={workshopPage.lead}
        image={workshopPage.heroImage}
        imageAlt={workshopPage.heroAlt}
        imagePosition="70% 50%"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button to={workshopPage.cta.to} arrow>
            {workshopPage.cta.label}
          </Button>
          <nav aria-label="Snarveier" className="flex flex-wrap gap-2 text-sm">
            {workshopSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex h-10 items-center rounded-pill border border-brand-outline px-3.5 font-semibold text-brand-text-inverse transition-colors hover:border-brand-accent-light"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </PageHero>

      {/* Tjenester i detalj */}
      <section className="bg-brand-bg text-brand-text">
        <div className="container-site flex flex-col divide-y divide-brand-border">
          {workshopSections.map((section, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal
                as="article"
                key={section.id}
                id={section.id}
                className="grid scroll-mt-24 gap-6 py-12 md:gap-10 md:py-16 lg:grid-cols-12"
              >
                <div
                  className={cx(
                    "flex flex-col gap-4 lg:col-span-5",
                    flip ? "lg:col-start-8 lg:order-2" : "lg:col-start-1",
                  )}
                >
                  <span className="flex h-12 w-12 items-center justify-center bg-brand-accent text-brand-primary">
                    <Icon name={section.icon} size={24} />
                  </span>
                  <h2 className="font-display text-4xl tracking-wide md:text-5xl">
                    {section.title}
                  </h2>
                  <p className="text-[17px] leading-relaxed text-brand-muted">{section.text}</p>
                  {section.link && (
                    <Link
                      to={section.link.to}
                      className="link-underline self-start border-brand-accent-deep text-brand-text hover:text-brand-accent-deep"
                    >
                      {section.link.label}
                      <Icon name="ArrowRight" size={18} strokeWidth={2.2} />
                    </Link>
                  )}
                </div>
                <div
                  className={cx(
                    "grid gap-3 md:gap-4 lg:col-span-7",
                    section.image2 ? "grid-cols-2" : "grid-cols-1",
                    flip ? "lg:col-start-1 lg:order-1" : "lg:col-start-6",
                  )}
                >
                  <div
                    className={cx(
                      "overflow-hidden border border-brand-border",
                      section.image2 ? "aspect-[4/3]" : "aspect-[16/9]",
                    )}
                  >
                    <Picture
                      src={section.image}
                      alt={section.imageAlt}
                      sizes="(min-width: 1024px) 680px, 100vw"
                      className="h-full w-full"
                      tone="light"
                    />
                  </div>
                  {section.image2 && (
                    <div className="aspect-[4/3] overflow-hidden border border-brand-border">
                      <Picture
                        src={section.image2}
                        alt={section.image2Alt}
                        sizes="(min-width: 1024px) 340px, 50vw"
                        className="h-full w-full"
                        tone="light"
                      />
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Slik jobber vi */}
      <section className="section-pad bg-brand-primary text-brand-text-inverse">
        <div className="container-site flex flex-col gap-8 md:gap-10">
          <SectionHeader kicker={workshopPage.processKicker} title={workshopPage.processTitle} />
          <ol className="grid gap-3 md:grid-cols-3 md:gap-6">
            {workshopPage.process.map((step, i) => (
              <Reveal
                as="li"
                key={step.step}
                delay={i * 80}
                className="flex flex-col gap-3 border border-brand-border-dark bg-brand-primary-light p-6 md:p-8"
              >
                <span className="font-display text-5xl text-brand-accent-light">{step.step}</span>
                <h3 className="text-lg font-bold md:text-[22px]">{step.title}</h3>
                <p className="text-brand-muted-inverse">{step.text}</p>
              </Reveal>
            ))}
          </ol>
          <div className="flex flex-col gap-4 border border-brand-border-dark bg-brand-primary-light p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-brand-accent text-brand-primary">
                <Icon name="ShieldCheck" size={24} />
              </span>
              <div className="flex flex-col gap-1">
                <p className="kicker text-brand-accent-light">{workshopPage.approvalsKicker}</p>
                <h3 className="text-lg font-bold md:text-[22px]">{workshopPage.approvalsTitle}</h3>
                <p className="text-brand-muted-inverse">{workshopPage.approvalsText}</p>
              </div>
            </div>
            <ul className="flex shrink-0 flex-wrap gap-2">
              {companyFacts.approvals.map((a) => (
                <li
                  key={a}
                  className="inline-flex h-9 items-center gap-1.5 rounded-pill border border-brand-border-dark-strong px-3.5 text-sm font-semibold"
                >
                  <Icon
                    name="Check"
                    size={14}
                    strokeWidth={2.5}
                    className="text-brand-accent-light"
                  />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Galleri */}
      <section className="section-pad bg-brand-bg text-brand-text">
        <div className="container-site flex flex-col gap-8 md:gap-10">
          <SectionHeader
            tone="light"
            kicker={workshopPage.galleryKicker}
            title={workshopPage.galleryTitle}
          />
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
            {workshopGallery.map((img, i) => (
              <Reveal
                as="li"
                key={img.image}
                delay={(i % 3) * 60}
                className="aspect-[4/3] overflow-hidden border border-brand-border"
              >
                <Picture
                  src={img.image}
                  alt={img.alt}
                  sizes="(min-width: 1024px) 384px, (min-width: 768px) 33vw, 50vw"
                  className="h-full w-full"
                  tone="light"
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        tone="dark"
        kicker={workshopPage.ctaKicker}
        title={workshopPage.ctaTitle}
        text={workshopPage.ctaText}
        cta={workshopPage.cta}
      />
    </>
  );
}
