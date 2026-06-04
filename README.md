# astro-portfolio

Paul Dresch's personal portfolio. A static site that showcases shipped software:
self-hosted tools, automation, and infrastructure projects.

Live at [pd-portfolio.net](https://pd-portfolio.net).

## Stack

- [Astro](https://astro.build/) static site, TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) via the `@tailwindcss/vite` plugin
- [astro-icon](https://www.astroicon.dev/) with the Lucide icon set
- Projects authored as Markdown in a `projects` content collection
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

## Project content

Each project lives in `src/content/projects/<slug>.md`. The frontmatter schema is
defined in `src/content.config.ts` and supports `title`, `description`,
`publishDate`, `stack`, `tags`, `img`, `repoUrl`, `liveUrl`, `featured`, `status`,
and an `icon` (a Lucide name used for the card placeholder). Set `featured: true` to
surface a project on the home page.

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
