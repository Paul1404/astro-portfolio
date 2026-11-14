---
title: "Tischtennis-Turniere"
publishDate: 2026-05-18 00:00:00
description: "Eine browserbasierte Turnierverwaltung für einen Tischtennisverein. Sie macht aus einer Teilnehmerliste die Auslosung, Gruppentabellen, K.-o.-Bäume, einen Zeitplan über mehrere Tische und eine Live-Ansicht, die Zuschauer per QR-Code erreichen."
stack:
  - TypeScript
  - Next.js
  - PostgreSQL
  - Hono
tags:
  - Verein
  - Turniere
  - Open Source
repoUrl: https://github.com/Paul1404/svutt
liveUrl: https://svutt.sv-untereuerheim.de
icon: trophy
screenshot:
  image: svutt
  alt: "Vereinswappen des SV Untereuerheim aus der Turnieranwendung"
  caption: "Vereinswappen aus der Turnieranwendung."
---

Die Turnierverwaltung habe ich für einen Tischtennisverein gebaut. Die Turnierleitung erfasst Teilnehmer und Ergebnisse im Browser; Spieler und Zuschauer verfolgen Spielplan, Tabellen und K.-o.-Bäume über eine öffentliche Live-Ansicht.

### Turnierablauf

- Erzeugt die Auslosung und unterstützt je Konkurrenz mehrere Formate: Gruppen mit K.-o.-Runde, Jeder gegen Jeden, Jeder gegen Jeden mit Finalrunde, reines K.-o.-System oder ein Schweizer System.
- Prüft Ergebnisse satzweise gegen die Regeln, verteilt Spiele über parallele Tische und nummeriert jedes Spiel.
- Aktualisiert die mobile Zuschaueransicht über Server-Sent Events. Ein QR-Code führt direkt zum Turnier.

### Technische Umsetzung

Die Turnierlogik liegt in einer eigenen, abhängigkeitsfreien Engine. Ergebnisse werden einmal erfasst und erscheinen anschließend in den Tabellen und Spielbäumen der öffentlichen Ansicht. Andere Vereine können das Projekt mit eigenem Namen und Logo übernehmen.
