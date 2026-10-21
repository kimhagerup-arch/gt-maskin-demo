// Produkter i nettbutikk-mocken. Alle er plassholdere til produktutvalget er klart.
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
  placeholder(6, "deler", "Tilbehør", "[Eksempel: tilbehør]", {
    placeholderImage: "/images/butikk/butikk-hylle-kjemi",
  }),
  placeholder(7, "deler", "US-biler", "[Eksempel: del til US-bil]"),
  placeholder(8, "deler", "Motor og drivverk", "[Eksempel: drivverksdel]", {
    placeholderImage: "/images/butikk/butikk-hylle-girolje",
  }),

  // Klær og utstyr. placeholderImage er et ekte butikkbilde bak PLASSHOLDER-etiketten.
  // (Deler over: hyllebildene fra butikken bak etiketten der kategorien passer.)
  placeholder(9, "klaer", "Klær", "[Eksempel: jakke]", {
    sizes: [],
    placeholderImage: "/images/butikk/butikk-klaer",
  }),
  placeholder(10, "klaer", "Klær", "[Eksempel: arbeidsbukse]", {
    sizes: [],
    placeholderImage: "/images/butikk/butikk-klaer",
  }),
  placeholder(11, "klaer", "Capser og tilbehør", "[Eksempel: caps]", {
    placeholderImage: "/images/butikk/butikk-capser",
  }),
  placeholder(12, "klaer", "Capser og tilbehør", "[Eksempel: tilbehør]", {
    placeholderImage: "/images/butikk/butikk-capser",
  }),
];
