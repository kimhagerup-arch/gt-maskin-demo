import { Link } from "react-router-dom";
import { FactBoxes, TeamGrid, Timeline } from "../components/AboutBlocks";
import BookingForm from "../components/BookingForm";
import BrandWall from "../components/BrandWall";
import Button from "../components/Button";
import CarCard from "../components/CarCard";
import ContactCard from "../components/ContactCard";
import HomeHero from "../components/HomeHero";
import Icon from "../components/Icon";
import Picture from "../components/Picture";
import ProductCard from "../components/ProductCard";
import RentalBanner from "../components/RentalBanner";
import RentalCard from "../components/RentalCard";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import ServiceCards from "../components/ServiceCards";
import SocialFeed from "../components/SocialFeed";
import TrustStrip from "../components/TrustStrip";
import VideoSection from "../components/VideoSection";
import { brands } from "../data/brands";
import { cars } from "../data/cars";
import { channels } from "../data/channels";
import { products } from "../data/products";
import { rental, rentalBanner } from "../data/rental";
import {
  aboutSection,
  carsSection,
  contactPage,
  partsSection,
  rentalSection,
  seo,
} from "../data/siteContent";
import { socialFeed } from "../data/socialFeed";
import { videos } from "../data/videos";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function Home() {
  useSeoMeta(seo.home);
  const carsForSale = cars.filter((c) => !c.sold).slice(0, 3);

  return (
    <>
      <HomeHero />
      <TrustStrip />

      {/* 3. Live fra GT Maskin */}
      <SocialFeed posts={socialFeed} channels={channels} limit={6} />

      {/* 4. Hva vi gjør */}
      <ServiceCards />

      {/* 5. GT Maskin på film */}
      <VideoSection videos={videos} />

      {/* 6. Biler til salgs */}
      <section
        id="biler"
        className="section-pad border-y border-brand-border-dark bg-brand-primary-dark text-brand-text-inverse"
      >
        <div className="container-site flex flex-col gap-8 md:gap-10">
          <SectionHeader
            kicker={carsSection.kicker}
            title={carsSection.title}
            actions={
              <Link
                to={carsSection.link.to}
                className="link-underline self-start border-brand-accent-light text-brand-text-inverse hover:text-brand-accent-light"
              >
                {carsSection.link.label}
                <Icon name="ArrowRight" size={18} strokeWidth={2.2} />
              </Link>
            }
          />
          {carsForSale.length ? (
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {carsForSale.map((car, i) => (
                <Reveal as="li" key={car.slug} delay={i * 60}>
                  <CarCard car={car} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col gap-5 border border-brand-border-dark bg-brand-primary-light p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold md:text-[22px]">{carsSection.empty.title}</p>
                <p className="max-w-xl text-brand-muted-inverse">{carsSection.empty.text}</p>
              </div>
              <Button
                to={carsSection.empty.cta.to}
                arrow
                className="shrink-0 self-start md:self-auto"
              >
                {carsSection.empty.cta.label}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 7. Deler og nettbutikk */}
      <section id="deler" className="section-pad bg-brand-bg text-brand-text">
        <div className="container-site flex flex-col gap-8">
          <SectionHeader
            tone="light"
            kicker={partsSection.kicker}
            title={partsSection.title}
            actions={
              <Link
                to={partsSection.link.to}
                className="link-underline self-start border-brand-accent-deep text-brand-text hover:text-brand-accent-deep"
              >
                {partsSection.link.label}
                <Icon name="ArrowRight" size={18} strokeWidth={2.2} />
              </Link>
            }
          />
          <BrandWall items={brands.all} label={partsSection.page.storeBrandsPrefix} tone="light" />
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
            <nav
              aria-label={partsSection.groupLinksLabel}
              className="flex flex-wrap items-center gap-2 text-sm"
            >
              <span className="mr-1 font-semibold text-brand-muted">
                {partsSection.groupLinksLabel}
              </span>
              {partsSection.groupLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="inline-flex h-9 items-center gap-1.5 rounded-pill border border-brand-border-strong px-3.5 font-semibold text-brand-text transition-colors hover:border-brand-primary hover:text-brand-accent-deep"
                >
                  {link.label}
                  <Icon name="ArrowRight" size={14} strokeWidth={2.2} />
                </Link>
              ))}
            </nav>
          </div>
          <div className="grid gap-3 md:gap-6 lg:grid-cols-12">
            <ul className="grid grid-cols-2 gap-3 md:gap-6 lg:col-span-8">
              {products.slice(0, 4).map((product, i) => (
                <Reveal as="li" key={product.slug} delay={i * 50}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </ul>
            <Reveal className="relative min-h-[260px] overflow-hidden lg:col-span-4">
              <Picture
                src={partsSection.storeImage}
                alt={partsSection.storeImageAlt}
                sizes="(min-width: 1024px) 384px, 100vw"
                className="absolute inset-0 h-full w-full"
                tone="light"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-primary/90 to-transparent px-5 pb-4 pt-12 text-sm font-semibold text-brand-text-inverse">
                {partsSection.storeImageCaption}
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. Utleie */}
      <section id="utleie" className="section-pad bg-brand-primary text-brand-text-inverse">
        <div className="container-site flex flex-col gap-8 md:gap-10">
          <SectionHeader
            kicker={rentalSection.kicker}
            title={rentalSection.title}
            lead={rentalSection.lead}
            actions={
              <Link
                to={rentalSection.link.to}
                className="link-underline self-start border-brand-accent-light text-brand-text-inverse hover:text-brand-accent-light"
              >
                {rentalSection.link.label}
                <Icon name="ArrowRight" size={18} strokeWidth={2.2} />
              </Link>
            }
          />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {rental.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 50}>
                <RentalCard item={item} />
              </Reveal>
            ))}
          </ul>
          <RentalBanner cta={rentalBanner.ctaHome} />
        </div>
      </section>

      {/* 9. Om oss, kortversjon */}
      <section id="om-oss" className="section-pad bg-brand-bg text-brand-text">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <p className="kicker text-brand-accent-deep">{aboutSection.kicker}</p>
            <h2 className="h2-section">{aboutSection.title}</h2>
            <p className="text-lg leading-relaxed">{aboutSection.paragraphs[0]}</p>
            <p className="text-[17px] leading-relaxed text-brand-muted">
              {aboutSection.paragraphs[1]}
            </p>
            <FactBoxes className="mt-2" />
            <Button to={aboutSection.link.to} variant="dark" arrow className="self-start">
              {aboutSection.link.label}
            </Button>
          </div>
          <div className="flex flex-col gap-8 lg:col-span-5 lg:col-start-8">
            <Reveal className="aspect-[4/3] overflow-hidden border border-brand-border">
              <Picture
                src={aboutSection.image}
                alt={aboutSection.imageAlt}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="h-full w-full"
                tone="light"
              />
            </Reveal>
            <Timeline />
            <div className="flex flex-col gap-3.5">
              <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-brand-muted">
                {aboutSection.peopleLabel}
              </p>
              <TeamGrid onlyVerified />
            </div>
          </div>
        </div>
      </section>

      {/* 10. Kontakt og bestilling */}
      <section id="kontakt" className="section-pad bg-brand-primary text-brand-text-inverse">
        <div className="container-site flex flex-col gap-8 md:gap-10">
          <SectionHeader kicker={contactPage.kicker} title={contactPage.title} />
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
            <ContactCard className="lg:col-span-5" />
            <BookingForm className="lg:col-span-6 lg:col-start-7" />
          </div>
        </div>
      </section>
    </>
  );
}
