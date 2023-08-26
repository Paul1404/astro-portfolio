---
title: "Projekt 1: Web-Apps sichern mit Authelia 🔒"
publishDate: 2023-08-25 00:00:00
img: /assets/authelia.webp
img_alt: A visual representation of Authelia's two-factor authentication
description: |
  Ich habe Authelia in einem Docker-Container bereitgestellt.
tags:
  - Authelia
  - Security
  - Docker
---

Ich habe Authelia in einem Docker-Container bereitgestellt und in meinen Nginx-Reverse-Proxy integriert. Authelia bietet sichere Zwei-Faktor-Authentifizierung für meine Webanwendungen. Dies gewährleistet, dass meine Online-Konten vor unerwünschten Zugriffen geschützt sind.

Indem ich Authelia mit meiner benutzerdefinierten Domain konfiguriere, habe ich eine zusätzliche Sicherheitsschicht hinzugefügt. Die 2FA wurde mithilfe von TOTP und U2F eingerichtet, was einen weiteren Schutz gegen Phishing und andere Online-Bedrohungen bietet.

Für alle, die an der technischen Seite interessiert sind oder darüber nachdenken, Authelia selbst zu verwenden, habe ich den Code auf GitHub zur Verfügung gestellt. Hier können Sie die Einzelheiten des Deployments und der Konfiguration nachvollziehen.