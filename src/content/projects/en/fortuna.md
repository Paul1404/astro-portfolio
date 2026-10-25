---
title: "Fortuna"
publishDate: 2026-09-30 00:00:00
description: "I use Fortuna to manage my own finances: accounts, cashflow, contracts, assets, and net worth in one workspace."
stack:
  - TypeScript
  - TanStack Start
  - PostgreSQL
  - Bun
  - oRPC
tags:
  - Finance
  - Integrations
  - Public Source
repoUrl: https://github.com/Paul1404/fortuna
featured: true
featuredOrder: 1
icon: wallet
screenshot:
  image: fortuna
  alt: "Fortuna finance desk with accounts and net worth"
---

I built Fortuna for my own finances and use it myself. Accounts, transactions, subscriptions, contracts, assets, debts, and investments feed a shared view of cashflow and net worth.

### What it does

- Imports transactions through CSV or authorized bank connections, with a central write path for deduplication, categorization, transfers, and balances.
- Tracks recurring costs, encrypted contract documents, asset valuations, and changes in net worth over time.
- Provides a Copilot and scoped MCP access through the same validated services, with external actions kept behind separate authorization boundaries.

### Engineering

A TanStack Start application with typed oRPC procedures, PostgreSQL, and Drizzle. Monetary amounts use integer minor units and explicit currencies. Provider credentials and documents are encrypted; authentication is limited to the owner.

### Source and access

The source is public and all rights are reserved. This is a private application, not a public financial service. The repository screenshots use fictional demonstration data.
