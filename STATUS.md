# STATUS

Sist oppdatert: 22.10.2026 (runde 5c, branch `feature/runde-5`, merges til `dev` av Kim-Ove etter gjennomsyn, så lenken kunden har står urørt). `npm run build`, `npm run lint` og i18n-sjekken er rene. Se `docs/qa/QA-RAPPORT.md`, seksjon «Runde 5c».

Runde 5c (22.10.2026, `feature/runde-5`): rettingsrunde. Kustom-skiltet ligger foran bildeshowet igjen på alle bredder, Ford vises med den blå ovalen (Cadillac beholdt i sort: merkets gjeldende logo er ensfarget, og fargeskjoldet finnes ikke som fri SVG, se BESLUTNINGER.md), flagget er skrevet om til WebGL uten bibliotek (ett nett uten skjøter, tre bølger, lys og skygge i foldene) og dekker hele forsidens hero bak tekst og bilder med mørk toning (kontrast AA), stillbilde først og ved redusert bevegelse, Save-Data og uten WebGL. Heroen på `/video` har butikkvideoen som bakgrunn i stedet for himmelbildet. Lighthouse mobil: `/` 84-86 (som før runden, 85-86), `/video` 90, tilgjengelighet 100 og CLS 0.

**Kim-Ove bør se etter på Samsung-en etter runde 5c:** (1) forsiden: flagget bak hele heroen vaier mykt uten streker, teksten er lett å lese, og kustom-skiltet ligger helt foran bildene. (2) Med «Reduser bevegelse» på: flagget står stille med folder, ingen bevegelse. (3) `/video`: butikkvideoen spiller bak overskriften etter at siden er lastet. (4) Skiltveggen på forsiden: Ford i blått. (5) Rulling på forsiden skal gå like glatt som før.

Runde 5b (22.10.2026, `feature/runde-5`): siden finnes på amerikansk engelsk under `/en` med de samme stiene, språkvelger med flagg tegnet i SVG i headeren og mobilmenyen (USA-flagg og «EN» på norsk, norsk flagg og «NO» på engelsk), en lukkbar stripe «View this site in English» ved engelsk nettleserspråk, valget husket i localStorage, `html lang`, tittel, beskrivelse og hreflang per språk. Headeren har stjerner og striper som smalt bånd øverst, logoen på skiltplate med neonkant som tennes første gang i økten, neonrør under aktiv side, ÅPEN-skilt i norsk tid fra 1280 px og kromkant ved rulling. USA-flagget vaier i SVG og CSS (13 striper, 50 stjerner) i footeren og bak bildeshowet på forsiden, pinstriping skiller seksjoner, CTA-båndene har svak stjerner-og-striper-tekstur, Min bil er et amerikansk bilskilt, og 404 er et veiskilt i neon. JSON-LD for verksted og butikk og `sitemap.xml` ligger klare, indeksering er fortsatt av. Vegas-modus (V, E, G, A, S eller fem trykk på ÅPEN-skiltet) er påskeegget. Alle punkt 1-9 er gjort. **Den engelske teksten er en oversettelse Gjermund bør se over før go-live.** Engelske ord i stiene (`/en/parts/...`) kan komme før go-live; i dag er stiene norske under `/en`. Lighthouse mobil: `/` 85-86, `/deler/bil` 87, `/en` 85, `/en/deler/bil` 87, tilgjengelighet 100 og CLS 0 på alle; forrige rundes bygg måler 89 på `/deler/bil` og 88-89 på `/` på samme maskin i dag, så kravet om stabilt over 90 er ikke nådd (se QA-rapporten for årsak og det som er gjort).

