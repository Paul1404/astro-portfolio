---
title: "WinCrashTrace"
publishDate: 2026-03-15 00:00:00
description: "Ein PowerShell-Tool, das nach einem Systemabsturz ein Windows-Support-Bundle für die Ursachenanalyse sammelt, damit die Belege an einem Ort liegen, bevor sie verloren gehen."
stack:
  - PowerShell
tags:
  - Windows
  - Diagnose
  - Open Source
repoUrl: https://github.com/Paul1404/WinCrashTrace
icon: monitor-x
---

Wenn ein Windows-Rechner abstürzt, sind die nützlichen Belege über Ereignisprotokolle, Dump-Dateien und den Zuverlässigkeitsverlauf verstreut, und vieles davon verfällt mit der Zeit. WinCrashTrace sammelt es in einem einzigen Bundle, solange es noch da ist.

### Was es macht

- Sammelt Ereignisprotokolle, Crash-Dumps und Systemzustand in einem Support-Bundle.
- Verpackt alles so, dass es zur Analyse weitergegeben werden kann, ohne Dateien zusammensuchen zu müssen.
- Zielt auf die Ursachenanalyse von Betriebssystem-Abstürzen, nicht nur auf die sichtbaren Symptome.

### Warum es wichtig ist

Es macht aus der hektischen Suche nach dem Absturz einen einzigen Befehl, sodass die untersuchende Person mit dem vollständigen Bild startet statt mit dem, was zufällig übrig geblieben ist.
