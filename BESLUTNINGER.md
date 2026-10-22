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

## Runde 4 (21.10.2026): video med ett trykk, slidere, Snapchat, app og butikkbilder

Branch `feature/runde-4`. Merges til `dev` av Kim-Ove etter gjennomsyn. Nye kilder: butikkbilder og `hero.mp4` i `assets-raw/`, `_kilder/PRISER-FRA-TAVLENE.md` med bildene i `_kilder/tavler-2026-10-21/`.

### Video som åpner med ett trykk (punkt 1)

- Kartleggingen før endring står i `docs/ARBEIDSLOGG.md`. Kort: de seks reelene viste et lånt verkstedbilde, så svart flate, så Facebooks eget stillbilde, og trengte ett trykk til. Det var «de gamle bildene» kunden mente.
- De lånte posterne er fjernet (`poster: null` på reelene). Video uten eget stillbilde får en designet poster (`VideoPoster`: mørk flate med stille striper, kildemerke, tittel og play), både i hovedspilleren og i kortene. Når kunden sender stillbilder, settes `poster` igjen og den designede posteren forsvinner av seg selv.
- Fra trykk til video: rammen beholder størrelsen (CLS 0 målt før og etter), flaten er mørk (`brand-primary-soft`) med en ring i `brand-accent` og teksten «Laster video». Iframe og video monteres med `opacity-0` og tones inn på 300 ms ved `onLoad` (iframe) eller `onLoadedData`/`onPlaying` (mp4).
- Autoplay etter trykk gjelder også ved `prefers-reduced-motion`: trykket er brukerens eget valg, og innstillingen handler om bevegelse som ikke er bedt om. Hero-videoen følger innstillingen (se under).
- Facebook: `plugins/video.php` med `autoplay=true` og `allow="autoplay; encrypted-media; picture-in-picture; fullscreen"`. I headless Chrome er pluginen lastet etter 0,8-1,1 s, men `<video>` i den står i pause til brukeren trykker én gang til inne i pluginen. Facebook styrer dette i sin iframe, og det samme må forventes på iPhone (Safari krever at trykket skjer inne i rammen for video med lyd). **Kjent begrensning: Facebook-videoene kan trenge ett trykk til på iPhone.** Bør sjekkes på en ekte telefon. mp4 (butikkvideoen) og YouTube starter med ett trykk (målt 0,4 s og 3,2-3,6 s).
- Butikkvideoen (`hero.mp4`, 17 s, 3,4 MB, uten lyd) ligger først i `videos.js` som «Butikken» med `featured: true`, så videoseksjonen alltid har én video som spiller med ett trykk. Varighet «0:17» og dato 21.10.2026 er fra filen og opptaket.

### Slider på mobil (punkt 2)

- Én komponent, `MobileSlider`, uten bibliotek. Under 768 px: `overflow-x: auto`, `scroll-snap-type: x mandatory`, sporet går ut til skjermkanten (`-mx-6 px-6 scroll-px-6`), kortene er 82 % brede (60 % fra 640 px) så neste kort stikker inn fra høyre. Fra 768 px: `display: grid` med samme kolonner som før, prikkene skjules.
- Prikker: knapper med `aria-label` «Gå til kort 2 av 6» og `aria-current` på den aktive, 44 px høye trykkflater med 10 px prikk (aktiv 24 px bred i `brand-accent`). Aktiv prikk regnes ut fra kortet som ligger nærmest sporets venstrekant (rAF-strupet `scroll`-lytter).
- Vertikal rulling kapres aldri: ingen touch-håndtering i kode, bare nettleserens egen rulling. Sporet har `overflow-y: hidden` og 12 px loddrett innmarg, så `reveal`-animasjonens translate aldri gir loddrett rulling inne i sporet. Målt: en loddrett sveip over sporet ruller siden (134 px), ikke sporet.
- Tab: kortet som får fokus rulles inn (`scrollTo` på sporet, `behavior: auto` ved `prefers-reduced-motion`). Ingen kort klippes på 320 px (kort 223 px, høyre kant 247 px) eller 375 px (kort 268 px, høyre kant 292 px).
- `Reveal` ligger inne i `MobileSlider` (`as="li"`), så feed og tjenester beholder inn-toningen.

### «Biler til salgs» tones ned (punkt 3)

- Punktet er tatt ut av `nav.items` (header og mobilmeny deler listen). Footer-lenken, ruten, «Vi skaffer»-skjemaet og detaljsidene er uendret. Forsidens «Vi skaffer»-boks er veien inn.
- Tjenestekortet «Biler til salgs» er blitt «Vi skaffer» med lenke til `/biler-til-salgs#vi-skaffer`. Tittel og tekst leses fra `carsSection.wanted` i `siteContent.js` (kicker «Vi skaffer», ingressen «Si hva du leter etter, så tar vi kontakt. Vi vet hva som er på vei inn.»), ikonet er `Search`. Ingen nye løfter.
- Header med seks menypunkter verifisert på 1024 og 1280 px uten brudd.

### Snapchat (punkt 4)

- Før trykk vises et lokalt profilkort: logoen (samme filer som header og footer) med gult Snapchat-merke, «GT Maskin på Snapchat», @gtmaskin-as og to knapper. Ingen eksterne kall, ingen preconnect (verifisert: null forespørsler utenfor localhost før trykk).
- «Åpne i Snapchat» er hovedknapp, først og størst (56 px) på mobil, og går til `https://www.snapchat.com/add/gtmaskin-as` (`channels.js`, `addUrl`), som åpner appen direkte på mobil. `target="_blank"` og `rel="noopener noreferrer"`.
- «Se historiene her» bytter kortet med telefonrammen. Iframen monteres allerede på `pointerdown` (målt: første forespørsel til snapchat.com 18-20 ms etter trykkstart), skjult med `opacity-0`, mens rammen viser en lokal skjelett-tilstand (profilhode, fire pulserende story-ringer i `brand-accent`, fire flater). Iframen tones inn ved `onLoad` (målt 0,6-1,5 s). Kommer ikke `onLoad` innen 8 sekunder, viser rammen «Snapchat svarer ikke akkurat nå.» og «Åpne i Snapchat» i stedet for evig lasting (verifisert ved å blokkere snapchat.com).
- QR-koden med «Skann med Snapchat-kameraet» står fortsatt i tekstkolonnen på desktop. Den gule «Følg @gtmaskin-as»-knappen og Camaro-bildet i telefonen fra runde 3b er tatt ut; kortet dekker begge.

### App på mobilen (punkt 5)

