---
title: "Kataster"
publishDate: 2026-09-30 00:00:00
description: "Selbst im Einsatz für meine Infrastruktur: Ressourcen und Verantwortliche mit Monitoring, Providerkosten, Verträgen und Rechnungsvorbereitung verbinden."
stack:
  - TypeScript
  - TanStack Start
  - PostgreSQL
  - BullMQ
  - Redis
  - Bun
tags:
  - Infrastructure
  - Billing
  - Open Source
repoUrl: https://github.com/Paul1404/kataster
featured: true
featuredOrder: 3
icon: network
screenshot:
  image: kataster
  alt: "Kataster: Abrechnung mit Kundenkosten, Preisen und Marge"
---

Ich nutze Kataster selbst für den Betrieb meiner Infrastruktur. Das Register verbindet die vorhandenen Ressourcen mit Verantwortlichen, Kosten und Abrechnungsreife. Domains, DNS, Mail, Hosts, Container, Cloud-Projekte und Zertifikate stehen in einer gemeinsamen Übersicht.

### Was es macht

- Erkennt Ressourcen und ihren Zustand über Konnektoren für AWS, SSM, Mailcow, Hetzner, Railway, WordPress, Checkmk und HTTP.
- Hält Verantwortungswechsel und den Lebenszyklus von Ressourcen fest, auch wenn Infrastruktur außer Betrieb genommen wird.
- Verteilt Providerkosten, vergleicht Kundenentgelte und Margen, prüft die Abrechnungsreife und erstellt unveränderliche Rechnungssnapshots.

### Technische Umsetzung

TanStack Start und PostgreSQL bilden Anwendung und Inventar ab. Ein BullMQ-Worker mit Redis übernimmt geplante Prüfungen und Synchronisation. Zugangsdaten der Konnektoren sind verschlüsselt; MCP-Zugriff ist standardmäßig nur lesend.

### Quellcode und Zugang

MIT-lizenziert. Die privaten Installationen richten sich an vertrauenswürdige Betreiber einer Organisation. Das öffentliche Repository enthält reproduzierbare Screenshots mit fiktiven Kunden und Kosten.
