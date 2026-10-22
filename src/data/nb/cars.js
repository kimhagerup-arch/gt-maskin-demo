// Biler til salgs.
// `cars` er de ekte bilene. Listen er tom nå: kunden har ingen biler ute for salg.
// `exampleCars` er to tydelig merkede eksempelkort som viser hvordan bilene
// presenteres når de kommer. De vises bare så lenge `cars` er tom.
// Bildene bil1-3 i assets-raw brukes IKKE her før Gjermund har bekreftet.
//
// Slik legges en ekte bil inn i `cars`:
// {
//   slug: "chevrolet-camaro-1969",
//   title: "Chevrolet Camaro",
//   year: "1969",
//   km: "45 000 km",
//   engine: "V8, bensin",
//   price: "495000",            // tall som streng, formateres i komponent
//   images: ["/images/biler/camaro-1969-front", "/images/biler/camaro-1969-side"],
//   imageAlts: ["Chevrolet Camaro 1969 sett forfra", "Chevrolet Camaro 1969 fra siden"],
//   description: "Kort beskrivelse.",
//   sold: false,
//   placeholder: false,
// }

export const cars = [];

export const exampleCars = [
  {
    slug: "eksempel-bil",
    title: "[Merke og modell]",
    year: "[Årsmodell]",
    km: "[km]",
    engine: "[drivstoff / motor]",
    price: "[PRIS]",
    images: [],
    imageAlts: [],
    description: "[Kort beskrivelse av bilen: stand, historikk, utstyr]",
    sold: false,
    placeholder: true,
    placeholderLabel: "[Bilde av bil til salgs]",
  },
  {
    slug: "eksempel-solgt",
    title: "[Merke og modell]",
    year: "[Årsmodell]",
    km: "[km]",
    engine: "[drivstoff / motor]",
    price: "[PRIS]",
    images: [],
    imageAlts: [],
    description: "[Kort beskrivelse av bilen]",
    sold: true,
    placeholder: true,
    placeholderLabel: "[Bilde av solgt bil]",
  },
];

/** Finner en bil på slug, både ekte og eksempler. */
export function findCar(slug) {
  return [...cars, ...exampleCars].find((c) => c.slug === slug) || null;
}
