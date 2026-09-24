# ARBEIDSLOGG

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
