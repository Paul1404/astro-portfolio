---
title: "autopatchd"
publishDate: 2026-01-14 00:00:00
description: "Ein automatisierter Patch-Management-Daemon für RHEL-basierte Systeme, der Updates nach Zeitplan einspielt, damit Server aktuell bleiben, ohne dass jemand dnf von Hand ausführt."
stack:
  - Python
  - Linux
tags:
  - Linux
  - Automatisierung
  - Open Source
repoUrl: https://github.com/Paul1404/autopatchd
status: archived
icon: package-check
---

Einen Bestand an Linux-Servern gepatcht zu halten, ist eine dieser Aufgaben, die man gerne aufschiebt, bis daraus ein Sicherheitsproblem wird. autopatchd spielt die Updates nach Zeitplan ein, sodass sie passieren, ob jemand daran denkt oder nicht.

### Was es macht

- Läuft als Daemon auf RHEL, Rocky Linux, AlmaLinux und CentOS Stream.
- Spielt System-Patches nach Zeitplan ein, statt auf einen manuellen dnf-Lauf zu warten.
- Hält mehrere Maschinen aktuell, ohne dass für jede Box Handarbeit nötig ist.

### Warum es wichtig ist

Patching, das von alleine passiert, ist Patching, das tatsächlich passiert. Es macht aus einer aufgeschobenen Pflicht eine ruhige Routine im Hintergrund.