**Kim-Ove bør teste på Samsung-en etter runde 5b:** (1) headeren: båndet øverst, neonkanten rundt logoen (tennes med flimmer første gang, ikke etter oppdatering i samme fane), flaggknappen «EN» ved siden av ring-knappen, og kromkanten når siden rulles. (2) Trykk «EN» på en bilsti i butikken: samme side på engelsk, «NO» tar deg tilbake, og neste besøk på `/` går til `/en` når engelsk er valgt. (3) Med telefonen på engelsk (eller Chrome med engelsk språk): stripen «View this site in English» på norske sider, borte etter lukking. (4) Footeren: flagget vaier bak navnet og står stille når det er ute av skjermen; prøv «Reduser bevegelse» i Android-innstillingene, da skal ingenting bevege seg. (5) Min bil-skiltet i butikken og 404-skiltet (skriv en feil adresse). (6) Priser og tider på engelsk: «NOK 1,595», «Monday to Friday, 8:30 AM to 4:00 PM». (7) Rulling på forsiden og i butikken skal gå glatt.

**Ved go-live skal dette slås på:** fjerne `noindex` i `index.html`, `vercel.json` og `<meta name="robots">`, sette `public/robots.txt` til `Allow: /` og legge inn `Sitemap: https://gtmaskin.com/sitemap.xml`, bytte `SITE_URL` i `vite.config.js` (sitemap), OG-URL og canonical i `index.html` til gtmaskin.com, og se over JSON-LD (`StructuredData.jsx`) når åpningstider og telefon er bekreftet.

Runde 5 (22.10.2026, `feature/runde-5`): butikken er en delekatalog man finner fram i, etter bil og etter kategori. Katalogen er selve siden (lav tittelstripe, søk, Min bil og fire innganger over bretten), treet merke › modell › årsmodell › kategori › deltype foldes ut på stedet i en venstre kolonne fra 1024 px og som trinnvis liste med store trykkflater på mobil, ett søkefelt forstår årsmodell, merke, modell, deltype og varenummer i samme søk («2017 durango eksos»), varene står som tette rader med pris og kjøpsknapp, Min bil huskes og merker det som passer, og tom liste eller null treff gir alltid «Vi skaffer» med bil og deltype ferdig utfylt. Adressen følger valget (`/deler/bil/chevrolet/camaro/1969/bremser/bremseklosser-foran`), gamle lenker videresendes. Butikkvideoen står nederst i «Butikken i Myggveien». Alle punkt 1-8 er gjort. Forenklet: reg.nr.-feltet er ikke bygd (plassen er klar), kjøretøylisten har grove produksjonsintervaller som bekreftes mot det GT Maskin har deler til, og Lighthouse ytelse på `/deler/bil` ligger på 89-93 (fire kjøringer: 93, 92, 89, 89), tilgjengelighet 100 og CLS 0, der den varierende delen er TBT på denne maskinen (se QA-rapporten). Med 2 000 testvarer reagerer treet og listen på under 150 ms per klikk og søket på ca. 45 ms per tastetrykk.

**Kim-Ove bør teste på Samsung-en etter runde 5:** (1) `/deler`: søkefeltet, de fire inngangene og «Velg merke» skal stå i første skjermbilde; trykk Chevrolet, Camaro, 1969, så en kategori: hvert trinn skal få stor trykkflate, «Tilbake» og brødsmuler øverst, og telefonens tilbakeknapp skal gå ett nivå opp. (2) «Min bil»-chipen skal stå øverst etter at årsmodell er valgt, og overleve at fanen lukkes og åpnes igjen; «Bytt» og «Fjern» virker. (3) Søk «2017 durango eksos» og «EKS-1021»: forslagene under feltet, og at Enter går til Durango-delene og rett til varen. (4) Varelisten: to linjer per vare med pris og «Legg i kurv» på samme linje, og handlekurven oppe til høyre med antall. (5) En tom kategori (for eksempel Drivverk og girkasse) skal gi «Fant du ikke delen? Vi skaffer den» med bil og deltype ferdig utfylt i kontaktskjemaet. (6) Butikkvideoen nederst skal spille når man ruller ned til den.

