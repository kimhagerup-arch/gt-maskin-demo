# STATUS

Sist oppdatert: 24.09.2026 etter QA-gjennomgang. Branch `dev`. `npm run build` og `npm run lint` er rene. Alle ruter verifisert i headless Chrome på 375, 768, 1024 og 1440 px uten konsollfeil og uten horisontal overflow. axe-core: 0 funn. Lighthouse mobil: ytelse 90-96, tilgjengelighet 100, beste praksis 100. Se `docs/qa/QA-RAPPORT.md`.

**Demoen er klar til å vises.**

## Bygget

| Rute | Innhold |
|---|---|
| `/` | Hero (video-klar, stillbilde nå), tillitsstripe, Live fra GT Maskin (6 feed-kort), Hva vi gjør (6 kort med bilder), GT Maskin på film (spiller + spilleliste), Biler til salgs (3 kort), Deler og nettbutikk (4 produktkort + butikkbilde), Utleie (4 kort + safari-banner), Om oss kort (tekst, faktabokser, bilde, tidslinje, folkene), Kontakt og bestilling (adressekort + skjema) |
| `/verksted` | PageHero, seks detaljseksjoner med ankere og bilder, Slik jobber vi, godkjenninger, galleri, CTA |
| `/deler` | Intro, merkechips, kategorichips, søk, produktrutenett, handlekurv-skuff, Butikken i Myggveien |
| `/deler/:slug` | Produktside med Legg i kurv og forespørsel |
| `/kasse` | Handlekurv, skjema, suksess-tilstand |
| `/biler-til-salgs` | PageHero, plassholderkort, tom tilstand, CTA |
| `/utleie` | PageHero, fire utleieobjekter med bilder, safari-banner, lenker til snoscooterutleie.com og norsemantrail.com |
| `/om-oss` | PageHero, historie, faktabokser, tidslinje, kundemottaket (4 bilder), sitat fra Alta Amcar Klubb, folkene, godkjenninger og lærlinger, CTA |
| `/bestill` | Bestillingsskjema + adressekort |
| `/kontakt` | PageHero, adressekort med Google Maps-lenke, Snapchat-QR, kontaktskjema (forhåndsfyll via `?vare=` og `?bil=`) |
| `/personvern` | Enkel erklæring |
| `*` | 404 |

Felles: sticky header med logo, meny, telefon og «Bestill time», fullskjerms mobilmeny, sticky mobil-CTA, footer med logo, firmainfo, lenkekolonner, Facebook, Snapchat-QR, review-badges (skjult) og «Levert av KOVISION» med gradient-hover.

Teknisk: Vite + React 18, react-router v6 med v7-flagg, forsiden eager og øvrige ruter kodesplittet, Tailwind med `brand-*`-tokens, lucide-react, Biome, selvhostede fonter (Bebas Neue, Barlow), `useSeoMeta` per rute, scroll-inn-animasjoner med `prefers-reduced-motion`, webp med jpg-fallback i tre bredder, lazy-loading, preload av hero, `vercel.json` med SPA-rewrite og `X-Robots-Tag: noindex`, robots.txt, favicon-sett, OG-bilde.

## Plassholdere og mock

- Feed: 6 kort merket PLASSHOLDER med ekte bilder bak. Ingen ekte innlegg.
- Video: 4 plassholdere, play deaktivert.
- Biler til salgs: 3 plassholderkort.
- Produkter: 8 plassholdere, pris «[PRIS]».
- Utleie: priser «[PRIS]» og «[vilkår]». ATV uten bilde.
- Om oss: portretter, to navn, to milepæler, og «[ÅR]: [Oppstart, bekreftes av Gjermund]» først i tidslinjen.
- Verksted: «Maskiner og traktor» har plassholder for bekreftelse.
- Reviews: tom liste, badges skjult.
- Nettbutikk og alle skjemaer: mock / UI-only, ingen nettverkskall.
- Hero-video: ingen fil, stillbilde vises.

## KOVISION må gjøre manuelt

1. Avklare årstall med Gjermund: logoen viser «2008», selskapet er stiftet 2012. Hero og faktaboks er nøytrale («Kustom Speedshop i Alta», «2012 / GT Maskin AS stiftet»), tidslinjen har «[ÅR]: [Oppstart, bekreftes av Gjermund]». Fyll inn når svaret kommer.
2. Hente 6-9 ekte Facebook-innlegg (bilde, tekst ordrett, dato, permalenke) inn i `src/data/socialFeed.js`, eller sette opp make.com-scenario. Krever sideadmin-tilgang fra Gjermund.
3. Skaffe videoer (YouTube-ID eller mp4) og eventuelt `hero.mp4` til `assets-raw/`.
4. Få bekreftet utleiepriser og vilkår (gammel side oppga 1 850,- og 1 990,- per døgn i 2022, ikke brukt).
5. Få liste over biler til salgs med bilder, og avklare om bil1-3 er til salgs.
6. Få produktutvalg med navn, merke, pris, varenummer, bilde og lagerstatus.
7. Få navn og roller på ansatte, portretter, og milepæler etter 2012.
8. Verifisere reviews-tall (Google, Facebook) før de legges inn i `src/data/reviews.js`.
9. Bekrefte hovedtelefonnummer (911 14 628 brukt; 90 12 35 44 og 47 37 23 65 finnes også).
10. Bekrefte merkebruk: tekstlistene «Chevrolet, Dodge, Ram, Ford, Cadillac, Tesla» og «Amsoil, Fluid Film, Carhartt», og om logoer kan brukes.
11. Bekrefte teksten om maskiner og traktor.
12. Nytt høyoppløst hovedbilde til hero (se BILDELISTE.md).
13. Ved go-live: bytte OG-URL i `index.html`, fjerne `noindex` i `index.html` og `vercel.json`, endre `public/robots.txt` til `Allow: /`, koble skjemaer til Resend, velge Vipps eller Stripe for nettbutikk (fase 2), sette opp personvennlig statistikk.

## Ikke gjort (bevisst)

- Ingen push, ingen GitHub-repo, ingen Vercel-deploy.
- Ingen tredjeparts-script lastes før brukeren klikker (YouTube). Fontene er selvhostet, så siden gjør ingen eksterne kall ved lasting.
