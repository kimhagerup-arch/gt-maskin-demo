# BILDELISTE

Bilder som fortsatt mangler, med ønsket motiv, hvor de brukes, format og størrelse. Alle leveres til `assets-raw/`, legges inn i `PHOTOS`-listen i `scripts/prepare-images.mjs` og kjøres gjennom `npm run images`.

## Mangler

| Motiv | Brukes | Format | Størrelse | Kommentar |
|---|---|---|---|---|
| Hovedbilde hero: prosjektbil i verkstedet, gjerne firmabilen eller en kundebil med fasaden eller verkstedet bak | Forside, hero (høyre kolonne, 480×560 på desktop, 16:10 på mobil) | jpg | min. 2000 px bred, stående eller kvadratisk utsnitt fungerer best | `herobilde.jpg` er 886 px og har tekst innbakt. Nytt bilde uten tekst anbefales |
| Hero-video: 10-20 sekunder fra verkstedet, uten lyd | Forside, hero (autoplay, muted, loop) | mp4 (H.264) | 1920×1080, under 4 MB | Legg som `assets-raw/hero.mp4`, scriptet kopierer den |
| ATV | `/utleie` og utleiekort på forsiden | jpg | min. 1600 px bred, 16:10 | Plassholder «[Bilde av ATV]» nå |
| Vanlig tilhenger (ikke biltransporthenger) | `/utleie`, kortet «Tilhenger og biltransporthenger» | jpg | min. 1600 px bred | Kun biltransporthenger finnes |
| Portrett Gjermund Thomassen | Om oss (forside og `/om-oss`) | jpg | min. 1200 px, 4:5 stående | |
| Portretter av øvrige ansatte og lærlinger | Om oss | jpg | min. 1200 px, 4:5 stående | Navn og rolle må følge med |
| Biler til salgs, 3-6 bilder per bil (front, side, bak, interiør) | `/biler-til-salgs` og forsiden | jpg | min. 1600 px bred, 4:3 | Merke, modell, årsmodell, km, motor og pris må følge med |
| Produktbilder | `/deler`, produktside, handlekurv | jpg eller png | min. 1200 px, 4:3, gjerne nøytral bakgrunn | Navn, merke, pris, varenummer og passer-til må følge med |
| Videoposter / miniatyrer | Videoseksjonen | jpg | 1280×720 | Kun hvis egne mp4 brukes. YouTube-videoer får poster automatisk |
| Bilder fra snøscootersafari (tur, guide, nordlys) | Safari-banner på forsiden og `/utleie` | jpg | min. 1600 px bred | Ikke i bruk ennå, kan gjøre safari-banneret mer levende |
| Lærling i arbeid | Om oss (lærebedrift), feed-plassholder 6 | jpg | min. 1600 px bred | |

## Spørsmål til Gjermund

1. Er bilene på `bil1.jpg` (rød Cadillac), `bil2.jpg` (gul Camaro SS) og `bil3.jpg` (sort Corvette) til salgs, kundebiler eller egne? De brukes i dag kun i galleriet på `/verksted`.
2. Kan logoene til Amsoil, Fluid Film, Carhartt, Chevrolet, Dodge, Ram, Ford, Cadillac og Tesla brukes på siden? I dag vises kun navnene som tekst.
3. Hva står «2008» på logoen for? Når startet virksomheten? Selskapet er stiftet 2012, og tidslinjen har nå «[ÅR]: [Oppstart, bekreftes av Gjermund]» før 2012.
4. Finnes det bilder eller video fra snøscootersafari (Norseman Trail) som kan brukes?
5. Er det greit at bildene fra Facebook brukes slik de er i demoen (personer i bakgrunnen på `butikk.jpg`, `butikk5.jpg`, `butikk7.jpg`, `verksted4.jpg`, `verksted10.jpg`)?

## Bilder i bruk (fra `assets-raw/`)

| Fil | Brukt som | Hvor |
|---|---|---|
| logo2.jpg | Logo (trimmet, gjennomsiktig) | Header, footer, favicon, OG |
| herobilde.jpg | Hero | Forside |
| hero.jpg | PageHero, tjenestekort «Veteran og classic» | `/verksted`, forside |
| herobilde-fasade.jpg | PageHero, adressekort, OG-bilde | `/kontakt`, forside, `/bestill` |
| vinter-bil-fasadeskilt.jpg | PageHero | `/biler-til-salgs` |
| verksted.jpg | Tjenestekort, videoposter, galleri | Forside, `/verksted` |
| verksted2.jpg | Veteran og classic, videoposter | `/verksted`, forside |
| verksted3.jpg | Reparasjon, feed-plassholder | `/verksted`, forside |
| verksted4.jpg | Europeiske biler og Tesla | `/verksted` |
| verksted5.jpg | Reparasjon, feed-plassholder | `/verksted`, forside |
| verksted7.jpg | Maskiner og traktor | `/verksted` |
| verksted8.jpg | Galleri | `/verksted` |
| verksted9.jpg | Tjenestekort custom, custom-seksjon, feed-plassholder | Forside, `/verksted` |
| verksted10.jpg | Veteran og classic | `/verksted` |
| motor.jpg | Custom-seksjon | `/verksted` |
| butikk.jpg | Deler-seksjon, butikkbilder | `/verksted`, `/deler` |
| butikk2.jpg | Butikkbilder | `/deler` |
| butikk3.jpg | Tjenestekort deler, feed-plassholder | Forside |
| butikk4.jpg | Stort butikkbilde, videoposter | Forside |
| butikk5.jpg | Om oss-bilde, kundemottaket | Forside, `/om-oss` |
| butikk6.jpg | Tjenestekort biler til salgs, kundemottaket | Forside, `/om-oss` |
| butikk7.jpg | Feed-plassholder, kundemottaket | Forside, `/om-oss` |
| butikk8.jpg | Kundemottaket | `/om-oss` |
| butikk9.jpg | Butikkbilder (capser) | `/deler` |
| butikk10.jpg | Butikkbilder (klær) | `/deler` |
| bil1.jpg, bil3.jpg | Galleri | `/verksted` |
| bil2.jpg | Ikke brukt (stående, samme bil som verksted9) | |
| snowmobile.jpg | PageHero, utleiekort, tjenestekort, feed- og videoplassholder | `/utleie`, forside |
| tilhenger.jpg, tilhenger2.jpg | Utleiekort | `/utleie`, forside |
| tilhenger3.jpg | Ikke brukt (duplikat av tilhenger.jpg) | |
| utside1.jpg | PageHero, galleri | `/om-oss`, `/verksted` |
| utside2.jpg | Ikke brukt (klargjort i `public/images/bygg/`) | |
| firmabil.jpg | Galleri | `/verksted` |
| snapchat.jpg | Snapchat-QR | Footer, `/kontakt` |
