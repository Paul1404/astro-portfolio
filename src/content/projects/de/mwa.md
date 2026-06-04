---
title: "Mailcow Web Actions"
publishDate: 2026-06-01 00:00:00
description: "Ein Mailcow-Upgrade auf einem Remote-Server direkt aus dem Browser anstoßen und die Live-Terminalausgabe im Stream zurückverfolgen."
stack:
  - TypeScript
  - SSH
  - WebSockets
tags:
  - Mailcow
  - Automatisierung
  - Open Source
repoUrl: https://github.com/Paul1404/mwa
status: shipped
icon: terminal
---

Mailcow zu aktualisieren bedeutet, sich per SSH auf dem Server einzuloggen und das Upgrade-Skript von Hand auszuführen. Einmal geht das noch, auf Dauer ist es lästig und man schiebt es gerne auf. Dieses Tool steckt den gesamten Ablauf hinter eine authentifizierte Webseite.

### Was es macht

- Verbindet sich per SSH mit dem Zielserver und führt die Standard-Mailcow-Update-Sequenz aus.
- Streamt die Live-Terminalausgabe über eine authentifizierte Sitzung zurück in den Browser, sodass man genau sieht, was passiert.
- Beseitigt die Notwendigkeit, ein Terminal offen zu halten, nur um ein Routine-Update durchzuführen.

### Warum es wichtig ist

Routinewartung, die man von überall erledigen kann, ist Wartung, die tatsächlich gemacht wird.
