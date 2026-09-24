import { useState } from "react";
import { videoSection } from "../data/siteContent";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { cx, formatDate } from "../lib/format";
import { getImage } from "../lib/images";
import Icon from "./Icon";
import Picture from "./Picture";
import SectionHeader from "./SectionHeader";

function youtubeThumb(id) {
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

/** Stor spiller: iframe eller <video> monteres først ved klikk. */
function FeaturedPlayer({ video, playing, onPlay }) {
  const reduced = useReducedMotion();
  const canPlay = Boolean(video.src);

  if (playing && canPlay) {
    if (video.source === "youtube") {
      const autoplay = reduced ? 0 : 1;
      return (
        <div className="aspect-video w-full bg-black">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.src}?autoplay=${autoplay}&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      );
    }
    const poster = getImage(video.poster);
    return (
      <div className="aspect-video w-full bg-black">
        {/* biome-ignore lint/a11y/useMediaCaption: kundens videoer har ikke teksting ennå */}
        <video
          className="h-full w-full"
          controls
          autoPlay={!reduced}
          preload="none"
          poster={poster?.src}
          src={video.src}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-brand-border-dark bg-brand-primary-soft">
      {video.poster ? (
        <Picture
          src={video.poster}
          alt={video.posterAlt || ""}
          sizes="(min-width: 1024px) 784px, 100vw"
          className="h-full w-full"
          imgClassName={cx("h-full w-full object-cover", video.placeholder && "opacity-80")}
        />
      ) : video.source === "youtube" && youtubeThumb(video.src) ? (
        <img
          src={youtubeThumb(video.src)}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          width={480}
          height={360}
        />
      ) : (
        <div className="h-full w-full bg-stripes-dark" />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent"
        aria-hidden="true"
      />

      {video.placeholder && (
        <span className="absolute left-0 top-0 bg-brand-primary px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent-light">
          {videoSection.placeholderTag}
        </span>
      )}

      <button
        type="button"
        onClick={onPlay}
        disabled={!canPlay}
        aria-disabled={!canPlay}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-brand-text-inverse"
        aria-label={`${videoSection.play}: ${video.title}`}
      >
        <span
          className={cx(
            "flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent text-brand-primary transition-transform md:h-[88px] md:w-[88px]",
            canPlay ? "hover:scale-105" : "opacity-80",
          )}
        >
          <Icon name="Play" size={34} strokeWidth={0} className="ml-1 fill-current" />
        </span>
        <span className="max-w-md px-4 text-center text-[13px] font-semibold tracking-wider text-brand-placeholder">
          {video.title}
        </span>
      </button>
    </div>
  );
}

export default function VideoSection({ videos = [], id = "video" }) {
  const initial = videos.find((v) => v.featured) || videos[0];
  const [activeId, setActiveId] = useState(initial?.id);
  const [playing, setPlaying] = useState(false);

  if (!videos.length) return null;
  const active = videos.find((v) => v.id === activeId) || initial;
  const playlist = videos.filter((v) => v.id !== active.id);

  const select = (video) => {
    setActiveId(video.id);
    setPlaying(Boolean(video.src));
  };

  return (
    <section id={id} className="section-pad bg-brand-primary text-brand-text-inverse">
      <div className="container-site flex flex-col gap-8 md:gap-10">
        <SectionHeader
          kicker={videoSection.kicker}
          title={videoSection.title}
          lead={videoSection.lead}
        />

        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-8">
            <FeaturedPlayer
              key={active.id}
              video={active}
              playing={playing}
              onPlay={() => setPlaying(true)}
            />
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-brand-muted-inverse">
              <span className="font-semibold text-brand-text-inverse">{active.title}</span>
              <span>{active.duration}</span>
              <span aria-hidden="true">·</span>
              <span>{formatDate(active.date, active.date)}</span>
            </p>
          </div>

          <div
            className="flex flex-col gap-3 lg:col-span-4"
            aria-label={videoSection.playlistLabel}
          >
            {playlist.map((video) => {
              const thumb = getImage(video.poster);
              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => select(video)}
                  className="flex flex-1 items-center gap-3.5 border border-brand-border-dark bg-brand-primary-light p-3 text-left transition-colors hover:border-brand-accent-light md:p-4"
                >
                  <span className="relative h-[72px] w-[112px] shrink-0 overflow-hidden bg-brand-primary-soft bg-stripes-dark">
                    {thumb && (
                      <img
                        src={thumb.smallest}
                        alt=""
                        width={112}
                        height={72}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover opacity-80"
                      />
                    )}
                    <span className="absolute inset-0 flex items-center justify-center text-brand-text-inverse">
                      <Icon
                        name="Play"
                        size={22}
                        strokeWidth={0}
                        className="fill-current drop-shadow"
                      />
                    </span>
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-base font-bold">{video.title}</span>
                    <span className="text-[13px] text-brand-muted-inverse">
                      {video.duration} · {formatDate(video.date, video.date)}
                    </span>
                    {video.placeholder && (
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent-light">
                        {videoSection.placeholderTag}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
