import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  aboutSection,
  carsSection,
  contactPage,
  rentalSection,
  videoSection,
  workshopPage,
} from "../data/siteContent";
import { getImage } from "../lib/images";

/** Hero-bilde per rute. Ligger i hovedchunken så bildet kan hentes mens sidechunken lastes. */
const HERO_BY_PATH = {
  "/verksted": workshopPage.heroImage,
  "/biler-til-salgs": carsSection.page.heroImage,
  "/video": videoSection.page.heroImage,
  "/utleie": rentalSection.page.heroImage,
  "/om-oss": aboutSection.page.heroImage,
  "/kontakt": contactPage.heroImage,
};

/**
 * Legger inn <link rel="preload" as="image"> for undersidens hero-bilde med en
 * gang ruten er kjent, før den kodesplittede siden er lastet. Forsiden
 * preloades fra index.html. Sparer en tur-retur på LCP-bildet.
 */
export default function HeroPreload() {
  const { pathname } = useLocation();

  useEffect(() => {
    const key = HERO_BY_PATH[pathname.replace(/\/$/, "") || "/"];
    const image = key ? getImage(key) : null;
    if (!image) return;
    const id = `preload-hero-${key.replace(/\W+/g, "-")}`;
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "preload";
    link.as = "image";
    link.type = "image/webp";
    link.setAttribute("imagesrcset", image.webpSrcSet);
    link.setAttribute("imagesizes", "100vw");
    link.setAttribute("fetchpriority", "high");
    document.head.appendChild(link);
  }, [pathname]);

  return null;
}
