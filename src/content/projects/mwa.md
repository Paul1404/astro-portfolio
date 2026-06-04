---
title: "Mailcow Web Actions"
publishDate: 2026-06-01 00:00:00
description: "Trigger a Mailcow upgrade on a remote server from the browser and watch the live terminal output stream back."
stack:
  - TypeScript
  - SSH
  - WebSockets
tags:
  - Mailcow
  - Automation
  - Open Source
repoUrl: https://github.com/Paul1404/mwa
status: shipped
icon: terminal
---

Updating Mailcow means SSHing into the box and running the upgrade script by hand. Fine once, annoying often, and easy to put off. This puts the whole flow behind an authenticated web page.

### What it does

- SSHes into the target server and runs the standard Mailcow update sequence.
- Streams the live terminal output back to the browser over an authenticated session, so you see exactly what is happening.
- Removes the need to keep a terminal open just to run a routine update.

### Why it matters

Routine maintenance you can do from anywhere is maintenance that actually gets done.
