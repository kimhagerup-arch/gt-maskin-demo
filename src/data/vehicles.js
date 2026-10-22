// Tospråklig visning av kjøretøyene, se siteContent.js. Kilder: nb/vehicles.js og
// en/vehicles.js (samme form; bare noen få modellnavn er forskjellige).
import { localized } from "../i18n/localized";
import * as en from "./en/vehicles";
import * as nb from "./nb/vehicles";

export const vehicles = localized(nb.vehicles, en.vehicles);

/** Siste valg i merkelisten: går rett til forespørsel. */
export const otherVehicle = localized(nb.otherVehicle, en.otherVehicle);

export function getBrand(slug) {
  return vehicles.find((b) => b.slug === slug) || null;
}

export function getModel(brandSlug, modelSlug) {
  const b = getBrand(brandSlug);
  return b?.models.find((m) => m.slug === modelSlug) || null;
}

export { decadesFor, lastYear, yearInModel } from "./nb/vehicles";
