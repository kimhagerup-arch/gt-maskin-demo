// Tospråklig visning, se siteContent.js. Kilder: nb/socialFeed.js og en/socialFeed.js.
// Objektformen er den make.com-webhooken leverer i drift; komponenten er blind for kilde.
import { localized } from "../i18n/localized";
import * as en from "./en/socialFeed";
import * as nb from "./nb/socialFeed";

export const socialFeed = localized(nb.socialFeed, en.socialFeed);
