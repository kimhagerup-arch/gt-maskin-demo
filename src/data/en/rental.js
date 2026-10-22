// Rental, English. Same shape as nb/rental.js. Prices and terms are placeholders
// until Gjermund has confirmed them.
export const rental = [
  {
    slug: "scooter-60",
    icon: "Snowflake",
    title: "Snowmobile approx. 60 hp",
    text: "Easy to ride snowmobile for trips and families. Insurance included.",
    price: "[PRIS]",
    unit: "per day",
    note: "incl. insurance",
    image: "/images/utleie/snoscootere-oppstilt",
    imageAlt: "Snowmobiles lined up in the snow",
  },
  {
    slug: "scooter-120",
    icon: "Snowflake",
    title: "Snowmobile approx. 120 hp",
    text: "More power for longer trips and deep snow. Insurance included.",
    price: "[PRIS]",
    unit: "per day",
    note: "incl. insurance",
    image: "/images/utleie/snoscootere-oppstilt",
    imageAlt: "Snowmobiles lined up in the snow",
    imagePosition: "70% 50%",
  },
  {
    slug: "atv",
    icon: "Gauge",
    title: "ATV",
    text: "Four wheeler for bare ground and terrain.",
    price: "[PRIS]",
    unit: "per day",
    note: "[terms]",
    image: null,
    imageAlt: "",
  },
  {
    slug: "henger",
    icon: "Truck",
    title: "Trailer and car transport trailer",
    text: "Regular trailer or car transport trailer when a car needs moving.",
    price: "[PRIS]",
    unit: "per day",
    note: "[terms]",
    image: "/images/utleie/biltransporthenger-skra",
    imageAlt: "Car transport trailer seen at an angle outside the shop",
    image2: "/images/utleie/biltransporthenger-side",
    image2Alt: "Car transport trailer seen from the side",
  },
];

/** Options in the rental request. Value = slug from the list above, plus "annet". */
export const rentalTypes = [
  ...rental.map((r) => ({ value: r.slug, label: r.title })),
  { value: "annet", label: "Other / not sure" },
];

export const rentalBanner = {
  kicker: "Snowmobile rental",
  title: "All season long",
  text: "Snowmobile rental all season long, ATV and trailers the rest of the year. Send a rental request and we get back to you.",
  image: "/images/utleie/vidde.svg",
  sledImage: "/images/utleie/scooter-profil",
  ctaHome: { label: "See rentals", to: "/utleie" },
};
