# PROMPT: Bygg GT Maskin-demoen

Lim inn alt under streken som første melding i Claude Code (kjørt fra `gt-maskin_VS_code`). Forutsetter at innholdet i pakken ligger i roten av repo-mappen, og at logo og bilder ligger flatt i `assets-raw/`.

---

Du jobber for KOVISION og skal bygge en komplett demo-nettside for GT Maskin AS (gtmaskin.com) i denne mappen. Demoen skal vise en ny side som inneholder alt kunden har i dag, pluss tydelig ny verdi: levende Facebook-feed, videoseksjon, nettbutikk for deler, biler til salgs, utleie og en ordentlig om oss-side. Jobb selvstendig hele veien: ta egne, gode valg der noe er uavklart, ikke stopp for å spørre. Noter valgene dine i `BESLUTNINGER.md` underveis.

Ambisjonsnivå: demoen skal være bedre enn dagens side på alle punkter: raskere, renere, mer levende, mobil først, og med samme jordnære tone som kunden selv bruker. Ikke en omtegning, en oppgradering. Målet er at Gjermund Thomassen ser sin egen bedrift, bare bedre. Det ligger 46 ekte bilder i `assets-raw/`. Bruk dem godt, det er de som selger demoen.

## 0. Kilder (les disse først, i denne rekkefølgen)

1. `CLAUDE.md`: faste regler for stack, innhold, git og docs. Gjelder hele veien.
2. `_kilder/00-LES-MEG.md`: oversikt over kildene og hva som er verifisert.
3. `_kilder/FAKTA.md`: verifiserte fakta om bedriften. Kun dette brukes som fakta.
4. `_kilder/INNHOLDSKART.md`: dagens sidestruktur og den nye.
5. `_kilder/INNHOLD-RAATEKST.md`: kundens egne tekster ordrett, og ferdig ny sidetekst per seksjon.
6. `_kilder/RESSURSER.md`: hva hvert bilde i `assets-raw/` viser, regler for logo, aksentfarge og tredjeparts merker.
7. `_kilder/SOME-FEED-EKSEMPLER.md`: hvordan feed-kortene skal fylles nå.
8. `_kilder/DESIGNSYSTEM-GTMASKIN.md`: palett, tokens, typografi, komponenter.
9. `_kilder/INTEGRASJONER-GTMASKIN.md`: datastrukturer for feed, video, reviews, kanaler, biler, produkter, utleie.
10. `_kilder/design/reference-desktop.html` og `reference-mobile.html`: godkjent visuelt utkast. Åpne dem med Read og bruk dem som fasit for layout, seksjonsdesign og typografi. Seksjonsrekkefølgen på forsiden er oppdatert i punkt 4 under og gjelder foran referansefilene. Aksentfargen kan bli justert etter logoen, se punkt 3.
11. Bildene i `assets-raw/`: åpne hvert bilde med Read før du bruker det, og bekreft at motivet stemmer med beskrivelsen i `RESSURSER.md`.

Regler for tekst: kundens formuleringer beholdes, rene stavefeil rettes (list dem i `BESLUTNINGER.md`). Ny tekst hentes fra del B i `INNHOLD-RAATEKST.md`. Aldri tankestrek. Aldri ordene luksus, premium eller eksklusiv. Ikke dikt opp priser, tall, sitater eller fakta. Plassholdere skrives i klammer og skal synes som plassholdere.

## 1. Teknisk oppsett

