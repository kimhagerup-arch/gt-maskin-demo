// Facebook-feed. Samme objektform som make.com-webhooken leverer i drift.
// Komponenten SocialFeed er blind for kilde: bytt denne filen mot et
// JSON-endepunkt uten å endre komponenten.
//
// Felter:
//   id            plattformens post-id i drift
//   platform      "facebook" | "instagram" | "youtube"
//   date          ISO-dato, null i plassholder
//   mediaType     "image" | "video" | "reel" | "carousel"
//   mediaUrl      bilde- eller videokilde, null = plassholder
//   poster        poster for video/reel
//   caption       innleggstekst, gjengis ordrett
//   likes         null hvis ukjent
//   comments      null hvis ukjent
//   permalink     lenke til innlegget
//   placeholder   true = tydelig merket eksempelkort
//   placeholderLabel   hva slags innlegg som havner her
//   placeholderImage   (kun demo) ekte bilde fra verkstedet som bakgrunn i plassholderkortet
//
// Slik legges ekte innlegg inn: last ned bildet til public/images/feed/,
// kjør npm run images (legg filen til i PHOTOS-listen i scriptet), sett
// mediaUrl til manifest-nøkkelen, kopier teksten ordrett, sett dato og
// permalenke, og sett placeholder: false.

export const socialFeed = [
  {
    id: "placeholder-1",
    platform: "facebook",
    date: null,
    mediaType: "image",
    mediaUrl: null,
    poster: null,
    caption: "[Innleggstekst hentes automatisk fra Facebook-siden]",
    likes: null,
    comments: null,
    permalink: "https://www.facebook.com/GtMaskinas",
    placeholder: true,
    placeholderLabel: "Prosjektbil ferdig, klar for levering",
    placeholderImage: "/images/verksted/verksted-camaro-motorrom",
  },
  {
    id: "placeholder-2",
    platform: "facebook",
    date: null,
    mediaType: "image",
    mediaUrl: null,
    poster: null,
    caption: "[Innleggstekst hentes automatisk fra Facebook-siden]",
    likes: null,
    comments: null,
    permalink: "https://www.facebook.com/GtMaskinas",
    placeholder: true,
    placeholderLabel: "Nye deler på lager",
    placeholderImage: "/images/butikk/butikk-vaesker-disk",
  },
  {
    id: "placeholder-3",
    platform: "facebook",
    date: null,
    mediaType: "image",
    mediaUrl: null,
    poster: null,
    caption: "[Innleggstekst hentes automatisk fra Facebook-siden]",
    likes: null,
    comments: null,
    permalink: "https://www.facebook.com/GtMaskinas",
    placeholder: true,
    placeholderLabel: "Bil til salgs i kundemottaket",
    placeholderImage: "/images/butikk/kundemottak-cabriolet-hyller",
  },
  {
    id: "placeholder-4",
    platform: "facebook",
    date: null,
    mediaType: "video",
    mediaUrl: null,
    poster: null,
    caption: "[Innleggstekst hentes automatisk fra Facebook-siden]",
    likes: null,
    comments: null,
    permalink: "https://www.facebook.com/GtMaskinas",
    placeholder: true,
    placeholderLabel: "Snøscootersesongen er i gang",
    placeholderImage: "/images/utleie/snoscootere-oppstilt",
  },
  {
    id: "placeholder-5",
    platform: "facebook",
    date: null,
    mediaType: "carousel",
    mediaUrl: null,
    poster: null,
    caption: "[Innleggstekst hentes automatisk fra Facebook-siden]",
    likes: null,
    comments: null,
    permalink: "https://www.facebook.com/GtMaskinas",
    placeholder: true,
    placeholderLabel: "Før og etter: custom-prosjekt",
    placeholderImage: "/images/verksted/verksted-suburban-ramme",
  },
  {
    id: "placeholder-6",
    platform: "facebook",
    date: null,
    mediaType: "image",
    mediaUrl: null,
    poster: null,
    caption: "[Innleggstekst hentes automatisk fra Facebook-siden]",
    likes: null,
    comments: null,
    permalink: "https://www.facebook.com/GtMaskinas",
    placeholder: true,
    placeholderLabel: "Lærling i arbeid på verkstedet",
    placeholderImage: "/images/verksted/verksted-corvette-service",
  },
];
