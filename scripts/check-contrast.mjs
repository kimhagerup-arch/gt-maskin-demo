/**
 * Måler WCAG-kontrast for fargekombinasjonene i designsystemet.
 * Kjør: node scripts/check-contrast.mjs
 */
const colors = {
  primary: "#151412",
  primaryDark: "#0F0E0D",
  primaryLight: "#1F1D1A",
  primarySoft: "#23211E",
  accent: "#F08003",
  accentLight: "#F79A2B",
  accentDeep: "#9C4A08",
  accentHover: "#D46F02",
  bg: "#F3EFE7",
  surface: "#E4DED2",
  card: "#FFFFFF",
  text: "#151412",
  textInverse: "#F3EFE7",
  muted: "#5E5850",
  mutedInverse: "#B9B2A6",
  placeholder: "#9C9487",
  footer: "#8F877A",
  white: "#FFFFFF",
  facebook: "#0866FF",
  onFacebook: "#FFFFFF",
  snapchat: "#FFFC00",
  onSnapchat: "#000000",
};

function lum(hex) {
  const n = Number.parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function ratio(a, b) {
  const l1 = lum(colors[a]);
  const l2 = lum(colors[b]);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

const pairs = [
  ["primary", "accent", "Tekst brand-primary på aksentfyll (knapper, ikonbokser)"],
  ["primary", "accentHover", "Tekst brand-primary på aksent hover"],
  ["accentLight", "primary", "Aksent lys tekst på primær (kicker, lenker på mørk flate)"],
  ["accentLight", "primaryLight", "Aksent lys tekst på mørkt kort"],
  ["accent", "primary", "Aksent på primær (ikoner, streker)"],
  ["accentDeep", "bg", "Aksent dyp tekst på lys flate (kicker, priser)"],
  ["accentDeep", "card", "Aksent dyp tekst på hvitt kort"],
  ["accentDeep", "surface", "Aksent dyp tekst på surface"],
  ["white", "accentDeep", "Hvit tekst på aksent dyp (sekundær hover)"],
  ["textInverse", "primary", "Brødtekst invers på primær"],
  ["textInverse", "primaryLight", "Brødtekst invers på mørkt kort"],
  ["mutedInverse", "primary", "Nedtonet invers på primær"],
  ["mutedInverse", "primaryLight", "Nedtonet invers på mørkt kort"],
  ["text", "bg", "Brødtekst på lys flate"],
  ["muted", "bg", "Nedtonet på lys flate"],
  ["muted", "card", "Nedtonet på hvitt kort"],
  ["muted", "surface", "Nedtonet på surface (plassholder lys)"],
  ["placeholder", "primarySoft", "Plassholdertekst på plassholder mørk"],
  ["footer", "primaryDark", "Copyright-linje i footer"],
  ["textInverse", "primaryDark", "Tekst i footer"],
  ["onFacebook", "facebook", "Hvit tekst og merke på Facebook-blått (knapper, Messenger)"],
  ["onSnapchat", "snapchat", "Svart tekst på Snapchat-gult (knapper, kort)"],
  ["snapchat", "onSnapchat", "Gul tekst på svart knapp i Snapchat-kortet"],
];

let allOk = true;
console.log("| Kombinasjon | Farger | Kontrast | AA |");
console.log("|---|---|---|---|");
for (const [fg, bg, label] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= 4.5;
  if (!ok) allOk = false;
  console.log(
    `| ${label} | ${colors[fg]} på ${colors[bg]} | ${r.toFixed(2)}:1 | ${ok ? "bestått" : "IKKE bestått"} |`,
  );
}
console.log(allOk ? "\nAlle kombinasjoner består AA (4.5:1)." : "\nMinst én kombinasjon feiler.");
