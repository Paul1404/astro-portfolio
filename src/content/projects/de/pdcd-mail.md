---
title: "PDCD Mail"
publishDate: 2026-10-29 00:00:00
description: "Eine produktive Mailplattform auf Stalwart: 38 Postfächer in acht Domains, von Mailcow migriert und mit bestehenden Zugangsdaten, Zustellregeln und Mailclients weiterbetrieben."
stack:
  - Stalwart
  - Rust
  - Python
  - Rocky Linux
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
featuredOrder: 6
icon: mail
screenshot:
  image: stalwart
  alt: "Weißes Stalwart-Logo mit Schriftzug auf dem offiziellen roten Hintergrund"
  caption: "Offizielles Stalwart-Markenmotiv. Stalwart Labs."
---

PDCD Mail ist die Mailinfrastruktur, die ich für Familie, Vereine und kleinere Organisationen betreibe. Ich habe 38 aktive Postfächer in acht Domains von Mailcow auf Stalwart unter Rocky Linux migriert. Dazu gehörten gemeinsam genutzte Postfächer, Aliase, Weiterleitungen und sechs Abholjobs für externe Mailkonten.

Die eigentliche Herausforderung war der Weiterbetrieb. Die Nutzer hatten eingerichtete Mailclients, gespeicherte Zugangsdaten und Arbeitsabläufe auf dem bisherigen Server. Der Wechsel musste diese Verbindungen erhalten, einschließlich zusätzlicher Passwörter, über die verschiedene Personen auf gemeinsame Postfächer zugreifen.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Produktionsarchitektur. Auf kleinen Bildschirmen seitlich scrollen.">
    <img src="/diagrams/pdcd-mail/de-architecture.svg" alt="Produktionsarchitektur: SMTP, Clientzugriffe, Abholjobs, Versand und Betrieb." width="785" height="652" loading="lazy" decoding="async" />
  </div>
  <figcaption>SMTP, Clientzugriffe, Abholjobs, Versand und Betrieb. <a href="/diagrams/pdcd-mail/de-architecture.svg">Diagramm vergrößern</a>. Auf kleinen Bildschirmen seitlich scrollen.</figcaption>
</figure>

### Migration mit bestehenden Clients

Nach einem Pilotpostfach und der Prüfung mit tatsächlich genutzten Mailclients folgten weitere Postfächer in Gruppen. Postfachdaten, Anmeldung, ausgehender Versand, eingehende Filterung und externe Abholjobs wurden schrittweise umgestellt. Dadurch ließ sich jede Änderung am bisherigen Verhalten überprüfen.

Auf der fertigen Plattform stellt Stalwart IMAP, SMTP-Submission und Sieve direkt bereit. Bestehende Servernamen funktionieren neben dem neuen Dienstnamen weiter. Aliase, Catch-all-Adressen, Absenderberechtigungen, Weiterleitungen und besondere Relay-Regeln wurden übernommen. Automatische Client-Erkennung und Apple-Konfigurationsprofile erleichtern die Neueinrichtung. Neue Konten erhalten beim Anlegen deutsche Spracheinstellungen und die Zeitzone Berlin.

Die vorübergehenden Migrationsproxies und Anmelde-Gateways wurden anschließend entfernt. Der Mailfluss wurde bei abgeschaltetem Mailcow-Server geprüft.

Auf dem Linux-Host habe ich verschlüsselten Mailspeicher eingerichtet und einen IPv6-Routingfehler am virtuellen Gateway des Providers behoben, während die IPv4-Zustellung verfügbar blieb. Neben der Anwendungsmigration gehören damit auch Netzbetrieb, Zertifikatserneuerung und unbeaufsichtigte Wartung zum Projekt.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Schrittweise Übergabe. Auf kleinen Bildschirmen seitlich scrollen.">
    <img src="/diagrams/pdcd-mail/de-migration.svg" alt="Schrittweise Übergabe: Vom Pilotpostfach zur nativen Plattform ohne dauerhafte Migrationsbrücken." width="936" height="146" loading="lazy" decoding="async" />
  </div>
  <figcaption>Vom Pilotpostfach zur nativen Plattform ohne dauerhafte Migrationsbrücken. <a href="/diagrams/pdcd-mail/de-migration.svg">Diagramm vergrößern</a>. Auf kleinen Bildschirmen seitlich scrollen.</figcaption>
</figure>

### Bestehende Passwörter in der nativen Anmeldung

Die größte Kompatibilitätsfrage betraf zusätzliche Passwörter. Stalwart erwartet in seinen selbst erzeugten Zugangsdaten eine Kennung; die bestehenden Mailcow-Zugangsdaten hatten ein anderes Format. Ein dauerhaftes Anmelde-Gateway hätte einen weiteren Dienst, einen eigenen Zugangsdatenbestand und eine zusätzliche Fehlerquelle bedeutet.

Ich habe dafür einen gezielten Rust-Patch und einen einmaligen Importer umgesetzt. Die bestehenden Passwortprüfwerte wurden in Stalwarts nativen Zugangsdatenbestand übernommen. Hauptpasswörter und 81 aktive zusätzliche Passwörter blieben erhalten, ohne ihre Klartextwerte zu benötigen. Vor der breiten Umstellung standen lokale Regressionstests und ein produktiver Pilot.

Anmeldung und Passwortverwaltung liegen damit bei Stalwart. Der verbleibende Aufwand ist klar: Bei künftigen Stalwart-Updates muss der Patch erhalten und getestet werden, solange eine entsprechende Kompatibilität im Upstream fehlt.

