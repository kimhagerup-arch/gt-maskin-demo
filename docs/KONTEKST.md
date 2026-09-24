# KONTEKST (teknisk status)

## Stack

- Vite 5.4, React 18.3, react-router-dom 6.28 med `future`-flagg (`v7_startTransition`, `v7_relativeSplatPath`, `v7_fetcherPersist`, `v7_normalizeFormMethod`, `v7_partialHydration`, `v7_skipActionErrorRevalidation`).
- Tailwind 3.4. Farger som `rgb(var(--brand-x) / <alpha-value>)`; variablene er RGB-tripler i `src/index.css`. Egne klasser i `@layer components`: `container-site`, `section-pad`, `kicker`, `h1-hero`, `h1-page`, `h2-section`, `reveal`, `input-dark`, `textarea-dark`, `link-underline`.
- Biome 1.9 for lint og format. `a11y/useSemanticElements` er av. `src/data/imageManifest.js` og `public/` ignoreres.
- lucide-react via `src/components/Icon.jsx` (navn som streng i datafilene).
- sharp ^0.34 (Windows ARM64-støtte).

## Ruting

`src/App.jsx`: `Layout` (Header, Outlet, Footer, StickyMobileBar, CartDrawer) med lazy-lastede sider i `Suspense`. `ScrollToTop` ruller til toppen eller til hash-anker etter 60 ms (lazy-last). `useSeoMeta` setter title, description og og:title per side.

## Data og bilder

- Alt innhold i `src/data/`. Komponenter leser data, ingen hardkodet tekst i JSX ut over enkeltord i lenker.
- `src/data/imageManifest.js` genereres av `scripts/prepare-images.mjs` og eksporterer `imageManifest` (nøkkel `/images/<mappe>/<navn>` med `width`, `height`, `sizes`, `description`) og `heroVideo` (`null` eller `/video/hero.mp4`).
- `src/lib/images.js` `getImage(key)` gir `src`, `srcSet`, `webpSrcSet`, `sizes`, `smallest`. `Picture` bygger `<picture>` med webp-source og jpg-fallback, `width`/`height`, `loading="lazy"` som standard, `onError` til `Placeholder`.
- Logo: `public/images/logo/gt-maskin-logo-{128,512}.png` (png med alfa) og webp.

## Tilstand

- `CartContext`: `items`, `count`, `subtotal` (`null` hvis noen pris er plassholder), `add`, `remove`, `setQty`, `clear`, `isOpen`, `open`, `close`. Lagres i `sessionStorage` under `gtm-cart`.
- Skjemaer holder egen tilstand. `submitForm(kind, payload)` i `src/lib/forms.js` er eneste innsendingspunkt.
- `StickyMobileBar` lytter på `CustomEvent("gtm:booking-visible")` fra `BookingForm` (IntersectionObserver).

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
| noindex | `index.html` + `vercel.json` | Fjernes ved go-live |

## Verifisering

- `npm run build` og `npm run lint` er rene.
- Visuell sjekk: puppeteer-core mot lokal Chrome (script ligger utenfor repoet). Alle ruter på 375 og 1440 px, mobilmeny og handlekurv åpen, `scrollWidth` lik viewport, ingen konsollfeil.
- `node scripts/check-contrast.mjs`: alle kombinasjoner AA.
