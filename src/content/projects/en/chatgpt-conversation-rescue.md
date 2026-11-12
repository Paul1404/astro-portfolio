---
title: "ChatGPT Conversation Rescue"
publishDate: 2026-11-12 00:00:00
description: "Save a stuck or very long ChatGPT conversation as JSON and a readable transcript, without manually copying thousands of messages."
stack:
  - JavaScript
  - Node.js
  - Browser DevTools
tags:
  - Data Recovery
  - ChatGPT
  - Developer Tools
repoUrl: https://github.com/Paul1404/chatgpt-conversation-rescue
icon: terminal
---

A long ChatGPT conversation became difficult to use, but its history was still accessible in the browser. Scrolling through the entire chat and copying each message would have taken a long time, so I built a small recovery tool instead.

### Save a stuck ChatGPT conversation

The script runs in the developer console of the conversation already open in your browser. It uses the existing signed-in session to retrieve the conversation data and downloads it as JSON. A separate Node.js command follows the active conversation path and produces a readable text transcript.

In the original recovery, the response contained 3,899 conversation nodes. The active path reached the root and produced 1,353 user and assistant text entries. The original JSON also retains alternate branches returned by the service.

### Privacy and limitations

The script makes requests to ChatGPT from the signed-in browser and saves the result locally. It does not send the conversation to a separate service. The readable transcript marks images and other non-text content as placeholders; it does not download the attachments themselves.

The method relies on an undocumented ChatGPT web endpoint, so it may stop working if the service changes. The repository includes instructions, the recovery script, a local converter, and tests using fictional data. It does not contain the recovered conversation.
