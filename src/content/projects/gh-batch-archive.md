---
title: "GitHub Batch Archive"
publishDate: 2026-03-25 00:00:00
img: /assets/gh-batch-archive.png
img_alt: gh-batch-archive terminal screenshot
description: "Batch archive or unarchive multiple GitHub repositories from the terminal, with dry-run, confirmation and logging."
stack:
  - Bash
  - GitHub CLI
tags:
  - GitHub
  - CLI
  - Open Source
repoUrl: https://github.com/Paul1404/gh-batch-archive
status: shipped
icon: archive
---

Archiving repositories one by one in the GitHub UI is tedious, and there is no undo button you trust. This wraps the GitHub CLI in a safe, interactive batch tool.

### What it does

- Lets you interactively select repositories and archive or unarchive them in bulk.
- Supports a dry run so you can see exactly what will change before anything happens.
- Confirms destructive actions and logs what it did.

### Why it matters

Cleaning up a crowded GitHub account becomes a two minute job instead of an afternoon of clicking, without the fear of touching the wrong repo.
