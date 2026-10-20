// Utleie. Priser og vilkår er plassholdere til Gjermund har bekreftet.
// All utleie samles på /utleie med en utleieforespørsel på siden (ingen ekstern booking).
// Snøscootersafari er avsluttet (opplyst av kunden 20.10.2026) og nevnes ikke.
// Objekter uten bilde (image: null) vises med et ikonfelt, ikke tom plassholder.

export const rental = [
  {
    slug: "scooter-60",
    icon: "Snowflake",
    title: "Snøscooter ca. 60 hk",
    text: "Lettkjørt scooter for tur og familie. Forsikring inkludert.",
    price: "[PRIS]",
    unit: "kr / døgn",
    note: "inkl. forsikring",
    image: "/images/utleie/snoscootere-oppstilt",
    imageAlt: "Snøscootere oppstilt i snøen",
  },
  {
    slug: "scooter-120",
    icon: "Snowflake",
    title: "Snøscooter ca. 120 hk",
    text: "Mer krefter for lengre turer og løssnø. Forsikring inkludert.",
    price: "[PRIS]",
    unit: "kr / døgn",
    note: "inkl. forsikring",
    image: "/images/utleie/snoscootere-oppstilt",
    imageAlt: "Snøscootere oppstilt i snøen",
    imagePosition: "70% 50%",
  },
  {
    slug: "atv",
    icon: "Gauge",
    title: "ATV",
    text: "Firehjuling for barmark og terreng.",
    price: "[PRIS]",
    unit: "kr / døgn",
    note: "[vilkår]",
    image: null,
    imageAlt: "",
  },
  {
    slug: "henger",
    icon: "Truck",
    title: "Tilhenger og biltransporthenger",
    text: "Vanlig tilhenger eller biltransporthenger når bilen skal flyttes.",
    price: "[PRIS]",
    unit: "kr / døgn",
    note: "[vilkår]",
    image: "/images/utleie/biltransporthenger-skra",
    imageAlt: "Biltransporthenger sett skrått forfra utenfor verkstedet",
    image2: "/images/utleie/biltransporthenger-side",
    image2Alt: "Biltransporthenger sett fra siden",
  },
];

/** Valg i utleieforespørselen. Verdi = slug fra listen over, pluss «annet». */
export const rentalTypes = [
  ...rental.map((r) => ({ value: r.slug, label: r.title })),
  { value: "annet", label: "Annet / usikker" },
];

/**
 * Utleiebanneret (forsiden og /utleie). Tekstene er kundens egne utleieformuleringer,
 * ingen nye fakta. Knappen settes der banneret brukes: «Se utleie» på forsiden,
 * «Send utleieforespørsel» på /utleie.
 */
export const rentalBanner = {
  kicker: "Snøscooterutleie",
  title: "Gjennom hele scootersesongen",
  text: "Snøscooterutleie gjennom hele scootersesongen, ATV og hengere resten av året. Send en utleieforespørsel, så tar vi kontakt.",
  // Egen SVG-illustrasjon av fjell og vidde (public/images/utleie/vidde.svg), ingen fotokreditt.
  image: "/images/utleie/vidde.svg",
  // Frilagt produsentbilde, kun demo. Byttes med GT Maskins egne scootere før go-live.
  sledImage: "/images/utleie/scooter-profil",
  ctaHome: { label: "Se utleie", to: "/utleie" },
};
