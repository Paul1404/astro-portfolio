---
title: "Kontor2"
publishDate: 2026-05-24 00:00:00
description: "Eine mandantenfähige Vereinsverwaltung mit Mitgliedern, Familien, SEPA-Abrechnung, Rechnungen, Rundschreiben, Selbstverwaltung und Änderungshistorie."
stack:
  - TypeScript
  - TanStack Start
  - PostgreSQL
  - Bun
  - S3
tags:
  - Club Management
  - Data Protection
  - Multi-Tenant
repoUrl: https://github.com/Paul1404/kontor2
liveUrl: https://kontor2.com
featured: true
featuredOrder: 2
icon: building-2
screenshot:
  image: kontor2
  alt: "Kontor2: Mitgliederverzeichnis mit Filtern und Mitgliedsstatus"
---

Kontor2 begann mit der Migration einer bestehenden Vereinsdatenbank und wuchs zu einer vollständigen Verwaltung. Historische Mitglieder, Verträge, Mandate und Abrechnungsläufe bleiben neben der aktuellen Verwaltung verfügbar.

### Was es macht

- Verwaltet Mitglieder, Familien, Beiträge, SEPA-Lastschriften, Rückläufer, Rechnungen, Mahnungen, Ehrungen und Rundschreiben.
- Gibt Mitgliedern ein Selbstverwaltungsportal und legt vorgeschlagene Änderungen dem Vorstand zur Prüfung vor.
- Unterstützt Dokumentenabläufe, Datenqualitätsprüfungen, Datenschutzanfragen, Snapshots und die Wiederherstellung einzelner Felder.

### Technische Umsetzung

Jeder Verein erhält eine eigene Datenbank, einen eigenen Schlüsselbund und eigenes Branding, aufgelöst über den Hostnamen der Anfrage. Typisierte APIs verbinden Oberfläche und Fachlogik. Verschlüsselte Bankdaten, ein fortlaufendes Einwilligungsprotokoll und durchsuchbare Änderungshistorien gehören zum Datenmodell. Ein rollenbegrenzter MCP-Endpunkt stellt ausgewählte Abläufe für Assistenten bereit.

### Quellcode und Zugang

Der Quellcode ist öffentlich einsehbar und proprietär lizenziert. Deployment und Nutzung benötigen die schriftliche Erlaubnis des Eigentümers.
