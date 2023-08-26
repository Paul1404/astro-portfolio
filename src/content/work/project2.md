---
title: "Projekt 2: Der eigene Mail-Server 📧"
publishDate: 2020-03-02 00:00:00
img: /assets/mailcow-banner.png
img_alt: Mailcow Banner
description: |
  Ich habe vor Kurzem eine spannende Reise in die Welt der selbst gehosteten E-Mail-Server unternommen.
tags:
  - Mail-Hosting
  - Docker-Compose
  - Cloud-Computing
---

Ich habe vor Kurzem eine spannende Reise in die Welt der selbst gehosteten E-Mail-Server unternommen. Die Wahl fiel auf **Mailcow**, und ich möchte meine Erfahrungen teilen.

### Einrichtung auf Hetzner VPS

Die Einrichtung von Mailcow erfolgte auf einem [Hetzner VPS](https://www.hetzner.com/cloud). Dank der Skalierbarkeit und Zuverlässigkeit von Hetzner war der gesamte Prozess ziemlich reibungslos. Mit der Verwendung von Docker konnte ich sicherstellen, dass jede Komponente in ihrer eigenen Umgebung läuft und leicht zu verwalten ist.

### Integration mit benutzerdefinierter Domain

Ein Schlüsselaspekt des Projekts war es, Mailcow so zu konfigurieren, dass es nahtlos mit meiner benutzerdefinierten Domain funktioniert. Dies ermöglichte mir eine persönliche E-Mail-Adresse, die sowohl professionell aussieht als auch die Vertraulichkeit meiner Kommunikation sicherstellt.

### Sicherheit durch SSL-Zertifikate von Cloudflare

In der heutigen Zeit ist Online-Sicherheit von größter Bedeutung. Daher habe ich Mailcow so eingerichtet, dass es SSL-Zertifikate von [Cloudflare](https://www.cloudflare.com) verwendet. Dadurch wird sichergestellt, dass alle E-Mail-Verbindungen sicher verschlüsselt werden und vor externen Bedrohungen geschützt sind.

### Vorteile eines selbst gehosteten E-Mail-Servers

Mit Mailcow habe ich nun volle Kontrolle über meine E-Mail-Konten. Dies bedeutet, dass ich nicht von Drittanbietern abhängig bin und genaue Einblicke in die Performance und Sicherheit meines Servers habe. 

Für alle technikbegeisterten Leser, die an den Details interessiert sind oder überlegen, Mailcow selbst zu verwenden, habe ich den [Code auf GitHub](https://github.com/mailcow/mailcow-dockerized) zur Verfügung gestellt. Hier können Sie mehr über das Projekt erfahren und selbst in die Welt der selbst gehosteten E-Mail-Server eintauchen.

---

Es war ein lohnendes Projekt, und ich freue mich darauf, in Zukunft noch tiefer in die Möglichkeiten von selbst gehosteten Lösungen einzutauchen. Ich hoffe, dieser Artikel bietet Ihnen einen Einblick und inspiriert Sie vielleicht, Ihre eigene selbst gehostete E-Mail-Lösung zu erkunden.

[**Auf GitHub ansehen**](https://github.com/mailcow/mailcow-dockerized)
