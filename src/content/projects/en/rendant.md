---
title: "Rendant"
publishDate: 2026-05-07 00:00:00
description: "An audit-first finance workspace for German clubs, covering cash counts, tax analysis, receipts, historical imports, and year-over-year reporting."
stack:
  - TypeScript
  - TanStack Start
  - PostgreSQL
  - Bun
  - S3
tags:
  - Club Finance
  - Auditability
  - Open Source
repoUrl: https://github.com/Paul1404/rendant
liveUrl: https://rendant.sv-untereuerheim.de
featured: true
icon: receipt-euro
---

Club finances often begin in spreadsheets and end in a handover that nobody can fully reconstruct. Rendant turns that fragile process into one coherent workflow, from counting a cash box to reviewing the final receipt.

### What it does

- Records cash counts, card payments, expenses, VAT allocations, and numbered PDF receipts.
- Combines current records with reviewed historical imports for cross-year comparisons and tax reporting.
- Preserves corrections, cancellations, imports, and administrative changes in an append-only audit trail.

### Why it matters

Financial software should make decisions easier to verify, not hide them behind a polished dashboard. Rendant gives volunteers a practical tool while keeping the original record, its evidence, and every later correction visible.
