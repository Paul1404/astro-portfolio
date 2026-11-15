---
title: "Stalwart: Architecture of a mail cluster"
publishDate: 2026-10-29 00:00:00
description: "Three mail replicas, shared durable storage and a preserved public identity. How I integrated Stalwart on Kubernetes, from protocol routing to recovery."
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
  - cert-manager
  - Velero
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

I run mail for family, associations and small organisations on [Stalwart](https://stalw.art/). SMTP reception, authenticated submission, IMAP and JMAP meet in one server, with a common account model and storage layer. That integration is what made Stalwart interesting to me: a routing decision, a mailbox permission and an outgoing queue entry belong to the same system.

My work was designing and integrating the infrastructure around it: migrating from Mailcow, retaining existing credentials, moving the data onto [Vertex](/projects/vertex/), and connecting public mail edges, shared stores, filtering and recovery. The Rust mail engine and its clustering mechanisms are Stalwart Labs' work. This deployment uses a pinned 0.16.27 build with my focused compatibility patch for legacy additional passwords.

### One mail system, three application replicas

Three Stalwart replicas run on three distinct Kubernetes nodes. Each can serve mail protocols against the same durable data. A connection lands on an available replica; the mailbox does not have to move with it. Incoming SMTP accepts mail from other servers, submission authenticates users sending mail, IMAP exposes their folders, and JMAP provides the HTTP API for mail and management.

The important boundary is between durable state and coordination. PostgreSQL holds account and configuration objects, mailbox metadata, message blobs, search data and the persistent delivery queue. Redis carries transient counters and locks; Stalwart's default coordinator uses its publish/subscribe path to communicate between replicas. Queue workers acquire shared locks before processing due work. Redis helps decide who works on an entry, while the mail and queue record remain in PostgreSQL.

<figure class="mail-diagram stalwart-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Durable records and transient coordination have separate owners.">
    <picture>
    <source media="(max-width: 600px)" srcset="/diagrams/stalwart/en-architecture-mobile.svg" />
    <img src="/diagrams/stalwart/en-architecture.svg" alt="Durable records and transient coordination have separate owners." loading="lazy" decoding="async" />
    </picture>
  </div>
  <figcaption>Durable records and transient coordination have separate owners. <a href="/diagrams/stalwart/en-architecture.svg">Open full-size diagram</a>.</figcaption>
</figure>

### Replication at the layer that owns the data

CloudNativePG manages three PostgreSQL 18.1 instances with required synchronous replication to one standby. The write Service follows the primary; Stalwart verifies the database's TLS certificate and hostname. Three Redis members with Sentinel provide primary discovery and a quorum of two. Redis replication is asynchronous, appropriate here for transient coordination rather than the durable mailbox record.

Each database instance has an encrypted 64 GiB node-local volume. PostgreSQL and Redis replicate across nodes themselves. I deliberately avoided adding another three storage replicas underneath each database replica: that would multiply storage and write traffic without changing which application owns consistency. Keeping blobs, indexes and structured records in PostgreSQL also gives this installation one database boundary for mail recovery, at the cost of larger exports and database I/O.

### The edge must preserve meaning

Three public HAProxy edges expose the existing MX and client endpoints over IPv4 and IPv6. They forward TCP with PROXY v2, carrying both the real peer address and original destination port into Stalwart. TLS terminates at the mail server. Mail HTTPS passes through Traefik using exact SNI matching.

Those details affect policy. Port 25 is server-to-server reception; submission carries an authenticated user's permission to send. Stalwart's expressions depend on listener identity, client address and authentication context. A proxy that hides those inputs changes the meaning of the connection. I retained the existing listener identities, server names and policy expressions while replacing the backend.

The same applies to cryptographic identity. cert-manager manages the default eleven-name certificate and a separate seventeen-name discovery certificate. DNSSEC authenticates the DNS chain; DANE binds SMTP TLS to the published key. A separately issued, unmounted standby certificate has its next key prepublished alongside the current TLSA association. Renewal and preparation for a later key transition therefore have separate lifecycles. CAA restricts the mail names to the intended ACME accounts and validation methods.

### Native configuration and authentication

Stalwart 0.16.27 represents configuration as typed registry objects. Store backends, listeners, authentication and expression-based policies fit into that model. I kept configuration and account management native to Stalwart, with Kubernetes providing the runtime, mounted certificates and secret references.

Existing Mailcow additional passwords needed a narrow exception. Their verifier format differed from Stalwart's generated credentials, which include an identifier. I wrote a Rust compatibility patch and importer that retained primary passwords and 81 active additional passwords without recovering plaintext. This removed the need for a permanent authentication gateway and its second credential store. Shared mailbox access, aliases and sender permissions moved with the accounts.

### Two ingress paths, explicit delivery decisions

SMTP mail passes through Stalwart's rules and ClamAV. Spam goes to each recipient's Junk folder; malware is blocked. The six external mailbox collectors need their own pre-import path because IMAP collection bypasses SMTP filtering. They scan before delivery and retain UID checkpoints and delivery receipts so repeated runs do not duplicate imports. If required classification cannot complete, collection waits and preserves the upstream original.

A native adapter adds a bounded language-model signal to spam classification using gpt6-luna. Concurrency, queue length, timeouts and input size are limited. Subject and body excerpts supply the classification; the model cannot browse links or run tools. The usage ledger records timing and token counts instead of message content. Conventional SMTP filtering can continue when that extra signal is unavailable; collectors defer when a required verdict is missing. Two ClamAV instances supply malware scanning.

<figure class="mail-diagram stalwart-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="SMTP and collection join the same mailbox store; outgoing transport is selected by policy. Scroll sideways on narrow screens.">
    <img src="/diagrams/stalwart/en-delivery.svg" alt="SMTP and collection join the same mailbox store; outgoing transport is selected by policy." loading="lazy" decoding="async" />
  </div>
  <figcaption>SMTP and collection join the same mailbox store; outgoing transport is selected by policy. <a href="/diagrams/stalwart/en-delivery.svg">Open full-size diagram</a>. Scroll sideways on narrow screens.</figcaption>
</figure>

About 95 percent of outbound mail uses Amazon SES. The remaining route delivers directly over native IPv4 on a best-effort basis. Stalwart's queue and routing policy connect these paths: the selected transport changes, but the pending message still belongs to the shared mail store. EHLO, SPF, DKIM and DMARC remain aligned with the sending identity.

### Recovery includes the state around the mailbox

A database restore alone would leave out collector progress, helper authentication and TLS identity. The native backup workflow therefore snapshots helper state before taking a consistent logical PostgreSQL export. Velero moves the export and helper volumes to Backblaze B2 with restic encryption and also backs up namespace configuration, runtime Secrets and certificate recovery material. Recovery checks the ordering: a collector checkpoint newer than the restored mail database could skip messages.

<figure class="mail-diagram stalwart-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Helper checkpoints precede the database export. Recovery brings both back together.">
    <img src="/diagrams/stalwart/en-recovery.svg" alt="Helper checkpoints precede the database export. Recovery brings both back together." loading="lazy" decoding="async" />
  </div>
  <figcaption>Helper checkpoints precede the database export. Recovery brings both back together. <a href="/diagrams/stalwart/en-recovery.svg">Open full-size diagram</a>.</figcaption>
</figure>

I restored the complete roughly 25 GB database into an isolated recovery environment: 27 tables, checked with `pg_restore` and `pg_amcheck`. Authentication succeeded with the recovered runtime Secret and rejected an incorrect password. All six collector ledgers passed integrity checks, including their incremental checkpoints; helper state, antivirus databases and recovered Secrets were verified too. The old source host is retired from the mail path, including its former backup and certificate jobs.

The resulting system keeps public identity stable while connections, application replicas and database primaries have separate lifecycles. That is the architectural quality I wanted from this migration: each layer has a clear job, and adding a mail replica does not create another mailbox store to reconcile.

### Upstream architecture

The implementation described here is pinned to Stalwart 0.16.27. Its [typed registry](https://github.com/stalwartlabs/stalwart/blob/aa47d8ef7bfba7200d3293198ac2592747b20e73/crates/registry/src/schema/structs.rs), [coordinator selection](https://github.com/stalwartlabs/stalwart/blob/aa47d8ef7bfba7200d3293198ac2592747b20e73/crates/coordinator/src/bootstrap.rs) and [queue persistence and locking](https://github.com/stalwartlabs/stalwart/blob/aa47d8ef7bfba7200d3293198ac2592747b20e73/crates/smtp/src/queue/spool.rs) are upstream Stalwart mechanisms.
