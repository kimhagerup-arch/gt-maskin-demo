import { FactBoxes, TeamGrid, Timeline } from "../components/AboutBlocks";
import Button from "../components/Button";
import CtaBand from "../components/CtaBand";
import Icon from "../components/Icon";
import PageHero from "../components/PageHero";
import Picture from "../components/Picture";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import { aboutSection, seo } from "../data/siteContent";
import { useSeoMeta } from "../hooks/useSeoMeta";

const RECEPTION_IMAGES = [
  {
    image: "/images/butikk/kundemottak-sofa-cabriolet",
    alt: "Kundemottaket med bilsofa, cabriolet og hyller",
  },
  {
    image: "/images/butikk/kundemottak-hyller-bar",
    alt: "Kundemottaket med hyller, bardisk og bilsofa",
  },
  { image: "/images/butikk/kundemottak-cabriolet-hyller", alt: "Cabriolet inne i kundemottaket" },
  {
    image: "/images/butikk/kundemottak-disk-bensinpumpe",
    alt: "Disken med gammel bensinpumpe og bilsofa",
  },
];

export default function OmOss() {
  useSeoMeta(seo.omOss);
  const p = aboutSection.page;

  return (
    <>
      <PageHero
        kicker={aboutSection.kicker}
        title={aboutSection.title}
        lead={aboutSection.paragraphs[0]}
        image="/images/bygg/fasade-dag-klassikere"
        imageAlt="Bygget til GT Maskin på dagtid med amerikanske klassikere foran"
        imagePosition="60% 60%"
      />

      {/* Historie og fakta */}
      <section className="section-pad bg-brand-bg text-brand-text">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <p className="text-lg leading-relaxed">{aboutSection.paragraphs[0]}</p>
            <p className="text-[17px] leading-relaxed text-brand-muted">
              {aboutSection.paragraphs[1]}
            </p>
            <FactBoxes />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-5 lg:col-start-8">
            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-brand-muted">
              {aboutSection.timelineLabel}
            </p>
            <Timeline />
          </div>
        </div>
      </section>

      {/* Kundemottaket */}
      <section className="section-pad bg-brand-primary text-brand-text-inverse">
        <div className="container-site flex flex-col gap-8 md:gap-10">
          <SectionHeader
            kicker={p.receptionKicker}
            title={p.receptionTitle}
            lead={p.receptionText}
          />
          <ul className="grid grid-cols-2 gap-3 md:gap-6">
            {RECEPTION_IMAGES.map((img, i) => (
              <Reveal
                as="li"
                key={img.image}
                delay={(i % 2) * 60}
                className="aspect-[4/3] overflow-hidden border border-brand-border-dark"
              >
                <Picture
                  src={img.image}
                  alt={img.alt}
                  sizes="(min-width: 1024px) 588px, 50vw"
                  className="h-full w-full"
                />
              </Reveal>
            ))}
          </ul>
          <blockquote className="flex flex-col gap-3 border-l-4 border-brand-accent bg-brand-primary-light p-6 md:p-8">
            <p className="font-display text-3xl tracking-wide md:text-4xl">«{p.quote.text}»</p>
            <cite className="text-sm not-italic text-brand-muted-inverse">
              {p.quote.source}
              {p.quote.sourceUrl && (
                <>
                  {" "}
                  ·{" "}
                  <a
                    href={p.quote.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:underline"
                  >
                    altaamcar.com
                  </a>
                </>
              )}
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Folkene */}
      <section className="section-pad bg-brand-bg text-brand-text">
        <div className="container-site flex flex-col gap-8 md:gap-10">
          <SectionHeader tone="light" kicker={aboutSection.peopleLabel} title={p.peopleTitle} />
          <TeamGrid large className="md:max-w-3xl" />
        </div>
      </section>

      {/* Godkjenninger og lærlinger */}
      <section className="section-pad bg-brand-primary text-brand-text-inverse">
        <div className="container-site flex flex-col gap-8 md:gap-10">
          <SectionHeader kicker={p.approvalsKicker} title={p.approvalsTitle} />
          <ul className="grid gap-3 md:grid-cols-2 md:gap-6">
            {p.approvals.map((a) => (
              <li
                key={a.title}
                className="flex flex-col gap-3 border border-brand-border-dark bg-brand-primary-light p-6 md:p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center bg-brand-accent text-brand-primary">
                  <Icon name={a.icon} size={24} />
                </span>
                <h3 className="text-lg font-bold md:text-[22px]">{a.title}</h3>
                <p className="text-brand-muted-inverse">{a.text}</p>
              </li>
            ))}
          </ul>
          <Button to={p.apprenticeCta.to} variant="outlineDark" arrow className="self-start">
            {p.apprenticeCta.label}
          </Button>
        </div>
      </section>

      <CtaBand kicker={p.ctaKicker} title={p.ctaTitle} text={p.ctaText} cta={p.cta} />
    </>
  );
}
