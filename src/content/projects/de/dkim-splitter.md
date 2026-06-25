---
title: "DKIM Splitter"
publishDate: 2025-09-07 00:00:00
description: "Lange DKIM-TXT-Records in 255-Zeichen-Blöcke aufteilen, für Route 53 oder jeden DNS-Anbieter, der das TXT-Längenlimit durchsetzt."
stack:
  - Python
  - CLI
tags:
  - E-Mail
  - DNS
  - CLI
repoUrl: https://github.com/Paul1404/dkim-splitter
icon: scissors
---

DKIM-Keys sind länger als ein einzelner DNS-TXT-String sein darf, weshalb sie in Blöcke aufgeteilt werden müssen. Das von Hand zu tun ist umständlich und fehleranfällig. Ein Fehler dabei bricht die Signierung still und leise.

### Was es macht

- Nimmt einen langen DKIM-TXT-Record und teilt ihn in gültige 255-Zeichen-Blöcke auf.
- Erzeugt eine Ausgabe, die man direkt in Route 53 oder jeden anderen Anbieter mit dem gleichen Limit einfügen kann.
- Entfernt einen kleinen, aber fehleranfälligen manuellen Schritt aus der E-Mail-Einrichtung.

### Warum es wichtig ist

Ein einziger kleiner Befehl, der einen der ärgerlichsten Fehler bei der E-Mail-Authentifizierung verhindert.
