---
title: "End‑to‑End Email Continuity Monitoring with Checkmk 📬"
publishDate: 2025-09-10 00:00:00
img: /assets/checkmk-tailscale-homelab.png
img_alt: Checkmk Email Continuity Monitoring
description: |
  Port 25 up ≠ email delivered. In this project I built an end‑to‑end monitoring loop in Checkmk that validates both internal and external mail delivery — ensuring continuity across SMTP, IMAP, DNS, SPF/DKIM/DMARC, and real‑world inbox reachability.
tags:
  - Checkmk
  - Monitoring
  - Email
  - Continuity
  - SES
  - Gmail
  - Certificates
---

---

## Why This Project?

We often monitor servers, disks, and HTTP — but **email is quietly critical**.  
And uptime of `smtp.service.local:25` does not guarantee continuity. Issues can hide in the middle:

- DNS or RBL problems  
- Misaligned SPF/DKIM/DMARC  
- Delivery to spam instead of inbox  
- External relays silently dropping  

My goal: a monitoring loop in Checkmk that validates **true inbox delivery**, both **internal** and **external**.

---

## Project Goal 🎯

**Build a Checkmk Email Roundtrip check that:**
- Confirms my **local MTA + IMAP pipeline** is functional (internal loop).  
- Confirms **external continuity**: outbound MTA → relay (Amazon SES) → Gmail → IMAP fetch.  
- Detects failures in DNS, auth, deliverability.  
- Provides latency metrics (OK, Warn, Critical).  

---

## The Design

### Internal Loop
- **Send:** SMTP server → internal monitoring mailbox (e.g. `loop-internal@example.local`)  
- **Receive:** IMAP from local mail server  
- **Use case:** Detects local outages quickly (queue stuck, Dovecot down, etc.).  

### External Loop
- **Send:** SMTP (587/TLS) on my outbound MTA (via SES relay).  
- **Destination:** a sentinel inbox (`sentinel-account@gmail.com`)  
- **Receive:** Gmail IMAP (`imap.gmail.com:993`) using an App Password.  
- **Use case:** Detects reputation/auth/SPF/DMARC issues, external downtime, spam filtering.  

Together the loops distinguish:  
- Internal ok + external fail = deliverability issue 🚨  
- Internal fail + external ok = local infra issue 🔧  
- Both fail = total outage 🔴  

---

## The Subject Gotcha 📝

Checkmk appends tracking tokens to roundtrip subjects.  
Example received subject:

```
[CHECKMK-ROUNDTRIP] site01/mail.example.net 1757421012 372
```

If you configure a fixed subject (`[CHECKMK-ROUNDTRIP] site01/mail.example.net`) the check **never matches** and you get “waiting for mails.”  

**Fix = Regex subject:**

```regex
^\[CHECKMK-ROUNDTRIP\] site01/mail\.example\.net.*
```

This matches the prefix while ignoring tokens.  
Result: mails are properly recognized, queues drain, and you get real latency output.

---

## Implementation

### Rule Configuration (Checkmk 2.3+)

- **SMTP server:** `smtp.example.net:587` (TLS)  
- **SMTP auth user:** `monitor-sender@example.net`  
- **From:** `monitor-sender@example.net`  
- **To:** `sentinel-account@gmail.com` (Gmail App Password required)  
- **IMAP server:** `imap.gmail.com:993` (TLS)  
- **IMAP user:** `sentinel-account@gmail.com`  
- **Folder:** `INBOX`  
- **Subject (regex):**  
  ```
  ^\[CHECKMK-ROUNDTRIP\] site01/mail\.example\.net.*
  ```
- **Delete processed messages:** enabled  

### Debugging
- Run manually with `./check_mail_loop --debug ...` from `~/lib/nagios/plugins`.  
- Status file stored at:  
  ```
  ~/var/check_mk/check_mail_loop.<suffix>.status
  ```
- Test IMAP manually with OpenSSL:  
  ```bash
  openssl s_client -crlf -connect imap.gmail.com:993
  ```

---

## Project Results

- **Internal loop latency:** ~1s  
- **External (SES → Gmail):** ~2–3s average  
- **Check output:**  
  ```
  OK - Received 4 mails, average delay 2.4s, age of last mail 32s
  ```
- **SES cost:** ~$0.90/month (9k mails at $0.10 per 1,000).  

The monitoring continuously validates not only “SMTP OK” but **“mail actually trusted and delivered into Inbox.”**

---

## Why Gmail?

- Strictest enforcement of SPF/DKIM/DMARC → if Gmail accepts you, most will.  
- Free mailbox with IMAP access.  
- Low probe cadence (every 5 minutes) is safe and unproblematic.  

👉 Alternative: pair with Outlook.com or mailbox.org for a neutral second sentinel.

---

## Lessons Learned

- Internal‑only monitoring misses external failures.  
- Regex subject matching is required in production.  
- SES pricing is negligible at monitoring scale.  
- Gmail as a sentinel is unusual, but effective for real‑world assurance.  

---

## Final Thoughts

Monitoring CPU and RAM is easy.  
**Monitoring trust is harder — but more important.**  

With a simple Checkmk loop, I can see instantly if email continuity breaks.  
From certificates to mail relays, awareness of delivery = continuity preserved.  

Try this with your own infra. Docs: [Checkmk KB on check_mail_loop](https://checkmk.atlassian.net/wiki/spaces/KB/pages/9472304/Configuring+Check+Email+Delivery+check_mail_loop).