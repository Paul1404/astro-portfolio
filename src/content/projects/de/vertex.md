---
title: "Vertex Kubernetes Platform"
publishDate: 2026-11-08 00:00:00
description: "Eine RKE2-Plattform mit vier Knoten für Websites und Anwendungen, mit Fleet, repliziertem Speicher, S3-kompatiblem Objektspeicher, externen Backups sowie automatisiertem HTTPS und DNS."
stack:
  - RKE2
  - Kubernetes
  - Rancher Fleet
  - Longhorn
  - Garage S3
  - Velero
  - Backblaze B2
  - Traefik
  - cert-manager
  - Amazon Route 53
  - openSUSE Leap
tags:
  - Infrastructure
  - Kubernetes
  - GitOps
  - Migration
featured: true
featuredOrder: 1
icon: server
screenshot:
  image: rancher
  alt: "Rancher-by-SUSE-Logo mit blauer Kuh und schwarzem Schriftzug"
  caption: "Offizielles Rancher-by-SUSE-Markenmotiv."
---

Meine Websites und Anwendungen waren ihrem ursprünglichen Zuhause entwachsen: einem einzelnen Server, auf dem vom Dokumentenarchiv bis zur Vereinsverwaltung alles zusammenlief. Mit Vertex habe ich eine Plattform aufgebaut, die ich selbst betreiben und erweitern kann. Anschließend habe ich die Anwendungen samt Daten umgezogen, ohne dass Nutzer neue Adressen oder Abläufe lernen mussten.

Heute läuft Vertex auf vier RKE2-Knoten mit openSUSE Leap. Dort betreibe ich eigene Anwendungen wie [Kontor2](/de/projects/kontor2/), [Rendant](/de/projects/rendant/), [Kataster](/de/projects/kataster/), [Fortuna](/de/projects/fortuna/) und [Remise](/de/projects/remise/), daneben Paperless, Vaultwarden und mehrere Websites. Mein Maildienst bleibt auf einem eigenen Host.

<figure class="mail-diagram vertex-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Architektur der Vertex-Plattform.">
    <img src="/diagrams/vertex/de-architecture.svg" alt="Vertex-Architektur mit öffentlichem Routing, Fleet-Abgleich, Garage-Objektspeicher und Longhorn-Volumes auf vier RKE2-Knoten." width="615" height="1099" loading="lazy" decoding="async" />
  </div>
  <figcaption>So greifen Zugriff, Deployments und Speicher auf Vertex ineinander. <a href="/diagrams/vertex/de-architecture.svg">Diagramm vergrößern</a>.</figcaption>
</figure>

### Eine Plattform für den eigenen Betrieb

Drei Knoten betreiben die Control Plane und das eingebettete etcd; ein vierter ergänzt Kapazität für Anwendungen. Ich verwalte den Cluster mit Rancher. Fleet gleicht die Dienste mit einem privaten Git-Repository ab. GitHub Actions baut und prüft die Anwendungsimages. Geprüfte Digests werden anschließend in die Deployment-Konfiguration übernommen.

<figure class="mail-diagram vertex-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Ablauf der Anwendungsbereitstellung.">
    <picture>
      <source media="(max-width: 600px)" srcset="/diagrams/vertex/de-delivery-mobile.svg" />
      <img src="/diagrams/vertex/de-delivery.svg" alt="Anwendungscode gelangt über GitHub Actions und GHCR zu Fleet und einem Kubernetes-Workload." width="552" height="111" loading="lazy" decoding="async" />
    </picture>
  </div>
  <figcaption>Von der geprüften Quellcodeänderung zum laufenden Dienst. <a href="/diagrams/vertex/de-delivery.svg">Diagramm vergrößern</a>.</figcaption>
</figure>

<figure class="vertex-screenshot">
  <a href="/images/vertex/fleet.webp"><img src="/images/vertex/fleet.webp" alt="Rancher-Continuous-Delivery-Dashboard mit den Vertex-Fleet-Bundles und ihrem Abgleichstatus." width="1600" height="753" loading="lazy" decoding="async" /></a>
  <figcaption>Fleet-Ansicht der Plattform- und Anwendungs-Bundles. Aufnahme aus dem Betrieb, November 2026.</figcaption>
</figure>

Für den öffentlichen Zugriff leitet Traefik Anfragen über die Kubernetes Gateway API weiter. cert-manager stellt Zertifikate aus, ExternalDNS und Route 53 verwalten ausgewählte DNS-Einträge. Bestehende Websites behalten ihre CloudFront-Distributionen und geschützten Origins.

<figure class="vertex-screenshot">
  <a href="/images/vertex/nodes.webp"><img src="/images/vertex/nodes.webp" alt="Rancher-Knotenliste mit drei Control-Plane-Knoten und einem Worker im Vertex-Cluster." width="1600" height="753" loading="lazy" decoding="async" /></a>
  <figcaption>Der Vier-Knoten-Cluster in Rancher. Aufnahme aus dem Betrieb, November 2026.</figcaption>
