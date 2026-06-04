---
title: "WinCrashTrace"
publishDate: 2026-03-15 00:00:00
description: "A PowerShell utility that collects a Windows support bundle for root cause analysis after a system crash, so the evidence is in one place before it scrolls away."
stack:
  - PowerShell
tags:
  - Windows
  - Diagnostics
  - Open Source
repoUrl: https://github.com/Paul1404/WinCrashTrace
status: shipped
icon: monitor-x
---

When a Windows machine crashes, the useful evidence is scattered across event logs, dump files, and reliability history, and a lot of it ages out. WinCrashTrace gathers it into a single bundle while it is still there.

### What it does

- Collects event logs, crash dumps, and system state into one support bundle.
- Packages everything so it can be handed off for analysis without chasing files.
- Aims at root cause analysis of operating system crashes, not just surface symptoms.

### Why it matters

It turns the frantic post-crash scramble into one command, so whoever investigates starts with the full picture instead of whatever happened to survive.
