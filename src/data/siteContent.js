// Sidetekst per side og seksjon. Kilde: _kilder/INNHOLD-RAATEKST.md del B.
// Tekst i [klammer] er plassholder og skal synes som plassholder.

export const seo = {
  home: {
    title: "GT Maskin AS, US-bilspesialisten i Alta | Godkjent bilverksted",
    description:
      "Godkjent bilverksted i Alta spesialisert på amerikanske biler, custom-prosjekter og delesalg. Utleie av snøscooter, ATV og henger. Myggveien 3, Alta.",
  },
  verksted: {
    title: "Bilverksted i Alta for amerikanske biler, custom og classic | GT Maskin AS",
    description:
      "Service, reparasjon og custom-prosjekter for amerikanske biler og de fleste andre merker. Godkjent bilverksted i Myggveien 3, Alta.",
  },
  deler: {
    title: "Butikk: deler til US-biler og Tesla, klær og capser | GT Maskin AS",
    description:
      "Godt delelager til de fleste US-biler, også Tesla. I butikken står oljer, kjemi, rustbeskyttelse, klær og capser. Send forespørsel om det du trenger.",
  },
  produkt: {
    title: "Del | GT Maskin AS",
    description: "Produktside i nettbutikken til GT Maskin AS i Alta.",
  },
  kasse: {
    title: "Bestillingsforespørsel | GT Maskin AS",
    description: "Send bestillingsforespørsel på deler fra GT Maskin AS i Alta.",
  },
  biler: {
    title: "Biler til salgs | GT Maskin AS",
    description: "Se hvilke biler som står inne hos GT Maskin i Alta akkurat nå.",
  },
  video: {
    title: "Video fra verkstedet | GT Maskin AS",
    description:
      "Prosjekter, før og etter, og litt fra hverdagen på verkstedet i Myggveien. Video fra GT Maskin i Alta.",
  },
  utleie: {
    title: "Snøscooterutleie, ATV og henger i Alta | GT Maskin AS",
    description:
      "Leie av snøscooter, ATV, tilhenger og biltransporthenger i Alta. Snøscooterutleie gjennom hele scootersesongen.",
  },
  omOss: {
    title: "Om GT Maskin AS, Kustom Speedshop i Alta siden 2012",
    description:
      "Entusiaster på amerikanske og spesielle biler. Godkjent bilverksted og lærebedrift i Alta, etablert 2012.",
  },
  bestill: {
    title: "Bestill verkstedtime i Alta | GT Maskin AS",
    description:
      "Send forespørsel om service, reparasjon eller custom-prosjekt. Vi tar kontakt og bekrefter time.",
  },
  kontakt: {
    title: "Kontakt GT Maskin AS i Alta",
    description:
      "Myggveien 3, 9514 Alta. Mandag-fredag 08:30-16:00. Ring +47 911 14 628 eller send forespørsel.",
  },
  personvern: {
    title: "Personvern | GT Maskin AS",
    description: "Personvernerklæring for nettsiden til GT Maskin AS.",
  },
  notFound: {
    title: "Siden finnes ikke | GT Maskin AS",
    description: "Lenken kan være gammel. Gå til forsiden eller ta kontakt med oss.",
  },
};

export const nav = {
  items: [
    { label: "Verksted", to: "/verksted" },
    { label: "Butikk", to: "/deler" },
    { label: "Biler til salgs", to: "/biler-til-salgs" },
    { label: "Video", to: "/video" },
    { label: "Utleie", to: "/utleie" },
    { label: "Om oss", to: "/om-oss" },
    { label: "Kontakt", to: "/kontakt" },
  ],
  cta: { label: "Bestill time", to: "/bestill" },
  mobileCall: "Ring",
  menuOpen: "Åpne meny",
  menuClose: "Lukk meny",
  cartLabel: "Handlekurv",
};

export const hero = {
  kicker: "Godkjent bilverksted · Alta",
  kickerMobile: "Godkjent bilverksted · Alta",
  title: ["Spesialisten på", "amerikanske", "biler i Alta"],
  lead: "Vi er entusiaster på biler, ikke bare amerikanske, men alle spesielle biler. Moderne verksted, godt delelager og lang erfaring. Fra gamle veteranbiler til nye bruksbiler.",
  primary: { label: "Bestill verkstedtime", to: "/bestill" },
  secondary: { label: "Se hva vi gjør", to: "/verksted" },
  badge: {
    script: "Kustom",
    main: "Speedshop",
    place: "Alta",
    text: "Amerikanske biler, custom-prosjekter og delesalg.",
  },
  image: "/images/hero/fasade-kveld-skilt",
  imageAlt: "Fasaden til GT Maskin i Myggveien i kveldslys, med skilt og klassikere i vinduene",
  imagePosition: "64% 42%",
  video: "/video/hero.mp4",
};

