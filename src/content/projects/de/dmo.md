---
title: "Dependabot Mass Orchestration"
publishDate: 2026-05-24 00:00:00
description: "Mit GitHub einloggen, alle offenen Dependabot-PRs aus allen Repositories auf einem Dashboard sehen und dann gesammelt genehmigen und mergen."
stack:
  - TypeScript
  - GitHub API
  - OAuth
tags:
  - GitHub
  - Automatisierung
  - Open Source
repoUrl: https://github.com/Paul1404/dmo
liveUrl: https://dmo.pdcd.net
featured: true
status: shipped
icon: git-merge
---

Wer viele Repositories betreibt, ertrinkt irgendwann in Dependabot-Pull-Requests. Sie Repository für Repository durchzugehen ist langsam, und irgendwann ignoriert man sie einfach. Genau so bleibt man bei Sicherheitsupdates hinterher.

### Was es macht

- Authentifiziert sich mit GitHub und lädt alle offenen Dependabot-PRs aus sämtlichen Repositories.
- Zeigt sie auf einem einzigen Dashboard, sodass man den gesamten Update-Rückstand auf einen Blick sieht.
- Ermöglicht es, PRs gesammelt zu genehmigen und zu mergen, statt sich durch jedes Repository zu klicken.

### Warum es wichtig ist

Dependencies aktuell zu halten hört auf, eine Aufgabe zu sein, die man vor sich herschiebt. Ein Bildschirm, ein paar Klicks, und der Rückstand ist erledigt.
