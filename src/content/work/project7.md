---
title: "Automatisierte Backups von Proxmox VE Containern auf ein NFS-Share mit E-Mail Benachrichtigung via Sendgrid API 📧"
publishDate: 2024-07-28 00:00:00
img: /assets/proxmox_banner.png
img_alt: A visual representation of Proxmox VE backups
description: |
  In diesem Projekt habe ich eine automatisierte Backup-Lösung für Proxmox VE Container auf ein NFS-Share mit E-Mail-Benachrichtigung über die Sendgrid API eingerichtet.
tags:
  - Proxmox
  - Backup
  - NFS
  - Sendgrid
---

## **Automatisierte Backups von Proxmox VE Containern auf ein NFS-Share mit E-Mail Benachrichtigung via Sendgrid API 📧**

In diesem Projekt habe ich eine automatisierte Backup-Lösung für Proxmox VE Container entwickelt. Die Backups werden auf einem NFS-Share auf meinem NAS gespeichert und bei Abschluss des Backups wird eine E-Mail-Benachrichtigung über die Sendgrid API versendet.

### **Features & Vorteile**

* **Automatisierte Backups**: Regelmäßige, automatisierte Backups der Proxmox VE Container sorgen für Datensicherheit und stellen sicher, dass immer aktuelle Sicherungen verfügbar sind.

* **NFS-Share**: Die Nutzung eines NFS-Shares auf meinem NAS ermöglicht eine zentrale Speicherung und einfache Verwaltung der Backups.

* **E-Mail Benachrichtigung**: Mit der Integration der Sendgrid API erhalte ich sofortige E-Mail-Benachrichtigungen über den Status der Backups, wodurch ich immer informiert bin, ob die Backups erfolgreich waren oder nicht.

### **Setup im Detail**

#### **NFS-Share einrichten**

Auf meinem NAS habe ich ein NFS-Share eingerichtet, das von Proxmox VE als Ziel für die Backups verwendet wird. Hier sind die grundlegenden Schritte:

1. **NFS-Share erstellen**: Auf dem NAS ein neues NFS-Share erstellen und die Berechtigungen konfigurieren.
2. **Proxmox VE konfigurieren**: Das NFS-Share in Proxmox VE hinzufügen:
   ```bash
   pvesm add nfs BackupNFS --server <NAS-IP> --export /path/to/nfs/share --content backup
   ```

#### **Backup-Skript erstellen**

Ein Bash-Skript wird erstellt, um die Backups durchzuführen und anschließend eine E-Mail-Benachrichtigung zu senden:

```bash
#!/bin/bash

# Backup-Verzeichnis
BACKUP_DIR="/mnt/pve/BackupNFS/dump"

# Container-IDs zum Backup
CONTAINERS=(101 102 103)

# Backup-Datum
DATE=$(date +"%Y-%m-%d")

# Sendgrid API Key
SENDGRID_API_KEY="YOUR_SENDGRID_API_KEY"
EMAIL_FROM="your-email@example.com"
EMAIL_TO="recipient@example.com"

# Backup durchführen und Status speichern
for CTID in "${CONTAINERS[@]}"
do
  vzdump $CTID --dumpdir $BACKUP_DIR --mode snapshot --compress gzip
  if [ $? -eq 0 ]; then
    BACKUP_STATUS="erfolgreich"
  else
    BACKUP_STATUS="fehlgeschlagen"
  fi

  # E-Mail-Benachrichtigung
  EMAIL_SUBJECT="Backup Status für Container $CTID am $DATE"
  EMAIL_BODY="Das Backup für Container $CTID war $BACKUP_STATUS."

  curl -X POST \
    --url https://api.sendgrid.com/v3/mail/send \
    --header "Authorization: Bearer $SENDGRID_API_KEY" \
    --header "Content-Type: application/json" \
    --data '{
      "personalizations": [{
        "to": [{"email": "'"$EMAIL_TO"'"}],
        "subject": "'"$EMAIL_SUBJECT"'"
      }],
      "from": {"email": "'"$EMAIL_FROM"'"},
      "content": [{
        "type": "text/plain",
        "value": "'"$EMAIL_BODY"'"
      }]
    }'
done
```

#### **Cronjob einrichten**

Um die Backups regelmäßig durchzuführen, wird ein Cronjob eingerichtet:

```bash
# Crontab öffnen
crontab -e

# Backup-Skript täglich um 2 Uhr morgens ausführen
0 2 * * * /path/to/backup-script.sh
```

### **Für Tech-Enthusiasten und Entwickler**

Für alle, die tiefer in die technische Seite eintauchen möchten oder darüber nachdenken, diese Backup-Lösung für ihre eigenen Projekte zu verwenden, ist der gesamte Code auf GitHub verfügbar.

[**Zum GitHub-Repository**](https://github.com/proxmox/backup-scripts)

Dort findet ihr detaillierte Informationen über:

* **Skript-Setup**: Wie das Backup-Skript erstellt und konfiguriert wird.
* **NFS-Integration**: Schritte zur Integration des NFS-Shares mit Proxmox VE.
* **Sendgrid API**: Wie die E-Mail-Benachrichtigungen über die Sendgrid API konfiguriert werden.

* * *

Abschließend möchte ich betonen, wie wichtig es ist, regelmäßig Backups zu erstellen und deren Erfolg zu überwachen. Mit dieser automatisierten Lösung kann ich sicherstellen, dass meine Proxmox VE Container regelmäßig gesichert werden und ich sofort über den Status informiert werde. Wenn ihr Fragen oder Anregungen habt, hinterlasst gerne einen Kommentar im Repository oder kontaktiert mich direkt.
