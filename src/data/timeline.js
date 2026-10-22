// Tospråklig visning, se siteContent.js. Kilder: nb/timeline.js og en/timeline.js.
import { localized } from "../i18n/localized";
import * as en from "./en/timeline";
import * as nb from "./nb/timeline";

export const timeline = localized(nb.timeline, en.timeline);
