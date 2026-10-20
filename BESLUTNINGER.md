# BESLUTNINGER

Valg tatt under bygget av demoen, med begrunnelse. Oppdateres ved endringer.

## 1. Aksentfarge fra logoen

Logoen (`assets-raw/logo2.jpg`) er tydelig oransje. Dominant mettet farge målt med sharp (nær sort, nær hvit og grå ignorert): `#EB7D02`, `#F58304`, `#F57C04`, `#EC8204`. Snittet er satt til `#F08003`. Paletten er derfor endret fra rød til oransje.

Bright oransje har for lav kontrast som tekst på lys flate (2,2:1 mot `#F3EFE7`). Ett aksent-token holder derfor ikke, og paletten har fått et ekstra token:

| Token | Hex | Bruk |
|---|---|---|
| `brand-accent` | `#F08003` | Fyll: primær CTA, ikonbokser, streker. Tekst på fyll er alltid `brand-primary`, ikke hvit |
| `brand-accent-light` | `#F79A2B` | Tekst, ikoner og kicker på mørk flate, hover på lenker |
| `brand-accent-deep` | `#9C4A08` | Tekst, kicker, priser og understrek på lys flate (nytt token, erstatter «rød tekst på lys flate») |
| `brand-accent-hover` | `#D46F02` | Hover på primær CTA |

Målte kontraster (WCAG AA, `node scripts/check-contrast.mjs`):

| Kombinasjon | Farger | Kontrast | AA |
|---|---|---|---|
| Tekst brand-primary på aksentfyll (knapper, ikonbokser) | #151412 på #F08003 | 6.83:1 | bestått |
| Tekst brand-primary på aksent hover | #151412 på #D46F02 | 5.32:1 | bestått |
| Aksent lys tekst på primær (kicker, lenker på mørk flate) | #F79A2B på #151412 | 8.43:1 | bestått |
| Aksent lys tekst på mørkt kort | #F79A2B på #1F1D1A | 7.70:1 | bestått |
| Aksent på primær (ikoner, streker) | #F08003 på #151412 | 6.83:1 | bestått |
| Aksent dyp tekst på lys flate (kicker, priser) | #9C4A08 på #F3EFE7 | 5.39:1 | bestått |
| Aksent dyp tekst på hvitt kort | #9C4A08 på #FFFFFF | 6.18:1 | bestått |
| Aksent dyp tekst på surface | #9C4A08 på #E4DED2 | 4.62:1 | bestått |
| Hvit tekst på aksent dyp | #FFFFFF på #9C4A08 | 6.18:1 | bestått |
| Brødtekst invers på primær | #F3EFE7 på #151412 | 16.05:1 | bestått |
| Brødtekst invers på mørkt kort | #F3EFE7 på #1F1D1A | 14.66:1 | bestått |
| Nedtonet invers på primær | #B9B2A6 på #151412 | 8.75:1 | bestått |
| Nedtonet invers på mørkt kort | #B9B2A6 på #1F1D1A | 7.99:1 | bestått |
| Brødtekst på lys flate | #151412 på #F3EFE7 | 16.05:1 | bestått |
| Nedtonet på lys flate | #5E5850 på #F3EFE7 | 6.13:1 | bestått |
| Nedtonet på hvitt kort | #5E5850 på #FFFFFF | 7.03:1 | bestått |
| Nedtonet på surface (plassholder lys) | #5E5850 på #E4DED2 | 5.25:1 | bestått |
| Plassholdertekst på plassholder mørk | #9C9487 på #23211E | 5.35:1 | bestått |
| Copyright-linje i footer | #8F877A på #0F0E0D | 5.43:1 | bestått |
| Hvit tekst og merke på Facebook-blått (knapper, Messenger) | #FFFFFF på #0866FF | 4.82:1 | bestått |
| Svart tekst på Snapchat-gult (knapper, kort) | #000000 på #FFFC00 | 19.18:1 | bestått |
| Gul tekst på svart knapp i Snapchat-kortet | #FFFC00 på #000000 | 19.18:1 | bestått |
| Tekst i footer | #F3EFE7 på #0F0E0D | 16.82:1 | bestått |

Fargene ligger som RGB-tripler i CSS-variabler (`src/index.css`) og eksponeres i Tailwind med `<alpha-value>`, slik at `bg-brand-primary/70` og gradienter fungerer. Resten av paletten er uendret fra designsystemet.

## 2. Logo

- `logo1.jpg` er et foto av et fysisk skilt med aluminiumsramme og vindusrefleks i kantene. `logo2.jpg` er samme logo på mørk, jevn bakgrunn uten ramme (RESSURSER.md beskriver den som lys eller grå, det stemmer ikke). `logo2.jpg` er brukt som kilde.
- Bakgrunnen fjernes i `scripts/prepare-images.mjs` med flood fill fra kantene (bare mørke, umettede piksler som henger sammen med kanten), slik at mørke felt inne i skjoldet beholdes. Deretter trimmes marger og tynne kantrester. Resultat: `public/images/logo/gt-maskin-logo-512.png` og `-128.png` med gjennomsiktig bakgrunn.
- Logoen ligger rett på mørk header. I footer ligger den i en mørk badge (`brand-primary-light` med kant). Ingen logo i hero.
- Favicon-sett og OG-bilde er laget fra den trimmede logoen.
- Logoen har skiltet «2008», mens selskapet er stiftet 2012 (FAKTA.md). Ikke endret. Spørsmål til Gjermund: hva står 2008 for?

## 3. Bilder

- Alle 37 foto i `assets-raw/` er åpnet og motivet bekreftet mot RESSURSER.md før bruk. Avvik: `vinter-bil-fasad.jpg` heter `vinter-bil-fasadeskilt.jpg`. `tilhenger3.jpg` er identisk med `tilhenger.jpg` og hoppes over. `logo2.jpg` har mørk bakgrunn, ikke lys.
- Tredjeparts logoer (Amsoil, Carhartt, Fluid Film, Cadillac, Chevrolet, Ram, Dodge, Ford, Tesla) kopieres ikke til `public/`. Merkenavn vises kun som tekstchips. **Bekreftes av kunden:** «Deler til Chevrolet, Dodge, Ram, Ford, Cadillac og Tesla» og «I butikken: Amsoil, Fluid Film, Carhartt».
- `bil1-3.jpg` brukes kun nøytralt (galleri på /verksted). Ikke i «Biler til salgs» før Gjermund bekrefter.
- Forside-hero bruker `herobilde.jpg` som RESSURSER.md angir. Bildet er 886 px bredt og har «GT MASKIN / Kustom Speedshop» innbakt. Det er beskåret med `object-position: 18% 50%` så bilfronten og skriften kommer med. Anbefaling i BILDELISTE.md: nytt høyoppløst hovedbilde.
- OG-bildet bruker `herobilde-fasade.jpg` (fasaden med skilt) i stedet for `herobilde.jpg`, fordi det er skarpere og ikke har tekst i bildet fra før.
- Om oss-siden har `utside1.jpg` (bygget med klassikere) som PageHero, slik at `hero.jpg` ikke brukes to steder.
- `butikk9.jpg` (capser) viser et merke (Stetson) som ikke står i kildene. Bildet brukes nøytralt som «capser» uten merkenavn i tekst.
- Bildene leveres som webp med jpg-fallback i maks 1920 px og 800 px bredde, med `width`/`height` fra `src/data/imageManifest.js` (skrives av bildescriptet).

