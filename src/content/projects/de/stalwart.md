---
title: "Stalwart: Architektur eines Mailclusters"
publishDate: 2026-10-29 00:00:00
description: "Drei Mailreplikate, gemeinsamer dauerhafter Speicher und eine erhaltene öffentliche Identität. Meine Stalwart-Architektur auf Kubernetes, vom Protokollrouting bis zur Wiederherstellung."
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
  - cert-manager
  - Velero
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

Ich betreibe Mail für Familie, Vereine und kleine Organisationen mit [Stalwart](https://stalw.art/). SMTP-Empfang, authentifizierte Submission, IMAP und JMAP treffen in einem Server auf ein gemeinsames Konto- und Speichermodell. Genau diese Verbindung hat mich an Stalwart interessiert: Eine Routingentscheidung, eine Postfachberechtigung und ein Eintrag in der Versandqueue gehören zum selben System.

Meine Arbeit war die Infrastruktur darum: die Migration von Mailcow, der Erhalt bestehender Zugangsdaten, der Umzug der Daten auf [Vertex](/de/projects/vertex/) und die Integration von öffentlichen Mail-Edges, gemeinsamen Speichern, Filterung und Wiederherstellung. Die Mailengine in Rust und ihre Clustermechanismen stammen von Stalwart Labs. Hier läuft ein festgelegter Build von 0.16.27 mit meinem gezielten Kompatibilitätspatch für bestehende Zusatzpasswörter.

### Ein Mailsystem, drei Anwendungsreplikate

Drei Stalwart-Replikate laufen auf drei verschiedenen Kubernetes-Knoten. Jedes bedient die Mailprotokolle gegen denselben dauerhaften Datenbestand. Eine Verbindung landet auf einem verfügbaren Replikat, ohne dass dafür ein Postfach umziehen muss. SMTP nimmt Nachrichten anderer Server an, Submission authentifiziert versendende Benutzer, IMAP stellt ihre Ordner bereit und JMAP liefert die HTTP-API für Mail und Verwaltung.

Entscheidend ist die Grenze zwischen dauerhaftem Zustand und Koordination. PostgreSQL hält Konto- und Konfigurationsobjekte, Postfachmetadaten, Nachrichtenblobs, Suchdaten und die persistente Versandqueue. Redis trägt flüchtige Zähler und Sperren. Stalwarts Standardkoordinator nutzt dessen Publish/Subscribe-Pfad für die Kommunikation zwischen Replikaten. Queue-Worker sichern fällige Arbeit mit gemeinsamen Sperren. Redis hilft bei der Entscheidung, wer einen Eintrag bearbeitet; Nachricht und Queue-Eintrag bleiben in PostgreSQL.

<figure class="mail-diagram stalwart-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Dauerhafte Daten und flüchtige Koordination haben getrennte Verantwortliche.">
    <picture>
    <source media="(max-width: 600px)" srcset="/diagrams/stalwart/de-architecture-mobile.svg" />
    <img src="/diagrams/stalwart/de-architecture.svg" alt="Dauerhafte Daten und flüchtige Koordination haben getrennte Verantwortliche." loading="lazy" decoding="async" />
    </picture>
  </div>
  <figcaption>Dauerhafte Daten und flüchtige Koordination haben getrennte Verantwortliche. <a href="/diagrams/stalwart/de-architecture.svg">Diagramm vergrößern</a>.</figcaption>
</figure>

### Replikation dort, wo die Daten verantwortet werden

CloudNativePG verwaltet drei PostgreSQL-18.1-Instanzen mit verpflichtender synchroner Replikation auf mindestens einen Standby. Der Schreib-Service folgt dem Primary; Stalwart prüft Zertifikat und Hostnamen der Datenbankverbindung. Drei Redis-Mitglieder mit Sentinel übernehmen die Primary-Erkennung mit einem Quorum von zwei. Redis repliziert asynchron und trägt hier die flüchtige Koordination, während der dauerhafte Postfachbestand in PostgreSQL liegt.

Jede Datenbankinstanz hat ein verschlüsseltes, knotenlokales Volume mit 64 GiB. PostgreSQL und Redis replizieren selbst zwischen den Knoten. Ich habe bewusst keine weiteren drei Speicherkopien unter jede Datenbankreplik gesetzt: Das würde Speicher und Schreibverkehr vervielfachen, ohne die Verantwortung für Konsistenz zu verändern. Blobs, Indizes und strukturierte Daten in PostgreSQL geben dieser Installation außerdem eine gemeinsame Datenbankgrenze für die Mailwiederherstellung. Dafür werden Exporte größer und die Datenbank trägt mehr I/O.

### Das Frontend muss die Bedeutung erhalten

Drei öffentliche HAProxy-Edges stellen die bestehenden MX- und Client-Endpunkte über IPv4 und IPv6 bereit. Sie leiten TCP mit PROXY v2 weiter und geben die echte Gegenstellenadresse sowie den ursprünglichen Zielport an Stalwart durch. TLS endet am Mailserver. Mail-HTTPS läuft mit exakter SNI-Zuordnung durch Traefik.

Diese Details bestimmen die Policy. Port 25 nimmt Serververbindungen an; Submission enthält die Versandberechtigung eines angemeldeten Benutzers. Stalwarts Ausdrücke werten Listeneridentität, Clientadresse und Authentifizierungskontext aus. Versteckt ein Proxy diese Eingaben, verändert er die Bedeutung der Verbindung. Beim Backendwechsel habe ich deshalb die bestehenden Listeneridentitäten, Servernamen und Policy-Ausdrücke erhalten.

Das gilt auch für die kryptografische Identität. cert-manager verwaltet das Standardzertifikat mit elf Namen und ein separates Discovery-Zertifikat mit siebzehn Namen. DNSSEC sichert die DNS-Vertrauenskette; DANE bindet SMTP-TLS an den veröffentlichten Schlüssel. Ein separat ausgestelltes, nicht eingebundenes Reservezertifikat hat seinen nächsten Schlüssel bereits neben der aktuellen TLSA-Zuordnung veröffentlicht. Erneuerung und Vorbereitung eines späteren Schlüsselwechsels haben damit getrennte Lebenszyklen. CAA begrenzt die Mailnamen auf die vorgesehenen ACME-Konten und Validierungsmethoden.

### Native Konfiguration und Anmeldung

Stalwart 0.16.27 bildet Konfiguration als typisierte Registry-Objekte ab. Speicherbackends, Listener, Authentifizierung und ausdrucksbasierte Policies passen in dieses Modell. Konfiguration und Kontoverwaltung bleiben nativ in Stalwart; Kubernetes liefert Laufzeit, eingebundene Zertifikate und Secret-Referenzen.

Die bestehenden Mailcow-Zusatzpasswörter brauchten eine eng begrenzte Anpassung. Ihr Verifier-Format unterschied sich von Stalwarts generierten Zugangsdaten mit Kennung. Ich habe einen Rust-Kompatibilitätspatch und einen Importer geschrieben, die Hauptpasswörter und 81 aktive Zusatzpasswörter ohne Wiederherstellung der Klartexte übernahmen. Damit entfiel ein dauerhaftes Authentifizierungsgateway mit zweitem Zugangsdatenbestand. Gemeinsame Postfachzugriffe, Aliase und Absenderberechtigungen zogen mit den Konten um.

### Zwei Eingangswege und explizite Versandentscheidungen

SMTP-Mail durchläuft Stalwarts Regeln und ClamAV. Spam landet im Junk-Ordner des jeweiligen Empfängers, Schadsoftware wird blockiert. Die sechs externen Postfachkollektoren brauchen einen eigenen Prüfpfad vor dem Import, weil IMAP-Abholung die SMTP-Filterung umgeht. Sie prüfen vor der Zustellung und führen UID-Checkpoints sowie Zustellbelege, damit wiederholte Läufe keine Nachrichten doppelt importieren. Fehlt eine erforderliche Klassifizierung, wartet die Abholung und erhält das Original beim Quellanbieter.

Ein nativer Adapter ergänzt die Spamklassifizierung um ein begrenztes Sprachmodellsignal mit gpt6-luna. Parallelität, Warteschlange, Laufzeit und Eingabegröße sind begrenzt. Betreff- und Textauszüge liefern die Klassifizierung; das Modell kann weder Links aufrufen noch Werkzeuge ausführen. Das Nutzungsledger speichert Laufzeiten und Tokenzahlen statt Nachrichteninhalten. Konventionelle SMTP-Filterung kann ohne dieses Zusatzsignal weiterlaufen; Kollektoren warten, wenn ein erforderliches Urteil fehlt. Zwei ClamAV-Instanzen übernehmen die Schadsoftwareprüfung.

<figure class="mail-diagram stalwart-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="SMTP und Abholung führen zum selben Postfachbestand; die Policy wählt den ausgehenden Transport. Auf schmalen Bildschirmen seitlich scrollen.">
    <img src="/diagrams/stalwart/de-delivery.svg" alt="SMTP und Abholung führen zum selben Postfachbestand; die Policy wählt den ausgehenden Transport." loading="lazy" decoding="async" />
  </div>
  <figcaption>SMTP und Abholung führen zum selben Postfachbestand; die Policy wählt den ausgehenden Transport. <a href="/diagrams/stalwart/de-delivery.svg">Diagramm vergrößern</a>. Auf schmalen Bildschirmen seitlich scrollen.</figcaption>
</figure>

Etwa 95 Prozent der ausgehenden Mail laufen über Amazon SES. Der übrige Pfad stellt direkt über natives IPv4 nach Best Effort zu. Stalwarts Queue und Routingpolicy verbinden beide Wege: Der gewählte Transport ändert sich, die wartende Nachricht gehört weiter zum gemeinsamen Mailspeicher. EHLO, SPF, DKIM und DMARC bleiben auf die Absenderidentität abgestimmt.

### Wiederherstellung umfasst den Zustand um das Postfach

Ein Datenbank-Restore allein würde Abholfortschritt, Helper-Authentifizierung und TLS-Identität auslassen. Der native Backuppfad sichert deshalb den Helper-Zustand vor einem konsistenten logischen PostgreSQL-Export. Velero überträgt Export und Helper-Volumes mit restic-Verschlüsselung nach Backblaze B2 und sichert auch Namespace-Konfiguration, Laufzeit-Secrets und Zertifikatsmaterial für die Wiederherstellung. Recovery prüft die Reihenfolge: Ein Kollektor-Checkpoint, der neuer ist als die zurückgespielte Maildatenbank, könnte Nachrichten überspringen.

<figure class="mail-diagram stalwart-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Helper-Checkpoints liegen vor dem Datenbankexport. Recovery führt beides wieder zusammen.">
    <img src="/diagrams/stalwart/de-recovery.svg" alt="Helper-Checkpoints liegen vor dem Datenbankexport. Recovery führt beides wieder zusammen." loading="lazy" decoding="async" />
  </div>
  <figcaption>Helper-Checkpoints liegen vor dem Datenbankexport. Recovery führt beides wieder zusammen. <a href="/diagrams/stalwart/de-recovery.svg">Diagramm vergrößern</a>.</figcaption>
</figure>

Ich habe die vollständige Datenbank mit rund 25 GB in einer isolierten Recovery-Umgebung wiederhergestellt: 27 Tabellen, geprüft mit `pg_restore` und `pg_amcheck`. Die Anmeldung mit dem wiederhergestellten Laufzeit-Secret funktionierte; ein falsches Passwort wurde abgewiesen. Alle sechs Kollektor-Ledger bestanden Integritätsprüfungen einschließlich ihrer inkrementellen Checkpoints. Helper-Zustand, Virendatenbanken und wiederhergestellte Secrets wurden ebenfalls geprüft. Der alte Quellhost ist aus dem Mailpfad ausgeschieden, einschließlich seiner früheren Backup- und Zertifikatsjobs.

So bleibt die öffentliche Identität stabil, während Verbindungen, Anwendungsreplikate und Datenbank-Primaries eigene Lebenszyklen haben. Genau diese Architektur wollte ich mit der Migration erreichen: Jede Schicht hat eine klare Aufgabe, und ein zusätzliches Mailreplikat erzeugt keinen weiteren Postfachbestand, den ich abgleichen muss.

### Stalwarts Architektur

Die beschriebene Implementierung ist auf Stalwart 0.16.27 festgelegt. Die [typisierte Registry](https://github.com/stalwartlabs/stalwart/blob/aa47d8ef7bfba7200d3293198ac2592747b20e73/crates/registry/src/schema/structs.rs), [Koordinatorauswahl](https://github.com/stalwartlabs/stalwart/blob/aa47d8ef7bfba7200d3293198ac2592747b20e73/crates/coordinator/src/bootstrap.rs) sowie [Queue-Persistenz und Sperren](https://github.com/stalwartlabs/stalwart/blob/aa47d8ef7bfba7200d3293198ac2592747b20e73/crates/smtp/src/queue/spool.rs) sind Mechanismen von Stalwart selbst.
