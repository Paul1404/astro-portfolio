---
title: "Fortuna"
publishDate: 2026-09-30 00:00:00
description: "Für meine eigenen Finanzen gebaut und selbst im Einsatz: Konten, Cashflow, Verträge, Vermögenswerte und Nettovermögen in einer Anwendung."
stack:
  - TypeScript
  - TanStack Start
  - PostgreSQL
  - Bun
  - oRPC
tags:
  - Finance
  - Integrations
  - Public Source
repoUrl: https://github.com/Paul1404/fortuna
featured: true
featuredOrder: 1
icon: wallet
screenshot:
  image: fortuna
  alt: "Fortuna: Finanzübersicht mit Konten und Nettovermögen"
---

Ich habe Fortuna für meine eigenen Finanzen gebaut und nutze es selbst. Konten, Buchungen, Abonnements, Verträge, Vermögenswerte, Schulden und Anlagen bilden eine gemeinsame Sicht auf Cashflow und Nettovermögen.

### Was es macht

- Importiert Buchungen per CSV oder autorisierter Bankverbindung. Ein zentraler Schreibpfad übernimmt Duplikaterkennung, Kategorisierung, Umbuchungen und Salden.
- Verfolgt laufende Kosten, verschlüsselte Vertragsunterlagen, Bewertungen von Vermögenswerten und die Entwicklung des Nettovermögens.
- Bietet einen Copilot und begrenzten MCP-Zugriff über dieselben validierten Dienste. Externe Aktionen behalten eigene Freigabegrenzen.

### Technische Umsetzung

Eine TanStack-Start-Anwendung mit typisierten oRPC-Prozeduren, PostgreSQL und Drizzle. Geldbeträge werden in ganzzahligen Untereinheiten und mit expliziter Währung gespeichert. Zugangsdaten und Dokumente sind verschlüsselt; die Anmeldung ist auf den Eigentümer begrenzt.

### Quellcode und Zugang

Der Quellcode ist öffentlich einsehbar; alle Rechte bleiben vorbehalten. Fortuna ist eine private Anwendung und kein öffentlicher Finanzdienst. Die Screenshots im Repository verwenden fiktive Beispieldaten.
