---
title: "Serienbrief - Mail-Merge Letters with QR Codes for Sports Clubs"
publishDate: 2026-04-12
img: /assets/letter.jpg
img_alt: Serienbrief app banner showing envelope and QR code icons with TypeScript, Hono, Postgres, and pdf-lib tech badges
description: |
  Club member data is always a mess. This app generates personalized DIN A4 letters with QR codes, lets members correct their own data through a self-service portal, and gives admins a dashboard to track who responded. Built with Node.js, Hono, TypeScript, and Postgres.
tags:
  - TypeScript
  - Node.js
  - Postgres
  - Hono
  - PDF
  - QR Codes
  - Open Source
---

## The Problem

If you run a sports club (Sportverein), you know the drill: member records are outdated. Wrong addresses, old phone numbers, missing email addresses. And when you can't reach people digitally, your only option is paper mail.

Updating hundreds of member records manually? Nobody has time for that. So I built a tool that flips the process - instead of chasing members, let them fix their own data.

**[View on GitHub](https://github.com/Paul1404/svu-serienbrief)**

## How It Works

The workflow is straightforward:

1. **Import** your MySQL dump from Linear Vereinsverwaltung (or similar) - upload the `.sql` file in the admin UI, the app handles conversion automatically.
2. **Select members** in the dashboard, hit generate, get a ZIP full of DIN A4 PDFs. Each letter contains a personalized QR code.
3. **Print and mail** the letters.
4. **Members scan** the QR code, see their current data pre-filled in a web form, and correct whatever is wrong (address, phone, email, IBAN, ...).
5. **Check the dashboard** to see who responded, what changed, and who still hasn't opened their link.

It's designed as a one-shot campaign tool: send letters out, collect corrections, get your data in order. Members don't need accounts or passwords - just a signed link that expires after 90 days.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js |
| Framework | Hono |
| Language | TypeScript |
| Database | PostgreSQL |
| PDF Generation | pdf-lib |
| QR Codes | uqr |
| ZIP Compression | fflate |

## Key Features

### Admin Dashboard
- Upload SQL dumps from existing club management software
- Select which members receive letters
- Bulk-generate personalized PDFs as a downloadable ZIP
- Track who opened their link, who submitted corrections, and who hasn't responded
- Full change history with audit trail

### Member Self-Service Portal
- No registration, no passwords - just scan the QR code
- Pre-filled form with current data on file
- Server-side validation for email, IBAN checksum, PLZ format, and more
- HMAC-SHA256 signed tokens, valid for 90 days

### Security
- Sessions stored in Postgres with 8h expiry (30min idle timeout)
- Rate limiting: 1s delay on failed logins, max 5 sessions per IP
- All access and changes logged for GDPR compliance
- Token-based member access with cryptographic signing

## Deployment

The app runs anywhere Node.js and Postgres are available - Railway, Fly.io, Render, a VPS, or just your laptop.

```bash
npm install
npm run build
npm start
# http://localhost:3000
```

A `Dockerfile` and `railway.json` are included for one-click Railway deploys.

Only two environment variables are required:

| Variable | What it is |
|----------|------------|
| `DATABASE_URL` | Postgres connection string |
| `ADMIN_PASSWORD` | Password for the admin dashboard |

Optional variables let you customize branding (club name, logo, address, legal footer) and configure S3-compatible storage for logo caching and ZIP archival.

## Who This Is For

This isn't just for my club. Any German Verein (association) using Linear, SEWOBE, or similar management software faces the same problem: outdated member records with no efficient way to update them.

The app is MIT-licensed and designed to be self-hosted. Fork it, customize the letter template, point it at your Postgres instance, and you're ready to go.

## Development Notes

- **pdf-lib** is excellent for programmatic PDF generation - no headless browser needed, pure JavaScript.
- HMAC-signed tokens are a clean alternative to one-time passwords for low-friction member authentication.
- Keeping the scope tight (one-shot campaign, not a full CRM) made the project actually shippable.
- Hono proved to be a fast and lightweight alternative to Express for this kind of server-rendered app.

## Links

- **Source Code:** [github.com/Paul1404/svu-serienbrief](https://github.com/Paul1404/svu-serienbrief)
- **License:** MIT
- **Stack:** TypeScript, Node.js, Hono, PostgreSQL, pdf-lib, uqr, fflate
