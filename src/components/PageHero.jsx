import { cx } from "../lib/format";
import HeroMedia from "./HeroMedia";
import Picture from "./Picture";

/**
 * Hero for undersider: mørk flate, kicker, H1, ingress og bilde bak.
 * Mørk overtoning ligger kun bak teksten (venstre del) på desktop og over
 * bildet på mobil. Med `video` (butikksiden) brukes HeroMedia: posteren er
 * LCP og vises med en gang, videoen lastes etter load (ikke ved redusert
 * bevegelse eller Save-Data). Bildefeil gir plassholder via Picture.
 */
export default function PageHero({
  kicker,
  title,
  lead,
  image,
  imageAlt,
  imagePosition,
  video,
  children,
  compact = false,
}) {
  return (
    <section className="relative overflow-hidden border-b border-brand-border-dark bg-brand-primary">
      {image && (
        <div className="absolute inset-0">
          {video ? (
            <HeroMedia
              image={image}
              video={video}
              sizes="100vw"
              objectPosition={imagePosition}
              className="h-full w-full"
              imgClassName="h-full w-full object-cover"
            />
          ) : (
            <Picture
              src={image}
              alt=""
              sizes="100vw"
              priority
              objectPosition={imagePosition}
              imgClassName="h-full w-full object-cover opacity-70 md:opacity-100"
              fallbackLabel=""
            />
          )}
          {/* Overtoning kun der teksten ligger */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/85 to-brand-primary/40 md:bg-gradient-to-r md:from-brand-primary md:via-brand-primary/90 md:to-transparent"
            aria-hidden="true"
          />
        </div>
      )}
      <div
        className={cx(
          "container-site relative flex flex-col justify-end",
          compact
            ? "min-h-[280px] py-8 md:min-h-[360px] md:py-12"
            : "min-h-[380px] py-10 md:min-h-[520px] md:py-[72px]",
        )}
      >
        <div className="flex max-w-2xl flex-col gap-3 md:gap-5">
          {kicker && <p className="kicker text-brand-accent-light">{kicker}</p>}
          <h1 className="h1-page text-brand-text-inverse">{title}</h1>
          {lead && (
            <p className="max-w-xl text-lg leading-relaxed text-brand-muted-inverse md:text-xl">
              {lead}
            </p>
          )}
          {children}
        </div>
        {image && <span className="sr-only">{imageAlt}</span>}
      </div>
    </section>
  );
}
