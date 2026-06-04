---
title: "Mailcow Cold Standby"
publishDate: 2026-06-03 00:00:00
description: "Automatisches Backup einer mailcow-dockerized-Instanz auf eine Hetzner Storage Box über rsync und SSH."
stack:
  - Shell
  - rsync
  - SSH
tags:
  - Mailcow
  - Backup
  - Open Source
repoUrl: https://github.com/Paul1404/mailcow-cold-standby
status: shipped
icon: database-backup
---

Ein Mailserver ist eines dieser Dinge, bei denen einem ein Backup erst einfällt, wenn der Server weg ist. Dieses Tool hält eine Cold-Standby-Kopie extern vor, damit ein Ausfall nicht bedeutet, dass E-Mails verloren gehen.

### Was es macht

- Sichert eine mailcow-dockerized-Instanz auf eine Hetzner Storage Box per rsync über SSH.
- Läuft unbeaufsichtigt, sodass der Standby aktuell bleibt, ohne manuelle Eingriffe.
- Hält den Transfer effizient, indem nur das übertragen wird, was sich geändert hat.

### Warum es wichtig ist

Günstige, externe, automatisierte Backups für selbst gehostete E-Mail. Genau die Art von Dinge, die langweilig ist, bis zu dem Tag, an dem sie einen rettet.
