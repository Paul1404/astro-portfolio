---
title: "PDCD Web GitOps"
publishDate: 2026-10-31 00:00:00
description: "Pull-based website deployments from GitHub to rootless Podman, with immutable releases, per-site isolation, SQL-backed readiness, and application rollback."
stack:
  - Python
  - GitHub Actions
  - Podman
  - systemd Quadlet
  - Caddy
  - CloudFront
  - CloudFormation
  - Rocky Linux
tags:
  - GitOps
  - Infrastructure
  - CI/CD
  - Security
featured: true
featuredOrder: 7
icon: git-pull-request
---

I built PDCD Web GitOps to run websites and supporting services on the same Rocky Linux host as my [mail platform](/projects/pdcd-mail/), while keeping deployment permissions separate. It manages WordPress and REDAXO sites alongside digest-pinned Umami and Vaultwarden deployments.

The design centres on a simple boundary: GitHub publishes desired state and verified artifacts; an unprivileged account on the host decides what it can apply. CI has no administrative SSH access to the server. Each site has its own account, container network, persistent data, and systemd units.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Release and deployment path. Scroll sideways on smaller screens.">
    <img src="/diagrams/web-gitops/en-delivery.svg" alt="Release and deployment path: From a tested build to host-side pull reconciliation. CI has no administrative server access." width="920" height="459" loading="lazy" decoding="async" />
  </div>
  <figcaption>From a tested build to host-side pull reconciliation. CI has no administrative server access. <a href="/diagrams/web-gitops/en-delivery.svg">Open full-size diagram</a>. Scroll sideways on smaller screens.</figcaption>
</figure>

### From tested source to an immutable release

The CMS build sources live in a public repository. GitHub Actions builds and exercises the actual application and Caddy origin images with isolated fixtures. Checks cover database-backed readiness, persistent state across restarts, origin-header validation, and application behaviour such as WordPress editor login.

After trusted source CI succeeds, the release workflow publishes image archives with SHA-256 checksums and exact image IDs. A separate desired-state manifest pins the application, database, and origin images. The deployment follows those pins instead of a moving tag. Upstream applications use immutable registry digests through a separate reconciler.

Automated promotion is deliberately narrow: a release branch may change only one site's manifest, and verification must pass before the workflow opens and merges its promotion PR. This is a workflow gate; it is not presented as branch protection for every manual infrastructure change.

### The host pulls with limited authority

Each site account checks desired state roughly every two minutes using a systemd user timer. The Python reconciler validates an explicit site, hostname, port, and artifact allowlist. For new release archives, it checks the checksum before loading and verifies the pinned image exists afterward. A process lock prevents overlapping deployments.

The account manages only its rootless Podman containers and Quadlet units. It has no sudo rights. Host-side repository access uses a separate read-only key; the release-promotion credential cannot log into the server. Runtime environment values, database exports, and private keys stay outside Git and release artifacts.

SELinux remains enforcing, with per-site resource limits leaving capacity for mail. The web controller does not own Stalwart, its credentials, or its certificate renewal. This is workload separation on a shared host, with a single host remaining the availability boundary.

### Readiness determines whether an update stays

A running proxy is insufficient evidence of a healthy website. The HTTPS readiness path reaches the application and performs read-only SQL checks. Before changing a CMS application release, the controller checks free disk space and takes a database snapshot. It records the applied revision only after readiness succeeds.

If the new application fails its health gate, the controller restores the previous application and origin images and checks readiness again. Database contents are preserved. Database-image and CMS-base changes are held for a separate compatibility review, because restoring an older image cannot undo a schema migration. Persisted WordPress core and plugins also need their own update process; replacing the theme image is not a blanket CMS upgrade.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Readiness and rollback. Scroll sideways on smaller screens.">
    <img src="/diagrams/web-gitops/en-rollback.svg" alt="Readiness and rollback: Application rollback preserves the database. Database and CMS-base changes require their own review." width="788" height="921" loading="lazy" decoding="async" />
  </div>
  <figcaption>Application rollback preserves the database. Database and CMS-base changes require their own review. <a href="/diagrams/web-gitops/en-rollback.svg">Open full-size diagram</a>. Scroll sideways on smaller screens.</figcaption>
</figure>

### CloudFront at the edge, protected origins behind it

Visitors use the canonical HTTPS domains through CloudFront. Caddy terminates origin TLS and requires the site's verification header for application routes. The readiness endpoint is the deliberately unauthenticated exception. Application and database containers remain on private per-site networks.

CloudFormation records the relevant origin, edge, and DNS configuration. Website certificates use renewal paths separate from mail. Deployment verification distinguishes a merged manifest from a working release: host applied state, container identity, canonical HTTPS, SQL readiness, and direct-origin denial provide different pieces of evidence.

### Migration and recovery keep one writer authoritative

The move preserved CMS content, uploads, editor accounts, and application settings. Final transfers fenced writes and scheduled jobs on the old platform before copying files and logical databases. Traffic switched only after data and functional checks.

The former hosting environment is retained as a stopped recovery fallback. It is not continuously replicated. A return after new writes requires freezing the active side and synchronising its latest data before traffic moves back. Keeping a recoverable old copy is useful only if recovery does not quietly discard newer content.

### Result

The same pull controller deploys multiple independently owned sites without giving CI a server administrator's key. Release identity is explicit, routine reconciliation runs without an operator session, and failed application updates have a bounded recovery path. The public [application build sources](https://github.com/Paul1404/web-services) are separate from the private infrastructure configuration.
