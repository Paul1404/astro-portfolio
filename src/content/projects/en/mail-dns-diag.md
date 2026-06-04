---
title: "Mail DNS Diagnostics"
publishDate: 2025-06-25 00:00:00
description: "A Bash script that audits every DNS and mail-security record for a domain in one pass."
stack:
  - Bash
  - DNS
tags:
  - Email
  - Security
  - CLI
repoUrl: https://github.com/Paul1404/mail_dns_diag.sh
status: shipped
icon: search-check
---

Diagnosing mail delivery problems means checking a long list of DNS records, and it is easy to miss one. This runs the whole audit in a single command.

### What it does

- Checks the essential DNS and mail-security records for a domain, including SPF, DKIM, DMARC and the supporting infrastructure records.
- Reports what is present, what is missing and what looks misconfigured.
- Runs anywhere Bash does, with no dependencies to install.

### Why it matters

When email is not arriving, this turns a tedious manual checklist into one readable report.