- `public/manifest.webmanifest` (erstatter `site.webmanifest`): name «GT Maskin AS», short_name «GT Maskin», lang «nb», start_url og scope «/», display «standalone», theme_color og background_color `#151412` (`brand-primary`). Ikoner 192, 512 og 512 maskable (logoen innenfor den trygge sonen, 20 % luft) lages av `scripts/generate-favicons.mjs` fra samme logo som favicon. `index.html` lenker manifestet og har `theme-color`, `apple-touch-icon`, `apple-mobile-web-app-title` og `mobile-web-app-capable`.
- `public/sw.js` uten bibliotek. Sidenavigering: nettverk først, `offline.html` bare når `fetch` feiler, HTML legges aldri i cache. `/assets/` (hash i navnet): cache først. Eksterne kall rører vi ikke (ingen `respondWith`), så Facebook, YouTube og Snapchat caches aldri. `offline.html` og logoen precaches ved install. `skipWaiting` ved install, sletting av alle andre cacher og `clients.claim` ved activate.
- Cachenavnet er `gtm-<versjon>`, der versjonen stemples inn av Vite-pluginen `gtm-sw-version` i `closeBundle` (plassholderen `__GTM_BUILD__` i `public/sw.js`). Hvert bygg gir nytt navn, så gamle cacher ryddes ved neste besøk. `vercel.json` setter `Cache-Control: no-cache` på `/sw.js` og `/manifest.webmanifest`, så oppdateringer når fram med en gang.
- Service worker registreres bare i produksjonsbygg (`import.meta.env.PROD`), etter `load`, så den ikke konkurrerer med hero-bildet. `npm run preview` er et produksjonsbygg, så den er aktiv der.
- `public/offline.html` er en frittstående side og kan ikke bruke Tailwind; fargene er brand-tokenenes hex-verdier, kommentert i filen. Fontene er ikke precachet, så siden bruker systemfonter (Impact som display-fallback, som i `tailwind.config.js`). Teksten er «Ingen nett akkurat nå. Sjekk dekningen og prøv igjen.» med en «Prøv igjen»-knapp.
- `InstallButton` («Legg GT Maskin på hjemskjermen») i footer og nederst i mobilmenyen. `useInstallPrompt` fanger `beforeinstallprompt` allerede ved modul-lasting (så hendelsen ikke går tapt før React er montert) og kaller `prompt()` ved trykk. iPhone og iPad (UA, eller MacIntel med berøring) får en liten dialog med tre steg («Trykk på Del-knappen nederst i Safari», «Velg Legg til på Hjem-skjerm», «Trykk Legg til»), med fokusfelle, Escape og fokus tilbake. Knappen skjules i `display-mode: standalone` (og `navigator.standalone`), og i nettlesere som verken har prompt eller er iOS, så den aldri peker på noe som ikke finnes.
- Verifisert i headless Chrome mot `npm run preview`: `Page.getInstallabilityErrors` gir tom liste, manifestet leses uten feil, service worker aktiv etter first load, `/assets/` i cache etter andre side, `offline.html` vises når serveren stoppes, Chrome sendte `beforeinstallprompt` selv. Ingen push-varsler i denne runden.

### Nye bilder og video fra butikken (punkt 6)

- 18 nye bilder og `hero.mp4` lå i `assets-raw/` (kom inn under runden). Alle er åpnet og motivet bekreftet mot tabellen i oppdraget. Ingen personer i bakgrunnen. Skilt fra Mobil, Kendall, Carhartt, Chevrolet, Cadillac, Shell, Texaco og Route 66 er en del av butikkinteriøret i fotoene; ingen logofiler er kopiert.
- Hero: posteren (`butikk-hero-poster`, første bilde i videoen) er LCP-elementet og vises med en gang, preloadet av `gtm-hero-preload`. Videoen monteres over posteren først etter `load`, ikke ved `prefers-reduced-motion` eller `Save-Data` (`navigator.connection.saveData`), stum, loop, `playsinline`, og tones inn på 700 ms ved `onPlaying`, så posteren aldri blinker. Utsnittet er sjekket på 375 (16:10), 1024 (4:3) og 1440 px (480 × 560): rundturen fungerer i alle tre, så videoen er beholdt i hero. `herobilde-fasade` brukes fortsatt på `/kontakt`, `/bestill` og som OG-bilde.
- Byttet ut: `butikk.jpg` (oljehylle) med `butikk-mobil-vegg` i Deler-seksjonen på `/verksted` (pluss `butikk-hylle-amsoil` som bilde 2) og i butikkbildene på `/deler`; `butikk5.jpg` (sofa og cabriolet) med `kundemottak-disk-chevrolet` i «Om oss» på forsiden og på `/om-oss`; `butikk7.jpg` (cabriolet i kundemottaket) med `butikk-kasseapparat-national` på `/om-oss` og `kundemottak-hyller-bar` i feed-plassholder 3. `verksted4.jpg` og `verksted10.jpg` står til nye verkstedbilder kommer. De gamle filene ligger fortsatt i `public/images/butikk/` (scriptet lager dem), men ingen side peker på dem.
- `/om-oss`, «Stikk gjerne innom»: seks bilder (disken, hyller og bar, National-kasseapparatet, bensinpumpa, motorbordet, Texaco-pumpa). Butikkbildene på `/deler`: Mobil-veggen, Stetson-capser, bordet med T-skjorter og capser, kjemihylla. Hyllebildene ligger bak plassholderproduktene for motordel, drivverksdel og tilbehør i «Deler». Resten (amsoil-diesel, severe-gear, route66-krakk, de tre andre kasseapparatene) er klargjort i manifestet, men ikke i bruk ennå.

### Priser fra tavlene (punkt 7)

- Kilde: `_kilder/PRISER-FRA-TAVLENE.md`, kolonnen «Slik på nettsiden», avskrift av tavlene fotografert i butikken 21. oktober 2026 (`_kilder/tavler-2026-10-21/`). **Prisene bekreftes av Gjermund før go-live.**
- `/verksted` har blokken «Faste priser» (`src/data/prices.js`, fem rader i samme rekkefølge som filen) med teksten «Prisene står på tavla i butikken (21. oktober 2026).». Timeprisen står på samme tavle som Vipps-koden; hva den gjelder bekreftes av Gjermund.
- «Klær og utstyr» har fått ekte varer med pris: T-skjorte 299, Caps 399, Stetson caps 599, Kopp 250, Nøkkelring 99, og Wunder-Baum 35 under «Tilbehør» i «Deler». Størrelser for T-skjorte står som «[Størrelser bekreftes]» (`sizes: []`). Varemerke er bare satt der tavla sier det (Stetson, Wunder-Baum). Varenummer, lagerstatus og beskrivelse er ukjent og vises som før (`[varenummer]`, «Spør om lagerstatus», «[Produktbeskrivelse legges inn …]»). Kopp og nøkkelring har ikke bilde ennå.
- Ikke brukt: «Bok 399,-» (uklart hvilken bok) og Vipps-nummeret (brukes ikke uten at Gjermund ber om det).
- Produktbilder i kortene har tom `alt` når varen er ekte, fordi lenken allerede har tittelen som skjult tekst (axe `image-redundant-alt`, funnet på Wunder-Baum og rettet).

## Runde 4b (21.10.2026): retting etter test på Samsung

Fortsatt på `feature/runde-4`. Rettinger etter at Kim-Ove testet runde 4 på en Samsung i forhåndsvisningen.

### Facebook-video: færre trykk (punkt 1)

- Facebooks innebygde spiller starter ikke av seg selv på mobil, så ett trykk på Facebooks egen play-knapp vil alltid trengs. Det skal være det eneste trykket i tillegg til kortet: trykk på et kort i «Alle videoer» velger og starter videoen i hovedspilleren med en gang (`autoStart` i `VideoShowcase` og `VideoPlayer`), uten den designede posteren og vår oransje play-knapp imellom. mp4 spiller direkte (målt 0,43-0,45 s), Facebook-spilleren lastes direkte (iframe tonet inn etter 0,65-1,2 s). Hovedspilleren rulles inn som før, uten myk rulling ved `prefers-reduced-motion`.
- Facebook-spilleren fyller rammen i riktig sideforhold (9:16 for reels, målt 0,56), så Facebooks play-knapp står midt i og er stor. Lasteindikatoren fjernes fra DOM ved `onLoad`, så ingen egne lag ligger over iframen etterpå (målt: null søsken ved siden av iframen). Den mørke lasteflaten og «ingen eksterne kall før trykk» er beholdt.
- Play-knappen vår vises fortsatt bare i startposisjonen (før noe er valgt), der den første videoen («Butikken») står med poster.
- **Ett trykk hele veien krever egne videofiler**, som «Butikken». Originalfilene til de seks reelene fra Gjermund står på listen før go-live (STATUS.md).

