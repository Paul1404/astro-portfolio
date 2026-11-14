---
title: "PDCD Mail"
publishDate: 2026-10-29 00:00:00
description: "Eine Stalwart-Mailplattform, von Mailcow nach Kubernetes migriert: bestehende Zugangsdaten und Clientnamen, drei Mail-Frontends, gemeinsamer PostgreSQL-Speicher und abgesicherte Abholjobs."
stack:
  - Stalwart
  - Rust
  - Python
  - Kubernetes
  - PostgreSQL
  - Redis Sentinel
  - HAProxy
  - Amazon SES
  - AWS CloudWatch
  - restic
  - Backblaze B2
tags:
  - Infrastructure
  - Migration
  - Email Security
  - Automation
featured: true
featuredOrder: 2
icon: mail
screenshot:
  image: stalwart
  alt: "Weißes Stalwart-Logo mit Schriftzug auf dem offiziellen roten Hintergrund"
  caption: "Offizielles Stalwart-Markenmotiv. Stalwart Labs."
---

PDCD Mail ist die Mailinfrastruktur, die ich für Familie, Vereine und kleine Organisationen betreibe. Zuerst habe ich sie von Mailcow auf Stalwart umgestellt und dabei gespeicherte Passwörter, gemeinsame Postfachzugriffe, Aliase und externe Abholjobs erhalten. Danach habe ich das Stalwart-Backend von einem einzelnen Linux-Host auf [Vertex](/de/projects/vertex/), meine Kubernetes-Plattform mit vier Knoten, migriert.

Bei der zweiten Migration änderten sich Speicher- und Netzarchitektur. Die Clientnamen `mail.pdcd.net` und `mx.pdcd.net` blieben erhalten. Zwei Stalwart-Replikate nutzen heute gemeinsamen PostgreSQL-Speicher und Redis Sentinel; drei getrennte Knoten stellen die öffentlichen Mail-Frontends bereit.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Produktionsarchitektur. Auf kleinen Bildschirmen seitlich scrollen.">
    <img src="/diagrams/pdcd-mail/de-architecture.svg" alt="Mailarchitektur auf Vertex: drei HAProxy-Frontends, zwei Stalwart-Replikate, PostgreSQL, Redis und B2-Backups." width="740" height="945" loading="lazy" decoding="async" />
  </div>
  <figcaption>Drei Knoten-Frontends, gemeinsame Mailspeicher und externe Backups. <a href="/diagrams/pdcd-mail/de-architecture.svg">Diagramm vergrößern</a>. Auf kleinen Bildschirmen seitlich scrollen.</figcaption>
</figure>

### Postfächer und Dienstidentität umziehen

Die ursprüngliche Mailcow-Migration begann mit einem Pilotpostfach und wurde in Gruppen fortgesetzt. Routing, Absenderberechtigungen, Weiterleitungen und zusätzliche Passwörter zogen mit den Nachrichten um. Stalwart übernahm IMAP, SMTP-Submission und Sieve nativ; die vorübergehenden Anmelde-Gateways wurden entfernt.

Für den Umzug auf Vertex habe ich die alte schreibende Instanz vor dem abschließenden nativen Export und Import eingefroren. Alle 17 Exportdateien außerhalb der Blob-Daten stimmten bytegenau überein, 89.836 Blobs bestanden die Importprüfung. Den Volltextindex habe ich separat neu aufgebaut und anschließend bestehende Zugangsdaten, Postfachzugriff und Suche auf dem neuen Backend geprüft. Die alte Instanz ist gegen einen Neustart gesperrt, damit kein zweiter, auseinanderlaufender Postfachbestand entsteht.

Jedes der drei öffentlichen Frontends betreibt HAProxy auf einem eigenen Knoten mit dedizierten Host-Ports. PROXY v2 übergibt die tatsächliche Clientadresse und den ursprünglichen Zielport an Stalwart. Die bisherigen Listener-Identitäten habe ich erhalten, weil Mailrouting-Ausdrücke davon abhängen. Mail-HTTPS läuft mit exakter SNI-Zuordnung als Passthrough durch Traefik. Die bestehende DANE-Schlüsselzuordnung bleibt erhalten, cert-manager erneuert das Standardzertifikat.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Migrationsablauf">
    <img src="/diagrams/pdcd-mail/de-migration.svg" alt="Von Mailcow zu nativem Stalwart und gemeinsamem Speicher auf Vertex." width="936" height="145" loading="lazy" decoding="async" />
  </div>
  <figcaption>Von Mailcow zu nativem Stalwart und gemeinsamem Speicher auf Vertex. <a href="/diagrams/pdcd-mail/de-migration.svg">Diagramm vergrößern</a>.</figcaption>
</figure>

### Bestehende Passwörter in der nativen Anmeldung

Die größte Kompatibilitätsfrage betraf zusätzliche Passwörter. Stalwart erwartet in seinen selbst erzeugten Zugangsdaten eine Kennung; die bestehenden Mailcow-Zugangsdaten hatten ein anderes Format. Ein dauerhaftes Anmelde-Gateway hätte einen weiteren Dienst, einen eigenen Zugangsdatenbestand und eine zusätzliche Fehlerquelle bedeutet.

Ich habe dafür einen gezielten Rust-Patch und einen einmaligen Importer umgesetzt. Die bestehenden Passwortprüfwerte wurden in Stalwarts nativen Zugangsdatenbestand übernommen. Hauptpasswörter und 81 aktive zusätzliche Passwörter blieben erhalten, ohne ihre Klartextwerte zu benötigen. Vor der breiten Umstellung standen lokale Regressionstests und ein produktiver Pilot.

