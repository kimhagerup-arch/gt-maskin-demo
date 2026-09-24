# INNHOLD-RAATEKST

Del A er kundens egne tekster ordrett slik de er funnet (inkludert stavefeil). Del B er ferdig ny sidetekst per seksjon, skrevet i kundens tone, uten tankestrek og uten forbudte ord. Del B legges rett inn i `src/data/siteContent.js`. Tekst i [klammer] er plassholder som skal synes som plassholder.

---

## Del A: kundens tekster ordrett

### gtmaskin.com, forside («Min forside»)

> Vi er ett bilverksted i Alta som satser på reperasjon av Amerikanske biler og delesalg. Vi tar alt fra gamle veteranbiler til nye bruksbiler. Vi driver også med utleie av snøscootere,atv,tilhenger og biltransport henger. For mer info følg link. www.snoscooterutleie.com På vinteren driver vi også med Snøscooter safari. For mer info følg link. www.norsemantrail.com

> Du finner oss i Myggveien 3 9514 Alta på Aronneskjosen Våre åpningstider er Mandag til Fredag Kl 08:30 - 16:00 Tlf: 911 14 628 Mail: gtm-as@online.no

> Vi har til tider veldig fine biler stående inne i Butikk/Kundemottak.

> Vi har snøscooterutleie gjennom hele scootersesongen. For mer info følg link. www.snoscooterutleie.com Leie Døgn/Dag Scooter ca 60 HK : 1850,- Inkl Forsikring Leie Døgn/Dag Scooter ca120 HK : 1990,- Inkl Forsikring

### gtmaskin.com, «US bil Spesialisten»

> Ja, vi i GTM er entusiaster på biler ikke bare på Amerikanske, men på alle spesielle biler. Vi har et moderne verksted som tar vare på bilen din, gamle som nye, blanke som rustene. Vi ordner deler til din bruksbil eller din Entusiast bil. Vi har også bra delelager til de fleste US biler også TESLA. Vi har dyktige teknikere med lang erfaring på europeiske biler også . Noe du trenger hjelp til så er det bare å ta kontakt med oss.

### gtmaskin.com, meny og undertittel

> GT Maskin AS · Kustom Speedshop · Min forside · Kontakt · Biler Til Salgs · Bestill nå · Kjøp Produkter · US bil Spesialisten

### gtmaskin.com, kontaktside

> Kontakt GT Maskin AS · Send hilsen · Skriv meldingen din her. Fyll ut skjemaet

### Facebook, om-tekst

> Spesialisert på US biler og custom prosjekt.Godkjent bilverksted,Reperasjon av amrikanske biler og amerikanske bildeler (Også andre merker)...

### Alta Amcar Klubb om GT Maskin (tredjepart)

> Vi har spesialisert oss på amerikanske biler og classic biler av alle merker. www.gtmaskin.com Mobil: +47 90 12 35 44 +47 47 37 23 65 ... Innbydende og kreativt kundemottak. Kan bistå med service og vedlikehold, gode tips og råd!

### Stavefeil som rettes i ny tekst

reperasjon → reparasjon · amrikanske → amerikanske · rustene → rustne · ett bilverksted → et bilverksted · Entusiast bil → entusiastbil · biltransport henger → biltransporthenger · Snøscooter safari → snøscootersafari · store forbokstaver midt i setning (Amerikanske, Butikk/Kundemottak, TESLA) normaliseres.

---

## Del B: ny sidetekst (klar til `src/data/`)

### Felles

- Firmanavn: GT Maskin AS
- Undertittel (header): KUSTOM SPEEDSHOP · ALTA
- Telefon: 911 14 628 (`tel:+4791114628`)
- E-post: gtm-as@online.no
- Adresse: Myggveien 3, 9514 Alta (Aronneskjosen)
- Åpningstider: Mandag-fredag 08:30-16:00. Lørdag og søndag stengt.
- Primær CTA: Bestill verkstedtime → `/bestill`
- Header-knapp: Bestill time → `/bestill`

### Forside: Hero

