# ARBEIDSLOGG



## 22.10.2026: runde 5b, engelsk med USA-flagg, neon og krom i headeren og flagg i vind

Samme branch, `feature/runde-5`, etter runde 5.

**Gjort, per punkt**

1. Engelsk: `src/data/nb/` og `src/data/en/` (15 modulpar, samme form), tospråklige fasader i `src/data/` med `localized()` (`src/i18n/localized.js`), `LocaleProvider`, `LocaleLink` (Link, NavLink, Navigate, useNavigate med `/en`), ruter under `/` og `/en` i `App.jsx`, `LangSwitch` med SVG-flagg (`FlagIcon`), `LangStripe`, `html lang` og hreflang, `formatPrice`/`formatNumber`/`formatDate` etter språk, tospråklig `offline.html`, `scripts/check-i18n.mjs` i `npm run lint`. Små komponenttekster flyttet til `a11y`.
2. Header: `FlagBand`, `NeonPlate` (tenning én gang per økt), `.nav-neon`, `OpenSign` med `lib/openingHours.js` (Europe/Oslo), kromkant og platekrymp ved rulling, tokens for flagg, neon og krom, kontrast målt. Sosiale ikoner i header bare fra 1536 px.
3. `WavingFlag` (én SVG som data-URI på 14 CSS-skiver, monteres nær skjermen, pauser utenfor og i skjult fane), `PinstripeDivider`, `.cta-texture`. Plassert i footer, forsidens hero, før «Utleie» og «Om oss» på forsiden og før galleriet på `/verksted`.
4. `LicensePlate` i `MyCarChip`.
5. `NotFound` som veiskilt i neon, tekster `notFoundPage.shop`, `signTop`, `signBottom`.
6. `html.is-hidden` → `--play: paused` på de animerte reglene, `MobileSlider`-sporet med `tabIndex={0}`, CLAUDE.md oppdatert, ytelsestiltak (se BESLUTNINGER.md).
7. `StructuredData` (JSON-LD, AutoRepair og AutoPartsStore), Vite-plugin `gtm-sitemap` (46 adresser med hreflang), noindex beholdt.
8. `src/lib/vegas.js`: tastene og fem trykk, klassen `vegas`, pause i skjult fane.
9. QA: se `docs/qa/QA-RAPPORT.md`, seksjon «Runde 5b».

**Beslutninger**: BESLUTNINGER.md, seksjon «Runde 5b».

## 22.10.2026: runde 5, delekatalog etter bil og kategori

Branch `feature/runde-5` fra `dev`. Katalogen er drevet av data (`catalog.js`, `vehicles.js`, `products.js`) og bygd etter mønsteret fra en stor amerikansk delekatalog, med GT Maskins egen stil.

**Gjort, per punkt**

1. Datamodell: kategoritre (11 hovedkategorier, 56 deltyper, lucide-ikon per kategori), kjøretøy (16 merker, 100 modeller med produksjonsår, «Annet merke eller modell» sist), varer med `category`, `type`, `fits` eller `universal`. 32 eksempeldeler på fem biler (EKS-1001 og videre, merket «Eksempel»), sju oljer og kjemi fra Amsoil og Fluid Film, Wunder-Baum og klær som før. Plass til reg.nr.-felt foran merke og modell.
2. `/deler`: lav tittelstripe, søk og handlekurv øverst, Min bil, fire innganger som faner (to rader på mobil), tre i sticky venstre kolonne fra 1024 px, trinnvis liste på mobil, «Butikken i Myggveien» nederst med butikkvideoen (monteres når den nærmer seg viewport) og bildene. Gamle lenker videresendes, lenkene på forsiden peker på de nye inngangene.
3. Treet: merke › modell › årsmodell (per tiår) › kategori (med antall, dempet uten varer) › deltype, logoknapper og alfabetisk liste med bokstavlinje, «Alle kategorier» uten bilvalg, pluss og minus på stedet, én gren åpen per nivå, lesbare stier, `aria-expanded`, fokus til overskrift på mobil.
4. Varelisten: tette rader per deltype (bilde eller kategoriikon, navn, merke, varenummer, passer til, lager, pris med tabulære sifre, kjøpsknapp), to linjer på mobil, rutenett for klær, sortering relevans og pris, 50 om gangen, «Vi skaffer» under og ved tom liste.
5. Søk: ett felt for årsmodell, merke, modell, kategori, deltype, varenavn og varenummer i vilkårlig rekkefølge, forslag i tre grupper med piltaster og Enter, eksakt varenummer rett til varen, null treff gir «Vi skaffer».
6. Min bil: localStorage i try/catch, chip med «Bytt» og «Fjern», «Deler etter bil» åpner på bilen, bonus i søk, «Passer din bil» på rader og produktside.
7. Produktsiden: brødsmuler, deltype, «Passer til», sjekk mot Min bil, «Flere i samme deltype», «Spør om denne delen» med vare og bil. Størrelser på klær som før.
8. QA: se `docs/qa/QA-RAPPORT.md`, seksjon «Runde 5». Linjeskift normalisert til LF med `.gitattributes` (Biome).

