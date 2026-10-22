// Page text per page and section, American English. Same shape as
// src/data/nb/siteContent.js; scripts/check-i18n.mjs checks that both have the
// same keys. Translated faithfully from Gjermund's own wording, without
// embellishment. Text in [brackets] is a placeholder. Brand names, model names,
// company name and product brands are kept as they are.
// The English text is a translation Gjermund should review before go-live.

export const seo = {
  home: {
    title: "GT Maskin AS, the American car specialist in Alta | Approved auto repair shop",
    description:
      "Approved auto repair shop in Alta specializing in American cars, custom projects and parts. Snowmobile, ATV and trailer rental. Myggveien 3, Alta, Norway.",
  },
  verksted: {
    title: "Auto repair shop in Alta for American cars, custom and classic | GT Maskin AS",
    description:
      "Service, repairs and custom projects for American cars and most other makes. Approved auto repair shop at Myggveien 3, Alta.",
  },
  deler: {
    title: "Shop: parts by vehicle and category, oil, apparel and caps | GT Maskin AS",
    description:
      "Find parts by make, model and year, or by category. Well stocked parts inventory for most American cars, also Tesla. Oils, chemicals, rust protection, apparel and caps.",
  },
  produkt: {
    title: "Part | GT Maskin AS",
    description: "Product page in the GT Maskin AS web shop, Alta, Norway.",
  },
  kasse: {
    title: "Order request | GT Maskin AS",
    description: "Send an order request for parts from GT Maskin AS in Alta.",
  },
  biler: {
    title: "Cars for sale | GT Maskin AS",
    description: "See which cars are in at GT Maskin in Alta right now.",
  },
  video: {
    title: "Video from the shop | GT Maskin AS",
    description:
      "Projects, before and after, and a bit of everyday life at the shop in Myggveien. Video from GT Maskin in Alta.",
  },
  utleie: {
    title: "Snowmobile, ATV and trailer rental in Alta | GT Maskin AS",
    description:
      "Rent a snowmobile, ATV, trailer or car transport trailer in Alta. Snowmobile rental all season long.",
  },
  omOss: {
    title: "About GT Maskin AS, Kustom Speedshop in Alta since 2012",
    description:
      "Enthusiasts for American and special cars. Approved auto repair shop and training company in Alta, established 2012.",
  },
  bestill: {
    title: "Book a shop appointment in Alta | GT Maskin AS",
    description:
      "Send a request for service, repairs or a custom project. We get back to you and confirm the appointment.",
  },
  kontakt: {
    title: "Contact GT Maskin AS in Alta",
    description:
      "Myggveien 3, 9514 Alta, Norway. Monday to Friday, 8:30 AM to 4:00 PM. Call +47 911 14 628 or send a request.",
  },
  personvern: {
    title: "Privacy | GT Maskin AS",
    description: "Privacy policy for the GT Maskin AS website.",
  },
  notFound: {
    title: "Page not found | GT Maskin AS",
    description: "The link may be old. Go to the front page or get in touch with us.",
  },
};

export const nav = {
  items: [
    { label: "Shop floor", to: "/verksted" },
    { label: "Store", to: "/deler" },
    { label: "Video", to: "/video" },
    { label: "Rental", to: "/utleie" },
    { label: "About us", to: "/om-oss" },
    { label: "Contact", to: "/kontakt" },
  ],
  cta: { label: "Book a time", to: "/bestill" },
  mobileCall: "Call",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  cartLabel: "Cart",
};

export const hero = {
  kicker: "Approved auto repair shop · Alta, Norway",
  kickerMobile: "Approved auto repair shop · Alta",
  title: ["The specialist in", "American", "cars in Alta"],
  lead: "We are car enthusiasts, not just American cars, but all special cars. Modern shop, well stocked parts inventory and long experience. From old vintage cars to new daily drivers.",
  primary: { label: "Book a shop appointment", to: "/bestill" },
  secondary: { label: "See what we do", to: "/verksted" },
  badge: {
    script: "Kustom",
    main: "Speedshop",
    place: "Alta",
    text: "American cars, custom projects and parts.",
  },
  neonLine: 1,
  slideshowLabel: "Cars at GT Maskin",
  slideshowDots: "Choose image",
  slideshowGoTo: "Show image",
  slideshowOf: "of",
};

