# KONTEKST (teknisk status)

## Stack

- Vite 5.4, React 18.3, react-router-dom 6.28 med `future`-flagg (`v7_startTransition`, `v7_relativeSplatPath`, `v7_fetcherPersist`, `v7_normalizeFormMethod`, `v7_partialHydration`, `v7_skipActionErrorRevalidation`).
- Tailwind 3.4. Farger som `rgb(var(--brand-x) / <alpha-value>)`; variablene er RGB-tripler i `src/index.css`. Egne klasser i `@layer components`: `container-site`, `section-pad`, `kicker`, `h1-hero`, `h1-page`, `h2-section`, `reveal`, `input-dark`, `textarea-dark`, `link-underline`.
- Fonter: Bebas Neue 400 og Barlow 400/500/600/700 (Google Fonts, OFL) selvhostet i `public/fonts/` som woff2 (latin-subsett). `@font-face` i `src/index.css` med `font-display: swap`, preload av Bebas og Barlow 400 i `index.html`. Ingen eksterne kall ved lasting.
- Biome 1.9 for lint og format. `a11y/useSemanticElements` er av. `src/data/imageManifest.js` og `public/` ignoreres.
- lucide-react via `src/components/Icon.jsx` (navn som streng i datafilene). Facebook- og Snapchat-merkene er inline SVG i `SocialLinks.jsx`.
- sharp ^0.34 (Windows ARM64-støtte).

## Ruting

`src/App.jsx`: `Layout` (DraftBanner, Header, Outlet, Footer, StickyMobileBar, CartDrawer). Forsiden importeres eagert, øvrige sider lastes med `React.lazy` i `Suspense` med `RouteFallback` i full høyde. Ruter: `/`, `/verksted`, `/deler`, `/deler/:slug`, `/kasse`, `/biler-til-salgs`, `/biler-til-salgs/:slug`, `/video`, `/utleie`, `/om-oss`, `/bestill`, `/kontakt`, `/personvern`, `*`.

`ScrollToTop` ruller til toppen eller til hash-anker etter 60 ms (brukes av `/biler-til-salgs#vi-skaffer`, `/utleie#utleieforesporsel`, `/utleie#<slug>`). `HeroPreload` legger inn `<link rel="preload" as="image">` for undersidens hero-bilde så snart ruten er kjent, før sidechunken er lastet. `useSeoMeta` setter title, description og og:title per side.

`/deler` leser og skriver `?gruppe=deler|klaer&kategori=<slug>` med `useSearchParams`; `categorySlug()` i `products.js` lager URL-nøkkelen.

## Data og bilder

- Alt innhold i `src/data/`. Komponenter leser data, ingen hardkodet tekst i JSX.
- `products.js`: `groups` (deler, klaer med kategorier), `products` med `group`, `sizes` (`null` = ikke klær, `[]` = størrelser ikke bekreftet, `["S", …]` = aktiv velger), `placeholderImage` (demo) bak PLASSHOLDER-etiketten.
- `cars.js`: `cars` (ekte, tom), `exampleCars` (to plassholdere, vises kun når `cars` er tom), `findCar(slug)`.
- `videos.js`: `source` er `youtube` | `facebook` | `mp4` | `snapchat`, `aspect` er `16:9` | `9:16`, `poster` alltid lokal nøkkel, `duration` og `date` kan være `null`.
- `channels.js`: facebook (tall med dato), messenger (`https://m.me/GtMaskinas`), snapchat (`username`/`url` null til brukernavnet er kjent, `qrImage`). `getChannel(platform)`.
- `rental.js`: fire objekter uten `bookingUrl`, `rentalTypes` til skjemaet, `safari`.
- `socialFeed.js`: uendret objektform (make.com). `SocialFeed` viser bare ekte innlegg når det finnes minst 3, rundet ned til multiplum av 3.
- `src/data/imageManifest.js` skrives av `scripts/prepare-images.mjs`. Varianter: full (maks 1920), 800 og 400 px, webp + jpg.
- `src/lib/images.js` `getImage(key)` gir `src`, `srcSet`, `webpSrcSet`, `sizes`, `smallest`. `Picture` bygger `<picture>`.

## Komponenter lagt til i runde 2