**Beslutninger**: BESLUTNINGER.md, seksjon «Runde 5». **Format for varelisten**: `docs/VARELISTE-FORMAT.md`.

## 22.10.2026: runde 4c, mindre luft, bildeshow i USA-stil og butikkvideo på butikksiden

Samme branch, `feature/runde-4`, etter runde 4b.

1. Luft: `section-pad` 32/72 px, `container-site` 16 px på mobil, seksjonsgap 6/8, egne paddinger i hero, PageHero, `/verksted`, `/utleie`, tillitsstripen, footer og utleiebanneret strammet i samme forhold, sliderne ut til 16 px-kanten (`MobileSlider`, `VideoSlider`, `.player-portrait`). Tekst kortet ned (våre egne linjer, ikke Gjermunds): feed-ingressen, «Hva vi gjør»-ingressen, videoseksjonens ingress på forsiden, setningen om lasting på `/video`, Snapchat-ingressen, gruppeingressene og butikkingressen på `/deler`, og den ekstra linjen i utleieskjemaet. Gjennomgått på `/`, `/deler`, `/video`, `/verksted`, `/utleie` og `/om-oss` ved 375 og 1440 px.
2. Feed: `SocialFeed` med lokalt seksjonshode (kicker, tittel, talllinje, liten blå knapp på raden fra 768 px), `FeedCard` med bilde og tittel, «Eksempel»-pille i stedet for PLASSHOLDER-feltet, ingen tekst i hakeparentes, `translate="no"` på sidenavnet. Målt på 375 px: første kort ved 16 px, siste kort rulles til 359 px, `scrollWidth` lik viewport.
3. Butikkvideo: `PageHero` fikk `video` (bakgrunn via `HeroMedia` med `sizes` og `imgClassName`), `/deler` bruker `partsSection.page.heroImage/heroVideo`, skiltveggen i egen stripe under heroen, `heroImages.js` oppdatert for `/` og `/deler`, `HomeHero` uten video.
4. Bildeshow: `HeroSlideshow` og `heroSlides.js` (åtte biler), marquee-ramme, neon og zoom i `index.css`, `hero.neonLine` og etiketter i `siteContent.js`. Verifisert i headless Chrome: bytte etter 5 s, pause ved hover, fokus og skjult fane, prikk-klikk, sveip på mobil (0 til 1), zoom-transform 1,079 på aktivt bilde, pærer animert; ved reduced motion ingen bytte, ingen zoom-klasse og animasjon 0,01 ms. Første bilde forhåndslastet. Lighthouse ga først 77 fordi de sju andre bildene ble forespurt rett etter `load`, før første maling; nå monteres de 2,5 s etter `load` (også butikkvideoen på `/deler`), og pærene blinker med `opacity` i stedet for `background-position`.
5. QA: se `docs/qa/QA-RAPPORT.md`, seksjon «Runde 4c».

## 21.10.2026: runde 4b, retting etter test på Samsung

