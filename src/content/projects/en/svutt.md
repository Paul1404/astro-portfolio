---
title: "Table Tennis Tournaments"
publishDate: 2026-05-18 00:00:00
description: "A browser-based tournament manager for a table tennis club. Handles draws, group tables, knockout brackets, scheduling, and a live public view for spectators."
stack:
  - TypeScript
  - Next.js
  - PostgreSQL
tags:
  - Sports Club
  - Tournaments
  - Open Source
repoUrl: https://github.com/Paul1404/svutt
liveUrl: https://svutt.sv-untereuerheim.de
featured: true
status: shipped
icon: trophy
---

Running a table tennis tournament on paper means redrawing brackets by hand, copying results between sheets, and crowding spectators around a single printout. This replaces all of that with one system the organizer drives from a dashboard.

### What it does

- Generates draws and supports several formats: groups with knockout, round robin, pure knockout, or Swiss system.
- Tracks per-set results with validation, assigns matches to tables, and builds the schedule.
- Gives spectators a live public view that refreshes on its own, reachable by scanning a QR code.

### Why it matters

The organizer stops being a bottleneck. Results go in once and everyone, players and spectators alike, sees the same up-to-date bracket. Any club can fork it and drop in their own logo.