**Gjermund må avklare (runde 5):** hvilke merker og modeller de har mest deler til (bilvelgeren prioriterer og listen justeres), kategoriene i kassesystemet (vi oversetter til katalogens kategorier), og om varelisten kan eksporteres fra kassesystemet (format, hvor ofte, og om lagertall skal vises). Kolonnene vi trenger står i `docs/VARELISTE-FORMAT.md`.

Runde 4 (21.10.2026, `feature/runde-4`): video som åpner med ett trykk (mørk lasteflate, designet poster i stedet for lånte bilder, butikkvideoen «Butikken» først), slider med prikker på mobil for Facebook-feeden og «Hva vi gjør» (`MobileSlider`), «Biler til salgs» ut av header og mobilmeny (tjenestekortet er «Vi skaffer»), Snapchat med lokalt profilkort («Åpne i Snapchat» og «Se historiene her» med skjelett og 8 sekunders timeout), app på mobilen (manifest, service worker, offline-side, «Legg GT Maskin på hjemskjermen»), nye butikkbilder og hero-video fra butikken, og priser fra tavlene på `/verksted` og i «Klær og utstyr». Alle punkt 1-7 er gjort; ingenting ble stoppet. QA-tall i rapporten.

Runde 4b (21.10.2026, samme branch): rettinger etter test på Samsung. Trykk på et videokort starter videoen med en gang (Facebook-spilleren lastes direkte, bare Facebooks egen play-knapp gjenstår), «Åpne i Snapchat» går til den offentlige profilen, manifestet hentes med innloggingscookie (`crossorigin="use-credentials"`), en liten boks foreslår «Legg GT Maskin på hjemskjermen» på mobil (20 sekunder eller halve siden, 14 dagers pause), skiltvegg med merkelogoer (8 SVG-er fra Wikimedia Commons, kilder i `_kilder/LOGOER.md`, Amsoil, Fluid Film og Wunder-Baum som navn) på forsiden og `/deler`, og `translate="no"` på merke-, produkt- og firmanavn og «Ring». Alle fem punkt gjort; ingenting stoppet. **Logobruken avklares med Gjermund før go-live.**

Runde 4c (22.10.2026, samme branch): designrunde. Luften er strammet samlet (32/72 px over og under seksjoner, 16 px sidemarg på mobil), ingresser som gjentok tittelen er tatt ut, Facebook-feeden går kant til kant på mobil med kompakt topp og «Eksempel»-merking, butikkvideoen er flyttet til heroen på `/deler` (skiltveggen rett under), og forsiden har fått et bildeshow med åtte biler i en marquee-ramme med lyspærer og neon på «amerikanske». Alle fire punkt gjort. Ett avvik: Lighthouse mobil på `/deler` ligger på 84-90 (kravet var minst 90), fordi posteren til butikkvideoen nå er LCP-elementet på en side som allerede lå på 85-88; forsiden er på 93. Løftet (lettere hero-bilder, kritisk CSS inline) er større enn runden og står som gjenstående i QA-rapporten.

**Kim-Ove bør teste på Samsung-en etter runde 4c:** (1) forsiden: bildeshowet bytter hvert 5. sekund, sveip bytter bilde, prikkene virker, pærene løper rundt rammen og «amerikanske» lyser. (2) Facebook-feeden: kortene ruller helt ut til kanten uten at siden rulles sidelengs, «Eksempel»-pillen er liten og lesbar. (3) `/deler`: butikkvideoen spiller i heroen (etter at siden er lastet), skiltveggen rett under. (4) Luften: ryddigere på alle sider, 16 px sidemarg.

