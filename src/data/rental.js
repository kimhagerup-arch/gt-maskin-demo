// Utleie. Priser og vilkår er plassholdere til Gjermund har bekreftet.
// All utleie samles på /utleie med en utleieforespørsel på siden (ingen ekstern booking).
// Safari bestilles på norsemantrail.com.
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

export const safari = {
  kicker: "Snøscootersafari",
  title: "Snøscootersafari i Finnmark",
  text: "Om vinteren kjører vi guidede snøscooterturer, se Norseman Trail.",
  ctaLabel: "norsemantrail.com",
  url: "https://www.norsemantrail.com",
  // Bakgrunn: lisens sjekkes og krediteres før go-live (se BILDELISTE.md).
  image: "/images/utleie/safari-fjell",
  // Frilagt produsentbilde, kun demo. Byttes med GT Maskins egne scootere før go-live.
  sledImage: "/images/utleie/safari-scooter",
  credit: "Foto: [Fotograf, lisens]",
};
