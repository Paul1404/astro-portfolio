---
title: "Table Tennis Tournaments"
publishDate: 2026-05-18 00:00:00
description: "A browser-based tournament manager built for a table tennis club. Turns a participant list into draws, group tables, knockout brackets, a schedule across tables, and a live public view spectators reach by QR code."
stack:
  - TypeScript
  - Next.js
  - PostgreSQL
  - Hono
tags:
  - Sports Club
  - Tournaments
  - Open Source
repoUrl: https://github.com/Paul1404/svutt
liveUrl: https://svutt.sv-untereuerheim.de
featured: true
icon: trophy
---

Running a table tennis tournament on paper means redrawing brackets by hand, copying results between sheets, and a crowd squinting at one printout to find out who plays at table 3 next. This turns the participant list into everything the day needs, driven from a single admin dashboard.

### What it does

- Generates the draw and supports several formats per division: groups with knockout, round robin, round robin with finals, pure knockout, or a Swiss system.
- Validates results set by set against the rules, distributes matches across parallel tables, and numbers every game.
- Gives spectators a mobile public view that refreshes on its own and updates live over server-sent events, reachable by scanning a QR code.

### Why it matters

The organizer stops being the bottleneck. Results are entered once and everyone, players and spectators alike, sees the same up-to-date standings and bracket. The tournament logic sits in a separate, dependency-free engine, and any club can fork it with their own name and logo.