Anmeldung und Passwortverwaltung liegen damit bei Stalwart. Der verbleibende Aufwand ist klar: Bei künftigen Stalwart-Updates muss der Patch erhalten und getestet werden, solange eine entsprechende Kompatibilität im Upstream fehlt.

### Filterung auch für abgeholte Nachrichten

Eingehende SMTP-Nachrichten durchlaufen Stalwarts Spamfilter und ClamAV. Spam landet im Junk-Ordner des jeweiligen Empfängers, Schadsoftware wird blockiert. Eine zusätzliche Quarantäne zur manuellen Durchsicht gibt es nicht.

Die externen Abholjobs brauchten einen eigenen Ansatz, weil IMAP-Importe die SMTP-Filterung umgehen. Dafür habe ich eine Python-Pipeline vor dem Import gebaut. Sie prüft die vollständige Nachricht auf Schadsoftware und fordert vor der Zustellung eine Spamklassifizierung an. Zustellbelege und UID-Prüfstände verhindern wiederholte Importe. Ordnerzuordnungen halten die Zielpostfächer übersichtlich; festgelegte Umstellungsgrenzen ermöglichen den Wechsel vom externen Anbieter, ohne das gesamte Archiv erneut einzuspielen.

Ein eingeschränkter Codex-CLI-Adapter übergibt begrenzte Betreff- und Nachrichtentexte an ein leichtgewichtiges Sprachmodell. Dessen Kategorie und Konfidenz ergänzen den bestehenden Spamscore. Das Modell unterscheidet Phishing und Betrugsversuche von gewöhnlichen kommerziellen Newslettern. Mit hoher Sicherheit als schädlich erkannte Nachrichten erhalten einen deutlichen Aufschlag, normale Werbung keinen KI-Aufschlag. Der Klassifikator kann weder Links aufrufen noch Werkzeuge ausführen. Die Nutzungsaufzeichnung enthält Tokenzahlen und Laufzeiten, keine Nachrichteninhalte.

Zwei parallele Worker, eine begrenzte Warteschlange, gemeinsam genutzte Ergebnisse für gleichzeitige identische Anfragen und ein Circuit Breaker fangen Lastspitzen ab. Die KI bleibt ein zusätzliches Signal: Bei Anbieterausfällen oder anhaltender Überlastung kann die SMTP-Filterung ohne KI-Urteil fortfahren; Abholjobs stellen die Verarbeitung zurück und versuchen es erneut.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Filterung und Fehlerpfade. Auf kleinen Bildschirmen seitlich scrollen.">
    <img src="/diagrams/pdcd-mail/de-filtering.svg" alt="Filterung und Fehlerpfade: Vereinfachter Ablauf. SMTP und Abholjobs nutzen getrennte Implementierungen mit gemeinsamen Schutzprinzipien." width="774" height="1168" loading="lazy" decoding="async" />
  </div>
  <figcaption>Vereinfachter Ablauf. SMTP und Abholjobs nutzen getrennte Implementierungen mit gemeinsamen Schutzprinzipien. <a href="/diagrams/pdcd-mail/de-filtering.svg">Diagramm vergrößern</a>. Auf kleinen Bildschirmen seitlich scrollen.</figcaption>
</figure>

### Gemeinsamer Speicher und Versand

Das fest gepinnte Stalwart-Image enthält meinen Patch für bestehende Passwörter sowie PostgreSQL- und Redis-Unterstützung. Drei PostgreSQL-Instanzen auf getrennten Knoten speichern strukturierte Daten, Nachrichten-Blobs und Suchdaten. CloudNativePG verwaltet die primäre Instanz und die synchrone Replikation zu einer Standby-Instanz. Drei Redis-Instanzen mit Sentinel stellen gemeinsame flüchtige Zustände bereit. Jede Instanz nutzt ein verschlüsseltes, knotenlokales Longhorn-Volume. PostgreSQL und Redis übernehmen die Replikation selbst.

Die Failover-Pfade von Datenbank und Redis habe ich mit gezielten Netzwerkfehlern getestet. Beide Dienste wählten eine neue primäre Instanz und behielten die Testschreibvorgänge bei.

Amazon SES übernimmt weiterhin den größten Teil des Versands. Die übrige direkte Zustellung läuft nun über Vertex-IPv4 mit gemeinsamer EHLO-Identität und passenden SPF-Einträgen. DNSSEC, DANE und automatische Zertifikatserneuerung bleiben Teil des Konzepts.

### Abholjobs und Wiederherstellung

ClamAV, der eingeschränkte KI-Adapter und die externen Abholjobs laufen jetzt auf Vertex. Die Abholjobs haben genau einen aktiven Scheduler; ihre Prüfstände wurden vom alten Host übernommen. Fehlt ein erforderliches Klassifikationsurteil, wird die Verarbeitung zurückgestellt und das Original bleibt beim Quellanbieter.

Das neue logische PostgreSQL-Backup wird mit restic verschlüsselt und dedupliziert bei Backblaze B2 gesichert. Das vollständige Basisarchiv habe ich zurückgelesen und Bytezahl sowie SHA-256-Hash verglichen. Tägliche Backups sind aktiviert.

### Ergebnis

Mail nutzt jetzt dieselbe Vertex-Plattform wie meine Anwendungen. Bestehende Servernamen und Zugangsdaten bleiben für die Clients erhalten. Gemeinsame Datenbankdienste ersetzen den einzelnen lokalen Mailspeicher; öffentliche Verbindungen und Mail-Replikate sind voneinander getrennt.
