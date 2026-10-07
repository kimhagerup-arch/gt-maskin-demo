import { useState } from "react";
import { Link } from "react-router-dom";
import { videoSection } from "../data/siteContent";
import { cx, formatDate } from "../lib/format";
import { getImage } from "../lib/images";
import Icon from "./Icon";
import SectionHeader from "./SectionHeader";
import VideoMeta from "./VideoMeta";
import VideoPlayer from "./VideoPlayer";

/** Forsidens videoseksjon: stor spiller og spilleliste. Spilleren byttes ved valg. */
export default function VideoSection({ videos = [], id = "video" }) {
  const initial = videos.find((v) => v.featured) || videos[0];
  const [activeId, setActiveId] = useState(initial?.id);

  if (!videos.length) return null;
  const active = videos.find((v) => v.id === activeId) || initial;
  const playlist = videos.filter((v) => v.id !== active.id);

  return (
    <section id={id} className="section-pad bg-brand-primary text-brand-text-inverse">
      <div className="container-site flex flex-col gap-8 md:gap-10">
        <SectionHeader
          kicker={videoSection.kicker}
          title={videoSection.title}
          aside={
            <div className="flex flex-col gap-3 md:items-end">
              <p className="max-w-[420px] text-base leading-relaxed text-brand-muted-inverse md:text-right md:text-[17px]">
                {videoSection.lead}
              </p>
              <Link
                to={videoSection.allVideos.to}
                className="link-underline border-brand-accent-light text-brand-text-inverse hover:text-brand-accent-light"
              >
                {videoSection.allVideos.label}
                <Icon name="ArrowRight" size={18} strokeWidth={2.2} />
              </Link>
            </div>
          }
        />

        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          <div className="min-w-0 lg:col-span-8">
            <VideoPlayer
              key={active.id}
              video={active}
              large
              sizes="(min-width: 1024px) 784px, 100vw"
            />
            <VideoMeta video={active} className="mt-3" />
          </div>

          <div
            className="flex min-w-0 flex-col gap-3 lg:col-span-4"
            aria-label={videoSection.playlistLabel}
          >
            {playlist.map((video) => {
              const thumb = getImage(video.poster);
              const isSnapchat = video.source === "snapchat";
              const meta = [
                video.duration,
                video.date ? formatDate(video.date, video.date) : null,
              ].filter(Boolean);
              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setActiveId(video.id)}
                  className="flex min-w-0 flex-1 items-center gap-3.5 overflow-hidden border border-brand-border-dark bg-brand-primary-light p-3 text-left transition-colors hover:border-brand-accent-light md:p-4"
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
                        name={isSnapchat ? "ExternalLink" : "Play"}
                        size={22}
                        strokeWidth={isSnapchat ? 2.2 : 0}
                        className={cx("drop-shadow", !isSnapchat && "fill-current")}
                      />
                    </span>
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-base font-bold">{video.title}</span>
                    {meta.length > 0 && (
                      <span className="text-[13px] text-brand-muted-inverse">
                        {meta.join(" · ")}
                      </span>
                    )}
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
