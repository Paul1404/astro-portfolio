---
title: "DiaTrack"
publishDate: 2026-06-04 00:00:00
description: "Ein Sensor- und Katheter-Tracker mit Wechsel-Countdowns, E-Mail-Erinnerungen, Gerätehistorie und Fehlerstatistiken."
stack:
  - TypeScript
  - TanStack Start
  - PostgreSQL
  - Bun
tags:
  - Device Tracking
  - Reminders
  - Public Source
repoUrl: https://github.com/Paul1404/diatrack
featured: true
featuredOrder: 7
icon: activity
screenshot:
  image: diatrack
  alt: "DiaTrack: aktive Sensoren, Katheter und verbleibende Tragezeit"
---

DiaTrack hält Wechseltermine und die Historie von Diabetes-Sensoren und -Kathetern in einer Anwendung fest. Erfasst werden Einsetzzeitpunkt, Körperstelle und der Grund für das Ende der Nutzung.

### Was es macht

- Zeigt Countdowns für aktive Geräte und versendet konfigurierbare E-Mail-Erinnerungen vor dem Wechseltermin.
- Erfasst vorzeitige Ausfälle und ihre Ursachen in einer durchsuchbaren, sortierbaren Gerätehistorie.
- Vergleicht Laufzeiten und Ausfallquoten nach Körperstelle und Ursache, mit persönlichen Einstellungen und einer für Mobilgeräte geeigneten Oberfläche.

### Technische Umsetzung

Eine TypeScript-Anwendung auf Bun und TanStack Start mit typisierten oRPC-Prozeduren, Laufzeitvalidierung, PostgreSQL und Drizzle. Die deutsche Oberfläche nutzt TanStack Query und Form für Serverdaten und Geräteerfassung.

### Quellcode und Zugang

Der Quellcode ist öffentlich einsehbar, aber eine Softwarelizenz ist nicht angegeben. Die öffentliche Sichtbarkeit gewährt keine Nutzungsrechte. Repository-Screenshots zeigen fiktive Geräte und keine persönliche Gesundheitshistorie.
