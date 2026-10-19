# STATUS

Sist oppdatert: 19.10.2026. Branch `dev`. `npm run build` og `npm run lint` er rene. Alle ruter verifisert i headless Chrome på 375, 768, 1024 og 1440 px uten konsollfeil og uten horisontal overflow. axe-core: 0 funn. Lighthouse mobil: ytelse 90-93, tilgjengelighet 100, beste praksis 100, CLS 0. Se `docs/qa/QA-RAPPORT.md`, seksjon «Runde 2».

**Demoen er klar til å vises.** Et tynt, lukkbart utkastbanner øverst forteller at tekst i klammer fylles inn sammen med kunden.

Rask retting 07.10.2026 (tre commits etter runde 2): telefonnummeret vises som «+47 911 14 628» overalt; Facebook og Snapchat ligger som ikonknapper i header (fra 1024 px), mobilmeny og hero, der Snapchat åpner en QR-dialog til brukernavnet er kjent; safari-banneret på forsiden og `/utleie` har fjellbakgrunn og tre animerte snøscootere (pauses utenfor viewport, én stille scooter ved redusert bevegelse). **Før go-live**: bytt den frilagte produsent-scooteren (`ac-profil.jpg`, kun demo) med GT Maskins egne scootere, og sjekk lisensen på bakgrunnsbildet `Mountain_scootering_Finnmark.jpg` og fyll inn kreditlinjen «Foto: [Fotograf, lisens]». Se BESLUTNINGER.md og BILDELISTE.md.

Rask designretting 08.10.2026: boksen «Kustom Speedshop i Alta» i hero er byttet med et kustom-emblem (mørkt skilt med dobbel kant, nagler, egen pinstriping i SVG, «Kustom» i selvhostet Yellowtail). Kontrast AA på all tekst, axe 0 funn, Lighthouse mobil 90 og CLS 0 på forsiden. Se BESLUTNINGER.md, seksjon «Rask designretting (08.10.2026)».

## Deploy

Demoen ble pushet til GitHub og deployet på Vercel 8. oktober 2026 (gjort av Kim-Ove).

- Repo: `kimhagerup-arch/gt-maskin-demo` (privat), branch `dev`.
- Live: https://gt-maskin-demo.vercel.app
- `X-Robots-Tag: noindex` fra `vercel.json` er verifisert på den live siden. Fjernes først ved go-live på gtmaskin.com.

## Viktig: innholdsfilen fra kunden mangler

Runde 2 skulle hente nytt innhold fra `_kilder/INNHOLD-FRA-GJERMUND.md` (scooterdomenet, Snapchat-brukernavn, Facebook-innlegg, videolenker, eventuelt nytt hovedbilde og hero-video). Filen finnes ikke i repoet. Strukturen for alt dette er bygd ferdig, men innholdet står som plassholdere:

| Mangler | Plassholder nå | Legges inn slik |
|---|---|---|
| Ekte Facebook-innlegg (dato, tekst, permalenke, bilde) | 6 plassholderkort med ekte verkstedbilder bak | Bilde i `assets-raw/`, `PHOTOS` i `scripts/prepare-images.mjs` med mappe `feed`, objekt i `src/data/socialFeed.js`. Ved minst 3 ekte innlegg forsvinner plassholderkortene av seg selv |
| Videolenker (Facebook, YouTube, Snapchat) | 4 plassholdere med play deaktivert | `src/data/videos.js`: `source`, `src`, `aspect`, lokal `poster`. Spilleren er testet mot ekte lenker |
| Snapchat-brukernavn og profiltype | Kun QR-kode, ingen lenke, tekst «[Snapchat-brukernavn bekreftes av Gjermund]» | `src/data/channels.js`: `username`, `profileType`, `url: https://www.snapchat.com/add/<brukernavn>` |
| Hva som ligger på scooterdomenet | Variant B valgt: utleie samlet på `/utleie` med forespørselsskjema, domenet nevnes ikke | Hvis domenet har et bookingsystem kunden vil beholde: legg lenken tilbake i `src/data/rental.js` og `companyFacts.js` (variant A) |
| Nytt hovedbilde til hero | `herobilde-fasade.jpg` valgt etter sammenligning på 1440 px / 2x | Nytt bilde i `assets-raw/`, `PHOTOS`, `hero.image` i `siteContent.js`, preload i `index.html` |
| `hero.mp4` | Stillbilde | Legg filen i `assets-raw/`, kjør `npm run images` |
| Nyere Facebook-tall | «Tall fra Facebook 22. september 2026» beholdt | `src/data/channels.js` |

## Bygget

