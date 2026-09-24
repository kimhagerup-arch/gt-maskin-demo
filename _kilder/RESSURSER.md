# RESSURSER

## Bilder og logo: `assets-raw/` (flat mappe, 46 filer + README)

Hentet manuelt fra Facebook 24.09.2026. Beskrivelsene under er satt ut fra miniatyrbilder. Åpne hver fil med Read og bekreft motivet før du bruker den. Bruk aldri et bilde til noe teksten ikke dekker.

### Logo

| Fil | Beskrivelse | Bruk |
|---|---|---|
| `logo1.jpg` | GT Maskin-logo: skjold med hot rod og «GTM», mørk bakgrunn. JPG uten transparens | Header (trim marger med sharp, sjekk at bakgrunnen er nær sort ellers badge), favicon, OG-bilde |
| `logo2.jpg` | Samme logo på lys eller grå bakgrunn | Footer i lys badge hvis logo1 ikke fungerer på mørk flate |

Aksentfarge: logoen ser ut til å ha oransje eller kobber som hovedfarge. Hent dominant farge fra `logo1.jpg` med sharp (ignorer nær sort og nær hvit) og sett `brand-accent` til den. Er den oransje, skal tekst på aksentfyll være `brand-primary` (nær sort), ikke hvit, og `brand-accent-light` på mørk flate må ha minst 4.5:1. Mål og noter i `BESLUTNINGER.md`. Beholdes rød kun hvis logoen faktisk er rød.

### Hero-kandidater

| Fil | Beskrivelse | Bruk |
|---|---|---|
| `herobilde.jpg` | Mørk bil med «GT MASKIN»-skrift, lav vinkel | Forside-hero (førstevalg) |
| `hero.jpg` | Sort-hvitt bilde av amerikansk klassiker | PageHero på `/verksted` eller `/om-oss` |
| `herobilde-fasade.jpg` | Fasaden i kveldslys med skilt | PageHero `/kontakt`, adressekort |
| `vinter-bil-fasad.jpg` | Klassiker foran fasaden om vinteren | PageHero `/biler-til-salgs` eller om oss |

### Verksted

`verksted.jpg`, `verksted2.jpg`, `verksted3.jpg`, `verksted4.jpg`, `verksted5.jpg`, `verksted8.jpg`, `verksted9.jpg`, `verksted10.jpg`: biler på løftebukk, teknikere i arbeid, custom-prosjekter (verksted9 ser ut som en gul muscle car med panseret oppe). `verksted7.jpg`: traktor på løftebukk, viser at de tar maskiner også. `motor.jpg`: motor på benk.

Bruk: `/verksted` (reparasjon, custom, classic), tjenestekort på forsiden, galleri.

### Butikk og kundemottak

`butikk.jpg`, `butikk2.jpg`, `butikk3.jpg`, `butikk4.jpg`: hyller med oljer, kjemi og deler. `butikk5.jpg`, `butikk6.jpg`, `butikk7.jpg`, `butikk8.jpg`: kundemottak med barkrakker, disk og biler inne (det «innbydende og kreative kundemottaket»). `butikk9.jpg`: capser. `butikk10.jpg`: klær på stativ.

Bruk: `/deler` (butikk og delelager), om oss (kundemottaket), forside.

### Biler

`bil1.jpg` (rød klassiker med finner), `bil2.jpg` (gul muscle car), `bil3.jpg` (mørk sportsbil utenfor bygget). Ukjent om de er til salgs, kundebiler eller egne. Brukes nøytralt i hero, verksted og custom. Ikke i «Biler til salgs» før Gjermund bekrefter. Der beholdes plassholderkort.

### Utleie

`snowmobile.jpg`: snøscootere oppstilt i snø. `tilhenger.jpg`, `tilhenger2.jpg`, `tilhenger3.jpg`: biltransporthengere. Bruk: `/utleie` og utleiekortene på forsiden. ATV mangler bilde, plassholder.

### Annet

`utside1.jpg`, `utside2.jpg`: bygget utenfra på dagtid. `firmabil.jpg`: firmabil (mørk varebil). `snapchat.jpg`: Snapchat-QR-kode for GT Maskin. Legg «Følg oss på Snapchat» med QR-bildet i footer og på kontaktsiden.

### Tredjeparts merkelogoer (IKKE som bilder på siden)

`amsoil.png`, `carhartt.webp`, `fluidfilm.webp`, `cadillac.png`, `chevrolet.png`, `Color-Ram-Logo_v3.jpg`, `Dodge-Symbol.png`, `Ford logo.png`, `Tesla-Emblem.png`.

Regel: tredjeparts logoer vises ikke som bilder før kunden har avklart bruk. Bruk merkenavnene som tekst:
- På `/deler` og i delekortet: «Deler til Chevrolet, Dodge, Ram, Ford, Cadillac og Tesla» som tekstchips.
- På `/deler` under butikk: «I butikken: Amsoil, Fluid Film, Carhartt» (olje, rustbeskyttelse, klær og capser, som bildene viser).
- Begge listene merkes i `BESLUTNINGER.md` som «bekreftes av kunden». Logofilene kopieres ikke til `public/`.

## Video

Ingen videoer funnet ennå. `videos.js` starter med plassholdere.

## Integrasjoner

| Hva | I dag | I demoen | I drift |
|---|---|---|---|
| Facebook-feed | Kun på Facebook | Statisk `socialFeed.js`, plassholderkort | make.com-scenario, webhook, samme objektform |
| Snapchat | QR-kode | Bilde i footer og kontakt | Samme |
| Video | Ikke på nettsiden | `videos.js`, klikk-for-å-laste | Samme |
| Kontaktskjema | Skjema på sidebygger | UI-only med suksess-tilstand | Resend via serverless-funksjon |
| Bestill time | «Bestill nå»-side | UI-only skjema | Resend |
| Nettbutikk | «Kjøp produkter»-side | Mock med handlekurv og kasse-forespørsel | Fase 2: Vipps eller Stripe |
| Utleie | snoscooterutleie.com | Lenke, target _blank | Samme |
| Safari | norsemantrail.com | Lenke, target _blank | Samme |
| Kart | | Adressekort med lenke | Samme |
| Reviews | Ikke kartlagt | `reviews.js` tom, badges skjult | Google og Facebook når verifisert |
| Sporing | Ingen | Ingen | Personvennlig statistikk ved go-live |

## Kontaktinfo på siden

Myggveien 3, 9514 Alta (Aronneskjosen) · Mandag-fredag 08:30-16:00 · 911 14 628 · gtm-as@online.no · facebook.com/GtMaskinas · Snapchat (QR)

## Eksterne lenker

- https://www.facebook.com/GtMaskinas
- https://www.snoscooterutleie.com
- https://www.norsemantrail.com
- https://www.google.com/maps/search/?api=1&query=Myggveien+3,+9514+Alta,+Norway
- https://kovision.no (footer)

## Ikoner (lucide-react)

Wrench, Gauge, Package, Car, Tag, Snowflake, ShieldCheck, GraduationCap, Phone, Mail, MapPin, Clock, Play, ArrowRight, Menu, X, ShoppingCart, Search, Facebook (kun som plattformmerke i feed-kort), ExternalLink, Check, Tractor.
