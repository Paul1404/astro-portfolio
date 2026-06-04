---
title: "autopatchd"
publishDate: 2026-01-14 00:00:00
description: "An automated patch management daemon for RHEL-based systems that applies updates on a schedule, so servers stay current without someone running dnf by hand."
stack:
  - Python
  - Linux
tags:
  - Linux
  - Automation
  - Open Source
repoUrl: https://github.com/Paul1404/autopatchd
status: archived
icon: package-check
---

Keeping a fleet of Linux servers patched is the kind of task that is easy to skip until it turns into a security problem. autopatchd runs the updates on a schedule so they happen whether or not anyone remembers.

### What it does

- Runs as a daemon on RHEL, Rocky Linux, AlmaLinux, and CentOS Stream.
- Applies system patches on a schedule instead of waiting for a manual dnf run.
- Keeps a set of machines current without hands-on work for every box.

### Why it matters

Patching that happens on its own is patching that actually happens. It turns a chore people put off into a quiet background routine.
