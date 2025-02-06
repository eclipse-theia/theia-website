---
title: Theia Coder, AI-Powered Development in the Theia IDE
---

# Theia Coder: AI-Powered Development in the Theia IDE

This page provides details about the Theia Coder agent in the Theia IDE, please also refer to [the general introduction to the AI features in the Theia IDE](/docs/user_ai).
Theia Coder is an AI-powered coding agent integrated into the Theia IDE, currently released as a **preview version**. To improve and refine it, please [provide feedback](https://github.com/eclipse-theia/theia). The preview comes with two prompt variants:
- **Default**: Coder will always replace full files when proposing changes. This might be slow but is accurate in most cases.
- **coder-search-replace**: Coder can also search and replace for faster editing. This is faster in many cases, but Coder might need several attempts.

We recommend trying the **"coder-search-replace"** prompt and switching back to the default if you find issues. You can change this setting in the AI configuration view under **"Coder" => "Prompt Templates"**.

## Using Theia Coder
Theia Coder functions as a chat agent within Theia AI Chat. To interact with it, simply reference it using `@Coder` in the chat.

### Key Capabilities
1. **Retrieving Context**: Coder can browse the current workspace to find relevant code.
2. **Proposing Changes**: It provides structured code modifications that users can review and apply automatically.

In the following example video, we provide a simple task to Coder to demonstrate the full work flow.

<img src="../../theia-coder.gif" alt="Demo of Theia Coder, the personal AI developement assistant in the Theia IDE" style="max-width: 800px">


### Describing Programming Tasks
To use Theia Coder effectively, describe your programming task in clear natural language. Coder will search your workspace for relevant code, but you can improve efficiency by specifying key locations, such as:
- Code files that need to be modified
- Supporting files that contribute to understanding the task (e.g., interface definitions or similar implementations)

## Ways to Specify Relevant Context
Please note that we are currently working on making context creation even more efficient by allowing users to **drag and drop files** as well as using **keyboard shortcuts**.

There are multiple ways to help Coder find the right files efficiently:

#### 1. Natural Language
You can describe the location in plain text, such as:
> "In the `ai-mcp` package under `src/browser`."

While Coder will still need to search, this helps it focus on the right area.

#### 2. Providing Relative File Paths
Copy and paste a file's relative path into the chat to directly guide Coder to a specific file. You can obtain this by right-clicking a file or editor tab and selecting "Copy Relative Path."

#### 3. Using Context Variables
Theia Coder supports predefined variables that dynamically provide relevant context:
- `#relativeFile` – The relative path of the currently selected file (in the editor or explorer)
- `#relativeFileDirname` – The directory path of the currently selected file
- `#selectedText` – The currently highlighted text in the editor

## Reviewing and Applying Code Changes
Based on your task and the provided context, Theia Coder generates proposed code changes. This process may take some time. For transparency, you can observe which files Coder accesses in the chat.

To apply changes, Theia Coder utilizes Theia AI’s changeset feature:
- A list of modified files appears above the chat input field.
- Click on an entry to view a **diff editor**, comparing the previous and new state.
- In the diff editor, selectively apply changes.
- Alternatively, apply or revert changes directly from the changeset overview.
- If needed, you can clear individual changes or the entire changeset.

## Summary
Theia Coder enhances AI-driven development by:
- Understanding natural language requests
- Browsing workspace context
- Generating structured code modifications
- Providing an intuitive interface for reviewing and applying changes

Please remember that Theia Coder is currently released as a **preview version**. To improve and refine it, please [provide feedback](https://github.com/eclipse-theia/theia).

Please also note that Theia Coder is built on [Theia AI](/docs/theia_ai), a flexible framework for build AI-powered tools and IDEs. You can easily adopt or extend Theia Coder or build a similar agent for your own use case with ease.