export const trust = [
  { icon: "ShieldCheck", label: "Godkjent bilverksted" },
  { icon: "Car", label: "Spesialister på US-biler" },
  { icon: "Package", label: "Delelager for US-biler og Tesla" },
  { icon: "GraduationCap", label: "Godkjent lærebedrift" },
  { icon: "Snowflake", label: "Snøscooterutleie hele sesongen" },
];

export const feedSection = {
  kicker: "Siste fra Facebook",
  title: "Live fra GT Maskin",
  lead: "Her ser du det siste fra verkstedet, hentet automatisk fra Facebook.",
  cta: { label: "Følg oss på Facebook" },
  placeholderTag: "Plassholder",
  placeholderCaption: "[Innleggstekst hentes automatisk fra Facebook-siden]",
  dateFallback: "[dato]",
  followersSuffix: "liker siden",
  checkinsSuffix: "har vært her",
  verifiedPrefix: "Tall fra Facebook",
  openPost: "Åpne innlegget på Facebook",
  readMore: "Les mer på Facebook",
  moreImages: "Flere bilder",
};

export const servicesSection = {
  kicker: "Hva vi gjør",
  title: "Verksted, deler og prosjekter",
  lead: "Vi tar alt fra gamle veteranbiler til nye bruksbiler, med et moderne verksted som tar vare på bilen din, gamle som nye, blanke som rustne.",
  readMore: "Les mer",
};

export const videoSection = {
  kicker: "Video",
  title: "GT Maskin på film",
  lead: "Prosjekter, før og etter, og litt fra hverdagen på verkstedet i Myggveien.",
  play: "Spill av video",
  placeholderTag: "Plassholder",
  playlistLabel: "Spilleliste",
  nowPlaying: "Spiller nå",
  prev: "Forrige videoer",
  next: "Neste videoer",
  allVideos: { label: "Se alle videoer", to: "/video" },
  seeOnSnapchat: "Se på Snapchat",
  seeOnFacebook: "Se på Facebook",
  page: {
    kicker: "Video",
    title: "GT Maskin på film",
    lead: "Prosjekter, før og etter, og litt fra hverdagen på verkstedet i Myggveien. Videoene lastes først når du trykker på avspilling.",
    heroImage: "/images/bygg/fasade-dag-bilpark",
    heroAlt: "Bygget til GT Maskin på dagtid med mange biler foran",
    featuredTitle: "Siste video",
    gridTitle: "Alle videoer",
    moreKicker: "Mer fra oss",
    moreTitle: "Følg GT Maskin",
    moreText: "Følg oss på Facebook for det siste fra verkstedet.",
    moreFacebook: "Mer på Facebook",
    moreSnapchat: "Følg oss på Snapchat",
    snapchatQrHint: "Skann QR-koden i Snapchat",
  },
};

