# BILDELISTE

Bilder som fortsatt mangler, med ønsket motiv, hvor de brukes, format og størrelse. Alle leveres til `assets-raw/`, legges inn i `PHOTOS`-listen i `scripts/prepare-images.mjs` og kjøres gjennom `npm run images`.

Sist oppdatert 21.10.2026 (runde 4). Nye bilder og video fra butikken, fotografert 21.10.2026, er lagt inn (se «Butikkbilder 21.10.2026» nederst). Hero-videoen er levert. Safari-banneret er blitt et utleiebanner med egen SVG-illustrasjon som bakgrunn, så fotoet og lisensspørsmålet er borte.

## Mangler

| Motiv | Brukes | Format | Størrelse | Kommentar |
|---|---|---|---|---|
| Bilder fra ekte Facebook-innlegg (ett per innlegg, første bilde ved karusell) | Feed på forsiden | jpg | som lastet ned fra Facebook | Mappe `feed` i `PHOTOS`, nøkkel `/images/feed/<kort-slug>`. Dato, tekst ordrett og permalenke må følge med |
| Videoposter for de seks Facebook-reelene (ett stillbilde per video) | Videoseksjonen og `/video` | jpg | 1080×1920 (9:16) | Spilleren laster ingen eksterne miniatyrer før klikk. Uten eget bilde vises nå en designet poster (mørk flate, tittel og play), ikke et lånt verkstedbilde. Butikkvideoen har egen poster |
| Flere bilder av biler til bildeshowet på forsiden: prosjekter, biler inne til arbeid og ferdige biler | Forsiden, hero (bildeshow, 480×560 på desktop, 16:10 på mobil) | jpg | min. 1600 px bred, helst liggende | Uten personer. Legges i `assets-raw/`, `PHOTOS` og `src/data/heroSlides.js`. I dag åtte bilder fra repoet, noen bare 750-960 px brede |
| Nye verkstedbilder uten personer i bakgrunnen (erstatter `verksted4.jpg` og `verksted10.jpg`) | `/verksted`, «Europeiske biler og Tesla» og «Veteran og classic» | jpg | min. 1600 px bred | De to bildene står til nye kommer, se spørsmål 5 |
| ATV | `/utleie` og utleiekort på forsiden | jpg | min. 1600 px bred, 16:10 | Vises nå som designet ikonfelt, ikke tom plassholder |
| Vanlig tilhenger (ikke biltransporthenger) | `/utleie`, kortet «Tilhenger og biltransporthenger» | jpg | min. 1600 px bred | Kun biltransporthenger finnes |
| Portrett Gjermund Thomassen | Om oss (forside og `/om-oss`) | jpg | min. 1200 px, 4:5 stående | Forsiden viser monogram «GT» til bildet kommer |
| Portretter av øvrige ansatte og lærlinger | `/om-oss` | jpg | min. 1200 px, 4:5 stående | Navn og rolle må følge med |
| Biler til salgs, 3-6 bilder per bil (front, side, bak, interiør) | `/biler-til-salgs`, detaljside med galleri, forsiden | jpg | min. 1600 px bred, 4:3 | Merke, modell, årsmodell, km, motor og pris må følge med. Galleriet tar flere bilder per bil (`images` og `imageAlts`) |
| Produktbilder, deler | `/deler`, produktside, handlekurv | jpg eller png | min. 1200 px, 4:3, nøytral bakgrunn | Navn, merke, pris, varenummer og passer-til må følge med |
| Produktbilder, klær og capser | `/deler?gruppe=klaer`, produktside | jpg eller png | min. 1200 px, 4:3 eller 3:4 | Navn, merke, pris og størrelser må følge med. `butikk-klaer` og `butikk-capser` brukes bak PLASSHOLDER-etiketten nå |
| GT Maskins egne snøscootere i profil, frilagt eller på jevn bakgrunn | Animert utleiebanner (forsiden og `/utleie`) | png med gjennomsiktighet, eller jpg på hvit bakgrunn | min. 1400 px bred | `ac-profil.jpg` som brukes nå er produsentens bilde og kun for demo. Byttes før go-live |
| Vinterbilde fra vidda med GT Maskins scootere (valgfritt) | Utleiebanner på forsiden og `/utleie` | jpg | min. 1600 px bred, liggende | Banneret har nå en egen SVG-illustrasjon (`public/images/utleie/vidde.svg`, 3 kB) som fungerer uten foto. Et eget bilde kan erstatte den senere |
| Lærling i arbeid | Om oss (lærebedrift), feed-plassholder 6 | jpg | min. 1600 px bred | |

