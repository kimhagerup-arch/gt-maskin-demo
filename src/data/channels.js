// Kanalfakta. Facebook-tallene er fra Facebook-snippet, verifisert dato under.
// Snapchat: brukernavn og profiltype er ikke mottatt fra kunden. Til det kommer vises
// kun QR-koden, uten lenke. url settes til https://www.snapchat.com/add/<brukernavn>.
// Messenger: avledet av Facebook-sidens adresse (facebook.com/GtMaskinas -> m.me/GtMaskinas).
export const channels = [
  {
    platform: "facebook",
    name: "GT Maskin as",
    url: "https://www.facebook.com/GtMaskinas",
    followers: 1023,
    followersLabel: "liker siden",
    checkins: 31,
    verifiedAt: "2026-09-22",
  },
  {
    platform: "messenger",
    name: "Messenger",
    url: "https://m.me/GtMaskinas",
  },
  {
    platform: "snapchat",
    name: "Snapchat",
    username: null,
    profileType: null,
    url: null,
    qrImage: "/images/some/snapchat-qr",
    qrAlt: "Snapchat-QR-kode for GT Maskin",
  },
];

export function getChannel(platform) {
  return channels.find((c) => c.platform === platform) || null;
}