| Rute | Innhold |
|---|---|
| `/` | Utkastbanner, hero (fasaden i kveldslys), tillitsstripe, Live fra GT Maskin (6 kort, plassholder), Hva vi gjør, GT Maskin på film (spiller, spilleliste, «Se alle videoer»), Biler til salgs (tom tilstand med knapp «Si hva du leter etter»), Deler og nettbutikk (lenkerad Deler / Klær og utstyr), Utleie (4 kort, ATV med ikonfelt, «Se all utleie»), Om oss (kun Gjermund, monogram GT), Kontakt og bestilling |
| `/verksted` | Uendret fra runde 1 |
| `/deler` | Butikk: veksler «Deler» / «Klær og utstyr», kategorichips per gruppe, filter i URL (`?gruppe=klaer&kategori=klaer`), søk, rutenett, handlekurv, Butikken i Myggveien |
| `/deler/:slug` | Produktside. Klær har størrelsesvelger (deaktivert med «[Størrelser bekreftes]» til størrelser er kjent). Tilbake-lenke til riktig gruppe |
| `/kasse` | Handlekurv med størrelse per linje, skjema, suksess |
| `/biler-til-salgs` | PageHero, «Inne hos oss nå» (tom tilstand), «Vi skaffer»-skjema, «Solgte biler» (skjult når tom), «Slik presenteres bilene» (to eksempelkort, vises kun når ingen ekte biler finnes) |
| `/biler-til-salgs/:slug` | Detaljside: galleri (piler, tastatur, swipe), nøkkeltall, beskrivelse, «Spør om bilen». Ukjent slug gir 404 |
| `/video` | PageHero, hovedspiller, rutenett med resten, «Følg GT Maskin» med Facebook og Snapchat-QR |
| `/utleie` | PageHero med snarveier, snøscooter 60 og 120 hk, ATV (ikonfelt), tilhenger og biltransporthenger, safari-banner, utleieforespørsel |
| `/om-oss` | Uendret, plassholderne for ansatte og milepæler beholdt samlet |
| `/bestill` | Uendret |
| `/kontakt` | Adressekort med Ring, E-post og Messenger samlet, Facebook og Snapchat (QR på desktop), skjema |
| `/personvern` | Oppdatert om Messenger, Snapchat og innebygde Facebook- og YouTube-videoer |
| `*` | 404 |

Felles: utkastbanner (lukkes, husket i sessionStorage), sticky header med «Butikk» og «Video» i menyen, mobilmeny, sticky mobil-CTA som skjules ved alle skjemaer, footer med lenkekolonner og kanalknapper (Facebook, Messenger, Snapchat med QR), «Levert av KOVISION».

Teknisk: som runde 1, pluss `VideoPlayer` (YouTube via youtube-nocookie, Facebook via plugins/video.php, mp4, Snapchat som lenke ut, alt først ved klikk), `SocialLinks`, `IconField`, `Placeholder` med felles stil, `HeroPreload` (preloader undersidens hero-bilde fra hovedchunken), `useHideStickyBar`, handlekurv nøklet på slug + størrelse.

## Plassholdere og mock

- Feed: 6 kort merket PLASSHOLDER. Ingen ekte innlegg (se tabellen over).
- Video: 4 plassholdere, play deaktivert til `src` settes. Kilder støttet: facebook, youtube, mp4, snapchat.
- Biler til salgs: `cars` er tom. To eksempelkort merket PLASSHOLDER i seksjonen «Slik presenteres bilene».
- Produkter: 8 deler og 4 klær og utstyr, alle plassholdere med pris «[PRIS]». Klær har `sizes: []` (størrelser bekreftes).
- Utleie: priser «[PRIS]» og «[vilkår]». ATV og vanlig tilhenger har ikke bilde (ikonfelt).
- Om oss: portretter (Gjermund har monogram), to navn, to milepæler, «[ÅR]: [Oppstart, bekreftes av Gjermund]».
- Snapchat: QR uten lenke.
- Verksted: «Maskiner og traktor» har plassholder for bekreftelse.
- Reviews: tom liste, badges skjult.
- Nettbutikk og alle skjemaer (bestilling, kontakt, kasse, biljakt, utleie): mock / UI-only, ingen nettverkskall. `submitForm(kind, payload)` med kind `booking`, `contact`, `checkout`, `biljakt`, `utleie`.
- Hero-video: ingen fil, stillbilde vises.

## KOVISION må gjøre manuelt

1. Skaffe `_kilder/INNHOLD-FRA-GJERMUND.md` eller tilsvarende fra Gjermund, og legge inn innholdet i tabellen øverst.
2. Avklare årstall med Gjermund: logoen viser «2008», selskapet er stiftet 2012.
3. Få bekreftet utleiepriser og vilkår (prisene fra 2022 er ikke brukt).
4. Få liste over biler til salgs med bilder, og avklare om bil1-3 er til salgs. Når første bil legges i `cars`, forsvinner eksempelkortene.
5. Få produktutvalg med navn, merke, pris, varenummer, bilde, lagerstatus, og størrelser for klær.
6. Få navn og roller på ansatte, portretter, og milepæler etter 2012.
7. Verifisere reviews-tall før de legges inn.
8. Bekrefte hovedtelefonnummer (911 14 628 brukt).
9. Bekrefte merkebruk og om logoer kan brukes. Carhartt nevnes i teksten for «Klær og utstyr».
10. Bekrefte teksten om maskiner og traktor.
11. Ved go-live: bytte OG-URL og canonical i `index.html` til gtmaskin.com, fjerne `noindex` i `index.html` og `vercel.json`, endre `public/robots.txt` til `Allow: /` for alle, koble skjemaene til Resend (fem `kind`-verdier), velge Vipps eller Stripe for nettbutikk (fase 2), sette opp personvennlig statistikk.
12. Ved go-live: scooterdomenet videresendes til gtmaskin.com/utleie (301) når nettsiden går live.

## Ikke gjort (bevisst)

- Ingen tredjeparts-script eller eksterne kall før brukeren klikker play (verifisert på alle ruter). Fontene er selvhostet.
- Ingen oppdiktede innlegg, videoer, priser, biler, ansatte eller tall.