- Ikke bruk `npm create vite` (mappen er ikke tom, kommandoen stiller et interaktivt spørsmål). Skriv filene selv: `package.json`, `vite.config.js`, `index.html`, `postcss.config.js`, `tailwind.config.js`, `biome.json`, `src/main.jsx`, `src/App.jsx`, `src/index.css`. Deretter `npm install` med `react`, `react-dom`, `react-router-dom` og dev-avhengighetene `vite`, `@vitejs/plugin-react`, `tailwindcss@3`, `postcss`, `autoprefixer`, `@biomejs/biome`, `sharp`, `lucide-react` (runtime).
- Scripts i `package.json`: `dev`, `build`, `preview`, `lint` (biome check), `format` (biome format --write), `favicons`, `og-image`.
- Aktiver react-router v7-future-flags. Kodesplitting per rute med `React.lazy` og `Suspense`. `ScrollToTop` ved rutebytte.
- Tailwind-tokens fra `DESIGNSYSTEM-GTMASKIN.md` i `tailwind.config.js`, CSS-variabler i `src/index.css`. Google Fonts-lenke i `index.html`.
- `index.html`: `lang="nb"`, `<meta name="robots" content="noindex">`, title, description, OG-meta som peker på `https://gt-maskin-demo.vercel.app` (byttes ved go-live), favicon-tagger.
- `vercel.json` med SPA-rewrite til `/index.html` og header `X-Robots-Tag: noindex` på alle ruter.
- `.gitignore` finnes allerede (`node_modules`, `dist`, `assets-raw/`, `.env*`).
- Alt innhold i `src/data/`: `companyFacts.js`, `siteContent.js` (tekst per side og seksjon), `services.js`, `cars.js`, `products.js`, `rental.js`, `team.js`, `timeline.js`, `socialFeed.js`, `videos.js`, `reviews.js`, `channels.js`, `brands.js` (merkenavn som tekst). Komponentene leser data, ingen hardkodet tekst i JSX der det kan unngås.
- `useSeoMeta`-hook som setter title og description per rute.
- Scripts i `scripts/`: `prepare-images.mjs` (kopierer bilder fra `assets-raw/` til `public/images/<mappe>/` med beskrivende navn, skalerer til maks 1920 px bredde, lager 800 px-variant til kort, konverterer til webp med jpg-fallback), `generate-favicons.mjs` (ico 16/32/48, PNG 192/512, apple-touch-icon 180 fra trimmet logo) og `generate-og-image.mjs` (1200×630 med herobilde og logo). Kjør alle tre.
- Init git med branch `dev`. Commit etter hvert hovedpunkt under (1 til 8). Git-kommandoer én og én, aldri `&&`. Ikke push, ikke opprett repo.

## 2. Sidestruktur (alle bygges med fullt innhold)

| Rute | Innhold |
|---|---|
| `/` | Forsiden, se punkt 4 |
| `/verksted` | PageHero (hero.jpg), tjenestene i detalj med bilder fra verkstedet (reparasjon og service, custom og speedshop, veteran og classic, europeiske biler og Tesla, maskiner og traktor der verksted7 passer, deler), slik jobber vi (tre steg), godkjent bilverksted og lærebedrift, galleri, CTA til bestilling |
| `/deler` | Nettbutikk-mock: intro, «Deler til Chevrolet, Dodge, Ram, Ford, Cadillac og Tesla» som tekstchips, kategorichips, produktrutenett fra `products.js`, søkefelt (filtrerer lokalt), handlekurv-skuff. Under: seksjon «Butikken i Myggveien» med butikkbildene og «I butikken: Amsoil, Fluid Film, Carhartt» som tekst |
| `/deler/:slug` | Produktside-mock: bilde, pris, beskrivelse, «Legg i kurv», «Send forespørsel om denne delen» |
| `/kasse` | Kasse-mock: handlekurv, skjema (navn, telefon, e-post, adresse, melding), «Send bestillingsforespørsel», suksess-tilstand. UI-only, merket som mock i BESLUTNINGER.md, alltid med telefon og e-post ved siden av |
| `/biler-til-salgs` | PageHero (vinter-bil-fasad.jpg), liste fra `cars.js` med plassholderkort (bil1-3 brukes IKKE her), tom tilstand med tekst fra råteksten |
| `/utleie` | PageHero (snowmobile.jpg), snøscooter 60 hk, snøscooter 120 hk, ATV (plassholder), tilhenger og biltransporthenger (tilhenger-bildene), safari-banner. Utleie-CTA-er lenker til https://www.snoscooterutleie.com (target _blank), safari til https://www.norsemantrail.com |
| `/om-oss` | Historie fra 2012, kundemottaket (butikk5-8), faktabokser, tidslinje, folkene, godkjenninger, lærlinger, sitat fra Alta Amcar Klubb med kilde |
| `/bestill` | Bestill verkstedtime: skjema med navn, telefon, e-post, bil (merke, modell, reg.nr.), ønsket uke eller dato (fritekst), hva som skal gjøres. UI-only med validering og suksess-tilstand |
| `/kontakt` | PageHero (herobilde-fasade.jpg), adressekort med lenke til Google Maps (aldri embed), åpningstider, telefon, e-post, Snapchat-QR, kontaktskjema UI-only |
| `/personvern` | Enkel personvernerklæring for en side uten sporing og uten cookies |
| `*` | 404-side i samme design med lenker til forsiden og kontakt |

