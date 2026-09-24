# DESIGNSYSTEM: GT Maskin

Kundespesifikt uttrykk, valgt for denne kunden alene. Palett, font og komposisjon gjenbrukes ikke fra andre KOVISION-prosjekter.

Uttrykk: mørk, industriell speedshop. Nesten sort grunnflate, benhvit lys flate, én rød aksent. Skarpe hjørner (ingen border-radius, unntatt runde play-knapper). Bebas Neue til alle titler og store tall, Barlow til alt annet. Seksjoner veksler mørk og lys. Referanse: `design/reference-desktop.html` og `design/reference-mobile.html`.

Hvis logoen i `assets-raw/logo/` har en tydelig annen hovedfarge enn rød: bytt `brand-accent` og `brand-accent-light` til logoens farge med samme lyshet, verifiser kontrast på nytt, noter i `BESLUTNINGER.md`.

## 1. Farger (`tailwind.config.js` og CSS-variabler i `src/index.css`)

| Rolle | Tailwind-klasse | Hex | Bruk |
|---|---|---|---|
| Primær | `bg-brand-primary` | `#151412` | Header, mørke seksjoner, sidebakgrunn |
| Primær mørk | `bg-brand-primary-dark` | `#0F0E0D` | Footer, copyright-bar |
| Primær lys | `bg-brand-primary-light` | `#1F1D1A` | Mørke kort, tillitsstripe, skjema-bakgrunn |
| Primær plassholder | `bg-brand-primary-soft` | `#23211E` | Plassholdere på mørk flate |
| Aksent | `bg-brand-accent` | `#C42B1C` | Primær CTA, ikonbokser, kicker-strek på lys flate, rød tekst på lys flate |
| Aksent lys | `text-brand-accent-light` | `#F0533F` | Rød tekst og ikoner på mørk flate, hover på lenker |
| Aksent hover | `bg-brand-accent-hover` | `#A8241A` | Hover på primær CTA |
| Bakgrunn lys | `bg-brand-bg` | `#F3EFE7` | Lyse seksjoner, tekst på mørk flate |
| Overflate lys | `bg-brand-surface` | `#E4DED2` | Plassholdere og chips på lys flate |
| Kort | `bg-brand-card` | `#FFFFFF` | Kort på lys flate |
| Tekst | `text-brand-text` | `#151412` | Brødtekst på lys flate |
| Tekst invers | `text-brand-text-inverse` | `#F3EFE7` | Brødtekst på mørk flate |
| Nedtonet | `text-brand-muted` | `#5E5850` | Sekundærtekst på lys flate |
| Nedtonet invers | `text-brand-muted-inverse` | `#B9B2A6` | Sekundærtekst på mørk flate |
| Plassholdertekst mørk | `text-brand-placeholder` | `#9C9487` | Etikett i plassholder på mørk flate |
| Kant lys | `border-brand-border` | `#DCD5C8` | Kortkanter på lys flate |
| Kant lys 2 | `border-brand-border-strong` | `#C9C1B3` | Chips |
| Kant mørk | `border-brand-border-dark` | `#2E2B27` | Kortkanter og linjer på mørk flate |
| Kant mørk 2 | `border-brand-border-dark-strong` | `#3A3631` | Input-kant på mørk flate |
| Kant mørk 3 | `border-brand-outline` | `#4A463F` | Outline-knapp på mørk flate |
| Footer-tekst | `text-brand-footer` | `#8F877A` | Copyright-linje |
| KOVISION cyan | `kovision-cyan` | `#22d3c8` | Kun footer-credit |
| KOVISION gull | `kovision-gold` | `#d4a843` | Kun footer-credit |

Kontrast (målt, WCAG AA):
- Hvit tekst på `#C42B1C`: 5.7:1, bestått for all tekststørrelse.
- `#F0533F` på `#151412`: 5.3:1, bestått.
- `#C42B1C` på `#F3EFE7`: 4.9:1, bestått (brukes til kicker 13 px bold).
- `#B9B2A6` på `#151412`: 8.9:1. `#5E5850` på `#F3EFE7`: 6.0:1. `#5E5850` på hvit: 7.0:1.
- `#9C9487` på `#23211E`: 5.2:1. `#5E5850` på `#E4DED2`: 5.3:1.
- Ta med tabellen i `BESLUTNINGER.md`.

