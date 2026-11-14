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
liveUrl: https://portfolio.pdcd.net
icon: globe
screenshot:
  image: portfolio
  alt: "Blue portfolio brand mark"
  caption: "Portfolio brand mark."
---

I built this portfolio with Astro, TypeScript and Tailwind CSS. Project texts live in a Markdown content collection, with an English and a German file for each project. Adding a project does not require changing the page components.

Astro generates static pages. A push to the main branch starts the build and publication on GitHub Pages. Built-in i18n routing connects the language versions.

The web terminal at `/terminal` provides another way to browse the projects. The favicons are generated from a shared SVG file.
