import { useEffect, useState } from "react";
import { getChannel } from "../data/channels";
import { companyFacts } from "../data/companyFacts";
import { snapchatSection } from "../data/siteContent";
import { useAfterLoad } from "../hooks/useAfterLoad";
import { cx } from "../lib/format";
import { getImage } from "../lib/images";
import Icon from "./Icon";
import Picture from "./Picture";
import { SnapchatMark } from "./SocialMarks";

const LOGO_KEY = "/images/logo/gt-maskin-logo";
/** Så lenge venter vi på Snapchats onLoad før rammen viser «Åpne i Snapchat» i stedet. */
const LOAD_TIMEOUT_MS = 8000;

/** Logoen i en mørk badge, samme filer som header og footer (allerede lastet). */
function LogoBadge() {
  const logo = getImage(LOGO_KEY);
  return (
    <span className="flex h-20 w-20 items-center justify-center rounded-pill border border-brand-border-dark-strong bg-brand-primary-light p-2.5">
      {logo ? (
        <picture>
          <source type="image/webp" srcSet={`${LOGO_KEY}-128.webp 1x, ${LOGO_KEY}-256.webp 2x`} />
          <img
            src={`${LOGO_KEY}-128.png`}
            srcSet={`${LOGO_KEY}-128.png 1x, ${LOGO_KEY}-256.png 2x`}
            width={logo.sizes[0].w}
            height={logo.sizes[0].h}
            alt=""
            className="h-full w-full object-contain"
            decoding="async"
          />
        </picture>
      ) : (
        <span className="font-display text-2xl text-brand-accent-light">GT</span>
      )}
    </span>
  );
}

/** Lokal skjelett-tilstand i telefonrammen: profilhode og pulserende story-ringer. */
function Skeleton() {
  return (
    <div className="absolute inset-0 flex flex-col gap-6 p-5 pt-7" aria-hidden="true">
      <div className="flex items-center gap-4">
        <span className="h-16 w-16 shrink-0 animate-pulse rounded-pill bg-brand-primary-soft" />
        <span className="flex flex-1 flex-col gap-2">
          <span className="h-3.5 w-2/3 animate-pulse rounded-pill bg-brand-primary-soft" />
          <span className="h-3 w-1/2 animate-pulse rounded-pill bg-brand-primary-soft" />
        </span>
      </div>
      <div className="flex gap-3">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="flex h-14 w-14 shrink-0 animate-pulse items-center justify-center rounded-pill border-[3px] border-brand-accent"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <span className="h-10 w-10 rounded-pill bg-brand-primary-soft" />
          </span>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="animate-pulse rounded-field bg-brand-primary-soft"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * «GT Maskin på Snapchat». Et lokalt profilkort vises med en gang, uten
 * eksterne kall: logo, tittel, brukernavn og to knapper. «Åpne i Snapchat»
 * (hovedknapp, først og størst på mobil) går til snapchat.com/add/<brukernavn>,
 * som åpner appen på mobil. «Se historiene her» bytter kortet med telefonrammen:
 * iframen mot Snapchats profilvisning begynner å laste allerede på pointerdown,
 * rammen viser en lokal skjelett-tilstand til onLoad, og iframen tones inn.
 * Kommer ikke onLoad innen 8 sekunder, viser rammen «Åpne i Snapchat» i stedet.
 * Ingen eksterne kall før brukeren trykker, heller ikke preconnect.
 */
export default function SnapchatSection({ className }) {
  const snapchat = getChannel("snapchat");
  const [shown, setShown] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  // QR-koden monteres etter window load, så den ikke konkurrerer med hero-bildet.
  const ready = useAfterLoad();

  useEffect(() => {
    if (!shown || loaded) return undefined;
    const timer = window.setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [shown, loaded]);

  if (!snapchat?.embedUrl) return null;
  const t = snapchatSection;
  const addUrl = snapchat.addUrl || snapchat.url;
  const show = () => setShown(true);

  const openButton = (extra) => (
    <a
      href={addUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "inline-flex items-center justify-center gap-2.5 rounded-button bg-brand-snapchat font-bold text-brand-on-snapchat transition-[filter] hover:brightness-95",
        extra,
      )}
    >
      <SnapchatMark size={22} />
      {t.open}
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
        {snapchat.qrImage && ready && (
          <div className="hidden items-center gap-3 pt-2 md:flex">
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
          </div>
        )}
      </div>

      <div className="flex flex-col items-center md:col-span-6 lg:col-span-5">
        {shown ? (
          <div className="relative aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-[28px] border-[6px] border-brand-primary-dark bg-brand-primary shadow-2xl shadow-brand-primary-dark/80 md:max-w-[360px]">
            {!loaded && !timedOut && <Skeleton />}
            {!loaded && timedOut && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-pill bg-brand-snapchat">
                  <SnapchatMark size={32} />
                </span>
                <p className="text-sm text-brand-muted-inverse">{t.timeoutText}</p>
                {openButton("h-12 px-6 text-base")}
              </div>
            )}
            <span className="sr-only" aria-live="polite">
              {loaded || timedOut ? "" : t.loading}
            </span>
            <iframe
              src={snapchat.embedUrl}
              title={t.embedTitle}
              className={cx(
                "relative h-full w-full border-0 bg-brand-snapchat transition-opacity duration-300",
                loaded ? "opacity-100" : "opacity-0",
              )}
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setLoaded(true)}
            />
          </div>
        ) : (
          <div className="flex w-full max-w-[360px] flex-col items-center gap-5 border border-brand-border-dark bg-brand-primary p-6 text-center md:p-8">
            <span className="relative">
              <LogoBadge />
              <span className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-pill bg-brand-snapchat">
                <SnapchatMark size={22} />
              </span>
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-display text-3xl tracking-wide text-brand-text-inverse">
                {t.cardTitle || companyFacts.shortName}
              </span>
              <span className="text-[15px] text-brand-muted-inverse">@{snapchat.username}</span>
            </span>
            <div className="flex w-full flex-col gap-3">
              {openButton("h-14 w-full px-6 text-lg")}
              <button
                type="button"
                onPointerDown={show}
                onClick={show}
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-button border-[1.5px] border-brand-outline px-6 text-base font-bold text-brand-text-inverse transition-colors hover:border-brand-muted-inverse"
              >
                <Icon name="Play" size={18} strokeWidth={0} className="fill-current" />
                {t.seeStories}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
