import { useState } from "react";
import { getChannel } from "../data/channels";
import { snapchatSection, socialLinks } from "../data/siteContent";
import { cx } from "../lib/format";
import Icon from "./Icon";
import Picture from "./Picture";
import { SnapchatMark } from "./SocialMarks";

/**
 * «GT Maskin på Snapchat»: tekst og et kort i Snapchat-gult. Før klikk viser
 * kortet spøkelset, brukernavnet og knappen «Vis Snapchat-profilen». Ved klikk
 * monteres Snapchats profilvisning (iframe mot embedUrl, maks 416 px bred,
 * høyde som i Snapchats eksempel). Ingenting lastes fra Snapchat før klikk.
 * Under kortet: «Åpne i Snapchat», og QR-koden på desktop.
 */
export default function SnapchatSection({ className }) {
  const snapchat = getChannel("snapchat");
  const [shown, setShown] = useState(false);
  if (!snapchat?.embedUrl) return null;

  return (
    <div
      className={cx(
        "grid gap-8 border border-brand-border-dark bg-brand-primary-light p-6 md:grid-cols-12 md:items-center md:gap-10 md:p-10",
        className,
      )}
    >
      <div className="flex flex-col gap-4 md:col-span-6 lg:col-span-7">
        <p className="kicker text-brand-accent-light">{snapchatSection.kicker}</p>
        <h3 className="font-display text-4xl tracking-wide text-brand-text-inverse md:text-5xl">
          {snapchatSection.title}
        </h3>
        <p className="max-w-md text-[17px] leading-relaxed text-brand-muted-inverse">
          {snapchatSection.lead}
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href={snapchat.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2.5 bg-brand-snapchat px-4 text-sm font-bold text-brand-on-snapchat transition-[filter] hover:brightness-95"
          >
            <SnapchatMark />
            {socialLinks.snapchatOpen}
            <Icon name="ExternalLink" size={15} strokeWidth={2.2} />
          </a>
          {snapchat.qrImage && (
            <span className="hidden items-center gap-3 md:inline-flex">
              <span className="h-16 w-16 shrink-0 bg-brand-snapchat p-1">
                <Picture
                  src={snapchat.qrImage}
                  alt={snapchat.qrAlt}
                  sizes="64px"
                  imgClassName="h-full w-full object-contain"
                  tone="light"
                  fallbackLabel="[QR]"
                />
              </span>
              <span className="text-[13px] text-brand-muted-inverse">{socialLinks.snapchatQr}</span>
            </span>
          )}
        </div>
      </div>

      <div className="md:col-span-6 lg:col-span-5">
        {shown ? (
          <iframe
            src={snapchat.embedUrl}
            title={snapchatSection.embedTitle}
            width="416"
            height="692"
            className="mx-auto block h-[692px] w-full max-w-[416px] border-0 bg-brand-snapchat"
            allow="encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="mx-auto flex w-full max-w-[416px] flex-col items-center gap-5 bg-brand-snapchat px-6 py-10 text-center text-brand-on-snapchat">
            <SnapchatMark size={72} />
            <p className="text-xl font-bold">@{snapchat.username}</p>
            <p className="max-w-xs text-[15px] leading-relaxed">{snapchatSection.cardText}</p>
            <button
              type="button"
              onClick={() => setShown(true)}
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 bg-brand-on-snapchat px-5 text-[15px] font-bold text-brand-snapchat transition-opacity hover:opacity-90 sm:w-auto sm:px-6 sm:text-base"
            >
              {snapchatSection.showProfile}
              <Icon name="ChevronDown" size={18} strokeWidth={2.2} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
