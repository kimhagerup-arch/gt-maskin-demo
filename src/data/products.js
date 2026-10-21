// Produkter i nettbutikk-mocken. Delene er plassholdere til produktutvalget er klart.
// «Klær og utstyr» og Wunder-Baum har navn og pris fra tavlene i butikken
// (_kilder/PRISER-FRA-TAVLENE.md, 21.10.2026), bekreftes av Gjermund før go-live.
// Varemerke, varenummer, lagerstatus og beskrivelse er ikke kjent (null).
// Sortimentet er delt i to hovedgrupper: «Deler» og «Klær og utstyr».
//
// Slik legges et ekte produkt inn:
// {
//   slug: "bremseskiver-foran-camaro-67-69",
//   group: "deler",             // "deler" | "klaer"
//   brand: "Varemerke",
//   title: "Bremseskiver foran",
//   category: "Bremser",
//   price: "1890",              // tall som streng uten mellomrom
//   sku: "BR-1234",
//   stock: 4,                   // null = ukjent, vis «Spør om lagerstatus»
//   image: "/images/produkter/bremseskiver-foran",   // nøkkel fra imageManifest
//   description: "Kort beskrivelse.",
//   fits: ["Chevrolet Camaro 1967-1969"],
//   sizes: null,                // klær: ["S", "M", "L", "XL"]. [] = størrelser ikke bekreftet
//   placeholder: false,
// }

export const groups = [
  {
    slug: "deler",
    label: "Deler",
    allLabel: "Alle deler",
    categories: ["US-biler", "Tesla", "Motor og drivverk", "Bremser", "Understell", "Tilbehør"],
  },
  {
    slug: "klaer",
    label: "Klær og utstyr",
    allLabel: "Alt",
    categories: ["Klær", "Capser og tilbehør"],
  },
];

export function getGroup(slug) {
  return groups.find((g) => g.slug === slug) || groups[0];
}

/** URL-vennlig nøkkel for en kategori («Motor og drivverk» -> «motor-og-drivverk»). */
export function categorySlug(label) {
  return String(label)
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const placeholder = (n, group, category, label, extra = {}) => ({
  slug: `produkt-${n}`,
  group,
  brand: "[VAREMERKE]",
  title: "[Produktnavn]",
  category,
  price: "[PRIS]",
  sku: null,
  stock: null,
  image: null,
  description: "",
  fits: [],
  sizes: null,
  placeholder: true,
  placeholderLabel: label,
  ...extra,
});

export const products = [
  placeholder(1, "deler", "US-biler", "[Eksempel: del til US-bil]"),
  placeholder(2, "deler", "Motor og drivverk", "[Eksempel: motordel]", {
    placeholderImage: "/images/butikk/butikk-hylle-amsoil",
  }),
  placeholder(3, "deler", "Bremser", "[Eksempel: bremsedel]"),
  placeholder(4, "deler", "Tesla", "[Eksempel: del til Tesla]"),
  placeholder(5, "deler", "Understell", "[Eksempel: understellsdel]"),
  {
    slug: "wunder-baum",
    group: "deler",
    brand: "Wunder-Baum",
    title: "Wunder-Baum",
    category: "Tilbehør",
    price: "35",
    sku: null,
    stock: null,
    image: "/images/produkter/wunder-baum",
    description: "",
    fits: [],
    sizes: null,
    placeholder: false,
  },
  placeholder(6, "deler", "Tilbehør", "[Eksempel: tilbehør]", {
    placeholderImage: "/images/butikk/butikk-hylle-kjemi",
  }),
  placeholder(7, "deler", "US-biler", "[Eksempel: del til US-bil]"),
  placeholder(8, "deler", "Motor og drivverk", "[Eksempel: drivverksdel]", {
    placeholderImage: "/images/butikk/butikk-hylle-girolje",
  }),

  // Klær og utstyr: fra tavla i butikken. Størrelser er ikke bekreftet (sizes: []).
  // Bildene er fra butikken 21.10.2026; kopp og nøkkelring har ikke bilde ennå.
  ...[
    ["t-skjorte", "T-skjorte", "Klær", "299", "/images/butikk/butikk-bord-klaer-capser", [], null],
    ["caps", "Caps", "Capser og tilbehør", "399", "/images/butikk/butikk-capser", null, null],
    [
      "stetson-caps",
      "Stetson caps",
      "Capser og tilbehør",
      "599",
      "/images/butikk/butikk-stetson-capser",
      null,
      "Stetson",
    ],
    ["kopp", "Kopp", "Capser og tilbehør", "250", null, null, null],
    ["nokkelring", "Nøkkelring", "Capser og tilbehør", "99", null, null, null],
  ].map(([slug, title, category, price, image, sizes, brand]) => ({
    slug,
    group: "klaer",
    brand,
    title,
    category,
    price,
    sku: null,
    stock: null,
    image,
    description: "",
    fits: [],
    sizes,
    placeholder: false,
  })),
];
