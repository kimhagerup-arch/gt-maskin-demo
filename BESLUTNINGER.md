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
- Alle priser, ansatte ut over Gjermund, milepæler etter 2012, produkter, biler til salgs, videoer og anmeldelser er plassholdere i klammer.
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
  - `/om-oss`, kundemottaket: «bygd av entusiaster, for entusiaster» og «som regel en fin bil eller to» er byttet til kundens ord: «innbydende og kreativt» og «til tider svært fine biler».
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

`_kilder/INNHOLD-FRA-GJERMUND.md` skulle være eneste kilde for nytt innhold i runden (scooterdomenet, Snapchat, Facebook-innlegg, videolenker, nytt hovedbilde). Filen finnes ikke. Etter oppdragets regel er strukturen bygd ferdig, plassholderne beholdt, og ingenting gjettet. Hva som mangler står i STATUS.md.

### Feed

- Innleggstekst i feeden skal gjengis ordrett, også stavemåte og emoji, fordi det er sitater fra Facebook. Stavefeil rettes bare i sidetekst, ikke i feeden.
- Når det finnes minst 3 ekte innlegg, viser `SocialFeed` bare de ekte og runder ned til nærmeste multiplum av 3 (3, 6 eller 9). Overskytende innlegg vises ingen steder. Komponenten er fortsatt blind for kilde; `placeholderImage` er et demofelt som ignoreres i drift.
- Lange tekster klippes til fire linjer og lenken skifter til «Les mer på Facebook». Karusell får et lite bildestabel-ikon, video og reel får play-overlegg.

### Video

- Kilder: `youtube` (youtube-nocookie.com), `facebook` (facebook.com/plugins/video.php med `show_text=false`), `mp4` og `snapchat`. Snapchat kan ikke bygges inn og vises som kort med poster og «Se på Snapchat».
- Spillerens ramme er alltid 16:9 så siden ikke flytter seg når en stående video (`aspect: "9:16"`) monteres; den sentreres inne i rammen på svart flate.
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