export const carsSection = {
  kicker: "Biler til salgs",
  title: "Inne hos oss akkurat nå",
  link: { label: "Se alle biler", to: "/biler-til-salgs" },
  empty: {
    title: "Ingen biler ute for salg akkurat nå.",
    text: "Leter du etter noe spesielt? Ta kontakt, vi vet hva som er på vei inn.",
    cta: { label: "Si hva du leter etter", to: "/biler-til-salgs#vi-skaffer" },
  },
  card: {
    imageLabel: "[Bilde av bil]",
    priceSuffix: "kr",
    sold: "Solgt",
    ask: "Spør om bilen",
    details: "Se bilen",
    exampleTag: "Plassholder",
  },
  page: {
    kicker: "Biler til salgs",
    title: "Biler til salgs hos GT Maskin",
    lead: "Vi har til tider veldig fine biler stående inne i butikk og kundemottak. Her legger vi ut det som er til salgs. Finner du ikke det du leter etter, ta kontakt, vi vet hva som er på vei inn.",
    heroImage: "/images/hero/fasade-vinter-klassikere",
    heroAlt: "To amerikanske klassikere foran fasaden til GT Maskin om vinteren",
    nowKicker: "Inne nå",
    nowTitle: "Inne hos oss nå",
    soldKicker: "Solgt",
    soldTitle: "Solgte biler",
    examplesKicker: "Slik presenteres bilene",
    examplesTitle: "Slik ser det ut når bilene kommer",
    examplesText:
      "Bilene legges ut her med bilder, årsmodell, km, motor og pris. Kortene under er eksempler, ikke biler til salgs.",
  },
  wanted: {
    id: "vi-skaffer",
    kicker: "Vi skaffer",
    title: "Leter du etter noe spesielt? Vi skaffer",
    lead: "Si hva du leter etter, så tar vi kontakt. Vi vet hva som er på vei inn.",
    fields: {
      name: { label: "Navn", placeholder: "Ditt navn" },
      phone: { label: "Telefon", placeholder: "Mobilnummer" },
      email: { label: "E-post", placeholder: "navn@eksempel.no" },
      model: { label: "Merke og modell", placeholder: "F.eks. Chevrolet Camaro" },
      yearFrom: { label: "Årsmodell fra", placeholder: "F.eks. 1967" },
      yearTo: { label: "Årsmodell til", placeholder: "F.eks. 1972" },
      budget: { label: "Budsjett (valgfritt)", placeholder: "Omtrent, i kroner" },
      wishes: { label: "Andre ønsker", placeholder: "Farge, motor, stand, utstyr …" },
    },
    submit: "Send ønsket",
    sending: "Sender …",
    success: "Takk! Vi har mottatt ønsket ditt og tar kontakt.",
    validation: "Fyll inn navn, merke og modell, og enten telefon eller e-post.",
    validationEmail: "Sjekk e-postadressen.",
    validationYears: "Årsmodell til kan ikke være før årsmodell fra.",
  },
  detail: {
    back: "Alle biler",
    specs: { year: "Årsmodell", km: "Kilometer", engine: "Motor", price: "Pris" },
    descriptionTitle: "Om bilen",
    descriptionFallback: "[Beskrivelse av bilen legges inn sammen med bildene]",
    ask: "Spør om bilen",
    callPrefix: "Eller ring",
    gallery: {
      label: "Bildegalleri",
      prev: "Forrige bilde",
      next: "Neste bilde",
      goTo: "Vis bilde",
      of: "av",
    },
    notFound: "Fant ikke denne bilen.",
    exampleNote: "Dette er et eksempel på hvordan en bil presenteres. Bilen finnes ikke til salgs.",
  },
};

