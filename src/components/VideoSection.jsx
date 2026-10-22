import { videoSection } from "../data/siteContent";
import { Link } from "../i18n/LocaleLink";
import Icon from "./Icon";
import SectionHeader from "./SectionHeader";
import SnapchatSection from "./SnapchatSection";
import VideoShowcase from "./VideoShowcase";

/** Forsidens videoseksjon: hovedspiller, spilleliste som slider og Snapchat-blokk nederst. */
export default function VideoSection({ videos = [], id = "video" }) {
  if (!videos.length) return null;

  return (
    <section id={id} className="section-pad bg-brand-primary text-brand-text-inverse">
      <div className="container-site flex flex-col gap-6 md:gap-8">
        <SectionHeader
          kicker={videoSection.kicker}
          title={videoSection.title}
          actions={
            <Link
              to={videoSection.allVideos.to}
              className="link-underline self-start border-brand-accent-light text-brand-text-inverse hover:text-brand-accent-light"
            >
              {videoSection.allVideos.label}
              <Icon name="ArrowRight" size={18} strokeWidth={2.2} />
            </Link>
          }
        />

        <VideoShowcase
          videos={videos}
          listTitle={
            <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] text-brand-muted-inverse">
              {videoSection.playlistLabel}
            </h3>
          }
        />

        <SnapchatSection className="mt-2 md:mt-4" />
      </div>
    </section>
  );
}
