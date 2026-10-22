// Videos, English titles. Same shape and sources as nb/videos.js.
const TITLE = "Video from GT Maskin";

const reel = (n, src) => ({
  id: `fb-${n}`,
  title: `${TITLE} ${n}`,
  source: "facebook",
  src,
  aspect: "9:16",
  poster: null,
  posterAlt: "",
  duration: null,
  date: null,
  featured: false,
  placeholder: false,
});

export const videos = [
  {
    id: "butikken",
    title: "The store",
    source: "mp4",
    src: "/video/hero.mp4",
    aspect: "16:9",
    poster: "/images/hero/butikk-hero-poster",
    posterAlt: "The GT Maskin store: moped, old cash register and clothing rack",
    duration: "0:17",
    date: "2026-10-21",
    featured: true,
    placeholder: false,
  },
  reel(1, "https://www.facebook.com/reel/896290050086392"),
  reel(2, "https://www.facebook.com/reel/1056360530550925"),
  reel(3, "https://www.facebook.com/reel/1822698342075092"),
  reel(4, "https://www.facebook.com/reel/1804793080686764"),
  reel(5, "https://www.facebook.com/reel/1805982323722905"),
  reel(6, "https://www.facebook.com/reel/1528613745686828"),
];