export const trust = [
  { icon: "ShieldCheck", label: "Approved auto repair shop" },
  { icon: "Car", label: "American car specialists" },
  { icon: "Package", label: "Parts for American cars and Tesla" },
  { icon: "GraduationCap", label: "Approved training company" },
  { icon: "Snowflake", label: "Snowmobile rental all season" },
];

export const feedSection = {
  kicker: "Latest from Facebook",
  title: "Live from GT Maskin",
  cta: { label: "Follow us on Facebook" },
  placeholderTag: "Placeholder",
  exampleTag: "Example",
  placeholderCaption: "[Post text is pulled automatically from the Facebook page]",
  dateFallback: "[date]",
  followersSuffix: "like the page",
  checkinsSuffix: "have been here",
  verifiedPrefix: "Facebook numbers as of",
  openPost: "Open the post on Facebook",
  readMore: "Read more on Facebook",
  moreImages: "More images",
  listLabel: "Posts from Facebook",
};

export const servicesSection = {
  kicker: "What we do",
  title: "Shop floor, parts and projects",
  readMore: "Read more",
  listLabel: "What we do",
};

export const sliderLabels = {
  goTo: "Go to card",
  of: "of",
  dotsLabel: "Choose card",
};

export const videoSection = {
  kicker: "Video",
  title: "GT Maskin on film",
  play: "Play video",
  loading: "Loading video",
  posterKicker: "Video",
  placeholderTag: "Placeholder",
  playlistLabel: "Playlist",
  nowPlaying: "Now playing",
  prev: "Previous videos",
  next: "Next videos",
  allVideos: { label: "See all videos", to: "/video" },
  seeOnSnapchat: "See on Snapchat",
  seeOnFacebook: "See on Facebook",
  page: {
    kicker: "Video",
    title: "GT Maskin on film",
    lead: "Projects, before and after, and a bit of everyday life at the shop in Myggveien.",
    heroImage: "/images/bygg/fasade-dag-bilpark",
    heroAlt: "The GT Maskin building in daylight with many cars out front",
    featuredTitle: "Latest video",
    gridTitle: "All videos",
    moreKicker: "More from us",
    moreTitle: "Follow GT Maskin",
    moreText: "Follow us on Facebook for the latest from the shop.",
    moreFacebook: "More on Facebook",
    moreSnapchat: "Follow us on Snapchat",
    snapchatQrHint: "Scan the QR code in Snapchat",
  },
};

