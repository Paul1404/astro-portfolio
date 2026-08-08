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

This is Paul's bilingual static portfolio, deployed through Cloudflare Pages.

It uses Astro, TypeScript, Tailwind CSS, npm, Markdown content collections, and built-in Astro i18n routing.

## Project rules

- Use npm and preserve `package-lock.json`.
- Keep English and German project content aligned.
- Do not expose private repository URLs. Publicly usable private projects may link only to their live product.
- Preserve static output and the existing Cloudflare deployment model.
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