## 4. Stavefeil rettet i kundens tekst

reperasjon → reparasjon · amrikanske → amerikanske · rustene → rustne · ett bilverksted → et bilverksted · Entusiast bil → entusiastbil · biltransport henger → biltransporthenger · Snøscooter safari → snøscootersafari · Store forbokstaver midt i setning (Amerikanske, Butikk/Kundemottak, TESLA) er normalisert.

## 5. Innhold

- Ny tekst er hentet fra `_kilder/INNHOLD-RAATEKST.md` del B. Der del B mangler tekst (detaljseksjonene på /verksted, kundemottak-seksjonen på /om-oss, personvern, ingress på undersider) er teksten satt sammen av kundens egne formuleringer uten nye fakta.
- Seksjonen «Maskiner og traktor» på /verksted bygger på `verksted7.jpg` (traktor på verkstedgulvet) og vedtektsfestet formål (maskinentreprenør). Teksten har en synlig plassholder: «[Bekreftes av Gjermund: hvilke maskiner dere tar inn]».
- Facebook-tallet (1 023 liker siden, 31 har vært her) vises i feed-hodet med dato «Tall fra Facebook 22. september 2026». Ingressen sier «Over 1 000».
- Alle priser, ansatte ut over Gjermund, milepæler etter 2012, produkter, biler til salgs og anmeldelser er plassholdere i klammer. Videoene er ekte fra 20.10.2026 (se «Ekte videoer fra Facebook»).
- Personvernteksten er skrevet ut fra den korte bestillingen i del B (ingen sporing, ingen cookies, skjemaer sender kun det brukeren fyller inn, handlekurv i sessionStorage).

## 6. Seksjonsrytme forsiden

Rekkefølgen følger PROMPT.md punkt 4. Bakgrunner: hero (mørk), tillitsstripe (mørk-lys), feed (lys), tjenester (lys, skilt med kant, godtatt i designsystemet), video (mørk), biler til salgs (mørkere `primary-dark` med kanter, for å skille fra video), deler (lys), utleie (mørk), om oss (lys), kontakt (mørk), footer.

## 7. Mock og UI-only

- **Nettbutikk** (`/deler`, `/deler/:slug`, `/kasse`): mock. Produktliste med lokalt søk og kategorifilter, handlekurv-skuff (`CartContext`, sessionStorage), kasse-skjema som sender «bestillingsforespørsel». Ingen betaling, ingen nettverkskall. Merket med tekst på siden: «Nettbutikken er en demo …».
- **Skjemaer** (bestilling, kontakt, kasse): UI-only. Validering i klient, honeypot-felt, `aria-live`, suksess-tilstand. `src/lib/forms.js` har én `submitForm(kind, payload)` som i dag returnerer `{ ok: true }` etter 600 ms og senere kalles mot Resend.
- **Facebook-feed**: statiske plassholderkort i `src/data/socialFeed.js` med samme objektform som make.com-webhooken. Ekstra felt `placeholderImage` (kun demo) legger ekte bilder fra verkstedet bak «PLASSHOLDER»-etiketten. Komponenten er blind for kilde.
- **Video**: fire plassholdere med ekte bilder som poster. Play-knappen er deaktivert til `src` er satt. YouTube monteres via `youtube-nocookie.com` først ved klikk, mp4 med `preload="none"`.
- **Reviews**: `reviews.js` er tom, badge-komponenten finnes i footer og rendres først når data legges inn.

## 8. Teknisk

- `sharp` er satt til `^0.34` fordi 0.33 mangler ferdigbygde binærer for Windows ARM64 (maskinen bygget kjøres på). 0.34 har `@img/sharp-win32-arm64`.
- Biome-regelen `a11y/useSemanticElements` er slått av: den krever `<dialog>`/`<output>`/`<fieldset>` i stedet for ARIA-roller på `<aside role="dialog">` og `role="status"`, og gir ingen reell tilgjengelighetsgevinst her. Alle andre a11y-regler er på.
- `useExhaustiveDependencies` har to bevisste unntak (lukk mobilmeny og rull til toppen ved rutebytte), markert med `biome-ignore`.
- Sticky mobil-CTA skjules når et skjema er i viewport (BookingForm sender en `CustomEvent`).
- Handlekurv-ikonet i header vises kun når kurven har varer, for å holde headeren ryddig.
- `/kontakt?vare=<slug>` og `/kontakt?bil=<slug>` forhåndsfyller meldingsfeltet.
- Hero-video: `scripts/prepare-images.mjs` kopierer `assets-raw/hero.mp4` til `public/video/hero.mp4` hvis den finnes og skriver `heroVideo` i manifestet. `HeroMedia` viser da video (autoplay, muted, loop, poster), ellers stillbilde. Ingen video finnes nå.
- Mobilmeny: `<button aria-expanded aria-controls>`, fullskjerms-overlay, Escape lukker, fokusfelle, fokus tilbake til knappen, lukkes ved rutebytte.
- Overskrifter har `hyphens-auto` og `break-words` som sikring mot overflow på 375 px. Kasse-tittelen har egen mindre mobilstørrelse.

## QA (24.09.2026, før demo)

Kritisk gjennomgang av innhold, bilder, visuelt, tilgjengelighet og ytelse. Full rapport i `docs/qa/QA-RAPPORT.md`.

### Innhold mot kildene

- Alle datafiler i `src/data/` er lest mot `FAKTA.md` og del B. Tall, navn, adresse, åpningstider, telefon, e-post og lenker finnes i kildene. Følgende var egne formuleringer og er strammet inn:
  - `/om-oss`, kundemottaket: «bygd av entusiaster, for entusiaster» og «som regel en fin bil eller to» er byttet til kundens ord: «innbydende og kreativt» og «til tider svært fine biler». (Endret igjen 21.10.2026, se «Om oss med Gjermunds egne ord».)
  - `/biler-til-salgs`, CTA-tekst: «vi skaffer deler og tar service på bilen du kjøper» er fjernet (påstand kunden ikke har kommet med). Nå: «Ta kontakt, vi vet hva som er på vei inn.»
  - Hardkodede strenger i JSX («Les mer», «Lager», «Folkene bak GT Maskin», CTA på om oss, valideringsmelding i kassen) er flyttet til `siteContent.js`.
- Årstall: logoen viser 2008, selskapet er stiftet 2012. Til Gjermund har svart: hero-kicker er «Godkjent bilverksted · Alta», boksen i hero er «Kustom Speedshop i Alta», faktaboksen er «2012 / GT Maskin AS stiftet», og tidslinjen starter med «[ÅR]: [Oppstart, bekreftes av Gjermund]» før 2012. Spørsmålet ligger i STATUS.md og BILDELISTE.md.
- Søk etter tankestrek, forbudte ord og verktøyord i `src`, `public`, `index.html`, `docs`, README, BESLUTNINGER, STATUS og BILDELISTE: null treff i synlig innhold. Kodekommentarer om automatisk skrevne filer er omformulert. Commitmeldinger er uten medforfatter-linjer og verktøynavn.
- Stillingstitler: kun «daglig leder og eier», med små bokstaver.

