// Kjøretøy i bilvelgeren: merke › modell › produksjonsår fra og til.
// De seks merkene med logo er de samme som på skiltveggen (brands.js, parts). De
// andre er vanlige amerikanske merker uten logo, siden FAKTA.md sier godt
// delelager til de fleste amerikanske biler. Modellene er de vanligste per merke,
// med grove produksjonsintervaller (samme modellnavn over flere generasjoner er
// slått sammen). Hvilke merker og modeller GT Maskin har mest deler til, avklares
// med Gjermund (STATUS.md), og listen justeres da.
//
// to: null betyr at modellen fortsatt produseres. Årsmodellene i velgeren går da
// til og med inneværende år.
//
// Bilvelgeren er laget så et felt for registreringsnummer kan legges foran merke
// og modell senere uten ny layout (se partsSection.catalog.regNr i siteContent.js).

const current = new Date().getFullYear();

const brand = (slug, name, logo, models) => ({
  slug,
  name,
  logo,
  models: models.map(([mslug, mname, from, to]) => ({
    slug: mslug,
    name: mname,
    from,
    to: to ?? null,
  })),
});

export const vehicles = [
  brand("chevrolet", "Chevrolet", "/images/merker/chevrolet.svg", [
    ["bel-air", "Bel Air", 1950, 1975],
    ["blazer", "Blazer", 1969, null],
    ["camaro", "Camaro", 1967, 2024],
    ["chevelle", "Chevelle", 1964, 1977],
    ["colorado", "Colorado", 2004, null],
    ["corvette", "Corvette", 1953, null],
    ["el-camino", "El Camino", 1959, 1987],
    ["express", "Express", 1996, null],
    ["impala", "Impala", 1958, 2020],
    ["nova", "Nova", 1962, 1979],
    ["silverado", "Silverado", 1999, null],
    ["suburban", "Suburban", 1935, null],
    ["tahoe", "Tahoe", 1995, null],
  ]),
  brand("dodge", "Dodge", "/images/merker/dodge.svg", [
    ["caravan", "Caravan og Grand Caravan", 1984, 2020],
    ["challenger", "Challenger", 1970, 2023],
    ["charger", "Charger", 1966, 2023],
    ["dakota", "Dakota", 1987, 2011],
    ["dart", "Dart", 1960, 2016],
    ["durango", "Durango", 1998, null],
    ["journey", "Journey", 2009, 2020],
    ["magnum", "Magnum", 2005, 2008],
    ["nitro", "Nitro", 2007, 2012],
    ["ram-pickup", "Ram pickup (til 2010)", 1981, 2010],
    ["viper", "Viper", 1992, 2017],
  ]),
  brand("ram", "Ram", "/images/merker/ram.svg", [
    ["1500", "1500", 2011, null],
    ["2500", "2500", 2011, null],
    ["3500", "3500", 2011, null],
    ["promaster", "ProMaster", 2014, null],
  ]),
  brand("ford", "Ford", "/images/merker/ford.svg", [
    ["bronco", "Bronco", 1966, null],
    ["crown-victoria", "Crown Victoria", 1992, 2011],
    ["e-series", "E-serien (Econoline)", 1961, 2014],
    ["edge", "Edge", 2007, null],
    ["escape", "Escape", 2001, null],
    ["expedition", "Expedition", 1997, null],
    ["explorer", "Explorer", 1991, null],
    ["f-150", "F-150", 1975, null],
    ["f-250", "F-250", 1953, null],
    ["f-350", "F-350", 1953, null],
    ["fairlane", "Fairlane", 1955, 1970],
    ["galaxie", "Galaxie", 1959, 1974],
    ["mustang", "Mustang", 1964, null],
    ["ranger", "Ranger", 1983, null],
    ["thunderbird", "Thunderbird", 1955, 2005],
  ]),
  brand("cadillac", "Cadillac", "/images/merker/cadillac.svg", [
    ["ats", "ATS", 2013, 2019],
    ["cts", "CTS", 2003, 2019],
    ["deville", "DeVille", 1959, 2005],
    ["eldorado", "Eldorado", 1953, 2002],
    ["escalade", "Escalade", 1999, null],
    ["seville", "Seville", 1976, 2004],
    ["srx", "SRX", 2004, 2016],
    ["xt5", "XT5", 2017, null],
  ]),
  brand("tesla", "Tesla", "/images/merker/tesla.svg", [
    ["model-3", "Model 3", 2017, null],
    ["model-s", "Model S", 2012, null],
    ["model-x", "Model X", 2015, null],
    ["model-y", "Model Y", 2020, null],
    ["roadster", "Roadster", 2008, 2012],
  ]),
  brand("buick", "Buick", null, [
    ["enclave", "Enclave", 2008, null],
    ["lacrosse", "LaCrosse", 2005, 2019],
    ["regal", "Regal", 1973, 2020],
    ["riviera", "Riviera", 1963, 1999],
    ["skylark", "Skylark", 1953, 1998],
  ]),
  brand("chrysler", "Chrysler", null, [
    ["300", "300", 2005, 2023],
    ["pacifica", "Pacifica", 2017, null],
    ["pt-cruiser", "PT Cruiser", 2001, 2010],
    ["sebring", "Sebring", 1995, 2010],
    ["town-and-country", "Town & Country", 1990, 2016],
    ["voyager", "Voyager", 1988, null],
  ]),
  brand("gmc", "GMC", null, [
    ["acadia", "Acadia", 2007, null],
    ["canyon", "Canyon", 2004, null],
    ["savana", "Savana", 1996, null],
    ["sierra", "Sierra", 1999, null],
    ["yukon", "Yukon", 1992, null],
  ]),
  brand("hummer", "Hummer", null, [
    ["h1", "H1", 1992, 2006],
    ["h2", "H2", 2002, 2009],
    ["h3", "H3", 2005, 2010],
  ]),
  brand("jeep", "Jeep", null, [
    ["cherokee", "Cherokee", 1974, null],
    ["compass", "Compass", 2007, null],
    ["gladiator", "Gladiator", 2020, null],
    ["grand-cherokee", "Grand Cherokee", 1993, null],
    ["renegade", "Renegade", 2015, null],
    ["wrangler", "Wrangler", 1987, null],
  ]),
  brand("lincoln", "Lincoln", null, [
    ["aviator", "Aviator", 2003, null],
    ["continental", "Continental", 1939, 2020],
    ["mkx", "MKX", 2007, 2018],
    ["navigator", "Navigator", 1998, null],
    ["town-car", "Town Car", 1981, 2011],
  ]),
  brand("mercury", "Mercury", null, [
    ["cougar", "Cougar", 1967, 2002],
    ["grand-marquis", "Grand Marquis", 1975, 2011],
  ]),
  brand("oldsmobile", "Oldsmobile", null, [
    ["442", "442", 1964, 1987],
    ["88", "88", 1949, 1999],
    ["cutlass", "Cutlass", 1961, 1999],
    ["toronado", "Toronado", 1966, 1992],
  ]),
  brand("plymouth", "Plymouth", null, [
    ["barracuda", "Barracuda", 1964, 1974],
    ["duster", "Duster", 1970, 1976],
    ["fury", "Fury", 1956, 1989],
    ["road-runner", "Road Runner", 1968, 1980],
  ]),
  brand("pontiac", "Pontiac", null, [
    ["bonneville", "Bonneville", 1957, 2005],
    ["firebird", "Firebird", 1967, 2002],
    ["grand-prix", "Grand Prix", 1962, 2008],
    ["gto", "GTO", 1964, 2006],
  ]),
];

/** Siste valg i merkelisten: går rett til forespørsel. */
export const otherVehicle = { slug: "annet", name: "Annet merke eller modell" };

export function getBrand(slug) {
  return vehicles.find((b) => b.slug === slug) || null;
}

export function getModel(brandSlug, modelSlug) {
  const b = getBrand(brandSlug);
  return b?.models.find((m) => m.slug === modelSlug) || null;
}

/** Siste årsmodell for en modell (inneværende år når den fortsatt produseres). */
export function lastYear(model) {
  return model.to ?? current;
}

/** Årsmodeller gruppert per tiår, nyeste først: [{ label: "1960-tallet", years: [1969, 1968, 1967] }]. */
export function decadesFor(model) {
  const groups = new Map();
  for (let y = lastYear(model); y >= model.from; y--) {
    const decade = Math.floor(y / 10) * 10;
    if (!groups.has(decade)) groups.set(decade, []);
    groups.get(decade).push(y);
  }
  return [...groups.entries()].map(([decade, years]) => ({
    decade,
    label: `${decade}-tallet`,
    years,
  }));
}

export function yearInModel(model, year) {
  return Number.isInteger(year) && year >= model.from && year <= lastYear(model);
}
