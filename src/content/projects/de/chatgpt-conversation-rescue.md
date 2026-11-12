---
title: "ChatGPT Conversation Rescue"
publishDate: 2026-11-12 00:00:00
description: "Einen festhängenden oder sehr langen ChatGPT-Chat als JSON und lesbares Transkript sichern, ohne Tausende Nachrichten manuell zu kopieren."
stack:
  - JavaScript
  - Node.js
  - Browser DevTools
tags:
  - Datenrettung
  - ChatGPT
  - Entwicklerwerkzeuge
repoUrl: https://github.com/Paul1404/chatgpt-conversation-rescue
icon: terminal
---

Ein ChatGPT-Chat war inzwischen so lang geworden, dass die Arbeit damit zunehmend mühsam wurde. Die Nachrichten waren noch da, aber um sie zu sichern, hätte ich den ganzen Verlauf durchscrollen und einzeln kopieren müssen. Ich wollte den Chat in einer Form behalten, mit der ich weiterarbeiten kann.

ChatGPT Conversation Rescue ruft die Daten eines geöffneten Chats ab und speichert sie als JSON. Ein kleiner lokaler Konverter erstellt daraus ein lesbares Transkript des aktiven Gesprächsverlaufs. Bei dem Chat, aus dem das Projekt entstanden ist, waren das 1.353 Textbeiträge von Nutzer und Assistent bei insgesamt 3.899 Gesprächsknoten.

### Einen festhängenden ChatGPT-Chat speichern

Öffne den Chat in einem Browser, in dem du angemeldet bist, und führe das Rettungsskript in der Entwicklerkonsole aus. Es ruft die Gesprächsdaten über die bestehende Anmeldung ab und speichert die Antwort als JSON-Datei in deinen Downloads.

Für eine leichter lesbare und durchsuchbare Version kannst du anschließend den mitgelieferten Node.js-Konverter ausführen. Er folgt dem aktiven Gespräch vom letzten Beitrag bis zum Anfang und schreibt die Texte von Nutzer und Assistent in der richtigen Reihenfolge. Das JSON bewahrt zusätzlich die anderen Gesprächszweige, die ChatGPT zurückgegeben hat.

[Skript und Schritt-für-Schritt-Anleitung auf GitHub öffnen](https://github.com/Paul1404/chatgpt-conversation-rescue).

### Was du erhältst

Das JSON eignet sich, wenn du die ursprüngliche Struktur und Metadaten behalten möchtest. Das Transkript ist eine einfache Textdatei, die du durchsuchen, kopieren oder als Ausgangspunkt für einen neuen Chat verwenden kannst. Bilder und andere nichttextuelle Inhalte erscheinen im Transkript als Platzhalter; die Anhänge selbst lädt das Werkzeug nicht herunter.

Die Rettung nutzt einen Web-Endpunkt, den ChatGPT für seine eigene Oberfläche verwendet. Bei meinem Chat hat das funktioniert, OpenAI kann ihn aber ändern. Der Browser muss angemeldet sein und auf den Chat zugreifen können.
