---
title: "What's Actually Running in My Homelab? A Tour of My Homarr Dashboard"
publishDate: 2025-05-14
img: /assets/homelab.png
img_alt: Screenshot of my Homarr dashboard with all my lab services
description: |
  Ever wondered what a real homelab looks like in 2025? Here's a peek at my Homarr dashboard and the services, apps, and infrastructure that keep my digital world running.
tags:
  - homelab
  - infrastructure
  - self-hosted
  - dashboard
  - virtualization
---

People always ask: "What do you even run in your lab?"
Well, here's the answer - straight from my [Homarr](https://homarr.dev/) dashboard, the nerve center of my home datacenter.

### Network Infrastructure

- **PA-820**: Palo Alto firewall, running real enterprise App-ID rules, VLAN segmentation, and subinterfaces. All traffic is segmented - WiFi and Home zones can only hit a DNS proxy (Technitium), get NTP, or access HTTPS via Traefik, all tightly controlled.
- **Zyxel Nebula**: My new WiFi and LAN management (Unifi is retired - Zyxel + PA-820 is the new combo).
- **MikroTik SwOS CSS326 & CSS610**: Yes, I have real datacenter switches too, not just these boxes.
- **Technitium DNS-Server**: Local DNS, with split DNS for internal/external URLs. Internal URLs resolve to local IPs, but if I need outside access, Cloudflare Zero Trust handles it.
- **DrayTek Vigor Modem**: My link to the outside world.
- **PHPipam**: IP address management, for tracking IP allocations at scale.

### vSphere Infrastructure

- **hldca-vca-17833.pdcd.net**: vCenter Appliance.
- **hldca-esx-17829/30/31/32.pdcd.net**: ESXi hosts, running most of my VMs.

### Operations Infrastructure

- **checkmk.pdcd.net**: Monitoring everything, all the time.
- **HashiCorp Vault**: Only for PKI - no secrets, just my own CA for internal certs.
- **Portainer**: Docker container management, with a nice UI.
- **OpenSpeedTest**: For when I want to see if my network is actually as fast as I think it is.
- **Traefik Dashboard**: Handles all my HTTPS, even on the local LAN. All URLs are signed and routed by Traefik.
- **RedHat Satellite**: For patching and managing all those RHEL VMs.
- **HP OfficeJet**: Yes, even the printer gets a dashboard link.
- **Authentik**: SSO and authentication for all my apps. (WIP, but getting there.)

### Self-Hosted Applications

- **PWPusher**: Share passwords securely.
- **IT-Tools**: Swiss Army knife for IT tasks.
- **Vaultwarden**: Self-hosted Bitwarden alternative.
- **Planka**: Kanban board for project management.

### Public Cloud Infrastructure

- **CF Dashboard & Zero-Trust**: Cloudflare for DNS, security, and tunnels. If I need to access something from outside, it's via Zero Trust.
- **NetCup Customer/Server Control Panel**: For my public servers.
- **iCloud, GitHub, Zyxel Nebula**: Because not everything is self-hosted.

### Lights Out Management

- **Dell OpenManage Enterprise**: For wrangling all the Dell hardware.
- **hldca-lom-idrac-17820/21/22.pdcd.net**: iDRAC interfaces for remote power and monitoring.

### Media

- **JellyFin**: My own Netflix.
- **Prowlarr, Radarr, Sonarr**: Automated media management.
- **qBittorrent**: Torrent client.
- **JellySeerr**: Media requests and discovery.

## Security and Segmentation

- **Split DNS**: Internal URLs resolve to local IPs, external via Cloudflare Zero Trust.
- **HTTPS everywhere**: All URLs, even on LAN, are signed and routed by Traefik.
- **Network segmentation**: VLANs, subinterfaces, and strict App-ID rules on the PA-820. WiFi and Home zones are locked down - only DNS proxy, NTP, and HTTPS to Traefik are allowed.

## What This Setup Enables

Because I can.
But seriously, this setup lets me:

- Learn enterprise tech at home
- Automate everything
- Keep my data private
- Experiment with new tools
- Never get bored
