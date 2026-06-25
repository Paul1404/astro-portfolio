---
title: "This Portfolio"
publishDate: 2026-06-02 00:00:00
description: "The site you are looking at. A static, bilingual portfolio built with Astro, where every project is a Markdown file in a content collection."
stack:
  - Astro
  - TypeScript
  - Tailwind CSS
tags:
  - Web
  - Open Source
repoUrl: https://github.com/Paul1404/astro-portfolio
liveUrl: https://pd-portfolio.net
icon: globe
---

A personal site has to load fast, stay easy to update, and not turn into a maintenance project of its own. This one is a static Astro build where adding a project means writing a Markdown file, not touching components.

### What it does

- Renders every project from Markdown in a content collection, so new entries are one file each.
- Serves English and German from the same source through built-in i18n routing.
- Ships a small interactive terminal at `/terminal` and a full favicon set generated from a single SVG.

### Why it matters

The content and the code stay separate, so writing about a new project never means editing the site itself. It builds to plain static files and deploys to Cloudflare Pages.
