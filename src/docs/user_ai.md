---
title: Using the AI Features in the Theia IDE as an End User
---

# Using the AI Features in the Theia IDE as an End User

This section documents how to use AI features in the Theia IDE (available since version 1.54, see also [this introduction](https://eclipsesource.com/blogs/2024/10/08/introducting-ai-theia-ide/)). These features are based on Theia AI, a framework for building AI assistance in tools and IDEs. Theia AI is part of the Theia platform. If you're interested in building your own custom tool or IDE with Theia AI, please refer to [the corresponding documentation](/docs/theia_ai).

**Please note that these features are in early access and experimental. This means they may be unstable, behave unexpectedly, or undergo significant changes. In particular, using your own LLM might incur costs that you need to monitor closely. We have not yet optimized the AI assistants in the Theia IDE for token usage. Use these features at your own risk, and we welcome any feedback, suggestions, and contributions!**

Theia AI features within the Theia IDE are currently disabled by default. See the next section on how to enable them.

## Table of Contents
- [Set-Up](#set-up)
  - [OpenAI (Hosted by OpenAI)](#openai-hosted-by-openai)
  - [OpenAI Compatible Models (e.g. via VLLM)](#openai-compatible-models-eg-via-vllm)
  - [LlamaFile](#llamafile-models)
  - [Ollama](#ollama)
- [Current Agents in the Theia IDE](#current-agents-in-the-theia-ide)
  - [Universal (Chat Agent)](#universal-chat-agent)
  - [Orchestrator (Chat Agent)](#orchestrator-chat-agent)
  - [Command (Chat Agent)](#command-chat-agent)
  - [Workspace (Chat Agent)](#workspace-chat-agent)
  - [Code Completion (Agent)](#code-completion-agent)
  - [Terminal Assistance (Agent)](#terminal-assistance-agent)
- [Chat](#chat)
- [AI Configuration](#ai-configuration)
  - [View and Modify Prompts](#view-and-modify-prompts)
- [AI History](#ai-history)
- [Learn more](#learn-more)

## Set-Up

To activate AI support in the Theia IDE, go to Preferences and enable the setting “AI-features => AI Enable.”

To use Theia AI within the Theia IDE, you need to provide access to at least one LLM. Theia IDE comes with preinstalled support for OpenAI API-compatible models, either hosted by OpenAI or self-hosted via VLLM. Additionally, Theia IDE supports connecting to models via Ollama. See the corresponding sections below on how to configure these providers.

Other LLM providers, including local models, can be added easily. We are also working on enabling LLamaFile support in the near future. If you would like to see support for a specific LLM, please provide feedback or consider contributing.

Each LLM provider offers a configurable list of available models (see the screenshot below for OpenAI models). To use a model in your IDE, configure it on a per-agent basis in the AI Configuration view.

### OpenAI (Hosted by OpenAI)

To enable the use of OpenAI, you need to create an API key in your OpenAI account and enter it in the settings dialog (see the screenshot below). Please note that creating an API key requires a paid subscription, and using these models may incur additional costs. Be sure to monitor your usage carefully to avoid unexpected charges. We have not yet optimized the AI assistants in the Theia IDE for token usage.

<img src="../../enter-openai-key.png" alt="Open AI configuration in the Theia IDE" style="max-width: 525px">

The OpenAI provider is preconfigured with a list of available models. You can easily add new models to this list, for example, if new options are released.

### OpenAI Compatible Models (e.g. via VLLM)

As an alternative to using an official OpenAI account, Theia IDE also supports arbitrary models compatible with the OpenAI API (e.g., hosted via [VLLM](https://docs.vllm.ai/en/latest/)). This enables you to connect to self-hosted models with ease. To add a custom model, click on the link in the settings section and add your configuration like this:

```json
{
   "ai-features.openAiCustom.customOpenAiModels": [
       {
           "model": "your-model-name",
           "url": "your-URL",
           "id": "your-id"
       }
   ]
}
```
### LlamaFile Models

To configure a LlamaFile LLM in the Theia IDE, add the necessary settings to your configuration (see example below)

```json
{
   "ai-features.llamafile.llamafiles": [
       {
           "name": "modelname", //you can choose a name for your model
           "uri": "file:///home/.../YourModel.llamafile",
           "port": 30000 //you can choose a port to be used by llamafile
       }
   ]
}
```

Replace "name", "uri", and "port" with your specific LlamaFile details.

The Theia IDE also offers convenience commands to start and stop your LlamaFiles:
- Start a LlamaFile: Use the command "Start Llamafile", then select the model you want to start.
- Stop a LlamaFile: Use the "Stop Llamafile" command, then select the running Llamafile which you want to terminate.

Please make sure that your LlamaFiles are executable.
For more details on LlamaFiles, including a quickstart, see the official [Mozilla LlamaFile documentation](https://github.com/Mozilla-Ocho/llamafile).

### Ollama

To connect to models hosted via [Ollama](https://ollama.com/), enter the corresponding URL, along with the available models, in the settings (as shown below).

<img src="../../ollama-setting.png" alt="Ollama configuration in the Theia IDE" style="max-width: 525px">

## Current Agents in the Theia IDE

This section provides an overview of the currently available agents in the Theia IDE. Agents marked as “Chat Agents” are available in the global chat, while others are directly integrated into UI elements, such as code completion. You can configure and deactivate agents in the AI Configuration view.

### Universal (Chat Agent)

This agent helps developers by providing concise and accurate answers to general programming and software development questions. It also serves as a fallback for generic user questions. By default, this agent does not have access to the current user context or workspace. However, you can add variables, such as `#selectedText`, to your requests to provide additional context.

### Orchestrator (Chat Agent)

This agent analyzes user requests against the descriptions of all available chat agents and selects the best-fitting agent to respond (using AI). The user's request is delegated to the selected agent without further confirmation. The Orchestrator is currently the default agent in the Theia IDE for all chat requests. You can deactivate it in the AI Configuration View.

### Command (Chat Agent)

This agent is aware of all commands available in the Theia IDE and the current tool the user is working with. Based on the user request, it can find the appropriate command and let the user execute it.

### Workspace (Chat Agent)

This agent can access the user's workspace, retrieve a list of all available files, and view their content. It can answer questions about the current project, including project files and source code in the workspace, such as how to build the project, where to place source code, or where to find specific files or configurations.

### Code Completion (Agent)

This agent provides inline code completion within the Theia IDE's code editor. It continuously shows suggestions while writing, and users can press TAB to insert the current suggestion. Note that this agent makes continuous requests to the underlying LLM while coding.

### Terminal Assistance (Agent)

This agent assists with writing and executing terminal commands. Based on the user's request, it suggests commands and allows them to be directly pasted and executed in the terminal. It can access the current directory, environment, and recent terminal output to provide context-aware assistance. You can open the terminal assistance agent via Ctrl+I in the terminal view.

## Chat

The Theia IDE provides a global chat interface where users can interact with all chat agents. The Orchestrator automatically delegates user requests to the most appropriate agent. To send a request directly to a specific agent, mention the agent's name using '@', for example, '@Command'. Press '@' in the chat to see a list of available chat agents.

<img src="../../general-chat.png" alt="General AI Chat in the Theia IDE" style="max-width: 525px">

Some agents produce special results, such as buttons (shown in the screenshot above) or code that can be directly inserted. You can augment your requests in the chat with context by using variables. For example, to refer to the currently selected text, use `#selectedText` in your request. Pressing '#' in the chat will show a list of available variables.

## AI Configuration

The AI Configuration View allows you to review and adapt agent-specific settings. Select an agent on the left side and review its properties on the right:

- **Enable Agent**: Disabled agents will no longer be available in the chat or UI elements. Disabled agents also won't make any requests to LLMs.
- **Edit Prompts**: Click "Edit" to open the prompt template editor, where you can customize the agent's prompts (see the section below). "Reset" will revert the prompt to its default.
- **Language Model**: Select which language model the agent sends its requests to. Some agents have multiple "purposes," allowing you to select a model for each purpose.
- **Variables and Functions**: Review the variables and functions used by an agent. Global variables are shared across agents, and they are listed in the second tab of the AI Configuration View. Agent-specific variables are declared and used exclusively by one agent.

<img src="../../ai-configuration-view.png" alt="AI Configuration View in the Theia IDE" style="max-width: 800px">

### View and Modify Prompts

In the Theia IDE, you can open and edit prompts for all agents from the AI Configuration View. Prompts are shown in a text editor (see the screenshot below). Changes saved in the prompt editor will take effect with the next request made to the corresponding agent. You can reset a prompt to its default using the "Reset" button in the AI configuration view or the "Revert" toolbar item in the prompt editor (top-right corner).

<img src="../../prompt-editor.png" alt="Prompt Editor in the Theia IDE" style="max-width: 800px">

Variables and functions can be used in prompts. Variables are replaced with context-specific information at the time of the request (e.g., the currently selected text), while functions can trigger actions or retrieve additional information. You can find an overview of all global variables in the "Variables" tab of the AI Configuration View and agent-specific variables in the agent's configuration.

Variables are used with the following syntax:
``` 
{{variableName}}
```

Tool functions are used with the following syntax:
``` 
~{functionName}
```

## AI History

The AI History view allows you to review all communications between agents and underlying LLMs. Select the corresponding agent at the top to see all its requests in the section below.

<img src="../../history-view.png" alt="AI History View in the Theia IDE" style="max-width: 800px">

## Learn more

If want to learn more about the AI support in the Theia AI, please see [this introduction](https://eclipsesource.com/blogs/2024/10/08/introducting-ai-theia-ide/), [our article on the vision of Theia AI](https://eclipsesource.com/blogs/2024/09/16/theia-ai-vision/) and the demonstrations in [Sneak Preview Series about Theia AI](https://eclipsesource.com/blogs/2024/09/18/theia-ai-sneak-preview-transparent-code-completion/)