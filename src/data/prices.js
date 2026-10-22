// Tospråklig visning, se siteContent.js. Kilder: nb/prices.js og en/prices.js.
import { localized } from "../i18n/localized";
import * as en from "./en/prices";
import * as nb from "./nb/prices";

export const workshopPrices = localized(nb.workshopPrices, en.workshopPrices);