export const carsSection = {
  kicker: "Cars for sale",
  title: "In with us right now",
  link: { label: "See all cars", to: "/biler-til-salgs" },
  empty: {
    title: "No cars up for sale right now.",
    text: "Looking for something special? Get in touch, we know what is on the way in.",
    cta: { label: "Tell us what you are looking for", to: "/biler-til-salgs#vi-skaffer" },
  },
  card: {
    imageLabel: "[Image of car]",
    sold: "Sold",
    ask: "Ask about the car",
    details: "See the car",
    exampleTag: "Placeholder",
  },
  page: {
    kicker: "Cars for sale",
    title: "Cars for sale at GT Maskin",
    lead: "At times we have very fine cars standing in the store and reception. This is where we post what is for sale. If you do not find what you are looking for, get in touch, we know what is on the way in.",
    heroImage: "/images/hero/fasade-vinter-klassikere",
    heroAlt: "Two American classics in front of the GT Maskin building in winter",
    nowKicker: "In now",
    nowTitle: "In with us now",
    soldKicker: "Sold",
    soldTitle: "Sold cars",
    examplesKicker: "How the cars are presented",
    examplesTitle: "This is how it looks when the cars arrive",
    examplesText:
      "Cars are posted here with photos, model year, mileage, engine and price. The cards below are examples, not cars for sale.",
  },
  wanted: {
    id: "vi-skaffer",
    kicker: "We source it",
    title: "Looking for something special? We source it",
    lead: "Tell us what you are looking for and we get back to you. We know what is on the way in.",
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      phone: { label: "Phone", placeholder: "Mobile number" },
      email: { label: "Email", placeholder: "name@example.com" },
      model: { label: "Make and model", placeholder: "E.g. Chevrolet Camaro" },
      yearFrom: { label: "Model year from", placeholder: "E.g. 1967" },
      yearTo: { label: "Model year to", placeholder: "E.g. 1972" },
      budget: { label: "Budget (optional)", placeholder: "Roughly, in NOK" },
      wishes: { label: "Other wishes", placeholder: "Color, engine, condition, equipment …" },
    },
    submit: "Send the request",
    sending: "Sending …",
    success: "Thanks! We have received your request and will get back to you.",
    validation: "Fill in name, make and model, and either phone or email.",
    validationEmail: "Check the email address.",
    validationYears: "Model year to cannot be before model year from.",
  },
  detail: {
    back: "All cars",
    specs: { year: "Model year", km: "Mileage", engine: "Engine", price: "Price" },
    descriptionTitle: "About the car",
    descriptionFallback: "[Description of the car is added together with the photos]",
    ask: "Ask about the car",
    callPrefix: "Or call",
    gallery: {
      label: "Photo gallery",
      prev: "Previous photo",
      next: "Next photo",
      goTo: "Show photo",
      of: "of",
    },
    notFound: "Could not find this car.",
    exampleNote: "This is an example of how a car is presented. The car is not for sale.",
  },
};

