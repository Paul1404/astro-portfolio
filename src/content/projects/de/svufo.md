---
title: "Kassenzählprotokolle"
publishDate: 2026-05-12 00:00:00
description: "Eine Web-App, mit der Vereine Kassenzählungen und Ausgaben erfassen und daraus nummerierte PDF-Belege erzeugen, die direkt in die DATEV-Buchhaltung passen."
stack:
  - TypeScript
  - Next.js
  - PostgreSQL
tags:
  - Finanzen
  - Formulare
  - Open Source
repoUrl: https://github.com/Paul1404/svufo
status: shipped
icon: banknote
---

Die Kasse zu zählen und Ausgaben in einer Tabelle zu erfassen funktioniert, bis man einen sauberen, prüffähigen Nachweis braucht. Dieses Projekt ersetzt die Tabelle durch ein geführtes Formular, das ordentliche Belege erzeugt, die für die Buchhaltung bereit sind.

### Was es macht

- Erfasst Kassenzählungen über alle Stückelungen und protokolliert Ausgaben mit konfigurierbaren Mehrwertsteuersätzen.
- Nummeriert Belege automatisch pro Jahr und erzeugt PDFs mit einer SHA256-Prüfsumme.
- Hält Korrekturen über einen Storno-Ablauf prüffähig, der den ursprünglichen Datensatz erhält, und exportiert CSV für den Steuerberater.

### Warum es wichtig ist

Der Verein erhält Nachweise, die einer Prüfung standhalten, statt einer Tabelle, der niemand ganz vertraut. Die Ausgabe ist so gebaut, dass sie sich direkt in DATEV hochladen lässt, sodass der Buchungsschritt kurz bleibt.