**Kim-Ove bør teste på Samsung-en i den nye forhåndsvisningen (fra runde 4b):** (1) trykk på et Facebook-kort i «Alle videoer»: spilleren skal komme rett opp, og bare Facebooks play-knapp skal gjenstå; «Butikken» skal spille med ett trykk. (2) «Åpne i Snapchat» skal gå rett til profilen. (3) Appen: «Kan ikke installere»-meldingen skal være borte i den innloggede forhåndsvisningen, boksen skal dukke opp etter 20 sekunder eller halvveis ned, «Ikke nå» skal holde den borte. (4) Skiltveggen på forsiden og `/deler`: ryddig i 3 kolonner. (5) Med Chrome-oversetting på: Dodge, Ram, GT MASKIN og «Ring» skal stå uendret, resten oversettes.

**Testliste fra runde 4 (fortsatt aktuell):** (1) trykk play på butikkvideoen og på en Facebook-video: starter Facebook med ett trykk på iPhone, eller trengs ett til inne i rammen? (2) Sveip sliderne «Live fra GT Maskin» og «Hva vi gjør», og trykk på prikkene. (3) Snapchat: «Åpne i Snapchat» skal åpne appen, «Se historiene her» skal vise skjelett og så historiene. (4) «Legg GT Maskin på hjemskjermen» i footer eller mobilmeny: Android gir Chromes dialog, iPhone gir veiledningen; åpne appen fra hjemskjermen og se at den kjører i fullskjerm og at knappen da er borte. (5) Slå på flymodus og åpne siden fra hjemskjermen: offline-siden skal vises.

Runde 3 (20.10.2026, `feature/runde-3`): hovedspilleren får plass i skjermhøyden (stående video maks 640 px på desktop, maks 70 % av skjermen på mobil), videolisten er en slider med sveip og piler, Facebook og Snapchat har merkefargene overalt, Snapchat-profilen (gtmaskin-as) vises ved klikk på forsiden og `/video`, alt om snøscootersafari er fjernet og banneret er et utleiebanner med egen SVG-illustrasjon, undertittelen i header holder én linje fra 320 px. QA: 15 ruter på 320-1440 px uten overflow og konsollfeil, axe 0 funn, Lighthouse mobil `/` 90, `/video` 90, `/utleie` 90, tilgjengelighet og beste praksis 100, CLS 0.

Runde 3b (21.10.2026): felles seksjonshodemønster (venstrejustert tekstblokk, handlinger under eller i egen kolonne), runde ikonknapper i merkefargene, hjørneradius som tokens (10 px knapper, 8 px felt, runde chips og ikonknapper), Snapchat-seksjon med telefonramme. QA: fire ruter på 320-1920 px uten overflow og konsollfeil, axe 0 funn, Lighthouse mobil `/` 92 og `/video` 90 (to kjøringer hver, pluss `/utleie` 90), tilgjengelighet 100, beste praksis 100, CLS 0.

**Demoen er klar til å vises.** Et tynt, lukkbart utkastbanner øverst forteller at tekst i klammer fylles inn sammen med kunden.

Rask retting 07.10.2026 (tre commits etter runde 2): telefonnummeret vises som «+47 911 14 628» overalt; Facebook og Snapchat ligger som ikonknapper i header (fra 1024 px), mobilmeny og hero, der Snapchat åpner en QR-dialog til brukernavnet er kjent; safari-banneret på forsiden og `/utleie` har fjellbakgrunn og tre animerte snøscootere (pauses utenfor viewport, én stille scooter ved redusert bevegelse). **Før go-live**: bytt den frilagte produsent-scooteren (`ac-profil.jpg`, kun demo) med GT Maskins egne scootere. Bakgrunnsfotoet og kreditlinjen er borte siden runde 3 (egen SVG-illustrasjon). Se BESLUTNINGER.md og BILDELISTE.md.

Ekte videoer 20.10.2026: de seks Facebook-reelene fra `_kilder/INNHOLD-FRA-GJERMUND.md` ligger i `src/data/videos.js` og spiller i spilleren på forsiden og `/video` (verifisert avspilling i headless Chrome). Stående video vises i 9:16-kolonne med uskarp poster bak i hovedspilleren, og som stående kort i rutenettet. Build, lint og axe (0 funn) rene på 375 og 1440 px. Skjermbilder i `docs/qa/skjermbilder/video/`. Titler, stillbilder og datoer for videoene mangler fortsatt fra kunden.

