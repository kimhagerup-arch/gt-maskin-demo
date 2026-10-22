// Tospråklig visning av kategoritreet, se siteContent.js. Kilder: nb/catalog.js
// (slug, ikon og norske navn) og en/catalog.js (samme form, engelske navn).
import { localized } from "../i18n/localized";
import * as en from "./en/catalog";
import * as nb from "./nb/catalog";

export const categories = localized(nb.categories, en.categories);

/** Hovedkategoriene som hører til en bil (ikke olje, kjemi, klær). */
export const partCategories = localized(nb.partCategories, en.partCategories);

/** Hovedgruppene som passer alle biler. */
export const universalCategories = localized(nb.universalCategories, en.universalCategories);

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug) || null;
}

export function getType(categorySlug, typeSlug) {
  const category = getCategory(categorySlug);
  return category?.types.find((t) => t.slug === typeSlug) || null;
}
