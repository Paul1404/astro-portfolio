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
featured: true
icon: trophy
---

Ein Tischtennisturnier auf Papier zu führen bedeutet, Bäume von Hand neu zu zeichnen, Ergebnisse zwischen Blättern zu übertragen und eine Menschentraube, die auf einen einzigen Ausdruck schielt, um zu sehen, wer als Nächstes an Tisch 3 spielt. Dieses Projekt macht aus der Teilnehmerliste alles, was der Turniertag braucht, gesteuert über ein einziges Dashboard.

### Was es macht

- Erzeugt die Auslosung und unterstützt je Konkurrenz mehrere Formate: Gruppen mit K.-o.-Runde, Jeder gegen Jeden, Jeder gegen Jeden mit Finalrunde, reines K.-o.-System oder ein Schweizer System.
- Prüft Ergebnisse satzweise gegen die Regeln, verteilt Spiele über parallele Tische und nummeriert jedes Spiel.
- Gibt Zuschauern eine mobile Live-Ansicht, die sich selbst aktualisiert und über Server-Sent Events sofort nachzieht, erreichbar über einen QR-Code.

### Warum es wichtig ist

Der Organisator ist nicht länger der Engpass. Ergebnisse werden einmal eingetragen, und alle, Spieler wie Zuschauer, sehen dieselbe aktuelle Tabelle und denselben Spielbaum. Die Turnierlogik steckt in einer eigenen, abhängigkeitsfreien Engine, und jeder Verein kann das Projekt mit eigenem Namen und Logo forken.
