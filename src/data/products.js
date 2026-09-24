// Produkter i nettbutikk-mocken. Alle er plassholdere til produktutvalget er klart.
//
// Slik legges et ekte produkt inn:
// {
//   slug: "bremseskiver-foran-camaro-67-69",
//   brand: "Varemerke",
//   title: "Bremseskiver foran",
//   category: "Bremser",
//   price: "1890",              // tall som streng uten mellomrom
//   sku: "BR-1234",
//   stock: 4,                   // null = ukjent, vis «Spør om lagerstatus»
//   image: "/images/produkter/bremseskiver-foran",   // nøkkel fra imageManifest
//   description: "Kort beskrivelse.",
//   fits: ["Chevrolet Camaro 1967-1969"],
//   placeholder: false,
// }

export const categories = [
  "Alle deler",
  "US-biler",
  "Tesla",
  "Motor og drivverk",
  "Bremser",
  "Understell",
  "Tilbehør",
];

const placeholder = (n, category, label) => ({
  slug: `produkt-${n}`,
  brand: "[VAREMERKE]",
  title: "[Produktnavn]",
  category,
  price: "[PRIS]",
  sku: null,
  stock: null,
  image: null,
  description: "",
  fits: [],
  placeholder: true,
  placeholderLabel: label,
});

export const products = [
  placeholder(1, "US-biler", "[Eksempel: del til US-bil]"),
  placeholder(2, "Motor og drivverk", "[Eksempel: motordel]"),
  placeholder(3, "Bremser", "[Eksempel: bremsedel]"),
  placeholder(4, "Tesla", "[Eksempel: del til Tesla]"),
  placeholder(5, "Understell", "[Eksempel: understellsdel]"),
  placeholder(6, "Tilbehør", "[Eksempel: tilbehør]"),
  placeholder(7, "US-biler", "[Eksempel: del til US-bil]"),
  placeholder(8, "Motor og drivverk", "[Eksempel: drivverksdel]"),
];
