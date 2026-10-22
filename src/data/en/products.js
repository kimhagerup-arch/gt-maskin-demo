// Products, English. Same shape, slugs, part numbers, prices and fits as nb/products.js;
// only titles, placeholder brand and placeholder price differ. Real products added to
// nb/products.js get their English title here (by slug); untranslated titles fall
// back to the Norwegian one.
import { featuredSlugs as nbFeatured, products as nbProducts } from "../nb/products.js";

const titles = {
  "bremseklosser-foran-camaro-67-69": "Front brake pads",
  "bremseskiver-foran-camaro-67-69": "Front brake rotors",
  "oljefilter-camaro-67-69": "Oil filter",
  "tennplugger-camaro-67-69": "Spark plugs, set",
  "vannpumpe-camaro-67-69": "Water pump",
  "lyddemper-camaro-67-69": "Muffler",
  "stotdemper-foran-camaro-67-69": "Front shock absorber",
  "drivstoffpumpe-camaro-67-69": "Fuel pump, mechanical",
  "bremseklosser-foran-silverado-14-18": "Front brake pads",
  "bremseskiver-foran-silverado-14-18": "Front brake rotors",
  "oljefilter-silverado-14-18": "Oil filter",
  "luftfilter-silverado-14-18": "Air filter",
  "kupefilter-silverado-14-18": "Cabin air filter",
  "stotdemper-foran-silverado-14-18": "Front shock absorber",
  "vannpumpe-silverado-14-18": "Water pump",
  "bremseklosser-foran-durango-11-23": "Front brake pads",
  "oljefilter-durango-11-23": "Oil filter",
  "luftfilter-durango-11-23": "Air filter",
  "lyddemper-durango-11-23": "Rear muffler",
  "eksosror-durango-11-23": "Exhaust pipe, center",
  "tennplugger-durango-11-23": "Spark plugs, set",
  "vindusviskere-durango-11-23": "Front wiper blades, pair",
  "bremseklosser-foran-ram-1500-19-24": "Front brake pads",
  "bremseskiver-foran-ram-1500-19-24": "Front brake rotors",
  "oljefilter-ram-1500-19-24": "Oil filter",
  "luftfilter-ram-1500-19-24": "Air filter",
  "kupefilter-ram-1500-19-24": "Cabin air filter",
  "stotdemper-foran-ram-1500-19-24": "Front shock absorber",
  "bremseklosser-foran-model-3-17-23": "Front brake pads",
  "kupefilter-model-3-17-23": "Cabin air filter",
  "vindusviskere-model-3-17-23": "Front wiper blades, pair",
  "12v-batteri-model-3-17-23": "12 volt battery",
  "motorolje-helsyntetisk": "Motor oil, full synthetic",
  "motorolje-diesel": "Motor oil, diesel",
  "girolje-automat": "Gear oil, automatic transmission",
  "girolje-severe-gear": "Gear oil, Severe Gear",
  "rustbeskyttelse-spray": "Rust protection, spray",
  "rustbeskyttelse-boks": "Rust protection, can",
  bremserens: "Brake cleaner",
  "wunder-baum": "Wunder-Baum",
  "t-skjorte": "T-shirt",
  caps: "Cap",
  "stetson-caps": "Stetson cap",
  kopp: "Mug",
  nokkelring: "Keychain",
};

export const products = nbProducts.map((p) => ({
  ...p,
  title: titles[p.slug] ?? p.title,
  brand: p.brand === "[Merke]" ? "[Brand]" : p.brand,
  price: p.price === "[PRIS]" ? "[PRICE]" : p.price,
}));

export const featuredSlugs = nbFeatured;
