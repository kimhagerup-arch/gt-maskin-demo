import { heroSlides } from "../data/heroSlides";
import { hero, socialLinks } from "../data/siteContent";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { cx } from "../lib/format";
import Button from "./Button";
import HeroSlideshow from "./HeroSlideshow";
import KustomEmblem from "./KustomEmblem";
import SocialIcons from "./SocialIcons";
import WavingFlag from "./WavingFlag";

/**
 * Forsidens hero: tekst og knapper til venstre, bildeshow med bilene i en
 * marquee-ramme til høyre (under teksten på mobil). Én linje i overskriften
 * har neon-glød i aksentfargen (hero.neonLine).
 */
export default function HomeHero() {
  // Utsnitt av flagget: stjernefeltet synlig fra 768 px, stripene på mobil.
  const wide = useMediaQuery("(min-width: 768px)");
  return (
    <section className="relative overflow-hidden bg-brand-primary">
      {/* Flagg i vind over hele heroen (runde 5c), dempet, med mørk toning der teksten står. */}
      <WavingFlag className="absolute inset-0" opacity={0.34} crop={wide ? "left" : "right"} />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-primary/90 via-brand-primary/75 to-brand-primary/90 lg:bg-gradient-to-r lg:from-brand-primary lg:via-brand-primary/85 lg:to-brand-primary/30"
        aria-hidden="true"
      />
      <div className="container-site relative grid gap-6 py-7 md:gap-6 md:py-12 lg:grid-cols-12 lg:items-center lg:py-14">
        <div className="relative z-10 flex flex-col gap-4 md:gap-6 lg:col-span-7">
          <p className="kicker text-brand-accent-light">
            <span className="hidden md:inline">{hero.kicker}</span>
            <span className="md:hidden">{hero.kickerMobile}</span>
          </p>
          <h1 className="h1-hero text-brand-text-inverse">
            {hero.title.map((line, i) => (
              <span key={line} className={cx("block", i === hero.neonLine && "neon-text")}>
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
          <SocialIcons label={socialLinks.heroFollow} stack />
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8">
          <HeroSlideshow
            slides={heroSlides}
            sizes="(min-width: 1024px) 480px, 100vw"
            className="relative z-10 aspect-[16/10] w-full md:aspect-[4/3] lg:aspect-auto lg:h-[560px]"
          />
          <KustomEmblem
            badge={hero.badge}
            className="relative z-20 -mt-8 ml-5 md:-mt-12 md:ml-8 lg:absolute lg:-bottom-16 lg:-left-20 lg:ml-0 lg:mt-0 xl:-bottom-11 xl:-left-14"
          />
        </div>
      </div>
    </section>
  );
}
