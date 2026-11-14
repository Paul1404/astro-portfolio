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
icon: trophy
screenshot:
  image: svutt
  alt: "SV Untereuerheim club crest used by the tournament application"
  caption: "Club crest used by the tournament application."
---

I built this tournament manager for a table tennis club. Organizers enter participants and results in the browser; players and spectators follow the schedule, standings and knockout brackets in a public live view.

### Tournament flow

- Generates the draw and supports several formats per division: groups with knockout, round robin, round robin with finals, pure knockout, or a Swiss system.
- Validates results set by set against the rules, distributes matches across parallel tables, and numbers every game.
- Updates the mobile spectator view through server-sent events. A QR code links directly to the tournament.

### Engineering

The tournament logic lives in a separate, dependency-free engine. Results are entered once and then appear in the public standings and brackets. Other clubs can adapt the project with their own name and logo.
