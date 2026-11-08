---
title: "Vertex Kubernetes Platform"
publishDate: 2026-11-08 00:00:00
description: "Eine RKE2-Plattform mit drei Knoten für Websites und persönliche Anwendungen, mit Fleet-Deployments, repliziertem Speicher und verwaltetem HTTPS und DNS."
stack:
  - RKE2
  - Kubernetes
  - Rancher Fleet
  - Longhorn
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
  image: vertexDe
  alt: "Diagramm der Vertex-Plattform mit Fleet, HTTPS-Gateway, drei RKE2-Knoten und Longhorn"
  caption: "Architekturdiagramm der Vertex-Plattform."
---

Vertex ist die Kubernetes-Plattform, mit der ich meine Websites und persönlichen Anwendungen von einem zunehmend ausgelasteten Einzelserver auf drei Knoten verschoben habe. Sie läuft auf drei virtuellen Maschinen mit jeweils sechs vCPUs und 12 GB Arbeitsspeicher in einem privaten Netzwerk. Darauf betreibe ich WordPress- und REDAXO-Websites sowie Paperless, Vaultwarden, Umami und Monica CRM. Mein Maildienst bleibt getrennt.

Das Projekt baut auf einem früheren Website-Deployment auf einem einzelnen Host auf. Dessen Release-Prozess war klar strukturiert, Anwendungen und Daten teilten sich aber eine Maschine. Vertex führt Konfiguration, Netzwerk und Speicher auf einer Plattform zusammen, die ich mit Kubernetes und Rancher verwalte.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Architektur der Vertex-Plattform. Auf kleinen Bildschirmen seitlich scrollen.">
    <img src="/diagrams/vertex/de-architecture.svg" alt="Vertex-Architektur mit öffentlichem Zugriff, Gateway-API-Routing, Fleet-Abgleich und Longhorn-Speicher auf drei RKE2-Knoten." width="552" height="825" loading="lazy" decoding="async" />
  </div>
  <figcaption>Öffentlicher Zugriff, Anwendungsbereitstellung und replizierter Speicher auf Vertex. <a href="/diagrams/vertex/de-architecture.svg">Diagramm vergrößern</a>. Auf kleinen Bildschirmen seitlich scrollen.</figcaption>
</figure>

### Eine Plattform mit drei Knoten

Die Knoten habe ich mit openSUSE Leap und RKE2 eingerichtet. Für die Kommunikation innerhalb des Clusters nutzen sie das private Netzwerk. Alle drei Server beteiligen sich an der Control Plane und dem eingebetteten etcd. Rancher stellt die Verwaltungsoberfläche bereit; Fleet liest den Sollzustand aus einem privaten Repository.

Jede Anwendung besitzt einen eigenen Namespace, Services, Persistent Volume Claims und eine Deployment-Konfiguration. Zugangsdaten werden getrennt von Git bereitgestellt. Website-Releases werden in GitHub Actions gebaut und geprüft, als unveränderliche Images veröffentlicht und in das Fleet-Repository übernommen. Kubernetes lädt die festgelegten Images und gleicht die Workloads ab.

### Speicher, der mit einer Anwendung umziehen kann

Zuvor lagen die Anwendungsdaten auf Volumes eines einzelnen Hosts. Auf Vertex stellt Longhorn persistente Volumes mit jeweils drei Replikaten über die Knoten hinweg bereit. Fällt ein Knoten aus, kann eine Anwendung auf einem anderen Knoten mit ihren Daten neu starten.

Das habe ich mit einem Testvolume geprüft: Daten, die auf einem Knoten geschrieben wurden, ließen sich nach dem Verschieben der Anwendung auf einem zweiten Knoten lesen. Replikation ersetzt kein externes Backup. Eine einzelne Anwendungs- oder Datenbankinstanz benötigt außerdem Zeit für Neustart und Volume-Anbindung. Beim ersten Umzug waren automatisierte externe Backups und deren Wiederherstellung noch offen.

### HTTPS und Routing

Traefik stellt ein Kubernetes-Gateway mit HTTPRoutes bereit. cert-manager bezieht das Wildcard-Zertifikat über DNS-Validierung in Route 53; ExternalDNS verwaltet ausgewählte Anwendungsrecords. Drei Route-53-Health-Checks steuern die öffentlichen Edge-Adressen.

Bestehende Website-Domains laufen weiterhin über CloudFront. Das Gateway prüft dabei den Origin-Zugang. Die DNS-Health-Checks zeigen, ob der Ingress erreichbar ist. Sie prüfen nicht die Gesundheit jeder einzelnen Anwendung dahinter. DNS-Caching beeinflusst zudem, wie schnell Clients einen nicht verfügbaren Knoten verlassen.

### Der Umzug der Anwendungen

Paperless, Vaultwarden, Umami und die drei CMS-Websites habe ich einzeln umgezogen. Vor dem abschließenden Kopieren von Datenbanken und Dateien wurde jeweils die alte schreibende Anwendung gestoppt. Anschließend wurden die bestehenden öffentlichen Adressen auf Vertex umgestellt. Die alten Daten bleiben als gestoppte Wiederherstellungskopie erhalten.

Die Prüfungen richteten sich nach den jeweiligen Daten: Die 285 Originaldateien aus Paperless wurden per Prüfsumme verglichen, die wiederhergestellte Vaultwarden-Datenbank enthielt weiterhin ihre Tresoreinträge und Umami seine sieben Website-Definitionen. Nach dem Umzug wurden die Website-Startseiten und die REDAXO-Anmeldeseite geprüft. Für eine Rückkehr zum alten Host müssten zunächst die seitdem auf Vertex entstandenen Änderungen übertragen werden.

### Was noch offen ist

Drei Control-Plane-Mitglieder und replizierte Volumes bedeuten noch keinen unterbrechungsfreien Betrieb. Die meisten Anwendungen und Datenbanken laufen zunächst als einzelne Instanzen. Der RKE2-Registrierungsendpunkt hängt weiterhin von einem Knoten ab. Externe Backups, Verschlüsselung der neuen Anwendungsvolumes und Wiederherstellungstests bleiben wichtige nächste Schritte.

Vertex ist für mich eine praktische Plattform, um einen Kubernetes-Stack zu lernen und zu betreiben, ohne die Grenzen einer kleinen Umgebung mit drei Knoten auszublenden. Die Infrastrukturkonfiguration ist privat; die [Build-Quellen der Website-Anwendungen](https://github.com/Paul1404/web-services) sind öffentlich.