Samme branch, `feature/runde-4`. Kim-Oves funn: 4-5 trykk før en Facebook-video spilte, Snapchat-lenken åpnet kameraet, «Kan ikke installere denne appen» i den innloggede forhåndsvisningen, ønske om pop-up for installering, merkelogoer i stedet for tekstbrikker, og Chrome-oversetting av merkenavn.

1. Video: `VideoShowcase` setter `autoStart` ved kortvalg, `VideoPlayer` starter da med spilleren montert (ingen poster og play-knapp imellom), `LoadingMark` fjernes fra DOM ved `onLoad`. Målt: mp4 spiller etter 0,43-0,45 s, Facebook-iframen tonet inn etter 0,65-1,2 s og fyller rammen i 9:16 uten egne lag over; Facebooks egen play-knapp gjenstår.
2. Snapchat: `addUrl` fjernet, alle «Åpne i Snapchat»-lenker bruker `channels.snapchat.url` (den offentlige profilen). Verifisert: bare én Snapchat-adresse i DOM på `/video`.
3. App: `crossorigin="use-credentials"` på manifest-lenken; ny `InstallPrompt` i `Layout` (tid 20 s eller halve siden, ikke på `/kasse` og `/bestill`, ikke ved skjemafokus, ikke i standalone, bare med prompt eller iOS, 14 dagers pause i localStorage, fixed over bunnlinjen, Escape lukker, ingen fokusfelle). `InstallDialog` eksportert fra `InstallButton`. Verifisert alle vilkårene i headless Chrome.
4. Merker: `brands.js` med logo, viewBox-mål og `logoHeight` per merke; åtte SVG-er fra Wikimedia Commons (søkt via API, lisens og opphav lest fra `extmetadata`, filene sjekket for script og eksterne referanser, rendret og kontrollert visuelt) i `public/images/merker/`, kilder i `_kilder/LOGOER.md`. `BrandWall` (plater, nagler, skygge, 3/4/6 kolonner) erstatter `BrandChips` på `/deler` (hero og butikkseksjon) og forsiden (alle merker under seksjonshodet i «Deler og nettbutikk»).
5. `translate="no"` på merkenavn, produktnavn (kort, produktside, kurv, kasse), firmanavn (logo, footer) og «Ring».
6. QA: se `docs/qa/QA-RAPPORT.md`, seksjon «Runde 4b».

## 21.10.2026: runde 4, video med ett trykk, slidere, Snapchat, app og butikkbilder

Branch `feature/runde-4` fra `dev`. Nye filer i `assets-raw/` (butikkbilder og `hero.mp4`) og `_kilder/PRISER-FRA-TAVLENE.md` kom inn under runden.

**Kartlegging av videoflyten før endring** (headless Chrome mot `npm run preview`, `/video`, 375 og 1440 px):

- Facebook (de seks reelene): før trykk viste rammen et lånt verkstedbilde (`verksted-cabriolet-kobber-400.webp`). Ved trykk ble bildet byttet mot svart flate og iframe mot `plugins/video.php?autoplay=true` montert etter 38-104 ms. Pluginen var lastet etter 0,45 s (1440) og 1,1 s (375) og viste da Facebooks eget stillbilde av videoen med egen play-knapp. `<video>` i pluginen hadde `readyState` 4, men sto i pause (`currentTime` 0) i 20 sekunder: ett trykk til var nødvendig. Sekvensen for brukeren var altså lånt bilde, svart, Facebooks bilde, trykk, video.
- YouTube (kode, ingen data i `videos.js`): iframe mot `youtube-nocookie.com/embed/<id>?autoplay=1&rel=0` uten `playsinline`, så iPhone kunne åpne videoen i fullskjerm i stedet for i rammen.
- mp4 (kode, ingen data): `<video controls autoPlay preload="none">` uten `playsinline`, montert ved trykk, uten lasteflate.
- Felles: `allow="autoplay; encrypted-media; picture-in-picture"` uten `fullscreen`, ingen lasteindikator, ingen inntoning. Rammen hadde fast størrelse, så ingen layoutforskyvning.

**Gjort, per punkt**

