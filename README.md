# astro-portfolio

Paul Dresch's personal portfolio. A static site that showcases shipped software:
cloud apps, self-hosted tools, automation, and infrastructure projects. Available
in English and German.

Live at [pd-portfolio.net](https://pd-portfolio.net).

## Stack

- [Astro](https://astro.build/) static site, TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) via the `@tailwindcss/vite` plugin
- [astro-icon](https://www.astroicon.dev/) with the Lucide icon set
- Projects authored as Markdown in a `projects` content collection
- Built-in Astro i18n routing (English default, German under `/de/`)
- Deployed to Cloudflare Pages

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:4321.

## Build

```bash
npm run build      # outputs static site to dist/
npm run preview    # serve the production build locally
```

## Internationalization

UI strings live in `src/i18n/ui.ts` and are read through the helpers in
`src/i18n/utils.ts`. English is the default locale and is served from the root;
German is served from `/de/`. Page bodies are shared components in
`src/components/pages/`, rendered by thin route files in `src/pages/` (English) and
`src/pages/de/` (German), so markup stays in one place. The language switcher lives
in the nav, and a small inline script in the head sends first-time visitors to their
browser language and remembers an explicit choice.

## Project content

Each project lives in `src/content/projects/<lang>/<slug>.md`, with one file per
locale (`en/` and `de/`) sharing the same slug. The frontmatter schema is defined in
`src/content.config.ts` and supports `title`, `description`, `publishDate`, `stack`,
`tags`, `repoUrl`, `liveUrl`, `featured`, `status`, and an `icon` (a Lucide name).
Every project card and detail header renders the same brand-gradient icon hero, so
the look stays consistent without per-project artwork. Set `featured: true` to
surface a project on the home page.

## Web terminal

`/terminal` (and `/de/terminal`) is a small client-side shell. The logic is in
`src/components/pages/TerminalPage.astro`. Project data is injected server-side as a
JSON island; type `help` for the command list.

## Favicons

The favicon set is generated from `public/favicon.svg`:

```bash
npm run favicons
```

This writes the PNG variants and `manifest.webmanifest` into `public/`.

## Deployment

Cloudflare Pages serves the `dist/` directory (see `wrangler.jsonc`). Old `/work/*`
URLs redirect to `/projects/*` via `public/_redirects`.

## License

[MIT](LICENSE)
