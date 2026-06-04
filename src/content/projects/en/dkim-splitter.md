---
title: "DKIM Splitter"
publishDate: 2025-09-07 00:00:00
description: "Split long DKIM TXT records into 255 character chunks for Route 53 or any DNS provider that enforces the TXT length limit."
stack:
  - Python
  - CLI
tags:
  - Email
  - DNS
  - CLI
repoUrl: https://github.com/Paul1404/dkim-splitter
status: shipped
icon: scissors
---

DKIM keys are longer than a single DNS TXT string is allowed to be, so they have to be split into chunks. Doing that by hand is fiddly and easy to get wrong, which then quietly breaks signing.

### What it does

- Takes a long DKIM TXT record and splits it into valid 255 character chunks.
- Produces output you can paste straight into Route 53 or any provider with the same limit.
- Removes a small but error-prone manual step from email setup.

### Why it matters

One tiny command that prevents one of the more annoying email authentication mistakes.
