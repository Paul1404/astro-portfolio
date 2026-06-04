---
title: "Cash Count Protocols"
publishDate: 2026-05-12 00:00:00
description: "A web app for clubs to record cash counts and expenses, then generate numbered PDF receipts that drop straight into DATEV accounting."
stack:
  - TypeScript
  - Next.js
  - PostgreSQL
tags:
  - Finance
  - Forms
  - Open Source
repoUrl: https://github.com/Paul1404/svufo
status: shipped
icon: banknote
---

Counting the till and logging expenses in a spreadsheet works until you need a clean, auditable record. This replaces the spreadsheet with a guided form that produces proper receipts ready for the accountant.

### What it does

- Records cash counts across denominations and logs expenses with configurable VAT rates.
- Numbers receipts automatically by year and generates PDFs with a SHA256 checksum.
- Keeps corrections auditable through a storno workflow that preserves the original record, and exports CSV for the accountant.

### Why it matters

The club gets records that hold up to scrutiny instead of a spreadsheet nobody fully trusts. The output is built to upload straight into DATEV, so the bookkeeping step stays short.
