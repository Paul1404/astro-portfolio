---
title: "Sigil — Self-Hosted DMARC Report Viewer & Email Authentication Dashboard 🛡️"
publishDate: 2025-12-15 00:00:00
img: /assets/dmarc.png
img_alt: Sigil DMARC report viewer banner
description: |
  A self-hosted dashboard that connects to your IMAP mailbox, automatically ingests DMARC aggregate and TLS-RPT reports, and gives you a clear picture of your domain's email authentication health — pass rates, timelines, top senders, and full DNS health checks.
tags:
  - DMARC
  - Email
  - FastAPI
  - React
  - Docker
  - Security
  - Self-Hosted
---

---

## Why This Project?

If you run your own mail infrastructure, you've probably set up a DMARC record with a `rua=` address and called it a day. Reports trickle in as XML attachments — gzipped, zipped, buried in your inbox. Most postmasters either ignore them entirely or rely on third-party SaaS tools that want monthly fees for what should be a straightforward parsing job.

**Sigil** fixes that. One container, your own data, full visibility.

---

## What Sigil Does 🎯

Sigil connects to any IMAP mailbox, pulls DMARC (RUA) and TLS-RPT report emails, parses the attachments, and stores everything in PostgreSQL. The React frontend then gives you:

- **Dashboard** — aggregate pass/fail rates, timelines, top senders, domain overview
- **Report browser** — every DMARC aggregate report parsed and searchable, filterable by domain and date
- **TLS-RPT support** — RFC 8460 TLS report ingestion and per-domain summaries
- **DNS health checks** — MX, DMARC, SPF, DKIM, TLSA/DANE, MTA-STS, and TLS Reporting record validation with actionable warnings
- **Detected domains** — domains from your reports appear on the DNS page for one-click health checks
- **Background fetch** — automatic IMAP polling on a configurable interval (default: every 6 hours)
- **Encryption at rest** — IMAP passwords encrypted with Fernet

---

## Architecture

| Component | Technology |
|-----------|------------|
| Backend | FastAPI, SQLAlchemy (async), Alembic |
| Frontend | React 19, Vite, Tailwind CSS v4, Recharts |
| Database | PostgreSQL |
| Scheduler | APScheduler for background IMAP polling |
| DNS | dnspython for MX/SPF/DKIM/DMARC/DANE checks |
| Container | Multi-stage Docker build (Node + Python) |

```
IMAP Mailbox ──► Sigil Backend ──► PostgreSQL
                    │                  │
                    ▼                  ▼
              DNS Resolver       React Dashboard
              (dnspython)        (Vite + Recharts)
```

---

## Quick Start

Sigil ships as a single Docker Compose stack — no need to clone the repo:

```bash
# Download compose file and example env
curl -LO https://raw.githubusercontent.com/Paul1404/Sigil/main/docker-compose.yml
curl -LO https://raw.githubusercontent.com/Paul1404/Sigil/main/.env.example

# Create .env and generate secrets
cp .env.example .env
python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
python3 -c "import secrets; print(secrets.token_urlsafe(32))"

# Start everything
docker compose up -d
```

Open `http://localhost:8000`, log in, add your IMAP mailbox under Settings, and Sigil starts pulling reports immediately.

---

## DNS Health Checks

One of Sigil's most useful features for postmasters: the DNS health check page validates all email-related DNS records for any domain:

- **MX** — mail exchanger records
- **DMARC** — policy, reporting, alignment settings
- **SPF** — sender policy framework evaluation
- **DKIM** — DomainKeys selector lookup
- **TLSA/DANE** — DANE TLSA records for transport security
- **MTA-STS** — MTA Strict Transport Security policy
- **TLS Reporting** — `_smtp._tls` TXT record for TLS-RPT

Domains that appear in your ingested reports are automatically detected and listed for one-click checks — no manual entry needed.

---

## Key Design Decisions

- **Single-container deploy** — the Docker image bundles the built frontend, runs migrations on startup, and includes the background scheduler. No sidecar containers needed beyond PostgreSQL.
- **Encryption at rest** — IMAP passwords are Fernet-encrypted in the database, not stored in plain text.
- **Standards-first parsing** — full RFC 7489 (DMARC aggregate) and RFC 8460 (TLS-RPT) parsers handle `.xml`, `.xml.gz`, `.zip`, `.json`, and `.json.gz` attachments.
- **External DB support** — bring your own PostgreSQL by setting `DATABASE_URL` and removing the bundled container.

---

## Lessons Learned 💡

- DMARC XML reports vary wildly between providers — Google, Microsoft, Yahoo, and smaller senders all have quirks in their XML structure that the parser needs to handle gracefully.
- Async SQLAlchemy with FastAPI requires careful session management to avoid connection pool exhaustion during bulk report ingestion.
- Background IMAP fetching with APScheduler needs proper error handling — flaky IMAP connections shouldn't crash the scheduler.
- Fernet encryption adds minimal overhead but dramatically improves the security posture for stored credentials.

---

## Outcome

Sigil gives postmasters and email administrators exactly what they need: **full visibility into DMARC compliance and email authentication health**, self-hosted, without subscriptions or third-party data sharing.

Deploy it alongside your mail stack, point it at your RUA mailbox, and finally make use of those aggregate reports that have been piling up.

👉 [Check out Sigil on GitHub](https://github.com/Paul1404/Sigil)
