---
title: "NSX-T Automation Toolkit"
publishDate: 2025-06-25 00:00:00
description: "Ein interaktives Toolkit zur Verwaltung von VMware NSX-T über seine REST API, plus eine gehärtete SFTP-Einrichtung für NSX-Backups."
stack:
  - Python
  - Shell
  - REST API
tags:
  - VMware
  - NSX-T
  - Automatisierung
repoUrl: https://github.com/Paul1404/nsx-api.sh
status: shipped
icon: network
---

NSX-T hat eine leistungsfähige REST API, sie manuell zu bedienen ist jedoch langsam. Die Backup-Einrichtung rundherum ist zudem leicht unsicher konfigurierbar. Dieses Projekt besteht aus zwei Tools, die NSX-T-Operationen wiederholbar und sicher machen.

### Was es macht

- Ein modulares, interaktives Toolkit zur Verwaltung von NSX-T über seine REST API, einschließlich Zertifikat-Workflows.
- Ein Begleitskript, das einen sicheren, gechrooteten SFTP-Benutzer für NSX-Backups auf RHEL 9 und neuer einrichtet.
- Sinnvolle Standardwerte, sodass gängige Operationen kein Auswendiglernen roher API-Aufrufe erfordern.

### Warum es wichtig ist

Enterprise-Netzwerk-Automatisierung, die repetitive, fehleranfällige Konsolenarbeit in skriptbasierte, nachvollziehbare Schritte verwandelt.