Rask designretting 08.10.2026: boksen «Kustom Speedshop i Alta» i hero er byttet med et kustom-emblem (mørkt skilt med dobbel kant, nagler, egen pinstriping i SVG, «Kustom» i selvhostet Yellowtail). Kontrast AA på all tekst, axe 0 funn, Lighthouse mobil 90 og CLS 0 på forsiden. Se BESLUTNINGER.md, seksjon «Rask designretting (08.10.2026)».

## Deploy

Demoen ble pushet til GitHub og deployet på Vercel 8. oktober 2026 (gjort av Kim-Ove).

- Repo: `kimhagerup-arch/gt-maskin-demo` (privat), branch `dev`.
- Live: https://gt-maskin-demo.vercel.app
- `X-Robots-Tag: noindex` fra `vercel.json` er verifisert på den live siden. Fjernes først ved go-live på gtmaskin.com.

## Viktig: innhold som fortsatt mangler fra kunden

Runde 2 skulle hente nytt innhold fra `_kilder/INNHOLD-FRA-GJERMUND.md` (scooterdomenet, Snapchat-brukernavn, Facebook-innlegg, videolenker, eventuelt nytt hovedbilde og hero-video). Filen ble opprettet 19.10.2026 og inneholder foreløpig bare videolenkene (lagt inn 20.10.2026). Strukturen for resten er bygd ferdig, men innholdet står som plassholdere:

| Mangler | Plassholder nå | Legges inn slik |
|---|---|---|
| Ekte Facebook-innlegg (dato, tekst, permalenke, bilde) | 6 plassholderkort med ekte verkstedbilder bak | Bilde i `assets-raw/`, `PHOTOS` i `scripts/prepare-images.mjs` med mappe `feed`, objekt i `src/data/socialFeed.js`. Ved minst 3 ekte innlegg forsvinner plassholderkortene av seg selv |
| Titler, stillbilder og datoer for de seks videoene | Tittel «Video fra GT Maskin 1-6», eksisterende verkstedbilder som poster, dato og varighet skjult | `src/data/videos.js`: `title`, `poster` (nytt bilde via `PHOTOS` i `scripts/prepare-images.mjs`), `date`, `duration` |
| Hva som ligger på scooterdomenet | Variant B valgt: utleie samlet på `/utleie` med forespørselsskjema, domenet nevnes ikke | Hvis domenet har et bookingsystem kunden vil beholde: legg lenken tilbake i `src/data/rental.js` og `companyFacts.js` (variant A) |
| Nytt hovedbilde til hero | Levert 21.10.2026: butikkvideoen med `hero-poster.jpg` som poster og LCP-bilde | Byttes via `hero.image` og `hero.video` i `siteContent.js` |
| `hero.mp4` | Levert 21.10.2026 (17 s, 3,4 MB), spiller i hero etter load og som «Butikken» i videoseksjonen | Ny fil i `assets-raw/`, kjør `npm run images` |
| Nyere Facebook-tall | «Tall fra Facebook 22. september 2026» beholdt | `src/data/channels.js` |

## Bygget

