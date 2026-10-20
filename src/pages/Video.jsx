import PageHero from "../components/PageHero";
import SnapchatSection from "../components/SnapchatSection";
import SocialLinks from "../components/SocialLinks";
import VideoShowcase from "../components/VideoShowcase";
import { seo, videoSection } from "../data/siteContent";
import { videos } from "../data/videos";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function Video() {
  useSeoMeta(seo.video);
  const t = videoSection.page;

  return (
    <>
      <PageHero
        kicker={t.kicker}
        title={t.title}
        lead={t.lead}
        image={t.heroImage}
        imageAlt={t.heroAlt}
        imagePosition="50% 60%"
        compact
      />

      {videos.length > 0 && (
        <section className="section-pad bg-brand-primary text-brand-text-inverse">
          <div className="container-site flex flex-col gap-4">
            <h2 className="sr-only">{t.featuredTitle}</h2>
            <VideoShowcase
              videos={videos}
              listTitle={
                <h2 className="font-display text-3xl tracking-wide md:text-4xl">{t.gridTitle}</h2>
              }
            />
          </div>
        </section>
      )}

      <section className="section-pad border-t border-brand-border-dark bg-brand-primary-dark text-brand-text-inverse">
        <div className="container-site">
          <SnapchatSection />
        </div>
      </section>

      <section className="section-pad bg-brand-bg text-brand-text">
        <div className="container-site">
          <div className="flex flex-col gap-6 border border-brand-border bg-brand-card p-8 md:flex-row md:items-center md:justify-between md:gap-12 md:p-12">
            <div className="flex flex-col gap-3">
              <p className="kicker text-brand-accent-deep">{t.moreKicker}</p>
              <h2 className="font-display text-4xl tracking-wide md:text-5xl">{t.moreTitle}</h2>
              <p className="max-w-xl text-brand-muted">{t.moreText}</p>
            </div>
            <SocialLinks tone="light" include={["facebook"]} className="shrink-0" />
          </div>
        </div>
      </section>
    </>
  );
}
