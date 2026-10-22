// Tospråklig visning, se siteContent.js. Kilder: nb/rental.js og en/rental.js.
import { localized } from "../i18n/localized";
import * as en from "./en/rental";
import * as nb from "./nb/rental";

export const rental = localized(nb.rental, en.rental);
export const rentalTypes = localized(nb.rentalTypes, en.rentalTypes);
export const rentalBanner = localized(nb.rentalBanner, en.rentalBanner);