Header: logo (trimmet logo1) ved siden av «GT MASKIN / KUSTOM SPEEDSHOP · ALTA», meny (Verksted, Deler, Biler til salgs, Utleie, Om oss, Kontakt), telefon og «Bestill time». Sticky. Mobilmeny som fullskjerms-overlay med ekte `<button aria-expanded>`, lukkes med Escape og ved rutebytte. Diskret sticky bunnlinje på mobil med «Ring» og «Bestill time».

Footer på alle sider: logo i badge, firmainfo med org.nr., lenkekolonner, Facebook-lenke, Snapchat-QR (liten, med tekst «Følg oss på Snapchat»), lenker til snoscooterutleie.com og norsemantrail.com, review-badges (skjult til `reviews.js` har data), «Levert av KOVISION» med gradient-hover.

## 3. Design

Følg `DESIGNSYSTEM-GTMASKIN.md` og referansefilene. Kort oppsummert:

- Mørk, industriell speedshop-stil: nesten sort grunnflate, benhvit lys flate, én aksentfarge. Skarpe hjørner. Bebas Neue til alle titler, Barlow til alt annet. Seksjoner veksler mørk og lys.
- Aksentfarge fra logoen: åpne `assets-raw/logo1.jpg`, hent dominant farge med sharp (ignorer nær sort og nær hvit). Er den oransje eller kobber, sett `brand-accent` til den og bruk `brand-primary` (nær sort) som tekst på aksentfyll i stedet for hvit. Sett `brand-accent-light` slik at den har minst 4.5:1 mot `#151412`. Er logoen rød, behold paletten. Mål begge og noter verdiene i `BESLUTNINGER.md`.
- Alle farger som `brand-*`-tokens. Verifiser WCAG AA på alle kombinasjoner i tabellen i designsystemet.
- Logo kun i header og footer. Ingen logo i hero. Logofilen er JPG: trim marger med sharp, sjekk om bakgrunnen er nær sort (da fungerer den rett på mørk header), ellers legg den i badge.
- Tredjeparts merkelogoer (Amsoil, Carhartt, Fluid Film, Chevrolet, Dodge, Ram, Ford, Cadillac, Tesla) vises aldri som bilder. Kun merkenavn som tekst, se `RESSURSER.md`.
- Plassholderkomponent (skrå striper, mørk og lys variant) der bilde mangler: ATV, biler til salgs, videoer, feed, portretter, team.
- PageHero-komponent for undersider med bilde, mørk overlay kun der teksten ligger, og fallback til plassholder ved bildefeil.

## 4. Forsiden (viktigst, i denne rekkefølgen)

1. **Hero**, video-klar: `HeroMedia`-komponent som viser mp4 hvis `assets-raw/hero.mp4` finnes (autoplay, muted, loop, poster, `prefers-reduced-motion` viser poster), ellers `herobilde.jpg`. Tekst og CTA-er som i råteksten. 2012-boksen over bildet beholdes.
2. **Tillitsstripe** med fem punkter og ikoner.
3. **«Live fra GT Maskin»**, sosial feed (ny verdi, skal synes godt): kortrutenett fra `socialFeed.js` med plattformmerke, dato, medietype, bilde, tekstutdrag, reaksjonstall der de finnes, play-overlay på video. Seksjonshoder viser kanalfakta fra `channels.js` med lenke til Facebook-siden. Kortene er plassholdere merket «PLASSHOLDER» til ekte innlegg er hentet, men bruk ekte bilder fra `assets-raw/` som bakgrunn i plassholderkortene (verksted, butikk, scooter) slik at seksjonen ser levende ut. Komponenten skal være blind for kilde: byttes til make.com-webhook uten komponentendring.
4. **Hva vi gjør**: seks tjenestekort som i referansen, hvert med et ekte bilde over ikonboksen (verksted, verksted9, butikk3, hero, butikk6, snowmobile), lenker til undersidene.
5. **«GT Maskin på film»**, videoseksjon (ny verdi): én stor featured spiller med poster og play-overlay pluss spilleliste, data fra `videos.js`. YouTube-iframe monteres først ved klikk (`youtube-nocookie.com`), egne mp4 med `preload="none"`. Tom liste viser merkede plassholdere med ekte bilder som poster.
6. **Biler til salgs**: tre plassholderkort fra `cars.js` og «Se alle biler».
7. **Deler og butikk**: merkechips som tekst, fire produktkort fra `products.js` (plassholdere), ett stort butikkbilde (butikk2 eller butikk4), «Gå til nettbutikken».
8. **Utleie**: fire kort med bilder der de finnes, pris-plassholdere, safari-banner.
9. **Om oss**, kortversjon: to avsnitt, bilde av kundemottaket, fire faktabokser, tidslinje, folkene. Lenke til `/om-oss`.
10. **Kontakt og bestilling**: adressekort med herobilde-fasade, åpningstider, telefon, e-post, og bestillingsskjemaet (samme komponent som `/bestill`).
11. Footer.

