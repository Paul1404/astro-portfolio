---
title: "Automating NSX‑T Certificate Management: From Manual API Calls to a Python Toolkit 🔐"
publishDate: 2025-09-07 00:00:00
img: /assets/nsx-logo.png
img_alt: NSX-T Certificate Automation
description: |
  Replacing VMware NSX‑T self‑signed SSL certificates is a tedious, manual process. In this post, I show how I automated the workflow with a Python toolkit: listing, validating, and assigning certificates to the cluster VIP and manager nodes — all from a single CLI.
tags:
  - VMware
  - NSX-T
  - SSL
  - Certificates
  - Automation
  - Python
---

---

## From Manual to Automated: NSX‑T Certificates 🔐

Out of the box, **VMware NSX‑T** uses self‑signed certificates for its cluster and manager nodes.  
That’s fine for a lab, but in production you need **CA‑signed certificates** for security and trust.  

Traditionally, replacing these certs involves a lot of **manual OpenSSL work and API calls**.  
In this post, I’ll show how I automated the process with a **Python toolkit** I wrote: [`nsx-api.py`](https://github.com/Paul1404/nsx-api.sh).

---

## Why Automate?

- **Manual = error‑prone**: copy‑pasting cert IDs, repeating API calls per node.  
- **Repetition**: every cluster upgrade or cert renewal means doing it all again.  
- **Visibility**: hard to see which cert is in use, or when it expires.  

Automation gives you:  
- One CLI to manage certs.  
- Expiry warnings and validation built‑in.  
- Apply to all manager nodes in one go.  

---

## The Challenges (Manual Way)

Following Gareth Lewis’ excellent [guide](https://www.vgarethlewis.com/2021/03/23/replacing-the-vmware-nsx-t-self-signed-ssl-certificate/), the manual workflow looks like this:

1. Generate CSR + private key with OpenSSL.  
2. Submit CSR to CA, download signed cert + chain.  
3. Manually build certificate chain file.  
4. Import into NSX‑T via UI.  
5. Disable CRL checking (API call).  
6. Validate certificate (API call).  
7. Apply to cluster VIP (API call).  
8. Apply to each manager node (API call per node).  
9. Verify in browser.  

That’s a lot of steps — and easy to mess up.

---

## The Automated Workflow

With my Python toolkit, the workflow looks like this:

1. **Import your CA‑signed certificate** into NSX‑T (UI or API).  
   *(CSR/CA submission is still manual for now — roadmap item!)*  

2. **Run the toolkit**:
   ```bash
   uv run nsx-api.py
   ```

3. **List certificates**  
   Shows all certs, highlights expired/expiring ones, and marks the current VIP cert.  

4. **Validate certificate**  
   One menu option runs the API validation.  

5. **Apply to cluster VIP**  
   One click, no curl commands.  

6. **Apply to all manager nodes**  
   One command applies the cert to every node in the cluster.  

7. **Show assignments**  
   Displays which certs are in use, with expiry info.  

---

## Features

- **List & highlight** expiring/expired certs.  
- **Validate** certs via API.  
- **Disable CRL checking** automatically.  
- **Apply certs** to cluster VIP, single node, or all nodes.  
- **Show assignments** in a clean table.  
- **Raw API mode** for advanced users.  
- **Logging** to `/var/log/nsx-api.log` with rotation.  

---

## Example Run

```text
NSX-T Certificate/API Management
1) List certificates
2) Validate certificate
3) Disable CRL checking
4) Apply certificate to cluster VIP
5) Apply certificate to manager node
6) Apply certificate to ALL manager nodes
7) Show current certificate assignments
8) Raw API call
0) Exit
```

- Pick a cert → validate → apply to cluster → apply to all nodes.  
- Done. No curl, no Postman, no copy‑pasting IDs.  

---

## Lessons Learned

- **Automation saves time**: especially when certs expire every year.  
- **Visibility matters**: expiry warnings prevent outages.  
- **Still some manual steps**: CSR generation and CA submission are next on the roadmap.  
- **Extensible**: the same framework can manage other NSX‑T APIs (segments, firewall, etc.).  

---

## Final Thoughts

Replacing NSX‑T self‑signed certs used to be a tedious, manual process.  
With this toolkit, it’s now a **repeatable, interactive, and automatable workflow**.  

👉 [Check out the project on GitHub](https://github.com/Paul1404/nsx-api.sh)

---