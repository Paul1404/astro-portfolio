---
title: "Mail DNS Diagnostics"
publishDate: 2025-06-25 00:00:00
description: "Ein Bash-Skript, das alle DNS- und Mail-Security-Records einer Domain in einem einzigen Durchlauf prüft."
stack:
  - Bash
  - DNS
tags:
  - E-Mail
  - Sicherheit
  - CLI
repoUrl: https://github.com/Paul1404/mail_dns_diag.sh
status: shipped
icon: search-check
---

Die Diagnose von E-Mail-Zustellproblemen bedeutet, eine lange Liste von DNS-Records zu überprüfen. Dabei ist es leicht, einen zu übersehen. Dieses Skript führt das gesamte Audit mit einem einzigen Befehl durch.

### Was es macht

- Prüft die wesentlichen DNS- und Mail-Security-Records einer Domain, darunter SPF, DKIM, DMARC und die zugehörigen Infrastruktur-Records.
- Meldet, was vorhanden ist, was fehlt und was fehlkonfiguriert aussieht.
- Läuft überall, wo Bash verfügbar ist, ohne zusätzliche Abhängigkeiten.

### Warum es wichtig ist

Wenn E-Mails nicht ankommen, verwandelt dieses Tool eine mühsame manuelle Checkliste in einen einzigen lesbaren Bericht.
