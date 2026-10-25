# Repository guidance

This is the canonical instruction file for this repository. Claude Code loads it through
`CLAUDE.md`.

## Start here

- Inspect branch, upstream divergence, status, and diff before editing.
- Preserve pre-existing changes and keep unrelated work out of the patch.
- Use the repository's existing runtime, package manager, framework, and deployment model.
- Do not refactor an existing project into the preferred new-project stack unless explicitly requested.
- Verify current documentation before changing version-dependent dependencies or hosting behavior.

## Project

This is Paul's bilingual static portfolio, deployed through GitHub Pages at `https://portfolio.pdcd.net`.

It uses Astro, TypeScript, Tailwind CSS, npm, Markdown content collections, and built-in Astro i18n routing.

## Project rules

- Use npm and preserve `package-lock.json`.
- Keep English and German project content aligned, including `featuredOrder`.
- Verify project claims and license terms from current repository documentation. Public source is not automatically open source, and forks must not be presented as original work.
- Do not expose private repository URLs. Publicly usable private projects may link only to their live product.
- Preserve static output. GitHub Pages publishes `dist/` through `.github/workflows/pages.yml` on `master`.
- Use the custom hostname as Astro's `site`, with no repository-name base path.
- GitHub Pages ignores `_redirects`; legacy routes need generated HTML redirects.
- Route 53 DNS is managed by `infra/github-pages-dns.json`, stack `astro-portfolio-pages-dns` in `eu-central-1`.
- Keep the contact email unchanged when changing the website hostname.
- Treat generated icons and optimized assets as generated outputs.

## Commands

- `npm run dev`: local development
- `npm run build`: production build
- `npm run astro -- check`: Astro validation when applicable

## Verification

Run the relevant checks and exercise the affected workflow, endpoint, or generated artifact.
State clearly when authenticated, database, deployment, or live verification was not possible.

## Maintaining instructions

Update `AGENTS.md` when verified, durable repository behavior changes. Keep it concise and
move detailed explanations into `docs/`. Keep `CLAUDE.md` as the compatibility import
unless Claude-specific guidance is genuinely required.

## Analytics privacy

public/analytics-consent.js gates both Umami scripts behind an explicit choice.
Keep it consistent with the same asset in the other managed websites. Reject
and withdraw must stop requests, including beacon/keepalive sends. The loader
honors DNT/GPC, excludes query-bearing and authenticated routes, and strips
individual event data and titles. Server-side strict masking and replay limits
are owned by web-host-gitops analytics/websites.json. Never rely on recorder
data-mask-level attributes. Keep the site's privacy notice and providers aligned.

## Project screenshots

Use local assets in `src/assets/projects`, registered in `src/lib/project-images.ts`
and the bilingual `screenshot` frontmatter. Keep uncropped application views,
localized alt text, and the fictional-data caption. See `docs/project-screenshots.md`
for provenance. Projects without an approved screenshot use text, not invented artwork.

## Curation and motion

Mark projects with archived upstream repositories `status: archived` in both
locales. `getProjects` excludes them from listings, detail routes, the terminal,
and generated legacy redirects. Retain content for history. Keep the homepage
constellation and animated brand highlight; screenshot-led project presentation
does not require removing intentional motion. Honor reduced-motion preferences.

Mobile browser chrome can emit viewport resize events while scrolling. Keep
constellation particles across resizes and skip canvas buffer writes when the
hero geometry and pixel ratio are unchanged. The footer places the shared
analytics consent control in the document flow; keep the common loader intact
and preserve reopening, rejection, withdrawal, and focus without a scroll jump.

Mobile navigation must close on outside taps, Escape, focus leaving the menu,
and desktop breakpoints. Keep standalone navigation targets at least 44 px.
Do not autofocus the terminal on touch or narrow screens, and keep its input
at 16 px to avoid iOS focus zoom. Long headings must wrap without page overflow;
anchor targets need clearance under the sticky header.
Analytics settings need a footer fallback on query/hash URLs where the shared
loader intentionally does not initialize. Navigate to the localized plain
privacy page and open the panel there; never relax the loader's route gate.

`npm run build` writes `/health.json` only after both localized homepages exist.
The response includes the source revision. The Pages deployment verifies that
exact revision independently over HTTPS before reporting success.
