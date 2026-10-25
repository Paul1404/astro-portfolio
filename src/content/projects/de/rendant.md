---
title: "Rendant"
publishDate: 2026-05-07 00:00:00
description: "Finanzverwaltung im Vereinseinsatz mit einem Jahresumsatz im niedrigen sechsstelligen Eurobereich: Kassenprotokolle, Belege, Steuerauswertung und historische Umsätze."
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
screenshot:
  image: rendant
  alt: "Rendant: Kassenprotokolle und Jahresumsatzverlauf"
---

Rendant wird für die Finanzen eines Vereins mit einem Jahresumsatz im niedrigen sechsstelligen Eurobereich eingesetzt. Kassenaufnahme, Kartenzahlungen, Ausgaben, Steueraufteilungen und historische Umsätze werden mit den Unterlagen für die Buchhaltung verbunden.

### Was es macht

- Berechnet Kassenbestände aus Münz- und Scheinstückelungen, Anfangsbestand, Kartenzahlungen und Ausgaben.
- Erstellt nummerierte PDF-Belege mit SHA-256-Prüfsummen. Bei einer Stornierung bleiben Original und Belegnummer erhalten; die Korrektur bekommt einen zusätzlichen Beleg.
- Verbindet aktuelle Protokolle mit historischen Tabellenimporten für Vorjahresvergleiche, Umsatzsteuerauswertungen und die Übergabe per PDF oder CSV.

### Technische Umsetzung

Die TanStack-Start-Anwendung nutzt PostgreSQL-Transaktionen für Belegnummern und Finanzänderungen. Belege liegen in S3-kompatiblem Speicher. Eine fortlaufende Ereignisspur hält relevante Änderungen fest; Rollen trennen laufende Erfassung von administrativen Importen und Einstellungen.

### Quellcode und Zugang

Öffentlich einsehbarer Quellcode unter proprietärer Lizenz. Die Nutzung erfordert eine gesonderte schriftliche Vereinbarung. Repository-Screenshots zeigen synthetische Kassenprotokolle und Beträge.
