---
title: "Vertex Kubernetes Platform"
publishDate: 2026-11-08 00:00:00
description: "Eine RKE2-Plattform mit vier Knoten für Websites und Anwendungen, mit Fleet, repliziertem Speicher, S3-kompatiblem Objektspeicher sowie automatisiertem HTTPS und DNS."
stack:
  - RKE2
  - Kubernetes
  - Rancher Fleet
  - Longhorn
  - Garage S3
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

Heute läuft Vertex auf vier RKE2-Knoten mit openSUSE Leap. Dort betreibe ich eigene Anwendungen wie Kontor2, Rendant, Kataster, Fortuna und Remise, daneben Paperless, Vaultwarden und mehrere Websites. Mein Maildienst bleibt auf einem eigenen Host.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Architektur der Vertex-Plattform. Auf kleinen Bildschirmen seitlich scrollen.">
    <img src="/diagrams/vertex/de-architecture.svg" alt="Vertex-Architektur mit öffentlichem Routing, Fleet-Abgleich, Garage-Objektspeicher und Longhorn-Volumes auf vier RKE2-Knoten." width="552" height="941" loading="lazy" decoding="async" />
  </div>
  <figcaption>So greifen Zugriff, Deployments und Speicher auf Vertex ineinander. <a href="/diagrams/vertex/de-architecture.svg">Diagramm vergrößern</a>.</figcaption>
</figure>

### Eine Plattform für den eigenen Betrieb

Drei Knoten betreiben die Control Plane und das eingebettete etcd; ein vierter ergänzt Kapazität für Anwendungen. Ich verwalte den Cluster mit Rancher. Fleet gleicht die Dienste mit einem privaten Git-Repository ab. GitHub Actions baut und prüft die Anwendungsimages. Geprüfte Digests werden anschließend in die Deployment-Konfiguration übernommen.

Für den öffentlichen Zugriff leitet Traefik Anfragen über die Kubernetes Gateway API weiter. cert-manager stellt Zertifikate aus, ExternalDNS und Route 53 verwalten ausgewählte DNS-Einträge. Bestehende Websites behalten ihre CloudFront-Distributionen und geschützten Origins.

### Die Daten mitnehmen

Der Umzug bestand nicht nur darin, Container auszutauschen. Paperless-Dokumente, Passworttresore, CMS-Datenbanken und Anwendungsdateien mussten vollständig ankommen. Für die letzte Übertragung habe ich jeweils die alte schreibende Instanz gestoppt, die Daten auf Vertex wiederhergestellt und mit der Quelle verglichen. Bei Paperless gehörte dazu ein Prüfsummenvergleich der Originaldateien, beim Objektspeicher die Prüfung der Dateien und Anwendungszugriffe.

Longhorn stellt heute replizierte Volumes für Anwendungsdateien und Datenbanken bereit. Mit einem Testvolume habe ich eine Anwendung zwischen Knoten verschoben und ihre Daten anschließend zurückgelesen. Für Anwendungen mit Objektspeicher habe ich Garage integriert und die Dateien in private S3-kompatible Buckets mit getrennten Zugangsdaten migriert. Kontor2 nutzt signierte Uploads und Downloads, Remise trennt den Zugriff auf Anwendungsdaten und Medien.

### Vom Umzug zum täglichen Betrieb

Auf Vertex laufen inzwischen persönliche Werkzeuge und Software, die von realen Organisationen genutzt wird. Das hat auch die letzten Schritte geprägt: Bestehende Hostnamen und Medienpfade mussten erhalten bleiben, Releases einen nachvollziehbaren Weg vom Quellcode in den Cluster bekommen und Health Checks tatsächlich die Bereitschaft eines Dienstes abbilden.

Ein Beispiel ist Kontor2: Die Liveness-Prüfung ist von der Bereitschaftsprüfung für abhängige Dienste getrennt. Eine langsame Datenbank führt dadurch nicht automatisch zum Neustart des Anwendungsprozesses. Paperless betreibt seinen KI-Adapter für Dokumente ebenfalls innerhalb des Clusters.

Das Ergebnis ist eine Plattform, auf der ich meine Dienste entwickle, bereitstelle und betreibe. Anwendung und Infrastruktur gehören dabei zum selben Projekt. Das Infrastruktur-Repository ist privat; die [Build-Quellen der Website-Anwendungen](https://github.com/Paul1404/web-services) sind öffentlich.
