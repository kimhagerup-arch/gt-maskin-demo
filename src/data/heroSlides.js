// Tospråklig visning, se siteContent.js. Kilder: nb/heroSlides.js og en/heroSlides.js.
import { localized } from "../i18n/localized";
import * as en from "./en/heroSlides";
import * as nb from "./nb/heroSlides";

export const heroSlides = localized(nb.heroSlides, en.heroSlides);
