---
title: "Railway Deployment Watcher"
publishDate: 2026-06-21 00:00:00
description: "A read-only dashboard that shows deployments across selected Railway workspaces in one place, so you don't have to click through each project."
stack:
  - TypeScript
  - Railway API
  - OAuth
  - PostgreSQL
  - Bun
tags:
  - Cloud
  - Dashboard
  - Open Source
repoUrl: https://github.com/Paul1404/rdw
liveUrl: https://rdw.pdcd.net
icon: radar
---

Railway groups deployments by project, which is fine until you run several services across more than one workspace. Then keeping an eye on what just deployed means clicking through each project in turn.

### What it does

- Connects to Railway over OAuth and pulls deployments from the workspaces you select.
- Shows them on a single read-only dashboard, so the state of everything is on one screen.
- Encrypts stored tokens at rest and keeps the view scoped to what you actually authorized.

### Why it matters

Watching a fleet of services shouldn't mean a tab per project. One dashboard, scoped to your own workspaces, and you can see what just deployed at a glance.
