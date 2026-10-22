// Tospråklig visning av sidetekstene. Kildene er src/data/nb/siteContent.js (norsk,
// Gjermunds egne formuleringer) og src/data/en/siteContent.js (amerikansk engelsk),
// med samme form. Hvilket språk som leses, settes av LocaleProvider (src/i18n).
// scripts/check-i18n.mjs feiler når en tekst finnes på det ene språket og mangler
// på det andre.
import { localized } from "../i18n/localized";
import * as en from "./en/siteContent";
import * as nb from "./nb/siteContent";

export const seo = localized(nb.seo, en.seo);
export const nav = localized(nb.nav, en.nav);
export const hero = localized(nb.hero, en.hero);
export const trust = localized(nb.trust, en.trust);
export const feedSection = localized(nb.feedSection, en.feedSection);
export const servicesSection = localized(nb.servicesSection, en.servicesSection);
export const sliderLabels = localized(nb.sliderLabels, en.sliderLabels);
export const videoSection = localized(nb.videoSection, en.videoSection);
export const carsSection = localized(nb.carsSection, en.carsSection);
export const partsSection = localized(nb.partsSection, en.partsSection);
export const rentalSection = localized(nb.rentalSection, en.rentalSection);
export const aboutSection = localized(nb.aboutSection, en.aboutSection);
export const workshopPage = localized(nb.workshopPage, en.workshopPage);
export const bookingForm = localized(nb.bookingForm, en.bookingForm);
export const contactPage = localized(nb.contactPage, en.contactPage);
export const checkoutPage = localized(nb.checkoutPage, en.checkoutPage);
export const notFoundPage = localized(nb.notFoundPage, en.notFoundPage);
export const privacyPage = localized(nb.privacyPage, en.privacyPage);
export const footer = localized(nb.footer, en.footer);
export const socialLinks = localized(nb.socialLinks, en.socialLinks);
export const snapchatSection = localized(nb.snapchatSection, en.snapchatSection);
export const installApp = localized(nb.installApp, en.installApp);
export const placeholderLabels = localized(nb.placeholderLabels, en.placeholderLabels);
export const draftBanner = localized(nb.draftBanner, en.draftBanner);
export const header = localized(nb.header, en.header);
export const a11y = localized(nb.a11y, en.a11y);
export const language = localized(nb.language, en.language);
export const structuredData = localized(nb.structuredData, en.structuredData);
