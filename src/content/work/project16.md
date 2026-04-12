---
title: "BFV Team Match Exporter - Automated Football Schedule Publishing"
publishDate: "2026-04-12 00:00:00"
img: /assets/bfv.jpg
img_alt: BFV Match Exporter banner showing football and data export concepts
description: |
  An automated TypeScript tool that fetches match data from the Bayerischer Fussball-Verband (BFV) API and exports it as CSV, XLSX, and ICS calendar files. Fully automated via GitHub Actions with nightly exports published to GitHub Pages - useful for any football club that needs to share schedules with players, coaches, and supporters.
tags:
  - TypeScript
  - API
  - GitHub Actions
  - Automation
  - Open Source
---

---

## Why This Project?

Managing football match schedules across a club is surprisingly painful. Coaches want spreadsheets, players want calendar entries, and the club website needs a download page. Meanwhile, the official BFV portal only offers a web view - no easy way to get structured data out.

This tool solves that by pulling match data directly from the BFV API and publishing it in every format people actually use.

> **Source code:** [github.com/Paul1404/bfv-api](https://github.com/Paul1404/bfv-api)
> **Live exports:** [sg-spielplan.untereuerheim.com](https://sg-spielplan.untereuerheim.com/)

---

## What It Does

The **BFV Team Match Exporter** is a TypeScript application that:

- Fetches all matches for one or more BFV teams via the `bfv-api-js` client
- Exports each team's schedule as **CSV** (UTF-8 with BOM for Excel compatibility) and **XLSX** (styled headers, zebra-striped rows, auto-fitted columns)
- Generates **ICS calendar files** for direct import into Google Calendar, Outlook, or Apple Calendar
- Creates a **Jira-compatible CSV** with hierarchical task structures (matches grouped under monthly parent tasks)
- Produces a **combined export** across all configured teams
- Generates a modern, responsive **index.html** download page with dark theme, club branding, and auto-refresh

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Language | TypeScript |
| Runtime | Node.js |
| Package Manager | pnpm |
| HTTP Client | Axios |
| BFV Data | `bfv-api` client library |
| Excel Output | ExcelJS |
| Calendar Output | `ics` |
| CSV Output | `json2csv` |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |

---

## Automation Pipeline

The entire workflow is hands-off once configured:

```yaml
# Runs on push, manual trigger, or nightly at 2:00 AM UTC
on:
  push:
    branches: [main]
  workflow_dispatch:
  schedule:
    - cron: '0 2 * * *'
```

**Pipeline steps:**
1. Build the TypeScript project
2. Run the exporter against all configured teams
3. Generate timestamped CSV, XLSX, and ICS files
4. Create the download index page
5. Publish everything to GitHub Pages

No `gh-pages` branch needed - the Actions workflow handles deployment directly.

---

## Export Output

Each run produces per-team and combined files:

- `Spiele_<Teamname>_<timestamp>.csv` - Excel-compatible CSV with German column names
- `Spiele_<Teamname>_<timestamp>.xlsx` - Styled Excel workbook
- `Spiele_Alle_Teams_<timestamp>.csv` - Combined CSV for all teams
- `Spiele_Alle_Teams_<timestamp>.xlsx` - Combined Excel workbook
- ICS calendar files for calendar app import
- `index.html` - Responsive download page with file sizes and last-update timestamps

All files handle German special characters (umlauts) correctly and use proper locale-aware date formatting.

---

## Adding Your Own Teams

Customization is straightforward - edit the `TEAMS` array in `src/index.ts`:

```typescript
const TEAMS = [
  { id: "your-team-id", name: "Your Team Name" },
  { id: "another-team-id", name: "Another Team" },
];
```

Team IDs can be found in the BFV portal URL when viewing a team's page.

---

## Key Design Decisions

- **ExcelJS over SheetJS** - No vulnerable dependencies; `exceljs` is used exclusively for writing, avoiding the known security issues in older SheetJS/xlsx packages
- **UTF-8 BOM in CSV** - Ensures Excel opens CSV files with correct umlaut rendering without manual encoding selection
- **Timestamp in filenames** - Every export is uniquely named, providing a full history of schedule snapshots
- **No user input processing** - The tool only reads from the BFV API; no injection surface exists

---

## Who Is This For?

- **Football clubs** in Bavaria who want automated schedule distribution
- **Team managers** who need match data in spreadsheet format
- **Developers** looking to build on BFV API data for their own tools
- **Anyone** who wants a reference implementation of a GitHub Actions-powered data export pipeline

---

## Get Started

```bash
git clone https://github.com/Paul1404/bfv-api.git
cd bfv-api
pnpm install
pnpm tsc
node dist/index.js
```

Fork the repo, add your team IDs, and let GitHub Actions handle the rest. Your schedules will be live on GitHub Pages within minutes.
