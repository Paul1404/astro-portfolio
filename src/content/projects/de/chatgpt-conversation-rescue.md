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

Ein langer ChatGPT-Chat ließ sich kaum noch sinnvoll verwenden, der Verlauf war im Browser aber noch erreichbar. Statt den gesamten Chat durchzuscrollen und jede Nachricht einzeln zu kopieren, habe ich ein kleines Werkzeug zur Rettung gebaut.

### Festhängenden ChatGPT-Chat sichern

Das Skript läuft in der Entwicklerkonsole des bereits geöffneten Chats. Es nutzt die bestehende Anmeldung, ruft die Gesprächsdaten ab und lädt sie als JSON herunter. Ein separates Node.js-Programm folgt dem aktiven Gesprächsverlauf und erstellt daraus ein lesbares Texttranskript.

Bei der ursprünglichen Rettung lieferte die Antwort 3.899 Gesprächsknoten. Der aktive Verlauf reichte bis zum Anfang zurück und ergab 1.353 Textbeiträge von Nutzer und Assistent. Das ursprüngliche JSON enthält auch alternative Gesprächszweige, die der Dienst zurückgegeben hat.

### Datenschutz und Grenzen

Das Skript stellt die Anfragen aus dem angemeldeten Browser an ChatGPT und speichert das Ergebnis lokal. Es sendet den Chat nicht an einen weiteren Dienst. Im Texttranskript stehen für Bilder und andere nichttextuelle Inhalte Platzhalter; die Anhänge selbst werden nicht heruntergeladen.

Die Methode verwendet einen undokumentierten Web-Endpunkt von ChatGPT und kann nach Änderungen am Dienst ausfallen. Das Repository enthält Anleitung, Rettungsskript, lokalen Konverter und Tests mit fiktiven Daten. Der gerettete Chat ist nicht enthalten.
