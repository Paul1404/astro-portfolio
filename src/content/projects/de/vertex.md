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

- Anwendungsquellen: [Kontor2](https://github.com/Paul1404/kontor2), [Rendant](https://github.com/Paul1404/rendant), [Kataster](https://github.com/Paul1404/kataster), [Fortuna](https://github.com/Paul1404/fortuna) und [Website-Builds](https://github.com/Paul1404/web-services).
- Plattformdokumentation: [RKE2](https://docs.rke2.io/), [Rancher Fleet](https://fleet.rancher.io/), [Longhorn](https://longhorn.io/docs/) und [Garage](https://garagehq.deuxfleurs.fr/).
- Routing und Automatisierung: [Kubernetes Gateway API](https://gateway-api.sigs.k8s.io/), [cert-manager](https://cert-manager.io/docs/) und [ExternalDNS](https://kubernetes-sigs.github.io/external-dns/).
