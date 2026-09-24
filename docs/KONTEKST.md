# KONTEKST (teknisk status)

## Stack

- Vite 5.4, React 18.3, react-router-dom 6.28 med `future`-flagg (`v7_startTransition`, `v7_relativeSplatPath`, `v7_fetcherPersist`, `v7_normalizeFormMethod`, `v7_partialHydration`, `v7_skipActionErrorRevalidation`).
- Tailwind 3.4. Farger som `rgb(var(--brand-x) / <alpha-value>)`; variablene er RGB-tripler i `src/index.css`. Egne klasser i `@layer components`: `container-site`, `section-pad`, `kicker`, `h1-hero`, `h1-page`, `h2-section`, `reveal`, `input-dark`, `textarea-dark`, `link-underline`.
- Fonter: Bebas Neue 400 og Barlow 400/500/600/700 (Google Fonts, OFL) selvhostet i `public/fonts/` som woff2 (latin-subsett). `@font-face` i `src/index.css` med `font-display: swap`, preload av Bebas og Barlow 400 i `index.html`. Ingen eksterne kall ved lasting.
- Biome 1.9 for lint og format. `a11y/useSemanticElements` er av. `src/data/imageManifest.js` og `public/` ignoreres.
- lucide-react via `src/components/Icon.jsx` (navn som streng i datafilene).
- sharp ^0.34 (Windows ARM64-støtte).

## Ruting

`src/App.jsx`: `Layout` (Header, Outlet, Footer, StickyMobileBar, CartDrawer). Forsiden importeres eagert (hovedrute, LCP), øvrige sider lastes med `React.lazy` i `Suspense` med `RouteFallback` i full høyde (unngår layout shift av footer). `ScrollToTop` ruller til toppen eller til hash-anker etter 60 ms. `useSeoMeta` setter title, description og og:title per side.

## Data og bilder

- Alt innhold i `src/data/`. Komponenter leser data, ingen hardkodet tekst i JSX.
- `src/data/imageManifest.js` skrives av `scripts/prepare-images.mjs` og eksporterer `imageManifest` (nøkkel `/images/<mappe>/<navn>` med `width`, `height`, `sizes`, `description`) og `heroVideo` (`null` eller `/video/hero.mp4`). Varianter: full (maks 1920), 800 og 400 px, webp + jpg.
- `src/lib/images.js` `getImage(key)` gir `src`, `srcSet`, `webpSrcSet`, `sizes`, `smallest`. `Picture` bygger `<picture>` med webp-source og jpg-fallback, `width`/`height`, `loading="lazy"` som standard, `priority` gir eager + `fetchpriority="high"`, `onError` til `Placeholder`.
- Logo: `public/images/logo/gt-maskin-logo-{128,256,512}.{png,webp}`. Header og footer bruker 128/256 som `<picture>`.

## Tilstand

- `CartContext`: `items`, `count`, `subtotal` (`null` hvis noen pris er plassholder), `add`, `remove`, `setQty`, `clear`, `isOpen`, `open`, `close`. Lagres i `sessionStorage` under `gtm-cart`.
- Skjemaer holder egen tilstand. `submitForm(kind, payload)` i `src/lib/forms.js` er eneste innsendingspunkt.
- `StickyMobileBar` (`<nav aria-label="Hurtigvalg">`) lytter på `CustomEvent("gtm:booking-visible")` fra `BookingForm` (IntersectionObserver).

## Integrasjonspunkter for senere

| Hva | I dag | Bytt til |
|---|---|---|
| Feed | `src/data/socialFeed.js` | JSON-endepunkt fra make.com, samme objektform. `SocialFeed` tar `posts` og `channels` som props |
| Skjemaer | `submitForm` returnerer `{ ok: true }` | `fetch("/api/contact")` mot Resend |
| Nettbutikk | Mock, forespørsel | Vipps eCom eller Stripe (fase 2) |
| Reviews | `reviews.js` tom | Verifiserte tall, badge vises automatisk |
| Video | `videos.js` plassholdere | YouTube-ID eller mp4 |
| Hero-video | `heroVideo: null` | Legg `hero.mp4` i `assets-raw/`, kjør `npm run images` |
| Sporing | Ingen | Plausible eller Vercel Analytics ved go-live |
| noindex | `index.html`, `vercel.json`, `public/robots.txt` | Fjernes/endres ved go-live |

## Verifisering

- `npm run build` og `npm run lint` er rene. Hovedchunk 276 kB (83 kB gzip), ruter under 10 kB gzip hver.
- Visuell sjekk: puppeteer-core mot lokal Chrome (script utenfor repoet). Skjermbilder i `docs/qa/skjermbilder/`. Alle ruter på 375 og 1440 px, utvalgte på 768 og 1024, `scrollWidth` lik viewport, ingen konsollfeil.
- axe-core på alle ruter: 0 funn. Lighthouse mobil (preview): ytelse 91-96, tilgjengelighet 100, beste praksis 100, SEO 66 med `noindex` (100 uten). Se `docs/qa/QA-RAPPORT.md`.
- `node scripts/check-contrast.mjs`: alle kombinasjoner AA.
