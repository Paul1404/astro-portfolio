---
title: "PDCD Mail"
publishDate: 2026-10-29 00:00:00
description: "A Stalwart mail platform migrated from Mailcow to Kubernetes, preserving credentials and client names with three mail frontends, shared PostgreSQL storage and guarded collectors."
stack:
  - Stalwart
  - Rust
  - Python
  - Kubernetes
  - PostgreSQL
  - Redis Sentinel
  - HAProxy
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
featuredOrder: 2
icon: mail
screenshot:
  image: stalwart
  alt: "White Stalwart logo and wordmark on the official red background"
  caption: "Official Stalwart brand image. Stalwart Labs."
---

PDCD Mail is the mail infrastructure I operate for family, associations, and small organisations. I first moved it from Mailcow to Stalwart, preserving saved passwords, shared mailbox access, aliases and external mailbox collection. I then moved the Stalwart backend from a single Linux host to [Vertex](/projects/vertex/), my four-node Kubernetes platform.

The second migration changed the storage and network architecture while keeping the client names `mail.pdcd.net` and `mx.pdcd.net`. Two Stalwart replicas now share PostgreSQL storage and Redis Sentinel; three separate nodes provide the public mail frontends.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Production architecture. Scroll sideways on smaller screens.">
    <img src="/diagrams/pdcd-mail/en-architecture.svg" alt="Mail architecture on Vertex: three HAProxy frontends, two Stalwart replicas, PostgreSQL, Redis and B2 backups." width="740" height="822" loading="lazy" decoding="async" />
  </div>
  <figcaption>Three node frontends, shared mail stores and offsite backups. <a href="/diagrams/pdcd-mail/en-architecture.svg">Open full-size diagram</a>. Scroll sideways on smaller screens.</figcaption>
</figure>

### Moving mail and its service identity

The original Mailcow migration began with a pilot mailbox and continued in batches. Routing, sender permissions, forwarding and additional passwords moved with the mail. Stalwart took over IMAP, SMTP submission and Sieve natively; the temporary authentication gateways were removed.

For the move to Vertex, I froze the old writer before the final native export and import. All 17 non-blob export files matched byte for byte, and 89,836 blobs passed the import checks. I rebuilt the full-text search index separately, then checked existing credentials, mailbox access and search on the new backend. The old writer remains fenced against restart so it cannot create a second, divergent mailbox store.

Each of the three public frontends runs HAProxy on its own node with dedicated host ports. PROXY v2 carries the real client address and original destination port to Stalwart. I retained the original listener identities because mail-routing expressions depend on them. Mail HTTPS uses exact-SNI passthrough through Traefik. The existing DANE key association is preserved, while cert-manager renews the default certificate.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Migration handover">
    <img src="/diagrams/pdcd-mail/en-migration.svg" alt="From Mailcow to native Stalwart and shared storage on Vertex." width="936" height="128" loading="lazy" decoding="async" />
  </div>
  <figcaption>From Mailcow to native Stalwart and shared storage on Vertex. <a href="/diagrams/pdcd-mail/en-migration.svg">Open full-size diagram</a>.</figcaption>
</figure>

### Preserving passwords in native authentication

The biggest compatibility problem was additional passwords. Stalwart expects its own generated credentials to include an identifier; the existing Mailcow credentials used a different format. A permanent authentication gateway would have kept another service, credential store, and failure path in production.

I implemented a focused Rust compatibility patch and a one-off importer to move the existing password verifiers into Stalwart's native credential store. Primary passwords and 81 active additional passwords were retained without needing their plaintext values. Local regression tests and a production pilot preceded the wider rollout.

Authentication and credential management now belong to Stalwart. The trade-off is explicit: future Stalwart upgrades must retain and test the patch until equivalent compatibility is available upstream.

### Filtering both SMTP mail and imported mail

Incoming SMTP mail passes through Stalwart's spam filter and ClamAV. Spam is delivered to each recipient's Junk folder; malware is blocked. There is no separate quarantine for users to review.

External mailbox collection required extra work. IMAP imports bypass the SMTP filtering path, so I built a Python pre-import pipeline that checks the full message for malware and requests a spam classification before delivery. Delivery receipts and UID checkpoints prevent repeated imports. Folder mappings keep the destination mailboxes usable, while cutover boundaries let users move from an external provider without replaying their entire archive.

A constrained Codex CLI adapter runs a lightweight language model on bounded subject and body text and contributes a category and confidence to the existing spam score. It distinguishes phishing and scams from ordinary commercial newsletters. Confident harmful verdicts carry a strong penalty; ordinary marketing receives no AI penalty. The classifier cannot browse links or run tools, and the usage ledger stores token counts and timing rather than message content.

Two parallel workers, a bounded queue, shared in-flight results, and a circuit breaker handle overlapping arrivals. AI remains an additional signal: provider failures or sustained overload can leave SMTP filtering to the conventional rules, while collectors defer and retry.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Filtering and failure paths. Scroll sideways on smaller screens.">
    <img src="/diagrams/pdcd-mail/en-filtering.svg" alt="Filtering and failure paths: Simplified flow. SMTP and collectors use separate implementations with shared protection principles." width="737" height="1132" loading="lazy" decoding="async" />
  </div>
  <figcaption>Simplified flow. SMTP and collectors use separate implementations with shared protection principles. <a href="/diagrams/pdcd-mail/en-filtering.svg">Open full-size diagram</a>. Scroll sideways on smaller screens.</figcaption>
</figure>

### Shared storage and delivery

The pinned Stalwart image retains my legacy-password patch and includes PostgreSQL and Redis support. Three PostgreSQL instances on separate nodes hold structured data, message blobs and search data. CloudNativePG manages the primary and synchronous replication to a standby. Three Redis members with Sentinel provide shared transient state. Each member uses an encrypted, node-local Longhorn volume; replication belongs to PostgreSQL and Redis rather than a second layer of volume replicas.

I tested the database and Redis failover paths with scoped network faults. Both services promoted a new primary and retained the test writes.

Amazon SES still carries most outbound mail. The remaining direct delivery now leaves through Vertex IPv4, using a common EHLO identity and matching SPF records. DNSSEC, DANE and automatic certificate renewal remain part of the design.

### Collectors and recovery

ClamAV, the constrained AI adapter and the external collectors now run on Vertex. The collectors have one active scheduler, with their checkpoints carried across from the old host. If a required classification is missing, collection defers and the original stays upstream.

The new logical PostgreSQL backup is encrypted and deduplicated with restic in Backblaze B2. I read back the full baseline archive and compared its byte count and SHA-256 hash; daily backups are enabled.

### Result

Mail now shares the Vertex platform with my applications, while clients retain their established server names and credentials. The implementation replaces a single local mail store with shared database services and separates public connections from the mail replicas.
