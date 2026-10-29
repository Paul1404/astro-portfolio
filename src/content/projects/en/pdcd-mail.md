---
title: "PDCD Mail"
publishDate: 2026-10-29 00:00:00
description: "A production mail platform on Stalwart: 38 mailboxes across eight domains, migrated from Mailcow with existing credentials, routing, and mail clients preserved."
stack:
  - Stalwart
  - Rust
  - Python
  - Rocky Linux
  - Amazon SES
  - AWS CloudWatch
  - restic
  - Backblaze B2
tags:
  - Infrastructure
  - Migration
  - Email Security
  - Automation
featured: true
featuredOrder: 6
icon: mail
screenshot:
  image: stalwart
  alt: "White Stalwart logo and wordmark on the official red background"
  caption: "Official Stalwart brand image. Stalwart Labs."
---

PDCD Mail is the mail infrastructure I operate for family, associations, and small organisations. I migrated 38 active mailboxes across eight domains from Mailcow to Stalwart on Rocky Linux, including shared mailboxes, aliases, forwarding rules, and six external mailbox collectors.

The difficult part was continuity. Users already had working mail clients, saved credentials, and workflows built around the old server. Replacing the backend needed to preserve those relationships, including additional passwords used to give different people access to shared mailboxes.

### Moving the service without resetting every client

I started with a pilot mailbox, verified real client use, and expanded the migration in batches. Mailbox data, authentication, outbound delivery, inbound filtering, and external collectors moved in separate steps so each change could be checked against the existing behaviour.

The finished platform serves IMAP, SMTP submission, and Sieve directly from Stalwart. Existing client hostnames remain usable alongside the new service name. Aliases, catch-all addresses, sender permissions, forwarding, and business-specific relay exceptions were carried over. Client discovery and Apple configuration profiles simplify new installations, with German language and Berlin time-zone defaults applied during provisioning.

The temporary migration proxies and credential gateways were subsequently removed. Mail flow was tested with the old Mailcow host shut down.

On the Linux host, I configured encrypted mail storage and resolved an IPv6 routing fault at the provider's virtual gateway while keeping IPv4 delivery available. This work sits alongside the application migration: the replacement also needs working networking, certificate renewal, and unattended maintenance.

### Preserving passwords in native authentication

The biggest compatibility problem was additional passwords. Stalwart expects its own generated credentials to include an identifier; the existing Mailcow credentials used a different format. A permanent authentication gateway would have kept another service, credential store, and failure path in production.

I implemented a focused Rust compatibility patch and a one-off importer to move the existing password verifiers into Stalwart's native credential store. Primary passwords and 81 active additional passwords were retained without needing their plaintext values. Local regression tests and a production pilot preceded the wider rollout.

Authentication and credential management now belong to Stalwart. The trade-off is explicit: future Stalwart upgrades must retain and test the patch until equivalent compatibility is available upstream.

### Filtering both SMTP mail and imported mail

Incoming SMTP mail passes through Stalwart's spam filter and ClamAV. Spam is delivered to each recipient's Junk folder; malware is blocked. There is no separate quarantine for users to review.

External mailbox collection required extra work. IMAP imports bypass the SMTP filtering path, so I built a Python pre-import pipeline that checks the full message for malware and requests a spam classification before delivery. Delivery receipts and UID checkpoints prevent repeated imports. Folder mappings keep the destination mailboxes usable, while cutover boundaries let users move from an external provider without replaying their entire archive.

A constrained Codex CLI adapter runs a lightweight language model on bounded subject and body text and contributes a category and confidence to the existing spam score. It distinguishes phishing and scams from ordinary commercial newsletters. Confident harmful verdicts carry a strong penalty; ordinary marketing receives no AI penalty. The classifier cannot browse links or run tools, and the usage ledger stores token counts and timing rather than message content.

Two parallel workers, a bounded queue, shared in-flight results, and a circuit breaker handle overlapping arrivals. A live three-message burst completed all classifications within 10.8 seconds. AI remains an additional signal: provider failures or sustained overload can leave SMTP filtering to the conventional rules, while collectors defer and retry.

### Delivery, trust, and recovery

Ordinary outbound mail uses Amazon SES. Forwarded mail and specific relay exceptions retain separate delivery rules so they do not inherit inappropriate sender restrictions. SPF, DKIM, DMARC, DNSSEC, DANE, and certificate renewal form part of the delivery design.

A stale DANE record exposed an important monitoring gap: a valid TLS certificate does not prove that a remote mail server will accept its key. I corrected the record and added a check against the certificate actually presented on SMTP port 25. Monitoring also covers submission, IMAP, storage, antivirus, collector freshness, and delivery backlog. An hourly external delivery probe verifies arrival in a real mailbox rather than stopping at a successful TCP connection.

The CloudWatch setup reuses a shared dashboard and state-based alerts, with a small host-side publisher instead of frequent remote management commands. Automated patching includes scheduled Sunday reboots and a matching monitoring maintenance window.

Daily mailbox exports and recovery configuration are encrypted, compressed, and deduplicated with restic before upload to Backblaze B2. The initial backup was checked with an actual restore and content-hash comparison.

### Result

The old Mailcow host can remain off. Stalwart handles the mailboxes, native authentication, routing, filtering, and client connections; the external collectors, monitoring, patching, and backups run independently of the retired platform. The project combines migration engineering, a targeted upstream-code modification, and the operational checks needed to keep a small production mail service dependable.
