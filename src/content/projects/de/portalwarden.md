---
title: "PortalWarden"
publishDate: 2026-01-02 00:00:00
description: "Ein RFID-Zutrittssystem für einen Raspberry Pi: Ein Python-Skript liest die Tags und eine Node.js-App entscheidet, was jeder einzelne darf."
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

Zutrittskontrolle bedeutet meist entweder ein teures kommerzielles System oder ein Kabelgewirr, das niemand dokumentiert hat. PortalWarden ist eine kleine, selbst gebaute Variante: Tag auflegen, und das System entscheidet, was passiert.

### Was es macht

- Liest RFID-Tags auf einem Raspberry Pi mit einem Python-Skript.
- Verbindet das mit einer Node.js-Anwendung, die jedem Tag eine Aktion zuordnet.
- Reagiert auf die Tag-Daten, zum Beispiel um eine Tür oder ein Tor zu steuern.

### Warum es wichtig ist

Es ist ein funktionierendes Zutrittssystem aus einem Pi und etwas Code, die Art von Hardware-trifft-Software-Projekt, das in der echten Welt zuverlässig funktionieren muss.
