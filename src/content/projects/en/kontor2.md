---
title: "Kontor2"
publishDate: 2026-05-24 00:00:00
description: "Club administration in use by a club with around 500 members, covering member records, SEPA billing, invoices, correspondence, and self-service."
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
  alt: "Kontor2 member register with filters and membership status"
---

Kontor2 is used in a club with around 500 members. It supports the ongoing administration alongside historical member records, contracts, mandates, and billing runs.

### What it does

- Manages members, families, contributions, SEPA direct debits, returns, invoices, reminders, honours, and correspondence.
- Gives members a self-service portal while keeping proposed changes in a board review queue.
- Supports document workflows, data-quality checks, privacy requests, snapshots, and field-level restore.

### Engineering

Each club has its own database, encryption keyring, and branding, selected by the request hostname. Typed APIs connect the interface to the domain services; encrypted bank details, an append-only consent log, and searchable audit records are part of the data model. A role-limited MCP endpoint exposes selected workflows to assistants.

### Source and access

The source is public under a proprietary license. Deployment and use require the owner's written permission.