export const partsSection = {
  kicker: "Deler og nettbutikk",
  title: "Deler til US-biler, Tesla og bruksbilen",
  lead: "Vi har godt delelager til de fleste amerikanske biler, og skaffer det vi ikke har på lager. Finner du ikke delen her, send oss en forespørsel med merke, modell og årsmodell.",
  brandsPrefix: "Deler til",
  link: { label: "Gå til butikken", to: "/deler" },
  groupLinksLabel: "I butikken",
  groupLinks: [
    { label: "Deler", to: "/deler?gruppe=deler" },
    { label: "Klær og utstyr", to: "/deler?gruppe=klaer" },
  ],
  card: {
    imageLabel: "[Produktbilde]",
    addToCart: "Legg i kurv",
    added: "Lagt i kurv",
    priceSuffix: "kr",
    stockUnknown: "Spør om lagerstatus",
    inStock: "På lager",
    outOfStock: "Ikke på lager",
  },
  storeImage: "/images/butikk/kundemottak-bar-neon",
  storeImageAlt: "Kundemottaket hos GT Maskin med bardisk, neonskilt og hyller med oljer",
  storeImageCaption: "Butikk og kundemottak i Myggveien 3",
  page: {
    kicker: "Butikk",
    title: "Deler, klær og utstyr",
    lead: "Vi har godt delelager til de fleste amerikanske biler, også Tesla, og skaffer det vi ikke har på lager. I butikken står også oljer, kjemi, rustbeskyttelse, klær og capser. Finner du ikke det du leter etter, send oss en forespørsel.",
    groupLabel: "Velg del av butikken",
    groups: {
      deler: {
        lead: "Deler til de fleste US-biler og Tesla. Finner du ikke delen her, send oss en forespørsel med merke, modell og årsmodell.",
        searchLabel: "Søk i deler",
        searchPlaceholder: "Søk etter del, merke eller kategori",
        resultsLabel: "deler",
        noResults: "Ingen treff. Send oss en forespørsel, så finner vi delen.",
        requestCta: { label: "Send forespørsel om del", to: "/kontakt" },
      },
      klaer: {
        lead: "Klær og capser står i hyllene i kundemottaket, blant annet fra Carhartt. Størrelser og utvalg bekreftes når du bestiller.",
        searchLabel: "Søk i klær og utstyr",
        searchPlaceholder: "Søk etter plagg, caps eller merke",
        resultsLabel: "varer",
        noResults: "Ingen treff. Spør oss, så sjekker vi hva vi har inne.",
        requestCta: { label: "Spør om klær og utstyr", to: "/kontakt" },
      },
    },
    gridTitle: "Varer i nettbutikken",
    mockNote:
      "Nettbutikken er en demo. Bestillinger sendes som forespørsel, vi bekrefter pris, lagerstatus og frakt før noe betales.",
    storeKicker: "Butikken i Myggveien",
    storeTitle: "Stikk innom butikken",
    storeText:
      "Oljer, kjemi, rustbeskyttelse, klær og capser står i hyllene i kundemottaket. Det står til tider svært fine biler inne hos oss også.",
    storeBrandsPrefix: "I butikken",
  },
  product: {
    back: "Alle deler",
    backByGroup: { deler: "Alle deler", klaer: "Alt i klær og utstyr" },
    addToCart: "Legg i kurv",
    request: "Send forespørsel om denne delen",
    requestByGroup: {
      deler: "Send forespørsel om denne delen",
      klaer: "Spør om denne varen",
    },
    fitsLabel: "Passer til",
    skuLabel: "Varenummer",
    stockLabel: "Lager",
    categoryLabel: "Kategori",
    sizeLabel: "Størrelse",
    sizePlaceholder: "[Størrelser bekreftes]",
    sizeChoose: "Velg størrelse",
    sizeRequired: "Velg størrelse først.",
    descriptionFallback: "[Produktbeskrivelse legges inn når produktutvalget er klart]",
    notFound: "Fant ikke denne varen.",
    placeholderTag: "Plassholder",
  },
  checkout: {
    title: "Bestillingsforespørsel",
    lead: "Send oss listen, så bekrefter vi pris, lagerstatus og frakt før noe betales.",
    cartTitle: "Handlekurv",
    empty: "Handlekurven er tom.",
    emptyCta: { label: "Gå til butikken", to: "/deler" },
    qty: "Antall",
    size: "Str.",
    remove: "Fjern",
    subtotal: "Sum (foreløpig)",
    validation: "Fyll inn navn og enten telefon eller e-post.",
    subtotalNote: "Priser bekreftes av oss før betaling.",
    submit: "Send bestillingsforespørsel",
    success: "Takk! Vi går gjennom bestillingen og tar kontakt for bekreftelse.",
    clear: "Tøm kurven",
  },
  cart: {
    title: "Handlekurv",
    close: "Lukk handlekurv",
    empty: "Handlekurven er tom.",
    checkout: "Til bestilling",
    continue: "Fortsett å handle",
    items: "varer",
    item: "vare",
  },
};

