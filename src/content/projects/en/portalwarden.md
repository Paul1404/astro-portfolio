---
title: "PortalWarden"
publishDate: 2026-01-02 00:00:00
description: "An RFID access control system for a Raspberry Pi: a Python script reads the tags and a Node.js app decides what each one is allowed to do."
stack:
  - Node.js
  - Python
  - Raspberry Pi
tags:
  - RFID
  - Hardware
  - Open Source
repoUrl: https://github.com/Paul1404/PortalWarden
status: archived
icon: scan-line
---

Physical access control usually means either an expensive commercial system or a tangle of wiring nobody documents. PortalWarden is a small, self-built version: tap a tag, and the system decides what happens.

### What it does

- Reads RFID tags on a Raspberry Pi with a Python script.
- Pairs that with a Node.js application that maps each tag to an action.
- Acts on the tag data, for example to control a door or gate.

### Why it matters

It is a working access control system built from a Pi and some code, the kind of hardware-meets-software project that has to behave reliably in the physical world.
