// Tospråklig visning, se siteContent.js. Kilder: nb/cars.js og en/cars.js.
import { localized } from "../i18n/localized";
import * as en from "./en/cars";
import * as nb from "./nb/cars";

export const cars = localized(nb.cars, en.cars);
export const exampleCars = localized(nb.exampleCars, en.exampleCars);

/** Finner en bil på slug, både ekte og eksempler. */
export function findCar(slug) {
  return [...cars, ...exampleCars].find((c) => c.slug === slug) || null;
}