### Snapchat: profilen direkte (punkt 2)

- `/add/`-lenken fra runde 4 åpnet kameraet i Snapchat-appen først, deretter historier og kamera igjen før profilen. Alle «Åpne i Snapchat»-lenker (profilkortet, ikonene i header og hero, footer, QR-dialogen, kontaktsiden) går nå til den offentlige profilen `https://www.snapchat.com/@gtmaskin-as`, samme adresse som innbyggingen bruker uten `/embed`. Brukernavnet leses fra `channels.js` (`url`), `addUrl` er fjernet.
- Kim-Ove ser venneprofilen fordi han er venn med GT Maskin på Snapchat. Andre ser den offentlige profilen.

### App: installering og boks (punkt 3)

- Forhåndsvisningen i Vercel er beskyttet med innlogging. Chrome hentet manifestet uten innloggingscookien, fikk innloggingssiden tilbake og sa «Kan ikke installere denne appen». `<link rel="manifest">` har nå `crossorigin="use-credentials"`, så cookien sendes med også for manifestet. Manifestet er gyldig (`Page.getAppManifest` uten feil, `Page.getInstallabilityErrors` tom), og den åpne demolenken har ingen beskyttelse.
- Ny `InstallPrompt`: en liten boks på mobil (under 768 px) med «Legg GT Maskin på hjemskjermen», «Åpne siden som app, rett fra mobilen.», «Legg til» og «Ikke nå». Vises etter 20 sekunder på siden eller når brukeren har rullet forbi halve siden, det som kommer først (målt: ikke etter 15 s, vist etter 21 s; vist straks ved rulling til 60 %). Ikke på `/kasse` og `/bestill`, ikke mens et skjema har fokus (sjekkes ved visning, og boksen skjules hvis et skjemafelt får fokus mens den står), ikke når siden kjører som app, og bare når nettleseren kan installere (Android/Chrome: `beforeinstallprompt` har kommet) eller er iPhone/iPad.
- «Legg til»: Android og Chrome bruker `beforeinstallprompt`; iPhone åpner veiledningen med Del-knappen (samme `InstallDialog` som knappen i footer). «Ikke nå», lukk eller Escape gir 14 dagers pause i `localStorage` (`gtm-app-boks-lukket`, med try/catch).
- Plassering: `position: fixed` 68 px over bunnen, så bunnlinjen med «Ring» og «Bestill time» (56 px) ikke dekkes (målt: boksens bunn 744 px, linjens topp 755 px). Fanger ikke fokus (`section` med `aria-label`, ingen fokusflytting), flytter ikke innholdet (fixed, CLS 0 i Lighthouse). Knappene i footer og mobilmeny står som før.

### Merkene med logo (punkt 4)

- Kim-Ove har bestemt (21.10.2026) at demoen skal vise logoer, og at bruken avklares med Gjermund før go-live. Kommentaren i `brands.js` er oppdatert. Merkene er de som sto i `brands.js` (Chevrolet, Dodge, Ram, Ford, Cadillac, Tesla, Amsoil, Fluid Film, Carhartt) pluss Stetson og Wunder-Baum fra bildene i butikken. Skiltene i butikken (Shell, Texaco, Mobil, Route 66, National) er pynt og er ikke med.
- Logoene ligger lokalt som SVG i `public/images/merker/` (åtte filer, 1,6-39 kB, ingen script eller eksterne referanser), hentet fra Wikimedia Commons med kilde og lisens per fil i `_kilder/LOGOER.md`. Ingen av dem er endret. Amsoil, Fluid Film og Wunder-Baum finnes ikke som ren SVG (Commons har bare det amerikanske «Little Trees»-merket, og produsentsidene ga ingen SVG), så navnet vises på platen i stedet.
- `BrandWall`: skiltvegg med hvert merke på en lys plate med lik høyde (72 px på mobil, 96 px fra 768 px), fire små nagler i hjørnene og diskret skygge, navnet under. Logoene får lik visuell tyngde gjennom `logoHeight` per merke i `brands.js` (ordmerker 16-24 px, emblemer 40-60 px; Ford-filen har luft rundt ovalen og får derfor 60). `width`/`height` fra viewBox så ingenting flytter seg. 3 kolonner på 375 px, 4 fra 640 px, 6 fra 1024 px. Ingenting ruller av seg selv.
- Brukt på `/deler` i stedet for tekstbrikkene: delemerkene i hero («Deler til») og butikkmerkene i butikkseksjonen («I butikken»). Forsiden: alle elleve i seksjonen «Deler og nettbutikk», rett under seksjonshodet, med etiketten «I butikken» (`partsSection.page.storeBrandsPrefix`); lenken «Gå til butikken» står allerede i seksjonshodet. Raden ligger der brikkene lå, så ingen seksjon er skjøvet lenger ned enn plateraden (ca. 230 px på mobil). `BrandChips` er fjernet.
- Alt-teksten er merkenavnet. Lighthouse etter endring: se QA-rapporten.

### Ikke oversett merkenavn (punkt 5)

- Chrome på Samsung oversatte siden (Dodge ble «Unnvik», Ram «Vær», «Ring» «Ringe», «GT MASKIN» «GT-MASKIN») selv med `lang="nb"`. `translate="no"` er satt på merkenavn og logoer i `BrandWall`, produktnavn og varemerke i produktkort, produktside, handlekurv og kasse, firmanavnet i `Logo` (header og mobilmeny) og i footer (merke og copyright-linje), og «Ring» i bunnlinjen. Resten av siden kan fortsatt oversettes, så turister får teksten på sitt språk.

## Runde 4c (22.10.2026): mindre luft, bildeshow i USA-stil og butikkvideo på butikksiden

Designrunde etter mer testing på Samsung, på `feature/runde-4`.

### Mindre luft og mindre tekst (punkt 1)

- Luften styres samlet i `index.css`: `section-pad` er 32 px på mobil (var 48) og 72 px på desktop (var 96), `container-site` har 16 px sidemarg på mobil (var 24). Seksjonenes indre rytme er `gap-6 md:gap-8` (var 8/10) og `gap-8` i tospaltede seksjoner (var 10). Egne paddinger er strammet i samme forhold: forsidens hero 28/48/56 px (var 40/64/72), `PageHero` 32/48 px kompakt og 40/72 px full (var 48/64 og 56/96), tjenestene på `/verksted` og utleieobjektene på `/utleie` 32/48 px (var 48/64), tillitsstripen 16 px og 72 px høy på desktop (var 24 og 96), footer 32/40 px (var 48/56), utleiebanneret 24/40 px (var 32/48). Sliderne går nå ut til 16 px-kanten. Rytmen er den samme på alle sider.
- Seksjonstopper er kicker og tittel. Ingress bare der den sier noe nytt. Fjernet (våre egne formuleringer, ikke Gjermunds): «Her ser du det siste fra verkstedet, hentet automatisk fra Facebook.» (feed), «Vi tar alt fra gamle veteranbiler …» i «Hva vi gjør» (står i hero-ingressen), «Prosjekter, før og etter …» i videoseksjonen på forsiden (står på `/video`), «Videoene lastes først når du trykker på avspilling.» på `/video`, «Korte videoer fra verkstedet. Følg oss for mer.» i Snapchat-kortet, gruppeingressene under «Deler» / «Klær og utstyr» på `/deler` (gjentok sideingressen), «Oljer, kjemi, rustbeskyttelse …» under «Stikk innom butikken» (gjentok sideingressen), og «Vi svarer med pris og tilgjengelighet.» i utleieskjemaet (gjentok introen). Gjermunds tekster og alle fakta står. Full liste i `docs/ARBEIDSLOGG.md`.

