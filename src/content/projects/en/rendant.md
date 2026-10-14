---
title: "Rendant"
publishDate: 2026-05-07 00:00:00
description: "Club finance administration linking cash counts, numbered receipts, tax analysis, historical imports, and traceable corrections."
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
---

Rendant connects the cash count at an event with the records needed for bookkeeping and handover. It brings cash movements, card payments, expenses, tax allocations, and historical revenue into one workflow.

### What it does

- Calculates cash totals from coin and note counts, opening balances, card payments, and expenses.
- Produces numbered PDF receipts with SHA-256 checksums, and preserves the original record when a cancellation creates a separate correction receipt.
- Combines current protocols with historical spreadsheet imports for comparisons across years, VAT analysis, and PDF or CSV handover.

### Engineering

The TanStack Start application uses PostgreSQL transactions for numbering and financial changes, with receipts stored in S3-compatible storage. An append-only audit log records relevant changes; role-limited workflows separate routine capture from administrative imports and settings.

### Source and access

Public source under a proprietary license. Use requires a separate written agreement. Repository screenshots use synthetic cash records and amounts.
