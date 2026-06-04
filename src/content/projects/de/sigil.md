---
title: "Sigil"
publishDate: 2026-05-31 00:00:00
description: "Ein selbst gehosteter DMARC-Report-Viewer, der aggregierte Berichte aus einem IMAP-Postfach einliest und zeigt, was mit der E-Mail-Authentifizierung passiert."
stack:
  - FastAPI
  - React
  - Docker
tags:
  - E-Mail
  - Sicherheit
  - Self-Hosted
repoUrl: https://github.com/Paul1404/Sigil
featured: true
status: shipped
icon: shield-check
---

DMARC-Berichte sind XML-Dateien, die sich in einem Postfach anhäufen und von Hand praktisch unlesbar sind. Gleichzeitig sind sie die einzige Möglichkeit zu sehen, wer E-Mails unter der eigenen Domain versendet. Sigil verwandelt dieses Rauschen in etwas, auf das man tatsächlich reagieren kann.

### Was es macht

- Verbindet sich mit einem IMAP-Postfach, holt aggregierte DMARC- und TLS-RPT-Berichte ab und wertet sie aus.
- Zeigt Pass- und Fail-Trends, sodass man Spoofing und fehlkonfigurierte Absender erkennt.
- Führt DNS-Health-Checks für MX, SPF, DKIM, DANE und MTA-STS durch.

### Warum es wichtig ist

E-Mail-Authentifizierung lässt sich leicht falsch einrichten und schwer überprüfen. Sigil bietet einen selbst gehosteten, privaten Einblick, ob die eigene Domain tatsächlich geschützt ist.