### Bilder og logo

- `assets-raw/` er ikke sporet i git (`git ls-files` tom). Ingen tredjeparts merkelogo under `public/`.
- Alle innholdsbilder har `width`, `height`, beskrivende `alt` og `loading="lazy"`. Hero og PageHero lastes eagert med `fetchpriority="high"`. Dekorative bilder (logo i lenke med synlig tekst, miniatyrer i spillelisten, kurvbilder ved siden av tittel) har `alt=""`.
- Header-logo målt: 48 px av 65 px header på mobil (74 %), 64 px av 89 px på desktop (72 %). Logoen ble økt fra 36/44 px etter måling. Logo vises nå som webp med png-fallback i 128/256 px (512 px-varianten lastet 380 kB unødvendig).
- `og-image.jpg` og favicon-filer åpnet og kontrollert: logo sentrert, riktig proporsjon, ikke beskåret.
- Bildescriptet lager nå også en 400 px-variant, slik at små flater (feed-kort på mobil, Snapchat-QR) ikke laster 800 px.

### Ytelse (Lighthouse mobil mot `npm run preview`)

Første måling: ytelse 60-69, CLS 0,25-0,29, LCP 4,7-6,4 s. Årsaker og tiltak:

- Google Fonts-CSS blokkerte rendering (930 ms) og fontbytte ga layout shift. Bebas Neue og Barlow (OFL) er nå selvhostet i `public/fonts/` (latin-subsett, woff2) med `@font-face` i `src/index.css` og `preload` i `index.html`. Fontene er de samme som før, bare lastet lokalt. Ingen eksterne kall før brukeren klikker.
- Footer flyttet seg når lazy-lastet side erstattet fallback (CLS 0,25). `RouteFallback` er nå `min-h-screen`.
- Forsiden lastes eagert (ikke `React.lazy`), siden det er hovedruten. Hovedchunk 276 kB (83 kB gzip), resten av rutene er egne chunker under 10 kB gzip.
- `public/robots.txt` lagt til (`Disallow: /` i demoen, byttes ved go-live).

- Hero-bildet oppdages først når JS har kjørt (LCP 3,5 s). `index.html` preloader hero-webp med `imagesrcset`/`imagesizes` (17-61 kB, også på undersider, akseptert).
- Første nedlasting av fontene traff latin-ext-subsettet (uten A-Z) fordi subset-kommentaren i Google-CSS-en ble lest fra feil blokk. Oppdaget på skjermbildene (Impact i stedet for Bebas), rettet og verifisert med fontkit (A-Z, a-z, æøå finnes).

Etter tiltak: ytelse 90-96 (/, to kjøringer), 94 (/deler), 96 (/kontakt), tilgjengelighet 100, beste praksis 100, CLS 0. SEO 66 skyldes kun `noindex`; målt til 100 uten `noindex` og med `Allow` i robots.txt (midlertidig test mot dist, tilbakestilt).

### Tilgjengelighet

- axe-core (wcag2a/aa, 2.1, best-practice) på alle ruter ved 375 og 1440 px: to moderate funn rettet (sticky mobil-CTA manglet landemerke, nå `<nav aria-label="Hurtigvalg">`; h1 til h3 på `/deler` og `/biler-til-salgs`, nå med skjult h2). Null funn etter retting.
- Lighthouse «label-content-name-mismatch» på logo-lenken: `aria-label` fjernet, synlig tekst er navnet.
- Tastatur: tab-rekkefølge starter med «Hopp til innhold», fokus synlig (2 px aksent) på alle stopp, Escape lukker meny og kurv og gir fokus tilbake til knappen som åpnet. `prefers-reduced-motion`: ingen skjulte reveal-elementer, ingen video.

### Små visuelle rettinger

- Tom handlekurv viste «Sum 0 kr» og «Til bestilling»; nå kun tekst og lenke til `/deler`.
- Suksess-boksen i bestillingsskjemaet strakk seg til full kolonnehøyde; nå `self-start`.
- Tittelen på `/kasse` ga 1 px overflow på 375 px; egen mobilstørrelse.

## Runde 2 (07.10.2026): løft før kunden ser siden

### Innholdsfilen fra kunden mangler

`_kilder/INNHOLD-FRA-GJERMUND.md` skulle være eneste kilde for nytt innhold i runden (scooterdomenet, Snapchat, Facebook-innlegg, videolenker, nytt hovedbilde). Filen fantes ikke da runden ble bygd. Etter oppdragets regel ble strukturen bygd ferdig, plassholderne beholdt, og ingenting gjettet. Filen ble opprettet 19.10.2026 med videolenkene (se «Ekte videoer fra Facebook»). Hva som fortsatt mangler står i STATUS.md.

### Feed

- Innleggstekst i feeden skal gjengis ordrett, også stavemåte og emoji, fordi det er sitater fra Facebook. Stavefeil rettes bare i sidetekst, ikke i feeden.
- Når det finnes minst 3 ekte innlegg, viser `SocialFeed` bare de ekte og runder ned til nærmeste multiplum av 3 (3, 6 eller 9). Overskytende innlegg vises ingen steder. Komponenten er fortsatt blind for kilde; `placeholderImage` er et demofelt som ignoreres i drift.
- Lange tekster klippes til fire linjer og lenken skifter til «Les mer på Facebook». Karusell får et lite bildestabel-ikon, video og reel får play-overlegg.

### Video

- Kilder: `youtube` (youtube-nocookie.com), `facebook` (facebook.com/plugins/video.php med `show_text=false`), `mp4` og `snapchat`. Snapchat kan ikke bygges inn og vises som kort med poster og «Se på Snapchat».
- Spillerens ramme har fast forhold så siden ikke flytter seg når video monteres. Liggende video: 16:9. Stående video i hovedspilleren: 4:5 på mobil og 16:9 fra 768 px, med posteren uskarp og dempet bak og selve videoen skarp i en 9:16-kolonne midt i rammen, både før og etter klikk. Stående video i kort og rutenett: 9:16 (erstatter den tidligere regelen om alltid 16:9, som ga en smal stripe på mobil).
- Ingen eksterne miniatyrer lastes før klikk. Den gamle YouTube-miniatyr-fallbacken (i.ytimg.com) er fjernet; poster må være et lokalt bilde.
- Varighet og dato vises bare når de er kjent (`null` skjules), så ingenting gjettes.
- Hero-bildet på `/video` er `fasade-dag-bilpark` (31 kB på 800 px). Første valg, firmabilen, veide 101 kB og ga Lighthouse 87; byttet ga 90.

### Butikk