</figure>

### Die Daten mitnehmen

Der Umzug bestand nicht nur darin, Container auszutauschen. Paperless-Dokumente, Passworttresore, CMS-Datenbanken und Anwendungsdateien mussten vollständig ankommen. Für die letzte Übertragung habe ich jeweils die alte schreibende Instanz gestoppt, die Daten auf Vertex wiederhergestellt und mit der Quelle verglichen. Bei Paperless gehörte dazu ein Prüfsummenvergleich der Originaldateien, beim Objektspeicher die Prüfung der Dateien und Anwendungszugriffe.

Longhorn stellt heute replizierte Volumes für Anwendungsdateien und Datenbanken bereit. Mit einem Testvolume habe ich eine Anwendung zwischen Knoten verschoben und ihre Daten anschließend zurückgelesen. Für Anwendungen mit Objektspeicher habe ich Garage integriert und die Dateien in private S3-kompatible Buckets mit getrennten Zugangsdaten migriert. Kontor2 nutzt signierte Uploads und Downloads, Remise trennt den Zugriff auf Anwendungsdaten und Medien.

<figure class="mail-diagram vertex-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Architektur der persistenten Daten.">
    <img src="/diagrams/vertex/de-storage.svg" alt="Anwendungen nutzen Longhorn für Datenbank- und Dateivolumes sowie Garage-Objektspeicher, mit drei Longhorn-Volume-Replikaten." width="596" height="490" loading="lazy" decoding="async" />
  </div>
  <figcaption>Anwendungsdaten, Objektspeicher und replizierte Volumes. <a href="/diagrams/vertex/de-storage.svg">Diagramm vergrößern</a>.</figcaption>
</figure>

### Backups und Wiederherstellung