export const rentalSection = {
  kicker: "Utleie",
  title: "Snøscooter, ATV og henger",
  lead: "Snøscooterutleie gjennom hele scootersesongen, ATV og hengere resten av året. Send en utleieforespørsel, så tar vi kontakt.",
  bookLabel: "Send utleieforespørsel",
  askLabel: "Spør om utleie",
  cardLink: "Les mer og spør om utleie",
  link: { label: "Se all utleie", to: "/utleie" },
  page: {
    kicker: "Utleie",
    title: "Snøscooter, ATV og henger",
    lead: "Vi driver med utleie av snøscootere, ATV, tilhenger og biltransporthenger. Snøscooterutleie gjennom hele scootersesongen. Send en forespørsel med datoer, så bekrefter vi pris og tilgjengelighet.",
    heroImage: "/images/utleie/snoscootere-oppstilt",
    heroAlt: "Snøscootere oppstilt i snøen foran en henger",
    shortcutsLabel: "Snarveier",
    priceNote: "Priser og vilkår er ikke lagt inn ennå og bekreftes når du sender forespørsel.",
  },
  request: {
    id: "utleieforesporsel",
    kicker: "Utleieforespørsel",
    heading: "Spør om utleie",
    intro: "Fortell oss hva du vil leie og når, så tar vi kontakt og bekrefter.",
    title: "Send utleieforespørsel",
    lead: "Vi svarer med pris og tilgjengelighet.",
    fields: {
      type: { label: "Hva vil du leie?", placeholder: "Velg type" },
      from: { label: "Fra dato" },
      to: { label: "Til dato" },
      count: { label: "Antall" },
      name: { label: "Navn", placeholder: "Ditt navn" },
      phone: { label: "Telefon", placeholder: "Mobilnummer" },
      email: { label: "E-post", placeholder: "navn@eksempel.no" },
      message: {
        label: "Melding",
        placeholder: "Antall personer, erfaring, henting eller levering, annet vi bør vite",
      },
    },
    submit: "Send forespørsel",
    sending: "Sender …",
    success: "Takk! Vi har mottatt forespørselen og tar kontakt for å bekrefte.",
    validation: "Fyll inn type, datoer, navn og enten telefon eller e-post.",
    validationEmail: "Sjekk e-postadressen.",
    validationDates: "Til-dato kan ikke være før fra-dato.",
  },
};

export const aboutSection = {
  kicker: "Om oss og historien",
  title: "Entusiaster på biler siden 2012",
  paragraphs: [
    "GT Maskin AS ble etablert i Alta i 2012 av Gjermund Thomassen. I dag er vi et godkjent bilverksted og godkjent lærebedrift, med et moderne verksted i Myggveien 3 på Aronneskjosen.",
    "Vi er entusiaster, ikke bare på amerikanske biler, men på alle spesielle biler. Kundemottaket er innbydende og kreativt, og det står til tider svært fine biler inne hos oss. Trenger du hjelp til noe, er det bare å ta kontakt.",
  ],
  facts: [
    { value: "2012", label: "GT Maskin AS stiftet" },
    { value: "Alta", label: "Myggveien 3, Aronneskjosen" },
    { value: "Godkjent", label: "Bilverksted" },
    { value: "Lærebedrift", label: "Vi tar inn lærlinger" },
  ],
  peopleLabel: "Folkene",
  timelineLabel: "Tidslinje",
  link: { label: "Les mer om oss", to: "/om-oss" },
  image: "/images/butikk/kundemottak-sofa-cabriolet",
  imageAlt: "Kundemottaket hos GT Maskin med bilsofa, cabriolet og hyller",
  page: {
    heroImage: "/images/bygg/fasade-dag-klassikere",
    heroAlt: "Bygget til GT Maskin på dagtid med amerikanske klassikere foran",
    receptionKicker: "Kundemottaket",
    receptionTitle: "Innbydende og kreativt",
    receptionText:
      "Kundemottaket i Myggveien er innbydende og kreativt: bardisk, bilsofa, gammel bensinpumpe og til tider svært fine biler inne på gulvet.",
    quote: {
      text: "Innbydende og kreativt kundemottak. Kan bistå med service og vedlikehold, gode tips og råd!",
      source: "Alta Amcar Klubb",
      sourceUrl: "https://altaamcar.com",
    },
    approvalsKicker: "Godkjenninger",
    approvalsTitle: "Godkjent bilverksted og lærebedrift",
    approvals: [
      {
        icon: "ShieldCheck",
        title: "Godkjent bilverksted",
        text: "GT Maskin AS er godkjent bilverksted og oppført i verkstedregisteret.",
      },
      {
        icon: "GraduationCap",
        title: "Godkjent lærebedrift",
        text: "Vi er godkjent lærebedrift og tar inn lærlinger gjennom opplæringskontoret. Er du interessert i læreplass, ta kontakt.",
      },
    ],
    apprenticeCta: { label: "Ta kontakt om læreplass", to: "/kontakt" },
    peopleTitle: "Folkene bak GT Maskin",
    ctaKicker: "Bestill time",
    ctaTitle: "Trenger du hjelp til noe?",
    ctaText: "Da er det bare å ta kontakt med oss.",
    cta: { label: "Bestill verkstedtime", to: "/bestill" },
    portraitLabel: "[Portrett]",
  },
};

