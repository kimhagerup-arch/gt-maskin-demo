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

## Runde 2 (07.10.2026): løft før kunden ser siden

Gjennomgang etter at videoside, butikk med klær og utstyr, biler til salgs med «Vi skaffer», kanaler, samlet utleie og utkastbanner ble bygd. Skjermbilder i `docs/qa/skjermbilder/runde-2/` (50 filer): alle ruter ved 375 og 1440 px, pluss mobilmeny, utkastbanner (åpent og lukket), klesfilter, biljakt-skjema med feil og suksess, utleie-, kontakt- og kasse-skjema med feil og suksess, handlekurv med to størrelser og kontaktsiden med kanaler.

Innholdsfilen `_kilder/INNHOLD-FRA-GJERMUND.md` finnes ikke, så alt nytt innhold står som plassholdere. Det som er verifisert i denne runden er struktur, oppførsel, tilgjengelighet og ytelse.

### Funn og status

| # | Funn | Status |
|---|---|---|
| 21 | Forsiden fikk horisontal overflow på 375 px (lange spillelistetitler i videoseksjonen presset ut rutenettet) | Rettet: `min-w-0` på gridkolonnene og `overflow-hidden` på knappene |
| 22 | Forsiden fikk horisontal overflow på 768 px (SectionHeader med ingress i høyre slot var `shrink-0`) | Rettet: `md:max-w-[50%]` på slotten |
| 23 | axe: utkastbanneret lå utenfor landemerker (moderate, alle ruter) | Rettet: banneret er en `<aside aria-label>` |
| 24 | axe: bildelenker på produktkort og bilkort hadde `aria-label` som ikke inneholdt den synlige plassholderteksten (serious) | Rettet: `sr-only`-tekst i stedet for `aria-label` |
| 25 | axe: etiketten «Fylles inn» på plassholderen bak solgt eksempelbil fikk for lav kontrast fordi hele plassholderen var nedtonet (serious) | Rettet: plassholderen nedtones ikke, bare ekte bilder |
| 26 | axe meldte kontrastfeil på `/utleie` som skyldtes at inn-animasjonen (opacity) ikke var ferdig da målingen startet | Ikke en feil på siden. Testscriptet venter nå til animasjonen er ferdig |
| 27 | Lighthouse `/video` 87: LCP-bildet (firmabilen, 101 kB på 800 px) var for tungt | Rettet: hero-bilde byttet til fasaden på dagtid (31 kB), 90 etter |
| 28 | Snapchat-QR ble vist to ganger på `/video` (både i SocialLinks og separat) | Rettet |
| 29 | Footerens lenkekolonner ble for smale på 1440 px etter at kanalkolonnen kom til | Rettet: 4/5/3-fordeling |
| 30 | README nevnte filnavnet på prosjektinstruksen | Rettet: omskrevet til «prosjektinstruksen» |
| 31 | QA-skjermbilder i full høyde manglet lazy-lastede bilder langt ned på siden | Ikke en feil på siden. Scriptet ruller gjennom siden før skjermbildet |

### Lighthouse (mobil, `npm run preview`, etter retting)

| Rute | Ytelse | Tilgjengelighet | Beste praksis | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 91 | 100 | 100 | 69* | 3,5 s | 0 | 20-40 ms |
| `/video` | 90 (87 før bytte av hero-bilde) | 100 | 100 | 69* | 3,5 s | 0 | 0 ms |
| `/utleie` | 90 | 100 | 100 | 69* | 3,5 s | 0 | 0 ms |
| `/biler-til-salgs` | 93 | 100 | 100 | 69* | 3,1 s | 0 | 0-10 ms |

\* `noindex` er bevisst i demoen. Utkastbanneret gir ingen CLS (lukket tilstand leses før første render). LCP er hero-bildet på alle fire ruter; neste løft er lettere eller færre piksler i hero-bildene, eventuelt et nytt hovedbilde fra kunden.

### axe-core

18 ruter (inkludert `/deler?gruppe=klaer`, `/deler/produkt-9`, `/biler-til-salgs/eksempel-bil`, `/biler-til-salgs/eksempel-solgt`, `/biler-til-salgs/finnes-ikke`, `/video`) ved 375 og 1440 px, regelsett wcag2a, wcag2aa, wcag21a, wcag21aa, best-practice: 0 funn etter retting (tre funntyper før, se 23-25).

### Nettverk og video

- Ingen eksterne kall før klikk på noen av de 18 rutene (alle verter logget i headless Chrome).
- Videospilleren er testet med en midlertidig Facebook-video-URL og en midlertidig YouTube-ID i dev (ikke committet): før klikk 0 eksterne kall; etter klikk monteres iframe mot `facebook.com/plugins/video.php` respektive `youtube-nocookie.com/embed`, og video lastes fra `fbcdn.net` respektive `googlevideo.com`. Begge spillerne viste innhold.

