---
title: "Remise"
publishDate: 2026-09-09 00:00:00
description: "Mein privater Arbeitsplatz für eBay-Verkäufe: Artikelakten, Fotoprüfung, Angebotsabgleich, ausdrückliche Freigaben und dokumentierte Marktplatzaktionen."
stack:
  - TypeScript
  - TanStack Start
  - PostgreSQL
  - Bun
  - MCP
tags:
  - Resale
  - eBay
  - Private Application
liveUrl: https://app.remise.pdcd.net
featured: true
featuredOrder: 5
icon: archive
screenshot:
  image: remise
  alt: "Remise: Bestandsregister mit fiktiven Artikeln, Preisen und Angebotszuständen"
---

Mit Remise verwalte ich meine eigenen eBay-Verkäufe. In einer Artikelakte stehen Fotos, Zustandsnotizen, Recherche, Angebotstexte, Preise und die Nachweise zu den jeweiligen Marktplatzaktionen zusammen.

### Was es macht

- Führt einen Artikel von Fotos und Recherche zum vorbereiteten Angebot, mit geprüften Medien und strukturierten Produktangaben.
- Gleicht Angebote, Preise, Bestellungen und Gebühren mit dem Marktplatz ab und hält die Ergebnisse bei der Artikelakte fest.
- Verlangt für Veröffentlichungen, Preisänderungen und andere Marktplatzänderungen eine Vorschau und ausdrückliche Freigabe. Ein Aktionsprotokoll dokumentiert die Ausführung und den unabhängigen Abgleich danach.

### Technische Umsetzung

Bun, TypeScript, React, TanStack Start, Router und Query verbinden die Oberfläche mit PostgreSQL und Objektspeicher. Über eine gehostete MCP-Schnittstelle greifen Assistenten per OAuth auf dieselben Artikelakten und Freigabegrenzen zu, ohne Marktplatz-Zugangsdaten in den Chat zu übernehmen.

### Zugang

Remise ist meine private Verkaufsverwaltung. Die Anmeldeseite ist öffentlich erreichbar; Artikelakten, Dokumente und Marktplatzzugriff benötigen eine Berechtigung. Die Vorschau zeigt die aktuelle Oberfläche mit fiktiven Artikeln und ohne aktive eBay-Verbindung.