export const partsSection = {
  kicker: "Parts and web shop",
  title: "Parts for American cars, Tesla and the daily driver",
  lead: "We have a well stocked parts inventory for most American cars, and we source what we do not have in stock. If you do not find the part here, send us a request with make, model and model year.",
  brandsPrefix: "Parts for",
  link: { label: "Go to the store", to: "/deler" },
  groupLinksLabel: "In the store",
  groupLinks: [
    { label: "Parts by vehicle", to: "/deler/bil" },
    { label: "All categories", to: "/deler/kategori" },
    { label: "Oil, chemicals and accessories", to: "/deler/kategori/olje-kjemi-og-tilbehor" },
    { label: "Apparel and gear", to: "/deler/kategori/klaer-og-utstyr" },
  ],
  card: {
    imageLabel: "[Product image]",
    addToCart: "Add to cart",
    added: "Added to cart",
    stockUnknown: "Ask about stock",
    inStock: "In stock",
    outOfStock: "Out of stock",
    exampleTag: "Example",
    fitsMyCar: "Fits your car",
    fitsAll: "Fits all cars",
  },
  storeImage: "/images/butikk/kundemottak-bar-neon",
  storeImageAlt: "The GT Maskin reception with bar counter, neon sign and shelves of oil",
  storeImageCaption: "Store and reception at Myggveien 3",
  page: {
    kicker: "Store",
    title: "Parts, apparel and gear",
    lead: "We have a well stocked parts inventory for most American cars, also Tesla, and we source what we do not have in stock. The store also carries oils, chemicals, rust protection, apparel and caps. If you do not find what you are looking for, send us a request.",
    storeVideo: "/video/hero.mp4",
    storeVideoPoster: "/images/hero/butikk-hero-poster",
    storeVideoAlt: "The GT Maskin store: moped, old cash register and clothing rack",
    storeVideoPlay: "Play video from the store",
    mockNote:
      "The web shop is a demo. Orders are sent as requests; we confirm price, stock and shipping before anything is paid.",
    storeKicker: "The store in Myggveien",
    storeTitle: "Stop by the store",
    storeBrandsPrefix: "In the store",
  },
  catalog: {
    searchLabel: "Search the store",
    searchPlaceholder: "Search by vehicle, part or part number",
    searchHint: "E.g. “2017 durango exhaust” or “brake pads camaro”",
    searchButton: "Search",
    searchClear: "Clear search",
    suggestionsLabel: "Suggestions",
    suggestionGroups: { vehicles: "Vehicles", categories: "Categories", products: "Products" },
    suggestionAllResults: "Show all results for",
    tabsLabel: "Ways into the store",
    tabs: {
      bil: "Parts by vehicle",
      kategori: "All categories",
      olje: "Oil, chemicals and accessories",
      klaer: "Apparel and gear",
    },
    treeLabel: "Catalog",
    breadcrumbsLabel: "You are here",
    shopCrumb: "Store",
    back: "Back",
    expand: "Show",
    collapse: "Hide",
    chooseBrand: "Choose make",
    chooseModel: "Choose model",
    chooseYear: "Choose model year",
    chooseCategory: "Choose category",
    chooseType: "Choose part type",
    brandsWithLogo: "Makes",
    allBrands: "All makes",
    letterBarLabel: "Jump to letter",
    otherVehicleHint: "Vehicle not in the list? Send a request and we find the part.",
    fitsAllGroup: "Fits all cars",
    partsFor: "Parts for",
    narrowModel: "Choose a model to see only what fits.",
    narrowYear: "Choose a model year to see only what fits.",
    pickBrandIntro: "Choose a make in the list, or search at the top.",
    pickBrandIntroMobile: "Choose make, then model and model year.",
    allCategoriesTitle: "All categories",
    allCategoriesIntro:
      "Choose category and part type. To see only what fits your car, use “Parts by vehicle”.",
    categoryEmpty: "No products in this category yet.",
    countSuffix: { one: "product", many: "products" },
    resultsFor: "Results for",
    resultsVehicle: "Vehicle found in the search:",
    showVehicleParts: "Show all parts for",
    useAsMyCar: "Use as My car",
    noResultsTitle: "No results.",
    noResultsText: "We source most things. Send us the search and we find the part.",
    sortLabel: "Sort by",
    sort: {
      relevans: "Relevance",
      "pris-lav": "Price, low to high",
      "pris-hoy": "Price, high to low",
    },
    showMore: "Show more",
    shownOf: "of",
    list: {
      brandLabel: "Brand",
      skuLabel: "Part no.",
      fitsLabel: "Fits",
      stockLabel: "Stock",
      priceLabel: "Price",
      addToCart: "Add to cart",
      added: "Added to cart",
      chooseSize: "Choose size",
      open: "Open the product",
    },
    source: {
      title: "Did not find the part? We source it",
      text: "Send us a request with vehicle and part type, and we check stock and delivery time.",
      cta: "Send a request",
      ctaSearch: "Send the search as a request",
    },
    myCar: {
      label: "My car",
      change: "Change",
      remove: "Remove",
      removeAria: "Remove My car",
      saved: "Saved as My car",
      hint: "Choose make, model and model year, and we remember the car and show what fits.",
    },
    regNr: { label: "License plate", placeholder: "AB 12345", hint: "Coming later" },
  },
  product: {
    back: "Store",
    addToCart: "Add to cart",
    request: "Ask about this part",
    requestClothes: "Ask about this product",
    fitsLabel: "Fits",
    fitsAll: "Fits all cars",
    fitsMyCar: "Fits your car",
    fitsNotMyCar: "Check that it fits, ask us",
    fitsNoCar: "Choose your car in the store and we check whether the part fits.",
    moreInType: "More of the same part type",
    typeLabel: "Part type",
    skuLabel: "Part number",
    stockLabel: "Stock",
    categoryLabel: "Category",
    sizeLabel: "Size",
    sizePlaceholder: "[Sizes to be confirmed]",
    sizeChoose: "Choose size",
    sizeRequired: "Choose a size first.",
    descriptionFallback: "[Product description is added when the product range is ready]",
    notFound: "Could not find this product.",
    placeholderTag: "Placeholder",
  },
  checkout: {
    title: "Order request",
    lead: "Send us the list, and we confirm price, stock and shipping before anything is paid.",
    cartTitle: "Cart",
    empty: "The cart is empty.",
    emptyCta: { label: "Go to the store", to: "/deler" },
    qty: "Quantity",
    size: "Size",
    remove: "Remove",
    subtotal: "Total (preliminary)",
    validation: "Fill in name and either phone or email.",
    subtotalNote: "Prices are confirmed by us before payment.",
    submit: "Send order request",
    success: "Thanks! We go through the order and get back to you to confirm.",
    clear: "Empty the cart",
  },
  cart: {
    title: "Cart",
    close: "Close cart",
    empty: "The cart is empty.",
    checkout: "To order",
    continue: "Continue shopping",
    items: "items",
    item: "item",
  },
};

