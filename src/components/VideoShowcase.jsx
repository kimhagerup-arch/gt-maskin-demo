import { useRef, useState } from "react";
import { videoSection } from "../data/siteContent";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cx } from "../lib/format";
import VideoCard from "./VideoCard";
import VideoMeta from "./VideoMeta";
import VideoPlayer from "./VideoPlayer";
import VideoSlider from "./VideoSlider";

/**
 * Hovedspiller pluss videoliste som slider. Brukes på forsiden og på /video.
 * Valg i listen bytter video i spilleren og starter den med en gang (mp4
 * spiller, Facebook-spilleren lastes), og ruller spilleren inn i synsfeltet
 * når den er utenfor. Ingen eksterne kall før brukeren har trykket.
 * Desktop: spilleren står på en dempet flate med tittel, kilde og lenke ved
 * siden av (stående video) eller under (liggende). Mobil: spilleren alene,
 * tekst under.
 */
export default function VideoShowcase({ videos = [], listTitle, className }) {
  const reduced = useReducedMotion();
  const stageRef = useRef(null);
  const initial = videos.find((v) => v.featured) || videos[0];
  const [activeId, setActiveId] = useState(initial?.id);
  // Valgt fra et kort: spilleren starter med en gang (ingen poster og play-knapp imellom).
  const [autoStart, setAutoStart] = useState(false);

  if (!videos.length) return null;
  const active = videos.find((v) => v.id === activeId) || initial;
  const portrait = active.aspect === "9:16";

  const select = (id) => {
    setActiveId(id);
    setAutoStart(true);
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const headerHeight = 96;
    if (rect.top < headerHeight || rect.bottom > window.innerHeight) {
      const top = window.scrollY + rect.top - headerHeight;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    }
  };

  return (
    <div className={cx("flex flex-col gap-6 md:gap-8", className)}>
      <div
        ref={stageRef}
        className={cx(
          "md:border md:border-brand-border-dark md:bg-brand-primary-light md:p-6 lg:p-8",
          portrait
            ? "md:mx-auto md:grid md:w-full md:max-w-[880px] md:grid-cols-[auto_1fr] md:items-center md:gap-8 lg:gap-12"
            : "md:flex md:flex-col md:gap-6",
        )}
      >
        <VideoPlayer key={active.id} video={active} autoStart={autoStart} />
        <VideoMeta video={active} className="mt-4 md:mt-0" />
      </div>

      <VideoSlider title={listTitle} label={videoSection.playlistLabel}>
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            active={video.id === active.id}
            onSelect={select}
          />
        ))}
      </VideoSlider>
    </div>
  );
}
