# GT Maskin AS: demo-nettside

Demo-nettside for GT Maskin AS (Kustom Speedshop), bilverksted i Alta spesialisert på amerikanske biler, custom-prosjekter, delesalg og utleie av snøscooter, ATV og henger. Bygges av KOVISION v/ Kim-Ove Hagerup. Kunde: Gjermund Thomassen (daglig leder og eier).

Kildene ligger i `_kilder/`. Les `_kilder/00-LES-MEG.md` først. Byggeoppdraget står i `PROMPT.md`.

## Stack (fast, ikke bytt)

- Vite + React 18 (SPA), JavaScript/JSX, `react-router-dom` v6 med v7-future-flags aktivert
- Tailwind CSS 3.4 med `tailwind.config.js`, alle farger som `brand-*`-tokens (se `_kilder/DESIGNSYSTEM-GTMASKIN.md`)
- `lucide-react` for ikoner (tre-shaked), ingen emoji
- Google Fonts: Bebas Neue (display) og Barlow (brødtekst), lastet i `index.html`
- Biome for lint og format (`npm run lint`, `npm run format`)
- Ingen backend, ingen database, ingen miljøvariabler i demoen
- Deploy skjer senere til Vercel (`vercel.json` med SPA-rewrite og `X-Robots-Tag: noindex` skal ligge klar)

## Kommandoer

```
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

`npm run build` og `npm run lint` skal være rene før hver commit.

## Innholdsregler (gjelder alt synlig innhold)

- Norsk bokmål. Aldri tankestrek (–) i tekst: bruk komma, punktum eller kolon. Intervaller skrives med kort bindestrek (08:30-16:00, 2012-2026).
- Stillingstitler med små bokstaver i løpende tekst («Gjermund Thomassen, daglig leder»).
- Tone: jordnær og solid. Forbudte ord: luksus, premium, eksklusiv. Foretrukket: solid, kvalitet, erfaring, lokalkunnskap, entusiast.
- Kundens egne formuleringer beholdes (se `_kilder/INNHOLD-RAATEKST.md`). Rene stavefeil i kildeteksten rettes og listes i `BESLUTNINGER.md`. Ikke omskriv, forkort eller «forbedre» innholdet ut over det.
- Ikke finn på fakta: priser, antall ansatte, kunder, garantier, svartider, anmeldelser. Kun `_kilder/FAKTA.md` er kilde. Mangler noe: plassholder tydelig merket i klammer, aldri noe som ser ekte ut.
- Verktøy og assistenter som er brukt i arbeidet nevnes aldri: ikke i innhold, kode, kommentarer, commits eller docs.
- Alt innhold ligger i `src/data/`. Ingen tekst hardkodet i komponenter der det kan unngås.

## Design

- Følg `_kilder/DESIGNSYSTEM-GTMASKIN.md` og referansefilene i `_kilder/design/`.
- Aldri hardkodede hex-verdier i komponenter, kun `brand-*`-klasser.
- Logo kun i header og footer, aldri i hero. Uten logofil: tekstmerke.
- Adressekort med lenke til kart, aldri kart-embed.
- «Levert av KOVISION» i footer på alle sider, lenket til https://kovision.no, med hover-gradient fra `kovision-cyan` (#22d3c8) til `kovision-gold` (#d4a843). To lag: grunntekst alltid synlig, gradientlag med `bg-clip-text` (med webkit-prefiks) som fades inn via `group-hover`.

## Integrasjoner

- Facebook-feed: statisk `src/data/socialFeed.js` med nøyaktig samme objektform som make.com-webhooken leverer i drift (se `_kilder/INTEGRASJONER-GTMASKIN.md`). Komponenten er blind for kilde.
- Video: `src/data/videos.js`, YouTube-embed lastes først ved klikk, egne mp4 med `preload="none"`.
- Reviews: `src/data/reviews.js`. Tom liste = badge og seksjon skjules. Aldri oppdiktede tall.
- Kontaktskjema og bestillingsskjema: UI-only med validering og suksess-tilstand, klargjort for Resend senere.
- Nettbutikk: mock (produktliste, produktside, handlekurv-skuff, kasse-skjema UI-only). Merket som mock i `BESLUTNINGER.md`.

## Git

- Kjør git-kommandoer én og én. Aldri `&&`-kjeding.
- Commit i fornuftige steg med korte, beskrivende meldinger på norsk. Ingen medforfatter-linjer.
- Aldri `git push`, `git reset --hard`, `git clean` eller opprettelse av GitHub-repo. Det gjør Kim-Ove.
- Branch: `dev`.

## Dokumenter som skal holdes oppdatert i repoet

- `BESLUTNINGER.md`: valg tatt underveis med begrunnelse, målte kontrastverdier, hva som er mock.
- `STATUS.md`: hva som er bygget, hva som er plassholdere, hva KOVISION må gjøre manuelt.
- `BILDELISTE.md`: alle bilder som må hentes, med ønsket motiv og hvor de skal brukes.
- `docs/ARBEIDSLOGG.md` og `docs/KONTEKST.md`: kun teknisk innhold.

## Windows-notater

- Prosjektstien skal ikke inneholde æøå eller mellomrom.
- Bruk `npx` foran verktøy, ikke globale installasjoner.
- `assets-raw/` er gitignored og inneholder logo og bilder hentet manuelt.
