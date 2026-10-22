# Vareliste fra GT Maskin: format

Delekatalogen på `/deler` er drevet av data. Når varelisten fra kassesystemet til GT Maskin kommer, legges den inn i `src/data/products.js` uten nye komponenter. Dette dokumentet sier hvilke kolonner vi trenger, med ett eksempel per kolonne, og hvordan listen legges inn.

Eksport som regneark (xlsx eller csv) er enklest. Én rad per vare. Kolonneoverskriftene kan hete hva som helst, bare betydningen er klar.

## Kolonner

| Kolonne | Påkrevd | Eksempel | Merknad |
|---|---|---|---|
| Varenummer | ja | `BR-1234` | Nummeret fra kassesystemet. Brukes i søk og som referanse i forespørsler. Må være unikt |
| Navn | ja | `Bremseklosser foran` | Kort navn på varen, slik det skal stå i listen |
| Merke | nei | `Wagner` | Produsent eller varemerke. Tomt felt vises ikke |
| Kategori | ja | `Bremser` | Hovedkategori. Vi bruker kategoriene i `src/data/catalog.js` (Motor, Drivverk og girkasse, Bremser, Understell og styring, Kjøling, Eksos, Elektrisk og tenning, Drivstoff, Karosseri og interiør, Olje, kjemi og tilbehør, Klær og utstyr). Bruker kassesystemet andre navn, lager vi en oversettelsestabell |
| Deltype | ja | `Bremseklosser foran` | Undergruppen i kategorien (se listen i `catalog.js`). Nye deltyper legges til der |
| Pris | nei | `1890` | Kroner inkl. mva, uten mellomrom og uten «kr». Tomt felt gir «[PRIS]» til prisen er klar |
| Lager | nei | `4` | Antall på lager. `0` gir «Ikke på lager», tomt felt gir «Spør om lagerstatus» |
| Bilde | nei | `bremseklosser-foran-camaro.jpg` | Filnavn på bilde som sendes sammen med listen. Uten bilde vises ikonet til kategorien |
| Passer til | nei | `Chevrolet Camaro 1967-1969; Chevrolet Nova 1968-1972` | Merke, modell og årsintervall per bil, skilt med semikolon. Skriv `Alle` for varer som passer alle biler (olje, kjemi, klær) |
| Beskrivelse | nei | `Keramiske klosser, sett for begge sider.` | Kort tekst til produktsiden |
| Størrelser | nei | `S, M, L, XL` | Bare klær |

## Slik legges listen inn

1. Regnearket leses rad for rad. For hver rad lages et objekt i `products` i `src/data/products.js` slik:

```js
{
  slug: "bremseklosser-foran-br-1234",      // lages av navn og varenummer, små bokstaver og bindestrek
  brand: "Wagner",
  title: "Bremseklosser foran",
  category: "bremser",                       // slug fra catalog.js
  type: "bremseklosser-foran",               // slug fra catalog.js
  price: "1890",
  sku: "BR-1234",
  stock: 4,                                  // null når lager er tomt felt
  image: "/images/produkter/bremseklosser-foran-br-1234",   // null uten bilde
  description: "Keramiske klosser, sett for begge sider.",
  fits: [
    { brand: "chevrolet", model: "camaro", from: 1967, to: 1969 },
    { brand: "chevrolet", model: "nova", from: 1968, to: 1972 },
  ],
  universal: false,                          // true når «Passer til» er «Alle»
  sizes: null,                               // ["S", "M", "L", "XL"] for klær
  placeholder: false,
}
```

2. `brand` og `model` i `fits` er slugs fra `src/data/vehicles.js`. Står en bil i listen som ikke finnes der, legges merket eller modellen til i `vehicles.js` først (merke, modell, produksjonsår fra og til).
3. Bilder legges i `assets-raw/` og kjøres gjennom `npm run images` (`scripts/prepare-images.mjs`, mappe `produkter`), som lager webp og jpg i flere bredder og skriver nøkkelen inn i `src/data/imageManifest.js`.
4. Eksempelvarene (varenummer `EKS-1001` og videre, `placeholder: true`) slettes når de ekte varene er inne.
5. `npm run build` og `npm run lint` kjøres. Søk, treet og «Min bil» leser den nye listen automatisk.

Listen kan også leses inn med et lite script som gjør om regnearket til objektene over. Det lages når vi vet hvilket format kassesystemet eksporterer.

## Avklaringer med Gjermund

- Hvilke merker og modeller de har mest deler til, så bilvelgeren prioriterer riktig.
- Kategoriene i kassesystemet, så oversettelsen til katalogens kategorier blir riktig.
- Om kassesystemet kan eksportere varelisten (format, hvor ofte), og om lagertall skal vises.
