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
// poster er alltid en lokal manifest-nøkkel, eller null. Ingen eksterne miniatyrer lastes før klikk.
// Kunden har ikke sendt titler, beskrivelser, datoer eller varigheter. Tittelen er derfor
// «Video fra GT Maskin» nummerert, og brukes bare der komponentene trenger tekst
// (spilleliste, aria-label, iframe-title). duration og date er null og skjules.
// poster er null til kunden sender stillbilder fra hver video: da viser spilleren og
// kortene en designet poster (mørk flate, tittel, play) i stedet for et lånt verkstedbilde.
// Butikkvideoen (hero.mp4, 17 s uten lyd, fotografert i butikken 21.10.2026) ligger først
// og er den videoen som alltid spiller med ett trykk. Posteren er første bilde i videoen.

const TITLE = "Video fra GT Maskin";

export const videos = [
  {
    id: "butikken",
    title: "Butikken",
    source: "mp4",
    src: "/video/hero.mp4",
    aspect: "16:9",
    poster: "/images/hero/butikk-hero-poster",
    posterAlt: "Butikken hos GT Maskin: moped, gammelt kasseapparat og klesstativ",
    duration: "0:17",
    date: "2026-10-21",
    featured: true,
    placeholder: false,
  },
  {
    id: "fb-1",
    title: `${TITLE} 1`,
    source: "facebook",
    src: "https://www.facebook.com/reel/896290050086392",
    aspect: "9:16",
    poster: null,
    posterAlt: "",
    duration: null,
    date: null,
    featured: false,
    placeholder: false,
  },
  {
    id: "fb-2",
    title: `${TITLE} 2`,
    source: "facebook",
    src: "https://www.facebook.com/reel/1056360530550925",
    aspect: "9:16",
    poster: null,
    posterAlt: "",
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
    poster: null,
    posterAlt: "",
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
    poster: null,
    posterAlt: "",
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
    poster: null,
    posterAlt: "",
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
    poster: null,
    posterAlt: "",
    duration: null,
    date: null,
    featured: false,
    placeholder: false,
  },
];
