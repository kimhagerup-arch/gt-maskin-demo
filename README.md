# GT Maskin: startpakke v2 for demo-bygget

Erstatter startpakke v1 (Next.js-varianten) helt. Denne følger KOVISIONs demoprosess: Vite + React SPA, alt innhold i `src/data/`, make.com-klar feed, noindex, ingen tankestrek.

## Slik brukes den

1. Kopier hele innholdet i denne mappen inn i repo-mappen `gt-maskin_VS_code` (den skal være tom fra før). Ikke i `gt-maskin_lagring`.
2. Legg logo og bilder du har hentet i `gt-maskin_VS_code\assets-raw\` (se README der). Mappen er gitignored.
3. Åpne `gt-maskin_VS_code` i VS Code, start `claude` i terminalen, Shift+Tab til «accept edits».
4. Åpne `PROMPT.md`, kopier alt under streken og lim inn som første melding.
5. La den jobbe. Den committer per hovedpunkt på branch `dev` og avslutter med `STATUS.md` og en kort oppsummering. Forventet tid: 30-60 minutter.
6. `npm run dev` → http://localhost:5173. Sjekk 375 px og 1440 px, åpen mobilmeny, alle ruter.
7. Deretter som vanlig: opprett privat repo `kimhagerup-arch/gt-maskin-demo`, push `dev`, Vercel-prosjekt `gt-maskin-demo` med `dev` som production branch, verifiser noindex med `curl -I`.

## Innhold

| Fil eller mappe | Havner i repo | Formål |
|---|---|---|
| `CLAUDE.md` | ja | Faste regler Claude Code leser automatisk |
| `PROMPT.md` | ja | Kickoff-prompten |
| `.claude/settings.json` | ja | Tillatelser (npm, git lokalt) og sperrer (push, reset, gh, vercel). Slår av medforfatter-linjer i commits |
| `.gitignore` | ja | node_modules, dist, assets-raw |
| `_kilder/` | ja | Fakta, innhold, ressurser, feed-eksempler, designsystem, integrasjoner, referanse-HTML |
| `assets-raw/` | kun README | Logo, bilder, video hentet manuelt |
| `docs/` | ja | Fylles av bygget med ARBEIDSLOGG.md og KONTEKST.md |

## Hva som er annerledes enn v1

- Stack: Vite + React 18 + react-router + Tailwind 3.4 + lucide-react + Biome, JavaScript. Ikke Next.js.
- Feed bygget mot make.com-objektet (v1 sa Mate.com og env-snippet).
- Kart som adressekort med lenke, ikke embed.
- All tekst uten tankestrek, tone sjekket mot forbudte ord.
- Nettbutikk som mock med handlekurv og kasse-forespørsel, ikke Resend-integrasjon i demoen.
- Forsiden har feed og video høyt oppe som ny verdi.
- `BESLUTNINGER.md`, `STATUS.md`, `BILDELISTE.md`, `docs/ARBEIDSLOGG.md` og `docs/KONTEKST.md` lages av bygget.
- Ingen priser, salgsstrategi eller andre kunder i noe som havner i repoet.
