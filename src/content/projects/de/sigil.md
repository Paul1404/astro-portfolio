---
title: "Sigil"
publishDate: 2026-05-31 00:00:00
description: "Ein Dashboard für E-Mail-Sicherheit, das DMARC- und TLS-Berichte einliest, Absenderquellen bündelt und DNS-Einträge zur Authentifizierung prüft."
stack:
  - FastAPI
  - React
  - PostgreSQL
  - Docker
tags:
  - Email
  - Security
  - Open Source
repoUrl: https://github.com/Paul1404/Sigil
featured: true
featuredOrder: 5
icon: shield-check
---

Sigil macht aus Berichtsanhängen in einem IMAP-Postfach eine Übersicht über die Authentifizierung einer Maildomain. Absenderquellen, Alignment-Fehler und Probleme bei der TLS-Zustellung lassen sich gemeinsam prüfen.

### Was es macht

- Liest komprimierte XML- und JSON-Anhänge mit aggregierten DMARC-Berichten und SMTP-TLS-Berichten ein.
- Zeigt Erfolgsquoten, Zeitverläufe, Absenderquellen und Domainübersichten, um Spoofing von legitimen Konfigurationsproblemen zu unterscheiden.
- Prüft MX, SPF, DKIM, DMARC, TLSA/DANE, MTA-STS und TLS-Reporting-Einträge.

### Technische Umsetzung

Ein FastAPI-Backend mit PostgreSQL und eine React-Oberfläche werden in einem Docker-Image ausgeliefert. Hintergrundabfragen übernehmen den Import, IMAP-Passwörter sind verschlüsselt gespeichert und Migrationen laufen beim Start.

### Quellcode und Zugang

MIT-lizenziert und selbst gehostet. Die Repository-Screenshots verwenden synthetische Berichte und zeigen weder Postfachinhalte noch echte Absenderdaten.
