// Tospråklig visning, se siteContent.js. Kilder: nb/services.js og en/services.js.
import { localized } from "../i18n/localized";
import * as en from "./en/services";
import * as nb from "./nb/services";

export const services = localized(nb.services, en.services);
export const workshopSections = localized(nb.workshopSections, en.workshopSections);
export const workshopGallery = localized(nb.workshopGallery, en.workshopGallery);