- Sortimentet er delt i «Deler» og «Klær og utstyr». Underkategorier for klær: «Klær» og «Capser og tilbehør». Valgt gruppe og kategori ligger i URL-en.
- Klær får `sizes`. `[]` betyr at størrelsene ikke er bekreftet: velgeren vises deaktivert med «[Størrelser bekreftes]», og plagget kan legges i kurven uten størrelse. Når størrelser er kjent, må en velges før «Legg i kurv». Handlekurven nøkler linjer på slug + størrelse.
- Carhartt nevnes som tekst i gruppeingressen for klær, ikke som produktnavn (står i `brands.store`).
- Menyteksten «Deler» er byttet til «Butikk» i header, mobilmeny og footer. Ruten `/deler` er beholdt.
- Plassholderproduktene for klær og capser bruker `butikk-klaer` og `butikk-capser` bak PLASSHOLDER-etiketten, slik feeden gjør.

### Biler til salgs

- `cars` (ekte) er tom, og eksempelkortene ligger i `exampleCars`. Eksemplene vises bare når `cars` er tom, så seksjonen «Slik presenteres bilene» forsvinner av seg selv når første ekte bil legges inn.
- «Vi skaffer» brukes som overskrift slik oppdraget sier, uten løfter om leveringstid, garanti eller import. Ingressen er kundens egen formulering «vi vet hva som er på vei inn».
- Solgte biler får «Solgt»-merke, nedtonet bilde og gjennomstreket pris. Plassholderen bak et solgt eksempel nedtones ikke, fordi etiketten «Fylles inn» ellers mister kontrast (axe-funn, rettet).
- Detaljsiden har galleri med piler, piltaster og swipe. Galleriet er en `<section>` med `onKeyDown`; piltastene virker når fokus står på en knapp i galleriet. Et `tabIndex` på selve seksjonen ble fjernet etter Biome-regelen `noNoninteractiveTabindex`.

### Snapchat og Messenger

- Messenger-lenken er `https://m.me/GtMaskinas`, avledet av Facebook-sidens adresse.
- Snapchat-brukernavn mangler: kun QR vises, uten lenke, med teksten «[Snapchat-brukernavn bekreftes av Gjermund]». Når `url` settes i `channels.js`, vises QR på desktop og «Åpne i Snapchat» på mobil.
- Én komponent, `SocialLinks`, brukes i footer, på kontaktsiden og på videosiden. Ikonene er dekor (`aria-hidden`), teksten er lenken. Facebook- og Snapchat-merkene er inline SVG i `currentColor`.
- Footerens lenkekolonne «Følg oss» er omdøpt til «Mer» (Video, Om oss, Kontakt), siden kanalknappene har fått egen kolonne med samme tittel.

### Utleie: variant B

Innholdsfilen som skulle beskrive scooterdomenet finnes ikke, og ingen av kildene i `_kilder/` sier noe om et bookingsystem der. Variant B er derfor valgt: `/utleie` er eneste sted for utleie, bestillingsknappene er byttet til en utleieforespørsel på siden, og domenet nevnes ikke i synlig tekst (`grep` i `src` og `index.html` gir null treff). `companyFacts.links.rental` er fjernet. Hvis det viser seg at domenet har et bookingsystem kunden vil beholde, legges lenken tilbake (variant A). Ved go-live videresendes scooterdomenet til gtmaskin.com/utleie (301).

- Prisene fra 2022 er ikke brukt. Priser og vilkår er fortsatt «[PRIS]» og «[vilkår]», med en setning om at de bekreftes ved forespørsel.
- ATV uten bilde vises som et designet ikonfelt (lucide-ikon på mørk flate med aksentstrek og stille striper), ikke som tom plassholder.
- Utleieforespørselen validerer at til-dato ikke er før fra-dato, og sendes via `submitForm("utleie", payload)`.

### Løft

- Utkastbanner: `<aside>` i normal flyt over headeren, ikke sticky. Lukket tilstand leses synkront fra `sessionStorage` ved første render, så banneret gir ingen layoutforskyvning (CLS målt til 0). Oransje flate med mørk tekst, 6,83:1.
- Felles plassholderstil: stiplet kant, nedtonet tekst og etikett «Fylles inn» i `Placeholder`. Forsidens om oss-del viser kun Gjermund, med monogram «GT» der portrettet mangler; `/om-oss` beholder plassholderne for ansatte samlet.
- Hero-bilde: skjermbilder av hero på 1440 px (2x) med `herobilde.jpg` (886 px, innbakt tekst) og `herobilde-fasade.jpg` (1278 px). Fasaden er tydelig skarpere og har ingen tekst i bildet. Den er valgt, med `object-position: 64% 42%` så skiltet og bilene i vinduene kommer med. Preload i `index.html` er oppdatert. Nytt høyoppløst bilde anbefales fortsatt.
- OG og deling: `og:url`, `canonical`, absolutt `og:image` med `secure_url`, `type`, `width`, `height` og `alt`, pluss `twitter:card`, `twitter:title`, `twitter:description` og `twitter:image`.
- `robots.txt` slipper inn `facebookexternalhit` og `Facebot` så delinger får forhåndsvisning, og holder alle andre ute. `X-Robots-Tag: noindex` og meta noindex beholdes.
- `HeroPreload` legger inn preload for undersidens hero-bilde fra hovedchunken så snart ruten er kjent. Målbar effekt var liten (bildestørrelsen avgjør), men det koster ingenting.
- Lenker til bilder på produktkort og bilkort har ikke lenger `aria-label`; de har en `sr-only`-tekst i stedet, så den synlige plassholderteksten inngår i det tilgjengelige navnet (axe `label-content-name-mismatch`).
- `SectionHeader` sin høyre-slot har `md:max-w-[50%]` så lange ingresser ikke skaper horisontal overflow på 768 px.

## Rask retting (07.10.2026): landskode, kanaler høyt oppe, animert safari-banner

### Telefonnummer

Nummeret vises som «+47 911 14 628» overalt (`companyFacts.phone.display` og de to tekstene i `siteContent.js` som skriver nummeret ut). `href` er fortsatt `tel:+4791114628`.

### Facebook og Snapchat høyt oppe

- Ny `SocialIcons`: små ikonknapper i header (fra 1024 px, ved siden av telefonnummeret), i mobilmenyen («Følg oss») og i hero («Følg verkstedet på Facebook og Snapchat»). Footer er uendret. Ikonene gjenbruker merkene fra `SocialLinks`.
- Snapchat uten brukernavn åpner en liten dialog (`SnapchatQrDialog`) med QR-koden og teksten «Skann for å følge oss på Snapchat». Escape og klikk utenfor lukker, fokus går tilbake til knappen. Når `channels.js` får `url`, blir ikonet en vanlig lenke til snapchat.com/add/<brukernavn>.
- Header ved 1024 px: sju menypunkter, to ikoner og CTA ble for bredt. Menyen har `gap-3.5` og 14 px fra 1024 px, `gap-7` og 15 px fra 1280 px, og `whitespace-nowrap` på menypunkter og CTA. Verifisert uten brudd på 1024 og 1280 px. Telefonnummeret vises fortsatt bare fra 1280 px.

### Animert safari-banner

