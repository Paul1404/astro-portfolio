---
title: "BFV Match Exporter"
publishDate: 2026-06-02 00:00:00
description: "Automatischer Exporter für Spielpläne des Bayerischen Fußball-Verbands, mit CSV-, XLSX- und Kalender-Output, der nach Zeitplan veröffentlicht wird."
stack:
  - TypeScript
  - GitHub Actions
  - pnpm
tags:
  - API
  - Automatisierung
  - Open Source
repoUrl: https://github.com/Paul1404/bfv-api
liveUrl: https://sg-spielplan.untereuerheim.com/
featured: true
icon: calendar-days
---

Der Bayerische Fußball-Verband veröffentlicht Spielpläne, aber nicht in einem Format, das man tatsächlich abonnieren kann. Dieses Tool ruft den Spielplan einer Mannschaft ab und wandelt ihn in Dateien um, die Menschen wirklich nutzen können.

### Was es macht

- Holt Mannschaftsspiele vom BFV und exportiert sie als CSV-, XLSX- und Kalenderdateien.
- Läuft nach Zeitplan über GitHub Actions und veröffentlicht die Ausgabe auf GitHub Pages, sodass die Daten aktuell bleiben, ohne dass ein Server gewartet werden muss.
- Ermöglicht es Spielern und Fans, die Spielliste direkt in ihren Kalender zu übernehmen.

### Warum es wichtig ist

Ein echter Verein nutzt dieses Tool. Es ersetzt das manuelle Übertragen von Spielplänen in Tabellen durch einen Feed, der sich selbst aktuell hält.
