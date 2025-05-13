---
title: "Getting Started with Arista EOS: CLI Survival Guide for GUI Switch Users 🖥️➡️⌨️"
publishDate: 2024-05-13 00:00:00
img: /assets/arista.png
img_alt: An Arista banner
description: |
  My quickstart guide for anyone who just got their hands on a real Arista datacenter switch and is used to the friendly GUIs of Mikrotik, TP-Link, or Ubiquiti. Here’s what you need to know to get started with EOS CLI!
tags:
  - Arista
  - EOS
  - Networking
  - Datacenter
  - CLI
---

---

### So You Got an Arista Switch… Now What?

If you’re like me, you started your networking journey with something like Mikrotik, TP-Link, or Ubiquiti—clicky, colorful GUIs, lots of wizards, and maybe a little CLI on the side. Then you get your hands on a real datacenter switch, like an Arista running EOS, and suddenly it’s all about the command line.

Here’s my “golden” reference for getting started, so you don’t have to dig through PDFs or get lost in the help menus.

---

### 1. **Connecting to the Switch**

- **Console cable:** Plug in, use PuTTY, minicom, or `screen` (e.g. `screen /dev/ttyUSB0 9600`).
- **Default login:** Usually `admin` with no password (change this ASAP!).

---

### 2. **Basic Navigation**

- `enable` — Enter privileged mode (like “admin” mode).
- `configure terminal` — Enter config mode.
- `show running-config` — See the current config.
- `show version` — See software/hardware info.
- `write memory` or `copy running-config startup-config` — Save your changes.

---

### 3. **Setting Up Management IP**

```shell
configure terminal
interface Management1
ip address 192.168.1.10/24
no shutdown
exit
ip route 0.0.0.0/0 192.168.1.1
```

---

### 4. **Creating VLANs and Assigning Ports**

```shell
vlan 10
name SERVERS
exit
interface Ethernet1
switchport access vlan 10
no shutdown
exit
```

---

### 5. **Enabling SSH**

```shell
management ssh
   vrf default
   enable
!
username paul privilege 15 secret mySuperSecretPassword
!
ip ssh key generate rsa
!
```

---

### 6. **Useful Show Commands**

- `show interfaces status`
- `show vlan`
- `show ip route`
- `show logging`
- `show version`

---

### 7. **Tips for GUI Users**

- **Tab completion works!** Type part of a command and hit `Tab`.
- **`?` is your friend:** Type `?` to see available commands/options.
- **Config is live:** Changes happen immediately—don’t forget to save!
- **You can copy-paste configs** from a text file or your clipboard.

---

### 8. **Resetting to Factory Defaults**

```shell
write erase
reload
```
*(You’ll lose all config!)*

---

### 9. **Docs and Help**

- [Arista EOS Command Reference](https://www.arista.com/en/um-eos/eos-command-line-interface-cli)
- Type `help` or `?` in the CLI for built-in help.

---

### **Bonus 1: Use Your Arista as a Local NTP Server 🕰️**

So you’ve got your big, bad Arista switch whining away in your rack. It’s probably running 24/7, and after a reboot, it takes a few minutes to come online.
**Here’s a homelab truth:** Most home routers (even the “pro” ones) don’t actually provide an NTP server for your network. So why not let your Arista do it?

**Why bother?**
If your switch’s clock is off, your logs and syslog timestamps will be all over the place. That makes troubleshooting a nightmare, especially if you’re trying to match up events across devices. Plus, some features (like certificate validation, syslog, or even SSH) can get weird if the time is wrong.

**How to set up your Arista as an NTP server:**

```shell
configure terminal
ntp server 0.pool.ntp.org
ntp local-interface Management1
ntp master
exit
show ntp status
```

Now, point your other devices at your Arista’s management IP for NTP.

**Pro tip:** This keeps your whole rack in sync, even if your internet drops or your router can’t help.

---

### **Bonus 2: Datacenter Switch Power Facts—No Power Button, No Mercy ⚡**

Ever found yourself searching for a power button, or wondering why your Arista (or any datacenter switch) takes ages to boot up?
**Here’s the deal:** Datacenter switches aren’t like your old TP-Link or Mikrotik. They’re built for reliability, not for quick reboots.

- **No power button:** There’s no “off” switch. You can reboot from the CLI (`reload`), but there’s no “poweroff” command. If you really want it off, you have to pull the plug. (And yes, that’s the official method.)
- **Boot time:** It’s totally normal for these switches to take several minutes to start. They run a full Linux-based OS, do hardware checks, load configs, and sometimes even run self-tests.
- **If you pull the power:** Expect it to POST (Power-On Self-Test) all over again, and it won’t care about your feelings or your schedule. It’ll just do its thing, every time.

**Bottom line:**
Don’t panic if your switch takes 3–5 minutes to come online. That’s just how real datacenter gear rolls.
And if you want it truly off, you’re gonna have to get physical. (But seriously, only do that if you have to.)

---

### Final Thoughts

Switching from a GUI to a CLI can be intimidating, but once you get the hang of it, it’s actually faster and more powerful. If you get stuck, don’t be afraid to Google the command or check the Arista docs. And if you have a favorite “golden” command, let me know!

---

**Want more CLI tips or have a config you want to share? [Email me](mailto:contact@pd-portfolio.net) or ping me on [GitHub](https://github.com/Paul1404)!**

---