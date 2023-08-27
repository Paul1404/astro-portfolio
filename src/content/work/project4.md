---
title: "Passwort-Sicherheit mit Bitwarden 🔐"
publishDate: 2020-03-04 00:00:00
img: /assets/bitwarden.webp
img_alt: Bitwarden Banner
description: |
  Implementierung eines selbstgehosteten Passwordmanagers
tags:
  - Open-Source
  - Docker-Compose
  - Security
---

Passwortmanagement ist ein wesentlicher Aspekt der digitalen Sicherheit. Mit **Bitwarden** habe ich eine Lösung gefunden, die sowohl sicher als auch benutzerfreundlich ist. In diesem Beitrag teile ich die Details meiner Bitwarden-Installation und die Vorteile, die sie bietet.

### Installation in einem Docker-Container

Der Einsatz von Docker hat das Software-Deployment revolutioniert, und Bitwarden macht da keine Ausnahme. Die Installation von Bitwarden in einem Docker-Container sorgt für Isolation, Skalierbarkeit und leichte Wartung. Es hat den Prozess vereinfacht und gleichzeitig die Stabilität des Dienstes gewährleistet.

### Integration mit benutzerdefinierter Domain

Um Bitwarden wirklich zu meinem eigenen zu machen und ein nahtloses Erlebnis zu bieten, habe ich es so konfiguriert, dass es mit meiner benutzerdefinierten Domain funktioniert. Dies nicht nur verbessert die Ästhetik und Zugänglichkeit, sondern erhöht auch das Vertrauen in den Service, wenn man ihn von verschiedenen Geräten aus nutzt.

### Zwei-Faktor-Authentifizierung mit Bitwarden Authenticator-App

Die Sicherheit der Passwörter allein reicht in der heutigen Zeit nicht aus. Deshalb habe ich die Zwei-Faktor-Authentifizierung (2FA) mithilfe der Bitwarden Authenticator-App aktiviert. Dies bietet eine zusätzliche Sicherheitsebene und stellt sicher, dass selbst wenn jemand mein Passwort kennt, er keinen Zugriff auf meine Daten hat.

Für diejenigen, die sich für technische Details interessieren oder darüber nachdenken, Bitwarden für ihre eigenen Bedürfnisse zu verwenden, biete ich die [Konfigurationsdetails auf GitHub](https://github.com/dani-garcia/vaultwarden) an. Hier können Sie tiefer in die Implementierung eintauchen und die vielen Funktionen und Sicherheitsaspekte von Bitwarden erkunden.

---

Bitwarden hat meine Erwartungen in Bezug auf Sicherheit und Benutzererfahrung übertroffen. Ich kann es jedem empfehlen, der nach einer robusten und zuverlässigen Passwortmanagement-Lösung sucht.

[**Auf GitHub ansehen**](https://github.com/dani-garcia/vaultwarden)
