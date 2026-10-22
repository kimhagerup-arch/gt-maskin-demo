// Tospråklig visning, se siteContent.js. Kilder: nb/team.js og en/team.js.
import { localized } from "../i18n/localized";
import * as en from "./en/team";
import * as nb from "./nb/team";

export const team = localized(nb.team, en.team);
