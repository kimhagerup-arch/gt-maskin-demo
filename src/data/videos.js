// Videoer. Ingen videolenker er mottatt fra kunden ennå, alle kort er plassholdere.
//
// source:
//   "youtube"   src = YouTube-ID. Monteres som youtube-nocookie.com/embed/<id> først ved klikk.
//   "facebook"  src = full video-URL på facebook.com. Monteres via
//               facebook.com/plugins/video.php?href=<url-kodet>&show_text=false først ved klikk.
//               aspect "9:16" for reels (stående), "16:9" ellers.
//   "mp4"       src = "/video/fil.mp4", lastes med preload="none".
//   "snapchat"  src = lenke til Snapchat. Kan ikke bygges inn: kortet viser poster og «Se på Snapchat».
//
// poster er alltid en lokal manifest-nøkkel. Ingen eksterne miniatyrer lastes før klikk.
// title: fra kunden, eller kort tittel bygd av kundens egen innleggstekst.
// duration og date kun når de er kjent, ellers null (skjules i komponenten).
//
// Eksempel på ekte oppføringer:
// {
//   id: "fb-2026-10-03-1",
//   title: "Camaro-prosjektet, før og etter",
//   source: "facebook",
//   src: "https://www.facebook.com/GtMaskinas/videos/1234567890/",
//   aspect: "9:16",
//   poster: "/images/feed/camaro-for-etter",
//   posterAlt: "Gul Camaro i verkstedet",
//   duration: null,
//   date: "2026-10-03",
//   featured: true,
//   placeholder: false,
// }
// {
//   id: "yt-1",
//   title: "Fra verkstedet",
//   source: "youtube",
//   src: "dQw4w9WgXcQ",
//   aspect: "16:9",
//   poster: "/images/verksted/verksted-impala-motorblokk",
//   posterAlt: "Rød Impala i verkstedet",
//   duration: "4:12",
//   date: "2026-08-10",
//   featured: false,
//   placeholder: false,
// }

export const videos = [
  {
    id: "v1",
    title: "[Hovedvideo: fra verkstedet]",
    source: "facebook",
    src: null,
    aspect: "16:9",
    poster: "/images/verksted/verksted-impala-motorblokk",
    posterAlt: "Rød Chevrolet Impala inne i verkstedet",
    duration: null,
    date: null,
    featured: true,
    placeholder: true,
  },
  {
    id: "v2",
    title: "[Video 2: prosjekt, før og etter]",
    source: "facebook",
    src: null,
    aspect: "9:16",
    poster: "/images/verksted/verksted-belair-loftebukk",
    posterAlt: "Gul Chevrolet Bel Air på løftebukk",
    duration: null,
    date: null,
    featured: false,
    placeholder: true,
  },
  {
    id: "v3",
    title: "[Video 3: fra butikk og kundemottak]",
    source: "youtube",
    src: null,
    aspect: "16:9",
    poster: "/images/butikk/kundemottak-bar-neon",
    posterAlt: "Kundemottaket med bardisk og neonskilt",
    duration: null,
    date: null,
    featured: false,
    placeholder: true,
  },
  {
    id: "v4",
    title: "[Video 4: snøscootersesongen]",
    source: "snapchat",
    src: null,
    aspect: "9:16",
    poster: "/images/utleie/snoscootere-oppstilt",
    posterAlt: "Snøscootere oppstilt i snøen",
    duration: null,
    date: null,
    featured: false,
    placeholder: true,
  },
];