export const rentalSection = {
  kicker: "Rental",
  title: "Snowmobile, ATV and trailer",
  lead: "Snowmobile rental all season long, ATV and trailers the rest of the year. Send a rental request and we get back to you.",
  bookLabel: "Send rental request",
  askLabel: "Ask about rental",
  cardLink: "Read more and ask about rental",
  link: { label: "See all rentals", to: "/utleie" },
  page: {
    kicker: "Rental",
    title: "Snowmobile, ATV and trailer",
    lead: "We rent out snowmobiles, ATVs, trailers and car transport trailers. Snowmobile rental all season long. Send a request with dates, and we confirm price and availability.",
    heroImage: "/images/utleie/snoscootere-oppstilt",
    heroAlt: "Snowmobiles lined up in the snow in front of a trailer",
    shortcutsLabel: "Shortcuts",
    priceNote: "Prices and terms are not entered yet and are confirmed when you send a request.",
  },
  request: {
    id: "utleieforesporsel",
    kicker: "Rental request",
    heading: "Ask about rental",
    intro: "Tell us what you want to rent and when, and we get back to you and confirm.",
    title: "Send rental request",
    fields: {
      type: { label: "What do you want to rent?", placeholder: "Choose type" },
      from: { label: "From date" },
      to: { label: "To date" },
      count: { label: "Quantity" },
      name: { label: "Name", placeholder: "Your name" },
      phone: { label: "Phone", placeholder: "Mobile number" },
      email: { label: "Email", placeholder: "name@example.com" },
      message: {
        label: "Message",
        placeholder:
          "Number of people, experience, pickup or delivery, anything else we should know",
      },
    },
    submit: "Send request",
    sending: "Sending …",
    success: "Thanks! We have received the request and will get back to you to confirm.",
    validation: "Fill in type, dates, name and either phone or email.",
    validationEmail: "Check the email address.",
    validationDates: "The to date cannot be before the from date.",
  },
};

