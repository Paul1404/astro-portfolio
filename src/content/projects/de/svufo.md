---
title: "Kassenzählprotokolle"
publishDate: 2026-05-12 00:00:00
description: "Eine Web-App, mit der ein Vereinskassier Kassenzählungen und Ausgaben erfasst und daraus nummerierte, GoBD-konforme PDF-Belege erzeugt, die sich direkt in DATEV hochladen lassen."
stack:
  - TypeScript
  - Next.js
  - PostgreSQL
  - Hono
tags:
  - Finanzen
  - Formulare
  - Open Source
repoUrl: https://github.com/Paul1404/svufo
liveUrl: https://svufo.sv-untereuerheim.de
status: shipped
icon: banknote
---

Die Kasse in eine Tabelle zu zählen funktioniert, bis man einen Nachweis braucht, der einer Prüfung standhält. Dieses Projekt ersetzt die Tabelle durch ein geführtes Formular, das ordentliche Belege erzeugt, lückenlos pro Jahr nummeriert und bereit für den Steuerberater.

### Was es macht

- Erfasst die Zählung über alle 15 Stückelungen und protokolliert Ausgaben mit Mehrwertsteuersätzen von 0, 7 oder 19 Prozent oder einem eigenen Satz.
- Nummeriert jeden Beleg pro Jahr und erzeugt ein PDF mit einer SHA256-Prüfsumme über die Daten.
- Hält Korrekturen konform über einen Storno-Ablauf: Das Original bleibt unveränderlich, die Stornierung wird getrennt mit Wasserzeichen abgelegt. Exportiert CSV für den Steuerberater.

### Warum es wichtig ist

Der Verein erhält Nachweise, die den GoBD-Aufbewahrungspflichten genügen, statt einer Tabelle, der niemand ganz vertraut, und die Ausgabe lässt sich direkt in DATEV Unternehmen Online hochladen, sodass der Buchungsschritt kurz bleibt.
