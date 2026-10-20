// Videoer. Kilde: _kilder/INNHOLD-FRA-GJERMUND.md, seksjon «Videoer» (Facebook-reels, 19.10.2026).
//
// source:
//   "youtube"   src = YouTube-ID. Monteres som youtube-nocookie.com/embed/<id> først ved klikk.
//   "facebook"  src = full video- eller reel-URL på facebook.com. Monteres via
//               facebook.com/plugins/video.php?href=<url-kodet>&show_text=false først ved klikk.
//               Reel-lenker (facebook.com/reel/<id>) spiller ikke i innbyggingen, så spilleren
//               skriver dem om til facebook.com/<side>/videos/<id>/ (se embedUrl i VideoPlayer).
//               aspect "9:16" for reels (stående), "16:9" ellers.
//   "mp4"       src = "/video/fil.mp4", lastes med preload="none".
//   "snapchat"  src = lenke til Snapchat. Kan ikke bygges inn: kortet viser poster og «Se på Snapchat».
//
// poster er alltid en lokal manifest-nøkkel. Ingen eksterne miniatyrer lastes før klikk.
// Kunden har ikke sendt titler, beskrivelser, datoer eller varigheter. Tittelen er derfor
// «Video fra GT Maskin» nummerert, og brukes bare der komponentene trenger tekst
// (spilleliste, aria-label, iframe-title). duration og date er null og skjules.
// Posterne er eksisterende bilder fra manifestet til kunden sender stillbilder fra hver video.

const TITLE = "Video fra GT Maskin";

export const videos = [
  {
    id: "fb-1",
    title: `${TITLE} 1`,
    source: "facebook",
    src: "https://www.facebook.com/reel/896290050086392",
    aspect: "9:16",
    poster: "/images/verksted/verksted-cabriolet-kobber",
    posterAlt: "Kobberfarget cabriolet på løftebukk",
    duration: null,
    date: null,
    featured: true,
    placeholder: false,
  },
  {
    id: "fb-2",
    title: `${TITLE} 2`,
    source: "facebook",
    src: "https://www.facebook.com/reel/1056360530550925",
    aspect: "9:16",
    poster: "/images/verksted/motor-v8-benk",
    posterAlt: "Nyoverhalt V8-motor på pall",
    duration: null,
    date: null,
    featured: false,
    placeholder: false,
  },
  {
    id: "fb-3",
    title: `${TITLE} 3`,
    source: "facebook",
    src: "https://www.facebook.com/reel/1822698342075092",
    aspect: "9:16",
    poster: "/images/biler/camaro-gul-front",
    posterAlt: "Gul Camaro SS sett forfra",
    duration: null,
    date: null,
    featured: false,
    placeholder: false,
  },
  {
    id: "fb-4",
    title: `${TITLE} 4`,
    source: "facebook",
    src: "https://www.facebook.com/reel/1804793080686764",
    aspect: "9:16",
    poster: "/images/verksted/verksted-impala-motorblokk",
    posterAlt: "Rød Chevrolet Impala inne i verkstedet",
    duration: null,
    date: null,
    featured: false,
    placeholder: false,
  },
  {
    id: "fb-5",
    title: `${TITLE} 5`,
    source: "facebook",
    src: "https://www.facebook.com/reel/1805982323722905",
    aspect: "9:16",
    poster: "/images/verksted/verksted-traktor",
    posterAlt: "Traktor inne i verkstedet",
    duration: null,
    date: null,
    featured: false,
    placeholder: false,
  },
  {
    id: "fb-6",
    title: `${TITLE} 6`,
    source: "facebook",
    src: "https://www.facebook.com/reel/1528613745686828",
    aspect: "9:16",
    poster: "/images/verksted/verksted-mustang-loftebukk",
    posterAlt: "Lyseblå Mustang foran løftebukk",
    duration: null,
    date: null,
    featured: false,
    placeholder: false,
  },
];
