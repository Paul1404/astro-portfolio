---
title: "Mailcow Cold Standby"
publishDate: 2026-06-03 00:00:00
description: "Automated backup of a mailcow-dockerized instance to a Hetzner storage box over rsync and SSH."
stack:
  - Shell
  - rsync
  - SSH
tags:
  - Mailcow
  - Backup
  - Open Source
repoUrl: https://github.com/Paul1404/mailcow-cold-standby
icon: database-backup
---

A mail server is one of those things you only realise you should have backed up after it is gone. This keeps a cold standby copy off site so a failure does not mean lost mail.

### What it does

- Backs up a mailcow-dockerized instance to a Hetzner storage box using rsync over SSH.
- Runs unattended so the standby stays current without manual steps.
- Keeps the transfer efficient by only moving what changed.

### Why it matters

Cheap, off-site, automated backups for self-hosted email. The kind of thing that is boring right up until the day it saves you.