| Rute | Innhold |
|---|---|
| `/` | Utkastbanner, hero (butikkvideo over poster, stillbilde ved redusert bevegelse eller Save-Data), tillitsstripe, Live fra GT Maskin (6 kort, plassholder, slider med prikker på mobil), Hva vi gjør (slider på mobil, kortet «Vi skaffer»), GT Maskin på film (spiller med ett trykk, spilleliste som slider, «Se alle videoer», Snapchat-kort), Biler til salgs (tom tilstand med knapp «Si hva du leter etter»), Deler og nettbutikk (lenkerad Deler / Klær og utstyr), Utleie (4 kort, ATV med ikonfelt, «Se all utleie»), Om oss (kun Gjermund, monogram GT), Kontakt og bestilling |
| `/verksted` | Som runde 1, pluss blokken «Faste priser» (fem priser fra tavla) og nye butikkbilder i Deler-seksjonen |
| `/en/*` | Hele siden på amerikansk engelsk med de samme stiene (runde 5b). Språkvelger i header og mobilmeny, stripe ved engelsk nettleserspråk |
| `/deler` | Delekatalog (runde 5): lav tittelstripe, søk med forslag, handlekurv, Min bil, innganger «Deler etter bil», «Alle kategorier», «Olje, kjemi og tilbehør», «Klær og utstyr». Tre i sticky kolonne fra 1024 px (`/deler/bil/<merke>/<modell>/<år>/<kategori>/<deltype>`, `/deler/kategori/<kategori>/<deltype>`), trinnvis liste på mobil, tette rader per deltype (klær som rutenett), sortering, «Vis flere», «Vi skaffer», søkeresultater på `/deler/sok?q=`, «Butikken i Myggveien» med video og bilder nederst. Gamle `?gruppe=`-lenker videresendes |
| `/deler/:slug` | Produktside: brødsmuler, deltype, «Passer til», «Passer din bil» / «Passer alle biler» / «Sjekk at den passer, spør oss», «Flere i samme deltype», «Spør om denne delen» med vare og bil. Klær har størrelsesvelger (deaktivert med «[Størrelser bekreftes]» til størrelser er kjent) |
| `/kasse` | Handlekurv med størrelse per linje, skjema, suksess |
| `/biler-til-salgs` | PageHero, «Inne hos oss nå» (tom tilstand), «Vi skaffer»-skjema, «Solgte biler» (skjult når tom), «Slik presenteres bilene» (to eksempelkort, vises kun når ingen ekte biler finnes) |
| `/biler-til-salgs/:slug` | Detaljside: galleri (piler, tastatur, swipe), nøkkeltall, beskrivelse, «Spør om bilen». Ukjent slug gir 404 |
| `/video` | PageHero, hovedspiller i skjermhøyde (ett trykk, lasteflate, designet poster), «Alle videoer» som slider med «Butikken» først, «GT Maskin på Snapchat» med profilkort, «Følg GT Maskin» med Facebook |
| `/utleie` | PageHero med snarveier, snøscooter 60 og 120 hk, ATV (ikonfelt), tilhenger og biltransporthenger, utleiebanner med knapp til skjemaet, utleieforespørsel |
| `/om-oss` | Uendret, plassholderne for ansatte og milepæler beholdt samlet |
| `/bestill` | Uendret |
| `/kontakt` | Adressekort med Ring, E-post og Messenger samlet, Facebook og Snapchat (QR på desktop), skjema |
| `/personvern` | Oppdatert om Messenger, Snapchat og innebygde Facebook- og YouTube-videoer |
| `*` | 404 |

Felles: utkastbanner (lukkes, husket i sessionStorage), sticky header med seks menypunkter («Biler til salgs» er tatt ut), mobilmeny med «Legg GT Maskin på hjemskjermen» nederst, sticky mobil-CTA som skjules ved alle skjemaer, footer med lenkekolonner, kanalknapper (Facebook, Messenger, Snapchat med QR), installeringsknapp og «Levert av KOVISION».

Teknisk (runde 4): `VideoPoster`, `MobileSlider`, `InstallButton` med `useInstallPrompt`, ny `SnapchatSection`, `HeroMedia` med video etter load, `src/data/prices.js`, `public/manifest.webmanifest`, `public/sw.js` (versjon stemplet av Vite-pluginen `gtm-sw-version`), `public/offline.html`, `Cache-Control: no-cache` på sw.js og manifest i `vercel.json`. Service worker registreres bare i produksjonsbygg, etter load.

