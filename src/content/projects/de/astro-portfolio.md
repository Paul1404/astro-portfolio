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
liveUrl: https://pd-portfolio.net
icon: globe
---

Eine persönliche Seite muss schnell laden, leicht zu pflegen sein und nicht selbst zum Wartungsprojekt werden. Diese hier ist ein statischer Astro-Build, bei dem ein neues Projekt eine Markdown-Datei bedeutet und nicht das Anfassen von Komponenten.

### Was es macht

- Erzeugt jedes Projekt aus Markdown in einer Content Collection, sodass neue Einträge je eine Datei sind.
- Liefert Englisch und Deutsch aus derselben Quelle über integriertes i18n-Routing.
- Bringt ein kleines interaktives Terminal unter `/terminal` mit sowie ein vollständiges Favicon-Set, das aus einer einzigen SVG generiert wird.

### Warum es wichtig ist

Inhalt und Code bleiben getrennt, sodass das Schreiben über ein neues Projekt nie ein Bearbeiten der Seite selbst bedeutet. Sie baut zu reinen statischen Dateien und wird auf Cloudflare Pages deployt.
