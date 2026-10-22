# Merkelogoer på skiltveggen

Lagt inn 21.10.2026 (runde 4b) etter beslutning fra Kim-Ove: demoen skal vise logoene til merkene GT Maskin har deler til og fører i butikken. Bruken avklares med Gjermund før go-live. Logoene ligger lokalt som SVG i `public/images/merker/` og lastes uten eksterne kall. Ingen av dem er endret (ingen omfarging, strekking eller effekter); bare visningshøyden settes i `src/data/brands.js`.

Alle filene er hentet fra Wikimedia Commons. Lisensmerkingen der er «Public domain» (enkle former og tekst, uten verkshøyde i USA). Varemerkerettighetene ligger hos eierne, og det er derfor bruken må avklares med Gjermund og eventuelt merkene før go-live.

| Merke | Fil i `public/images/merker/` | Kilde (Wikimedia Commons) | Lisens på Commons | Opphav oppgitt på Commons |
|---|---|---|---|---|
| Chevrolet | `chevrolet.svg` | https://commons.wikimedia.org/wiki/File:Chevrolet-logo.svg | Public domain (PD-textlogo / PD-shape) | Diego HC, SVG av FireDragonValo, avledet av Chevy logotipo.jpg (logo 2013) |
| Dodge | `dodge.svg` | https://commons.wikimedia.org/wiki/File:Dodge_2022_logo.svg | Public domain | Stellantis N.V., www.dodge.com |
| Ram | `ram.svg` | https://commons.wikimedia.org/wiki/File:Ram_Trucks_2009_wordmark.svg | Public domain | FCA US LLC, www.ramtrucks.com |
| Ford | `ford.svg` | https://commons.wikimedia.org/wiki/File:Ford_logo_flat.svg | Public domain (PD) | Ford Motor Company, fra Ford 2017 Annual Report (den blå ovalen med hvit skrift, flat utgave, 1000 × 360). Byttet 22.10.2026 (runde 5c) fra den sorte retracen `Ford-Logo-Vector.svg` |
| Cadillac | `cadillac.svg` | https://commons.wikimedia.org/wiki/File:Cadillac_Logo_2021.svg | Public domain | Cadillac (logo fra 2021). Dette er merkets gjeldende logo, som er ensfarget (sort eller hvit) etter design. Våpenskjoldet i farger (med wreath til 2014, uten wreath 2014-2021) finnes ikke som SVG på Commons (sjekket 22.10.2026, runde 5c); bare historiske rastere (`Cadillac Logo 1995.webp` med flere). Beholdt i sort, se BESLUTNINGER.md runde 5c |
| Tesla | `tesla.svg` | https://commons.wikimedia.org/wiki/File:Tesla_Motors_Logo.svg | Public domain | Ukjent, SVG hentet fra PDF (ordmerket) |
| Carhartt | `carhartt.svg` | https://commons.wikimedia.org/wiki/File:Carhartt_(logo).svg | Public domain | Ikke oppgitt (ordmerke med C) |
| Stetson | `stetson.svg` | https://commons.wikimedia.org/wiki/File:Stetson_Logo.svg | Public domain | Stetson, stetson.com (hattemerket, ikke universitetet) |

## Uten logo (navnet vises på platen)

| Merke | Hvorfor |
|---|---|
| Amsoil | Ingen SVG på Wikimedia Commons, og amsoil.com ga ingen SVG-fil ved sjekk 21.10.2026 |
| Fluid Film | Ingen SVG på Wikimedia Commons, og fluid-film.com ga ingen SVG-fil ved sjekk 21.10.2026 |
| Wunder-Baum | Commons har bare «Little Trees», det amerikanske ordmerket. Det europeiske Wunder-Baum-merket (som på pakkene i butikken) finnes ikke som SVG der |

Får kunden tak i originalfiler fra Amsoil, Fluid Film og Wunder-Baum, legges de i `public/images/merker/` og `logo` settes i `src/data/brands.js`.
