import { useState } from "react";
import { getChannel } from "../data/channels";
import { snapchatSection } from "../data/siteContent";
import { useAfterLoad } from "../hooks/useAfterLoad";
import { cx } from "../lib/format";
import Icon from "./Icon";
import Picture from "./Picture";
import { SnapchatMark } from "./SocialMarks";

/**
 * «GT Maskin på Snapchat»: tekst til venstre, telefonramme til høyre (360 × 640
 * på desktop, maks 340 px sentrert på mobil). Før klikk viser telefonen et lokalt
 * stående bilde med mørk toning, gult merke med brukernavnet og knappen «Se
 * snapene». Ved klikk monteres Snapchats profilvisning inne i rammen. Ingenting
 * lastes fra Snapchat før klikk. Mobil: tekst, telefon, gul knapp i full bredde.
 */
export default function SnapchatSection({ className }) {
  const snapchat = getChannel("snapchat");
  const [shown, setShown] = useState(false);
  // Bildet i telefonen og QR-koden monteres etter window load, så de ikke konkurrerer
  // med hero-bildet (et display:none-bilde lastes likevel av nettleseren).
  const ready = useAfterLoad();
  if (!snapchat?.embedUrl) return null;
  const t = snapchatSection;

  const followButton = (extra) => (
    <a
      href={snapchat.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "inline-flex h-12 items-center justify-center gap-2.5 rounded-button bg-brand-snapchat px-6 text-base font-bold text-brand-on-snapchat transition-[filter] hover:brightness-95",
        extra,
      )}
    >
      <SnapchatMark size={22} />
      {t.follow} @{snapchat.username}
    </a>
  );

  return (
    <div
      className={cx(
        "grid gap-8 border border-brand-border-dark bg-brand-primary-light p-6 md:grid-cols-12 md:items-center md:gap-10 md:p-10",
        className,
      )}
    >
      <div className="flex flex-col gap-4 md:col-span-6 lg:col-span-7">
        <p className="kicker text-brand-accent-light">{t.kicker}</p>
        <h3 className="font-display text-4xl tracking-wide text-brand-text-inverse md:text-5xl">
          {t.title}
        </h3>
        <p className="max-w-[60ch] text-[17px] leading-relaxed text-brand-muted-inverse">
          {t.lead}
        </p>
        <div className="hidden flex-wrap items-center gap-6 pt-2 md:flex">
          {followButton()}
          {snapchat.qrImage && ready && (
            <span className="inline-flex items-center gap-3">
              <span className="h-16 w-16 shrink-0 rounded-field bg-brand-snapchat p-1">
                <Picture
                  src={snapchat.qrImage}
                  alt={snapchat.qrAlt}
                  sizes="64px"
                  imgClassName="h-full w-full object-contain"
                  tone="light"
                  fallbackLabel="[QR]"
                />
              </span>
              <span className="max-w-[14ch] text-[13px] leading-snug text-brand-muted-inverse">
                {t.qrHint}
              </span>
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 md:col-span-6 lg:col-span-5">
        <div className="relative aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-[28px] border-[6px] border-brand-primary-dark bg-brand-primary shadow-2xl shadow-brand-primary-dark/80 md:max-w-[360px]">
          {shown ? (
            <iframe
              src={snapchat.embedUrl}
              title={t.embedTitle}
              className="h-full w-full border-0 bg-brand-snapchat"
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <>
              {ready && (
                <Picture
                  src={t.posterImage}
                  alt=""
                  sizes="360px"
                  className="absolute inset-0 h-full w-full"
                  imgClassName="h-full w-full object-cover"
                  objectPosition="50% 40%"
                />
              )}
              <div
                className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/35 to-brand-primary/10"
                aria-hidden="true"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-pill bg-brand-snapchat py-1.5 pl-1.5 pr-3.5 text-sm font-bold text-brand-on-snapchat">
                <SnapchatMark size={22} />@{snapchat.username}
              </span>
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-5 text-center sm:p-6">
                <button
                  type="button"
                  onClick={() => setShown(true)}
                  className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-button bg-brand-snapchat px-6 text-lg font-bold text-brand-on-snapchat transition-[filter] hover:brightness-95"
                >
                  <Icon name="Play" size={20} strokeWidth={0} className="fill-current" />
                  {t.seeSnaps}
                </button>
                <span className="text-[13px] text-brand-muted-inverse">{t.loadNote}</span>
              </div>
            </>
          )}
        </div>
        {followButton("w-full md:hidden")}
      </div>
    </div>
  );
}
