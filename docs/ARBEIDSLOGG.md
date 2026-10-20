# ARBEIDSLOGG

## 21.10.2026: runde 3b, seksjonshoder, runde ikonknapper, radius, Snapchat-telefon

- `SectionHeader` med felles mønster (`lead` og `actions`, aldri høyrejustert brødtekst); fem bruksssteder lagt om. Feed: ny ingress, talllinje med blått merke, dato under, blå knapp (`Button` variant `facebook`).
- Runde 44 px ikonknapper i merkefargene overalt; `SourceMark` rund og brukt i feedkortene. Farger målt med `getComputedStyle` på 83 flater: `rgb(8, 102, 255)` og `rgb(255, 252, 0)`.
- Radius-tokens `rounded-button` (10 px), `rounded-field` (8 px), `rounded-pill`; brukt på knapper, skjemafelt, chips, filtre, sliderpiler og ikonknapper. Bunnlinja på mobil uendret.
- `SnapchatSection` med telefonramme (360 × 640), lokalt Camaro-bilde, «Se snapene», «Følg @gtmaskin-as», QR på desktop. Ingen eksterne kall før klikk.
- QA: build og lint rene, fire ruter × seks bredder uten overflow og konsollfeil, axe 0 funn, Lighthouse mobil `/` 92 og `/video` 90 (to kjøringer hver, pluss `/utleie` 90), tilgjengelighet 100, beste praksis 100, CLS 0, 15 skjermbilder i `docs/qa/skjermbilder/runde-3b/`.

## 20.10.2026: runde 3, videovisning, merkefarger, Snapchat, safari ut

Branch `feature/runde-3` fra `dev`. Fakta sjekket 20.10.2026 i `_kilder/INNHOLD-FRA-GJERMUND.md`.

**Gjort, per punkt**

1. Video: `VideoPlayer` høydestyrt for 9:16 (`.player-portrait`: mobil maks 70 svh, desktop maks 640 px og under skjermen minus header), poster fyller rammen, tittel bare under/ved siden av. Desktop: dempet flate (maks 880 px) med `VideoMeta` (tittel, kildeetikett, «Se på Facebook»). `autoplay=true` og `allow="autoplay; encrypted-media; picture-in-picture"`; i headless krever Facebook-pluginen likevel eget klikk (notert).
2. Slider: `VideoSlider` (scroll-snap, sveip, piler fra md med `aria-label` «Forrige videoer» / «Neste videoer», deaktivert i endene, `ResizeObserver`), `VideoCard` (knapp med `aria-pressed`, «Spiller nå»), `VideoShowcase` (felles for forsiden og `/video`, valg bytter spiller og ruller den inn, reduced motion respektert).
3. Merkefarger: tokens `brand-facebook`, `brand-on-facebook`, `brand-snapchat`, `brand-on-snapchat`; `SocialMarks.jsx` med `FacebookMark`, `SnapchatMark` (hvit med svart kontur) og `SourceMark`; brukt i `SocialIcons`, `SocialLinks`, `SnapchatQrDialog`, `VideoMeta`. Kontrastrader lagt i `check-contrast.mjs` og BESLUTNINGER.md.
4. Snapchat: `channels.js` med brukernavn, url og `embedUrl`; `SnapchatSection` (gult kort, iframe 416×692 ved klikk) nederst i videoseksjonen og på `/video`; QR-dialog beholdt på desktop med lenke; plassholderen fjernet; personverntekst oppdatert.
5. Safari ut: alle tekster, lenker, SEO og tidslinje renset; `RentalBanner` med `public/images/utleie/vidde.svg` (egen illustrasjon, 3 kB) i stedet for foto og kreditlinje; scooterbildet omdøpt til `scooter-profil`; `FAKTA.md` notert.
6. Header: undertittel på én linje med `taglineParts`, brekkpunkt `xs` (380 px).
7. Konsoll og issues gjennomgått (tabell i QA-rapporten); `loading="lazy"` fjernet fra scooterbildene.
8. Ingen andre fiks.
9. QA: build og lint rene; 15 ruter på fem bredder uten overflow og konsollfeil; axe 0 funn; Lighthouse mobil `/` 90, `/video` 90, `/utleie` 90, tilgjengelighet og beste praksis 100, CLS 0; ingen eksterne kall før klikk; reel og Snapchat-profil verifisert etter klikk; null treff på tankestrek, forbudte ord og verktøyord; 50 skjermbilder.
10. STATUS.md, BESLUTNINGER.md, BILDELISTE.md, QA-RAPPORT.md, KONTEKST.md og denne loggen oppdatert.

**Rapport**: `docs/qa/QA-RAPPORT.md`, seksjon «Runde 3». **Beslutninger**: BESLUTNINGER.md, seksjon «Runde 3».

## 08.10.2026: kustom-emblem i hero

**Gjort**

