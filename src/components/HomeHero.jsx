import { heroSlides } from "../data/heroSlides";
import { hero, socialLinks } from "../data/siteContent";
import { cx } from "../lib/format";
import Button from "./Button";
import HeroSlideshow from "./HeroSlideshow";
import KustomEmblem from "./KustomEmblem";
import SocialIcons from "./SocialIcons";

/**
 * Forsidens hero: tekst og knapper til venstre, bildeshow med bilene i en
 * marquee-ramme til høyre (under teksten på mobil). Én linje i overskriften
 * har neon-glød i aksentfargen (hero.neonLine).
 */
export default function HomeHero() {
  return (
    <section className="bg-brand-primary">
      <div className="container-site grid gap-6 py-7 md:gap-6 md:py-12 lg:grid-cols-12 lg:items-center lg:py-14">
        <div className="flex flex-col gap-4 md:gap-6 lg:col-span-7">
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
            className="aspect-[16/10] w-full md:aspect-[4/3] lg:aspect-auto lg:h-[560px]"
          />
          <KustomEmblem
            badge={hero.badge}
            className="-mt-8 ml-5 md:-mt-12 md:ml-8 lg:absolute lg:-bottom-16 lg:-left-20 lg:ml-0 lg:mt-0 xl:-bottom-11 xl:-left-14"
          />
        </div>
      </div>
    </section>
  );
}
