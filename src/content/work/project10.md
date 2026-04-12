---
title: "Batch Archiving GitHub Repositories with gh-batch-archive"
publishDate: 2025-08-19 00:00:00
img: /assets/gh-batch-archive.png
img_alt: Terminal screenshot showing batch archiving of GitHub repos
description: |
  I built a Bash tool to safely and efficiently archive or unarchive dozens of GitHub repositories at once, with interactive selection, dry-run, and clear feedback. Here's why I made it and how it works.
tags:
  - GitHub
  - Automation
  - Bash
  - CLI
  - Open Source
---

Managing a bunch of GitHub repositories can get messy - especially when you want to archive or unarchive a whole batch at once. I built a tool called **gh-batch-archive** to make this painless and safe.

### Background

I had a pile of old projects and test repos cluttering up my GitHub. Archiving them one by one was tedious, and I wanted a way to:

- Select multiple repos interactively (with [fzf](https://github.com/junegunn/fzf) or a simple menu)
- Filter by name or pattern
- Preview changes before making them (dry-run)
- Archive or unarchive in bulk, with clear confirmation and logging

### What Does gh-batch-archive Do?

It's a Bash script that leverages the [GitHub CLI](https://cli.github.com/) (`gh`) to:

- **List all your (or your org's) repositories**
- **Filter them by name or regex**
- **Let you select which ones to process**
- **Archive or unarchive them in parallel**
- **Show a clear summary and require confirmation before making changes**
- **Log all actions for safety**

### How It Works

1. **Clone the Repo and Make Executable:**
   ```sh
   git clone https://github.com/Paul1404/gh-batch-archive.git
   cd gh-batch-archive
   chmod +x gh-batch-archive.sh
   ```

2. **Authenticate with GitHub CLI:**
   ```sh
   gh auth login
   ```

3. **Run the Script:**
   ```sh
   ./gh-batch-archive.sh --interactive
   ```

   You'll see a list of your repos. Select as many as you want (with fzf, use TAB/ENTER; with the menu, type numbers).

4. **Review the Summary:**
   The script prints a clear summary of what will happen (archive/unarchive, how many repos, which ones, and whether it's a dry-run).

5. **Confirm and Go:**
   Only after you confirm does it actually make changes. All actions are logged.

### Example: Archiving All Test Repos

```sh
./gh-batch-archive.sh --pattern "test" --dry-run
```
This will show you which repos *would* be archived, but won't actually do it until you remove `--dry-run`.

### Key Features

- **Explicit, colorful messaging** at every step (no surprises)
- **Dry-run mode** for safe previews
- **Parallel processing** for speed
- **Works with or without fzf** (falls back to a menu)
- **Easy to extend or adapt** for your own workflow

### Tips and Gotchas

- **Always use dry-run first** if you're unsure.
- **fzf** is optional but makes selection much nicer.
- **You need admin rights** on the repos to archive/unarchive them.
- **Check the log file** (`gh-batch-archive.log` by default) for a record of what happened.

### Summary

If you're managing more than a handful of GitHub repos, this tool can save you a ton of time and prevent mistakes.
It's open source - [check it out on GitHub](https://github.com/Paul1404/gh-batch-archive) and feel free to contribute or suggest features.
