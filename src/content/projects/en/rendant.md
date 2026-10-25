---
title: "Rendant"
publishDate: 2026-05-07 00:00:00
description: "Club finance administration in use at a club with annual turnover in the low six figures in euros, linking cash counts, receipts, tax analysis, and historical revenue."
stack:
  - TypeScript
  - TanStack Start
  - PostgreSQL
  - Bun
  - S3
tags:
  - Club Finance
  - Auditability
  - Public Source
repoUrl: https://github.com/Paul1404/rendant
liveUrl: https://rendant.sv-untereuerheim.de
featured: true
featuredOrder: 4
icon: receipt-euro
screenshot:
  image: rendant
  alt: "Rendant cash records and annual revenue chart"
---

Rendant is used for the finances of a club with annual turnover in the low six figures in euros. It connects event cash counts, card payments, expenses, tax allocations, and historical revenue with the records needed for bookkeeping.

### What it does

- Calculates cash totals from coin and note counts, opening balances, card payments, and expenses.
- Produces numbered PDF receipts with SHA-256 checksums, and preserves the original record when a cancellation creates a separate correction receipt.
- Combines current protocols with historical spreadsheet imports for comparisons across years, VAT analysis, and PDF or CSV handover.

### Engineering

The TanStack Start application uses PostgreSQL transactions for numbering and financial changes, with receipts stored in S3-compatible storage. An append-only audit log records relevant changes; role-limited workflows separate routine capture from administrative imports and settings.

### Source and access

Public source under a proprietary license. Use requires a separate written agreement. Repository screenshots use synthetic cash records and amounts.
