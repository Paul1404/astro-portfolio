---
title: "PDCD Web GitOps"
publishDate: 2026-10-31 00:00:00
description: "Website-Deployments per Pull von GitHub zu rootless Podman: mit unveränderlichen Releases, getrennten Site-Konten, SQL-basierten Bereitschaftsprüfungen und Anwendungs-Rollback."
stack:
  - Python
  - GitHub Actions
  - Podman
  - systemd Quadlet
  - Caddy
  - CloudFront
  - CloudFormation
  - Rocky Linux
tags:
  - GitOps
  - Infrastructure
  - CI/CD
  - Security
featured: true
featuredOrder: 7
icon: git-pull-request
---

Mit PDCD Web GitOps betreibe ich Websites und unterstützende Dienste auf demselben Rocky-Linux-Host wie meine [Mailplattform](/de/projects/pdcd-mail/), mit getrennten Deployment-Berechtigungen. Dazu gehören WordPress- und REDAXO-Websites sowie über Image-Digests festgelegte Umami- und Vaultwarden-Deployments.

Die zentrale Grenze ist einfach: GitHub veröffentlicht Sollzustand und geprüfte Artefakte. Ein unprivilegiertes Konto auf dem Host entscheidet, was es davon anwenden darf. CI besitzt keinen administrativen SSH-Zugang zum Server. Jede Site hat ein eigenes Konto, Containernetz, persistente Daten und systemd-Units.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Release- und Deploymentpfad. Auf kleinen Bildschirmen seitlich scrollen.">
    <img src="/diagrams/web-gitops/de-delivery.svg" alt="Release- und Deploymentpfad: Vom geprüften Build zum lesenden Host-Abgleich. CI besitzt keinen administrativen Serverzugang." width="920" height="459" loading="lazy" decoding="async" />
  </div>
  <figcaption>Vom geprüften Build zum lesenden Host-Abgleich. CI besitzt keinen administrativen Serverzugang. <a href="/diagrams/web-gitops/de-delivery.svg">Diagramm vergrößern</a>. Auf kleinen Bildschirmen seitlich scrollen.</figcaption>
</figure>

### Vom geprüften Quellcode zum unveränderlichen Release

Die CMS-Buildquellen liegen in einem öffentlichen Repository. GitHub Actions baut und prüft die tatsächlichen Anwendungs- und Caddy-Origin-Images mit isolierten Testdaten. Die Prüfungen umfassen Datenbankbereitschaft, erhaltenen Zustand nach Neustarts, die Validierung des Origin-Headers und Anwendungsfunktionen wie den WordPress-Redaktionslogin.

Nach erfolgreicher Quellcode-CI veröffentlicht der Release-Workflow Image-Archive mit SHA-256-Prüfsummen und exakten Image-IDs. Ein getrenntes Sollzustandsmanifest legt Anwendungs-, Datenbank- und Origin-Image fest. Das Deployment folgt diesen Festlegungen statt einem veränderlichen Tag. Upstream-Anwendungen verwenden unveränderliche Registry-Digests und einen eigenen Reconciler.

Die automatische Promotion ist bewusst eng begrenzt: Ein Release-Branch darf nur das Manifest einer einzelnen Site ändern. Die Verifikation muss erfolgreich sein, bevor der Workflow seinen Promotion-PR öffnet und zusammenführt. Das ist eine Workflow-Schranke und keine pauschale Branch-Protection für manuelle Infrastrukturänderungen.

### Der Host zieht Updates mit begrenzten Rechten

Jedes Site-Konto prüft den Sollzustand ungefähr alle zwei Minuten über einen systemd-User-Timer. Der Python-Reconciler validiert eine explizite Freigabeliste für Site, Hostname, Port und Artefakte. Neue Release-Archive werden vor dem Laden anhand ihrer Prüfsumme kontrolliert. Anschließend wird geprüft, ob das festgelegte Image vorhanden ist. Eine Prozesssperre verhindert überlappende Deployments.

Das Konto verwaltet ausschließlich seine rootless Podman-Container und Quadlet-Units und besitzt keine sudo-Rechte. Für den Repository-Zugriff nutzt der Host einen eigenen, nur lesenden Schlüssel. Die Zugangsdaten zur Release-Promotion erlauben keine Anmeldung am Server. Laufzeitvariablen, Datenbankexporte und private Schlüssel bleiben außerhalb von Git und Release-Artefakten.