### Filterung auch für abgeholte Nachrichten

Eingehende SMTP-Nachrichten durchlaufen Stalwarts Spamfilter und ClamAV. Spam landet im Junk-Ordner des jeweiligen Empfängers, Schadsoftware wird blockiert. Eine zusätzliche Quarantäne zur manuellen Durchsicht gibt es nicht.

Die externen Abholjobs brauchten einen eigenen Ansatz, weil IMAP-Importe die SMTP-Filterung umgehen. Dafür habe ich eine Python-Pipeline vor dem Import gebaut. Sie prüft die vollständige Nachricht auf Schadsoftware und fordert vor der Zustellung eine Spamklassifizierung an. Zustellbelege und UID-Prüfstände verhindern wiederholte Importe. Ordnerzuordnungen halten die Zielpostfächer übersichtlich; festgelegte Umstellungsgrenzen ermöglichen den Wechsel vom externen Anbieter, ohne das gesamte Archiv erneut einzuspielen.

Ein eingeschränkter Codex-CLI-Adapter übergibt begrenzte Betreff- und Nachrichtentexte an ein leichtgewichtiges Sprachmodell. Dessen Kategorie und Konfidenz ergänzen den bestehenden Spamscore. Das Modell unterscheidet Phishing und Betrugsversuche von gewöhnlichen kommerziellen Newslettern. Mit hoher Sicherheit als schädlich erkannte Nachrichten erhalten einen deutlichen Aufschlag, normale Werbung keinen KI-Aufschlag. Der Klassifikator kann weder Links aufrufen noch Werkzeuge ausführen. Die Nutzungsaufzeichnung enthält Tokenzahlen und Laufzeiten, keine Nachrichteninhalte.

Zwei parallele Worker, eine begrenzte Warteschlange, gemeinsam genutzte Ergebnisse für gleichzeitige identische Anfragen und ein Circuit Breaker fangen Lastspitzen ab. Ein Live-Test mit drei gleichzeitigen Nachrichten war innerhalb von 10,8 Sekunden abgeschlossen. Die KI bleibt ein zusätzliches Signal: Bei Anbieterausfällen oder anhaltender Überlastung kann die SMTP-Filterung ohne KI-Urteil fortfahren; Abholjobs stellen die Verarbeitung zurück und versuchen es erneut.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Filterung und Fehlerpfade. Auf kleinen Bildschirmen seitlich scrollen.">
    <img src="/diagrams/pdcd-mail/de-filtering.svg" alt="Filterung und Fehlerpfade: Vereinfachter Ablauf. SMTP und Abholjobs nutzen getrennte Implementierungen mit gemeinsamen Schutzprinzipien." width="774" height="1168" loading="lazy" decoding="async" />
  </div>
  <figcaption>Vereinfachter Ablauf. SMTP und Abholjobs nutzen getrennte Implementierungen mit gemeinsamen Schutzprinzipien. <a href="/diagrams/pdcd-mail/de-filtering.svg">Diagramm vergrößern</a>. Auf kleinen Bildschirmen seitlich scrollen.</figcaption>
</figure>

### Zustellung, Vertrauenskette und Wiederherstellung

Reguläre ausgehende Nachrichten werden über Amazon SES versendet. Weitergeleitete Nachrichten und besondere Relay-Fälle behalten eigene Zustellregeln, damit keine ungeeigneten Absenderbeschränkungen greifen. SPF, DKIM, DMARC, DNSSEC, DANE und automatische Zertifikatserneuerung gehören zum Zustellkonzept.

Ein veralteter DANE-Eintrag zeigte eine konkrete Überwachungslücke: Ein gültiges TLS-Zertifikat beweist noch nicht, dass ein fremder Mailserver dessen Schlüssel akzeptiert. Ich habe den Eintrag korrigiert und eine Prüfung gegen das tatsächlich auf SMTP-Port 25 ausgelieferte Zertifikat ergänzt. Weitere Checks erfassen Submission, IMAP, Speicherplatz, Virenschutz, Aktualität der Abholjobs und Zustellrückstände. Eine stündliche externe Testnachricht prüft die Ankunft in einem echten Postfach statt nur den erfolgreichen Verbindungsaufbau.

Das CloudWatch-Monitoring nutzt ein gemeinsames Dashboard und zustandsbasierte Benachrichtigungen. Ein kleiner Dienst auf dem Host liefert die lokalen Prüfergebnisse, ohne ständig kostenpflichtige Fernverwaltungsbefehle auszulösen. Automatisches Patchen umfasst geplante Sonntagsneustarts und ein dazu passendes Wartungsfenster im Monitoring.

Tägliche Postfachexporte und die für eine Wiederherstellung nötige Konfiguration werden mit restic verschlüsselt, komprimiert und dedupliziert bei Backblaze B2 gesichert. Die erste Sicherung wurde durch eine tatsächliche Wiederherstellung mit anschließendem Hashvergleich überprüft.

### Ergebnis

Der alte Mailcow-Host kann abgeschaltet bleiben. Stalwart übernimmt Postfächer, native Anmeldung, Routing, Filterung und Clientverbindungen. Abholjobs, Monitoring, Patchmanagement und Backups laufen unabhängig von der abgelösten Plattform. Das Projekt verbindet Migration im laufenden Betrieb, eine gezielte Anpassung am Upstream-Code und die betrieblichen Prüfungen für einen verlässlichen kleinen Maildienst.