export const workshopPage = {
  kicker: "Verksted",
  title: "Bilverksted i Alta for amerikanske og spesielle biler",
  lead: "Godkjent bilverksted i Myggveien 3. Service, feilsøking, reparasjon og custom-prosjekter. Amerikanske biler er spesialiteten, men vi tar de fleste merker.",
  heroImage: "/images/hero/verksted-hero-klassiker",
  heroAlt: "Amerikansk klassiker fotografert i sort-hvitt fra lav vinkel",
  processKicker: "Slik jobber vi",
  processTitle: "Enkelt fra første kontakt",
  process: [
    { step: "1", title: "Ta kontakt", text: "Ring, send skjema eller stikk innom." },
    { step: "2", title: "Vi ser på bilen", text: "Du får beskjed om hva som må gjøres." },
    { step: "3", title: "Vi gjør jobben", text: "Og sier fra når bilen er klar." },
  ],
  approvalsKicker: "Godkjent",
  approvalsTitle: "Godkjent bilverksted og lærebedrift",
  approvalsText:
    "GT Maskin AS er godkjent bilverksted og godkjent lærebedrift. Vi tar inn lærlinger gjennom opplæringskontoret.",
  galleryKicker: "Fra verkstedet",
  galleryTitle: "Litt av det som har vært innom",
  ctaKicker: "Bestill time",
  ctaTitle: "Klar for å få bilen inn?",
  ctaText: "Fortell oss litt om bilen og hva du trenger hjelp til, så tar vi kontakt.",
  cta: { label: "Bestill verkstedtime", to: "/bestill" },
};

export const bookingForm = {
  title: "Bestill time eller send en forespørsel",
  lead: "Fortell oss litt om bilen og hva du trenger hjelp til.",
  fields: {
    name: { label: "Navn", placeholder: "Ditt navn" },
    phone: { label: "Telefon", placeholder: "Mobilnummer" },
    email: { label: "E-post", placeholder: "navn@eksempel.no" },
    car: { label: "Bil (merke / modell / reg.nr.)", placeholder: "F.eks. Chevrolet Camaro 1969" },
    date: { label: "Ønsket uke eller dato", placeholder: "Fritekst" },
    message: {
      label: "Hva trenger du hjelp til?",
      placeholder: "Service, feilsøking, deler, custom-prosjekt, utleie …",
    },
  },
  submit: "Send forespørsel",
  sending: "Sender …",
  success: "Takk! Vi har mottatt forespørselen din og tar kontakt.",
  error: "Noe gikk galt. Ring oss på +47 911 14 628 eller send e-post til gtm-as@online.no.",
  validation: "Fyll inn navn, melding og enten telefon eller e-post.",
  validationEmail: "Sjekk e-postadressen.",
  aside: "Du kan også ringe eller sende e-post direkte.",
  page: {
    kicker: "Bestill verkstedtime",
    title: "Bestill time eller send en forespørsel",
    lead: "Fortell oss litt om bilen og hva du trenger hjelp til. Vi tar kontakt og bekrefter time.",
  },
};

export const contactPage = {
  kicker: "Kontakt og bestilling",
  title: "Ta kontakt, vi hjelper deg",
  lead: "Ring, send e-post eller bruk skjemaet. Du er også velkommen innom i Myggveien 3.",
  heroImage: "/images/hero/fasade-kveld-skilt",
  heroAlt: "Fasaden til GT Maskin i kveldslys med skilt og klassikere i vinduene",
  addressLabel: "Besøksadresse",
  hoursLabel: "Åpningstider",
  phoneLabel: "Telefon",
  emailLabel: "E-post",
  mapsCta: "Åpne i Google Maps",
  channelsLabel: "Messenger og sosiale medier",
  formTitle: "Send oss en melding",
  formLead: "Fortell oss hva du trenger hjelp til, så tar vi kontakt.",
  productRequestPrefix: "Forespørsel om del:",
  carRequestPrefix: "Spørsmål om bil:",
};

export const checkoutPage = {
  fields: {
    name: { label: "Navn", placeholder: "Ditt navn" },
    phone: { label: "Telefon", placeholder: "Mobilnummer" },
    email: { label: "E-post", placeholder: "navn@eksempel.no" },
    address: { label: "Leveringsadresse", placeholder: "Gate, postnummer og sted" },
    message: { label: "Melding", placeholder: "Bil, årsmodell eller annet vi bør vite" },
  },
};

