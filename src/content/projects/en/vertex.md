---
title: "Vertex Kubernetes Platform"
publishDate: 2026-11-08 00:00:00
description: "A four-node RKE2 platform running websites and applications with Fleet, replicated storage, S3-compatible object storage, and automated HTTPS and DNS."
stack:
  - RKE2
  - Kubernetes
  - Rancher Fleet
  - Longhorn
  - Garage S3
  - Traefik
  - cert-manager
  - Amazon Route 53
  - openSUSE Leap
tags:
  - Infrastructure
  - Kubernetes
  - GitOps
  - Migration
featured: true
featuredOrder: 1
icon: server
screenshot:
  image: rancher
  alt: "Rancher by SUSE logo with blue cow and black wordmark"
  caption: "Official Rancher by SUSE brand artwork."
---

My websites and applications had outgrown their original home: a single server carrying everything from a document archive to club administration. I built Vertex to bring those services onto a platform I could operate and extend myself, then moved the applications and their data without asking users to learn new addresses or workflows.

Today Vertex runs across four RKE2 nodes on openSUSE Leap. It hosts my own applications, including Kontor2, Rendant, Kataster, Fortuna and Remise, alongside Paperless, Vaultwarden and several websites. My mail service remains on its own host.

<figure class="mail-diagram vertex-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Vertex platform architecture.">
    <img src="/diagrams/vertex/en-architecture.svg" alt="Vertex architecture showing public routing, Fleet reconciliation, Garage object storage and Longhorn volumes on four RKE2 nodes." width="615" height="1036" loading="lazy" decoding="async" />
  </div>
  <figcaption>How traffic, deployments and storage come together on Vertex. <a href="/diagrams/vertex/en-architecture.svg">Open full-size diagram</a>.</figcaption>
</figure>

### Building a platform I can operate

Three nodes run the control plane and embedded etcd; a fourth adds capacity for applications. I use Rancher to manage the cluster and Fleet to reconcile each service from a private Git repository. GitHub Actions builds and scans application images, and verified digests are promoted into the deployment configuration.

<figure class="mail-diagram vertex-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Application delivery flow.">
    <picture>
      <source media="(max-width: 600px)" srcset="/diagrams/vertex/en-delivery-mobile.svg" />
      <img src="/diagrams/vertex/en-delivery.svg" alt="Application source passes through GitHub Actions and GHCR into Fleet and a Kubernetes workload." width="552" height="110" loading="lazy" decoding="async" />
    </picture>
  </div>
  <figcaption>From a reviewed source change to a running workload. <a href="/diagrams/vertex/en-delivery.svg">Open full-size diagram</a>.</figcaption>
</figure>

<figure class="vertex-screenshot">
  <a href="/images/vertex/fleet.webp"><img src="/images/vertex/fleet.webp" alt="Rancher Continuous Delivery dashboard showing the Vertex Fleet bundles and their reconciliation status." width="1600" height="753" loading="lazy" decoding="async" /></a>
  <figcaption>Fleet's view of the platform and application bundles. Production snapshot, November 2026.</figcaption>
</figure>

For public traffic, Traefik routes requests through Kubernetes Gateway API. cert-manager handles certificate issuance, while ExternalDNS and Route 53 manage selected DNS records. Existing sites keep their CloudFront distributions and protected origins.

<figure class="vertex-screenshot">
  <a href="/images/vertex/nodes.webp"><img src="/images/vertex/nodes.webp" alt="Rancher node list showing three control-plane nodes and one worker in the Vertex cluster." width="1600" height="753" loading="lazy" decoding="async" /></a>
  <figcaption>The four-node cluster in Rancher. Production snapshot, November 2026.</figcaption>
</figure>

### Bringing the data with me

The move was more than replacing containers. Paperless documents, password vaults, CMS databases and application files all needed to arrive intact. I stopped each old writer for the final transfer, restored the data on Vertex and checked the result against its source. For Paperless, that included comparing the original files by checksum; for object storage, it included checksum verification and application-level reads.

Longhorn now supplies replicated volumes for application files and databases. I tested a volume by moving a disposable workload between nodes and reading back what it had written. For applications that need object storage, I added Garage and migrated their files into private S3-compatible buckets with separate credentials. Kontor2 uses signed uploads and downloads, while Remise keeps its records and media access separate.

<figure class="mail-diagram vertex-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Persistent data architecture.">
    <img src="/diagrams/vertex/en-storage.svg" alt="Applications use Longhorn for database and file volumes and Garage object storage, with three Longhorn volume replicas." width="596" height="489" loading="lazy" decoding="async" />
  </div>
  <figcaption>Application data, object storage and replicated volumes. <a href="/diagrams/vertex/en-storage.svg">Open full-size diagram</a>.</figcaption>
</figure>

### From migration to daily use

Vertex is where I now run both personal tools and software used by real organisations. That changed how I approached the final details: existing hostnames and media paths had to keep working, releases needed a repeatable path from source to cluster, and health checks had to reflect whether an application was actually ready.

One example is Kontor2: I separated the process liveness check from dependency-aware readiness, so a slow database does not automatically cause the application to be restarted. Paperless also runs its document AI adapter inside the cluster.

<figure class="vertex-screenshot">
  <a href="/images/vertex/cluster.webp"><img src="/images/vertex/cluster.webp" alt="Rancher cluster dashboard showing Vertex resources, node count, deployments and capacity." width="1600" height="753" loading="lazy" decoding="async" /></a>
  <figcaption>The cluster dashboard during day-to-day operation. Production snapshot, November 2026.</figcaption>
</figure>

The result is a platform I use to build, deploy and operate my own services, with the application and infrastructure work treated as one project. The infrastructure repository is private; the [website application build sources](https://github.com/Paul1404/web-services) are public.
