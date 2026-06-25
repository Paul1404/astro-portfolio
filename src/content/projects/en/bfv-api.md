---
title: "BFV Match Exporter"
publishDate: 2026-06-02 00:00:00
description: "Automated exporter for Bayerischer Fussball-Verband team fixtures, with CSV, XLSX and calendar output published on a schedule."
stack:
  - TypeScript
  - GitHub Actions
  - pnpm
tags:
  - API
  - Automation
  - Open Source
repoUrl: https://github.com/Paul1404/bfv-api
liveUrl: https://sg-spielplan.untereuerheim.com/
featured: true
icon: calendar-days
---

The Bavarian Football Association publishes fixtures, but not in a format you can actually subscribe to. This pulls the schedule for a team and turns it into files people can use.

### What it does

- Fetches team fixtures from the BFV and exports them as CSV, XLSX and calendar files.
- Runs on a schedule via GitHub Actions and publishes the output to GitHub Pages, so the data stays current with no server to maintain.
- Lets players and supporters add the fixture list straight into their calendar.

### Why it matters

A real club uses this. It replaces manually copying fixtures into spreadsheets with a feed that updates itself.