### Facebook-feeden kant til kant (punkt 2)

- Sporet går fra skjermkant til skjermkant på mobil (`-mx-4 px-4 scroll-px-4`): første kort starter ved sidemargen (målt 16 px), siste kort kan rulles helt ut (høyre kant 359 px på 375 px), og siden kan ikke rulles sidelengs (`scrollWidth` lik viewport, `scrollX` 0). Fra 768 px: rutenettet med mindre luft.
- Kompakt topp: kicker og tittel til venstre, «Følg oss på Facebook» som liten blå knapp (`xs`) på samme rad fra 768 px, og tallene med dato på én linje under tittelen («1 023 liker siden · 31 har vært her · Tall fra Facebook 22. september 2026»). Seksjonshodet er bygd lokalt i `SocialFeed`, ikke med `SectionHeader`, fordi raden er annerledes.
- Kortene viser bilde og tittel. For eksempelkortene er tittelen etiketten («Prosjektbil ferdig, klar for levering»), tekstene i hakeparentes (innleggstekst og «[dato]») er borte, og det store «PLASSHOLDER»-feltet er byttet med en liten, diskret pille «Eksempel» oppe til venstre i bildet, så det fortsatt er ærlig at innleggene ikke er ekte. Ekte innlegg (når de kommer fra make.com) viser innleggstekst, dato, reaksjoner og lenke som før. Komponenten er fortsatt blind for kilde.
- `translate="no"` på sidenavnet i kortene (Chrome gjorde «GT Maskin AS» til «GT MASKIN SOM»).

### Butikkvideoen på butikksiden (punkt 3)

- `hero.mp4` med posteren er flyttet fra forsidens hero til heroen på `/deler` (`PageHero` med `video`, bakgrunn via `HeroMedia`): posteren vises med en gang og er LCP (forhåndslastet av `gtm-hero-preload` via `partsSection.page.heroImage`), videoen lastes etter load, ikke ved `prefers-reduced-motion` eller Save-Data, og tones inn ved `onPlaying`.
- Skiltveggen med delemerkene passet ikke oppå videoen og ligger nå i en egen stripe rett under heroen (`brand-primary-light`, logoene fortsatt eagert).
- Forhåndslastingen er oppdatert: `/` forhåndslaster første bilde i bildeshowet, `/deler` posteren. «Butikken» står fortsatt først i videoseksjonen.

### Forsiden: bildeshow med biler i USA-stil (punkt 4)

- `HeroSlideshow` med bildene i `src/data/heroSlides.js`: åtte bilder av biler fra repoet, skarpe nok for 480 × 560 (noen bare 750-960 px brede, byttes når Gjermund sender flere), uten personer, og ikke samme bil flere ganger. Valgt bort: `verksted4.jpg` og `verksted10.jpg` (personer), `butikk5.jpg` og `butikk7.jpg` (personer), `bil1.jpg` (hekken på en rød klassiker) og `fasade-vinter-klassikere` (fronten på en rød klassiker), som etter alt å dømme er samme bil som den sort-hvite klassikeren i første bilde; `bil2.jpg` (samme Camaro som `verksted9.jpg`), fasadebildene og Suburban-rammen (ikke bilbilder). Rekkefølge: den sort-hvite klassikeren først, så Camaro, sort Corvette, Impala, rød Corvette, Bel Air, kobber-cabriolet og firmabilen. Alt-tekstene er manifestets beskrivelser, ingen gjetting på merke eller modell ut over dem.
- Oppførsel: krysstoning (1,2 s) hvert 5. sekund med langsom zoom (1,0 til 1,08 over 6 s, bare `transform`). Pause ved hover, ved fokus i rammen og når fanen ikke er synlig (`visibilitychange`). Sveip på mobil (pointer events med `touch-action: pan-y`, så loddrett rulling går til siden) og små prikker med «Vis bilde n av 8» og `aria-current`. Ved `prefers-reduced-motion`: ingen zoom-klasse, ingen automatisk bytte (sveip og prikker virker), og pærene står stille (den globale regelen setter animasjonen til 0,01 ms).
- USA og Las Vegas: `.marquee-frame` i `index.css` er en mørk ramme (`brand-primary-dark`, 14 px) med lyspærer langs alle fire kanter: to lag radial-gradienter (dempet i `brand-accent-deep`, lys i `brand-accent-light` med svak glød) som bytter plass i to steg per sekund, som et gammelt marquee-skilt. Neon-glød på linjen «amerikanske» i overskriften (`hero.neonLine`, `.neon-text`: `brand-accent-light` med tre lag `text-shadow` i `brand-accent`). Ingen flimring, ingen andre effekter. Overskrift og knapper er uendret, teksten står på den mørke flaten som før (kontrast som i runde 2, neon-linjen er `#F79A2B` på `#151412`, 8,43:1).
- Ytelse: første bilde lastes eagert med `fetchpriority="high"` og forhåndslastes (`heroImages.js`). Første måling ga Lighthouse 77 (LCP 6,1 s): på en rask linje kommer `load` før første maling, så de sju andre bildene (ca. 400 kB) ble forespurt før LCP-elementet var malt og havnet i Lighthouses LCP-graf. De monteres nå først 2,5 sekunder etter `load` (`REST_DELAY_MS`), og bildeshowet begynner å bytte først da. Samme regel for butikkvideoen i heroen på `/deler` (`HeroMedia`, `VIDEO_DELAY_MS`) og `fetchpriority="low"` på logoene i skiltveggen. Alle lag er absolutt plassert i en boks med fast størrelse, så CLS er 0. Lighthouse: se QA-rapporten.
- Pærene animeres med `opacity` på to pseudo-elementer (annenhver pære lys) i stedet for `background-position`, så animasjonen går på kompositoren og ikke tegner om siden to ganger i sekundet (TBT).
- Kustom-emblemet ligger fortsatt som klistremerke nede til venstre, nå over rammen.
- BILDELISTE.md har fått en rad om flere bilder av biler fra Gjermund (prosjekter, biler inne til arbeid og ferdige biler, helst liggende).

## Runde 5 (22.10.2026): delekatalog etter bil og kategori, tette lister og Min bil

På `feature/runde-5` fra `dev`. Lenken kunden har (`dev`) står urørt til Kim-Ove har sett over og merget.

### Mønsteret

Katalogen er bygd etter mønsteret fra en stor amerikansk delekatalog på nett som Gjermund liker: katalogen er selve siden, et tre som foldes ut på stedet (merke › modell › årsmodell › kategori › deltype), ett søkefelt for alt, egne innganger for det som passer alle biler, tette lister med én rad per vare, og en adresse som følger valget. Vi låner mønsteret, ikke farger, logo, tekster eller bilder. Forbedringene: mobil først (trinnvis liste med store trykkflater), «Min bil», ingen blindveier (alltid «Vi skaffer»), designsystemet til GT Maskin, og merkelogoene fra skiltveggen som knapper for å velge merke. Referansesiden nevnes ikke ved navn i repoet.

### Katalogmodellen (punkt 1)

