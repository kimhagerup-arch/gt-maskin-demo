# QA-RAPPORT: GT Maskin-demo

Dato: 24.09.2026. Branch `dev`. Gjennomgang før demoen vises for kunden. Skjermbilder i `docs/qa/skjermbilder/` (alle ruter ved 375 og 1440 px, `/`, `/deler` og `/verksted` også ved 768 og 1024 px, pluss mobilmeny, handlekurv, skjema med feil og suksess, footer-hover og fokus-tilstander).

## Funn og status

| # | Funn | Status |
|---|---|---|
| 1 | Årstall 2012 i hero-kicker og hero-boks, mot «2008» i logoen | Rettet: fjernet fra hero, faktaboks «2012 / GT Maskin AS stiftet», tidslinje starter med «[ÅR]: [Oppstart, bekreftes av Gjermund]» |
| 2 | To egne formuleringer som ikke var kundens ord (kundemottak, biler til salgs) | Rettet i `siteContent.js` |
| 3 | Hardkodede strenger i JSX (Les mer, Lager, om oss-titler, kasse-validering) | Rettet, flyttet til `siteContent.js` |
| 4 | Kodekommentarer om automatisk skrevne filer var uheldig formulert | Rettet |
| 5 | Header-logo 50-56 % av header-høyde | Rettet: 72-74 % målt |
| 6 | Logo lastet 512 px png (380 kB) på 2x-skjermer | Rettet: webp 128/256 px med png-fallback |
| 7 | axe: sticky mobil-CTA utenfor landemerke (moderate) | Rettet: `<nav aria-label>` |
| 8 | axe: h1 til h3 på `/deler` og `/biler-til-salgs` (moderate) | Rettet: skjult h2 |
| 9 | Lighthouse: Google Fonts-CSS blokkerte rendering, fontbytte ga CLS | Rettet: selvhostede woff2 med preload |
| 10 | Lighthouse: footer flyttet seg ved lazy-lasting (CLS 0,25) | Rettet: fallback `min-h-screen` |
| 11 | Lighthouse: LCP-bilde oppdaget sent | Rettet: forsiden eager, `fetchpriority="high"` og preload av hero-webp i `index.html` |
| 12 | Lighthouse: logo-lenke med aria-label ulik synlig tekst | Rettet |
| 13 | Manglende robots.txt | Rettet (`Disallow: /` i demo) |
| 14 | Tom handlekurv viste sum og bestillingsknapp | Rettet |
| 15 | Suksess-boks i skjema strukket til full høyde | Rettet |
| 16 | 1 px overflow på `/kasse` ved 375 px | Rettet |
| 17 | SEO-score 66 pga. `noindex` | Ikke rettet, bevisst i demo. Målt til 100 uten `noindex` |
| 18 | Lighthouse «uses-responsive-images» på noen kort (13-42 kB) | Delvis: 400 px-variant lagt til. Rest er 800 px på 2x-skjerm, akseptert |
| 19 | «Maskiner og traktor» på `/verksted` bygger på ett bilde | Ikke rettet, synlig plassholder for bekreftelse |
| 20 | Selvhostede fonter var feil subsett (latin-ext uten A-Z), synlig som Impact på skjermbildene | Rettet: riktige latin-filer, glyfer verifisert med fontkit |

## Lighthouse (mobil, `npm run preview`, etter retting)

| Rute | Ytelse | Tilgjengelighet | Beste praksis | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 90-96 (to kjøringer) | 100 | 100 | 66* | 2,7-3,5 s | 0 | 20 ms |
| `/deler` | 94 | 100 | 100 | 66* | 2,9 s | 0 | 0 ms |
| `/kontakt` | 96 | 100 | 100 | 66* | 2,6 s | 0 | 0 ms |

\* `noindex` er bevisst i demoen. Uten `noindex` og med `Allow` i robots.txt: SEO 100 (målt). Før retting var ytelse 60, 65 og 69.

## axe-core

Alle 12 ruter ved 375 og 1440 px, regelsett wcag2a, wcag2aa, wcag21a, wcag21aa, best-practice: 0 funn etter retting (2 moderate før).

## Annet verifisert

- Konsoll ren på alle ruter, også `/404-test`, `/deler/finnes-ikke` og `/kasse` med tom kurv.
- Ingen horisontal overflow på 375, 768, 1024 eller 1440 px.
- Nettverk på forsiden: kun egne filer. Ingen eksterne kall før brukeren klikker.
- `npm run preview` og direkte åpning av `/verksted` og `/deler/finnes-ikke` gir 200 (SPA-fallback).
- Handlekurv: vare overlever reload (sessionStorage), tom tilstand med lenke til `/deler`.
- Tastatur: logisk rekkefølge, synlig fokus, Escape lukker meny og kurv med fokus tilbake til åpneknappen.
- `prefers-reduced-motion`: ingen inn-animasjoner, ingen video.
- Oransje aksent alltid med mørk tekst (knapper, chips, ikonbokser, sticky CTA). Ingen hardkodet hex i komponenter.
- Alle chunker under 250 kB gzip (hovedchunk 83 kB gzip inkludert React og forsiden).

## Gjenstående spørsmål til kunden

1. Hva står «2008» i logoen for? Når startet virksomheten? (tidslinje og hero er nøytrale til svaret kommer)
2. Er bil1-3 til salgs, kundebiler eller egne?
3. Kan merkelogoene (Amsoil, Fluid Film, Carhartt, Chevrolet, Dodge, Ram, Ford, Cadillac, Tesla) brukes?
4. Hvilke maskiner og traktorer tas inn på verkstedet?
5. Hovedtelefonnummer: 911 14 628, 90 12 35 44 eller 47 37 23 65?
6. Priser og vilkår for utleie, biler til salgs, produktutvalg, ansatte, milepæler, videoer, ekte Facebook-innlegg.

Demoen er klar til å vises. Alt som er plassholder er tydelig merket i klammer.
