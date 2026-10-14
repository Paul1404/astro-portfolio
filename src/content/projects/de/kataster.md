---
title: "Kataster"
publishDate: 2026-09-30 00:00:00
description: "Ein Infrastrukturregister, das Erkennung, Verantwortliche, Monitoring, Providerkosten, Verträge und Rechnungsvorbereitung verbindet."
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
---

Kataster verbindet zwei Fragen: Welche Infrastruktur gibt es, und wem gehört sie, was kostet sie und kann sie abgerechnet werden? Domains, DNS, Mail, Hosts, Container, Cloud-Projekte und Zertifikate stehen in einem gemeinsamen Register.

### Was es macht

- Erkennt Ressourcen und ihren Zustand über Konnektoren für AWS, SSM, Mailcow, Hetzner, Railway, WordPress, Checkmk und HTTP.
- Hält Verantwortungswechsel und den Lebenszyklus von Ressourcen fest, auch wenn Infrastruktur außer Betrieb genommen wird.
- Verteilt Providerkosten, vergleicht Kundenentgelte und Margen, prüft die Abrechnungsreife und erstellt unveränderliche Rechnungssnapshots.

### Technische Umsetzung

TanStack Start und PostgreSQL bilden Anwendung und Inventar ab. Ein BullMQ-Worker mit Redis übernimmt geplante Prüfungen und Synchronisation. Zugangsdaten der Konnektoren sind verschlüsselt; MCP-Zugriff ist standardmäßig nur lesend.

### Quellcode und Zugang

MIT-lizenziert. Die privaten Installationen richten sich an vertrauenswürdige Betreiber einer Organisation. Das öffentliche Repository enthält reproduzierbare Screenshots mit fiktiven Kunden und Kosten.
