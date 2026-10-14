---
title: "Sigil"
publishDate: 2026-05-31 00:00:00
description: "A mail-security dashboard that ingests DMARC and TLS reports, groups sending sources, and checks email-authentication DNS records."
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

Sigil turns report attachments in an IMAP mailbox into a view of how a domain's mail is authenticated. Sending sources, alignment failures, and TLS delivery problems can be reviewed together.

### What it does

- Ingests compressed XML and JSON attachments for DMARC aggregate reports and SMTP TLS reports.
- Shows pass rates, timelines, sending sources, and domain summaries to help distinguish spoofing from legitimate configuration problems.
- Checks MX, SPF, DKIM, DMARC, TLSA/DANE, MTA-STS, and TLS Reporting records.

### Engineering

A FastAPI and PostgreSQL backend with a React frontend, packaged into one Docker image. Background polling handles ingestion, IMAP passwords are encrypted at rest, and migrations run on startup.

### Source and access

MIT licensed and self-hosted. Repository screenshots render synthetic report fixtures; they do not expose mailbox contents or real sender data.
