---
title: "GitBridge"
publishDate: 2026-03-24 00:00:00
description: "Ein containerisiertes Tool, das zwei Git-Repositories synchron hält. Es kann beide klonen oder fetchen oder jeden Branch und Tag von einem zum anderen spiegeln, nach Zeitplan."
stack:
  - Python
  - Docker
tags:
  - Git
  - Container
  - Open Source
repoUrl: https://github.com/Paul1404/GitBridge
status: archived
icon: git-compare-arrows
---

Manchmal muss ein Repository an zwei Orten gleichzeitig existieren: ein Spiegel auf einem zweiten Host, eine aktuelle Kopie eines Upstreams, den man nicht kontrolliert, ein Backup, das sich selbst pflegt. GitBridge erledigt genau diese eine Aufgabe und führt sie nach Zeitplan aus.

### Was es macht

- Fetcht oder klont zwei Repositories oder spiegelt jeden Branch und Tag von einer Quelle zu einem Ziel.
- Authentifiziert sich je nach Remote mit SSH-Schlüsseln, Access-Tokens oder Passwörtern.
- Läuft einmalig oder nach einem cron-artigen Zeitplan, ausgeliefert als Multi-Architektur-Container.

### Warum es wichtig ist

Einen Spiegel von Hand aktuell zu halten, hält nie lange. Als Container mit Zeitplan verpackt bleibt er synchron, ohne dass sich jemand darum kümmern muss.