Teknisk (runde 3): `VideoShowcase` med `VideoSlider` og `VideoCard`, `SnapchatSection`, `SocialMarks`, `RentalBanner`, `useAfterLoad`, Vite-plugin `gtm-hero-preload` (preload av hero-bilde, fonter og sidechunk per rute, erstatter `HeroPreload`). Tidligere: som runde 1, pluss `VideoPlayer` (YouTube via youtube-nocookie, Facebook via plugins/video.php der reel-lenker skrives om til `/GtMaskinas/videos/<id>/`, mp4, Snapchat som lenke ut, alt først ved klikk, stående video i 9:16-kolonne med uskarp poster bak), `SocialLinks`, `IconField`, `Placeholder` med felles stil, `HeroPreload` (preloader undersidens hero-bilde fra hovedchunken), `useHideStickyBar`, handlekurv nøklet på slug + størrelse.

## Plassholdere og mock

- Feed: 6 kort merket PLASSHOLDER. Ingen ekte innlegg (se tabellen over).
- Video: butikkvideoen «Butikken» (mp4, egen poster) og 6 ekte Facebook-reels. Reelene har nummererte titler og ingen poster (designet poster vises) til kunden sender titler og stillbilder. Kortvalg starter videoen direkte; Facebook-spilleren krever ett trykk til på mobil (Facebooks egen play-knapp). Kilder støttet: facebook (også reel-lenker), youtube, mp4, snapchat.
- Merkelogoer: 8 SVG-er fra Wikimedia Commons i `public/images/merker/`, Amsoil, Fluid Film og Wunder-Baum som navn. Bruken avklares med Gjermund før go-live.
- Biler til salgs: `cars` er tom. To eksempelkort merket PLASSHOLDER i seksjonen «Slik presenteres bilene».
- Produkter: 32 eksempeldeler på fem biler (Chevrolet Camaro 1967-1969, Chevrolet Silverado 2014-2018, Dodge Durango 2011-2023, Ram 1500 2019-2024, Tesla Model 3 2017-2023) og sju oljer og kjemi fra Amsoil og Fluid Film, alle merket «Eksempel» med varenummer `EKS-1001` og videre, merke og pris i klammer. Wunder-Baum (35 kr) under tilbehør. «Klær og utstyr» har fem ekte varer med pris fra tavla (T-skjorte, Caps, Stetson caps, Kopp, Nøkkelring), prisene bekreftes av Gjermund. T-skjorte har `sizes: []` (størrelser bekreftes), kopp og nøkkelring mangler bilde. Kategoritreet (11 hovedkategorier) og kjøretøylisten (16 merker, 100 modeller) er forslag som justeres mot kassesystemet og delelageret.
- Utleie: priser «[PRIS]» og «[vilkår]». ATV og vanlig tilhenger har ikke bilde (ikonfelt).
- Om oss: portretter (Gjermund har monogram), to navn, to milepæler, «[ÅR]: [Oppstart, bekreftes av Gjermund]».
- Snapchat: ekte brukernavn og lenker (gtmaskin-as). Profilkortet er lokalt; historiene hentes fra Snapchat først ved trykk på «Se historiene her».
- Verkstedpriser: fem faste priser fra tavla i butikken 21.10.2026, bekreftes av Gjermund før go-live.
- Verksted: «Maskiner og traktor» har plassholder for bekreftelse.
- Reviews: tom liste, badges skjult.
- Engelsk: oversettelse av alle tekster i `src/data/en/` (runde 5b), ikke sett over av Gjermund ennå. Eksempelvarer, kategorier og modellnavn er oversatt; merker og firmanavn står som de er.
- Nettbutikk og alle skjemaer (bestilling, kontakt, kasse, biljakt, utleie): mock / UI-only, ingen nettverkskall. `submitForm(kind, payload)` med kind `booking`, `contact`, `checkout`, `biljakt`, `utleie`.
- Hero-video: butikkvideoen står i «Butikken i Myggveien» nederst på `/deler` og spiller når den nærmer seg skjermen (stillbilde ved redusert bevegelse). Forsiden har bildeshow med åtte biler fra repoet (`src/data/heroSlides.js`), flere bilder kommer fra Gjermund.
- App på mobilen: manifest og service worker er på plass, ingen push-varsler. Knappen «Legg GT Maskin på hjemskjermen» vises bare der nettleseren kan installere (Chrome/Android) eller på iPhone/iPad (veiledning).

