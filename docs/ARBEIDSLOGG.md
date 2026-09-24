# ARBEIDSLOGG

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
