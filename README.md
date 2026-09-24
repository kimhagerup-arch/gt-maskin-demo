# GT Maskin AS: demo-nettside

Demo for GT Maskin AS (Kustom Speedshop), bilverksted i Alta. Bygd av KOVISION. Vite + React 18 (SPA), Tailwind CSS 3.4, react-router v6, lucide-react, Biome. Ingen backend, ingen database, ingen miljøvariabler.

Se også `STATUS.md` (hva som er bygget og hva som gjenstår), `BESLUTNINGER.md` (valg og målinger), `BILDELISTE.md` (bilder som mangler) og `docs/`.

## Kjøre

```
npm install
npm run dev        # http://localhost:5173
npm run build      # produksjonsbygg til dist/
npm run preview    # forhåndsvis dist/
npm run lint       # biome check
npm run format     # biome format --write
```

Bildescripts (krever `assets-raw/` med originalbildene, mappen er gitignored):

```
npm run images     # assets-raw/ -> public/images/, skriver src/data/imageManifest.js
npm run favicons   # favicon.ico, icon-192/512.png, apple-touch-icon.png, site.webmanifest
npm run og-image   # public/og-image.jpg (1200x630)
node scripts/check-contrast.mjs   # WCAG-kontrast for paletten
```

Windows ARM64: `sharp` er satt til `^0.34`, som har ferdige binærer for `win32-arm64`. Bruk `npx` foran verktøy, ikke globale installasjoner.

## Hvor ting ligger

| Mappe | Innhold |
|---|---|
| `src/data/` | Alt innhold. `companyFacts.js` (fakta), `siteContent.js` (tekst per side og seksjon), `services.js`, `cars.js`, `products.js`, `rental.js`, `team.js`, `timeline.js`, `socialFeed.js`, `videos.js`, `reviews.js`, `channels.js`, `brands.js`, `imageManifest.js` (skrives av bildescriptet) |
| `src/components/` | Gjenbrukbare komponenter (Header, Footer, PageHero, Picture, Placeholder, SocialFeed, VideoSection, CartDrawer, BookingForm, osv.) |
| `src/pages/` | Én fil per rute, lastes med `React.lazy` |
| `src/context/CartContext.jsx` | Handlekurv (sessionStorage) |
| `src/hooks/` | `useSeoMeta`, `useReveal`, `useReducedMotion` |
| `src/lib/` | `forms.js` (submitForm, klargjort for Resend), `format.js` (pris, dato), `images.js` (oppslag i manifestet) |
| `scripts/` | Bilde-, favicon-, OG- og kontrastscript |
| `public/images/` | Genererte bilder (webp + jpg, 1920 og 800 px) |
| `_kilder/` | Kildene bygget er basert på |

Komponentene henter tekst fra `src/data/`. Skal du endre en tekst, endre den der.

## Hva som er mock

- Nettbutikk (`/deler`, `/deler/:slug`, `/kasse`): produktliste, handlekurv og kasse er UI-only. «Send bestillingsforespørsel» sender ingenting.
- Skjemaer (bestilling, kontakt, kasse): validering og suksess-tilstand i klient. `src/lib/forms.js` returnerer `{ ok: true }` etter 600 ms. Bytt kroppen til et kall mot `/api/contact` (Resend) senere, signaturen beholdes.
- Facebook-feed: statiske plassholderkort. Samme objektform som make.com-webhooken.
- Video: plassholdere, ingen ekte videoer.
- Reviews: tom liste, badges vises først når data legges inn.

## Legge inn innhold

**Ny bil til salgs** (`src/data/cars.js`): legg bildet i `assets-raw/`, legg det til i `PHOTOS` i `scripts/prepare-images.mjs` med mappe `biler`, kjør `npm run images`, og legg inn et objekt med `slug`, `title`, `year`, `km`, `engine`, `price` (tall som streng), `images` (manifest-nøkler), `description`, `sold: false`, `placeholder: false`. Fjern plassholderkortene når ekte biler er inne. Tom liste gir tom-tilstand automatisk.

**Nytt produkt** (`src/data/products.js`): som over, mappe `produkter`. Felt: `slug`, `brand`, `title`, `category` (må matche `categories`), `price`, `sku`, `stock` (tall eller `null`), `image`, `description`, `fits`, `placeholder: false`.

**Ny video** (`src/data/videos.js`): YouTube: `source: "youtube"`, `src: "<YouTube-ID>"`. Egen fil: legg mp4 i `public/video/`, `source: "mp4"`, `src: "/video/fil.mp4"`, `poster` = manifest-nøkkel. Sett `featured: true` på den som skal være stor. `placeholder: false`.

**Nytt feed-innlegg** (`src/data/socialFeed.js`): last ned bildet til `assets-raw/`, legg det til i `PHOTOS` med mappe `feed`, kjør `npm run images`. Sett `mediaUrl` til manifest-nøkkelen, `caption` ordrett, `date` (ISO), `permalink`, `likes`/`comments` (eller `null`), `placeholder: false`. Fjern `placeholderImage`. Komponenten sorterer nyeste først og viser seks på forsiden. I drift byttes filen mot et JSON-endepunkt med samme form.

**Reviews** (`src/data/reviews.js`): kun verifiserte tall. Se kommentaren i filen.

**Nye bilder generelt**: legg i `assets-raw/`, legg til i `PHOTOS` (kildefil, mappe, nytt navn uten æøå, beskrivelse), kjør `npm run images`. Bruk nøkkelen (`/images/<mappe>/<navn>`) i data eller i `<Picture src=… />`.

## Regler for innhold

Norsk bokmål, aldri tankestrek, ingen av de tre forbudte ordene i `CLAUDE.md`. Kun `_kilder/FAKTA.md` er kilde for fakta. Plassholdere skrives i klammer. Se `CLAUDE.md`.

## Deploy (senere)

`vercel.json` har SPA-rewrite og `X-Robots-Tag: noindex`. `index.html` har `<meta name="robots" content="noindex">` og OG-URL `https://gt-maskin-demo.vercel.app`. Begge byttes ved go-live.
