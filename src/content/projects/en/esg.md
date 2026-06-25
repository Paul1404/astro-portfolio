---
title: "Email Signature Builder"
publishDate: 2026-05-31 00:00:00
description: "A signature builder that renders the same across Outlook, Gmail, Apple Mail and the web, including dark mode auto-invert."
stack:
  - TypeScript
  - React
  - Email HTML
tags:
  - Email
  - Tooling
  - Open Source
repoUrl: https://github.com/Paul1404/esg
liveUrl: https://esg.pdcd.net
featured: true
icon: mail
---

Email clients are the worst rendering target on the planet. Outlook uses the Word engine, Gmail strips half your CSS, and Apple Mail will happily invert your colours in dark mode without asking. ESG builds signatures that survive all of it.

### What it does

- Generates pixel consistent signatures for Outlook (Word renderer), Gmail web and mobile, Apple Mail including dark mode auto-invert, Outlook 365 / OWA, and Yahoo.
- Produces clean, table based HTML that pastes straight into a client without breaking.
- Lets you preview the result before you ship it to a whole organisation.

### Why it matters

Rolling out a consistent signature across a company normally means copy and paste chaos and a different broken layout in every inbox. This turns that into a repeatable, predictable build step.
