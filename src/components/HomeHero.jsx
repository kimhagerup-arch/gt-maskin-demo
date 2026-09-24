import { heroVideo } from "../data/imageManifest";
import { hero } from "../data/siteContent";
import Button from "./Button";
import HeroMedia from "./HeroMedia";

export default function HomeHero() {
  return (
    <section className="bg-brand-primary">
      <div className="container-site grid gap-8 py-10 md:gap-6 md:py-16 lg:grid-cols-12 lg:items-center lg:py-[72px]">
        <div className="flex flex-col gap-5 md:gap-7 lg:col-span-7">
          <p className="kicker text-brand-accent-light">
            <span className="hidden md:inline">{hero.kicker}</span>
            <span className="md:hidden">{hero.kickerMobile}</span>
          </p>
          <h1 className="h1-hero text-brand-text-inverse">
            {hero.title.map((line, i) => (
              <span key={line} className="block">
                {line}
                {i < hero.title.length - 1 && <span className="sr-only"> </span>}
              </span>
            ))}
          </h1>
          <p className="max-w-[540px] text-lg leading-relaxed text-brand-muted-inverse md:text-xl">
            {hero.lead}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button to={hero.primary.to} arrow>
              {hero.primary.label}
            </Button>
            <Button to={hero.secondary.to} variant="outlineDark">
              {hero.secondary.label}
            </Button>
          </div>
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8">
          <HeroMedia
            image={hero.image}
            imageAlt={hero.imageAlt}
            video={heroVideo}
            className="aspect-[16/10] w-full border border-brand-border-dark md:aspect-[4/3] lg:aspect-auto lg:h-[560px]"
          />
          <div className="relative -mt-6 ml-4 mr-4 flex max-w-[240px] flex-col gap-1.5 bg-brand-bg px-5 py-4 text-brand-text md:-mt-10 lg:absolute lg:-left-8 lg:bottom-8 lg:ml-0 lg:mt-0 lg:px-[22px] lg:py-5">
            <span className="font-display text-4xl leading-none md:text-[40px]">
              {hero.badge.value}
            </span>
            <span className="text-sm font-semibold text-brand-muted">{hero.badge.text}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
