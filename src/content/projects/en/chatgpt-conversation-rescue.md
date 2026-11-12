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

A ChatGPT conversation had grown so long that working with it became frustrating. The messages were still there, but saving them meant scrolling through the history and copying them by hand. I wanted the conversation in a form I could actually keep and work with.

ChatGPT Conversation Rescue retrieves the data behind an open conversation and saves it as JSON. A small local converter turns the active conversation into a readable transcript. In the case that prompted the project, that meant recovering 1,353 user and assistant entries from a conversation with 3,899 nodes.

### How to save a stuck ChatGPT conversation

Open the conversation in a browser where you are signed in, then run the recovery script in the browser's developer console. The script requests the conversation using the existing session and saves the response as a JSON file in your downloads.

To make it easier to read or search, run the included Node.js converter against that file. It follows the current conversation from the latest message back to the root, then writes the user and assistant text in order. The JSON keeps the other conversation branches returned by ChatGPT too.

[Get the script and step-by-step instructions on GitHub](https://github.com/Paul1404/chatgpt-conversation-rescue).

### What you get

The JSON is useful when you want to keep the original structure and metadata. The transcript is a straightforward text file you can search, copy, or use as a starting point for a new conversation. Images and other non-text content appear as placeholders in the transcript; the tool does not download the attachment files.

The recovery uses a ChatGPT web endpoint intended for its own interface. It worked for my conversation, but OpenAI may change it. The browser needs to be signed in and able to access the conversation.
