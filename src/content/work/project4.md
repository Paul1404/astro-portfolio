---
title: "SELinux, Docker, and Mailcow: A Real-World Debugging Journey"
publishDate: 2025-05-14
img: /assets/selinux.png
img_alt: Terminal with SELinux logs and Docker Compose
description: |
  My experience troubleshooting a tricky SELinux and Docker issue with mailcow, and how the open source community came together to share solutions, warnings, and a bit of healthy debate.
tags:
  - SELinux
  - Docker
  - mailcow
  - Linux
  - Community
---

## SELinux, Docker, and Mailcow: A Real-World Debugging Journey

Recently, I (Paul1404) got deep into a technical discussion on the [mailcow-dockerized GitHub repo](https://github.com/mailcow/mailcow-dockerized/issues/6510) about a gnarly issue: after updating Rocky Linux and Docker, mailcow wouldn’t start, stuck on “waiting for sql…” with SELinux enforcing.

Turns out, I wasn’t alone. Several users hit the same wall, and the thread quickly became a goldmine of troubleshooting, workarounds, and (let’s be honest) some passionate debate about the “right” way to fix things.

---

### The Problem

- **Environment:** Rocky Linux 9.5, Docker 28+, SELinux enforcing, mailcow 2025-03b
- **Symptom:** After an OS and Docker update, mailcow containers (especially MariaDB and PHP-FPM) couldn’t talk to each other via the MariaDB Unix socket. SELinux audit logs showed denials, even in permissive mode.
- **Root cause:** Docker 28+ now labels named volumes with an MCS context, which breaks cross-container socket sharing with SELinux enforcing. The classic `:z`/`:Z` options only work for bind mounts, not named volumes.

---

### The Community’s Solutions

**1. Bind Mounts with :z**
My workaround:
- Create a host directory for the MariaDB socket.
- Use a bind mount with `:z` in `docker-compose.yml` for every service that needs the socket.
- Remove the named volume for the socket.

```yaml
# Instead of:
- mysql-socket-vol-1:/var/run/mysqld/
# Use:
- /opt/mailcow-dockerized/data/mysql-socket:/var/run/mysqld/:z
```

**Pros:** Works with SELinux enforcing, no custom policies needed.
**Cons:** Deviates from the official mailcow setup, could complicate upgrades/support.

---

**2. Custom SELinux Labels on Containers**
Shared by @ravor-org:
- Add `security-opt: - label=level:s0:c100,c200` to all relevant services in `docker-compose.yml` so they share the same MCS context.

**Pros:** Keeps named volumes, works with SELinux.
**Cons:** Reduces container isolation, not officially supported, riskier if you don’t know SELinux well.

---

**3. Switch to TCP/IP for MariaDB**
- Instead of sharing the Unix socket, configure mailcow to use TCP/IP for database connections.

**Pros:** Containers are truly independent, no SELinux socket headaches.
**Cons:** Not the default, may require more config, not officially documented.

---

### The Debate

The thread got a bit heated (in a good way). Some folks warned against “fiddling around” with custom SELinux policies, arguing that most issues can be solved with correct labeling and Docker options. Others (myself included) pointed out that the documentation is sparse, the behavior changed with Docker 28, and sometimes you have to get creative to keep your mail server secure and running.

I really appreciated the open sharing of solutions—even if they weren’t perfect or “official.” It’s what makes open source great: people trying, failing, learning, and helping each other out.

---

### My Takeaways

- **SELinux is powerful, but tricky.** The learning curve is real, and the docs don’t always keep up with Docker’s changes.
- **Community matters.** The best solutions came from people sharing what worked (and what didn’t), not just from reading docs.
- **There’s no one-size-fits-all fix.** Every workaround has tradeoffs. Pick what fits your risk tolerance and environment.
- **If you’re running a public mail server, SELinux is worth the effort.** Even if it’s a pain sometimes.

---

### Final Thoughts

If you’re running mailcow on Rocky/Red Hat with SELinux enforcing and Docker 28+, be prepared for some troubleshooting.
Check out the [GitHub issue #6510](https://github.com/mailcow/mailcow-dockerized/issues/6510) and the [community forum thread](https://community.mailcow.email/d/4856-after-upgrade-waiting-for-database-to-come-up/7) for more details and solutions.

And if you find a better fix, please share it! The next person (maybe me) will thank you.