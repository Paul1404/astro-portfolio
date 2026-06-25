---
title: "Sigil"
publishDate: 2026-05-31 00:00:00
description: "A self-hosted DMARC report viewer that ingests aggregate reports from an IMAP mailbox and shows you what is happening with your email authentication."
stack:
  - FastAPI
  - React
  - Docker
tags:
  - Email
  - Security
  - Self-Hosted
repoUrl: https://github.com/Paul1404/Sigil
featured: true
icon: shield-check
---

DMARC reports are XML files that pile up in a mailbox and are basically unreadable by hand. They are also the only way to see who is sending mail as your domain. Sigil turns that noise into something you can actually act on.

### What it does

- Connects to an IMAP mailbox, pulls aggregate DMARC and TLS-RPT reports, and parses them.
- Shows pass and fail trends so you can spot spoofing and misconfigured senders.
- Runs DNS health checks across MX, SPF, DKIM, DANE and MTA-STS.

### Why it matters

Email authentication is easy to set up wrong and hard to verify. Sigil gives a self-hosted, private view into whether your domain is actually protected.