- Ny `KustomEmblem.jsx` erstatter den hvite boksen i `HomeHero`: avlangt skilt med dobbel kant (mørk ramme, kobberlinje), nagler, støytekstur via `feTurbulence`, egen pinstriping i SVG (speilet halvdel, vertikalt speilet under teksten), glans ved hover på desktop. All pynt `aria-hidden`, teksten er ekte tekst.
- `hero.badge` i `siteContent.js` delt i `script`, `main`, `place`, `text`. Yellowtail (OFL, latin) selvhostet i `public/fonts/`, `@font-face` i `index.css`, `font-script` i Tailwind, preload i `index.html`. Vite må restartes etter endring i `tailwind.config.js`.
- Plassering per bredde (`lg` og `xl`) så emblemet ikke dekker bilen i hero-bildet; mobil i flyt under bildet.
- QA: build og lint rene, axe 0 funn på `/`, Lighthouse mobil `/` 90 og CLS 0, kontrast målt bak teksten (verste 6,05:1). Skjermbilder `hero-emblem-{375,1024,1440}.png` i `docs/qa/skjermbilder/runde-2/`. Detaljer i BESLUTNINGER.md.

## 07.10.2026: runde 2, løft før kunden ser siden

**Forutsetning**: `_kilder/INNHOLD-FRA-GJERMUND.md` skulle være eneste kilde for nytt innhold. Filen finnes ikke. Strukturen er bygd ferdig og plassholderne beholdt; hva som mangler står i STATUS.md.

**Gjort, per punkt**

1. Feed og video: `FeedCard` med norsk dato, klipp til fire linjer med «Les mer på Facebook», karusell-ikon; `SocialFeed` viser bare ekte innlegg når det finnes minst tre, rundet ned til multiplum av tre. Ny `VideoPlayer` med kildene youtube, facebook (plugins/video.php, 16:9 eller 9:16), mp4 og snapchat (lenke ut), alt montert først ved klikk, ingen eksterne miniatyrer. Ny rute `/video` (kodesplittet) med hovedspiller, rutenett og kanalstripe. «Video» i hovedmeny, mobilmeny og footer; header-mellomrom redusert og sjekket på 1024 og 1280 px. `seo.video`.
2. Butikk: `products.js` med gruppene «Deler» og «Klær og utstyr», fire plassholderprodukter for klær og capser med butikkbilder bak etiketten, `sizes` på klær. `/deler` med gruppeveksler, kategorichips og filter i URL. Produktside med størrelsesvelger (deaktivert til størrelser er kjent). Handlekurv nøklet på slug + størrelse i `CartContext`, skuff og kasse viser størrelse. Menytekst «Butikk», ny `seo.deler`, lenkerad på forsiden.
3. Biler til salgs: `cars` (tom) og `exampleCars`. Siden i rekkefølgen PageHero, «Inne hos oss nå», «Vi skaffer»-skjema (`CarWantedForm`, `submitForm("biljakt")`, skjuler sticky CTA), «Solgte biler», «Slik presenteres bilene». Ny detaljside `/biler-til-salgs/:slug` med `CarGallery` (piler, tastatur, swipe), nøkkeltall og «Spør om bilen». Ukjent slug gir 404. Forsiden viser kompakt tom tilstand med knapp til skjemaet.
4. Kanaler: `channels.js` med messenger og snapchat (uten brukernavn: kun QR). Ny `SocialLinks` i footer, på `/kontakt` (Ring, E-post, Messenger samlet; QR på desktop, lenke på mobil når den finnes) og på `/video`. Personverntekst oppdatert.
5. Utleie, variant B: `/utleie` samler alt med `RentalForm` (`submitForm("utleie")`, til-dato ikke før fra-dato), bestillingsknapper byttet til forespørsel, domenet fjernet fra `companyFacts`, `rental.js`, footer og all synlig tekst. ATV med `IconField`. Forsidens utleiekort peker til `/utleie`.
6. Løft: `DraftBanner` (aside, sessionStorage, ingen CLS), felles `Placeholder`-stil med «Fylles inn», forsiden viser kun Gjermund med monogram, hero byttet til `herobilde-fasade.jpg` etter 2x-sammenligning, OG/canonical/twitter-meta, `robots.txt` med Facebook-unntak, `HeroPreload` for undersidenes hero-bilder.
7. QA: build og lint rene. 18 ruter på 375/768/1024/1440 uten konsollfeil og overflow (to overflow-feil funnet og rettet). axe 0 funn etter tre rettinger. Lighthouse mobil: `/` 91, `/video` 90, `/utleie` 90, `/biler-til-salgs` 93, tilgjengelighet og beste praksis 100, CLS 0. Ingen eksterne kall før klikk; Facebook- og YouTube-spiller verifisert med midlertidige testlenker i dev. Fem skjemaer med feil og suksess verifisert, handlekurv med to størrelser gir to linjer. Null treff på tankestrek, forbudte ord og verktøyord. 50 skjermbilder i `docs/qa/skjermbilder/runde-2/`.

