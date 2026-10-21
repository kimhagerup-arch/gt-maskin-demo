# KONTEKST (teknisk status)

## Stack

- Vite 5.4, React 18.3, react-router-dom 6.28 med `future`-flagg (`v7_startTransition`, `v7_relativeSplatPath`, `v7_fetcherPersist`, `v7_normalizeFormMethod`, `v7_partialHydration`, `v7_skipActionErrorRevalidation`).
- Tailwind 3.4. Farger som `rgb(var(--brand-x) / <alpha-value>)`; variablene er RGB-tripler i `src/index.css`. Kanalfarger som tokens: `brand-facebook` (#0866FF) med `brand-on-facebook` (hvit), `brand-snapchat` (#FFFC00) med `brand-on-snapchat` (svart). Eget brekkpunkt `xs` (380 px) for header-undertittelen. Egne klasser i `@layer components`: `container-site`, `section-pad`, `kicker`, `h1-hero`, `h1-page`, `h2-section`, `reveal`, `input-dark`, `textarea-dark`, `link-underline`, `player-portrait`, `player-landscape`.
- Fonter: Bebas Neue 400, Barlow 400/500/600/700 og Yellowtail 400 (Google Fonts, OFL) selvhostet i `public/fonts/` som woff2 (latin-subsett). `@font-face` i `src/index.css` med `font-display: swap`, preload av Bebas, Barlow 400 og Yellowtail i `index.html`. Yellowtail (`font-script`) brukes kun i `KustomEmblem` i hero. Ingen eksterne kall ved lasting.
- Biome 1.9 for lint og format. `a11y/useSemanticElements` er av. `src/data/imageManifest.js` og `public/` ignoreres.
- lucide-react via `src/components/Icon.jsx` (navn som streng i datafilene). Facebook- og Snapchat-merkene er inline SVG i `SocialMarks.jsx` (`FacebookMark`, `SnapchatMark` med hvit fyll og svart kontur via `paint-order: stroke`, `SourceMark` som lite kvadrat i kanalfargen).
- sharp ^0.34 (Windows ARM64-støtte).

## Ruting

`src/App.jsx`: `Layout` (DraftBanner, Header, Outlet, Footer, StickyMobileBar, CartDrawer). Forsiden importeres eagert, øvrige sider lastes med `React.lazy` i `Suspense` med `RouteFallback` i full høyde. Ruter: `/`, `/verksted`, `/deler`, `/deler/:slug`, `/kasse`, `/biler-til-salgs`, `/biler-til-salgs/:slug`, `/video`, `/utleie`, `/om-oss`, `/bestill`, `/kontakt`, `/personvern`, `*`.

`ScrollToTop` ruller til toppen eller til hash-anker etter 60 ms (brukes av `/biler-til-salgs#vi-skaffer`, `/utleie#utleieforesporsel`, `/utleie#<slug>`). Preload per rute gjøres av Vite-pluginen `gtm-hero-preload` i `vite.config.js`: den leser `src/data/heroImages.js` (`heroByPath`, `fontsByPath`, `pageByPath`) og skriver et inline-script i `<head>` som preloader rutens hero-bilde (webp-srcset og sizes), Yellowtail på forsiden og rutens sidechunk (`modulepreload`, kun i build). `HeroPreload.jsx` er fjernet. `useAfterLoad()` utsetter bilder under folden (videominiatyrer, scootere i utleiebanneret, QR) til etter `window` `load`. `useSeoMeta` setter title, description og og:title per side.

`/deler` leser og skriver `?gruppe=deler|klaer&kategori=<slug>` med `useSearchParams`; `categorySlug()` i `products.js` lager URL-nøkkelen.

## Data og bilder

- Alt innhold i `src/data/`. Komponenter leser data, ingen hardkodet tekst i JSX.
- `products.js`: `groups` (deler, klaer med kategorier), `products` med `group`, `sizes` (`null` = ikke klær, `[]` = størrelser ikke bekreftet, `["S", …]` = aktiv velger), `placeholderImage` (demo) bak PLASSHOLDER-etiketten.
- `cars.js`: `cars` (ekte, tom), `exampleCars` (to plassholdere, vises kun når `cars` er tom), `findCar(slug)`.
- `videos.js`: `source` er `youtube` | `facebook` | `mp4` | `snapchat`, `aspect` er `16:9` | `9:16`, `poster` alltid lokal nøkkel, `duration` og `date` kan være `null`. Facebook-`src` kan være en reel-lenke; `facebookEmbedHref()` i `VideoPlayer` skriver den om til `/<handle>/videos/<id>/` for pluginen.
- `channels.js`: facebook (tall med dato), messenger (`https://m.me/GtMaskinas`), snapchat (`username` gtmaskin-as, `url`, `embedUrl` til profilvisningen, `qrImage`). `getChannel(platform)`.
- `rental.js`: fire objekter uten `bookingUrl`, `rentalTypes` til skjemaet, `rentalBanner` (tekst, SVG-bakgrunn `public/images/utleie/vidde.svg`, scooterbilde `scooter-profil`, `ctaHome`).
- `socialFeed.js`: uendret objektform (make.com). `SocialFeed` viser bare ekte innlegg når det finnes minst 3, rundet ned til multiplum av 3.
- `src/data/imageManifest.js` skrives av `scripts/prepare-images.mjs`. Varianter: full (maks 1920), 800 og 400 px, webp + jpg.
- `src/lib/images.js` `getImage(key)` gir `src`, `srcSet`, `webpSrcSet`, `sizes`, `smallest`. `Picture` bygger `<picture>`.

## Lagt til i runde 4c

| Hva | Rolle |
|---|---|
| `index.css` | `section-pad` 32/72 px, `container-site` 16 px sidemarg på mobil, `.marquee-frame`/`.marquee-bulbs-*` (lyspærer, keyframes `marquee-x`/`marquee-y`), `.neon-text`, `.hero-zoom`/`.hero-zoom-on` |
| `HeroSlideshow`, `src/data/heroSlides.js` | Bildeshow i forsidens hero: krysstoning hvert 5. s, zoom, pause ved hover/fokus/skjult fane, sveip, prikker, reduced motion. Første bilde eager og forhåndslastet (`heroImages.js` `/`), resten 2,5 s etter load (`REST_DELAY_MS`), automatisk bytte starter da. Tekster i `hero.slideshow*`, neon-linje `hero.neonLine` |
| `PageHero` | `video`-prop: bakgrunn via `HeroMedia` (poster LCP, video etter load). Brukt på `/deler` med `partsSection.page.heroImage/heroVideo/heroPosition` |
| `HeroMedia` | Nå bakgrunnskomponent med `sizes` og `imgClassName`; videoen monteres 2,5 s etter load (`VIDEO_DELAY_MS`); ikke lenger i `HomeHero` |
| `SocialFeed` / `FeedCard` | Kompakt topp uten `SectionHeader`; kort med bilde og tittel, «Eksempel»-pille (`feedSection.exampleTag`), ekte innlegg viser tekst og dato |
| `MobileSlider`, `VideoSlider` | Sporet går ut til 16 px-kanten (`-mx-4 px-4 scroll-px-4`) |

## Lagt til i runde 4b

| Hva | Rolle |
|---|---|
| `VideoShowcase` / `VideoPlayer` | `autoStart`: kortvalg monterer spilleren direkte (mp4 spiller, Facebook-iframe lastes). `LoadingMark` fjernes ved `onLoad` |
| `InstallPrompt` | Boks på mobil («Legg GT Maskin på hjemskjermen», «Legg til», «Ikke nå») etter 20 s eller halve siden; vilkår og 14 dagers pause (`gtm-app-boks-lukket`). I `Layout` etter `StickyMobileBar`. Tekster i `installApp.box*`, `add`, `notNow`. `InstallDialog` er eksportert fra `InstallButton` |
| `BrandWall` | Skiltvegg med logoer fra `brands.js` (`parts`, `store`, `all`; `logo`, `w`, `h`, `logoHeight`). Erstatter `BrandChips` (fjernet). SVG-er i `public/images/merker/`, kilder i `_kilder/LOGOER.md` |
| `channels.snapchat.url` | Eneste Snapchat-lenke (offentlig profil). `addUrl` er fjernet |
| `index.html` | `<link rel="manifest" crossorigin="use-credentials">` så manifestet hentes med cookie bak Vercel-innlogging |
| `translate="no"` | På merkenavn, produktnavn, firmanavn og «Ring» (BrandWall, ProductCard, Produkt, CartDrawer, Kasse, Logo, Footer, StickyMobileBar) |

## Lagt til i runde 4

| Hva | Rolle |
|---|---|
| `VideoPlayer` (omskrevet) | Ett trykk til video: mørk flate med lasteindikator fra trykk til `onLoad`, iframe/video tones inn. mp4 i `<video playsInline autoPlay>` med `play()` som sikring, YouTube `autoplay=1&playsinline=1&rel=0`, Facebook `autoplay=true`, alle med `allow="autoplay; encrypted-media; picture-in-picture; fullscreen"`. `embedUrl(video)` tar ikke lenger autoplay-parameter |
| `VideoPoster` | Designet poster (mørk flate, kildemerke, tittel) for video uten `poster`. Brukes i spilleren og i `VideoCard` (`compact`) |
| `MobileSlider` | Slider under 768 px (scroll-snap, prikker med `aria-label` «Gå til kort n av m», fokus ruller kortet inn), rutenett fra 768 px. `items`, `renderItem`, `keyOf`, `label`, `gridClassName`, `itemClassName`, `tone`. Brukes av `SocialFeed` og `ServiceCards`. Tekster i `sliderLabels` |
| `SnapchatSection` (omskrevet) | Lokalt profilkort med «Åpne i Snapchat» (`channels.snapchat.addUrl`) og «Se historiene her». Iframe monteres på `pointerdown`, skjelett til `onLoad`, timeout 8 s. Tekster i `snapchatSection` |
| `HeroMedia` (omskrevet) | Poster alltid (LCP), `<video>` over posteren etter `load` (`useAfterLoad`), ikke ved reduced motion eller `navigator.connection.saveData`, tones inn ved `onPlaying` |
| `InstallButton`, `useInstallPrompt` | «Legg GT Maskin på hjemskjermen». Hooken fanger `beforeinstallprompt` ved modul-lasting, `prompt()` ved trykk; iOS får dialog med `installApp.iosSteps`; skjult i `display-mode: standalone`. I `Footer` og `MobileMenu` |
| `src/data/prices.js` | `workshopPrices` (fem rader) til blokken «Faste priser» på `/verksted`. Tekster i `workshopPage.prices*` |
| `src/data/products.js` | Ekte varer i «Klær og utstyr» og Wunder-Baum i «Deler». `placeholderImage` også på tre delplassholdere |
| `public/manifest.webmanifest`, `public/sw.js`, `public/offline.html` | PWA. Manifest og ikoner (192, 512, 512 maskable, apple-touch 180) skrives av `scripts/generate-favicons.mjs`. SW: navigering nettverk først med `offline.html` som fallback, `/assets/` cache først, eksterne kall urørt, cachenavn `gtm-<versjon>` der Vite-pluginen `gtm-sw-version` (`vite.config.js`, `closeBundle`) bytter `__GTM_BUILD__` i `dist/sw.js`. Registrering i `src/main.jsx` kun i `import.meta.env.PROD`, etter `load`. `vercel.json`: `Cache-Control: no-cache` på `/sw.js` og `/manifest.webmanifest` |
| `scripts/prepare-images.mjs` | 18 nye butikkbilder (mappe `butikk`, `hero/butikk-hero-poster`, `produkter/wunder-baum`) og `hero.mp4` til `public/video/` |
| `nav.items` | Seks punkter; «Biler til salgs» er tatt ut. `services.js` leser «Vi skaffer»-kortet fra `carsSection.wanted` |

## Komponenter lagt til i runde 2

| Komponent | Rolle |
|---|---|
| `VideoPlayer` | Hovedspilleren. Poster lokalt, iframe eller `<video>` monteres først ved klikk. `embedUrl()` bygger youtube-nocookie- og Facebook-plugin-URL (`autoplay=true`, `allow="autoplay; encrypted-media; picture-in-picture"`). Stående video: høydestyrt ramme (`.player-portrait`), mobil maks 70 svh, desktop maks 640 px og under skjermhøyden minus header. Snapchat lenker ut |
| `VideoMeta` | Tittel, kilde med lite merke (`SourceLabel`), varighet, dato, «Se på Facebook»; `compact` i kortene |
| `VideoShowcase` | Hovedspiller + `VideoSlider` med `VideoCard`. Holder aktiv video, bytter spiller ved valg og ruller spilleren inn når den er utenfor viewport. Brukes på forsiden (`VideoSection`) og `/video` |
| `VideoSlider` | Vannrett liste: scroll-snap og sveip, piler «Forrige videoer» / «Neste videoer» fra md som blar ett kort og deaktiveres i endene. Måler med `scroll`, `ResizeObserver` og `resize`. Reduced motion gir `behavior: auto` |
| `VideoCard` | Kort som knapp med `aria-pressed`, 9:16 eller 16:9 etter `aspect`, «Spiller nå» på aktivt kort |
| `SnapchatSection` | «GT Maskin på Snapchat»: gult kort før klikk, iframe mot `embedUrl` (416×692) etter klikk. «Åpne i Snapchat» og QR på desktop |
| `SocialMarks` | `FacebookMark`, `SnapchatMark`, `SourceMark` |
| `RentalBanner` | Erstatter `SafariBanner`. SVG-illustrasjon bak, tre animerte scootere (`.scooter-lane`, `.scooter-sled`, `.scooter-snow`), `cta` som prop |
| `SocialLinks` | Facebook, Messenger, Snapchat i merkefargene (`CHANNEL_BUTTON`). `qr`: `never` (kun knapper) / `desktop` (lenke under md, QR fra md) / `always` (QR-blokk med lenke i stedet for Snapchat-knapp). `SocialIcons`: ikonknapper; Snapchat lenker direkte under md og åpner `SnapchatQrDialog` (QR, brukernavn, «Åpne i Snapchat») fra md |
| `CarWantedForm` | «Vi skaffer», `submitForm("biljakt")` |
| `CarGallery` | Piler, piltaster, swipe, miniatyrer |
| `RentalForm` | Utleieforespørsel, `submitForm("utleie")`, til-dato ikke før fra-dato |
| `FormBits` | `Field`, `Honeypot`, `FormStatus`, `FormSuccess`, `ContactLine` delt av skjemaene |
| `IconField` | Ikonfelt for objekter uten bilde (ATV) |
| `DraftBanner` | Utkaststripe, lukket tilstand i sessionStorage, lest synkront ved første render |
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
| Video | `videos.js` med seks Facebook-reels, titler nummerert | Titler, stillbilder og datoer fra kunden |
| Hero-video | `heroVideo: "/video/hero.mp4"` (butikkvideoen, 3,4 MB) | Ny fil i `assets-raw/`, kjør `npm run images` |
| Push-varsler | Ingen (service worker har bare cache og offline) | Egen avklaring med kunden før noe legges til |
| Scooterdomenet | Nevnes ikke | 301 til gtmaskin.com/utleie ved go-live |
| Sporing | Ingen | Plausible eller Vercel Analytics ved go-live |
| noindex | `index.html`, `vercel.json`, `public/robots.txt` (Facebook-forhåndsvisning sluppet inn) | Fjernes/endres ved go-live |

## Deploy

- GitHub: `kimhagerup-arch/gt-maskin-demo` (privat), branch `dev`. Pushet 8. oktober 2026.
- Vercel: https://gt-maskin-demo.vercel.app, deployet 8. oktober 2026 fra `dev`. SPA-rewrite fra `vercel.json`.
- `X-Robots-Tag: noindex` verifisert i svarhodene på den live siden.

## Verifisering

- `npm run build` og `npm run lint` er rene. Hovedchunk 294 kB (88 kB gzip), ruter under 10 kB gzip hver (Video-chunk 2,6 kB gzip).
- Visuell sjekk: puppeteer-core mot lokal Chrome (script utenfor repoet). Skjermbilder i `docs/qa/skjermbilder/runde-3/` (50 filer, palett-komprimert). Alle 15 ruter på 320, 375, 768, 1024 og 1440 px: `scrollWidth` lik viewport, ingen konsollfeil, ingen eksterne kall før klikk.
- axe-core (wcag2a/aa, 2.1, best-practice) på 15 ruter ved 375 og 1440 px: 0 funn (runde 3).
- Lighthouse mobil (preview, runde 3): `/` 90, `/video` 90, `/utleie` 90, tilgjengelighet og beste praksis 100, CLS 0. Tilgjengelighet 100, beste praksis 100, CLS 0, SEO 69 med `noindex`. Se `docs/qa/QA-RAPPORT.md`.
- Skjemaer (biljakt, utleie, kontakt, bestilling): feil- og suksess-tilstand verifisert i headless Chrome. Handlekurv med klesplagg i to størrelser gir to linjer (verifisert med midlertidige størrelser i dev, ikke committet).
- Videospilleren verifisert mot ekte Facebook- og YouTube-lenker i dev (midlertidig, ikke committet): iframe monteres først ved klikk, video laster fra riktig vert.
- `node scripts/check-contrast.mjs`: alle kombinasjoner AA.