export const aboutSection = {
  kicker: "About us and our history",
  title: "Car enthusiasts since 2012",
  paragraphs: [
    "GT Maskin AS was established in Alta in 2012 by Gjermund Thomassen. Today we are an approved auto repair shop and an approved training company, with a modern shop at Myggveien 3 in Aronneskjosen.",
    "We are enthusiasts, not just for American cars, but for all special cars. We take care of your car, old or new, shiny or rusty. At times there are very fine cars standing in the store and reception, so feel free to stop by. If you need help with something, just get in touch.",
  ],
  facts: [
    { value: "2012", label: "GT Maskin AS founded" },
    { value: "Alta", label: "Myggveien 3, Aronneskjosen" },
    { value: "Approved", label: "Auto repair shop" },
    { value: "Training", label: "We take on apprentices" },
  ],
  peopleLabel: "The people",
  timelineLabel: "Timeline",
  link: { label: "Read more about us", to: "/om-oss" },
  image: "/images/butikk/kundemottak-disk-chevrolet",
  imageAlt: "The GT Maskin reception with the counter, the Chevrolet sign and the boards",
  page: {
    heroImage: "/images/bygg/fasade-dag-klassikere",
    heroAlt: "The GT Maskin building in daylight with American classics out front",
    receptionKicker: "The reception",
    receptionTitle: "Feel free to stop by",
    receptionText:
      "At times there are very fine cars standing in the store and reception, so feel free to stop by. If you need help with something, just get in touch.",
    quote: {
      text: "Inviting and creative reception. Can assist with service and maintenance, good tips and advice!",
      source: "Alta Amcar Klubb",
      sourceUrl: "https://altaamcar.com",
    },
    approvalsKicker: "Approvals",
    approvalsTitle: "Approved auto repair shop and training company",
    approvals: [
      {
        icon: "ShieldCheck",
        title: "Approved auto repair shop",
        text: "GT Maskin AS is an approved auto repair shop listed in the Norwegian workshop register.",
      },
      {
        icon: "GraduationCap",
        title: "Approved training company",
        text: "We are an approved training company and take on apprentices through the training office. Interested in an apprenticeship? Get in touch.",
      },
    ],
    apprenticeCta: { label: "Get in touch about an apprenticeship", to: "/kontakt" },
    peopleTitle: "The people behind GT Maskin",
    ctaKicker: "Book a time",
    ctaTitle: "Need help with something?",
    ctaText: "Then just get in touch with us.",
    cta: { label: "Book a shop appointment", to: "/bestill" },
    portraitLabel: "[Portrait]",
  },
};

export const workshopPage = {
  kicker: "Shop floor",
  title: "Auto repair shop in Alta for American and special cars",
  lead: "Approved auto repair shop at Myggveien 3. Service, diagnostics, repairs and custom projects. American cars are the specialty, but we take most makes.",
  heroImage: "/images/hero/verksted-hero-klassiker",
  heroAlt: "American classic photographed in black and white from a low angle",
  pricesKicker: "Prices",
  pricesTitle: "Fixed prices",
  pricesNote: "The prices are from the board in the store (October 21, 2026).",
  processKicker: "How we work",
  processTitle: "Simple from first contact",
  process: [
    { step: "1", title: "Get in touch", text: "Call, send the form or stop by." },
    { step: "2", title: "We look at the car", text: "You get told what needs to be done." },
    { step: "3", title: "We do the job", text: "And let you know when the car is ready." },
  ],
  approvalsKicker: "Approved",
  approvalsTitle: "Approved auto repair shop and training company",
  approvalsText:
    "GT Maskin AS is an approved auto repair shop and an approved training company. We take on apprentices through the training office.",
  galleryKicker: "From the shop",
  galleryTitle: "Some of what has been through",
  ctaKicker: "Book a time",
  ctaTitle: "Ready to bring the car in?",
  ctaText: "Tell us a bit about the car and what you need help with, and we get back to you.",
  cta: { label: "Book a shop appointment", to: "/bestill" },
};

export const bookingForm = {
  title: "Book a time or send a request",
  lead: "Tell us a bit about the car and what you need help with.",
  fields: {
    name: { label: "Name", placeholder: "Your name" },
    phone: { label: "Phone", placeholder: "Mobile number" },
    email: { label: "Email", placeholder: "name@example.com" },
    car: { label: "Car (make / model / plate)", placeholder: "E.g. Chevrolet Camaro 1969" },
    date: { label: "Preferred week or date", placeholder: "Free text" },
    message: {
      label: "What do you need help with?",
      placeholder: "Service, diagnostics, parts, custom project, rental …",
    },
  },
  submit: "Send request",
  sending: "Sending …",
  success: "Thanks! We have received your request and will get back to you.",
  error: "Something went wrong. Call us at +47 911 14 628 or email gtm-as@online.no.",
  validation: "Fill in name, message and either phone or email.",
  validationEmail: "Check the email address.",
  aside: "You can also call or email us directly.",
  page: {
    kicker: "Book a shop appointment",
    title: "Book a time or send a request",
    lead: "Tell us a bit about the car and what you need help with. We get back to you and confirm the appointment.",
  },
};

