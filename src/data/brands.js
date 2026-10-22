// Merker GT Maskin har deler til og fører i butikken. Vises som logoer på en
// skiltvegg (BrandWall). Kim-Ove har bestemt (21.10.2026) at demoen skal ha logoer;
// bruken avklares med Gjermund før go-live (se BESLUTNINGER.md, runde 4b).
//
// logo: lokal SVG i public/images/merker/, hentet fra Wikimedia Commons med kilde og
// lisens i _kilder/LOGOER.md. Logoene er ikke endret (ingen omfarging, strekking eller
// effekter). null = ingen ren SVG funnet, navnet vises i stedet.
// w/h: viewBox-mål (til width/height på <img>). logoHeight: høyde i px på skiltet,
// tilpasset formen så merkene får lik visuell tyngde.
// Listen bekreftes av kunden. Skiltene i butikken (Shell, Texaco, Mobil, Route 66,
// National) er pynt og hører ikke hjemme her.

const parts = [
  {
    slug: "chevrolet",
    name: "Chevrolet",
    logo: "/images/merker/chevrolet.svg",
    w: 4115,
    h: 2156,
    logoHeight: 46,
  },
  { slug: "dodge", name: "Dodge", logo: "/images/merker/dodge.svg", w: 500, h: 88, logoHeight: 18 },
  { slug: "ram", name: "Ram", logo: "/images/merker/ram.svg", w: 322, h: 48, logoHeight: 20 },
  // Den blå ovalen (flat utgave fra 2017), uten luft rundt: 1000 × 360.
  { slug: "ford", name: "Ford", logo: "/images/merker/ford.svg", w: 1000, h: 360, logoHeight: 28 },
  {
    slug: "cadillac",
    name: "Cadillac",
    logo: "/images/merker/cadillac.svg",
    w: 2663,
    h: 1090,
    logoHeight: 40,
  },
  {
    slug: "tesla",
    name: "Tesla",
    logo: "/images/merker/tesla.svg",
    w: 1236,
    h: 161,
    logoHeight: 16,
  },
];

const store = [
  { slug: "amsoil", name: "Amsoil", logo: null, w: 0, h: 0, logoHeight: 0 },
  { slug: "fluid-film", name: "Fluid Film", logo: null, w: 0, h: 0, logoHeight: 0 },
  {
    slug: "carhartt",
    name: "Carhartt",
    logo: "/images/merker/carhartt.svg",
    w: 512,
    h: 78,
    logoHeight: 24,
  },
  {
    slug: "stetson",
    name: "Stetson",
    logo: "/images/merker/stetson.svg",
    w: 512,
    h: 65,
    logoHeight: 20,
  },
  { slug: "wunder-baum", name: "Wunder-Baum", logo: null, w: 0, h: 0, logoHeight: 0 },
];

export const brands = {
  parts,
  store,
  all: [...parts, ...store],
};
