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

Vertex ist die Kubernetes-Plattform, auf der ich meine Websites, persönlichen Anwendungen und Vereinssoftware zusammengeführt habe. Vier virtuelle Maschinen mit jeweils sechs vCPUs und 12 GB Arbeitsspeicher betreiben openSUSE Leap und RKE2 in einem privaten Netzwerk. Auf der Plattform laufen WordPress- und REDAXO-Websites, Paperless, Vaultwarden und Monica CRM sowie Anwendungen wie Kontor2, Rendant, Kataster, Fortuna und Remise. Mein Stalwart-Maildienst bleibt auf einem eigenen Host.

Aus einem Website-Deployment auf einem einzelnen Server ist eine Plattform für unterschiedliche Anwendungen mit gemeinsamer Bereitstellung, Netzwerk- und Speicherverwaltung entstanden. Ich habe die Infrastruktur entworfen und betreibe sie, die Anwendungen umgezogen und ihre Deployment-Pipelines angepasst.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Architektur der Vertex-Plattform. Auf kleinen Bildschirmen seitlich scrollen.">
    <img src="/diagrams/vertex/de-architecture.svg" alt="Vertex-Architektur mit öffentlichem Routing, Fleet-Abgleich, Garage-Objektspeicher und Longhorn-Volumes auf vier RKE2-Knoten." width="552" height="941" loading="lazy" decoding="async" />
  </div>
  <figcaption>Öffentlicher Zugriff, Anwendungsbereitstellung und Speicher auf Vertex. <a href="/diagrams/vertex/de-architecture.svg">Diagramm vergrößern</a>. Auf kleinen Bildschirmen seitlich scrollen.</figcaption>
</figure>

### Kubernetes und GitOps

Drei RKE2-Server bilden die Control Plane mit eingebettetem etcd. Ein vierter Knoten ergänzt Kapazität für Workloads. Rancher stellt die Verwaltungsoberfläche bereit. Fleet gleicht Plattformkomponenten und Anwendungskonfigurationen aus einem privaten Git-Repository ab, mit getrennten Bundles für die einzelnen Dienste.

Die Anwendungen laufen in eigenen Namespaces mit Kubernetes-Services, Health Checks und Ressourceneinstellungen. Zugangsdaten werden getrennt von Git bereitgestellt. GitHub Actions baut und prüft die Anwendungsimages, bevor sie in GHCR veröffentlicht werden. Geprüfte Image-Digests werden in die Fleet-Konfiguration übernommen und von Kubernetes bereitgestellt.

### Persistente Volumes und Objektspeicher

Longhorn stellt replizierte persistente Volumes für Anwendungsdateien und Datenbanken bereit. Mit einem Testvolume habe ich geprüft, dass sich Daten nach dem Verschieben einer Anwendung auf einen anderen Knoten wieder lesen lassen. Die Volumes nutzen drei Replikate. Anwendungen und Datenbanken können dabei als einzelne aktive Instanz laufen, wenn ihr Datenmodell das verlangt.

Für S3-kompatiblen Objektspeicher habe ich Garage in den Cluster integriert und Anwendungsdateien in getrennte private Buckets mit eigenen Zugangsdaten migriert. Fortuna speichert dort Dokumente, Kontor2 nutzt signierte Uploads und Downloads, und Remise trennt Anwendungsdaten vom Medienzugriff. Rendant verwendet einen eigenen Bucket. So liegt der Objektspeicher auf derselben Plattform, während der Zugriff je Anwendung getrennt bleibt.

### Öffentliches Routing und Zertifikate

Traefik stellt ein Kubernetes-Gateway mit HTTPRoutes bereit. cert-manager bezieht Zertifikate über DNS-Validierung, ExternalDNS verwaltet ausgewählte Route-53-Records. Health-geprüfte DNS-Einträge leiten öffentliche Anfragen an die Ingress-Knoten. Bestehende Website-Domains laufen weiterhin über CloudFront; das Gateway prüft den Origin-Zugang.

### Umzug laufender Anwendungen

Paperless, Vaultwarden, Umami und drei CMS-Websites habe ich vom ursprünglichen Host umgezogen. Danach folgten Anwendungen und Datenbanken von Railway. Der Ablauf richtete sich jeweils nach den Daten und öffentlichen Schnittstellen: alte schreibende Instanz stoppen, Daten übertragen und wiederherstellen, Routing umstellen und das Ergebnis prüfen.

Die Prüfungen waren auf die Dienste abgestimmt. Paperless-Originaldateien wurden per Prüfsumme verglichen, wiederhergestellte Datenbanken mit ihren Quellen abgeglichen und Objekte per Prüfsumme sowie über Anwendungszugriffe geprüft. Öffentliche Hostnamen und Medienpfade blieben erhalten, wo sie benötigt wurden. Die alten Anwendungsvolumes auf dem ursprünglichen Host wurden nach den Migrationen entfernt.

### Betrieb der Plattform

Zum gemeinsamen Betrieb gehören auch passende Health Checks und eine nachvollziehbare Bereitstellung. Für Kontor2 habe ich Liveness von der Prüfung der abhängigen Dienste getrennt. Eine langsame Datenbank führt damit nicht automatisch zum Neustart des Anwendungsprozesses. Paperless ergänzt seinen Dokumentenablauf um einen KI-Adapter innerhalb des Clusters.

Vertex verbindet Infrastrukturarbeit mit dem Umzug und Betrieb realer Anwendungen. Die Infrastrukturkonfiguration ist privat; die [Build-Quellen der Website-Anwendungen](https://github.com/Paul1404/web-services) sind öffentlich.