### Skjemaer og handlekurv

| Skjema | Feiltilstand | Suksess |
|---|---|---|
| Biljakt (`/biler-til-salgs#vi-skaffer`) | «Fyll inn navn, merke og modell, og enten telefon eller e-post.», 4 felt markert | «Takk! Vi har mottatt ønsket ditt og tar kontakt.» |
| Utleie (`/utleie#utleieforesporsel`) | «Fyll inn type, datoer, navn og enten telefon eller e-post.», 6 felt markert. Til-dato før fra-dato gir «Til-dato kan ikke være før fra-dato.» | «Takk! Vi har mottatt forespørselen og tar kontakt for å bekrefte.» |
| Kontakt | «Fyll inn navn, melding og enten telefon eller e-post.», 4 felt | «Takk! Vi har mottatt forespørselen din og tar kontakt.» |
| Bestilling (`/kasse`) | «Fyll inn navn og enten telefon eller e-post.» | Suksess-boks, kurven tømmes |

Handlekurv: klesplagg med størrelsesvelger lagt i kurven i to størrelser gir to linjer (verifisert med midlertidige størrelser S, M, L på et plassholderprodukt i dev, ikke committet). Med `sizes: []` vises velgeren deaktivert med «[Størrelser bekreftes]». Sticky mobil-CTA skjules når alle fem skjemaer er i viewport. Utkastbanneret lukkes og forblir lukket ved rutebytte (sessionStorage). URL-filteret `?gruppe=klaer&kategori=klaer` gir valgt gruppe og kategori ved direkte åpning.

### Innhold

Søk etter tankestrek, forbudte ord og verktøyord i `src`, `public`, `index.html`, `docs`, README, BESLUTNINGER, STATUS og BILDELISTE: null treff i synlig innhold. «snoscooterutleie.com» finnes ikke lenger i `src` eller `index.html`. Commitmeldinger er uten medforfatter-linjer.

### Gjenstående

1. Alt i tabellen «Innholdsfilen fra kunden mangler» i STATUS.md: Facebook-innlegg, videolenker, Snapchat-brukernavn, scooterdomenets innhold, nytt hovedbilde, hero-video.
2. Spørsmålene fra runde 1 (årstall 2008/2012, bil1-3, merkelogoer, maskiner og traktor, telefonnummer, priser, produkter, ansatte).
3. LCP på 3,1-3,5 s er bundet til hero-bildene; et lettere hovedbilde fra kunden kan løfte ytelsen videre.

## Rask designretting (08.10.2026): kustom-emblem i hero

Kun forsiden er berørt. Skjermbilder av hero i `docs/qa/skjermbilder/runde-2/hero-emblem-{375,1024,1440}.png` (fra `npm run preview`).

| Sjekk | Resultat |
|---|---|
| `npm run build`, `npm run lint` | rene |
| axe-core `/` ved 375 og 1440 px | 0 funn |
| Lighthouse mobil `/` (to kjøringer) | ytelse 90, tilgjengelighet 100, beste praksis 100, LCP 3,5 s, CLS 0, TBT 60 ms |
| Kontrast bak emblemteksten (verste piksel) | 6,05:1 til 12,66:1, alle AA. Tabell i BESLUTNINGER.md |
| Overlapp med bilen i bildet | ingen på 1024, 1280 og 1440 px |
| Mobil 375 px | emblemet ligger i flyt under bildet, ingen overlapp med tekst eller knapper, ingen horisontal overflow |
| Hover og redusert bevegelse | glans fades inn på 0,3 s fra 768 px; med `prefers-reduced-motion` er overgangen 0,00001 s |
| Konsollfeil | ingen |

## Runde 3 (20.10.2026): videovisning, merkefarger, Snapchat, safari ut

Branch `feature/runde-3`, mot `npm run preview` i headless Chrome. Skjermbilder i `docs/qa/skjermbilder/runde-3/` (50 filer: alle ruter på 375 og 1440 px, `/`, `/video` og `/utleie` også på 320, 768 og 1024 px, pluss reel som spiller og Snapchat-profilen etter klikk).

### Sjekker

