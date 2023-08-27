---
title: "Web-Apps sichern mit Authelia 🔒"
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

## **Authelia im Docker-Container: Sichere Zwei-Faktor-Authentifizierung mit Nginx-Reverse-Proxy**

Sicherheit sollte immer an erster Stelle stehen, insbesondere wenn es um Online-Konten geht. In diesem Projekt habe ich **Authelia** erfolgreich in einem Docker-Container bereitgestellt und mit einem Nginx-Reverse-Proxy integriert. Authelia ermöglicht eine robuste Zwei-Faktor-Authentifizierung (2FA), die meine Webanwendungen vor unerwünschten Zugriffen schützt.

### **Features & Vorteile**

* **Benutzerdefinierte Domain**: Durch die Integration von Authelia mit meiner eigenen Domain habe ich eine zusätzliche Sicherheitsschicht implementiert. Das macht es für böswillige Akteure schwieriger, meine Authentifizierungsmechanismen zu umgehen.
    
* **TOTP & U2F**: Die 2FA wurde sowohl mit TOTP (Time-Based One-Time Password) als auch mit U2F (Universal 2nd Factor) eingerichtet. Das bedeutet doppelten Schutz gegen Phishing und andere Online-Bedrohungen.
    

### **Für Tech-Enthusiasten und Entwickler**

Für alle, die tiefer in die technische Seite eintauchen möchten oder darüber nachdenken, Authelia für ihre eigenen Projekte zu verwenden, ist der gesamte Code auf GitHub verfügbar.

[**Zum GitHub-Repository**](https://github.com/authelia/authelia)

Dort findet ihr detaillierte Informationen über:

* **Deployment**: Wie Authelia in einem Docker-Container bereitgestellt wird.
* **Konfiguration**: Wie man Authelia und Nginx so konfiguriert, dass sie nahtlos zusammenarbeiten.
* **Integration**: Schritte zur Integration weiterer Dienste und Anwendungen mit Authelia.

* * *

Abschließend möchte ich betonen, wie wichtig es ist, immer die besten Sicherheitspraktiken zu verfolgen. Mit Authelia kann ich nun beruhigt schlafen, wissend, dass meine Webanwendungen sicher vor unerwünschten Zugriffen sind. Wenn ihr Fragen oder Anregungen habt, hinterlasst gerne einen Kommentar im Repository oder kontaktiert mich direkt.