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
- Favicon-sett og OG-bilde er generert fra den trimmede logoen.
- Logoen har skiltet «2008», mens selskapet er stiftet 2012 (FAKTA.md). Ikke endret. Spørsmål til Gjermund: hva står 2008 for?

## 3. Bilder

- Alle 37 foto i `assets-raw/` er åpnet og motivet bekreftet mot RESSURSER.md før bruk. Avvik: `vinter-bil-fasad.jpg` heter `vinter-bil-fasadeskilt.jpg`. `tilhenger3.jpg` er identisk med `tilhenger.jpg` og hoppes over. `logo2.jpg` har mørk bakgrunn, ikke lys.
- Tredjeparts logoer (Amsoil, Carhartt, Fluid Film, Cadillac, Chevrolet, Ram, Dodge, Ford, Tesla) kopieres ikke til `public/`. Merkenavn vises kun som tekstchips. **Bekreftes av kunden:** «Deler til Chevrolet, Dodge, Ram, Ford, Cadillac og Tesla» og «I butikken: Amsoil, Fluid Film, Carhartt».
- `bil1-3.jpg` brukes kun nøytralt (galleri på /verksted). Ikke i «Biler til salgs» før Gjermund bekrefter.
- Forside-hero bruker `herobilde.jpg` som RESSURSER.md angir. Bildet er 886 px bredt og har «GT MASKIN / Kustom Speedshop» innbakt. Det er beskåret med `object-position: 18% 50%` så bilfronten og skriften kommer med. Anbefaling i BILDELISTE.md: nytt høyoppløst hovedbilde.
- OG-bildet bruker `herobilde-fasade.jpg` (fasaden med skilt) i stedet for `herobilde.jpg`, fordi det er skarpere og ikke har tekst i bildet fra før.
- Om oss-siden har `utside1.jpg` (bygget med klassikere) som PageHero, slik at `hero.jpg` ikke brukes to steder.
- `butikk9.jpg` (capser) viser et merke (Stetson) som ikke står i kildene. Bildet brukes nøytralt som «capser» uten merkenavn i tekst.
- Bildene leveres som webp med jpg-fallback i maks 1920 px og 800 px bredde, med `width`/`height` fra `src/data/imageManifest.js` (generert).

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
