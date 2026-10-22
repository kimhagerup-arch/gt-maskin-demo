// Preload per rute. Leses av Vite-pluginen i vite.config.js, som skriver et lite
// inline-script i index.html som før CSS og JS er lastet preloader rutens
// hero-bilde (webp-srcset med samme `sizes` som komponenten), rutespesifikke
// fonter og rutens kodesplittede sidechunk (modulepreload), så undersidene
// slipper en ekstra rundtur. Importerer kun rene datafiler.
import { heroSlides } from "./heroSlides";
import {
  aboutSection,
  carsSection,
  contactPage,
  rentalSection,
  videoSection,
  workshopPage,
} from "./siteContent";

const PAGE_SIZES = "100vw";

export const heroByPath = {
  "/": { image: heroSlides[0].image, sizes: "(min-width: 1024px) 480px, 100vw" },
  "/verksted": { image: workshopPage.heroImage, sizes: PAGE_SIZES },
  "/biler-til-salgs": { image: carsSection.page.heroImage, sizes: PAGE_SIZES },
  "/video": { image: videoSection.page.heroImage, sizes: PAGE_SIZES },
  "/utleie": { image: rentalSection.page.heroImage, sizes: PAGE_SIZES },
  "/om-oss": { image: aboutSection.page.heroImage, sizes: PAGE_SIZES },
  "/kontakt": { image: contactPage.heroImage, sizes: PAGE_SIZES },
};

/** Fonter som bare trengs på én rute (Yellowtail i kustom-emblemet på forsiden). */
export const fontsByPath = {
  "/": ["/fonts/yellowtail-400-latin.woff2"],
};

/** Sidekomponent (fil i src/pages) per rute, for modulepreload av sidechunken. */
export const pageByPath = {
  "/verksted": "Verksted",
  "/deler": "Deler",
  // Katalogstiene under /deler/bil, /deler/kategori og /deler/sok (prefiks-match i pluginen).
  "/deler/bil": "Deler",
  "/deler/kategori": "Deler",
  "/deler/sok": "Deler",
  "/kasse": "Kasse",
  "/biler-til-salgs": "BilerTilSalgs",
  "/video": "Video",
  "/utleie": "Utleie",
  "/om-oss": "OmOss",
  "/bestill": "Bestill",
  "/kontakt": "Kontakt",
  "/personvern": "Personvern",
};
