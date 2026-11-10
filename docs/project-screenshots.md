# Project screenshots

Application screenshots use real interfaces with fictional data. Project previews
may also use the actual project's branding, licensed photography, or an
accurate architecture diagram when explicitly requested. Captions identify
those assets; do not present them as application screenshots or use private
production account captures except where the owner explicitly supplies and
authorizes a specific view, as recorded below.

| Asset | Source | Data boundary |
| --- | --- | --- |
| fortuna.webp | fortuna/docs/screenshots/desk.png | Local fictional preview, documented in fortuna/docs/screenshot-preview.md |
| kontor2.webp | kontor2/docs/screenshots/members.png | Fictional member register documented in the project README |
| kataster.webp | kataster/docs/screenshots/billing.png | Fictional customers and amounts documented in kataster/docs/demo.md |
| rendant.webp | rendant/docs/screenshots/overview.png | Synthetic cash records documented in the project README |
| diatrack.webp | diatrack/docs/screenshots/overview.png | Synthetic device records documented in the project README |
| remise.webp | Current Remise inventory interface, captured locally on 2026-10-25 | Isolated frontend preview with fictional records and stubbed dashboard reads |
| stalwart.webp | https://stalw.art/img/stalwart-social-card.jpg, linked by the official homepage Open Graph metadata, retrieved 2026-10-29 | Official brand image, not an application screenshot; no account or mailbox data |
| rancher.webp | [Rancher by SUSE official horizontal logo](https://www.rancher.com/assets/img/brand-guidelines/assets/logos/png/color/rancher-suse-logo-horizontal-color.png), published in the [brand guidelines](https://www.rancher.com/brand-guidelines), retrieved 2026-11-08 | Official brand artwork, centered on a white canvas and recompressed as WebP; not a screenshot or endorsement |
| hof-stetten.webp | `hof-stetten.de/public/og.jpg`, derived from St. Anna photograph by [Tilman2007](https://commons.wikimedia.org/wiki/File:Hofstetten_27_K%C3%B6nigsberg_in_Bayern_20201129_001.jpg) | CC BY-SA 4.0, cropped by the project for its social preview and recompressed as WebP; attribution and license linked in both project pages |
| untereuerheim.webp | `untereuerheim.com/public/og.jpg` | Aerial photograph used for the project website's social preview, recompressed as WebP |
| svutt.webp | `svutt/public/logo.png` | SV Untereuerheim club crest used in the tournament application, centered on a white canvas |
| portfolio.webp | `public/logo.svg` | Portfolio's own brand mark, centered on a light canvas |

Application screenshot sources were reviewed on 2026-10-25. WebP exports
preserve the full source image and resize to a maximum width of 1600 pixels at
quality 88. The project-owned social previews were already cropped by their
source websites; diagram and logo previews use padded canvases. Astro generates responsive
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

PDCD Mail uses the official, unaltered Stalwart brand composition at Paul's
request, exported to WebP at quality88 with its1200x675 dimensions preserved.
Both locales provide an explicit caption attributing Stalwart Labs, overriding
the fictional-data screenshot caption. The image identifies the underlying
software; it is not a screenshot of the deployed mail platform or an endorsement.

## Vertex production views

Paul supplied the Rancher Continuous Delivery, node list and cluster dashboard
screenshots on 2026-11-10 and explicitly requested their publication. The
WebP assets in `public/images/vertex/` are exact crops of the Rancher interface,
resized to 1600 pixels. Desktop and browser chrome were excluded. Private node
IP addresses remain visible at his explicit request. Captions identify these as
production snapshots rather than fictional demo data.