- `src/data/catalog.js`: 11 hovedkategorier med deltyper, slug, navn og lucide-ikon. Ni delekategorier (Motor, Drivverk og girkasse, Bremser, Understell og styring, Kjøling, Eksos, Elektrisk og tenning, Drivstoff, Karosseri og interiør) og to universalgrupper (`universal: true`): «Olje, kjemi og tilbehør» og «Klær og utstyr» (`layout: "grid"`). «US-biler» og «Tesla» er ikke kategorier lenger, de er merker i bilvelgeren. Kategoriene er et forslag og tilpasses kassesystemet når varelisten kommer.
- `src/data/vehicles.js`: 16 merker. De seks med logo er de samme som på skiltveggen (Chevrolet, Dodge, Ram, Ford, Cadillac, Tesla), de ti andre (Buick, Chrysler, GMC, Hummer, Jeep, Lincoln, Mercury, Oldsmobile, Plymouth, Pontiac) uten logo. 100 modeller med grove produksjonsintervaller; modellnavn som er brukt over flere generasjoner er slått sammen til ett intervall (for eksempel Challenger 1970-2023), og `to: null` betyr at modellen fortsatt produseres. Listen bekreftes mot det GT Maskin faktisk har deler til. Siste valg i listen er «Annet merke eller modell», som går til forespørsel.
- `products.js`: hver vare har `category` og `type` (slugs), `fits` som liste med `{ brand, model, from, to }` (slugs fra `vehicles.js`) eller `universal: true`. `slug`, `brand`, `title`, `price`, `sku`, `stock`, `image`, `description`, `sizes` og `placeholder` er som før; `group` er borte. Kommentaren «Slik legges et ekte produkt inn» er oppdatert, og `docs/VARELISTE-FORMAT.md` beskriver kolonnene vi trenger.
- Eksempeldata: 32 eksempeldeler på fem biler (Chevrolet Camaro 1967-1969, Chevrolet Silverado 2014-2018, Dodge Durango 2011-2023, Ram 1500 2019-2024, Tesla Model 3 2017-2023) og tolv deltyper, pluss sju varer i olje og kjemi fra merkene i butikken (Amsoil og Fluid Film, med hyllebildene fra 21.10.2026 bak). Varenumrene er `EKS-1001` til `EKS-1039`, merke og pris står i klammer der de ikke er kjent, og hver rad er merket «Eksempel» på samme måte som Facebook-feeden. Lagerstatus på eksemplene er satt bare for å vise de tre tilstandene (på lager, ikke på lager, ukjent). Wunder-Baum (35 kr) og klær og utstyr med priser fra tavlene er uendret.
- Reg.nr.-oppslag: bilvalget er bygd som en trinnvis liste der et felt for registreringsnummer kan stå foran merke og modell uten ny layout. Tekstene ligger klare i `partsSection.catalog.regNr`, feltet er ikke bygd.

### Stiene (punkt 2 og 3)

- Tilstanden i katalogen er adressen: `/deler/bil/<merke>/<modell>/<år>/<kategori>/<deltype>`, `/deler/kategori/<kategori>/<deltype>` og `/deler/sok?q=<søk>`. Alle nivåer kan mangle fra høyre; ugyldige segmenter gir en `replace` til den gyldige delen av stien. Samme side (`Deler.jsx`) rendrer alle fire ruter; de faste segmentene `bil`, `kategori` og `sok` vinner over `/deler/:slug` i react-router, så produktsidene kolliderer ikke.
- `/deler` uten mer går til Min bil når den er valgt, ellers til `/deler/bil`. Gamle lenker virker: `?gruppe=klaer` går til `/deler/kategori/klaer-og-utstyr`, `?gruppe=deler` til `/deler/kategori`, og de gamle kategoriene (`?kategori=bremser` og så videre) til nærmeste nye sti. `/deler/:slug` er uendret.
- Hvert klikk i treet er en navigering (push), så tilbakeknappen går ett nivå tilbake og lenker kan deles. Bare én gren er åpen per nivå fordi treet speiler adressen. Tiårene under en modell er lokal tilstand (ikke i adressen): tiåret med valgt år, eller det nyeste, er åpent.
- Forhåndslasting av sidechunken (`gtm-hero-preload` i `vite.config.js`) matcher nå også prefiksene `/deler/bil`, `/deler/kategori` og `/deler/sok` (`pageByPath` i `heroImages.js`).

### Heroen på butikksiden (punkt 2)

Valg: lav stripe med kicker og tittel øverst (ca. 90 px på mobil, 140 px på desktop, ingressen bare fra 768 px), og butikkvideoen flyttet ned til «Butikken i Myggveien» der den står ved siden av butikkbildene (`StoreVideo`: posteren alltid, videoen monteres først når rammen nærmer seg viewport, ikke ved redusert bevegelse). Begrunnelse: katalogen skal stå i første skjermbilde på 375×667 (søkefelt, de fire inngangene og starten på treet ligger over bretten), og posteren var LCP-elementet som holdt `/deler` under 90 i runde 4c. Skiltveggen med delemerkene under heroen er tatt ut; logoene er nå knappene for å velge merke. Hero-bildet for `/deler` er fjernet fra `heroByPath` (ingen forhåndslasting av poster lenger).

### Oppbygning og lister (punkt 2 og 4)

- Søkefelt og handlekurv (alltid synlig, med antall) øverst, så Min bil-chip og de fire inngangene som faner (to rader på mobil). Fra 1024 px: treet i en venstre kolonne på 320 px som blir stående ved rulling (`sticky`, maks skjermhøyden minus header, egen rulling), varelisten til høyre med brødsmuler over. Under 1024 px: `CatalogSteps` viser ett nivå om gangen med tilbake og brødsmuler øverst, og varelisten under når kategori eller deltype er valgt. Bytte mellom tre og trinnvis liste gjøres med `useMediaQuery("(min-width: 1024px)")`, som leser `matchMedia` ved første render, så det ikke blir et hopp.
- Varelisten (`PartsList`): tette rader gruppert per deltype med ikon og antall. Hver rad: lite bilde eller kategoriikonet (aldri grå plassholderboks), navn, merke og varenummer, «Passer til», lagerstatus, pris høyrejustert med tabulære sifre (`tabular-nums`) og «Legg i kurv» (klær med størrelser: «Velg størrelse» til produktsiden). På mobil to linjer med pris og knapp på samme linje (`md:contents` gjør at raden blir én linje fra 768 px). Klær og utstyr vises som rutenett med de gamle kortene (`ProductCard`), som nå viser kategoriikonet uten bilde og «Eksempel»-pille.
- Sortering: relevans (katalogens rekkefølge, eller søkets treffscore), pris lav til høy og høy til lav; varer uten pris legges sist. 50 rader om gangen med «Vis flere».
- Under hver liste, og når listen er tom: «Fant du ikke delen? Vi skaffer den» med lenke til `/kontakt?vare=<deltype eller søk>&bil=<bil>`. `Kontakt.jsx` leser nå `vare` som vare-slug eller fritekst og `bil` som bil til salgs (slug) eller bilen fra butikken som tekst, og fyller meldingen med begge.
- Under en valgt bil vises bare deler og olje/kjemi, ikke klær og utstyr.

### Søk (punkt 5)

- `searchCatalog()` i `src/lib/catalog.js`: søket deles i ord, hvert ord må forklares av varen (navn, merke, varenummer, kategori eller deltype) eller av bilen varen passer (merke, modell, årsmodell). «2017 durango eksos» gir Dodge Durango 2017 og de to eksosdelene som passer; «bremseklosser camaro» gir Camaro-klossene; «amsoil» gir de fire oljene. Et eksakt varenummer går rett til varen. Kategorien som er eksakt treff (Eksos) står før deltypene som begynner på ordet (Eksosrør). Min bil og funnet bil gir bonus i rekkefølgen.
- Forslag mens man skriver (fra to tegn) i tre grupper: biler, kategorier og varer, pluss «Vis alle treff». Combobox med `aria-activedescendant`, piltaster, Enter og Escape. Bil-forslaget tar med kategorien fra søket, så «2017 durango eksos» går rett til `/deler/bil/dodge/durango/2017/eksos`.
- Null treff gir «Vi skaffer» med søket ferdig utfylt.