| Sjekk | Resultat |
|---|---|
| `npm run build`, `npm run lint` | rene |
| 15 ruter × 320, 375, 768, 1024, 1440 px | `scrollWidth` lik viewport overalt, ingen konsollfeil eller -advarsler fra vår kode |
| axe-core på alle ruter ved 375 og 1440 px | 0 funn |
| Eksterne kall før klikk | ingen, på alle ruter og bredder |
| Facebook-reel etter klikk på play (`/video` 1440, `/` 375) | plugin-iframe montert, video 720×1280 lastet (`readyState` 4). Autoplay starter ikke i headless; pluginen trenger ett klikk til (se BESLUTNINGER.md) |
| Snapchat-profil etter klikk på «Vis Snapchat-profilen» | iframe 416×692 mot `/@gtmaskin-as/embed` viser profilkortet med navn, sted, «Amerikansk bilverksted» og historier |
| Slider | kortvalg bytter video og markerer kortet (`aria-pressed`), spilleren rulles inn; piler blar ett kort og er deaktivert i endene; sporet kan sveipes på 375 px med neste kort synlig i kanten |
| Snapchat-knapper | header fra 768 px åpner dialog (QR, @gtmaskin-as, «Åpne i Snapchat»), Escape lukker og fokus går tilbake; mobilmeny lenker direkte til profilen |
| Header 320, 360, 375, 390, 430 px | undertittelen på én linje, «· ALTA» skjult under 380 px |
| Tankestrek, forbudte ord, verktøyord | null treff i synlig innhold |
| Kontrast (`scripts/check-contrast.mjs`) | alle kombinasjoner AA, inkludert de nye kanalfargene (4,82:1 og 19,18:1) |

### Lighthouse (mobil, `npm run preview`)

| Rute | Ytelse (2 kjøringer) | Tilgjengelighet | Beste praksis | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 90, 90 | 100 | 100 | 69 | 3,5 s | 0 | 20-30 ms |
| `/video` | 90, 90 | 100 | 100 | 69 | 3,5 s | 0 | 0 ms |
| `/utleie` | 90, 90 | 100 | 100 | 69 | 3,4 s | 0 | 0 ms |

SEO under 100 skyldes `noindex` (bevisst til go-live).

### Konsoll og DevTools-issues

| Kilde | Funn | Håndtering |
|---|---|---|
| Vår kode | ingen konsollfeil eller -advarsler. Én DevTools-issue, `LazyLoadImageIssue`, for de tre scooterbildene i utleiebanneret på hver last, og sporadisk for footer-logoen på korte sider. | Rettet: scooterbildene og miniatyrene monteres etter `load` uten `loading="lazy"`, footer-logoen lastes eagert (samme fil som i header). Etter retting er meldingen sporadisk: i siste fullkjøring 4 av 75 laster (forsiden 3, `/video` 1), i 47 kontrollaster med samme prosedyre null. Den er en rådgivende melding fra Chrome om lazy-bilder nær viewport i lastøyeblikket, ikke en feil, og gir ingen utslag i Lighthouse |
| Facebook (etter klikk på reel) | ingen konsollfeil, -advarsler eller DevTools-issues fra Facebook-pluginen i testen | Facebooks iframe, ikke noe vi kan endre |
| Snapchat (etter klikk på profil) | `CookieIssue` (56-64 per side) fra Snapchats egen profilvisning: tredjeparts-cookies i iframen | Snapchats iframe (profilvisningen laster også Google Analytics og Tag Manager hos seg), ikke noe vi kan endre |

### Gjenstående

1. Titler, stillbilder og datoer for de seks videoene, og resten av tabellen i STATUS.md.
2. Bytte produsentbildet av scooteren (`ac-profil.jpg`) før go-live.
3. Sjekke i en vanlig nettleser om Facebook-reelen starter av seg selv etter klikk på play; i headless krever pluginen ett klikk til.

## Runde 3b (21.10.2026): seksjonshoder, runde ikonknapper, radius, Snapchat-telefon

Skjermbilder i `docs/qa/skjermbilder/runde-3b/` (15 filer: header, hero, «Live fra GT Maskin», Snapchat-seksjonen før og etter klikk, skjema, mobilmeny, QR-dialog og kontaktsiden, på 375 og 1440 px).

| Sjekk | Resultat |
|---|---|
| `npm run build`, `npm run lint` | rene |
| `/`, `/video`, `/kontakt`, `/utleie` × 320, 375, 768, 1024, 1440, 1920 px | `scrollWidth` lik viewport, ingen konsollfeil eller -advarsler |
| axe-core ved 375, 1440 og 1920 px | 0 funn |
| Eksterne kall før klikk | ingen |
| Lighthouse mobil | `/` 92 og `/video` 90 (to kjøringer hver, pluss `/utleie` 90), tilgjengelighet 100, beste praksis 100, CLS 0 |
| Merkefarger (`getComputedStyle`, 83 flater på fire ruter, mobilmeny og dialog) | Facebook `rgb(8, 102, 255)` overalt, Snapchat `rgb(255, 252, 0)` overalt, ikonknapper 44 × 44 px, radius 9999 px |
| Snapchat-telefon etter klikk | profilvisningen lastes i rammen og viser profilkort og historier |
