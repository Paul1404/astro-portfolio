# Project screenshots

The showcase uses real application interfaces with fictional data. Do not replace
these with production account captures or generated dashboard artwork.

| Asset | Source | Data boundary |
| --- | --- | --- |
| fortuna.webp | fortuna/docs/screenshots/desk.png | Local fictional preview, documented in fortuna/docs/screenshot-preview.md |
| kontor2.webp | kontor2/docs/screenshots/members.png | Fictional member register documented in the project README |
| kataster.webp | kataster/docs/screenshots/billing.png | Fictional customers and amounts documented in kataster/docs/demo.md |
| rendant.webp | rendant/docs/screenshots/overview.png | Synthetic cash records documented in the project README |
| diatrack.webp | diatrack/docs/screenshots/overview.png | Synthetic device records documented in the project README |
| remise.webp | Current Remise inventory interface, captured locally on 2026-10-25 | Isolated frontend preview with fictional records and stubbed dashboard reads |

Sources were reviewed on 2026-10-25. WebP exports preserve the full image and
resize to a maximum width of 1600 pixels at quality 88. Astro generates responsive
variants. Both locales select the same asset with localized alt text. The detail
page links to the full-size local image. A screenshot illustrates the interface;
it does not verify production integrations or live account behavior.

The Remise asset shows the current application rendered from an isolated source
copy with fictional inventory records. Dashboard read functions were replaced
with local fixtures in that disposable copy; no production environment files,
database, media, or marketplace connections were used. It is an interface
preview, not proof of marketplace execution.

Usage statements for Kontor2 (around 500 club members), Rendant (annual turnover
in the low six figures in euros), Fortuna, and Kataster were supplied by Paul on
2026-10-25. These describe actual use; screenshot figures remain fictional.
