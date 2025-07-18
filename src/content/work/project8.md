---
title: "How I Enabled Checkmk to Monitor Internet Hosts—Even on a Locked-Down Appliance (Tailscale Static Binary Hack!)"
publishDate: 2025-07-19 01:00:00
img: /assets/checkmk-tailscale-homelab.png
img_alt: Checkmk and Tailscale Static Binary Hack
description: |
  Learn how to monitor any internet, cloud, or CGNAT host with your internal Checkmk appliance—even if you can't install packages! This guide shows how to use the Tailscale static binary and a custom script for secure, zero-trust monitoring.
tags:
  - Checkmk
  - Tailscale
  - Static Binary
  - Appliance
---

## How to Monitor Internet or Cloud Hosts with Checkmk—Even on a Locked-Down Appliance (Tailscale Static Binary Hack!)

**Want to monitor a cloud server, VPS, or remote Linux host with Checkmk—even if your Checkmk server is a locked-down appliance that doesn’t allow package installs?**  
Here’s the hack: use the Tailscale static binary and a custom startup script to bridge your internal Checkmk server to any internet host, securely and with zero public exposure.

---

### Why This Hack?

- **Checkmk appliances** often block `apt` or `yum` installs for support reasons.
- **Tailscale** is the easiest way to connect to remote/cloud/CGNAT hosts, but usually needs a package install.
- **The solution:** Download the Tailscale static binary, run it manually, and use a script for startup!

---

### Step 1: Download and Extract the Tailscale Static Binary

On your Checkmk appliance:

```sh
cd /usr/local/bin
curl -fsSL https://pkgs.tailscale.com/stable/tailscale_latest_amd64.tgz -o tailscale_latest_amd64.tgz
tar xzf tailscale_latest_amd64.tgz
cp tailscale_*/tailscale tailscale_*/tailscaled .
rm -rf tailscale_* tailscale_latest_amd64.tgz
```

---

### Step 2: Start Tailscale with a Custom Script

Create `/usr/local/bin/start-tailscale.sh`:

```sh
#!/bin/bash
/usr/local/bin/tailscaled > /var/log/tailscaled.log 2>&1 &
sleep 2
/usr/local/bin/tailscale up
```

Make it executable:

```sh
chmod +x /usr/local/bin/start-tailscale.sh
```

---

### Step 3: (Optional) Auto-Start Tailscale on Boot

If your appliance supports `/etc/rc.local` or cron `@reboot`, add:

```sh
/usr/local/bin/start-tailscale.sh
```

Or add to your crontab:

```sh
crontab -e
@reboot /usr/local/bin/start-tailscale.sh
```

---

### Step 4: Authenticate and Join Your Tailnet

Run the script:

```sh
sudo /usr/local/bin/start-tailscale.sh
```

- Follow the URL to authenticate your Checkmk appliance to your Tailscale network.

---

### Step 5: Monitor Any Internet/Cloud Host

- Install Tailscale and the Checkmk agent on your remote/cloud host.
- Set the host’s IP in Checkmk to its Tailscale address.
- Secure the agent with firewall rules to only allow Tailscale traffic.

---

### Real-World Output

**Checkmk now monitors remote hosts over Tailscale—even from a locked-down appliance:**

```plaintext
Service         State   Summary
-----------------------------------------------
Check_MK        OK      Success, execution time 2.3 sec
CPU load        OK      15 min load: 0.26
Memory          OK      27.97% used
Interface 6     OK      [tailscale0] up, speed unknown
Uptime          OK      72 days 23 hours
...
```

---

### Troubleshooting & Lessons Learned

- **No package manager? No problem!** The static binary works anywhere.
- **No public ports, no NAT/CGNAT pain:** Tailscale “just works.”
- **Logs are redirected to `/var/log/tailscaled.log` for easy debugging.**
- **For unattended startup, use a reusable Tailscale auth key in your script.**

---

## Why This Works

- **Tailscale static binaries** run on almost any Linux, even locked-down appliances.
- **No need to expose Checkmk or agent ports to the public internet.**
- **Works with any cloud, VPS, or Starlink/CGNAT host.**
- **Perfect for hybrid, home lab, or enterprise setups.**