---
title: "Vertex Kubernetes Platform"
publishDate: 2026-11-08 00:00:00
description: "A three-node RKE2 platform for websites and personal applications, with Fleet-driven deployments, replicated storage, and managed HTTPS and DNS."
stack:
  - RKE2
  - Kubernetes
  - Rancher Fleet
  - Longhorn
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
  image: vertexEn
  alt: "Diagram of the Vertex platform with Fleet, an HTTPS gateway, three RKE2 nodes and Longhorn"
  caption: "Architecture diagram of the Vertex platform."
---

Vertex is the Kubernetes platform I built to move my websites and personal applications off a single, increasingly busy server. It runs across three virtual machines, each with six vCPUs and 12 GB of memory, on a private network. The cluster hosts WordPress and REDAXO sites alongside Paperless, Vaultwarden, Umami and Monica CRM. My mail service remains separate.

The project followed an earlier single-host web deployment system. That system had a clear release process, but its workloads and their data shared one machine. Vertex moves the application configuration, networking and storage into a three-node platform that I can operate through Kubernetes and Rancher.

<figure class="mail-diagram">
  <div class="mail-diagram-scroll" tabindex="0" role="region" aria-label="Vertex platform architecture. Scroll sideways on smaller screens.">
    <img src="/diagrams/vertex/en-architecture.svg" alt="Vertex architecture showing public traffic, Gateway API routing, Fleet reconciliation and Longhorn storage across three RKE2 nodes." width="552" height="772" loading="lazy" decoding="async" />
  </div>
  <figcaption>Public traffic, application delivery and replicated storage on Vertex. <a href="/diagrams/vertex/en-architecture.svg">Open full-size diagram</a>. Scroll sideways on smaller screens.</figcaption>
</figure>

### A three-node platform

I provisioned the nodes with openSUSE Leap and RKE2, using the private network for cluster communication. All three servers participate in the control plane and embedded etcd. Rancher provides the management interface, and Fleet pulls the desired state from a private repository.

Each application has its own namespace, services, persistent volume claims and deployment configuration. Credentials are provisioned separately from Git. Website releases are built and checked in GitHub Actions, published as immutable images and promoted into the Fleet repository. Kubernetes then pulls the pinned images and reconciles the workloads.

### Storage that can move with a workload

The original applications used volumes local to one host. On Vertex, Longhorn provides persistent volumes with three replicas across the nodes. That gives a workload a path to restart on another node with its data when a node becomes unavailable.

I exercised this with a disposable volume: data written on one node was read after the workload was moved to another. Replication is not an offsite backup, and a single application or database replica still needs time to restart and attach its volume. At the initial cutover, offsite backup and restore automation remained work to complete.

### HTTPS and service routing

Traefik exposes a Kubernetes Gateway and HTTPRoutes instead of a separate proxy container for every application. cert-manager obtains the wildcard certificate through Route 53 DNS validation, while ExternalDNS manages selected application records. Three Route 53 health checks control the public edge addresses.

Existing website domains continue through CloudFront, with origin verification at the gateway. The DNS health checks establish that the ingress is reachable; they do not prove that every application behind it is healthy. DNS caching also affects how quickly clients move away from an unavailable node.

### Moving the applications

I moved Paperless, Vaultwarden, Umami and the three CMS sites individually. For each, the old writer was stopped before the final database and file transfer. The existing public addresses were then pointed at Vertex, and the old data was retained as a stopped recovery copy.

The checks matched the application to the type of data: Paperless's 285 originals were compared by checksum, Vaultwarden's restored database retained its vault entries, and Umami retained its seven website definitions. The website homepages and the REDAXO login page were checked after the move. A recovery back to the old host would require synchronising any changes made on Vertex first.

### What remains

The cluster has three control-plane members and replicated volumes, but that is not a claim of uninterrupted service. Most applications and databases initially run as single replicas. The RKE2 registration endpoint still depends on one node, and offsite backups, encryption for the new application volumes and restore testing remain priorities.

Vertex gives me a practical platform for learning and operating a more conventional Kubernetes stack, while keeping the limitations of a small three-node environment visible. The infrastructure configuration is private; the [website application build sources](https://github.com/Paul1404/web-services) are public.
