// Varer i nettbutikk-mocken. Katalogen (treet etter bil og etter kategori, søk og
// «Min bil») leser bare herfra, catalog.js og vehicles.js.
//
// Delene er EKSEMPLER til varelisten fra GT Maskin er klar: vanlige deltyper
// spredt på fem biler (Chevrolet Camaro 1967-1969, Chevrolet Silverado 2014-2018,
// Dodge Durango 2011-2023, Ram 1500 2019-2024 og Tesla Model 3 2017-2023) pluss
// olje og kjemi fra merkene i butikken (Amsoil og Fluid Film). Varenumrene er
// tydelige eksempelkoder (EKS-1001 og videre), merke og pris står i klammer, og
// hver rad er merket «Eksempel» (placeholder: true). Lagerstatus på eksemplene er
// bare for å vise de tre tilstandene (på lager, ikke på lager, ukjent).
//
// «Klær og utstyr» og Wunder-Baum har navn og pris fra tavlene i butikken
// (_kilder/PRISER-FRA-TAVLENE.md, 21.10.2026), bekreftes av Gjermund før go-live.
//
// Slik legges et ekte produkt inn (se også docs/VARELISTE-FORMAT.md):
// {
//   slug: "bremseklosser-foran-camaro-67-69",   // unik, URL-vennlig
//   brand: "Varemerke",                          // produsent eller merke på varen
//   title: "Bremseklosser foran",
//   category: "bremser",                         // slug fra catalog.js
//   type: "bremseklosser-foran",                 // deltype-slug under kategorien
//   price: "1890",                               // tall som streng uten mellomrom, "[PRIS]" til prisen er kjent
//   sku: "BR-1234",                              // varenummer fra kassesystemet
//   stock: 4,                                    // antall, 0 = ikke på lager, null = ukjent («Spør om lagerstatus»)
//   image: "/images/produkter/bremseklosser-foran",   // nøkkel fra imageManifest, null = kategoriikon
//   description: "Kort beskrivelse.",
//   fits: [{ brand: "chevrolet", model: "camaro", from: 1967, to: 1969 }],  // slugs fra vehicles.js
//   universal: false,                            // true = passer alle biler (olje, kjemi, klær)
//   sizes: null,                                 // klær: ["S", "M", "L", "XL"]. [] = størrelser ikke bekreftet
//   placeholder: false,                          // true = eksempelrad, vises med «Eksempel»
// }

const CARS = {
  camaro: { brand: "chevrolet", model: "camaro", from: 1967, to: 1969 },
  silverado: { brand: "chevrolet", model: "silverado", from: 2014, to: 2018 },
  durango: { brand: "dodge", model: "durango", from: 2011, to: 2023 },
  ram1500: { brand: "ram", model: "1500", from: 2019, to: 2024 },
  model3: { brand: "tesla", model: "model-3", from: 2017, to: 2023 },
};

let seq = 1000;
const nextSku = () => `EKS-${++seq}`;

/** Eksempeldel til én bil. */
const part = (slug, title, category, type, car, extra = {}) => ({
  slug,
  brand: "[Merke]",
  title,
  category,
  type,
  price: "[PRIS]",
  sku: nextSku(),
  stock: null,
  image: null,
  description: "",
  fits: [CARS[car]],
  universal: false,
  sizes: null,
  placeholder: true,
  ...extra,
});

/** Eksempel på olje eller kjemi som passer alle biler. */
const fluid = (slug, brand, title, type, image, extra = {}) => ({
  slug,
  brand,
  title,
  category: "olje-kjemi-og-tilbehor",
  type,
  price: "[PRIS]",
  sku: nextSku(),
  stock: null,
  image: null,
  placeholderImage: image,
  description: "",
  fits: [],
  universal: true,
  sizes: null,
  placeholder: true,
  ...extra,
});