Regel: rød tekst på mørk flate er alltid `brand-accent-light`. Rød tekst på lys flate og alle røde fyll er `brand-accent`.

## 2. Typografi

Google Fonts i `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Bebas+Neue&display=swap" rel="stylesheet">
```

`tailwind.config.js`: `fontFamily: { display: ['"Bebas Neue"', 'Impact', 'sans-serif'], sans: ['Barlow', 'system-ui', 'sans-serif'] }`.

| Element | Klasser | Regel |
|---|---|---|
| H1 hero | `font-display text-6xl md:text-[104px] leading-[0.92] tracking-wide` | Én per side. 64 px mobil, 104 px desktop |
| H1 underside (PageHero) | `font-display text-5xl md:text-7xl leading-[0.95]` | |
| H2 seksjon | `font-display text-[44px] md:text-[64px] leading-[0.95]` | |
| Store tall og priser | `font-display text-3xl md:text-4xl` | 2012-boks, faktabokser, priser |
| H3 kort | `text-lg md:text-[22px] font-bold` | Barlow 700 |
| Kicker (eyebrow) | `text-xs md:text-[13px] font-bold uppercase tracking-[0.2em]` | Alltid i aksentfarge med strek 36×2 px foran (28×2 mobil). Over hver H2 |
| Ingress | `text-lg md:text-xl leading-relaxed` | Nedtonet farge |
| Brødtekst | `text-base leading-relaxed` | |
| Liten tekst | `text-sm` | Metadata, noter |
| Etikett skjema | `text-xs font-bold uppercase tracking-wider` | Nedtonet |
| Meny | `text-[15px] font-semibold` | |

## 3. Layout

- Container: `max-w-[1200px] mx-auto px-6 md:px-10 xl:px-0` (120 px sidemarg på 1440, 24 px på mobil).
- Seksjonspadding: `py-12 md:py-24`.
- Kortgap: `gap-3 md:gap-6`.
- 3-kolonne rutenett → 2 på `md` → 1 på mobil. 4-kolonne → 2 på `md` → 2 på mobil (produkter) eller 1 (utleie).
- 12-kolonners grid med `gap-6` på tosplittede desktop-seksjoner (hero, om oss, kontakt, video).
- Seksjonsrytme forsiden: mørk (hero), mørk-lys (stripe), lys (feed), lys (tjenester) eller veksle etter behov, slik at ingen to store seksjoner har lik bakgrunn etter hverandre. Bruk referansefilene som rettesnor, men rekkefølgen i `PROMPT.md` gjelder.

## 4. Komponenter