SELinux bleibt aktiv. Ressourcenlimits pro Site lassen Kapazität für den Mailbetrieb. Der Web-Controller verwaltet weder Stalwart noch dessen Zugangsdaten oder Zertifikatserneuerung. Die Dienste sind auf einem gemeinsamen Host getrennt; dessen Ausfall bleibt die Verfügbarkeitsgrenze.

### Bereitschaft entscheidet über den Verbleib eines Updates

Ein laufender Proxy beweist noch keine funktionierende Website. Der HTTPS-Bereitschaftspfad erreicht die Anwendung und führt lesende SQL-Prüfungen aus. Vor einem CMS-Anwendungsupdate prüft der Controller den freien Speicherplatz und erstellt einen Datenbanksnapshot. Die angewendete Revision wird erst nach erfolgreicher Bereitschaftsprüfung festgehalten.

Scheitert das neue Anwendungsrelease, stellt der Controller die vorherigen Anwendungs- und Origin-Images wieder her und prüft die Bereitschaft erneut. Die Datenbankinhalte bleiben erhalten. Änderungen am Datenbank-Image und an der CMS-Basis benötigen eine getrennte Kompatibilitätsprüfung, weil ein älteres Image keine Schemaänderung rückgängig macht. Auch persistierter WordPress-Core und Plugins brauchen einen eigenen Updateprozess. Der Austausch des Theme-Images ist kein vollständiges CMS-Upgrade.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Bereitschaft und Rollback. Auf kleinen Bildschirmen seitlich scrollen.">
    <img src="/diagrams/web-gitops/de-rollback.svg" alt="Bereitschaft und Rollback: Anwendungs-Rollback erhält die Datenbank. Änderungen an Datenbank und CMS-Basis benötigen eine eigene Prüfung." width="960" height="920" loading="lazy" decoding="async" />
  </div>
  <figcaption>Anwendungs-Rollback erhält die Datenbank. Änderungen an Datenbank und CMS-Basis benötigen eine eigene Prüfung. <a href="/diagrams/web-gitops/de-rollback.svg">Diagramm vergrößern</a>. Auf kleinen Bildschirmen seitlich scrollen.</figcaption>
</figure>

### CloudFront am Rand, geschützte Origins dahinter

Besucher erreichen die regulären HTTPS-Domains über CloudFront. Caddy terminiert Origin-TLS und verlangt für Anwendungsrouten den Verifikationsheader der jeweiligen Site. Der Bereitschaftsendpunkt ist die bewusst nicht authentifizierte Ausnahme. Anwendung und Datenbank bleiben in privaten Netzen pro Site.

CloudFormation hält die zugehörige Origin-, Edge- und DNS-Konfiguration fest. Website-Zertifikate haben vom Mailbetrieb getrennte Erneuerungspfade. Die Deployment-Verifikation unterscheidet ein zusammengeführtes Manifest von einem funktionierenden Release: angewendeter Hostzustand, Containeridentität, öffentliches HTTPS, SQL-Bereitschaft und die Ablehnung direkter Origin-Zugriffe liefern jeweils eigene Belege.

### Migration und Wiederherstellung mit einem schreibenden System

Der Umzug erhielt CMS-Inhalte, Uploads, Redaktionskonten und Anwendungseinstellungen. Für die abschließende Übertragung wurden Schreibzugriffe und geplante Aufgaben auf der alten Plattform gesperrt, bevor Dateien und logische Datenbanken kopiert wurden. Erst nach Daten- und Funktionsprüfungen wurde der Verkehr umgeschaltet.

Die bisherige Hostingumgebung bleibt als gestoppte Rückfallmöglichkeit erhalten. Sie wird nicht laufend repliziert. Ein Rückwechsel nach neuen Schreibzugriffen erfordert, das aktive System anzuhalten und seinen aktuellen Datenbestand zu übertragen, bevor der Verkehr zurückkehrt. Eine alte Kopie ist nur dann eine brauchbare Rückfallmöglichkeit, wenn dabei keine neueren Inhalte verloren gehen.

### Ergebnis

Derselbe Pull-Controller deployt mehrere getrennt verwaltete Sites, ohne CI einen Administratorschlüssel für den Server zu geben. Releases sind eindeutig identifizierbar, der regelmäßige Abgleich läuft ohne Operatorsitzung, und fehlgeschlagene Anwendungsupdates haben einen begrenzten Wiederherstellungspfad. Die öffentlichen [Anwendungs-Buildquellen](https://github.com/Paul1404/web-services) sind von der privaten Infrastrukturkonfiguration getrennt.