## Spørsmål til Gjermund

1. Er bilene på `bil1.jpg` (rød Cadillac), `bil2.jpg` (gul Camaro SS) og `bil3.jpg` (sort Corvette) til salgs, kundebiler eller egne? De brukes i dag kun i galleriet på `/verksted`.
2. Kan logoene til Amsoil, Fluid Film, Carhartt, Chevrolet, Dodge, Ram, Ford, Cadillac og Tesla brukes på siden? I dag vises kun navnene som tekst.
3. Hva står «2008» på logoen for? Når startet virksomheten?
4. Utgår: snøscootersafarien er avsluttet (opplyst 20.10.2026).
5. Er det greit at bildene fra Facebook brukes slik de er i demoen (personer i bakgrunnen på `verksted4.jpg` og `verksted10.jpg`)? `butikk.jpg`, `butikk5.jpg` og `butikk7.jpg` er byttet ut med de nye butikkbildene fra 21.10.2026 og brukes ikke lenger.
6. Besvart 20.10.2026: Snapchat-brukernavn gtmaskin-as, offentlig profil. Lagt inn.
7. Delvis besvart 19.10.2026: seks Facebook-reels er lagt inn. Titler og stillbilder per video mangler fortsatt.

## Bilder i bruk (fra `assets-raw/`)

| Fil | Brukt som | Hvor |
|---|---|---|
| logo2.jpg | Logo (trimmet, gjennomsiktig) | Header, footer, favicon, OG |
| herobilde-fasade.jpg | PageHero, adressekort, OG-bilde. Ikke lenger hero på forsiden (byttet med butikkvideoen i runde 4) | `/kontakt`, `/bestill` |
| herobilde.jpg | Ikke lenger i hero (886 px, innbakt tekst). Ligger klargjort i `public/images/hero/` | |
| hero.jpg | PageHero, tjenestekort «Veteran og classic» | `/verksted`, forside |
| vinter-bil-fasadeskilt.jpg | PageHero | `/biler-til-salgs` |
| utside2.jpg | Ikke lenger i hero på `/video` (byttet med butikkvideoen i runde 5c, utsnittet viste mest himmel). Ligger klargjort i `public/images/bygg/` | |
| verksted.jpg | Tjenestekort, videoposter (hovedvideo), galleri | Forside, `/video`, `/verksted` |
| verksted2.jpg | Veteran og classic, videoposter | `/verksted`, forside, `/video` |
| verksted3.jpg | Reparasjon, feed-plassholder | `/verksted`, forside |
| verksted4.jpg | Europeiske biler og Tesla | `/verksted` |
| verksted5.jpg | Reparasjon, feed-plassholder | `/verksted`, forside |
| verksted7.jpg | Maskiner og traktor | `/verksted` |
| verksted8.jpg | Galleri | `/verksted` |
| verksted9.jpg | Tjenestekort custom, custom-seksjon, feed-plassholder | Forside, `/verksted` |
| verksted10.jpg | Veteran og classic | `/verksted` |
| motor.jpg | Custom-seksjon | `/verksted` |
| butikk.jpg | Ikke lenger i bruk (personer i bakgrunnen, byttet med `butikk-mobil-vegg.jpg` i runde 4). Ligger fortsatt i `public/images/butikk/` som `butikk-oljehylle` | |
| butikk2.jpg | Butikkbilder | `/deler` |
| butikk3.jpg | Tjenestekort deler, feed-plassholder | Forside |
| butikk4.jpg | Stort butikkbilde, videoposter | Forside, `/video` |
| butikk5.jpg | Ikke lenger i bruk (personer i bakgrunnen, byttet med `butikk-disk.jpg`). Ligger som `kundemottak-sofa-cabriolet` | |
| butikk6.jpg | Tjenestekort «Vi skaffer», kundemottaket, feed-plassholder | Forside, `/om-oss` |
| butikk7.jpg | Ikke lenger i bruk (personer i bakgrunnen, byttet med `butikk-kasseapparat-national.jpg`). Ligger som `kundemottak-cabriolet-hyller` | |
| butikk8.jpg | Kundemottaket | `/om-oss` |
| butikk9.jpg | Produktbilde for «Caps» | `/deler` |
| butikk10.jpg | Ikke lenger i bruk (byttet med de nye butikkbildene). Ligger som `butikk-klaer` | |
| bil1.jpg, bil3.jpg | Galleri | `/verksted` |
| bil2.jpg | Ikke brukt (stående, samme bil som verksted9) | |
| snowmobile.jpg | PageHero, utleiekort, tjenestekort, feed- og videoplassholder | `/utleie`, forside, `/video` |
| tilhenger.jpg, tilhenger2.jpg | Utleiekort | `/utleie`, forside |
| tilhenger3.jpg | Ikke brukt (duplikat av tilhenger.jpg) | |
| utside1.jpg | PageHero, galleri | `/om-oss`, `/verksted` |
| firmabil.jpg | Galleri | `/verksted` |
| snapchat.jpg | Snapchat-QR | Footer, `/kontakt`, `/video`, QR-dialog fra header, mobilmeny og hero |
| Mountain_scootering_Finnmark.jpg | Ikke lenger i bruk (fjernet fra `public/` i runde 3, erstattet av `vidde.svg`) | |
| ac-profil.jpg | Frilagt scooter i utleiebanneret (`/images/utleie/scooter-profil`). Produsentbilde, kun demo, byttes før go-live | Forside, `/utleie` |