- Kicker: GODKJENT BILVERKSTED · ALTA · SIDEN 2012
- Tittel: Spesialisten på amerikanske biler i Alta
- Ingress: Vi er entusiaster på biler, ikke bare amerikanske, men alle spesielle biler. Moderne verksted, godt delelager og lang erfaring. Fra gamle veteranbiler til nye bruksbiler.
- Knapp 1: Bestill verkstedtime → `/bestill`
- Knapp 2: Se hva vi gjør → `/verksted`
- Boks over bildet: 2012 / Etablert i Alta. Amerikanske biler, custom-prosjekter og delesalg.
- Bilde: [HOVEDBILDE: prosjektbil i verkstedet]

### Forside: Tillitsstripe

1. Godkjent bilverksted
2. Spesialister på US-biler
3. Delelager for US-biler og Tesla
4. Godkjent lærebedrift
5. Snøscooterutleie hele sesongen

### Forside: Live fra GT Maskin

- Kicker: SISTE FRA FACEBOOK
- Tittel: Live fra GT Maskin
- Ingress: Over 1 000 liker GT Maskin på Facebook. Her ser du det siste fra verkstedet, hentet automatisk.
- Knapp: Følg oss på Facebook → https://www.facebook.com/GtMaskinas
- Kort: se `SOME-FEED-EKSEMPLER.md`

### Forside: Hva vi gjør

- Kicker: HVA VI GJØR
- Tittel: Verksted, deler og prosjekter
- Ingress: Vi tar alt fra gamle veteranbiler til nye bruksbiler, med et moderne verksted som tar vare på bilen din, gamle som nye, blanke som rustne.

| Ikon (lucide) | Tittel | Tekst | Lenke |
|---|---|---|---|
| Wrench | Verksted og reparasjon | Service, feilsøking og reparasjon av amerikanske biler, og de fleste andre merker. Dyktige teknikere med lang erfaring, også på europeiske biler. | /verksted |
| Gauge | Custom og speedshop | Ombygging, oppgradering og skreddersydde prosjekter. Kustom Speedshop er der entusiastbilen din får det den fortjener. | /verksted#custom |
| Package | Deler og delelager | Godt delelager til de fleste US-biler, også Tesla. Vi skaffer deler til både bruksbilen og entusiastbilen din. | /deler |
| Car | Veteran og classic | Classic-biler av alle merker, med respekt for originalen. Vi tar vare på bilen din: gammel som ny, blank som rusten. | /verksted#classic |
| Tag | Biler til salgs | Det står til tider svært fine biler inne i butikk og kundemottak. Se hva som er inne nå, eller spør oss om det du leter etter. | /biler-til-salgs |
| Snowflake | Utleie og safari | Snøscooter, ATV, tilhenger og biltransporthenger. Guidet snøscootersafari gjennom hele vintersesongen. | /utleie |

### Forside: GT Maskin på film

- Kicker: VIDEO
- Tittel: GT Maskin på film
- Ingress: Prosjekter, før og etter, og litt fra hverdagen på verkstedet i Myggveien.
- Plassholdere: [HOVEDVIDEO: fra verkstedet] · [Videotittel 2] · [Videotittel 3] · [Videotittel 4], hver med [Varighet] · [dato]

### Forside: Biler til salgs

- Kicker: BILER TIL SALGS
- Tittel: Inne hos oss akkurat nå
- Lenke: Se alle biler → `/biler-til-salgs`
- Kort: [BILDE AV BIL] · [Merke og modell] · [PRIS] kr · [Årsmodell] · [km] · [drivstoff / motor]
- Tom tilstand: Ingen biler ute for salg akkurat nå. Leter du etter noe spesielt? Ta kontakt, vi vet hva som er på vei inn.

### Forside: Deler og nettbutikk

