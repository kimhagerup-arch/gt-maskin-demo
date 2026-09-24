// Videoer. Ingen videoer er funnet ennå, alle er plassholdere.
//
// YouTube: source "youtube", src = YouTube-ID. Monteres som
//   https://www.youtube-nocookie.com/embed/<id>?autoplay=1 først ved klikk.
// Egen fil: source "mp4", src = "/video/fil.mp4", poster = manifest-nøkkel.
//   Lastes med preload="none".
//
// {
//   id: "v1",
//   title: "Camaro-prosjektet, før og etter",
//   source: "youtube",
//   src: "dQw4w9WgXcQ",
//   poster: "/images/video/camaro-poster",   // valgfritt, ellers YouTube-miniatyr
//   duration: "4:12",
//   date: "2026-08",
//   featured: true,
//   placeholder: false,
// }

export const videos = [
  {
    id: "v1",
    title: "[Hovedvideo: fra verkstedet]",
    source: "youtube",
    src: null,
    poster: "/images/verksted/verksted-impala-motorblokk",
    posterAlt: "Rød Chevrolet Impala inne i verkstedet",
    duration: "[Varighet]",
    date: "[dato]",
    featured: true,
    placeholder: true,
  },
  {
    id: "v2",
    title: "[Videotittel 2]",
    source: "youtube",
    src: null,
    poster: "/images/verksted/verksted-belair-loftebukk",
    posterAlt: "Gul Chevrolet Bel Air på løftebukk",
    duration: "[Varighet]",
    date: "[dato]",
    featured: false,
    placeholder: true,
  },
  {
    id: "v3",
    title: "[Videotittel 3]",
    source: "youtube",
    src: null,
    poster: "/images/butikk/kundemottak-bar-neon",
    posterAlt: "Kundemottaket med bardisk og neonskilt",
    duration: "[Varighet]",
    date: "[dato]",
    featured: false,
    placeholder: true,
  },
  {
    id: "v4",
    title: "[Videotittel 4]",
    source: "mp4",
    src: null,
    poster: "/images/utleie/snoscootere-oppstilt",
    posterAlt: "Snøscootere oppstilt i snøen",
    duration: "[Varighet]",
    date: "[dato]",
    featured: false,
    placeholder: true,
  },
];
