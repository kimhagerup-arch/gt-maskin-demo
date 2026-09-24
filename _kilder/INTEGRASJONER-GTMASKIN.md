# INTEGRASJONER: GT Maskin

Prinsipp: bygg mot en datastruktur, ikke mot en kilde. Demoen leser statiske filer i `src/data/` som har nøyaktig samme form som make.com-webhooken leverer i drift. Da byttes kilden fra fil til live uten komponentendring.

## 1. Facebook-feed (`src/data/socialFeed.js`)

Felles feed-objekt, samme i demo og drift:

```js
export const socialFeed = [
  {
    id: "placeholder-1",          // plattformens post-id i drift
    platform: "facebook",         // "facebook" | "instagram" | "youtube"
    date: "2026-09-01",           // ISO-dato, i plassholder: null
    mediaType: "image",           // "image" | "video" | "reel" | "carousel"
    mediaUrl: null,               // bilde- eller videokilde, null = plassholder
    poster: null,                 // poster for video/reel
    caption: "[Innleggstekst hentes automatisk fra Facebook-siden]",
    likes: null,                  // null hvis ukjent
    comments: null,
    permalink: "https://www.facebook.com/GtMaskinas",
    placeholder: true,            // true = tydelig merket eksempelkort
    placeholderLabel: "Prosjektbil ferdig, klar for levering",
  },
];
```

Regler:
- Ekte innlegg gjengis ordrett, caption endres aldri.
- `placeholder: true` vises med etikett «PLASSHOLDER». Aldri oppdiktede tekster som ser ekte ut.
- Video og reel: play-overlay, `preload="none"`.
- Komponenten `SocialFeed` tar `posts` og `channels` som props, sorterer på dato (nyeste først), viser maks 6 på forsiden.

Fra demo til drift:
1. Demo: statisk fil med plassholdere, senere ekte innlegg hentet manuelt.
2. Avtale bekreftet: make.com-scenario henter fra Facebook Page (krever sideadmin-tilgang fra Gjermund), normaliserer til objektet over, skriver til JSON-endepunkt.
3. Bytt datakilde til endepunktet. Feltnavn er like.

## 2. Kanalfakta (`src/data/channels.js`)

```js
export const channels = [
  {
    platform: "facebook",
    name: "GT Maskin as",
    url: "https://www.facebook.com/GtMaskinas",
    followers: 1023,
    followersLabel: "liker siden",
    checkins: 31,
    verifiedAt: "2026-09-22",
  },
];
```

## 3. Video (`src/data/videos.js`)

```js
export const videos = [
  {
    id: "v1",
    title: "[Hovedvideo: fra verkstedet]",
    source: "youtube",            // "youtube" | "mp4"
    src: null,                    // YouTube-ID eller filsti, null = plassholder
    poster: null,                 // bilde, null = plassholder
    duration: "[Varighet]",
    date: "[dato]",
    featured: true,
    placeholder: true,
  },
];
```

YouTube via `https://www.youtube-nocookie.com/embed/<id>?autoplay=1`, montert først ved klikk. Egne filer via `<video>` med poster og `preload="none"`. `prefers-reduced-motion`: ingen autoplay.

## 4. Reviews (`src/data/reviews.js`)

Starter tom. Badge og seksjon rendres ikke før listen har data.

```js
export const reviews = [
  // {
  //   source: "google",          // "google" | "facebook"
  //   rating: 4.8,               // Facebook: anbefalingsprosent som rating, scale 100
  //   scale: 5,
  //   count: 24,
  //   award: null,
  //   url: "https://...",
  //   verifiedAt: "2026-10-01",
  //   quotes: [ { text: "Ordrett sitat", author: "Fornavn", date: "2026-09" } ],
  // },
];
```

Regler: alle tall verifiseres mot kilden før de legges inn. Kildens egen skala vises (4,8/5, 96 % anbefaler). Aldri hotlinkede badge-bilder. Ingen oppdiktede sitater.

## 5. Biler til salgs (`src/data/cars.js`)

```js
export const cars = [
  {
    slug: "bil-1",
    title: "[Merke og modell]",
    year: "[Årsmodell]",
    km: "[km]",
    engine: "[drivstoff / motor]",
    price: "[PRIS]",              // tall som streng, formateres med tusenskille i komponent
    images: [],                   // tom = plassholder
    description: "",
    sold: false,
    placeholder: true,
  },
];
```

## 6. Produkter (`src/data/products.js`)

```js
export const categories = ["Alle deler", "US-biler", "Tesla", "Motor og drivverk", "Bremser", "Understell", "Tilbehør"];

export const products = [
  {
    slug: "produkt-1",
    brand: "[VAREMERKE]",
    title: "[Produktnavn]",
    category: "US-biler",
    price: "[PRIS]",
    sku: null,
    stock: null,                  // null = ukjent, vis «Spør om lagerstatus»
    image: null,
    description: "",
    fits: [],                     // f.eks. ["Chevrolet Camaro 1967-1969"]
    placeholder: true,
  },
];
```

Handlekurv: `CartContext` med `items`, `add`, `remove`, `setQty`, `clear`, lagret i `sessionStorage`. Kasse er UI-only: skjema, oppsummering, «Send bestillingsforespørsel», suksess-tilstand. Merkes som mock i `BESLUTNINGER.md`. Fase 2: Vipps eCom eller Stripe, avklares med kunden.

## 7. Utleie (`src/data/rental.js`)

```js
export const rental = [
  {
    slug: "scooter-60",
    icon: "Snowflake",
    title: "Snøscooter ca. 60 hk",
    text: "Lettkjørt scooter for tur og familie. Forsikring inkludert.",
    price: "[PRIS]",
    unit: "kr / døgn",
    note: "inkl. forsikring",
    bookingUrl: "https://www.snoscooterutleie.com",
  },
];

export const safari = {
  title: "Snøscootersafari i Finnmark",
  text: "Om vinteren kjører vi guidede snøscooterturer, se Norseman Trail.",
  ctaLabel: "norsemantrail.com",
  url: "https://www.norsemantrail.com",
};
```

## 8. Skjemaer

Alle skjemaer er UI-only i demoen: validering i klient, honeypot-felt, `aria-live` for feil og suksess, suksess-tilstand erstatter skjemaet. Ingen nettverkskall. Klargjort for Resend: én `submitForm(kind, payload)` i `src/lib/forms.js` som i dag returnerer `{ ok: true }` etter kort forsinkelse, og senere kaller `/api/contact`.

## 9. Kart

Adressekort med lenke: `https://www.google.com/maps/search/?api=1&query=Myggveien+3,+9514+Alta,+Norway`, `target="_blank" rel="noopener noreferrer"`. Aldri iframe.

## 10. Sporing

Ingen i demoen. Personvernvennlig statistikk (Plausible eller Vercel Analytics) settes ved go-live.