| Komponent | Rolle |
|---|---|
| `VideoPlayer` | Én spiller. Poster lokalt, iframe eller `<video>` monteres først ved klikk. `embedUrl()` bygger youtube-nocookie- og Facebook-plugin-URL. Rammen er alltid 16:9, 9:16 sentreres inni. Snapchat lenker ut |
| `VideoMeta` | Tittel, varighet, dato, kilde; null skjules |
| `SocialLinks` | Facebook, Messenger, Snapchat. `qr`: `never` / `desktop` / `always`. Uten Snapchat-url vises kun QR |
| `CarWantedForm` | «Vi skaffer», `submitForm("biljakt")` |
| `CarGallery` | Piler, piltaster, swipe, miniatyrer |
| `RentalForm` | Utleieforespørsel, `submitForm("utleie")`, til-dato ikke før fra-dato |
| `FormBits` | `Field`, `Honeypot`, `FormStatus`, `FormSuccess`, `ContactLine` delt av skjemaene |
| `IconField` | Ikonfelt for objekter uten bilde (ATV) |
| `DraftBanner` | Utkaststripe, lukket tilstand i sessionStorage, lest synkront ved første render |
| `HeroPreload` | Preload av hero-bilde per rute |
| `Placeholder` | Felles stil: stiplet kant, nedtonet tekst, etikett «Fylles inn» |

## Tilstand

- `CartContext`: linjer nøklet på `key = lineKey(slug, size)`. `add(product, qty, size)`, `remove(key)`, `setQty(key, qty)`, `clear`, `isOpen`, `open`, `close`. Lagres i `sessionStorage` under `gtm-cart`; eldre linjer uten `key` får en ved lesing.
- Skjemaer holder egen tilstand. `submitForm(kind, payload)` i `src/lib/forms.js` er eneste innsendingspunkt. `kind`: `booking`, `contact`, `checkout`, `biljakt`, `utleie`.
- `StickyMobileBar` lytter på `CustomEvent("gtm:booking-visible")`. `BookingForm` sender den selv, de nye skjemaene via `useHideStickyBar(ref)`.
- `DraftBanner` bruker `sessionStorage` under `gtm-utkast-lukket`.

## Integrasjonspunkter for senere

| Hva | I dag | Bytt til |
|---|---|---|
| Feed | `src/data/socialFeed.js` | JSON-endepunkt fra make.com, samme objektform |
| Skjemaer | `submitForm` returnerer `{ ok: true }` | `fetch("/api/contact")` mot Resend, fem `kind`-verdier |
| Nettbutikk | Mock, forespørsel | Vipps eCom eller Stripe (fase 2) |
| Reviews | `reviews.js` tom | Verifiserte tall, badge vises automatisk |
| Video | `videos.js` plassholdere | Facebook-URL, YouTube-ID, mp4 eller Snapchat-lenke, lokal poster |
| Hero-video | `heroVideo: null` | Legg `hero.mp4` i `assets-raw/`, kjør `npm run images` |
| Snapchat | QR uten lenke | `username` og `url` i `channels.js` |
| Scooterdomenet | Nevnes ikke | 301 til gtmaskin.com/utleie ved go-live |
| Sporing | Ingen | Plausible eller Vercel Analytics ved go-live |
| noindex | `index.html`, `vercel.json`, `public/robots.txt` (Facebook-forhåndsvisning sluppet inn) | Fjernes/endres ved go-live |

## Verifisering

- `npm run build` og `npm run lint` er rene. Hovedchunk 294 kB (88 kB gzip), ruter under 10 kB gzip hver (Video-chunk 2,6 kB gzip).
- Visuell sjekk: puppeteer-core mot lokal Chrome (script utenfor repoet). Skjermbilder i `docs/qa/skjermbilder/runde-2/` (50 filer, palett-komprimert, 12 MB). Alle ruter på 375, 768, 1024 og 1440 px: `scrollWidth` lik viewport, ingen konsollfeil, ingen eksterne kall før klikk.
- axe-core (wcag2a/aa, 2.1, best-practice) på 18 ruter ved 375 og 1440 px: 0 funn.
- Lighthouse mobil (preview): `/` 91, `/video` 90, `/utleie` 90, `/biler-til-salgs` 93. Tilgjengelighet 100, beste praksis 100, CLS 0, SEO 69 med `noindex`. Se `docs/qa/QA-RAPPORT.md`.
- Skjemaer (biljakt, utleie, kontakt, bestilling): feil- og suksess-tilstand verifisert i headless Chrome. Handlekurv med klesplagg i to størrelser gir to linjer (verifisert med midlertidige størrelser i dev, ikke committet).
- Videospilleren verifisert mot ekte Facebook- og YouTube-lenker i dev (midlertidig, ikke committet): iframe monteres først ved klikk, video laster fra riktig vert.
- `node scripts/check-contrast.mjs`: alle kombinasjoner AA.
