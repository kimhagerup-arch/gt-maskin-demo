import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import SocialLinks from "../components/SocialLinks";
import VideoMeta from "../components/VideoMeta";
import VideoPlayer from "../components/VideoPlayer";
import { seo, videoSection } from "../data/siteContent";
import { videos } from "../data/videos";
import { useSeoMeta } from "../hooks/useSeoMeta";

export default function Video() {
  useSeoMeta(seo.video);
  const t = videoSection.page;
  const featured = videos.find((v) => v.featured) || videos[0];
  const rest = videos.filter((v) => v.id !== featured?.id);

  return (
    <>
      <PageHero
        kicker={t.kicker}
        title={t.title}
        lead={t.lead}
        image={t.heroImage}
        imageAlt={t.heroAlt}
        imagePosition="50% 75%"
        compact
      />

      {featured && (
        <section className="section-pad bg-brand-primary text-brand-text-inverse">
          <div className="container-site flex flex-col gap-4">
            <h2 className="sr-only">{t.featuredTitle}</h2>
            <VideoPlayer video={featured} large sizes="(min-width: 1280px) 1200px, 100vw" />
            <VideoMeta video={featured} titleClassName="text-lg md:text-xl" />
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="section-pad border-t border-brand-border-dark bg-brand-primary-dark text-brand-text-inverse">
          <div className="container-site flex flex-col gap-8 md:gap-10">
            <SectionHeader kicker={t.kicker} title={t.gridTitle} />
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {rest.map((video, i) => (
                <Reveal as="li" key={video.id} delay={(i % 3) * 60} className="flex flex-col gap-3">
                  <VideoPlayer
                    video={video}
                    sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
                  />
                  <VideoMeta video={video} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section-pad bg-brand-bg text-brand-text">
        <div className="container-site">
          <div className="flex flex-col gap-6 border border-brand-border bg-brand-card p-8 md:flex-row md:items-center md:justify-between md:gap-12 md:p-12">
            <div className="flex flex-col gap-3">
              <p className="kicker text-brand-accent-deep">{t.moreKicker}</p>
              <h2 className="font-display text-4xl tracking-wide md:text-5xl">{t.moreTitle}</h2>
              <p className="max-w-xl text-brand-muted">{t.moreText}</p>
            </div>
            <SocialLinks
              tone="light"
              qr="always"
              include={["facebook", "snapchat"]}
              className="shrink-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