**Fra QA-rapport og STATUS runde 1 som ble løftet uten nye fakta**: ATV-plassholder erstattet med ikonfelt, tomme [Navn]-kort fjernet fra forsiden, hero-bilde byttet til skarpere fil, OG-metadata komplettert, robots.txt justert for deling, footer-kolonner rebalansert.

**Beslutninger**: BESLUTNINGER.md, seksjon «Runde 2». **Rapport**: `docs/qa/QA-RAPPORT.md`, seksjon «Runde 2».

**Åpne punkter**: innholdet som skulle komme fra kundefilen (STATUS.md), spørsmålene fra runde 1.

## 24.09.2026, kveld: QA-gjennomgang før demo

**Gjort**

- Innhold lest mot kildene: tre egne formuleringer strammet til kundens ord, hardkodede strenger flyttet til `siteContent.js`, årstall fjernet fra hero (logo viser 2008, stiftet 2012), tidslinje med «[ÅR]: [Oppstart, bekreftes av Gjermund]». Null treff på tankestrek, forbudte ord og verktøyord. Commitmeldinger kontrollert.
- Bilder: alle `<img>` kontrollert for `width`/`height`, `alt` og lazy. Header-logo økt til 72-74 % av header-høyden. Logo som webp 128/256 med png-fallback. Bildescriptet lager nå også 400 px-variant.
- Skjermbilder av alle ruter (375/1440, utvalgte 768/1024) og spesialtilstander lagret i `docs/qa/skjermbilder/` (39 filer, palett-komprimert png, ca. 12 MB).
- axe-core på alle ruter: to moderate funn rettet, null etter.
- Lighthouse mobil: ytelse fra 60-69 til 90-96, CLS fra 0,25-0,29 til 0. Tiltak: selvhostede fonter med preload, `RouteFallback` i full høyde, forsiden eager, `fetchpriority` på hero, robots.txt. SEO 66 skyldes `noindex` (100 uten).
- Tastatur, `prefers-reduced-motion`, sessionStorage, SPA-fallback i preview, nettverkslogg og konsoll på feilruter verifisert.
- `npm run build` og `npm run lint` rene. Én commit: «QA-gjennomgang før demo».

**Beslutninger**: BESLUTNINGER.md, seksjon «QA». **Rapport**: `docs/qa/QA-RAPPORT.md`.

**Åpne punkter**: spørsmålene til kunden i QA-rapporten og STATUS.md.


## 24.09.2026: første bygg av demoen

**Gjort**

- Prosjekt satt opp fra tomt: Vite 5, React 18, react-router 6 (v7-future-flags), Tailwind 3.4 med `brand-*`-tokens som RGB-tripler i CSS-variabler, Biome, lucide-react, sharp 0.34.
- Alle 37 foto i `assets-raw/` åpnet og motiv bekreftet. `scripts/prepare-images.mjs` lager webp + jpg i 1920 og 800 px i `public/images/<mappe>/` med beskrivende navn, trimmer logoen (flood fill av bakgrunn), kopierer eventuell hero.mp4 og skriver `src/data/imageManifest.js`. `generate-favicons.mjs` og `generate-og-image.mjs` kjørt.
- Aksentfarge målt fra logoen (oransje `#F08003`). Nytt token `brand-accent-deep` for tekst på lys flate. Alle kombinasjoner målt til AA, se BESLUTNINGER.md.
- 13 datafiler i `src/data/`, 30 komponenter, 12 sider. Alle ruter i PROMPT.md punkt 2 bygd med fullt innhold. Forsiden i rekkefølgen i punkt 4.
- Handlekurv (`CartContext`, sessionStorage), skuff, kasse-mock. Skjemaer med validering, honeypot, `aria-live`, suksess.
- Visuell verifisering i headless Chrome via puppeteer-core (kun i scratchpad, ikke i repoet): alle ruter på 375 og 1440 px, åpen mobilmeny og handlekurv. Ingen konsollfeil, ingen horisontal overflow.
- Feil funnet og rettet underveis: `getImage` manglet `sizes` (krasjet Logo/Footer), Tailwind-opacity på `var()`-farger virket ikke (lagt om til `<alpha-value>`), lang tittel på kasse-siden overflowet på 375 px, produktkort for trange på mobil.
- `npm run build` og `npm run lint` rene. Git init på `dev`, commits per hovedpunkt.

**Beslutninger**: se BESLUTNINGER.md.

**Åpne punkter**: se STATUS.md, «KOVISION må gjøre manuelt». Viktigst: ekte Facebook-innlegg, videoer, priser, biler, produkter, ansatte, bekreftelse av merkebruk og bil1-3.
