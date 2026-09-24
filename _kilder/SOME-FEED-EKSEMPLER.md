# SOME-FEED-EKSEMPLER

Ingen ekte innlegg er hentet ennå (Facebook blokkerer automatisk henting). Feeden i demoen fylles med seks plassholderkort som er tydelig merket, aldri oppdiktede tekster som ser ekte ut.

## Kanalfakta (`src/data/channels.js`)

```js
export const channels = [
  {
    platform: "facebook",
    name: "GT Maskin as",
    url: "https://www.facebook.com/GtMaskinas",
    followers: 1023,          // «likes» fra Facebook-snippet, 22.09.2026. Verifiser før demo sendes.
    followersLabel: "liker siden",
    checkins: 31,
    verifiedAt: "2026-09-22",
  },
];
```

## Plassholderkort (`src/data/socialFeed.js`)

Seks kort med `placeholder: true`. Bruk disse motivene som etikett i plassholderbildet, slik at Gjermund ser hva slags innlegg som havner her:

1. «Prosjektbil ferdig, klar for levering»
2. «Nye deler på lager»
3. «Bil til salgs i kundemottaket»
4. «Snøscootersesongen er i gang»
5. «Før og etter: custom-prosjekt»
6. «Lærling i arbeid på verkstedet»

Hvert kort viser: plattformmerke (Facebook), «PLASSHOLDER» som etikett, dato `[dato]`, tekst «[Innleggstekst hentes automatisk fra Facebook-siden]», ingen reaksjonstall (null).

## Slik legges ekte innlegg inn senere

Hent 6-9 av de nyeste innleggene manuelt fra facebook.com/GtMaskinas. For hvert innlegg: last ned bildet til `public/images/feed/`, kopier teksten ordrett, noter dato og permalenke, sett `placeholder: false`. Feltene står i `INTEGRASJONER-GTMASKIN.md`.