### Min bil (punkt 6 og 7)

- `src/lib/myCar.js`: `useSyncExternalStore` uten provider, nøkkel `gtm-min-bil` i localStorage med lesing og skriving i try/catch. Bilen settes når merke, modell og årsmodell er valgt, og vises som chip øverst med «Bytt» (til `/deler/bil`) og «Fjern». Bare biler som finnes i `vehicles.js` godtas ved lesing.
- Med Min bil valgt: «Deler etter bil» åpner på bilen, `/deler` går til bilen, søket gir bonus til det som passer, rader som passer får «Passer din bil». Produktsiden viser «Passer din bil», «Passer alle biler» eller «Sjekk at den passer, spør oss» (med bilen i parentes) ut fra dataene, og «Velg bilen din i butikken» uten bil.
- Produktsiden har brødsmuler (Butikk › kategori › deltype), «Passer til» fra `fits`, «Flere i samme deltype» som rader, og «Spør om denne delen» til `/kontakt` med vare og bil.

### Tilgjengelighet

Nestede lister med knapper som har `aria-expanded` (pluss og minus som ikon, `aria-hidden`), deltyper som lenker med `aria-current="page"`, bokstavlinje som `role="group"`, årsmodeller som lenker med `aria-current`. På mobil flyttes fokus til overskriften (`tabIndex={-1}`) når nivået skifter, men ikke ved første visning. Kolonnen med treet er en `div` (ikke `aside`), så den ikke blir et komplementær-landemerke inne i `main`. Søkefeltet er en combobox med listbox; forslagene velges med piltaster og mus. Kontraster er de målte fra tidligere runder (ingen nye farger).

### Linjeskift

Biome krever LF, og `core.autocrlf=true` på Windows ga CRLF i arbeidskopien etter merge (lint rød på alle filer). Ny `.gitattributes` med `* text=auto eol=lf` gjør at alle tekstfiler sjekkes ut med LF uavhengig av git-innstillingene, og binærfiler er merket. Arbeidskopien ble normalisert med `git add --renormalize`; ingen innholdsendringer.

## Runde 5b (22.10.2026): engelsk med USA-flagg, neon og krom i headeren og flagg i vind

Fortsetter på `feature/runde-5`. Lenken kunden har (`dev`) står urørt til Kim-Ove har sett over og merget.

### Engelsk versjon (punkt 1)

- Språket styres av stien: norsk som før, engelsk under `/en` med de samme stiene (`/en/deler/bil/chevrolet/camaro/1969`). `App.jsx` rendrer de samme rutene under `/` og `/en`; `LocaleRoot` setter språket med `LocaleProvider` (`src/i18n/`) og nøkler `Layout` på språk, så hele treet rendres på nytt ved bytte. Engelske ord i stiene kan komme før go-live (STATUS.md).
- Innholdet ligger fortsatt i `src/data/`: den norske kilden er flyttet til `src/data/nb/`, den engelske ligger i `src/data/en/` med samme form, og `src/data/<modul>.js` er en tospråklig fasade (`localized(nb, en)` i `src/i18n/localized.js`): et Proxy på øverste nivå som leser fra den aktive språkkilden når en egenskap hentes. Komponentene importerer som før (`partsSection.catalog.tabs.bil`), så ingen av dem måtte skrives om for språk. Bare det øverste nivået går gjennom proxyen; alt under er vanlige objekter (første utkast med dype proxyer kostet ca. 25 ms per sidelasting på mobil og ble forenklet). Katalogdata (`catalog`, `vehicles`, `products`) får engelske navn fra oppslagstabeller i `en/`-filene, så slugs, år, varenummer, priser og «passer til» aldri kan sprike.
- `scripts/check-i18n.mjs` sammenligner formen på alle 15 modulpar (nøkler, typer, listelengder, tomme strenger) og feiler ved avvik. Kjøres av `npm run lint` og som `npm run check:i18n`.
- Lenker: `src/i18n/LocaleLink.jsx` eksporterer `Link`, `NavLink`, `Navigate` og `useNavigate` som legger på `/en` når språket er engelsk. Alle komponenter importerer disse i stedet for react-routers. Stiene i datafilene og katalogen er alltid de norske. Komponenter som leser `location.pathname` (`Deler`, `InstallPrompt`) bruker `stripLocale()`.
- Oversettelsen er amerikansk engelsk, tro mot Gjermunds formuleringer uten å forskjønne («We are car enthusiasts, not just American cars, but all special cars.»). Forbudte ord gjelder på engelsk også (luxury, premium, exclusive), ingen tankestrek. Bilmerker, modeller, firmanavn, «Kustom Speedshop» og merkenavn står som de er. «Levert av KOVISION» er «Built by KOVISION». Menyen: Shop floor, Store, Video, Rental, About us, Contact. **Gjermund bør se over den engelske teksten før go-live** (STATUS.md).
- Tall og tider: `formatPrice()` skriver nå valutaen selv, «1 595 kr» på norsk og «NOK 1,595» på engelsk, så `priceSuffix` er borte fra datafilene og komponentene. `formatNumber()` og `formatDate()` følger språket («1,023», «October 22, 2026»). Åpningstidene står som «Monday to Friday, 8:30 AM to 4:00 PM». Telefon og adresse som i dag (adressen får «Norway» på engelsk). Handlekurven lagrer navnet fra da varen ble lagt i; skuffen og kassen slår opp navnet på gjeldende språk via `getProduct(slug)`.
- Språkvelger: `LangSwitch` med flagg tegnet i SVG (`FlagIcon.jsx`, ingen emoji): på norsk et USA-flagg med «EN», på engelsk et norsk flagg med «NO». I headeren på alle bredder (ved siden av handlekurven) og i mobilmenyen. Bytte beholder siden og søkestrengen, og valget huskes i localStorage (`gtm-sprak`, i try/catch). Den som har valgt engelsk og kommer inn på `/`, sendes til `/en` (`LocaleRoot`).
- Engelsk-stripen (`LangStripe`): «View this site in English» med flagget, bare på norske sider ved første besøk med engelsk nettleserspråk (`navigator.languages[0]`), ingen omdirigering, lukkbar (`gtm-engelsk-stripe-lukket`), vises ikke når språket allerede er valgt. Tilstanden leses synkront ved første render, så ingenting flytter seg.
- `html lang` settes per språk, `useSeoMeta` leser tittel og beskrivelse fra den tospråklige `seo`, og `LocaleProvider` legger inn `hreflang`-lenker (nb, en og x-default) for siden man står på. `public/offline.html` viser engelsk tekst under `/en`.
- Små tekster som lå i komponentene (skip-lenke, «Hovedmeny», «Hurtigvalg», honeypot-etiketten, «Færre»/«Flere», «Eller ring», «[varenummer]», «[PRIS]») er flyttet til `a11y` i `siteContent`.

### Headeren (punkt 2)

