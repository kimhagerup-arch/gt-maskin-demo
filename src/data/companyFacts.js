// Tospråklig visning, se siteContent.js. Kilder: nb/companyFacts.js og en/companyFacts.js.
// Fakta (navn, adresse, telefon, org.nr.) er like; bare etiketter og åpningstider
// er oversatt. Eneste kilde for fakta er _kilder/FAKTA.md.
import { localized } from "../i18n/localized";
import * as en from "./en/companyFacts";
import * as nb from "./nb/companyFacts";

export const companyFacts = localized(nb.companyFacts, en.companyFacts);
