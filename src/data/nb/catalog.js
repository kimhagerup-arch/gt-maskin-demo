// Kategoritreet i delekatalogen: hovedkategori › deltype. Katalogen er drevet av
// data, så varelisten til GT Maskin kan legges inn senere uten nye komponenter
// (se docs/VARELISTE-FORMAT.md). Hver vare peker på en hovedkategori og en deltype
// med slug (products.js: `category` og `type`).
//
// icon: navn på et lucide-ikon, slås opp i Icon.jsx. Brukes i treet og som
// bilde på varer uten foto.
// universal: hovedgrupper som ikke hører til én bil («Olje, kjemi og tilbehør»,
// «Klær og utstyr»). De vises under valgt bil som «Passer alle biler».
// layout: "grid" gir kort i rutenett (klær og utstyr, der bildene selger),
// ellers tette rader.
//
// Kategoriene og deltypene er et forslag og tilpasses kassesystemet til
// GT Maskin når varelisten kommer (STATUS.md).

export const categories = [
  {
    slug: "motor",
    name: "Motor",
    icon: "Cog",
    types: [
      { slug: "oljefilter", name: "Oljefilter" },
      { slug: "luftfilter", name: "Luftfilter" },
      { slug: "drivreim", name: "Drivreim" },
      { slug: "registerreim-og-kjede", name: "Registerreim og -kjede" },
      { slug: "pakninger", name: "Pakninger" },
      { slug: "motorfester", name: "Motorfester" },
    ],
  },
  {
    slug: "drivverk-og-girkasse",
    name: "Drivverk og girkasse",
    icon: "Settings",
    types: [
      { slug: "clutch", name: "Clutch" },
      { slug: "drivaksel", name: "Drivaksel" },
      { slug: "kardang", name: "Kardang" },
      { slug: "differensial", name: "Differensial" },
      { slug: "girkassefilter", name: "Girkassefilter" },
    ],
  },
  {
    slug: "bremser",
    name: "Bremser",
    icon: "Disc",
    types: [
      { slug: "bremseklosser-foran", name: "Bremseklosser foran" },
      { slug: "bremseklosser-bak", name: "Bremseklosser bak" },
      { slug: "bremseskiver-foran", name: "Bremseskiver foran" },
      { slug: "bremseskiver-bak", name: "Bremseskiver bak" },
      { slug: "bremsecaliper", name: "Bremsecaliper" },
      { slug: "bremseslanger", name: "Bremseslanger" },
    ],
  },
  {
    slug: "understell-og-styring",
    name: "Understell og styring",
    icon: "Move",
    types: [
      { slug: "stotdemper-foran", name: "Støtdemper foran" },
      { slug: "stotdemper-bak", name: "Støtdemper bak" },
      { slug: "fjaerer", name: "Fjærer" },
      { slug: "baerearm", name: "Bærearm" },
      { slug: "styreledd", name: "Styreledd" },
      { slug: "hjullager", name: "Hjullager" },
    ],
  },
  {
    slug: "kjoling",
    name: "Kjøling",
    icon: "Thermometer",
    types: [
      { slug: "radiator", name: "Radiator" },
      { slug: "vannpumpe", name: "Vannpumpe" },
      { slug: "termostat", name: "Termostat" },
      { slug: "kjoleslanger", name: "Kjøleslanger" },
      { slug: "vifte", name: "Vifte" },
    ],
  },
  {
    slug: "eksos",
    name: "Eksos",
    icon: "Wind",
    types: [
      { slug: "lyddemper", name: "Lyddemper" },
      { slug: "eksosror", name: "Eksosrør" },
      { slug: "katalysator", name: "Katalysator" },
      { slug: "eksosmanifold", name: "Eksosmanifold" },
      { slug: "eksospakninger", name: "Eksospakninger" },
    ],
  },
  {
    slug: "elektrisk-og-tenning",
    name: "Elektrisk og tenning",
    icon: "Zap",
    types: [
      { slug: "tennplugger", name: "Tennplugger" },
      { slug: "tennspole", name: "Tennspole" },
      { slug: "batteri", name: "Batteri" },
      { slug: "generator", name: "Generator" },
      { slug: "startmotor", name: "Startmotor" },
      { slug: "sensorer", name: "Sensorer" },
    ],
  },
  {
    slug: "drivstoff",
    name: "Drivstoff",
    icon: "Fuel",
    types: [
      { slug: "drivstoffpumpe", name: "Drivstoffpumpe" },
      { slug: "drivstoffilter", name: "Drivstoffilter" },
      { slug: "innsproytningsdyser", name: "Innsprøytningsdyser" },
      { slug: "forgasser", name: "Forgasser" },
    ],
  },
  {
    slug: "karosseri-og-interior",
    name: "Karosseri og interiør",
    icon: "Car",
    types: [
      { slug: "lykter", name: "Lykter" },
      { slug: "speil", name: "Speil" },
      { slug: "vindusviskere", name: "Vindusviskere" },
      { slug: "kupefilter", name: "Kupéfilter" },
      { slug: "dorhandtak", name: "Dørhåndtak" },
      { slug: "emblemer", name: "Emblemer" },
    ],
  },
  {
    slug: "olje-kjemi-og-tilbehor",
    name: "Olje, kjemi og tilbehør",
    icon: "Droplets",
    universal: true,
    types: [
      { slug: "motorolje", name: "Motorolje" },
      { slug: "girolje", name: "Girolje" },
      { slug: "rustbeskyttelse", name: "Rustbeskyttelse" },
      { slug: "kjemi", name: "Kjemi" },
      { slug: "tilbehor", name: "Tilbehør" },
    ],
  },
  {
    slug: "klaer-og-utstyr",
    name: "Klær og utstyr",
    icon: "Shirt",
    universal: true,
    layout: "grid",
    types: [
      { slug: "klaer", name: "Klær" },
      { slug: "capser-og-tilbehor", name: "Capser og tilbehør" },
    ],
  },
];

/** Hovedkategoriene som hører til en bil (ikke olje, kjemi, klær). */
export const partCategories = categories.filter((c) => !c.universal);

/** Hovedgruppene som passer alle biler. */
export const universalCategories = categories.filter((c) => c.universal);

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug) || null;
}

export function getType(categorySlug, typeSlug) {
  const category = getCategory(categorySlug);
  return category?.types.find((t) => t.slug === typeSlug) || null;
}