1. Video: `VideoPlayer` viser mørk flate med lasteindikator (ring i `brand-accent`, «Laster video») fra trykk til `onLoad`, og toner inn iframe/video. mp4 i `<video playsInline autoPlay>` med `play()` som sikring, YouTube med `autoplay=1&playsinline=1`, Facebook med `autoplay=true`, alle med `allow="autoplay; encrypted-media; picture-in-picture; fullscreen"`. Ny `VideoPoster` (mørk flate, kildemerke, tittel, play) for videoer uten eget stillbilde; de seks reelene har `poster: null` i stedet for lånte bilder. Butikkvideoen (`hero.mp4`, 17 s, poster `butikk-hero-poster`) ligger først som «Butikken». Målt etter endring (375 og 1440): mp4 spiller etter 0,36-0,40 s, YouTube etter 3,2-3,6 s, Facebook-pluginen er lastet etter 0,8-1,1 s men står fortsatt i pause i headless (se BESLUTNINGER.md). Ingen eksterne kall før trykk, ingen layoutforskyvning (rammen måler det samme før og etter).
2. Slider: `MobileSlider` (scroll-snap, prikker med `aria-label` «Gå til kort n av m» og `aria-current`, fokus ruller kortet inn, `overflow-y: hidden` så sporet aldri ruller loddrett) brukt i `SocialFeed` og `ServiceCards`; fra 768 px uendret rutenett. Målt på 320 og 375 px: kort 223/268 px brede innenfor skjermen, prikken følger sveip, prikk-klikk ruller riktig kort inn, Tab ruller sporet tilbake, loddrett sveip over sporet ruller siden. 768 og 1440 px: `display: grid`, prikker skjult.
3. «Biler til salgs» ut av `nav.items`; tjenestekortet er «Vi skaffer» (`carsSection.wanted`, lenke `/biler-til-salgs#vi-skaffer`, ikon `Search`). Header sjekket på 1024 og 1280 px.
4. Snapchat: ny `SnapchatSection` med lokalt profilkort (logo, tittel, @gtmaskin-as, «Åpne i Snapchat» til `snapchat.com/add/gtmaskin-as`, «Se historiene her»), iframe på `pointerdown` (første forespørsel etter 18-20 ms), skjelett med story-ringer, inntoning ved `onLoad` (0,6-1,5 s), «Åpne i Snapchat» i rammen etter 8 s uten svar (verifisert med blokkert snapchat.com). Null eksterne kall før trykk.
5. App: `manifest.webmanifest` (standalone, nb, ikoner 192/512/512 maskable/180 fra `generate-favicons.mjs`), `sw.js` (navigering nettverk først med `offline.html`, `/assets/` cache først, eksterne urørt, versjonert cachenavn stemplet av `gtm-sw-version`, skipWaiting og clients.claim), `offline.html`, registrering kun i prod etter load, `no-cache` på sw.js og manifest i `vercel.json`, `InstallButton` i footer og mobilmeny med `useInstallPrompt` (beforeinstallprompt, iOS-dialog, skjult i standalone). Verifisert: `Page.getInstallabilityErrors` tom, offline-siden vises når serveren stoppes, assets i cache, HTML aldri i cache.
6. Bilder: 18 butikkbilder og `hero.mp4` i `PHOTOS` og `npm run images` (54 bilder i manifestet). Hero: poster som LCP, video etter load, ikke ved reduced motion eller Save-Data; utsnitt sjekket på 375, 1024 og 1440 px og beholdt. `butikk.jpg`, `butikk5.jpg` og `butikk7.jpg` byttet ut overalt. BILDELISTE.md oppdatert.
7. Priser: `src/data/prices.js` og blokken «Faste priser» på `/verksted`; «Klær og utstyr» med T-skjorte, Caps, Stetson caps, Kopp, Nøkkelring og Wunder-Baum under tilbehør, med bilder fra punkt 6 der de passer. Kilde og forbehold i BESLUTNINGER.md.
8. QA: se `docs/qa/QA-RAPPORT.md`, seksjon «Runde 4».

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