- Stjerner og striper: `FlagBand`, et 6 px bånd øverst i headeren med røde og hvite striper (CSS-gradient) og et blått felt med små stjerner (radial-gradient) i venstre ende. En langsom glans glir over hvert 11. sekund (bare `transform`). Båndet ligger absolutt øverst i headerens eksisterende høyde, så headeren er like høy som før (64 px mobil, 88 px fra 768 px).
- Neonskilt: logoen står på en mørk skiltplate (`NeonPlate`, `brand-primary-dark`) med tynn neonkant og glød på `::after`. Første gang i økten (sessionStorage `gtm-neon-tent`) tennes kanten med et kort flimmer (1,4 s, `steps`), ellers lyser den rolig. Logoen endres ikke; flimringen ligger på kantlaget, så logoen står stille.
- Menyen: aktiv side får et neonrør under (`.nav-neon::after` med glød, styrt av `aria-current="page"` som NavLink setter), hover gir svak glød (`text-shadow`). Fokusringen er som før.
- ÅPEN-skilt (`OpenSign`): fra 1280 px ved telefonnummeret, lyser «ÅPEN» («OPEN») i rødt neon innenfor åpningstidene i FAKTA (mandag til fredag 08:30-16:00, norsk tid via `Intl.DateTimeFormat` med `Europe/Oslo`), ellers slukket med «STENGT» («CLOSED»). Skjermlesere får hele setningen («Åpent nå, stenger 16:00», «Stengt nå, åpner mandag 08:30»). Oppdateres hvert minutt. **Helligdager er ikke med**: skiltet kan lyse ÅPEN på en helligdag som faller på en ukedag. Status regnes bare når skiltet er synlig (fra 1280 px), så telefoner slipper å lage tidssoneformatteren.
- Ved rulling (over 24 px) får headeren en tynn kromkant nederst (`.chrome-edge`, gradient av de tre kromtonene, lagt utenpå boksen) og skiltplaten krymper til 90 % (`transform`). Boksen endrer ikke høyde, så innholdet under flytter seg ikke (CLS 0).
- Mobil: samme uttrykk i kompakt form: båndet, neonkanten og flaggknappen ved siden av ring-knappen og menyen. Headeren er ikke høyere enn før.
- Plass i menyen: Facebook- og Snapchat-ikonene i headeren vises nå bare fra 1536 px (de står også i hero, footer og mobilmeny), logoen er 56 px fra 768 px (var 64), og mellomrommene er strammet. Sjekket på 1024, 1280 og 1440 px: ingen trengsel og ingen linjebrekk, på begge språk.
- Tokens (`tailwind.config.js` og `index.css`): `flag-red` #B22234, `flag-white`, `flag-blue` #3C3B6E (de offisielle flaggfargene, brukt i både USA- og Norge-flagget), `neon` #F79A2B (samme som accent-light), `neon-deep`, `neon-red` #FF4D4D, `chrome-light`/`chrome`/`chrome-dark`. Kontrast (scripts/check-contrast.mjs): ÅPEN-skiltet #FF4D4D på #151412 5,63:1, neonrør #F79A2B på #151412 8,43:1, hvitt på flaggrødt 6,62:1, hvitt på flaggblått 10,28:1, tekst på skiltplaten #F3EFE7 på #0F0E0D 16,82:1. Alle AA. «STENGT» står i `brand-muted-inverse` (8,9:1), ikke i slukket neon, så det også leses.

### Flagg i vind og kustom-detaljer (punkt 3)

- `WavingFlag`: USA-flagg i riktige proporsjoner (10:19) med 13 striper og 50 stjerner (ni rader som veksler mellom seks og fem), laget i SVG og CSS uten video og uten bibliotek. Flagget er én SVG (data-URI, fargene leses fra flagg-tokens på `:root`) som bakgrunn på 14 vertikale skiver, og skivene beveger seg opp og ned i en bølge (bare `transform`, forskjøvet per skive). Første utkast med 14 `<use>` av en SVG-gruppe (900 elementer) kostet synlig i Lighthouse og ble byttet med skivene. Flagget monteres først når det nærmer seg skjermen (IntersectionObserver, 300 px), pauser utenfor skjermen (`is-still`) og i skjult fane, og står stille ved `prefers-reduced-motion`. Det tones ut mot kantene (`mask-image`) og ligger dempet på mørk bunn (opacity 0,2-0,26).
- Plassering: bred bakgrunn øverst i footeren bak navnet (med mørk overtoning fra venstre så teksten leses), og bak marquee-rammen i forsidens hero fra 1024 px (der amerikanske biler er tema).
- Pinstriping: `PinstripeDivider`, et håndtegnet kustom-ornament i SVG i samme stil som kustom-emblemet (hovedlinje med sløyfer, tynn følgelinje, speilet om midten, spiss i midten), som skille før «Utleie» og «Om oss» på forsiden og før galleriet på `/verksted`. Ingen bevegelse.
- Stjerner og striper som svak tekstur i CTA-båndene (`.cta-texture::before`, 6 % opacity, tonet ut mot høyre).

### Min bil som bilskilt (punkt 4)

`LicensePlate` i `MyCarChip`: lys plate med preget skrift (`text-shadow` lys og mørk), skruer i hjørnene, «ALTA · NORWAY» øverst og modell og årsmodell i midten («CAMARO 69», to siste sifre i året). Hele bilen leses av skjermlesere som «Min bil: Chevrolet Camaro 1969» (`role="img"` med `aria-label`, pynten `aria-hidden`). «Bytt» og «Fjern» som før, på begge språk.

### 404 som veiskilt (punkt 5)

`NotFound`: et skilt på kromstolpe (egen SVG) med «404» og «Rute finnes ikke» («Route not found») i neon og en pil, som flimrer én gang når siden kommer (`neon-flicker`) og står stille ved `prefers-reduced-motion`. Tittelen er «Feil avkjøring» («Wrong turn»), med lenker til forsiden, butikken og kontakt. Teksten i skiltet er ekte tekst i SVG, hele skiltet `aria-hidden` siden overskriften sier det samme.

### Ytelse og opprydding (punkt 6)

- Alle nye effekter bruker bare `transform` og `opacity` (båndets glans, neonflimmer, flaggskivene, kromkanten og platen ved rulling), pauser i skjult fane (`html.is-hidden` setter `--play: paused`, som hver animert regel leser; ingen universell selektor) og utenfor skjermen (flagget), og står stille ved `prefers-reduced-motion`. CLS 0 på alle målte ruter.
- Lighthouse: se QA-rapporten. Dagens tall på `/deler/bil` er 87 (tre kjøringer); forrige rundes bygg måler 89 på `/deler/bil` og 88-89 på `/` på samme maskin i dag (målt i en worktree), så maskinen er tregere enn i går (89-93). LCP-elementet er tekst (hintlinjen under søkefeltet, Barlow 400, som allerede er forhåndslastet); «render delay» er JS-kjøring før React tegner, ikke fonten. Gjort: flagget som CSS-skiver, språkvisningen forenklet til ett proxynivå, ÅPEN-skiltet regner ikke status på mobil, forhåndslastingen (hero-bilde og sidechunk) virker også under `/en`. Prøvd og forkastet: forsiden som egen chunk (hovedbunten krympet fra 422 til 316 kB, men `/` fikk ett ledd til i kjeden og falt fra 85 til 80). Å komme stabilt over 90 på denne maskinen i dag krever mindre JS før første tegning (for eksempel forhåndsrendret hero-markup), som er større enn runden.
- Rettet axe-funnet fra runde 5: sporet i `MobileSlider` har `tabIndex={0}`, så det kan rulles med tastatur også når kortene ikke har lenker.
- CLAUDE.md: fontene er selvhostet, og alt innhold skal finnes på norsk og engelsk.

### Klar for go-live (punkt 7)