- Kicker: DELER OG NETTBUTIKK
- Tittel: Deler til US-biler, Tesla og bruksbilen
- Ingress (underside): Vi har godt delelager til de fleste amerikanske biler, og skaffer det vi ikke har på lager. Finner du ikke delen her, send oss en forespørsel med merke, modell og årsmodell.
- Kategorier: Alle deler · US-biler · Tesla · Motor og drivverk · Bremser · Understell · Tilbehør
- Lenke: Gå til nettbutikken → `/deler`
- Produktkort: [PRODUKTBILDE] · [VAREMERKE] · [Produktnavn] · [PRIS] kr · Legg i kurv
- Produktside-knapp 2: Send forespørsel om denne delen → `/kontakt?vare=<slug>`

### Forside og underside: Utleie

- Kicker: UTLEIE
- Tittel: Snøscooter, ATV og henger
- Ingress: Snøscooterutleie gjennom hele scootersesongen, ATV og hengere resten av året. Bestill på snoscooterutleie.com.

| Tittel | Tekst | Pris | Note |
|---|---|---|---|
| Snøscooter ca. 60 hk | Lettkjørt scooter for tur og familie. Forsikring inkludert. | [PRIS] kr / døgn | inkl. forsikring |
| Snøscooter ca. 120 hk | Mer krefter for lengre turer og løssnø. Forsikring inkludert. | [PRIS] kr / døgn | inkl. forsikring |
| ATV | Firehjuling for barmark og terreng. | [PRIS] kr / døgn | [vilkår] |
| Tilhenger og biltransporthenger | Vanlig tilhenger eller biltransporthenger når bilen skal flyttes. | [PRIS] kr / døgn | [vilkår] |

- Knapp på alle kort: Bestill på snoscooterutleie.com → https://www.snoscooterutleie.com
- Safari-banner: Snøscootersafari i Finnmark / Om vinteren kjører vi guidede snøscooterturer, se Norseman Trail. / Knapp: norsemantrail.com → https://www.norsemantrail.com

### Om oss (forside kort og underside)

- Kicker: OM OSS OG HISTORIEN
- Tittel: Entusiaster på biler siden 2012
- Avsnitt 1: GT Maskin AS ble etablert i Alta i 2012 av Gjermund Thomassen. I dag er vi et godkjent bilverksted og godkjent lærebedrift, med et moderne verksted i Myggveien 3 på Aronneskjosen.
- Avsnitt 2: Vi er entusiaster, ikke bare på amerikanske biler, men på alle spesielle biler. Kundemottaket er innbydende og kreativt, og det står til tider svært fine biler inne hos oss. Trenger du hjelp til noe, er det bare å ta kontakt.
- Faktabokser: 2012 / Etablert i Alta · Alta / Myggveien 3, Aronneskjosen · Godkjent / Bilverksted · Lærebedrift / Vi tar inn lærlinger
- Tidslinje: 2012: GT Maskin AS stiftes i Alta av Gjermund Thomassen. · [ÅR]: [Milepæl, f.eks. flytting til Myggveien 3] · [ÅR]: [Milepæl, f.eks. oppstart snøscooterutleie og safari] · I dag: Kustom Speedshop med verksted, delesalg, biler til salgs, utleie og safari.
- Folkene: Gjermund Thomassen, daglig leder og eier · [Navn], [rolle] · [Navn], [rolle]
- Underside, ekstra avsnitt om lærlinger: Vi er godkjent lærebedrift og tar inn lærlinger gjennom opplæringskontoret. Er du interessert i læreplass, ta kontakt.
- Sitat (med kilde Alta Amcar Klubb): «Innbydende og kreativt kundemottak. Kan bistå med service og vedlikehold, gode tips og råd!»

### Verksted (underside)

- Tittel: Bilverksted i Alta for amerikanske og spesielle biler
- Ingress: Godkjent bilverksted i Myggveien 3. Service, feilsøking, reparasjon og custom-prosjekter. Amerikanske biler er spesialiteten, men vi tar de fleste merker.
- Seksjoner (ankere): `#reparasjon` Reparasjon og service · `#custom` Custom og speedshop · `#classic` Veteran og classic · `#europeisk` Europeiske biler og Tesla · `#deler` Deler
- Slik jobber vi: 1. Ta kontakt: ring, send skjema eller stikk innom. · 2. Vi ser på bilen: du får beskjed om hva som må gjøres. · 3. Vi gjør jobben: og sier fra når bilen er klar.
- CTA: Bestill verkstedtime

