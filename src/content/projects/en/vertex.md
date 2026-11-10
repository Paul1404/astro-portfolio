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

Vertex is the Kubernetes platform I built to bring my websites, personal applications and club software together. Four virtual machines, each with six vCPUs and 12 GB of memory, run openSUSE Leap and RKE2 on a private network. The platform hosts WordPress and REDAXO sites alongside Paperless, Vaultwarden, Monica CRM and applications such as Kontor2, Rendant, Kataster, Fortuna and Remise. My Stalwart mail service remains on its own host.

The project grew from a single-server website deployment into a platform for operating a diverse set of applications with a shared approach to delivery, networking and storage. I designed and run the infrastructure, moved the workloads and adapted their deployment pipelines to the new environment.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Vertex platform architecture. Scroll sideways on smaller screens.">
    <img src="/diagrams/vertex/en-architecture.svg" alt="Vertex architecture showing public routing, Fleet reconciliation, Garage object storage and Longhorn volumes on four RKE2 nodes." width="552" height="924" loading="lazy" decoding="async" />
  </div>
  <figcaption>Public traffic, application delivery and storage on Vertex. <a href="/diagrams/vertex/en-architecture.svg">Open full-size diagram</a>. Scroll sideways on smaller screens.</figcaption>
</figure>

### Kubernetes and GitOps

Three RKE2 servers form the control plane with embedded etcd; a fourth node adds capacity for workloads. Rancher provides the management interface. Fleet reconciles platform components and application configurations from a private Git repository, with separate bundles for each service.

Applications run in their own namespaces with Kubernetes Services, health checks and resource settings. Credentials are provisioned separately from Git. GitHub Actions builds and scans application images before publishing them to GHCR; verified image digests are promoted into the Fleet configuration and deployed by Kubernetes.

### Persistent volumes and object storage

Longhorn provides replicated persistent volumes for application files and databases. I tested moving a disposable workload between nodes and reading back the data after its volume was attached. The platform uses three replicas for these volumes, while applications can retain a single active database or service instance where their data model requires it.

For S3-compatible object storage, I added Garage to the cluster and migrated application files into separate private buckets with scoped credentials. Fortuna stores documents there, Kontor2 uses signed uploads and downloads, and Remise separates its application records from media access. Rendant uses its own bucket. This brings object storage into the same platform while keeping each application's access separate.

### Public routing and certificates

Traefik serves a Kubernetes Gateway with HTTPRoutes. cert-manager obtains certificates using DNS validation, and ExternalDNS manages selected Route 53 records. Health-checked DNS directs public traffic to the ingress nodes. Existing website domains continue through CloudFront with origin verification at the gateway.

### Moving real workloads

I migrated Paperless, Vaultwarden, Umami and three CMS sites from the original host, then moved applications and databases from Railway. Each migration followed the needs of its data and public interfaces: stop the old writer, transfer and restore the data, update the route, and verify the result.

The checks were specific to each service. Paperless originals were compared by checksum, restored databases were checked against their source, and object migrations used checksums and application-level reads. Existing public hostnames and media paths were preserved where needed. The old application volumes on the original host were later removed after the migrations.

### Operating the platform

Running the applications together also means treating their health checks and delivery as part of the product. I separated liveness from dependency-aware readiness for Kontor2, so a slow database does not automatically imply that its application process needs a restart. Paperless document processing uses an in-cluster AI adapter alongside its normal document workflow.

Vertex combines infrastructure engineering with the practical work of moving and operating real applications. The infrastructure configuration is private; the [website application build sources](https://github.com/Paul1404/web-services) are public.
