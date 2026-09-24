// Biler til salgs. Alle kort er plassholdere til Gjermund har bekreftet
// hva som er til salgs. Bildene bil1-3 i assets-raw brukes IKKE her.
//
// Slik legges en ekte bil inn:
// {
//   slug: "chevrolet-camaro-1969",
//   title: "Chevrolet Camaro",
//   year: "1969",
//   km: "45 000 km",
//   engine: "V8, bensin",
//   price: "495000",            // tall som streng, formateres i komponent
//   images: ["/images/biler/camaro-1969-front"],  // nøkkel fra imageManifest
//   description: "Kort beskrivelse.",
//   sold: false,
//   placeholder: false,
// }

export const cars = [
  {
    slug: "bil-1",
    title: "[Merke og modell]",
    year: "[Årsmodell]",
    km: "[km]",
    engine: "[drivstoff / motor]",
    price: "[PRIS]",
    images: [],
    description: "",
    sold: false,
    placeholder: true,
    placeholderLabel: "[Bilde av bil 1]",
  },
  {
    slug: "bil-2",
    title: "[Merke og modell]",
    year: "[Årsmodell]",
    km: "[km]",
    engine: "[drivstoff / motor]",
    price: "[PRIS]",
    images: [],
    description: "",
    sold: false,
    placeholder: true,
    placeholderLabel: "[Bilde av bil 2]",
  },
  {
    slug: "bil-3",
    title: "[Merke og modell]",
    year: "[Årsmodell]",
    km: "[km]",
    engine: "[drivstoff / motor]",
    price: "[PRIS]",
    images: [],
    description: "",
    sold: false,
    placeholder: true,
    placeholderLabel: "[Bilde av bil 3]",
  },
];