## Butikkbilder 21.10.2026 (fra `assets-raw/`, ingen personer i bakgrunnen)

Alle åpnet og motivet bekreftet 21.10.2026. Tredjeparts skilt (Mobil, Kendall, Carhartt, Chevrolet, Cadillac, Shell, Texaco, Route 66) er en del av butikkinteriøret i fotoene, ingen logofiler er kopiert.

| Fil | Manifest-nøkkel | Brukt som | Hvor |
|---|---|---|---|
| hero.mp4 | `/video/hero.mp4` | Bakgrunnsvideo i heroen på `/video` (stum, loop, etter load, runde 5c), videoen «Butikken» først i videolisten, og i «Butikken i Myggveien» på `/deler` | `/video`, `/deler` |
| hero-poster.jpg | `hero/butikk-hero-poster` | Poster og LCP-bilde i heroen på `/video` (runde 5c) og poster for «Butikken», poster i «Butikken i Myggveien» på `/deler` | `/video`, `/deler` |
| butikk-disk.jpg | `butikk/kundemottak-disk-chevrolet` | Om oss-bilde, kundemottaket | Forside, `/om-oss` |
| butikk-mobil-vegg.jpg | `butikk/butikk-mobil-vegg` | Deler-seksjonen, butikkbilder | `/verksted`, `/deler` |
| butikk-kasseapparat-national.jpg | `butikk/butikk-kasseapparat-national` | Kundemottaket | `/om-oss` |
| butikk-stetson-capser.jpg | `butikk/butikk-stetson-capser` | Butikkbilder, produktbilde «Stetson caps» | `/deler` |
| butikk-bord-klaer-capser.jpg | `butikk/butikk-bord-klaer-capser` | Butikkbilder, produktbilde «T-skjorte» | `/deler` |
| butikk-hylle-amsoil.jpg | `butikk/butikk-hylle-amsoil` | Deler-seksjonen (bilde 2), bak plassholderproduktet «motordel» | `/verksted`, `/deler` |
| butikk-hylle-amsoil-diesel.jpg | `butikk/butikk-hylle-amsoil-diesel` | Klargjort, ikke i bruk ennå | |
| butikk-hylle-girolje.jpg | `butikk/butikk-hylle-girolje` | Bak plassholderproduktet «drivverksdel» | `/deler` |
| butikk-hylle-severe-gear.jpg | `butikk/butikk-hylle-severe-gear` | Klargjort, ikke i bruk ennå | |
| butikk-hylle-rustbeskyttelse.jpg | `butikk/butikk-hylle-kjemi` | Butikkbilder, bak plassholderproduktet «tilbehør» | `/deler` |
| butikk-motorbord.jpg | `butikk/butikk-motorbord` | Kundemottaket (stemningsbilde) | `/om-oss` |
| butikk-texaco-pumpe.jpg | `butikk/butikk-texaco-pumpe` | Kundemottaket (stemningsbilde) | `/om-oss` |
| butikk-route66-krakk.jpg | `butikk/butikk-route66-krakk` | Klargjort, ikke i bruk ennå | |
| butikk-kasseapparat-tre.jpg, -sort.jpg, -national-bak.jpg | `butikk/butikk-kasseapparat-*` | Klargjort for galleri, ikke i bruk ennå | |
| butikk-wunderbaum.jpg | `produkter/wunder-baum` | Produktbilde «Wunder-Baum» | `/deler` |
