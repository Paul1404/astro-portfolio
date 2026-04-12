---
title: "Observability Stack with Traefik, Prometheus, Grafana, and Jaeger"
publishDate: 2025-05-21 23:00:00
img: /assets/traefik-observability-stack.png
img_alt: Screenshot of Grafana and Jaeger dashboards showing live traces and metrics
description: |
  I set out to build a secure observability stack using Traefik, Prometheus, Grafana, and Jaeger - all running in Docker. Here's what worked, what tripped me up, and the lessons I learned.
tags:
  - Traefik
  - Prometheus
  - Grafana
  - Jaeger
  - OpenTelemetry
  - Docker
  - Observability
---

I wanted a **secure, production-grade observability stack** for my Dockerized services - something that would give me **metrics, dashboards, and distributed tracing** with minimal fuss. Here's how I did it and what tripped me up.

### What Did I Build?

- **Traefik v3.x** as my reverse proxy and entrypoint for all services
- **Prometheus** scraping Traefik and other services for metrics
- **Grafana** for dashboards
- **Jaeger v2 (OpenTelemetry all-in-one)** for distributed tracing
- **Everything running in Docker, with persistent storage and secure routing**

### The Process (and the Gotchas)

#### 1. Traefik as the Gateway

I started with Traefik, using Docker labels for routing and Let's Encrypt for HTTPS.
**Tip:** Traefik's Docker provider makes it straightforward to add new services - just add the right labels.

#### 2. Metrics with Prometheus and Grafana

Prometheus scrapes Traefik's `/metrics` endpoint (exposed on the Docker network, not the public internet).
Grafana connects to Prometheus and gives me instant dashboards.

**Gotcha:**
Prometheus **requires a config file** (`prometheus.yml`). There's no way around it, but you can keep it minimal.

#### 3. Distributed Tracing with Jaeger v2

This was the trickiest part. I wanted to use the latest Jaeger (v2, OpenTelemetry-based) and have Traefik send traces directly.

- **Traefik v3.x** uses new OTLP flags (`--tracing.otlp.*`), not the old Jaeger flags.
- **Jaeger v2** is configured via YAML, not environment variables or CLI flags.
- **Badger storage** is the default for persistence, but the config is just `badger: {}` - no directory or ephemeral keys.

**Key insight:**
If you see errors like `unknown flag: --config-file` or `badger has invalid keys: directory`, check the docs and examples for your exact Jaeger version. The config format changed a lot between v1 and v2.

#### 4. Secure Everything with Traefik

All UIs (Grafana, Jaeger, Prometheus) are only accessible via Traefik, with HTTPS and optional authentication.
**Portainer** is exposed on a high port (9443) as a failsafe for Docker management.

### Syntax Caveats and Debugging

- **YAML is picky.**
  Indentation and file paths matter. A trailing slash in a Docker volume mount can break everything.
- **Logs are your friend:**
  If something doesn't work, check the logs for Traefik, Jaeger, and Prometheus. Most issues are config typos or wrong flags.
- **Network matters:**
  All containers must be on the same Docker network for service discovery to work.

### Useful Tips

- **Sampling Rate:**
  100% sampling fills up storage fast. Lower it in Traefik if you don't need every trace.
- **Persistent Storage:**
  Use Docker volumes for Grafana, Prometheus, and Jaeger. For Jaeger, just mount to `/badger` and use `badger: {}` in the config.
- **Testing Traces:**
  If you don't see traces in Jaeger, make sure you're generating real traffic through Traefik and that your flags match the Jaeger config.
- **Firewall and Security:**
  Docker's iptables rules can override firewalld. Only publish the ports you need, and use Traefik for all public access.

### Closing Notes

Setting up an observability stack is achievable with Docker, but the devil is in the details - especially with config file formats and version mismatches.
Read the docs for your exact version, and don't be afraid to check the logs.

## Working Config Example

Here's a **real, working example** of my Jaeger v2 config and Docker Compose service (replace the domain and network names as needed for your environment):

**`jaeger-config.yaml`:**
```yaml
extensions:
  jaeger_storage:
    backends:
      badger_trace_storage:
        badger: {}

  jaeger_query:
    storage:
      traces: badger_trace_storage
    base_path: /
    ui:
      log_access: true
    grpc:
      endpoint: 0.0.0.0:16685
    http:
      endpoint: 0.0.0.0:16686

receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

service:
  extensions: [jaeger_storage, jaeger_query]
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [jaeger_storage_exporter]

exporters:
  jaeger_storage_exporter:
    trace_storage: badger_trace_storage
```

**Docker Compose service:**
```yaml
services:
  jaeger:
    image: jaegertracing/jaeger:latest
    container_name: jaeger-tracing
    restart: unless-stopped
    networks:
      - traefik
    volumes:
      - jaeger_data:/badger
      - ./jaeger-config.yaml:/etc/jaeger/config.yaml:ro
    command: ["--config=/etc/jaeger/config.yaml"]
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.jaeger.rule=Host(`jaeger.example.net`)"
      - "traefik.http.routers.jaeger.entrypoints=websecure"
      - "traefik.http.routers.jaeger.tls=true"
      - "traefik.http.services.jaeger.loadbalancer.server.port=16686"

networks:
  traefik:
    external: true

volumes:
  jaeger_data:
```

**Traefik tracing flags:**
```yaml
- "--tracing.otlp=true"
- "--tracing.otlp.grpc.endpoint=jaeger:4317"
- "--tracing.otlp.grpc.insecure=true"
```