## 5. Integrasjoner og tillitssignaler

- Facebook-feed og kanalfakta som beskrevet i `INTEGRASJONER-GTMASKIN.md`. Facebook er eneste feed-kanal nå. Strukturen skal tåle Instagram og YouTube senere.
- Reviews: `reviews.js` starter tom. Badge-komponent for Google og Facebook-anbefalinger bygges ferdig og vises automatisk når data legges inn. Ingen tall før de er verifisert.
- Utleie og safari lenker til kundens eksisterende sider. Verkstedtime og deler bestilles via skjemaene (mock). Alle skjemaer har validering, honeypot-felt, `aria-live`, suksess-tilstand og synlig telefon og e-post ved siden av.
- Kart: adressekort med lenke til `https://www.google.com/maps/search/?api=1&query=Myggveien+3,+9514+Alta,+Norway`.

## 6. Bilder

- Kjør `scripts/prepare-images.mjs` først. Mapper i `public/images/`: `logo/`, `hero/`, `verksted/`, `butikk/`, `biler/`, `utleie/`, `bygg/`, `feed/`, `some/` (snapchat). Beskrivende filnavn uten æøå.
- `alt`-tekst på alle bilder som beskriver motivet (ikke firmanavn alene). Lazy-loading på alt under folden, `width` og `height` satt for å unngå layout shift.
- Bruk hvert bilde bare der motivet passer teksten. Aldri et bilde på feil bil, feil produkt eller som «bil til salgs» uten at det er bekreftet.
- Skriv `BILDELISTE.md`: hvert bilde som fortsatt mangler (ATV, portretter, biler til salgs, produkter, video, poster), ønsket motiv, hvor det brukes, anbefalt format og størrelse. Ta også med spørsmålene til Gjermund om bil1-3 (til salgs?) og om merkene (kan logoene brukes?).

## 7. Kvalitet, det som gjør demoen bedre

- Ytelse: webp med fallback, lazy-loading, kodesplitting per rute, video utenfor hero med `preload="none"`, ingen tredjeparts-script før brukeren klikker.
- Tilgjengelighet: semantisk HTML, ekte `<a>` og `<button>`, `<label>` på alle felt, alt-tekster, synlig fokus, tastaturnavigasjon i meny, spiller og handlekurv, touch-mål minst 44 px, kontrast minst 4.5:1 på all tekst.
- Responsivt hele veien, mobil først. Verifiser 375 px, 768 px, 1024 px og 1440 px, inkludert åpen mobilmeny og handlekurv-skuff.
- Subtile inn-animasjoner ved scroll (opacity og litt translate), respekter `prefers-reduced-motion`.
- Søk gjennom alt synlig innhold etter tankestrek og forbudte ord: null treff.
- `README.md` internt (erstatt den som ligger der): hvordan kjøre, hvor data ligger, hva som er mock, hvordan legge inn nye biler, produkter, videoer og feed-innlegg, hvordan kjøre bildescriptet på nytt.
- `docs/ARBEIDSLOGG.md` (én entry for denne økten: hva ble gjort, beslutninger, åpne punkter) og `docs/KONTEKST.md` (teknisk status).

## 8. Når du er ferdig

1. `npm run build` grønt, `npm run lint` rent, `npm run dev` viser alle ruter uten konsollfeil.
2. Skriv `STATUS.md`: hva som er bygget, hva som er plassholdere og mock, og punktliste over det KOVISION må gjøre manuelt (ekte Facebook-innlegg, videoer, priser og vilkår for utleie, biler til salgs, produktutvalg, ansatte og milepæler, reviews-tall, hovedtelefonnummer, bekrefte merkebruk og bil1-3).
3. Ikke deploy og ikke opprett repo på GitHub. Det gjøres senere.
4. Avslutt med en oppsummering på maks 15 linjer.
