---
title: "PowerDNS mit PowerDNS-Admin und Postgres-Datenbank: Ein vollständiger Docker-Compose-Stack 🚀"
publishDate: 2024-07-28 00:00:00
img: /assets/powerdns.png
img_alt: A visual representation of the PowerDNS architecture
description: |
  In diesem Projekt habe ich PowerDNS Resolver und Authoritative zusammen mit PowerDNS-Admin und einer Postgres-Datenbank in einem vollständigen Docker-Compose-Stack eingerichtet.
tags:
  - PowerDNS
  - Docker-Compose
  - PostgreSQL
---

## **PowerDNS mit PowerDNS-Admin und Postgres-Datenbank: Ein vollständiger Docker-Compose-Stack 🚀**

In diesem Projekt habe ich den PowerDNS Resolver und den PowerDNS Authoritative Server zusammen mit PowerDNS-Admin in einem vollständigen Docker-Compose-Stack eingerichtet. Diese Lösung nutzt eine Postgres-Datenbank zur Speicherung der DNS-Zonen und ermöglicht eine einfache Verwaltung über eine Weboberfläche.

### **Features & Vorteile**

* **Zentralisierte Verwaltung**: Mit PowerDNS-Admin kann ich alle DNS-Zonen und -Einträge über eine benutzerfreundliche Weboberfläche verwalten. Dies erleichtert die Verwaltung und reduziert die Fehleranfälligkeit.

* **Leistungsstarke DNS-Server**: Der PowerDNS Resolver und der Authoritative Server bieten hohe Leistung und Zuverlässigkeit für sowohl rekursive als auch autoritative DNS-Abfragen.

* **Postgres-Datenbank**: Die Nutzung einer Postgres-Datenbank sorgt für eine robuste und skalierbare Speicherung der DNS-Daten.

### **Setup im Detail**

#### **Docker-Compose-Konfiguration**

Die Docker-Compose-Datei definiert die Services für den Resolver, den Authoritative Server, die PowerDNS-Admin-Weboberfläche und die Postgres-Datenbank. Hier ist ein Beispiel für die `docker-compose.yml`:

```yaml
version: '3'

services:
  pdns-authoritative:
    image: powerdns/pdns-auth:latest
    container_name: pdns-authoritative
    environment:
      - PDNS_gmysql_host=db
      - PDNS_gmysql_user=pdns
      - PDNS_gmysql_password=pdns_password
      - PDNS_gmysql_dbname=pdns
    ports:
      - "53:53"
      - "53:53/udp"
    depends_on:
      - db

  pdns-recursor:
    image: powerdns/pdns-recursor:latest
    container_name: pdns-recursor
    ports:
      - "5353:53"
      - "5353:53/udp"

  powerdns-admin:
    image: ngoduykhanh/powerdns-admin:latest
    container_name: powerdns-admin
    environment:
      - SQLALCHEMY_DATABASE_URI=postgresql://pdns:pdns_password@db/pdns
    ports:
      - "80:80"
    depends_on:
      - db

  db:
    image: postgres:latest
    container_name: pdns-db
    environment:
      - POSTGRES_USER=pdns
      - POSTGRES_PASSWORD=pdns_password
      - POSTGRES_DB=pdns
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

#### **PowerDNS-Konfiguration**

Die Konfiguration von PowerDNS erfolgt über Umgebungsvariablen in der `docker-compose.yml`. Hier sind einige der wichtigsten Variablen:

* `PDNS_gmysql_host`: Die Host-Adresse der Postgres-Datenbank.
* `PDNS_gmysql_user`: Der Benutzername für den Datenbankzugriff.
* `PDNS_gmysql_password`: Das Passwort für den Datenbankzugriff.
* `PDNS_gmysql_dbname`: Der Name der Datenbank.

#### **PowerDNS-Admin-Konfiguration**

PowerDNS-Admin verbindet sich mit der Postgres-Datenbank und ermöglicht die Verwaltung der DNS-Zonen über eine Weboberfläche. Die Verbindung zur Datenbank wird durch die Umgebungsvariable `SQLALCHEMY_DATABASE_URI` konfiguriert.

### **Für Tech-Enthusiasten und Entwickler**

Für alle, die tiefer in die technische Seite eintauchen möchten oder darüber nachdenken, diesen Stack für ihre eigenen Projekte zu verwenden, ist der gesamte Code auf GitHub verfügbar.

[**Zum GitHub-Repository**](https://github.com/powerdns/powerdns)

Dort findet ihr detaillierte Informationen über:

* **Deployment**: Wie PowerDNS in einem Docker-Compose-Stack bereitgestellt wird.
* **Konfiguration**: Wie man PowerDNS und PowerDNS-Admin konfiguriert.
* **Integration**: Schritte zur Integration weiterer Dienste und Anwendungen mit PowerDNS.

* * *

Abschließend möchte ich betonen, wie wichtig es ist, immer die besten DNS-Sicherheits- und Verwaltungspraktiken zu verfolgen. Mit dieser PowerDNS-Lösung kann ich nun beruhigt arbeiten, wissend, dass meine DNS-Dienste effizient und sicher laufen. Wenn ihr Fragen oder Anregungen habt, hinterlasst gerne einen Kommentar im Repository oder kontaktiert mich direkt.
