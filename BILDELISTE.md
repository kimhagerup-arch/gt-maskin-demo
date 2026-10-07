# BILDELISTE

Bilder som fortsatt mangler, med ønsket motiv, hvor de brukes, format og størrelse. Alle leveres til `assets-raw/`, legges inn i `PHOTOS`-listen i `scripts/prepare-images.mjs` og kjøres gjennom `npm run images`.

Sist oppdatert 07.10.2026 (runde 2). Innholdsfilen `_kilder/INNHOLD-FRA-GJERMUND.md` som skulle peke på nye bilder (Facebook-innlegg, videoposter, nytt hovedbilde) finnes ikke, så ingen nye bilder er lagt inn i denne runden.

## Mangler

| Motiv | Brukes | Format | Størrelse | Kommentar |
|---|---|---|---|---|
| Bilder fra ekte Facebook-innlegg (ett per innlegg, første bilde ved karusell) | Feed på forsiden | jpg | som lastet ned fra Facebook | Mappe `feed` i `PHOTOS`, nøkkel `/images/feed/<kort-slug>`. Dato, tekst ordrett og permalenke må følge med |
| Videoposter (ett stillbilde per video) | Videoseksjonen og `/video` | jpg | 1280×720 (16:9), for reels gjerne stående utsnitt også | Spilleren laster ingen eksterne miniatyrer før klikk, så hver video trenger et lokalt bilde. Uten eget bilde brukes et passende verkstedbilde |
| Hovedbilde hero: prosjektbil i verkstedet eller fasaden, uten tekst i bildet | Forside, hero (480×560 på desktop, 16:10 på mobil) | jpg | min. 2000 px bred | `herobilde-fasade.jpg` (1278 px) er valgt nå fordi det er skarpere enn `herobilde.jpg` (886 px med innbakt tekst). Et nytt bilde i høyere oppløsning anbefales fortsatt |
| Hero-video: 10-20 sekunder fra verkstedet, uten lyd | Forside, hero (autoplay, muted, loop) | mp4 (H.264) | 1920×1080, under 4 MB | Legg som `assets-raw/hero.mp4`, scriptet kopierer den |
| ATV | `/utleie` og utleiekort på forsiden | jpg | min. 1600 px bred, 16:10 | Vises nå som designet ikonfelt, ikke tom plassholder |
| Vanlig tilhenger (ikke biltransporthenger) | `/utleie`, kortet «Tilhenger og biltransporthenger» | jpg | min. 1600 px bred | Kun biltransporthenger finnes |
| Portrett Gjermund Thomassen | Om oss (forside og `/om-oss`) | jpg | min. 1200 px, 4:5 stående | Forsiden viser monogram «GT» til bildet kommer |
| Portretter av øvrige ansatte og lærlinger | `/om-oss` | jpg | min. 1200 px, 4:5 stående | Navn og rolle må følge med |
| Biler til salgs, 3-6 bilder per bil (front, side, bak, interiør) | `/biler-til-salgs`, detaljside med galleri, forsiden | jpg | min. 1600 px bred, 4:3 | Merke, modell, årsmodell, km, motor og pris må følge med. Galleriet tar flere bilder per bil (`images` og `imageAlts`) |
| Produktbilder, deler | `/deler`, produktside, handlekurv | jpg eller png | min. 1200 px, 4:3, nøytral bakgrunn | Navn, merke, pris, varenummer og passer-til må følge med |
| Produktbilder, klær og capser | `/deler?gruppe=klaer`, produktside | jpg eller png | min. 1200 px, 4:3 eller 3:4 | Navn, merke, pris og størrelser må følge med. `butikk-klaer` og `butikk-capser` brukes bak PLASSHOLDER-etiketten nå |
| Bilder fra snøscootersafari (tur, guide, nordlys) | Safari-banner på forsiden og `/utleie` | jpg | min. 1600 px bred | Ikke i bruk ennå |
| Lærling i arbeid | Om oss (lærebedrift), feed-plassholder 6 | jpg | min. 1600 px bred | |

## Spørsmål til Gjermund

1. Er bilene på `bil1.jpg` (rød Cadillac), `bil2.jpg` (gul Camaro SS) og `bil3.jpg` (sort Corvette) til salgs, kundebiler eller egne? De brukes i dag kun i galleriet på `/verksted`.
2. Kan logoene til Amsoil, Fluid Film, Carhartt, Chevrolet, Dodge, Ram, Ford, Cadillac og Tesla brukes på siden? I dag vises kun navnene som tekst.
3. Hva står «2008» på logoen for? Når startet virksomheten?
4. Finnes det bilder eller video fra snøscootersafari (Norseman Trail) som kan brukes?
5. Er det greit at bildene fra Facebook brukes slik de er i demoen (personer i bakgrunnen på `butikk.jpg`, `butikk5.jpg`, `butikk7.jpg`, `verksted4.jpg`, `verksted10.jpg`)?
6. Snapchat: brukernavn og om profilen er privat eller offentlig, så QR-koden kan få en lenke ved siden av.
7. Hvilke videoer på Facebook, YouTube og Snapchat skal med på videosiden?

## Bilder i bruk (fra `assets-raw/`)

| Fil | Brukt som | Hvor |
|---|---|---|
| logo2.jpg | Logo (trimmet, gjennomsiktig) | Header, footer, favicon, OG |
| herobilde-fasade.jpg | Hero på forsiden (nytt i runde 2), PageHero, adressekort, OG-bilde | Forside, `/kontakt`, `/bestill` |
| herobilde.jpg | Ikke lenger i hero (886 px, innbakt tekst). Ligger klargjort i `public/images/hero/` | |
| hero.jpg | PageHero, tjenestekort «Veteran og classic» | `/verksted`, forside |
| vinter-bil-fasadeskilt.jpg | PageHero | `/biler-til-salgs` |
| utside2.jpg | PageHero (nytt i runde 2, 31 kB på 800 px) | `/video` |
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
| butikk.jpg | Deler-seksjon, butikkbilder | `/verksted`, `/deler` |
| butikk2.jpg | Butikkbilder | `/deler` |
| butikk3.jpg | Tjenestekort deler, feed-plassholder | Forside |
| butikk4.jpg | Stort butikkbilde, videoposter | Forside, `/video` |
| butikk5.jpg | Om oss-bilde, kundemottaket | Forside, `/om-oss` |
| butikk6.jpg | Tjenestekort biler til salgs, kundemottaket | Forside, `/om-oss` |
| butikk7.jpg | Feed-plassholder, kundemottaket | Forside, `/om-oss` |
| butikk8.jpg | Kundemottaket | `/om-oss` |
| butikk9.jpg | Butikkbilder (capser), plassholderbilde for capser og tilbehør | `/deler` |
| butikk10.jpg | Butikkbilder (klær), plassholderbilde for klær | `/deler` |
| bil1.jpg, bil3.jpg | Galleri | `/verksted` |
| bil2.jpg | Ikke brukt (stående, samme bil som verksted9) | |
| snowmobile.jpg | PageHero, utleiekort, tjenestekort, feed- og videoplassholder | `/utleie`, forside, `/video` |
| tilhenger.jpg, tilhenger2.jpg | Utleiekort | `/utleie`, forside |
| tilhenger3.jpg | Ikke brukt (duplikat av tilhenger.jpg) | |
| utside1.jpg | PageHero, galleri | `/om-oss`, `/verksted` |
| firmabil.jpg | Galleri | `/verksted` |
| snapchat.jpg | Snapchat-QR | Footer, `/kontakt`, `/video` |
