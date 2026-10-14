---
title: "Rendant"
publishDate: 2026-05-07 00:00:00
description: "Vereinsfinanzen mit Kassenzählprotokollen, nummerierten Belegen, Steuerauswertung, historischen Importen und nachvollziehbaren Korrekturen."
stack:
  - TypeScript
  - TanStack Start
  - PostgreSQL
  - Bun
  - S3
tags:
  - Club Finance
  - Auditability
  - Public Source
repoUrl: https://github.com/Paul1404/rendant
liveUrl: https://rendant.sv-untereuerheim.de
featured: true
featuredOrder: 4
icon: receipt-euro
---

Rendant verbindet die Kassenaufnahme bei einer Veranstaltung mit den Unterlagen für Buchhaltung und Übergabe. Kassenbewegungen, Kartenzahlungen, Ausgaben, Steueraufteilungen und historische Umsätze bilden einen gemeinsamen Ablauf.

### Was es macht

- Berechnet Kassenbestände aus Münz- und Scheinstückelungen, Anfangsbestand, Kartenzahlungen und Ausgaben.
- Erstellt nummerierte PDF-Belege mit SHA-256-Prüfsummen. Bei einer Stornierung bleiben Original und Belegnummer erhalten; die Korrektur bekommt einen zusätzlichen Beleg.
- Verbindet aktuelle Protokolle mit historischen Tabellenimporten für Vorjahresvergleiche, Umsatzsteuerauswertungen und die Übergabe per PDF oder CSV.

### Technische Umsetzung

Die TanStack-Start-Anwendung nutzt PostgreSQL-Transaktionen für Belegnummern und Finanzänderungen. Belege liegen in S3-kompatiblem Speicher. Eine fortlaufende Ereignisspur hält relevante Änderungen fest; Rollen trennen laufende Erfassung von administrativen Importen und Einstellungen.

### Quellcode und Zugang

Öffentlich einsehbarer Quellcode unter proprietärer Lizenz. Die Nutzung erfordert eine gesonderte schriftliche Vereinbarung. Repository-Screenshots zeigen synthetische Kassenprotokolle und Beträge.
