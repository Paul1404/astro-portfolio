---
title: "RHEL Updates at Scale: Satellite, Foreman, and the Art of Not Breaking Everything 🚦"
publishDate: 2024-05-13 00:00:00
img: /assets/redhat.png
img_alt: Red Hat Satellite dashboard and a rack of servers
description: |
  How I use Red Hat Satellite to manage updates for my RHEL VMs, why it’s way more than just a repo mirror, and how to plan your patching workflow for sanity and uptime.
tags:
  - RHEL
  - Satellite
  - Foreman
  - Patch Management
  - Automation
  - Errata
---

## RHEL Updates at Scale: Satellite, Foreman, and the Art of Not Breaking Everything 🚦

If you’re running more than a couple of RHEL VMs, you’ll quickly realize that just pointing them at the internet for updates is a recipe for chaos (and slow, too).
You *could* set up a local repo mirror with `reposync`—but if you want real control, reporting, and a workflow that won’t break your stuff, you want **Red Hat Satellite** (or [Foreman](https://theforeman.org/) if you’re not on RHEL).

---

### 1. **Why Not Just Use a Repo Mirror?**

A local repo mirror is great for speed and saving bandwidth.
But it’s just a “dumb” copy of whatever’s upstream.
- No version control
- No staging or testing
- No idea what’s actually changed or what’s a security fix

If you want to do more than just “update everything, always,” you need something smarter.

---

### 2. **Satellite/Foreman: Real Lifecycle Management**

I run **Red Hat Satellite** (the paid, supported version of Foreman/Katello).
This is a *lot* more than just a repo server:

- **Content Views:**
  Freeze a set of packages, promote them through lifecycle environments (Dev → Test → Prod), and only roll out updates when you’re ready.
- **Errata-based patching:**
  See exactly which security, bugfix, or enhancement updates are available. You can patch only for CVEs, or only for critical bugs, and leave the rest for later.
- **Host Groups & Activation Keys:**
  Standardize how new VMs register, what repos they get, and what config is applied.
- **Golden Patch Workflow:**
  Test updates in dev, promote to staging, then to production. No more “hope for the best” patching.

> **Important:**
> If you want to use Foreman with official RHEL content, you *must* have a valid Satellite subscription to generate a manifest. No manifest, no official RHEL repos. (Yes, it’s real. I wish it wasn’t.)

If you’re on CentOS, Rocky, Alma, etc., you can use Foreman without the manifest hassle.

---

### 3. **Planning Your Updates: Errata vs. Bulldoze**

With Satellite/Foreman, you get to *plan* your patching:

- **Errata-based patching:**
  Only apply security updates (errata), or only specific bugfixes. You can see exactly what’s being patched and why.
- **Golden patch workflow:**
  Promote tested updates through environments. You know what’s in prod, and you can roll back if needed.
- **Automated patching (`dnf-automatic`):**
  If you just want to “fire and forget,” you can enable `dnf-automatic` on your VMs. This will install all available updates on a schedule.
  But: you lose control, and you might get surprises if something breaks.

**My advice:**
If you care about uptime, compliance, or just not breaking stuff, use errata-based patching and a staged workflow.
If you’re just running a homelab and don’t mind the occasional breakage, `dnf-automatic` is fine.

---

### 4. **Client Registration: The Real Satellite/Foreman Way**

To register a RHEL system to Satellite, you don’t just run a generic command.
**You generate a custom registration command from the Satellite/Foreman web UI:**

- Go to **Hosts → Register Host**.
- Fill in your Organization, Location, Host Group, OS, and Activation Key.
- The UI gives you a command like:

    ```sh
    set -o pipefail && curl -sS 'https://satellite.yourdomain.net/register?activation_keys=YOURKEY&hostgroup_id=1&location_id=2&operatingsystem_id=1&organization_id=1&update_packages=false' -H 'Authorization: Bearer <token>' | bash
    ```

- Paste this into your new host. Done!

This command does all the heavy lifting: registration, repo setup, group assignment, and more.
**No more guessing activation keys or CLI flags.**

> **Note:**
> You need a working Satellite/Foreman server, a valid activation key, and the right permissions to generate and use this command.
> Also, Satellite is not a “just run it on a Raspberry Pi” solution—you’ll need at least 300GB+ of storage and a real server.

---

### 5. **DNF Tweaks for Performance**

Even with Satellite, you can make updates faster:

- **Enable parallel downloads:**
  Edit `/etc/dnf/dnf.conf` and add:
  ```
  max_parallel_downloads=10
  ```
  (You can go higher if your server and network can handle it.)

- **Don’t use `fastestmirror` with Satellite/local repos:**
  It just adds overhead—your Satellite is always the fastest.

- **Clean up old cache:**
  ```
  dnf clean all
  ```

---

### 6. **Why Bother With All This?**

- **Reporting:**
  See which hosts are missing which patches, and why.
- **Compliance:**
  Prove to your boss (or yourself) that everything is up to date.
- **Control:**
  No more “oops, that update broke everything at 3am.”

---

### Final Thoughts

Satellite/Foreman is a bit of work to set up, but if you’re running more than a handful of RHEL VMs, it’s a game changer.
You get real control, real reporting, and a workflow that actually makes sense.
If you just want “latest everything, always,” `dnf-automatic` is your friend—but don’t be surprised if something breaks.

**Got questions, want to rant about Red Hat licensing, or need help with your patch workflow? [Email me](mailto:contact@pd-portfolio.net) or hit me up on [GitHub](https://github.com/Paul1404)!**

---

*PS: If you’re just getting started, check out the [official Satellite docs](https://docs.redhat.com/en/documentation/red_hat_satellite/6.17/html/installing_satellite_server_in_a_connected_network_environment/index) (Red Hat account required). And remember: always test your patches before you go to prod!*