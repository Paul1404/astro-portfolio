---
title: "Dieses Portfolio"
publishDate: 2026-06-02 00:00:00
description: "Die Seite, die du gerade ansiehst. Ein statisches, zweisprachiges Portfolio mit Astro, bei dem jedes Projekt eine Markdown-Datei in einer Content Collection ist."
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
  alt: "Blaues Markenbild des Portfolios"
  caption: "Markenbild des Portfolios."
---

Dieses Portfolio habe ich mit Astro, TypeScript und Tailwind CSS gebaut. Die Projekttexte liegen als Markdown-Dateien in einer Content Collection, jeweils auf Deutsch und Englisch. Neue Projekte lassen sich dadurch ergänzen, ohne die Seitenkomponenten zu ändern.

Astro erzeugt daraus statische Seiten. Ein Push auf den Hauptbranch startet den Build und die Veröffentlichung auf GitHub Pages. Das integrierte i18n-Routing verbindet die Sprachfassungen.

Das Web-Terminal unter `/terminal` bietet einen zweiten Zugang zu den Projekten. Die Favicons werden aus einer gemeinsamen SVG-Datei erzeugt.
