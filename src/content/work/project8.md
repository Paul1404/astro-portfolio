---
title: "Skalierbare Docker-Swarm-Umgebung mit geteiltem vSAN-Storage und Docker Secrets" 
publishDate: 2024-11-25 00:00:00 
img: /assets/docker_swarm_banner.png 
img_alt: A visual representation of Docker Swarm and vSAN integration 
description: | 
 In diesem Projekt habe ich eine Docker-Swarm-Umgebung mit einem vSAN-basierten, replizierten Fileshare eingerichtet, um skalierbare Container-Dienste zu betreiben. Sicherheitsvorteile wurden durch den Einsatz von Docker Secrets maximiert. 
tags:
  - Docker Swarm
  - vSAN
  - Secrets
  - Cloudflare Tunnel
---


**Skalierbare Docker-Swarm-Umgebung mit geteiltem vSAN-Storage und Docker Secrets**

In meinem neuesten Projekt habe ich meine bestehende Docker-Umgebung auf eine skalierbare Docker-Swarm-Umgebung migriert. Dabei nutze ich die Vorteile von vSAN-Storage für replizierte Daten und Docker Secrets zur sicheren Verwaltung sensibler Informationen.

### **Features & Vorteile**

* **Docker Swarm mit repliziertem Storage**: Verteilte Dienste auf drei Swarm-Nodes mit einem vSAN-gestützten, replizierten Fileshare sorgen für Redundanz und hohe Verfügbarkeit.
* **Sichere Geheimnisse mit Docker Secrets**: Vertrauliche Daten wie Passwörter und API-Schlüssel werden sicher gespeichert und nur für autorisierte Dienste zugänglich gemacht.
* **Zentrale Dienste migriert**: Wichtige Dienste wie Vaultwarden, PostgreSQL, Grafana, InfluxDB und Twingate-Connectoren laufen nun in einer skalierbaren und replizierten Umgebung.
* **Cloudflare Tunnel**: Sichere Verbindungen für externe Zugriffe auf interne Dienste.

### **Setup im Detail**

#### **vSAN-gestützter Fileshare**

Um replizierten Speicher über die Docker-Swarm-Nodes hinweg bereitzustellen, wurde ein vSAN-Fileshare konfiguriert:

1. **vSAN-Fileshare erstellen**: Auf dem vSAN-Cluster ein Fileshare konfigurieren und die Export-Berechtigungen für Docker-Nodes einrichten.
2. **NFS-Mount in Docker-Swarm-Nodes einrichten**:
    
    ```bash
    sudo mkdir -p /mnt/vsan_share
    sudo mount -t nfs <vSAN-IP>:/path/to/share /mnt/vsan_share
    ```
    

#### **Docker Swarm erstellen**

Ich habe einen Swarm mit drei Nodes eingerichtet: einen Manager und zwei Worker. Die Schritte:

1. **Swarm initialisieren**:
    
    ```bash
    docker swarm init --advertise-addr <Manager-IP>
    ```
    
2. **Worker-Nodes hinzufügen**: Auf den Worker-Nodes den von `docker swarm join-token worker` bereitgestellten Befehl ausführen.
    
3. **Shared Storage in Docker Compose einbinden**: In den Compose-Dateien wird das vSAN-Mount als Volumen definiert:
    
    ```yaml
    volumes:
      shared-storage:
        driver_opts:
          type: "nfs"
          o: "addr=<vSAN-IP>,rw"
          device: ":/path/to/share"
    ```
    

#### **Docker Secrets nutzen**

Zur sicheren Verwaltung sensibler Daten werden Docker Secrets eingesetzt. Beispiel für die Erstellung eines Secrets:

```bash
echo "my-secure-password" | docker secret create postgres_password -
```

In der Docker-Compose-Datei werden Secrets wie folgt referenziert:

```yaml
services:
  postgres:
    image: postgres:latest
    secrets:
      - postgres_password
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/postgres_password
secrets:
  postgres_password:
    external: true
```

#### **Migration der bestehenden Dienste**

Folgende Dienste wurden migriert und repliziert:

1. **Vaultwarden mit PostgreSQL**:
    
    * Vaultwarden läuft nun mit replizierter PostgreSQL-Datenbank.
    * Docker Secrets sichern die Zugangsdaten.
2. **Grafana und InfluxDB**:
    
    * Grafana greift auf Daten aus einer replizierten InfluxDB zu.
    * Dashboards sind über Cloudflare Tunnel extern erreichbar.
3. **Twingate und Cloudflare Tunnel**:
    
    * Beide Connectoren sorgen für sichere und schnelle Verbindungen, sowohl intern als auch extern.

### **Automatisierung und Skalierbarkeit**

Ich habe die Dienste in Docker Compose-Dateien definiert und mithilfe von `docker stack deploy` orchestriert. Die gesamte Umgebung ist so konzipiert, dass sie leicht skaliert werden kann, indem Worker-Nodes hinzugefügt oder Dienste repliziert werden.

```bash
docker stack deploy -c docker-compose.yml my_stack
```

* * *

Mit dieser Docker-Swarm-Umgebung habe ich einen wichtigen Schritt in Richtung Kubernetes gemacht, ohne die Komplexität direkt übernehmen zu müssen. 