Longhorn repliziert Volumes über mehrere Knoten. Gelöschte Dateien und fehlerhafte Datenbankeinträge landen ebenfalls auf diesen Replikaten. Deshalb habe ich [Velero](https://velero.io/docs/v1.18/) mit externem Speicher in [Backblaze B2](https://www.backblaze.com/docs/cloud-storage-s3-compatible-api) ergänzt. Fleet verwaltet tägliche Backups von 13 Anwendungs-Namespaces und Garage mit 30 Tagen Aufbewahrung.

Vor den Namespace-Backups laufen Datenbankexporte. PostgreSQL liefert einen Datenbank-Dump und die globalen Rollen, MariaDB einen SQL-Dump. Die Dateien liegen auf eigenen Export-Volumes und werden zusammen mit den Anwendungsdaten gesichert. Velero erstellt Longhorn-CSI-Snapshots. Anschließend übertragen seine Node Agents deren Inhalt per [CSI Snapshot Data Movement](https://velero.io/docs/v1.18/csi-snapshot-data-movement/) nach B2.

<figure class="mail-diagram vertex-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Ablauf der externen Vertex-Backups.">
    <img src="/diagrams/vertex/de-backup.svg" alt="Datenbankexporte fließen in tägliche Velero-Backups ein. Node Agents lesen Longhorn-CSI-Snapshots und übertragen die Daten für 30 Tage aus Vertex nach Backblaze B2." width="346" height="605" loading="lazy" decoding="async" />
  </div>
  <figcaption>Von Datenbankexporten und Volume-Snapshots zur externen Kopie. <a href="/diagrams/vertex/de-backup.svg">Diagramm vergrößern</a>.</figcaption>
</figure>

Bei Garage müssen Metadaten und Objektdaten zusammenpassen. Ein Hook erstellt einen Online-Snapshot der Metadaten, bevor Velero die beiden Volumes erfasst. Den Restore habe ich auch während des Überschreibens eines synthetischen Objekts getestet: Die wiederhergestellte Instanz lieferte das unveränderte Referenzobjekt und eine vollständige Version des überschriebenen Objekts mit passenden Prüfsummen zurück. Der Monitor prüft den Metadaten-Hook und begrenzt das Zeitfenster für die Snapshot-Übergabe auf neun Minuten. Garage wartet zehn Minuten, bevor es nicht mehr referenzierte Blöcke löscht.

Für Restores beginne ich mit einem lesenden B2-Zugriff und einem isolierten Namespace mit Default-Deny-Netzwerkregeln. Zuerst stelle ich Volumes und Secrets wieder her. Dann importiere ich den Datenbankexport in eine kompatible Datenbank und prüfe die Anwendung. Produktive Routen und geplante Jobs bleiben aus dem Test heraus. Für die B2-Zugangsdaten und das Velero-Repository-Passwort gibt es unabhängige Wiederherstellungskopien außerhalb des Clusters. Fleet liefert die Deployment-Definitionen; lokale etcd-Snapshots von RKE2 dienen separat der Wiederherstellung der Control Plane.

<figure class="mail-diagram vertex-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Ablauf einer isolierten Anwendungswiederherstellung.">
    <img src="/diagrams/vertex/de-recovery.svg" alt="Die Wiederherstellung liest B2-Backups auf neue Volumes in einem isolierten Namespace, importiert Datenbankrollen und Daten und prüft Dateien, Objekte und Anwendungszugriffe vor einer produktiven Umschaltung." width="303" height="621" loading="lazy" decoding="async" />
  </div>
  <figcaption>Die Wiederherstellung beginnt getrennt vom produktiven Datenverkehr. <a href="/diagrams/vertex/de-recovery.svg">Diagramm vergrößern</a>.</figcaption>
</figure>

Bei einem DiaTrack-Restore in einen separaten lokalen Cluster habe ich die Volumes aus B2 und alle acht PostgreSQL-Tabellen im Schema `public` wiederhergestellt. Auch die PostgreSQL-Exporte von Fortuna und Monica sowie Wengertsbergs MariaDB-Export wurden in isolierten Tests zurückgespielt. Das verschlüsselte Paperless-AI-Volume und sein Schlüssel ließen sich auf Vertex wiederherstellen. Der vollständige verschlüsselte Restore auf einem neuen Cluster steht noch aus.

Der Backup-Health-Job prüft aktuelle Exporte, erfolgreiche Backups und einen abgeschlossenen Upload für jedes aktuelle Volume. Er meldet Teilfehler, pausierte Zeitpläne und überalterte Backups. Ein externer AWS-Beobachter liest den letzten erfolgreichen Lauf des Health-Jobs über Systems Manager und meldet ihn an CloudWatch. So kann auch ein ausgefallener Cluster-Check einen Alarm auslösen.

### Vom Umzug zum täglichen Betrieb

Auf Vertex laufen inzwischen persönliche Werkzeuge und Software, die von realen Organisationen genutzt wird. Das hat auch die letzten Schritte geprägt: Bestehende Hostnamen und Medienpfade mussten erhalten bleiben, Releases einen nachvollziehbaren Weg vom Quellcode in den Cluster bekommen und Health Checks tatsächlich die Bereitschaft eines Dienstes abbilden.

Ein Beispiel ist Kontor2: Die Liveness-Prüfung ist von der Bereitschaftsprüfung für abhängige Dienste getrennt. Eine langsame Datenbank führt dadurch nicht automatisch zum Neustart des Anwendungsprozesses. Paperless betreibt seinen KI-Adapter für Dokumente ebenfalls innerhalb des Clusters.

<figure class="vertex-screenshot">
  <a href="/images/vertex/cluster.webp"><img src="/images/vertex/cluster.webp" alt="Rancher-Cluster-Dashboard mit Vertex-Ressourcen, Knoten, Deployments und Kapazität." width="1600" height="753" loading="lazy" decoding="async" /></a>
  <figcaption>Das Cluster-Dashboard im laufenden Betrieb. Aufnahme aus dem Betrieb, November 2026.</figcaption>
</figure>

Das Ergebnis ist eine Plattform, auf der ich meine Dienste entwickle, bereitstelle und betreibe. Anwendung und Infrastruktur gehören dabei zum selben Projekt. Das Infrastruktur-Repository ist privat. Die Anwendungsquellen und Plattformdokumentation zeigen die Bausteine dahinter.

Live-Anwendungen: [Kontor2](https://kontor2.com), [Rendant](https://rendant.sv-untereuerheim.de) und [Remise](https://app.remise.pdcd.net).

### Quellcode und Referenzen

- Anwendungsquellen: [Kontor2](https://github.com/Paul1404/kontor2), [Rendant](https://github.com/Paul1404/rendant), [Kataster](https://github.com/Paul1404/kataster), [Fortuna](https://github.com/Paul1404/fortuna) und [Container-Builds](https://github.com/Paul1404/vertex-images).
- Plattformdokumentation: [RKE2](https://docs.rke2.io/), [Rancher Fleet](https://fleet.rancher.io/), [Longhorn](https://longhorn.io/docs/) und [Garage](https://garagehq.deuxfleurs.fr/).
- Routing und Automatisierung: [Kubernetes Gateway API](https://gateway-api.sigs.k8s.io/), [cert-manager](https://cert-manager.io/docs/) und [ExternalDNS](https://kubernetes-sigs.github.io/external-dns/).
- Backup und Wiederherstellung: [Velero-Restore-Referenz](https://velero.io/docs/v1.18/restore-reference/), [Garage-Wiederherstellung](https://garagehq.deuxfleurs.fr/documentation/operations/recovering/#corrupted_meta), [Backblaze B2](https://www.backblaze.com/docs/cloud-storage-s3-compatible-api) und [RKE2-etcd-Snapshots](https://docs.rke2.io/datastore/backup_restore).
