---
title: "Railway Deployment Watcher"
publishDate: 2026-06-21 00:00:00
description: "Ein schreibgeschütztes Dashboard, das Deployments über ausgewählte Railway-Workspaces an einem Ort zeigt, ohne sich durch jedes Projekt klicken zu müssen."
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

Railway gruppiert Deployments nach Projekt. Das ist in Ordnung, bis man mehrere Services über mehr als einen Workspace betreibt. Dann heißt den Überblick behalten: sich durch jedes Projekt einzeln klicken.

### Was es macht

- Verbindet sich per OAuth mit Railway und lädt die Deployments aus den von dir ausgewählten Workspaces.
- Zeigt sie auf einem einzigen, schreibgeschützten Dashboard, sodass der Zustand von allem auf einem Bildschirm sichtbar ist.
- Verschlüsselt gespeicherte Tokens und beschränkt die Ansicht auf das, was du tatsächlich freigegeben hast.

### Warum es wichtig ist

Eine Flotte von Services im Blick zu behalten sollte nicht einen Tab pro Projekt bedeuten. Ein Dashboard, beschränkt auf deine eigenen Workspaces, und du siehst auf einen Blick, was deployt wurde.
