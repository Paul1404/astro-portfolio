---
title: "DiaTrack"
publishDate: 2026-06-04 00:00:00
description: "A sensor and catheter tracker with replacement countdowns, email reminders, device history, and failure statistics."
stack:
  - TypeScript
  - TanStack Start
  - PostgreSQL
  - Bun
tags:
  - Device Tracking
  - Reminders
  - Public Source
repoUrl: https://github.com/Paul1404/diatrack
featured: true
featuredOrder: 7
icon: activity
screenshot:
  image: diatrack
  alt: "DiaTrack overview with active sensors, catheters and remaining wear time"
---

DiaTrack keeps the replacement schedule and history of diabetes sensors and catheters in one application. It records when a device was installed, where it was placed, and why its use ended.

### What it does

- Shows countdowns for active devices and sends configurable email reminders before replacement is due.
- Records early failures and their reasons, with searchable, sortable device history.
- Compares lifetimes and failure rates by location and reason, with per-user settings and a mobile-friendly interface.

### Engineering

One TypeScript application on Bun and TanStack Start, with typed oRPC procedures, runtime validation, PostgreSQL, and Drizzle. The German interface uses TanStack Query and Form for server state and device entry.

### Source and access

The source is public, but no software license is specified. Public visibility does not grant reuse rights. Repository screenshots use fictional device records and contain no personal health history.