export const notFoundPage = {
  kicker: "404",
  title: "Siden finnes ikke",
  text: "Lenken kan være gammel. Gå til forsiden eller ta kontakt med oss.",
  home: { label: "Til forsiden", to: "/" },
  contact: { label: "Kontakt oss", to: "/kontakt" },
};

export const privacyPage = {
  kicker: "Personvern",
  title: "Personvern",
  updated: "Sist oppdatert: oktober 2026",
  sections: [
    {
      title: "Ingen sporing, ingen informasjonskapsler",
      text: "Denne nettsiden bruker ingen sporing og setter ingen informasjonskapsler (cookies). Vi samler ikke inn statistikk om hvem som besøker siden.",
    },
    {
      title: "Skjemaer",
      text: "Skjemaene på siden sender kun det du selv fyller inn, til GT Maskin AS. Opplysningene brukes bare til å svare på henvendelsen din, og deles ikke med andre.",
    },
    {
      title: "Handlekurv",
      text: "Handlekurven lagres midlertidig i nettleseren din mens du er på siden, og slettes når du lukker fanen. Ingenting sendes før du selv velger å sende en bestillingsforespørsel.",
    },
    {
      title: "Eksterne lenker",
      text: "Lenker til Facebook, Messenger, Snapchat og Google Maps åpner tjenestene deres i nye faner. Der gjelder de respektive tjenestenes personvernregler. Innebygde videoer fra Facebook og YouTube og Snapchat-profilen lastes først når du selv klikker på avspilling eller «Vis Snapchat-profilen», og først da sendes det data til disse tjenestene.",
    },
    {
      title: "Kontakt",
      text: "Har du spørsmål om personvern, send e-post til gtm-as@online.no.",
    },
  ],
};

export const footer = {
  columns: [
    {
      title: "Tjenester",
      links: [
        { label: "Verksted og reparasjon", to: "/verksted" },
        { label: "Custom og speedshop", to: "/verksted#custom" },
        { label: "Butikk", to: "/deler" },
        { label: "Biler til salgs", to: "/biler-til-salgs" },
      ],
    },
    {
      title: "Utleie",
      links: [
        { label: "Snøscooter", to: "/utleie#scooter-60" },
        { label: "ATV og henger", to: "/utleie#atv" },
        { label: "Utleieforespørsel", to: "/utleie#utleieforesporsel" },
      ],
    },
    {
      title: "Mer",
      links: [
        { label: "Video", to: "/video" },
        { label: "Om oss", to: "/om-oss" },
        { label: "Kontakt", to: "/kontakt" },
      ],
    },
  ],
  followTitle: "Følg oss",
  copyright: "Alle rettigheter reservert.",
  privacy: { label: "Personvern", to: "/personvern" },
  credit: { prefix: "Levert av", name: "KOVISION" },
  orgPrefix: "Org.nr.",
  phonePrefix: "Tlf.",
  reviewsKicker: "Anmeldelser",
};

export const socialLinks = {
  facebook: "Facebook",
  messenger: "Send melding på Messenger",
  snapchat: "Følg oss på Snapchat",
  snapchatOpen: "Åpne i Snapchat",
  snapchatQr: "Skann QR-koden i Snapchat",
  follow: "Følg oss",
  heroFollow: "Følg verkstedet på Facebook og Snapchat",
  facebookAria: "GT Maskin på Facebook",
  snapchatAria: "GT Maskin på Snapchat",
  qrDialogTitle: "Skann for å følge oss på Snapchat",
  qrDialogClose: "Lukk",
};

export const snapchatSection = {
  kicker: "Snapchat",
  title: "GT Maskin på Snapchat",
  lead: "Korte videoer fra verkstedet. Følg oss for mer.",
  follow: "Følg",
  seeSnaps: "Se snapene",
  loadNote: "Lastes fra Snapchat når du trykker.",
  qrHint: "Skann med Snapchat-kameraet",
  embedTitle: "GT Maskin på Snapchat",
  // Lokalt stående bilde i telefonrammen før klikk (gul Camaro, bil2.jpg).
  posterImage: "/images/biler/camaro-gul-front",
};

export const placeholderLabels = {
  image: "[Bilde]",
  video: "[Video]",
  portrait: "[Portrett]",
  fill: "Fylles inn",
};

export const draftBanner = {
  label: "Utkast",
  text: "Utkast laget av KOVISION for GT Maskin. Tekst i [klammer] fylles inn sammen med dere.",
  close: "Lukk meldingen",
};
