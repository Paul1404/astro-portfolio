---
title: "Remise"
publishDate: 2026-09-09 00:00:00
description: "My private eBay selling workspace, from item records and photo review to listing checks, explicit approvals, and marketplace readback."
stack:
  - TypeScript
  - TanStack Start
  - PostgreSQL
  - Bun
  - MCP
tags:
  - Resale
  - eBay
  - Private Application
liveUrl: https://app.remise.pdcd.net
featured: true
featuredOrder: 5
icon: archive
screenshot:
  image: remise
  alt: "Remise inventory register with fictional items, prices, and listing states"
---

I use Remise to manage my own eBay selling work. An item record brings together photos, condition notes, research, listing text, pricing, and the evidence behind each marketplace action.

### What it does

- Takes an item from photos and research to a prepared listing, with reviewed media and structured product details.
- Checks listings, prices, orders, and fees against the marketplace and records the results alongside the item.
- Keeps publishing, price changes, and other marketplace writes behind a preview, explicit approval, and an action ledger with independent readback.

### Engineering

Bun, TypeScript, React, TanStack Start, Router, and Query connect the interface to PostgreSQL and object storage. A hosted MCP interface gives assistants access to the same item records and approval boundaries through OAuth, without putting marketplace credentials into the chat.

### Access

Remise is my private selling application. The sign-in page is public; item records, documents, and marketplace access require authorization. The preview shows the current interface with fictional records, without a live eBay connection.
