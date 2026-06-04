---
title: "NSX-T Automation Toolkit"
publishDate: 2025-06-25 00:00:00
description: "An interactive toolkit for managing VMware NSX-T through its REST API, plus a hardened SFTP setup for NSX backups."
stack:
  - Python
  - Shell
  - REST API
tags:
  - VMware
  - NSX-T
  - Automation
repoUrl: https://github.com/Paul1404/nsx-api.sh
status: shipped
icon: network
---

NSX-T has a capable REST API but driving it by hand is slow and the backup setup around it is easy to get insecure. This is two tools that make NSX-T operations repeatable and safe.

### What it does

- A modular, interactive toolkit for managing NSX-T through its REST API, including certificate workflows.
- A companion script that sets up a secure, chrooted SFTP user for NSX backups on RHEL 9 and later.
- Sensible defaults so common operations do not require remembering raw API calls.

### Why it matters

Enterprise networking automation that turns repetitive, error-prone console work into scripted, auditable steps.
