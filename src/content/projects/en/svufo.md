---
title: "Cash Count Protocols"
publishDate: 2026-05-12 00:00:00
description: "A web app for a club treasurer to record cash counts and expenses, then generate numbered, GoBD-compliant PDF receipts ready to upload into DATEV."
stack:
  - TypeScript
  - Next.js
  - PostgreSQL
  - Hono
tags:
  - Finance
  - Forms
  - Open Source
repoUrl: https://github.com/Paul1404/svufo
liveUrl: https://svufo.sv-untereuerheim.de
status: shipped
icon: banknote
---

Counting the till into a spreadsheet works until you need a record that holds up to an audit. This replaces the spreadsheet with a guided form that produces proper receipts, numbered gaplessly per year, ready for the accountant.

### What it does

- Records the count across all 15 denominations and logs expenses with VAT rates of 0, 7, or 19 percent, or a custom rate.
- Numbers each receipt per year and generates a PDF with a SHA256 checksum over the data.
- Keeps corrections compliant through a storno workflow: the original stays immutable and the cancellation is filed separately with a watermark. Exports CSV for the accountant.

### Why it matters

The club gets records built to satisfy GoBD retention rules instead of a spreadsheet nobody fully trusts, and the output uploads straight into DATEV Unternehmen Online, so the bookkeeping step stays short.
