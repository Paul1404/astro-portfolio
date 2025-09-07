
---
title: "From Hobby Mailserver to Reputational Sender: Mailcow + Amazon SES + ISP Compliance 📧"
publishDate: 2025-09-07 00:00:00
img: /assets/amazon-ses-blog-banner.png
img_alt: Amazon SES Banner
description: |
  A deep-dive into building a reputational mail system: combining Mailcow with Amazon SES, meeting ISP requirements (like Telekom’s PTR + Impressum rules), and implementing modern email security (SPF, DKIM, DMARC, DNSSEC, DANE, RPKI). A practical guide for sysadmins who want to run their own mail but still achieve enterprise-grade deliverability.
tags:
  - Email
  - Mailcow
  - Amazon SES
  - Deliverability
  - Sysadmin
  - DNS
---

---

## From Hobby Mailserver to Reputational Sender 📧

Running your own mail server is a classic sysadmin challenge.  
But running one that **actually delivers mail reliably** to Gmail, Outlook, or strict ISPs like T‑Online and GMX? That’s a whole different game.  

This project documents how I turned a **self-hosted Mailcow instance** into a **reputational, ISP-grade sender** by combining it with **Amazon SES** and following best practices around DNS, authentication, and legal compliance.  

---

## Why This Project?

- **Hetzner / VPS IPs are distrusted**: Many ISPs classify them as “dialup/transient.”  
- **Telekom (T‑Online) is strict**: They require PTR + Impressum + transparency.  
- **Deliverability is hard**: Without SPF, DKIM, DMARC, and reputation, your mail goes to spam or gets rejected.  
- **I wanted to learn**: How to combine modern email security (DNSSEC, DANE, RPKI) with practical deliverability fixes (SES relay).  

---

## The Challenges

1. **PTR & FCrDNS**  
   - ISPs require reverse DNS to resolve to a hostname (e.g. `mail.example.net`).  
   - That hostname must resolve back to the IP.  

2. **Impressum / Legal Compliance**  
   - In Germany/EU, operators must publish contact details (§ 5 TMG, EU Directive 2000/31/EC).  
   - Telekom enforces this: PTR hostname must lead to a website with contact info.  

3. **Authentication**  
   - SPF, DKIM, DMARC are baseline requirements.  
   - Without them, your mail will be rejected or marked as spam.  

4. **Reputation**  
   - Even with perfect DNS, some ISPs distrust entire IP ranges (Hetzner, OVH, AWS EC2).  
   - Solution: relay outbound mail through a trusted provider (Amazon SES).  

5. **SES Sandbox**  
   - SES starts in sandbox mode: only verified senders/recipients, 200 mails/day.  
   - Production access requires a clear, responsible use case.  

---

## The Architecture

- **Inbound mail** → Mailcow (Postfix, Dovecot, Rspamd).  
- **Outbound mail** → Relayed through Amazon SES.  
- **PTR hostname** → `mail.example.net` with a public Impressum page.  
- **Authentication** → SPF, DKIM, DMARC aligned.  
- **Security** → DNSSEC, DANE, RPKI.  

---

## Step 1: DNS & Identity

### PTR + FCrDNS
- Reverse DNS: `123.123.123.123 → mail.example.net`.  
- Forward DNS: `mail.example.net → 123.123.123.123`.  

### SPF
```txt
example.net. TXT "v=spf1 include:amazonses.com ~all"
```

### DKIM
- Mailcow generates a DKIM key (e.g. `dkim._domainkey.example.net`).  
- SES adds 3x CNAMEs for Easy DKIM.  

### DMARC
```txt
_dmarc.example.net. TXT "v=DMARC1; p=quarantine; rua=mailto:abuse@example.net"
```

### Impressum
- `https://mail.example.net` shows a simple page with:  
  - Operator name  
  - Address  
  - Phone  
  - Postmaster & abuse contacts  

---

## Step 2: Mailcow + SES Integration

### Add SES as a relayhost
In Mailcow UI → **System → Routing → Sender-dependent transports**:

- Host: `[email-smtp.eu-central-1.amazonaws.com]:587`  
- Username: SES SMTP username  
- Password: SES SMTP password  

Assign this relayhost to `example.net`.

### Test with swaks
```bash
swaks --server mail.example.net \
  --from test@example.net \
  --to test@example.net
```

Check headers:
- `Return-Path: bounce@bounce.example.net`  
- `DKIM-Signature: d=example.net; s=ses-key;`  
- `Authentication-Results: spf=pass dkim=pass dmarc=pass`  

---

## Step 3: SES Sandbox → Production

### Sandbox
- Only verified senders/recipients.  
- 200 mails/day, 1 mail/sec.  

### Production Access
- Submit a request with:  
  - Mail type: Transactional  
  - Volume: Low (<1,000/day)  
  - Recipients: No purchased lists, only opt-in  
  - Bounce/complaint handling: via SES feedback + abuse@example.net  
  - Example content: personal correspondence, system alerts, community updates  

### Result
- Quota raised (50,000/day, 14/sec).  
- Can send to any recipient worldwide.  

---

## Step 4: ISP Compliance (Telekom Case Study)

Telekom rejected mail with:
```
554 IP=123.123.123.123 - Dialup/transient IP not allowed.
```

### Fixes
- PTR corrected.  
- Impressum published at PTR hostname.  
- Professional Postmaster signature used in delisting request.  

### Telekom’s Requirements (Section 4.1)
- PTR + FCrDNS.  
- Website with contact info.  
- Low connection concurrency.  
- No unusual traffic patterns.  

---

## Step 5: Advanced Security

- **DNSSEC** → protects DNS integrity.  
- **DANE (TLSA)** → ensures STARTTLS can’t be downgraded.  
- **RPKI** → prevents BGP hijacks.  
- **TLS enforced** → SES + Mailcow both require STARTTLS.  

---

## Lessons Learned

- **Transparency matters**: PTR + Impressum builds trust.  
- **Authentication is non-negotiable**: SPF, DKIM, DMARC are table stakes.  
- **Reputation is shared**: SES gives you trusted IPs.  
- **Advanced DNS security**: DNSSEC, DANE, RPKI are strong signals.  
- **Legal compliance**: In some regions, an Impressum is mandatory.  

---

## Final Thoughts

By combining **local identity** (PTR, Impressum, Postmaster role) with **global trust** (SES relay), you can run your own mail system while still achieving **enterprise-grade deliverability**.  

This project turned a hobby mailserver into a **reputational sender** that even strict ISPs accept.  