- **Knapp primær**: `bg-brand-accent text-white font-bold text-[17px] h-14 px-7 inline-flex items-center gap-2.5 hover:bg-brand-accent-hover transition-colors duration-150`. Pil-ikon til høyre. Ingen radius. Mobil `h-12`.
- **Knapp sekundær (mørk flate)**: `border-[1.5px] border-brand-outline text-brand-text-inverse hover:border-brand-muted-inverse`. På lys flate: `bg-brand-primary text-brand-text-inverse`.
- **Tekstlenke med understrek**: `font-bold border-b-2 border-brand-accent-light pb-1` (mørk) eller `border-brand-accent` (lys).
- **Chip**: `h-10 px-4 text-sm font-semibold border border-brand-border-strong`; aktiv: `bg-brand-primary text-brand-text-inverse border-brand-primary`.
- **Kort lys**: `bg-brand-card border border-brand-border p-8`. **Kort mørk**: `bg-brand-primary-light border border-brand-border-dark`. Hover: kant til `brand-accent`/`brand-accent-light`, `transition-colors`.
- **Ikonboks**: `w-12 h-12 md:w-12 bg-brand-accent text-white flex items-center justify-center`, ikon 24 px, stroke 1.8. Mobil 40 px.
- **Plassholder** (`<Placeholder label tone="dark|light" className />`): mørk: `bg-brand-primary-soft` med `repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 2px, transparent 2px 18px)`, tekst `text-brand-placeholder`. Lys: `bg-brand-surface` med `rgba(0,0,0,.05)`, tekst `text-brand-muted`. Sentrert etikett `text-[13px] font-semibold tracking-wider`.
- **PageHero** (undersider): mørk flate, kicker, H1, ingress, valgfritt bilde til høyre med fallback til plassholder ved `onError`.
- **Input og textarea**: `h-12 px-3.5 bg-brand-primary border border-brand-border-dark-strong text-brand-text-inverse focus:outline-none focus:border-brand-accent-light focus-visible:ring-2 focus-visible:ring-brand-accent-light ring-offset-2 ring-offset-brand-primary-light`. Alltid `<label>`.
- **Header**: `h-16 md:h-[88px] sticky top-0 z-40 bg-brand-primary border-b border-brand-border-dark`. Wordmark: rød boks 44×44 med «GT» i Bebas 26 px, ved siden av «GT MASKIN» Bebas 28 px `tracking-[0.08em]` over «KUSTOM SPEEDSHOP · ALTA» 11 px 600 `tracking-[0.25em]` nedtonet. Med logo: logo (trimmet) i stedet for rød boks, samme høyde.
- **Mobilmeny**: fullskjerms-overlay `bg-brand-primary`, store menypunkter i Bebas, telefon og «Bestill time» nederst. `<button aria-expanded aria-controls>`, Escape lukker, fokus flyttes inn og tilbake.
- **Sticky mobil-CTA**: `fixed bottom-0 inset-x-0 md:hidden` med to knapper: Ring (tel:) og Bestill time. Skjules når bestillingsskjemaet er i viewport.
- **Feed-kort**: kort lys, bilde/plassholder 4:3, rad med plattformmerke + dato, tekstutdrag maks 4 linjer, reaksjonstall når de finnes, play-overlay ved video/reel. Etikett «PLASSHOLDER» øverst i hjørnet når `placeholder: true`.
- **Videospiller**: featured 16:9 med poster og rund rød play-knapp 88 px (64 mobil). Iframe monteres først ved klikk. Spilleliste: rader 112×72 miniatyr + tittel + varighet/dato.
- **Review-badge**: mørk kort med kilde, stjerner eller prosent, antall og lenke til kilden. Rendres ikke når `reviews.js` er tom.
- **Footer-credit**: «Levert av KOVISION», lenke til https://kovision.no. To lag: grunntekst i `text-brand-muted-inverse`, absolutt posisjonert gradientlag `bg-gradient-to-r from-kovision-cyan to-kovision-gold bg-clip-text text-transparent [-webkit-background-clip:text] opacity-0 group-hover:opacity-100 transition-opacity`.
- **Fokus**: globalt `focus-visible:outline-2 focus-visible:outline-brand-accent-light outline-offset-2`.

## 5. Bevegelse

- Hover-farger 150 ms.
- Scroll-inn: `opacity-0 translate-y-3` → synlig via IntersectionObserver-hook (`useReveal`), 400 ms, kun én gang per element.
- `prefers-reduced-motion: reduce`: ingen translate, ingen video-autoplay, poster vises.

## 6. Logo og favicon

- Logo kun i header og footer. Ikke i hero.
- Logofil med hvite marger trimmes med sharp før bruk (`scripts/trim-logo.mjs` eller som del av favicon-scriptet).
- Logo på mørk flate: har filen hvit bakgrunn, legg den i en lys badge (`bg-brand-bg p-2`) i stedet for CSS-filter.
- Uten logo: tekstmerket beskrevet under Header.
- Favicon-sett og OG-bilde genereres av scripts fra logo, ellers monogram «GT» i `brand-accent` på `brand-primary`.