## KOVISION må gjøre manuelt

1. Få resten av innholdet fra Gjermund inn i `_kilder/INNHOLD-FRA-GJERMUND.md` og legge det inn etter tabellen øverst. For videoene: titler, et stillbilde per video og gjerne dato.
2. Avklare årstall med Gjermund: logoen viser «2008», selskapet er stiftet 2012.
3. Få bekreftet utleiepriser og vilkår (prisene fra 2022 er ikke brukt).
4. Få liste over biler til salgs med bilder, og avklare om bil1-3 er til salgs. Når første bil legges i `cars`, forsvinner eksempelkortene.
5. Få varelisten fra kassesystemet i formatet i `docs/VARELISTE-FORMAT.md` (varenummer, navn, merke, kategori, deltype, pris, lager, bilde, passer til) og legge den inn i `src/data/products.js`; slette eksempelvarene. Få bekreftet prisene fra tavlene (verksted og klær og utstyr) og hva timeprisen gjelder. Bilder av kopp og nøkkelring mangler.
17. Avklare med Gjermund: merker og modeller de har mest deler til, kategoriene i kassesystemet, og eksport av varelisten (se øverst). Justere `src/data/vehicles.js` og `src/data/catalog.js` etter svaret. Reg.nr.-oppslag (felt foran merke og modell) bygges når en leverandør er valgt.
6. Få navn og roller på ansatte, portretter, og milepæler etter 2012.
7. Verifisere reviews-tall før de legges inn.
8. Bekrefte hovedtelefonnummer (911 14 628 brukt).
9. Bekrefte merkebruk og om logoer kan brukes. Carhartt nevnes i teksten for «Klær og utstyr».
10. Bekrefte teksten om maskiner og traktor.
11. Ved go-live: bytte OG-URL og canonical i `index.html` til gtmaskin.com, fjerne `noindex` i `index.html` og `vercel.json`, endre `public/robots.txt` til `Allow: /` for alle, koble skjemaene til Resend (fem `kind`-verdier), velge Vipps eller Stripe for nettbutikk (fase 2), sette opp personvennlig statistikk. Service worker og manifest trenger ingen endring ved go-live (start_url og scope er «/»).
13. Teste på ekte telefon (se øverst): Facebook-video, slidere, Snapchat-kortet, installering på Android og iPhone, offline-siden, app-boksen, skiltveggen og oversetting.
16. Få flere bilder av biler til bildeshowet på forsiden (se BILDELISTE.md), og bekrefte om den røde klassikeren på `bil1.jpg` og `vinter-bil-fasadeskilt.jpg` er samme bil som på `hero.jpg`.
14. Avklare logobruken (Chevrolet, Dodge, Ram, Ford, Cadillac, Tesla, Carhartt, Stetson) med Gjermund før go-live, og få originalfiler for Amsoil, Fluid Film og Wunder-Baum (vises som navn nå). Se `_kilder/LOGOER.md`.
15. Få originalfilene til de seks reelene fra Gjermund før go-live: egne videofiler (som «Butikken») spiller med ett trykk, Facebook-spilleren krever alltid ett trykk til på mobil.
12. Ved go-live: scooterdomenet videresendes til gtmaskin.com/utleie (301) når nettsiden går live.

## Ikke gjort (bevisst)

- Ingen tredjeparts-script eller eksterne kall før brukeren klikker play (verifisert på alle ruter). Fontene er selvhostet.
- Ingen oppdiktede innlegg, videoer, priser, biler, ansatte eller tall.
