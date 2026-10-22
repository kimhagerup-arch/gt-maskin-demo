// Tospråklig visning av varene, se siteContent.js. Kilder: nb/products.js (slik
// legges varer inn, se kommentaren der og docs/VARELISTE-FORMAT.md) og en/products.js
// (samme form: engelske navn, plassholdere og beskrivelser).
import { localized } from "../i18n/localized";
import * as en from "./en/products";
import * as nb from "./nb/products";

export const products = localized(nb.products, en.products);

export function getProduct(slug) {
  return products.find((p) => p.slug === slug) || null;
}

/** Fire varer med bilde til forsiden: olje, rustbeskyttelse, Wunder-Baum og caps. */
export const featuredSlugs = nb.featuredSlugs;

export function featuredProducts() {
  return featuredSlugs.map(getProduct).filter(Boolean);
}