### Bestill verkstedtime (`/bestill` og forside)

- Tittel: Bestill time eller send en forespørsel
- Undertekst: Fortell oss litt om bilen og hva du trenger hjelp til.
- Felt: Navn (Ditt navn) · Telefon (Mobilnummer) · E-post (navn@eksempel.no) · Bil (merke / modell / reg.nr.) (F.eks. Chevrolet Camaro 1969) · Ønsket uke eller dato (Fritekst) · Hva trenger du hjelp til? (Service, feilsøking, deler, custom-prosjekt, utleie …)
- Knapp: Send forespørsel
- Suksess: Takk! Vi har mottatt forespørselen din og tar kontakt.
- Feil: Noe gikk galt. Ring oss på 911 14 628 eller send e-post til gtm-as@online.no.
- Validering: Fyll inn navn, melding og enten telefon eller e-post.

### Kontakt (`/kontakt`)

- Kicker: KONTAKT OG BESTILLING
- Tittel: Ta kontakt, vi hjelper deg
- Adressekort: Myggveien 3, 9514 Alta (Aronneskjosen) · Knapp: Åpne i Google Maps
- Åpningstider: Mandag-fredag 08:30-16:00 · Lørdag og søndag stengt
- Telefon: 911 14 628 · E-post: gtm-as@online.no
- Skjema: samme som bestilling, uten feltet for ønsket dato

### Kasse (mock, `/kasse`)

- Tittel: Bestillingsforespørsel
- Tekst: Send oss listen, så bekrefter vi pris, lagerstatus og frakt før noe betales.
- Felt: Navn · Telefon · E-post · Leveringsadresse · Melding
- Knapp: Send bestillingsforespørsel
- Suksess: Takk! Vi går gjennom bestillingen og tar kontakt for bekreftelse.

### 404

- Tittel: Siden finnes ikke
- Tekst: Lenken kan være gammel. Gå til forsiden eller ta kontakt med oss.

### Personvern

- Kort tekst: siden bruker ingen sporing og ingen informasjonskapsler. Skjemaer sender kun det du selv fyller inn, til GT Maskin AS. Kontakt: gtm-as@online.no.

### SEO (title / description)

- `/`: GT Maskin AS, US-bilspesialisten i Alta | Godkjent bilverksted / Godkjent bilverksted i Alta spesialisert på amerikanske biler, custom-prosjekter og delesalg. Utleie av snøscooter, ATV og henger. Myggveien 3, Alta.
- `/verksted`: Bilverksted i Alta for amerikanske biler, custom og classic | GT Maskin AS / Service, reparasjon og custom-prosjekter for amerikanske biler og de fleste andre merker. Godkjent bilverksted i Myggveien 3, Alta.
- `/deler`: Deler til amerikanske biler og Tesla | GT Maskin AS / Godt delelager til de fleste US-biler, også Tesla. Send forespørsel om deler til bruksbilen eller entusiastbilen din.
- `/biler-til-salgs`: Biler til salgs | GT Maskin AS / Se hvilke biler som står inne hos GT Maskin i Alta akkurat nå.
- `/utleie`: Snøscooterutleie, ATV og henger i Alta | GT Maskin AS / Leie av snøscooter, ATV, tilhenger og biltransporthenger i Alta. Snøscootersafari om vinteren.
- `/om-oss`: Om GT Maskin AS, Kustom Speedshop i Alta siden 2012 / Entusiaster på amerikanske og spesielle biler. Godkjent bilverksted og lærebedrift i Alta, etablert 2012.
- `/bestill`: Bestill verkstedtime i Alta | GT Maskin AS / Send forespørsel om service, reparasjon eller custom-prosjekt. Vi tar kontakt og bekrefter time.
- `/kontakt`: Kontakt GT Maskin AS i Alta / Myggveien 3, 9514 Alta. Mandag-fredag 08:30-16:00. Ring 911 14 628 eller send forespørsel.
