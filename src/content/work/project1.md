---
title: "Deploying RHEL Images on vSphere with Cloud-Init"
publishDate: 2024-05-13 00:00:00
img: /assets/cloud-init-vsphere.png
img_alt: A screenshot of vSphere deploying a RHEL VM with cloud-init
description: |
  I recently explored deploying RHEL images from Red Hat Hybrid Cloud Console to vSphere, using cloud-init for all the config. Here's what worked, what tripped me up, and some tips for anyone else trying this.
tags:
  - Cloud-Init
  - vSphere
  - RHEL
  - Automation
  - Hybrid Cloud
---

I've been playing around with Red Hat's Hybrid Cloud Console and wanted to see how smooth it is to deploy custom RHEL images straight to vSphere. The key tool here is **cloud-init** - which, if you haven't used it, is basically the "do everything at first boot" tool for Linux VMs.

### What is Cloud-Init?

Cloud-init is a tool that lets you automate the initial setup of a Linux VM. You can set the hostname, users, SSH keys, install packages, run scripts, and a bunch more - all by passing a YAML config file when the VM boots for the first time. It's used everywhere: AWS, Azure, OpenStack, and, as I found out, works great with vSphere too.

### My Setup

- **Image Source:** Red Hat Hybrid Cloud Console (Image Builder/Composer)
- **Hypervisor:** vSphere (with vCenter)
- **Config:** All done via cloud-init user-data

### The Process (and the Gotchas)

1. **Build the Image:**
   I used the Hybrid Cloud Console to build a RHEL 9 image, making sure to select the "vSphere" output format. This gives you an OVA you can import straight into vCenter.

2. **Cloud-Init User Data:**
   Here's where things get interesting. You need to provide a `user-data` YAML file.
   Example:
   ```yaml
   #cloud-config
   users:
     - name: paul
       groups: wheel
       ssh_authorized_keys:
         - ssh-rsa AAAA...yourkey...
   hostname: rhel-cloudinit-test
   package_update: true
   packages:
     - htop
     - git
   runcmd:
     - echo "Hello from cloud-init!" > /root/cloud-init-success.txt
   ```

3. **Attach the Config:**
   In vSphere, you can attach the cloud-init config as a "vApp Options" property or (sometimes easier) as an ISO with the config files (`user-data` and `meta-data`).
   **Tip:** If you're using the ISO method, make sure the filenames are exactly `user-data` and `meta-data` (no extensions).

### Bonus: vSphere Customization Profiles

One thing I discovered (and it's quite handy):
**In the latest vSphere, you can just right-click your VM, choose "Customize VM" (or "VM Customization"), and pick a customization profile.** In these profiles, you can define both a `user-data` and a `network-data` section - no need to mess with ISOs or vApp options if you don't want to.

This makes it way easier to manage cloud-init configs, especially if you're spinning up a bunch of VMs and want to keep your settings organized. Just set up your customization profiles in vSphere, and you can reuse them whenever you deploy a new VM.

4. **Boot the VM:**
   Power it on and watch cloud-init do its thing. If it works, you'll see your user, hostname, and packages all set up.

### Syntax Caveats

- **YAML is picky.**
  Indentation matters. Tabs will break things. Use spaces only.
- **No file extensions:**
  If you're using the ISO method, the files must be named `user-data` and `meta-data` - no `.txt`, no `.yaml`.
- **Debugging:**
  If something goes wrong, check `/var/log/cloud-init.log` and `/var/log/cloud-init-output.log` inside the VM.
  I spent way too long chasing a missing space in my YAML.

### Useful Tips

- **Resetting Cloud-Init:**
  If you want to re-run cloud-init (for example, after fixing your config), run:
  ```sh
  sudo cloud-init clean
  sudo cloud-init init
  sudo cloud-init modules --mode=config
  sudo cloud-init modules --mode=final
  ```
  Or just reboot after `cloud-init clean`.

- **Testing Locally:**
  You can test your cloud-init config with the `cloud-init devel schema --config-file user-data` command to catch syntax errors before deploying.

- **User Passwords:**
  If you want to set a password, you need to use the `chpasswd` module and set `expire: false` if you don't want to force a password change on first login.

- **SSH Keys:**
  Don't forget to add your SSH public key, or you'll be locked out.

### Wrap-Up

Cloud-init is powerful, but it's also a bit of a black box until you get used to it. The docs are good, but real-world testing is better. If you're deploying a lot of VMs, it's a lifesaver.
