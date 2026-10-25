---
title: "Kataster"
publishDate: 2026-09-30 00:00:00
description: "I use Kataster to manage my infrastructure, connecting resources and owners with monitoring, provider costs, contracts, and billing preparation."
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
  alt: "Kataster billing view with customer costs, prices and margin"
---

I use Kataster for my own infrastructure operations. It connects what exists with who owns it, what it costs, and whether it is ready to be billed. Domains, DNS, mail, hosts, containers, cloud projects, and certificates share one register.

### What it does

- Discovers resources and health information through AWS, SSM, Mailcow, Hetzner, Railway, WordPress, Checkmk, and HTTP connectors.
- Keeps ownership changes and resource lifecycles on record, including infrastructure that has been decommissioned.
- Allocates provider costs, compares customer charges and margins, checks billing readiness, and creates fixed invoice snapshots.

### Engineering

TanStack Start and PostgreSQL hold the application and inventory; a BullMQ worker on Redis handles scheduled checks and synchronization. Connector credentials are encrypted, and MCP access is read-only by default.

### Source and access

MIT licensed. Deployments are private and intended for trusted operators in one organization. The public repository includes reproducible screenshots with fictional customers and costs.