export const contactPage = {
  kicker: "Contact and booking",
  title: "Get in touch, we help you",
  lead: "Call, email or use the form. You are also welcome to stop by at Myggveien 3.",
  heroImage: "/images/hero/fasade-kveld-skilt",
  heroAlt: "The GT Maskin building at dusk with the sign and classics in the windows",
  addressLabel: "Visiting address",
  hoursLabel: "Opening hours",
  phoneLabel: "Phone",
  emailLabel: "Email",
  mapsCta: "Open in Google Maps",
  channelsLabel: "Messenger and social media",
  formTitle: "Send us a message",
  formLead: "Tell us what you need help with, and we get back to you.",
  productRequestPrefix: "Request for part:",
  carRequestPrefix: "Question about car:",
  vehiclePrefix: "Vehicle:",
};

export const checkoutPage = {
  fields: {
    name: { label: "Name", placeholder: "Your name" },
    phone: { label: "Phone", placeholder: "Mobile number" },
    email: { label: "Email", placeholder: "name@example.com" },
    address: { label: "Delivery address", placeholder: "Street, postal code and city" },
    message: { label: "Message", placeholder: "Car, model year or anything else we should know" },
  },
};

export const notFoundPage = {
  kicker: "404",
  title: "Wrong turn",
  text: "The link may be old. Go to the front page, the store or get in touch with us.",
  home: { label: "To the front page", to: "/" },
  shop: { label: "To the store", to: "/deler" },
  contact: { label: "Contact us", to: "/kontakt" },
  signTop: "Route",
  signBottom: "Not found",
};

export const privacyPage = {
  kicker: "Privacy",
  title: "Privacy",
  updated: "Last updated: October 2026",
  sections: [
    {
      title: "No tracking, no cookies",
      text: "This website uses no tracking and sets no cookies. We do not collect statistics about who visits the site.",
    },
    {
      title: "Forms",
      text: "The forms on the site send only what you fill in yourself, to GT Maskin AS. The information is used only to answer your inquiry, and is not shared with others.",
    },
    {
      title: "Cart",
      text: "The cart is stored temporarily in your browser while you are on the site, and is deleted when you close the tab. Nothing is sent until you choose to send an order request.",
    },
    {
      title: "External links",
      text: "Links to Facebook, Messenger, Snapchat and Google Maps open those services in new tabs. Their respective privacy rules apply there. Embedded videos from Facebook and YouTube and the Snapchat profile are loaded only when you click play or “Show the Snapchat profile”, and only then is data sent to those services.",
    },
    {
      title: "Contact",
      text: "If you have questions about privacy, email gtm-as@online.no.",
    },
  ],
};

export const footer = {
  columns: [
    {
      title: "Services",
      links: [
        { label: "Shop floor and repairs", to: "/verksted" },
        { label: "Custom and speedshop", to: "/verksted#custom" },
        { label: "Store", to: "/deler" },
        { label: "Cars for sale", to: "/biler-til-salgs" },
      ],
    },
    {
      title: "Rental",
      links: [
        { label: "Snowmobile", to: "/utleie#scooter-60" },
        { label: "ATV and trailer", to: "/utleie#atv" },
        { label: "Rental request", to: "/utleie#utleieforesporsel" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "Video", to: "/video" },
        { label: "About us", to: "/om-oss" },
        { label: "Contact", to: "/kontakt" },
      ],
    },
  ],
  followTitle: "Follow us",
  copyright: "All rights reserved.",
  privacy: { label: "Privacy", to: "/personvern" },
  credit: { prefix: "Built by", name: "KOVISION" },
  orgPrefix: "Org. no.",
  phonePrefix: "Phone",
  reviewsKicker: "Reviews",
};

