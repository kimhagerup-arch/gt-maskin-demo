// Tospråklig visning, se siteContent.js. Kilder: nb/channels.js og en/channels.js.
import { localized } from "../i18n/localized";
import * as en from "./en/channels";
import * as nb from "./nb/channels";

export const channels = localized(nb.channels, en.channels);

export function getChannel(platform) {
  return channels.find((c) => c.platform === platform) || null;
}
