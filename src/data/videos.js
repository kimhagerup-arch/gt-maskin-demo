// Tospråklig visning, se siteContent.js. Kilder: nb/videos.js og en/videos.js.
import { localized } from "../i18n/localized";
import * as en from "./en/videos";
import * as nb from "./nb/videos";

export const videos = localized(nb.videos, en.videos);