export const socialLinks = {
  facebook: "Facebook",
  messenger: "Message us on Messenger",
  snapchat: "Follow us on Snapchat",
  snapchatOpen: "Open in Snapchat",
  snapchatQr: "Scan the QR code in Snapchat",
  follow: "Follow us",
  heroFollow: "Follow the shop on Facebook and Snapchat",
  facebookAria: "GT Maskin on Facebook",
  snapchatAria: "GT Maskin on Snapchat",
  qrDialogTitle: "Scan to follow us on Snapchat",
  qrDialogClose: "Close",
};

export const snapchatSection = {
  kicker: "Snapchat",
  title: "GT Maskin on Snapchat",
  cardTitle: "GT Maskin on Snapchat",
  open: "Open in Snapchat",
  seeStories: "See the stories here",
  loading: "Loading the stories from Snapchat",
  timeoutText: "Snapchat is not responding right now.",
  qrHint: "Scan with the Snapchat camera",
  embedTitle: "GT Maskin on Snapchat",
};

export const installApp = {
  label: "Add GT Maskin to your home screen",
  boxTitle: "Add GT Maskin to your home screen",
  boxText: "Open the site as an app, straight from your phone.",
  add: "Add",
  notNow: "Not now",
  iosTitle: "Add to Home Screen",
  iosSteps: [
    "Tap the Share button at the bottom of Safari.",
    "Choose Add to Home Screen.",
    "Tap Add. GT Maskin gets its own icon and opens full screen.",
  ],
  close: "Close",
};

export const placeholderLabels = {
  image: "[Image]",
  video: "[Video]",
  portrait: "[Portrait]",
  fill: "To be filled in",
};

export const draftBanner = {
  label: "Draft",
  text: "Draft made by KOVISION for GT Maskin. Text in [brackets] is filled in together with you.",
  close: "Close the message",
};

/** Screen reader text and small words that used to live in the components. */
export const a11y = {
  skipToContent: "Skip to content",
  mainMenu: "Main menu",
  quickLinks: "Quick links",
  trustStrip: "GT Maskin in brief",
  shortcuts: "Shortcuts",
  honeypot: "Website",
  slideshowRole: "slideshow",
  galleryRole: "gallery",
  fewer: "Fewer",
  more: "More",
  item: "item",
  items: "items",
  examplePrefix: "Example:",
  skuPlaceholder: "[part number]",
  pricePlaceholder: "[PRICE]",
  callPrefix: "Or call",
  emailPrefix: "email",
  callAria: "Call",
};

/** Language switcher. On English pages the switcher shows the Norwegian flag with NO. */
export const language = {
  code: "en",
  name: "English",
  switchTo: { code: "nb", short: "NO", name: "Norsk", aria: "Vis siden på norsk" },
  flagAlt: { us: "US flag", no: "Norwegian flag" },
  stripe: {
    text: "View this site in English",
    cta: "Switch to English",
    close: "Close",
  },
};

/** The header in round 5b: the OPEN sign, the flag band and Vegas mode. */
export const header = {
  flagBandLabel: "Stars and stripes",
  openSign: {
    open: "OPEN",
    closed: "CLOSED",
    ariaOpen: "Open now, closes at {time}",
    ariaClosedToday: "Closed now, opens {day} at {time}",
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    tomorrow: "tomorrow",
    today: "today",
  },
  vegas: { on: "Vegas mode is on", off: "Vegas mode is off" },
};

/** Structured data (JSON-LD) for the shop and the store. Facts from companyFacts. */
export const structuredData = {
  workshopName: "GT Maskin AS",
  workshopDescription:
    "Approved auto repair shop in Alta, Norway, specializing in American cars, custom projects and parts.",
  storeName: "GT Maskin AS, store",
  storeDescription:
    "Parts for American cars and Tesla, oils, chemicals, rust protection, apparel and caps. Store at Myggveien 3, Alta, Norway.",
};
