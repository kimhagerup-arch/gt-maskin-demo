// Kanalfakta. Facebook-tallene er fra Facebook-snippet, verifisert dato under.
// Snapchat: offentlig profil, sjekket 20.10.2026. embedUrl er Snapchats profilvisning
// (profilkort og nyeste historier), montert først når brukeren klikker (SnapchatSection).
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
    username: "gtmaskin-as",
    profileType: "public",
    // url er den offentlige profilen og brukes av alle «Åpne i Snapchat»-lenker.
    // (/add/-lenken ble prøvd i runde 4 og åpnet kameraet først; tatt ut i runde 4b.)
    url: "https://www.snapchat.com/@gtmaskin-as",
    embedUrl: "https://www.snapchat.com/@gtmaskin-as/embed",
    verifiedAt: "2026-10-20",
    qrImage: "/images/some/snapchat-qr",
    qrAlt: "Snapchat-QR-kode for GT Maskin",
  },
];

export function getChannel(platform) {
  return channels.find((c) => c.platform === platform) || null;
}