export const products = [
  // Chevrolet Camaro 1967-1969
  part(
    "bremseklosser-foran-camaro-67-69",
    "Bremseklosser foran",
    "bremser",
    "bremseklosser-foran",
    "camaro",
    { stock: 2 },
  ),
  part(
    "bremseskiver-foran-camaro-67-69",
    "Bremseskiver foran",
    "bremser",
    "bremseskiver-foran",
    "camaro",
  ),
  part("oljefilter-camaro-67-69", "Oljefilter", "motor", "oljefilter", "camaro", { stock: 6 }),
  part(
    "tennplugger-camaro-67-69",
    "Tennplugger, sett",
    "elektrisk-og-tenning",
    "tennplugger",
    "camaro",
  ),
  part("vannpumpe-camaro-67-69", "Vannpumpe", "kjoling", "vannpumpe", "camaro", { stock: 0 }),
  part("lyddemper-camaro-67-69", "Lyddemper", "eksos", "lyddemper", "camaro"),
  part(
    "stotdemper-foran-camaro-67-69",
    "Støtdemper foran",
    "understell-og-styring",
    "stotdemper-foran",
    "camaro",
  ),
  part(
    "drivstoffpumpe-camaro-67-69",
    "Drivstoffpumpe, mekanisk",
    "drivstoff",
    "drivstoffpumpe",
    "camaro",
  ),

  // Chevrolet Silverado 2014-2018
  part(
    "bremseklosser-foran-silverado-14-18",
    "Bremseklosser foran",
    "bremser",
    "bremseklosser-foran",
    "silverado",
    { stock: 3 },
  ),
  part(
    "bremseskiver-foran-silverado-14-18",
    "Bremseskiver foran",
    "bremser",
    "bremseskiver-foran",
    "silverado",
  ),
  part("oljefilter-silverado-14-18", "Oljefilter", "motor", "oljefilter", "silverado", {
    stock: 8,
  }),
  part("luftfilter-silverado-14-18", "Luftfilter", "motor", "luftfilter", "silverado"),
  part(
    "kupefilter-silverado-14-18",
    "Kupéfilter",
    "karosseri-og-interior",
    "kupefilter",
    "silverado",
  ),
  part(
    "stotdemper-foran-silverado-14-18",
    "Støtdemper foran",
    "understell-og-styring",
    "stotdemper-foran",
    "silverado",
    { stock: 0 },
  ),
  part("vannpumpe-silverado-14-18", "Vannpumpe", "kjoling", "vannpumpe", "silverado"),

  // Dodge Durango 2011-2023
  part(
    "bremseklosser-foran-durango-11-23",
    "Bremseklosser foran",
    "bremser",
    "bremseklosser-foran",
    "durango",
    { stock: 4 },
  ),
  part("oljefilter-durango-11-23", "Oljefilter", "motor", "oljefilter", "durango", { stock: 5 }),
  part("luftfilter-durango-11-23", "Luftfilter", "motor", "luftfilter", "durango"),
  part("lyddemper-durango-11-23", "Lyddemper bak", "eksos", "lyddemper", "durango"),
  part("eksosror-durango-11-23", "Eksosrør, midtre", "eksos", "eksosror", "durango", { stock: 0 }),
  part(
    "tennplugger-durango-11-23",
    "Tennplugger, sett",
    "elektrisk-og-tenning",
    "tennplugger",
    "durango",
  ),
  part(
    "vindusviskere-durango-11-23",
    "Vindusviskere foran, par",
    "karosseri-og-interior",
    "vindusviskere",
    "durango",
    { stock: 10 },
  ),

  // Ram 1500 2019-2024
  part(
    "bremseklosser-foran-ram-1500-19-24",
    "Bremseklosser foran",
    "bremser",
    "bremseklosser-foran",
    "ram1500",
  ),
  part(
    "bremseskiver-foran-ram-1500-19-24",
    "Bremseskiver foran",
    "bremser",
    "bremseskiver-foran",
    "ram1500",
    { stock: 2 },
  ),
  part("oljefilter-ram-1500-19-24", "Oljefilter", "motor", "oljefilter", "ram1500", { stock: 7 }),
  part("luftfilter-ram-1500-19-24", "Luftfilter", "motor", "luftfilter", "ram1500"),
  part("kupefilter-ram-1500-19-24", "Kupéfilter", "karosseri-og-interior", "kupefilter", "ram1500"),
  part(
    "stotdemper-foran-ram-1500-19-24",
    "Støtdemper foran",
    "understell-og-styring",
    "stotdemper-foran",
    "ram1500",
  ),

  // Tesla Model 3 2017-2023
  part(
    "bremseklosser-foran-model-3-17-23",
    "Bremseklosser foran",
    "bremser",
    "bremseklosser-foran",
    "model3",
    { stock: 2 },
  ),
  part("kupefilter-model-3-17-23", "Kupéfilter", "karosseri-og-interior", "kupefilter", "model3", {
    stock: 4,
  }),
  part(
    "vindusviskere-model-3-17-23",
    "Vindusviskere foran, par",
    "karosseri-og-interior",
    "vindusviskere",
    "model3",
  ),
  part(
    "12v-batteri-model-3-17-23",
    "12-voltsbatteri",
    "elektrisk-og-tenning",
    "batteri",
    "model3",
    { stock: 0 },
  ),

  // Olje, kjemi og tilbehør: merkene som står i butikken. Produktnavn og priser
  // fylles inn fra varelisten; bildene er fra hyllene i butikken (21.10.2026).
  fluid(
    "motorolje-helsyntetisk",
    "Amsoil",
    "Motorolje, helsyntetisk",
    "motorolje",
    "/images/butikk/butikk-hylle-amsoil",
    { stock: 12 },
  ),
  fluid(
    "motorolje-diesel",
    "Amsoil",
    "Motorolje, diesel",
    "motorolje",
    "/images/butikk/butikk-hylle-amsoil-diesel",
  ),
  fluid(
    "girolje-automat",
    "Amsoil",
    "Girolje, automatgirkasse",
    "girolje",
    "/images/butikk/butikk-hylle-girolje",
  ),
  fluid(
    "girolje-severe-gear",
    "Amsoil",
    "Girolje, Severe Gear",
    "girolje",
    "/images/butikk/butikk-hylle-severe-gear",
    { stock: 6 },
  ),
  fluid(
    "rustbeskyttelse-spray",
    "Fluid Film",
    "Rustbeskyttelse, spray",
    "rustbeskyttelse",
    "/images/butikk/butikk-rustbeskyttelse",
    { stock: 9 },
  ),
  fluid(
    "rustbeskyttelse-boks",
    "Fluid Film",
    "Rustbeskyttelse, boks",
    "rustbeskyttelse",
    "/images/butikk/butikk-rustbeskyttelse",
  ),
  fluid("bremserens", "[Merke]", "Bremserens", "kjemi", "/images/butikk/butikk-hylle-kjemi"),
  {
    slug: "wunder-baum",
    brand: "Wunder-Baum",
    title: "Wunder-Baum",
    category: "olje-kjemi-og-tilbehor",
    type: "tilbehor",
    price: "35",
    sku: null,
    stock: null,
    image: "/images/produkter/wunder-baum",
    description: "",
    fits: [],
    universal: true,
    sizes: null,
    placeholder: false,
  },

  // Klær og utstyr: fra tavla i butikken. Størrelser er ikke bekreftet (sizes: []).
  // Bildene er fra butikken 21.10.2026; kopp og nøkkelring har ikke bilde ennå.
  ...[
    ["t-skjorte", "T-skjorte", "klaer", "299", "/images/butikk/butikk-bord-klaer-capser", [], null],
    ["caps", "Caps", "capser-og-tilbehor", "399", "/images/butikk/butikk-capser", null, null],
    [
      "stetson-caps",
      "Stetson caps",
      "capser-og-tilbehor",
      "599",
      "/images/butikk/butikk-stetson-capser",
      null,
      "Stetson",
    ],
    ["kopp", "Kopp", "capser-og-tilbehor", "250", null, null, null],
    ["nokkelring", "Nøkkelring", "capser-og-tilbehor", "99", null, null, null],
  ].map(([slug, title, type, price, image, sizes, brand]) => ({
    slug,
    brand,
    title,
    category: "klaer-og-utstyr",
    type,
    price,
    sku: null,
    stock: null,
    image,
    description: "",
    fits: [],
    universal: true,
    sizes,
    placeholder: false,
  })),
];

export function getProduct(slug) {
  return products.find((p) => p.slug === slug) || null;
}

/** Fire varer med bilde til forsiden: olje, rustbeskyttelse, Wunder-Baum og caps. */
export const featuredSlugs = [
  "motorolje-helsyntetisk",
  "rustbeskyttelse-spray",
  "wunder-baum",
  "caps",
];

export function featuredProducts() {
  return featuredSlugs.map(getProduct).filter(Boolean);
}