- Bakgrunn: `Mountain_scootering_Finnmark.jpg` (2272×1704) ligger i `assets-raw/`, leveres som `/images/utleie/safari-fjell` (webp og jpg, 1920/800/400). `object-position: 50% 62%` så snøflaten og fjellene synes. **Lisens må sjekkes og fotograf krediteres før go-live**; kreditlinjen nederst til høyre er en plassholder.
- Scooter: `ac-profil.jpg` er produsentens profilbilde på hvit bakgrunn og **kun for demo**. Byttes med frilagt bilde av GT Maskins egne scootere før go-live. Bakgrunnen fjernes i `scripts/prepare-images.mjs` med samme flood fill som logoen (`cutOut()`), her med lyse, umettede piksler (`min > 196`, `max - min < 16`) som henger sammen med kanten. Terskelen ble senket fra 228 til 196 for å få med produktbildets lyse slagskygge. Leveres som `/images/utleie/safari-scooter` i 400 og 800 px, png og webp med gjennomsiktighet.
- Bevegelse: tre baner (`.safari-lane`, 100 % bredde) animeres med `translate3d` fra -50 % til 100 % over 14, 15,5 og 16 sekunder, med forsinkelser -3,5 s, 0,5 s og 4 s så første scooter er synlig raskt. Scooterne er 210/175/140 px på desktop og 150/125/100 px på mobil, plassert på ulik høyde for perspektiv. Hver har myk skygge (blur-ellipse), gynging (`safari-bob`, rotasjon ±0,8° og 3 px løft) og snøsky bak beltet (`safari-snow`, skalert og fadet ellipse). Kun `transform` og `opacity` animeres.
- Animasjonen har `animation-play-state: paused` til banneret er i viewport (IntersectionObserver, terskel 0,1) og pauses igjen utenfor. Med `prefers-reduced-motion` vises én scooter stille på snøflaten (`.safari-lane-static`).
- Scooterne er dekor: `alt=""` i et `aria-hidden`-lag med `pointer-events-none`. Tekst og knapp ligger over (z-10) og er klikkbare.
- Kontrast, målt i headless Chrome ved å skjule teksten og lese bakgrunnspikslene bak den (verste piksel, tekst #F3EFE7):

| Element | 375 px | 1440 px | AA |
|---|---|---|---|
| Tittel | 9,61:1 | 6,71:1 | bestått |
| Ingress | 9,08:1 | 8,33:1 | bestått |
| Knapp (#151412 på #F08003, fast flate) | 6,83:1 | 6,83:1 | bestått |
| Kreditlinje (#F3EFE7 på heldekkende #151412) | 16,05:1 | 16,05:1 | bestått |

Overlegget er heldekkende `brand-primary` 80 % på mobil, og en gradient fra 95 % via 70 % til 5 % på desktop. På mobil har innholdet 128 px bunnmarg så scooterne kjører under knappen, ikke bak teksten. Videorutenettet på forsiden har `min-w-0` på kolonnene, så lange spillelistetitler avkortes i stedet for å presse ut siden på 375 px.

## Rask designretting (08.10.2026): kustom-emblem i hero

Boksen «Kustom Speedshop i Alta» var en hvit tekstboks. Den er byttet med et emblem som skal se håndlaget ut, i stil med pinstriping og emaljeskilt, med utgangspunkt i logoens kobber, sort og slitt metall.

- Form: avlangt skilt med avrundede hjørner, mørk ramme (`brand-primary-dark`, 3 px) med en tynn kobberlinje (`brand-accent` 80 %) innenfor, og fire nagler i hjørnene (radial-aktig gradient fra `brand-muted-inverse` via `brand-outline` til `brand-primary-dark`). Flaten er en lineær gradient fra `brand-primary-light` via `brand-primary` til `brand-primary-dark` med en svak støytekstur (SVG `feTurbulence`, fractalNoise, 14 % opasitet, `mix-blend-screen`). Bygd i inline SVG og CSS i `KustomEmblem.jsx`, ikke som bilde. Ingen hex-verdier i komponenten; SVG-pynten bruker `currentColor` og `fill-brand-primary`.
- Pinstriping: egen tegning i SVG (viewBox 200×30): en hovedlinje med løkke, en tynnere følgelinje, små dråper i endene og en spiss i midten. Venstre halvdel speiles om midten, og linjen under teksten er den samme speilet vertikalt. Ikke kopiert fra kjente motiver.
- Typografi: «Kustom» i Yellowtail (OFL, Google Fonts), selvhostet som `public/fonts/yellowtail-400-latin.woff2` (18 kB, kun latin-subsett), `font-display: swap`, preload i `index.html` fordi emblemet står over folden på forsiden. Ny font-token `font-script` i `tailwind.config.js`. «Speedshop» i Bebas Neue med sperring 0,26 em, «Alta» i 11 px med 0,32 em sperring og korte kobberstreker på sidene. Undertekst i `brand-text-inverse`. Skriptlinjen har fast høyde, så fontbyttet ikke flytter noe (CLS 0 målt).
- Innhold: `hero.badge` i `siteContent.js` er delt i `script`, `main`, `place` og `text`. Ordlyden er uendret: «Kustom Speedshop» + «Alta» og «Amerikanske biler, custom-prosjekter og delesalg.»
- Plassering: vippet -3 grader, myk skygge (`shadow-2xl` i `brand-primary-dark` 80 %). Desktop: absolutt plassert nede til venstre, stikker ut over bildekanten som et klistremerke. Avstandene er satt per bredde så emblemet ikke dekker bilen i vinduet: 1024-1279 px `-left-20 -bottom-16`, fra 1280 px `-left-14 -bottom-11`. Verifisert visuelt på 1024, 1280 og 1440 px. Mobil: samme emblem i 204 px bredde (236 px fra 768 px), i flyt under bildet med negativ toppmarg, så det aldri overlapper tekst eller knapper.
- Bevegelse: ingen animasjon. Eneste effekt er en svak glans (gradient fra `brand-text-inverse` 10 %) som fades inn ved hover fra 768 px. Med `prefers-reduced-motion` slås overgangen av av den globale regelen (målt `transition-duration` 0,00001 s), glansen vises da uten fade.
- Tilgjengelighet: all pynt (støy, kobberlinje, nagler, glans, pinstriping) er `aria-hidden`. Teksten er ekte tekst i spans og et avsnitt, leses som «Kustom Speedshop Alta Amerikanske biler, custom-prosjekter og delesalg.»
- Kontrast, målt i headless Chrome ved å skjule teksten og lese pikslene bak hver tekstboks (verste piksel, inkludert støytekstur og gradient):

| Tekst | Farge | 375 px, verste | 1440 px, verste | Snitt | AA |
|---|---|---|---|---|---|
| «Kustom» (34-38 px skript) | `brand-accent-light` | 6,12:1 | 6,05:1 | 7,28:1 | bestått |
| «Speedshop» (26-29 px Bebas) | `brand-text-inverse` | 12,01:1 | 11,96:1 | 14,03:1 | bestått |
| «Alta» (11 px) | `brand-muted-inverse` | 6,91:1 | 6,82:1 | 7,74:1 | bestått |
| Undertekst (12-13 px) | `brand-text-inverse` | 12,66:1 | 12,49:1 | 14,51:1 | bestått |

- QA: build og lint rene. axe-core på `/` ved 375 og 1440 px: 0 funn. Lighthouse mobil på `/` mot `npm run preview`, to kjøringer: ytelse 90, tilgjengelighet 100, beste praksis 100, LCP 3,5 s, CLS 0, TBT 60 ms (SEO 69 skyldes `noindex`). Ingen konsollfeil og ingen horisontal overflow på 375, 1024, 1280 og 1440 px. Skjermbilder: `docs/qa/skjermbilder/runde-2/hero-emblem-{375,1024,1440}.png`.

## Ekte videoer fra Facebook (20.10.2026)

- Kilde: seks reel-lenker i `_kilder/INNHOLD-FRA-GJERMUND.md`, kopiert fra facebook.com/GtMaskinas/reels/ 19.10.2026. Lagt inn i `src/data/videos.js` i samme rekkefølge, første lenke er `featured`. De fire plassholderne er fjernet.
- Kunden har ikke sendt titler, beskrivelser, datoer eller varigheter, så ingenting av dette er laget. Tittelen «Video fra GT Maskin» nummerert 1-6 brukes bare der komponentene trenger tekst (spilleliste, aria-label, iframe-title). `date` og `duration` er null og skjules.
- Poster: eksisterende bilder fra manifestet (kobber cabriolet, V8-motor, gul Camaro, rød Impala, traktor, Mustang). Byttes når kunden sender stillbilder fra hver video.
- Reel-lenker (`facebook.com/reel/<id>`) spiller ikke i `plugins/video.php`. `src` i dataene er den fulle reel-lenken, og `VideoPlayer` skriver den om til `facebook.com/GtMaskinas/videos/<id>/` ved montering. Handlen leses fra `channels.js`, ikke hardkodet. Fortsatt ingen eksterne kall før klikk (verifisert: null forespørsler utenfor localhost før play, deretter facebook.com og fbcdn.net).
- Rutenettet «Flere videoer» på `/video` bruker stående kort i 2 / 3 / 5 kolonner (375 / 640 / 1024 px) når alle videoene er 9:16, ellers det gamle 1 / 2 / 3-rutenettet. Spillelistekortene på forsiden er gjort kompakte (96×60 px miniatyr) så fem kort fyller omtrent samme høyde som spilleren på desktop.
- QA i headless Chrome mot `npm run preview`, 375 og 1440 px: axe-core 0 funn på `/` og `/video`, ingen horisontal overflow, ingen konsollfeil. Avspilling: etter klikk på play monteres pluginen og videoen (720×1280) lastes; i headless krevde pluginen ett klikk til før `currentTime` gikk fra 0 til 3,9 og videre til 6,9 sekunder. Skjermbilder i `docs/qa/skjermbilder/video/`.

## Runde 3 (20.10.2026): videovisning, merkefarger, Snapchat, safari ut

Branch `feature/runde-3`. Fakta sjekket 20.10.2026 (Snapchat, merkefarger, safari) står i `_kilder/INNHOLD-FRA-GJERMUND.md` og `_kilder/FAKTA.md`.

### Videovisning (punkt 1)

- Hovedspilleren er høydestyrt for stående video (`.player-portrait` i `index.css`): mobil `min(70svh, bredde × 16/9)`, desktop `min(640px, 100svh - 136px)` (header 88 px + luft). Bredden følger 9:16, så posteren fyller hele rammen uten mørke sidefelt, og rammen er den samme før og etter klikk (CLS 0). Liggende video får full bredde i 16:9 med samme makshøyde.
- Desktop: spilleren står på en dempet flate (`brand-primary-light`, maks 880 px bred, sentrert) med tittel, kildeetikett og «Se på Facebook» ved siden av. Den uskarpe posteren i full bredde fra forrige runde er fjernet. Mobil: spilleren alene, teksten én gang under. Tittelen ligger ikke lenger oppå bildet; play-knappen har aria-label «Spill av video: <tittel>».
- Sticky mobil-CTA (56 px) dekker aldri play-knappen: med header 64 px og spiller maks 70 svh står knappen midt i de øverste 78 % av skjermen.
- Autoplay: plugin-URL-en har `autoplay=true` og iframen `allow="autoplay; encrypted-media; picture-in-picture"`. I headless Chrome starter ikke videoen av seg selv etter vårt klikk (`readyState` 4, `paused` true, `currentTime` 0); den krever ett klikk til inne i Facebook-pluginen. Vi har ikke verifisert om en vanlig nettleser med brukeraktivering oppfører seg annerledes. Noteres som kjent begrensning: Facebook styrer dette i sin iframe.

### Videoliste som slider (punkt 2)

- `VideoSlider` uten bibliotek: `overflow-x: auto`, `scroll-snap-type: x mandatory`, `scroll-padding` lik sidemargen. På mobil går sporet ut til skjermkanten (`-mx-6 px-6`), kortene er 44 % brede, så neste kort synes i kanten. Fra md er kortene 208 px (9:16) eller 320 px (16:9).
- Piler fra md: «Forrige videoer» / «Neste videoer», blar ett kort (kortbredde + gap) med `scrollBy`, deaktiveres i hver ende. Endene måles på `scroll`, `ResizeObserver` og `resize`. Med `prefers-reduced-motion` brukes `behavior: auto`.
- Kortene er knapper med `aria-pressed`; aktivt kort får aksentkant og etiketten «Spiller nå». Valg bytter video i hovedspilleren (tilbake til poster, ingen eksterne kall før play) og ruller spilleren inn med 96 px headermargin når den er utenfor viewport. Tastatur: Tab går gjennom kortene og nettleseren ruller det fokuserte kortet inn i sporet.
- Samme komponent (`VideoShowcase`) brukes på forsiden og `/video`. Listen på `/video` heter «Alle videoer» (tidligere «Flere videoer»), siden den nå inneholder alle, med den aktive markert.

### Merkefarger (punkt 3)

- Tokens i `index.css` og `tailwind.config.js`: `brand-facebook` #0866FF, `brand-on-facebook` #FFFFFF, `brand-snapchat` #FFFC00, `brand-on-snapchat` #000000. Ingen hex i komponenter.
- Facebook og Messenger: hvitt merke og hvit tekst på blått. Snapchat: gul flate, spøkelset hvitt med svart kontur (`paint-order: stroke`, strek 1,6 i 24-viewBox), svart tekst. Merkene skaleres bare, farges ikke om, ingen effekter; hover er `brightness` på flaten.
- Brukt i header (ikonknapper), mobilmeny, hero, footer, kontaktsiden, QR-dialogen, «Følg GT Maskin» på `/video` og kildeetiketten «Facebook» på videokortene (`SourceMark`, 16 px blått kvadrat med hvit f).
- Kontrast målt med `scripts/check-contrast.mjs` og lagt i tabellen over: hvit på Facebook-blått 4,82:1, svart på Snapchat-gult 19,18:1. Alle AA.
- Footer: Snapchat-knappen er tatt ut når QR-blokken vises (`qr="always"`), siden blokken har samme lenke («Åpne i Snapchat»); ellers sto «Følg oss på Snapchat» to ganger.

### Snapchat (punkt 4)

- `channels.js`: `username` gtmaskin-as, `profileType` public, `url` https://www.snapchat.com/@gtmaskin-as, `embedUrl` https://www.snapchat.com/@gtmaskin-as/embed, `verifiedAt` 2026-10-20. Plassholderen «[Snapchat-brukernavn bekreftes av Gjermund]» er fjernet fra tekst og kode.
- Alle Snapchat-knapper lenker direkte. Ikonknappen i header, mobilmeny og hero lenker direkte under 768 px og åpner QR-dialogen fra 768 px (der telefonen gjerne ligger ved siden av); dialogen har QR, @gtmaskin-as og «Åpne i Snapchat», fokusfelle mellom lukk og lenke, Escape og klikk utenfor lukker.
- Ny `SnapchatSection` (tekster i `siteContent.snapchatSection`): «GT Maskin på Snapchat», «Følg oss på Snapchat for flere videoer.» Før klikk: gult kort med spøkelse, @gtmaskin-as og «Vis Snapchat-profilen». Ved klikk: ren iframe mot `embedUrl`, 416 px bred og 692 px høy som i Snapchats eksempel, title «GT Maskin på Snapchat». Svarhodene fra Snapchat har `frame-ancestors *`, så blockquote-koden og `embed.js` fra dokumentasjonen trengs ikke. Verifisert i headless Chrome: iframen viser profilkortet («GT Maskin | gtmaskin-as | Alta, Finnmark, Norge | Amerikansk bilverksted | Historier»).
- Plassering: nederst i videoseksjonen på forsiden, og egen blokk på `/video` over «Følg GT Maskin», som nå bare har Facebook-knappen.
- Personvern: teksten om eksterne lenker nevner nå at Snapchat-profilen lastes først ved klikk, og norsemantrail.com er tatt ut. «Sist oppdatert» satt til oktober 2026.
- Ingen eksterne kall før klikk er verifisert på nytt. Etter klikk på «Vis Snapchat-profilen» laster Snapchat også Google Analytics og Tag Manager inne i sin iframe; det er deres side, nevnt i QA-rapporten.

### Safari ut, utleiebanner inn (punkt 5)

- Alt om snøscootersafari og Norseman Trail er fjernet fra synlig innhold, SEO-tekster, footer, tidslinjen («utleie og safari» er «utleie»), tjenestekortet («Utleie og safari» er «Utleie» med kundens ordlyd om utleie) og `companyFacts.links`. `_kilder/FAKTA.md` noterer at safarien er avsluttet (opplyst 20.10.2026).
- `SafariBanner` er blitt `RentalBanner` (CSS-klasser `scooter-*`). Kicker «Snøscooterutleie», tittel «Gjennom hele scootersesongen» og ingress ordrett fra `rentalSection.lead` («Snøscooterutleie gjennom hele scootersesongen, ATV og hengere resten av året. Send en utleieforespørsel, så tar vi kontakt.»). Ingen nye fakta. Knapp «Se utleie» til `/utleie` på forsiden, «Send utleieforespørsel» til skjemaet på `/utleie`.
- Bakgrunnen er en egen SVG-illustrasjon, `public/images/utleie/vidde.svg` (under 3 kB): blågrå himmelgradient, tre fjellrekker i lag med svake snøflater, flat vidde med drifter i forgrunnen. Ingen mennesker, ikke fotorealistisk, `preserveAspectRatio="xMidYMid slice"` og `object-cover`, så den skalerer uten forvrengning. Fotoet `Mountain_scootering_Finnmark.jpg` og kreditlinjen er fjernet fra `public/`, manifestet og bildescriptet.
- Scooterbildet er omdøpt fra `safari-scooter` til `scooter-profil` (samme produsentbilde, fortsatt kun demo, står som go-live-punkt i STATUS.md). `loading="lazy"` er tatt av de tre scooterbildene: Chrome rapporterte DevTools-issuen `LazyLoadImageIssue` for dem i det animerte laget, og filen er 21 kB (webp) delt av alle tre.

### Header på smale skjermer (punkt 6)

- Undertittelen «KUSTOM SPEEDSHOP · ALTA» holdes på én linje: `white-space: nowrap`, sperring 0,15 em under 640 px (0,25 em fra 640 px), og «· ALTA» skjules under 380 px (nytt brekkpunkt `xs`). `companyFacts.taglineParts` deler teksten. Verifisert på 320, 360, 375, 390 og 430 px.

### Konsoll og DevTools-issues (punkt 7)

- Fra vår kode før klikk: ingen konsollfeil eller -advarsler. Én DevTools-issue, `LazyLoadImageIssue`, for de tre scooterbildene i utleiebanneret på hver last, og sporadisk for footer-logoen på korte sider. Rettet som beskrevet over; etter retting dukker meldingen bare sporadisk opp (4 av 75 laster i siste fullkjøring, 0 av 47 kontrollaster). Den er rådgivende fra Chrome, ikke en feil.
- Fra Facebook etter klikk på reel: ingen konsollfeil, -advarsler eller DevTools-issues fra Facebook-pluginen i testen
- Fra Snapchat etter klikk på «Vis Snapchat-profilen»: `CookieIssue` (56-64 per side) fra Snapchats egen profilvisning: tredjeparts-cookies i iframen

### Ytelse (del av punkt 9)

- Første måling etter runde 3 ga Lighthouse mobil 86-88 på `/video` og `/utleie` (LCP 3,7-4,0 s). Årsak: miniatyrene i slideren, scooterbildene og QR-koden lastet tidlig (Chrome laster `loading="lazy"`-bilder langt under folden på treg linje) og konkurrerte med hero-bildet, og undersidene fikk hero-bildet senere enn forsiden fordi `index.html` preloadet forsidens bilde på alle ruter og sidechunken ble hentet i en ekstra rundtur.
- Tiltak: (1) `useAfterLoad()` monterer miniatyrer i `VideoCard`, scooterne i `RentalBanner` og QR-bildet i `SocialLinks` først etter `window` `load`; boksene har fast størrelse, så CLS er fortsatt 0. (2) Ny Vite-plugin `gtm-hero-preload` (`vite.config.js`) leser `src/data/heroImages.js` og skriver et inline-script i `<head>` som preloader rutens hero-bilde med riktig srcset og sizes, Yellowtail bare på forsiden, og sidechunken (`modulepreload`) for ruten. `HeroPreload.jsx` og den faste preloaden i `index.html` er fjernet. (3) `aboutSection.page.heroImage` pekte på et annet bilde enn `/om-oss` faktisk viste; nå er det samme bilde og `OmOss` leser det fra data.
- Resultat: Lighthouse mobil 90 på `/`, `/video` og `/utleie` (to kjøringer hver, LCP 3,4-3,5 s, CLS 0).

### QA (punkt 9)

- `npm run build` og `npm run lint` rene. 15 ruter på 320, 375, 768, 1024 og 1440 px: ingen horisontal overflow, ingen konsollfeil. axe-core (wcag2a/aa, 2.1, best-practice) på alle ruter ved 375 og 1440 px: 0 funn.
- Lighthouse mobil mot `npm run preview`: `/` 90, `/video` 90, `/utleie` 90 (to kjøringer hver), tilgjengelighet 100, beste praksis 100, CLS 0, LCP 3,4-3,5 s, SEO 69 på grunn av `noindex`.
- Ingen eksterne kall før klikk på noen rute. Etter klikk: Facebook-reel laster (720×1280, `readyState` 4), Snapchat-profilen vises i iframen.
- Søk etter tankestrek, forbudte ord og verktøyord i `src/`, `public/`, `index.html` og docs: null treff i synlig innhold.
- Skjermbilder i `docs/qa/skjermbilder/runde-3/` (50 filer, palett-komprimert).

## Runde 3b (21.10.2026): seksjonshoder, runde ikonknapper, radius, Snapchat-telefon

### Seksjonshodemønster

- `SectionHeader` har nå ett mønster for alle seksjoner: kicker, tittel og ingress venstrejustert i én blokk, ingressen maks 60 tegn bred (`max-w-[60ch]`). Handlinger (knapper, tall, lenker) sendes inn som `actions` og står under ingressen på mobil i full bredde, og fra 768 px i en egen kolonne til høyre som er bunnjustert mot tekstblokken og venstrejustert innad. Den gamle `aside`-varianten med høyrejustert brødtekst er fjernet fra alle fem bruksstedene (feed, video, biler til salgs, deler, utleie).
- «Live fra GT Maskin»: ingressen er «Her ser du det siste fra verkstedet, hentet automatisk fra Facebook.» (tallet er tatt ut av setningen). Tallene står som én kompakt linje med det blå Facebook-merket («1 023 liker siden · 31 har vært her») og «Tall fra Facebook 22. september 2026» i liten tekst under, deretter knappen «Følg oss på Facebook» i Facebook-blått med hvit tekst (ny `Button`-variant `facebook`, og `snapchat` til senere bruk).

### Runde ikonknapper og merkefarger

- Alle ikonknapper for Facebook og Snapchat er runde og 44 × 44 px på alle bredder: blå sirkel med hvit f, gul sirkel med hvitt spøkelse i svart kontur. Gjelder header, mobilmeny, hero, footer, kontakt, `/video` og QR-dialogen (`SocialIcons`, `SnapchatQrDialog`). Det lille kildemerket (`SourceMark`) er også rundt og brukes nå i feedkortene i stedet for et mørkt strekikon.
- Tekstknapper: Facebook og Messenger blå med hvit tekst, Snapchat gul med svart tekst, alle med 10 px hjørner.
- Målt med `getComputedStyle` i headless Chrome på `/`, `/video`, `/kontakt`, `/utleie`, mobilmenyen og QR-dialogen (83 flater): alle Facebook-flater `rgb(8, 102, 255)`, alle Snapchat-flater `rgb(255, 252, 0)`, alle ikonknapper 44 × 44 px med radius 9999 px. Eneste treff utenom er rene tekstlenker («Åpne innlegget på Facebook» i kortene, «Åpne i Snapchat» under QR-koden), som ikke er flater.

### Hjørneradius

- Tokens i `index.css` og `tailwind.config.js`: `--radius-button` 10 px (`rounded-button`), `--radius-field` 8 px (`rounded-field`), `--radius-pill` 9999 px (`rounded-pill`).
- 10 px: `Button` (alle varianter, «Bestill time», CTA-er, skjemaknapper), kanalknapper i `SocialLinks`, Snapchat-knappene, produktkortets «Legg i kurv» / «Velg størrelse», kartknappen i adressekortet.
- 8 px: `input-dark` og `textarea-dark` (alle skjemafelt), søkefeltet i butikken, QR-rammene.
- Helt runde: merkechips, kategorichips og gruppeveksleren i butikken, snarveiene på `/verksted` og `/utleie`, godkjenningschips, lenkeraden under «Deler og nettbutikk», sliderpilene, kurvens pluss/minus og lukk, galleripilene, menyknappen, kurvknappen og telefonknappen i header, lukk i mobilmeny og dialog, ikonknappene.
- Kort, bilder, plassholdere og ikonfliser i innhold beholder rette kanter. Bunnlinja med «Ring» og «Bestill time» på mobil beholder rette kanter mot skjermkanten.
- Fokusmarkeringen er `outline` på `:focus-visible` og følger `border-radius` i moderne nettlesere; skjemafeltene bruker `ring` (box-shadow), som også følger hjørnene.

### Snapchat-seksjonen

- Desktop: tekst til venstre (kicker «Snapchat», tittel «GT Maskin på Snapchat», ingress «Korte videoer fra verkstedet. Følg oss for mer.», gul knapp «Følg @gtmaskin-as» med spøkelset, QR med «Skann med Snapchat-kameraet»), telefonramme til høyre (maks 360 px bred, 9:16, 6 px mørk kant, 28 px hjørner, skygge). Før klikk viser telefonen den gule Camaroen (`camaro-gul-front`, bil2.jpg) med mørk toning nederst, gult merke med @gtmaskin-as øverst, stor gul knapp «Se snapene» og «Lastes fra Snapchat når du trykker.» i liten tekst. Ved klikk lastes profilvisningen inne i rammen (verifisert: profilkort og historier vises i 348 px bredde).
- Mobil: tekst, telefon (maks 340 px, sentrert), gul knapp «Følg @gtmaskin-as» i full bredde under. Ingen QR.
- Setningen «Profilkort og de nyeste historiene, hentet fra Snapchat når du ber om det.» er fjernet. Fortsatt ingen eksterne kall før klikk (verifisert på alle fire ruter).

### QA

- Build og lint rene. `/`, `/video`, `/kontakt` og `/utleie` på 320, 375, 768, 1024, 1440 og 1920 px: ingen horisontal overflow, ingen konsollfeil. axe-core ved 375, 1440 og 1920 px: 0 funn. Lighthouse mobil: `/` 92 og `/video` 90 (to kjøringer hver, pluss `/utleie` 90), tilgjengelighet 100, beste praksis 100, CLS 0. Skjermbilder i `docs/qa/skjermbilder/runde-3b/` (15 filer).

## Om oss med Gjermunds egne ord (21.10.2026)

- «Innbydende og kreativt» er ordene til Alta Amcar Klubb og står nå bare i sitatet på `/om-oss`. Avsnitt 2 i «Om oss» (forsiden og `/om-oss`) er byttet til Gjermunds egne ord (kilde: `_kilder/INNHOLD-FRA-GJERMUND.md`): «Vi er entusiaster, ikke bare på amerikanske biler, men på alle spesielle biler. Vi tar vare på bilen din, gamle som nye, blanke som rustne. I butikken og kundemottaket står det til tider veldig fine biler, så stikk gjerne innom. Trenger du hjelp til noe, er det bare å ta kontakt.»
- Seksjonen «Kundemottaket» på `/om-oss` har tittelen «Stikk gjerne innom» og de to siste setningene fra samme avsnitt som ingress, så teksten ikke gjentas i sin helhet på samme side. Sitatet fra Alta Amcar Klubb er uendret.