- `StructuredData` legger JSON-LD i `<head>` for verkstedet (`AutoRepair`) og butikken (`AutoPartsStore`) med navn, beskrivelse, adresse, telefon, e-post, åpningstider (mandag til fredag 08:30-16:00), lenker til Facebook og gtmaskin.com og `inLanguage`, på begge språk. Ingen anmeldelsestall.
- `sitemap.xml` skrives i bygget av Vite-pluginen `gtm-sitemap` (`vite.config.js`): 12 hovedsider og 11 kategorisider på norsk og engelsk (46 adresser) med `hreflang`-alternativer. `SITE_URL` er demo-adressen og byttes ved go-live.
- `noindex` beholdes i `index.html`, `vercel.json` og `robots.txt`. Hva som slås på ved go-live står i STATUS.md.

### Vegas-modus (punkt 8)

`src/lib/vegas.js`: tastene V, E, G, A, S (ikke når man skriver i et felt), eller fem raske trykk på ÅPEN-skiltet eller skiltplaten (innenfor 1,5 s), slår på klassen `vegas` på `<html>` for økten (sessionStorage `gtm-vegas`). Pærene i marquee-rammen løper på 0,4 s (var 1 s), neonen lyser sterkere (plate, meny, ÅPEN, neon-linjen i hero), båndets glans går på 4 s og flagget vaier på 1,1 s. Samme vei slår det av, skjermlesere får «Vegas-modus er på» i en `aria-live`-region. Aldri ved `prefers-reduced-motion`, ingen lyd, og lenker oppfører seg som før (platen er fortsatt lenken til forsiden, trykkene telles ved siden av).

## Runde 5c (22.10.2026): ekte flagg i vind, Ford og Cadillac, kustom-skiltet foran og ny hero på video

Kort rettingsrunde på `feature/runde-5`.

### Kustom-skiltet foran bildene (punkt 1)

Skiltet lå bak bildeshowet etter runde 5b: rammen fikk `relative z-10` for å ligge over flagget, mens skiltet hadde `transform` (rotasjon) uten z-index og havnet under i samme stablingskontekst (`-rotate-3` lager egen kontekst, men z-auto taper mot z-10 hos søsknet). Skiltet har nå `relative z-20` på alle bredder, så det ligger over rammen både i flyt (mobil, der det overlapper nederste kant av rammen som før) og absolutt plassert (fra 1024 px). Plasseringen er uendret, så det dekker ikke bilene mer enn før. Verifisert med `elementFromPoint` på fem punkter i skiltet på 375, 768 og 1440 px (rotasjonen gjør at hjørnene i boksen ligger utenfor skiltet, så punktene ligger 30 % inn).

### Ford og Cadillac (punkt 2)

- Ford: byttet til den offisielle blå ovalen med hvit skrift (`Ford logo flat.svg` fra Wikimedia Commons, Public domain, fra Ford 2017 Annual Report, 1000 × 360 uten luft). Målene i `brands.js` er 1000 × 360 og visningshøyden 28 px (den sorte filen hadde mye luft og 60 px), så ovalen får samme visuelle tyngde som Chevrolet og Cadillac. Logoen er ikke endret.
- Cadillac: beholdt i sort. Merkets gjeldende logo (2021) er ensfarget etter design, og våpenskjoldet i farger (med wreath til 2014, uten wreath 2014-2021) finnes ikke som SVG på Wikimedia Commons (sjekket 22.10.2026, kategorier og søk); bare historiske rastere som `Cadillac Logo 1995.webp`. Å bruke et utgått fargeskjold fra en raster ville vært både feil logo og dårligere kvalitet. Dokumentert i `_kilder/LOGOER.md`. Vil Gjermund ha det gamle fargeskjoldet, trengs en originalfil fra merket.

### Flagget i WebGL (punkt 3)

- Skivene fra runde 5b ga loddrette streker. `WavingFlag` er skrevet om til WebGL uten bibliotek: ett sammenhengende, indeksert nett på 72 × 36 ruter (ingen skjøter), der vertex shaderen legger tre bølger med ulik lengde og fart (`WAVES` i `lib/flagTexture.js`) fra stangsiden mot den frie enden, med utslag som vokser mot enden (`0,15 + 0,85·x`). Normalen regnes fra helningen i shaderen, og fragment shaderen legger diffust lys ovenfra og litt forfra, svak glans på toppene (`pow(…, 28)`) og mørkere i dalene. Kantene vaier litt i bildeplanet.
- Flagget tegnes én gang som tekstur på et canvas 2D (`drawFlag`): proporsjon 10:19, 13 striper, stjernefelt 2/5 × 7/13, 50 stjerner i 9 rader, fargene lest fra flagg-tokenene på `:root`.
- Forsiden: flagget dekker hele heroen (`absolute inset-0`), bak overskrift og knapper; bildeshowet med rammen (`z-10`) og kustom-skiltet (`z-20`) ligger oppå. Opacity 0,34 og en mørk toning (fra `brand-primary` til 85 % over tekstkolonnen på desktop, 90/75/90 % loddrett på mobil). Utsnitt: stjernefeltet synlig fra 768 px (anker venstre), stripene på mobil (anker høyre). Kontrast regnet på verste punkt (hvit stripe ved 34 % over primær = #646463, så 85 % eller 75 % primær over): overskrift #F3EFE7 på #212120 14,05:1 (desktop) og på #292928 12,70:1 (mobil), ingress #B9B2A6 7,66:1 og 6,92:1, neon-linjen og kicker #F79A2B 7,38:1 og 6,67:1. Alle AA (tabell i `scripts/check-contrast.mjs`).
- Footeren: samme komponent, mindre (323 × 170 på mobil, 475 × 250 fra 768 px), opacity 0,2, roligere vind (`speed` 0,8), uttoning mot kantene som før.
- Ytelse: heroen viser først et stillbilde (canvas 2D med folder og lys, `drawStillFlag`: samme bilde tegnet i 1 px kolonner med bølgens forskyvning, så lys og skygge fra helningen), og WebGL tones inn 2,5 s etter load (`useAfterLoad`, 1,2 s overgang). Begge canvasene er absolutt plassert, så LCP-elementet og CLS er uendret (LCP er fortsatt overskriften). Maks 30 bilder i sekundet under 768 px, `devicePixelRatio` begrenset til 1,5. Rendering stopper utenfor skjermen (IntersectionObserver) og i skjult fane (`visibilitychange`), og tiden går ikke mens den er stoppet. Alt ligger utenfor hovedtråden etter oppstart: 4x CPU-struping ga ingen long tasks mens flagget vaiet, og rulling uten trege rammer.
- Reserveløsning: stillbildet alene ved `prefers-reduced-motion`, Save-Data (`navigator.connection.saveData`) og når WebGL mangler eller shaderen ikke kompilerer. Ingen skiver der heller.
- Vegas-modus (`html.vegas`) gir 1,9 ganger farten i vinden.
- Feil funnet underveis: `half` er et reservert ord i GLSL ES, og tall må skrives som flyttall («11.0», ikke «11»); begge ga stille feil (shaderen kompilerte ikke, så bare stillbildet vistes). Konstantene skrives nå med `toFixed(3)`.

### Herobildet på /video (punkt 4)

Utsnittet av `fasade-dag-bilpark` viste mest himmel og tak. Siden handler om film, så butikkvideoen er bakgrunn i heroen som på butikksiden i runde 4c: `PageHero` med `video`, posteren (`butikk-hero-poster`) vises først og er LCP (forhåndslastet via `videoSection.page.heroImage` i `heroImages.js`), videoen starter etter load, ikke ved `prefers-reduced-motion` eller Save-Data. Utsnitt `50% 45%` (klesstativet og kasseapparatet, ikke taket). Teksten ligger på PageHero-overtoningen (primær til gjennomsiktig) som før, så kontrasten er den samme som på `/deler` i runde 4c (AA). Lighthouse `/video` 90.

