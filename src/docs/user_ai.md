---
title: Using the AI Features in the Theia IDE as an End User
---

# Using the AI Features in the Theia IDE as an End User

This section documents how to use AI features in the Theia IDE (available since version 1.54, see also [this introduction](https://eclipsesource.com/blogs/2024/10/08/introducting-ai-theia-ide/)). These features are based on Theia AI, a framework for building AI assistants in tools and IDEs. Theia AI is part of the Theia platform. If you're interested in building your own custom tool or IDE with Theia AI, please refer to [the corresponding documentation](/docs/theia_ai).

**Please note that these features are in alpha state. This means they may be unstable, behave unexpectedly, or undergo significant changes. In particular, using your own LLM might incur costs that you need to monitor closely. We have not yet optimized the AI assistants in the Theia IDE for token usage. Use these features at your own risk, and we welcome any feedback, suggestions, and contributions!**

Theia AI features within the Theia IDE are currently disabled by default. See the next section on how to enable them.

Learn more about the AI-powered Theia IDE:

👉 [Introducing the AI-powered Theia IDE: AI-driven coding with full Control](https://eclipsesource.com/blogs/2025/03/13/introducing-the-ai-powered-theia-ide/)

👉 [Download the AI-powered Theia IDE](/#theiaide)

## Table of Contents
- [Set-Up](#set-up)
  - [LLM Providers Overview](#llm-providers-overview)
  - [OpenAI (Hosted by OpenAI)](#openai-hosted-by-openai)
  - [OpenAI Compatible Models (e.g. via VLLM)](#openai-compatible-models-eg-via-vllm)
  - [Azure](#azure)
  - [Anthropic](#anthropic)
  - [Hugging Face](#hugging-face)
  - [LlamaFile](#llamafile-models)
  - [Ollama](#ollama)
  - [Custom Request Settings](#custom-request-settings)
- [Current Agents in the Theia IDE](#current-agents-in-the-theia-ide)
  - [Theia Coder - AI Coding assistant (separate page)](/docs/theia_coder)
  - [Universal (Chat Agent)](#universal-chat-agent)
  - [Orchestrator (Chat Agent)](#orchestrator-chat-agent)
  - [Command (Chat Agent)](#command-chat-agent)
  - [Workspace (Chat Agent)](#workspace-chat-agent)
  - [Code Completion (Agent)](#code-completion-agent)
  - [Terminal Assistance (Agent)](#terminal-assistance-agent)
- [Chat](#chat)
- [AI Configuration](#ai-configuration)
  - [View and Modify Prompts](#view-and-modify-prompts)
- [Custom Agents](#custom-agents)
- [MCP Integration](#mcp-integration)
- [SCANOSS](#scanoss)
- [AI History](#ai-history)
- [Learn more](#learn-more)

## Set-Up

To activate AI support in the Theia IDE, go to Preferences and enable the setting “AI-features => AI Enable.”

To use Theia AI within the Theia IDE, **you need to provide access to at least one LLM**. Theia IDE comes with preinstalled support for several LLM providers (including OpenAI API-compatible models and Anthropic). Additionally, Theia IDE supports connecting to models via Ollama. See the the [LLM Provider Overview](#llm-providers-overview) and the corresponding sections below on how to configure these providers.

If you do not have access to an LLM, yet, here is an easy way to try it out:

👉 [Testing the AI-Powered Theia IDE and Theia AI Applications for Free Using GitHub Models](https://eclipsesource.com/blogs/2025/03/12/testing-theia-ai-with-github-models/)

Other LLM providers, including local models, can be added easily. If you would like to see support for a specific LLM, please provide feedback or consider contributing.

Each LLM provider offers a configurable list of available models (see the screenshot below for Hugging Face Models models). 

**To use a specific model in your IDE, configure it on a per-agent basis in the [AI Configuration view](#ai-configuration).**

See also:

👉 [Why Theia supports any LLM!](https://eclipsesource.com/blogs/2025/02/27/why-theia-supports-any-llm/)

### LLM Providers Overview

*Note: Theia IDE enables connections to various models (e.g., HuggingFace, custom OpenAPI models, LlamaFile). However, not all models may work out of the box, as they may require specific customizations or optimizations. If you encounter issues, please [provide feedback](https://github.com/eclipse-theia/theia/issues/new/choose), keeping in mind this is an early-phase feature.*

**Many models and providers support using an OpenAI compatible API. In this case, we recommend using the [Theia AI provider for OpenAI Compatible Models](#openai-compatible-models-eg-via-vllm)**

Below is an overview of various Large Language Model (LLM) providers supported within the Theia IDE, highlighting their key features and current state.

<table>
  <tr>
    <th>Provider</th>
    <th>Streaming</th>
    <th>Tool Calls</th>
    <th>Structured Output</th>
    <th>State</th>
  </tr>
  <tr>
    <td><a href="#openai-hosted-by-openai">OpenAI Official</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Public</td>
  </tr>
  <tr>
    <td><a href="#openai-compatible-models-eg-via-vllm">OpenAI Compatible</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Public</td>
  </tr>
  <tr>
    <td><a href="#azure">Azure</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Public</td>
  </tr>
  <tr>
    <td><a href="#anthropic">Anthropic</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>❌</td>
    <td>Beta</td>
  </tr>
  <tr>
    <td><a href="#hugging-face">Hugging Face</a></td>
    <td>✅</td>
    <td>❌</td>
    <td>❌</td>
    <td>Experimental</td>
  </tr>
  <tr>
    <td><a href="#llamafile-models">LlamaFile</a></td>
    <td>✅</td>
    <td>❌</td>
    <td>❌</td>
    <td>Experimental</td>
  </tr>
  <tr>
    <td><a href="#ollama">Ollama</a></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Alpha</td>
  </tr>
</table>
</br>
</br>

### OpenAI (Hosted by OpenAI)

To enable the use of OpenAI, you need to create an API key in your OpenAI API account (https://platform.openai.com/) and enter it in the settings AI-features => OpenAiOfficial (see the screenshot below).
**Please note:** By using this preference the Open AI API key will be stored in clear text on the machine running Theia. Use the environment variable `OPENAI_API_KEY` to set the key securely.
Please also note that creating an API key requires a paid subscription, and using these models may incur additional costs. Be sure to monitor your usage carefully to avoid unexpected charges. We have not yet optimized the AI assistants in the Theia IDE for token usage.

<img src="../../enter-openai-key.png" alt="Open AI configuration in the Theia IDE" style="max-width: 525px">

The OpenAI provider is preconfigured with a list of available models. You can easily add new models to this list, for example, if new options are released.

### OpenAI Compatible Models (e.g. via VLLM)

As an alternative to using an official OpenAI account, Theia IDE also supports arbitrary models compatible with the OpenAI API (e.g., hosted via [VLLM](https://docs.vllm.ai/en/latest/)). This enables you to connect to self-hosted models with ease. To add a custom model, click on the link in the settings section and add your configuration like the following and check the [Readme](https://github.com/eclipse-theia/theia/tree/master/packages/ai-openai#custom-models) for all configuration options:

```json
{
   "ai-features.openAiCustom.customOpenAiModels": [
       {
           "model": "your-model-name",
           "url": "your-URL",
           "id": "your-unique-id", // Optional: if not provided, the model name will be used as the ID
           "apiKey": "your-api-key", // Optional: use 'true' to apply the global OpenAI API key
           "developerMessageSettings": "system" //Optional: Controls the handling of system messages: user, system, and developer will be used as a role, mergeWithFollowingUserMessage will prefix the following user message with the system message or convert the system message to user message if the next message is not a user message. skip will just remove the system message. Defaulting to developer.

       }
   ]
}
```

### Azure

All models hosted on Azure that are compatible with the OpenAI API are accessible via the [Provider for OpenAI Compatible Models](#openai-compatible-models-eg-via-vllm) provider. Note that some models hosted on Azure may require different settings for the system message, which are detailed in the [OpenAI Compatible Models](#openai-compatible-models-eg-via-vllm) section and the [Readme](https://github.com/eclipse-theia/theia/tree/master/packages/ai-openai#azure-openai).

### Anthropic

To enable Anthropics AI models in the Theia IDE, create an API key in your Anthropics API account (https://console.anthropic.com/) and
enter it in the Theia IDE settings under AI-features => Anthropics.

**Please note:** The Anthropics API key will be stored in clear text. Use the environment variable `ANTHROPIC_API_KEY` to set the key securely.

Configure available models in the settings under AI-features => AnthropicsModels.
Default supported models include choices like claude-3-5-sonnet-latest.

### Hugging Face

**Many hosting options and models on Hugging Face support using an OpenAI compatible API. In this case, we recommend using the [Theia AI provider for OpenAI Compatible Models](#openai-compatible-models-eg-via-vllm). The Hugging face provider only supports text generation at the moment for models not compatible with the OpenAI API.**

To enable Hugging Face as an AI provider, you need to create an API key in your Hugging Face account and enter it in the Theia IDE settings: AI-features => Hugging Face
**Please note:** By using this preference the Hugging Face API key will be stored in clear text on the machine running Theia. Use the environment variable `HUGGINGFACE_API_KEY` to set the key securely.
Note also that Hugging Face offers both paid and free-tier options (including "serverless"), and usage limits vary. Monitor your usage carefully to avoid unexpected costs, especially when using high-demand models.
Add or remove the desired Hugging Face models from the list of available models (see screenshot below). Please note that there is a copy button in the Hugging face UI to copy model IDs to the clipboard.

<img src="../../huggingface-models.png" alt="Hugging Face configuration in the Theia IDE" style="max-width: 525px">

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

**Some models on Ollama support using an OpenAI compatible API. In this case, we recommend using the [Theia AI provider for OpenAI Compatible Models](#openai-compatible-models-eg-via-vllm)**

### Custom Request Settings

You can define **custom request settings** for specific language models in the Theia IDE to tailor how models handle requests, based on their provider.

Add the settings in `settings.json`:

```json
"ai-features.modelSettings.requestSettings": [
    {
        "modelId": "Qwen/Qwen2.5-Coder-32B-Instruct",
        "requestSettings": { "max_new_tokens": 2048 },
        "providerId": "huggingface"
    },
    {
        "modelId": "gemma2",
        "requestSettings": { "stop": ["<file_sep>"] },
        "providerId": "ollama"
    }
]
```

Or navigate in the settings view to **`ModelSettings` => `Request Settings`**.

#### Key Fields
- **`modelId`**: The unique identifier of the model.
- **`requestSettings`**: Provider-specific options, such as token limits or stopping criteria.
- **`providerId`**: *(Optional)* Specifies the provider for the settings (e.g., `huggingface`, `ollama`, `openai`). If omitted, settings apply to all providers that match the `modelId`.

Valid options for `requestSettings` depend on the model provider.

## Current Agents in the Theia IDE

This section provides an overview of the currently available agents in the Theia IDE. Agents marked as “Chat Agents” are available in the global chat, while others are directly integrated into UI elements, such as code completion. You can configure and deactivate agents in the AI Configuration view.

### Theia Coder (Chat Agent)
An AI assistant designed to assist software developers. This agent can access the users workspace, it can get a list of all available files and folders and retrieve their content. Furthermore, it can suggest modifications of files to the user. It can therefore assist the user with coding tasks or other tasks involving file changes. See the dedicated [Theia Coder Documentation](/docs/theia_coder) for more details.

### Universal (Chat Agent)

This agent helps developers by providing concise and accurate answers to general programming and software development questions. It also serves as a fallback for generic user questions. By default, this agent does not have access to the current user context or workspace. However, you can add variables, such as `#selectedText`, to your requests to provide additional context.

### Orchestrator (Chat Agent)

This agent analyzes user requests against the descriptions of all available chat agents and selects the best-fitting agent to respond (using AI). The user's request is delegated to the selected agent without further confirmation. The Orchestrator is currently the default agent in the Theia IDE for all chat requests. You can deactivate it in the AI Configuration View.

### Command (Chat Agent)

This agent is aware of all commands available in the Theia IDE and the current tool the user is working with. Based on the user request, it can find the appropriate command and let the user execute it.

### Architect (Chat Agent)

An AI assistant designed to assist software developers. This agent can access the users workspace, it can get a list of all available files and folders and retrieve their content. It cannot modify files. It can therefore answer questions about the current project, project files and source code in the workspace, such as how to build the project, where to put source code, where to find specific code or configurations, etc.

### Code Completion (Agent)

This agent provides inline code completion within the Theia IDE's code editor. The agent supports both manual and automatic modes for code completion. When 'Automatic Code Completion' is enabled (which is the default), the agent makes continuous requests to the underlying LLM while coding, providing suggestions as you type.
In manual mode (triggered via Ctrl+Alt+Space by default), users have greater control over when AI suggestions appear. Requests are canceled when moving the cursor.

Users can switch between modes in the settings ('AIFeatures'=>'CodeCompletion'). 

Please note that there are two prompt variants available for the code completion agent, you can select them in the 'AI Configuration view' => 'Code Completion' => 'Prompt Templates'.

You can also adapt the used prompt template to your personal preferences or to the LLM you want to use, see for example [how to use the Theia IDE with StarCoder](https://eclipsesource.com/blogs/2025/01/21/using-starcode-for-ai-code-completion-in-theia-ide/).

In the settings, you can specify 'Excluded File Extensions' for which the AI-powered code completion will be deactivated.

The setting 'Strip Backticks' will remove surrounding backticks that some LLMs might produce (depending on the prompt).

Finally, the setting 'Max Context Lines' allows you to configure the maximum number of lines used for AI code completion context. This setting can be adjusted to customize the size of the context provided to the model, which is especially useful when using smaller models with limited token capacity.

### Terminal Assistance (Agent)

This agent assists with writing and executing terminal commands. Based on the user's request, it suggests commands and allows them to be directly pasted and executed in the terminal. It can access the current directory, environment, and recent terminal output to provide context-aware assistance. You can open the terminal assistance agent via Ctrl+I in the terminal view.

## Chat

The Theia IDE provides a global chat interface where users can interact with all chat agents. The Orchestrator automatically delegates user requests to the most appropriate agent. To send a request directly to a specific agent, mention the agent's name using '@', for example, '@Command'. Press '@' in the chat to see a list of available chat agents.

<img src="../../general-chat.png" alt="General AI Chat in the Theia IDE" style="max-width: 525px">

Some agents produce special results, such as buttons (shown in the screenshot above) or code that can be directly inserted. 

### Agent Pinning
The *Agent Pinning* feature, reduces the need for repeated agent references.  
  
- When you mention an agent in a prompt and no agent is pinned, the mentioned agent is automatically pinned.  
- If an agent is already pinned, mentioning a different agent will **not** change the pinned agent. Instead, the newly mentioned agent will be used **only** for that specific prompt.  
- You can manually unpin an agent through the chat interface if needed.  

<img src="../../agent-pinning.gif" alt="Pinning Agents in the Theia IDE AI Chat" style="max-width: 525px">

### Context Variables
You can augment your requests in the chat with context by using variables. For example, to refer to the currently selected text, use `#selectedText` in your request. 

You can also pass context files into the chat to further specify the scope of your request. To do this, drag and drop a file into the chat view, or use the auto-completion feature by typing `#file` or directly typing `#<file-name>`. 
Note that `#file:src/my-code.ts` in the user message is replaced to the workspace-relative path, alongside attaching the file to the context. This allows adding the file content to the context and then referring to the file in the chat input text efficiently in one go.

<img src="../../context-variables.png" alt="Attach Files to the Context" style="max-width: 525px">

Here are some example of the most frequently used variable, you can see the full list of available variables when typing `#` in the chat input field (see also how [Theia Coder](/docs/theia_coder) uses context variables):

- `#file:filePath` - Inserts the path to the specified file relative to the workspace root. After typing `#file:`, auto completed suggestions will help you specifiying a file. The suggestions are based on the recently opened files and on the file name you type.
- `#filePath` - Shortcut for `#file:filePath`; after typing `#` following by the file name you can directly start your search for the file you want to add and reference in your message.
- `#currentRelativeFilePath` – The relative path of the currently selected file (in the editor or explorer)
- `#currentRelativeDirPath` – The directory path of the currently selected file
- `#selectedText` – The currently highlighted text in the editor. Please note that this does not include the information from which file the selected text is coming from.

**Hint:** The context file support in Theia IDE shown above is built on the generic context variable capabilities of the underlying Theia AI framework. It therefore can be customized and extended with tool-specific context variable types. See the [Theia AI documentation](/docs/theia_ai) for more details.

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

Note that some agents come with several prompt variants, you can choose the active variant in the drop down box. To create user-defined variants, browse to the prompt templates directory and create/copy a new file starting with the same id as the default prompt of an agent.

Variables and functions can be used in prompts. Variables are replaced with context-specific information at the time of the request (e.g., the currently selected text), while functions can trigger actions or retrieve additional information. You can find an overview of all global variables in the "Variables" tab of the AI Configuration View and agent-specific variables in the agent's configuration.

Variables are used with the following syntax:
``` 
{{variableName}}
```

Tool functions are used with the following syntax:
``` 
~{functionName}
```
## Custom Agents

Custom agents enable users to define new chat agents with custom prompts on the fly, allowing the creation of custom workflows and extending the Theia IDE with new capabilities. These agents are immediately available in the default chat.

To define a new custom agent, navigate to the AI Configuration View and click on "Add Custom Agent".

<img src="../../add-custom-agents.png" alt="Add a custom Agents in the Theia IDE" style="max-width: 400px">

This action opens a YAML file where all available custom agents are defined. Below is an example configuration:

```yaml
- id: obfuscator
  name: Obfuscator
  description: This is an example agent. Please adapt the properties to fit your needs.
  prompt: Obfuscate the following code so that no human can understand it anymore. Preserve the functionality.
  defaultLLM: openai/gpt-4o
```

- id: A unique identifier for the agent.
- name: The display name of the agent.
- description: A brief explanation of what the agent does.
- prompt: The default prompt that the agent will use for processing requests.
- defaultLLM: The language model used by default.

Custom agents can be configured in the AI Configuration View just like other chat agents. You can enable/disable them, modify their prompt templates, and integrate variables and functions within these templates to enhance functionality.

## MCP Integration

The Theia IDE integrates the Model Context Protocol (MCP), enabling users to configure and utilize external services in their AI workflows. 
*Please note: While this integration does not yet include MCP servers in any standard prompts, it already allows end users to explore the MCP ecosystem and discover interesting new use cases. In the future, we plan to provide ready-to-use prompts using MCP servers and support auto-starting configured servers.*

See also this comprehensive example on how to MCP in Theia:
👉 [Let AI commit (to) your work - With Theia AI, Git and MCP](https://eclipsesource.com/blogs/2025/03/05/theia-ai-git-and-mcp/)
And our introduction to MCP in Theia AI:
👉 [Introducing Anthropics's Model Context Protocol (MCP) for AI-Powered Tools in Theia AI and the Theia IDE](https://eclipsesource.com/blogs/2024/12/19/theia-ide-and-theia-ai-support-mcp/)

To learn more about MCP, see the [official announcement from Anthropic](https://www.anthropic.com/news/model-context-protocol).  
For a list of available MCP servers, visit the [MCP Servers Repository](https://github.com/modelcontextprotocol/servers).

### Configuring MCP Servers

To configure MCP servers, open the preferences and add entries to the `MCP Servers Configuration` section. Each server requires a unique identifier (e.g., `"brave-search"` or `"filesystem"`) and configuration details such as the command, arguments, optional environment variables and autostart (true by default). **For Windows users, please see the additional information below**.

`"autostart"` (true by default) will automatically start the respective MCP server whenever you restart your IDE. In your current session, however, you'll still need to **manually start it** using the `"MCP Start MCP Server"` command (see below).

**Example Configuration:**

```json
{
  "brave-search": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-brave-search"
    ],
    "env": {
      "BRAVE_API_KEY": "YOUR_API_KEY"
    },
    "autostart": false
  },
  "filesystem": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "/Users/YOUR_USERNAME/Desktop"
    ],
    "env": {
      "CUSTOM_ENV_VAR": "custom-value"
    }
  },
  "git": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/repo",
        "run",
        "mcp-server-git"
      ]
    },
  "git2": {
      "command": "uvx",
      "args": [
        "mcp-server-git",
        "--repository",
        "/path/to/otherrepo"
      ]
  }
}
```

**Note**: `uvx` comes preinstalled with `uv` and does not need to be installed manually. Running `pip install uvx` installs a deprecated tool unrelated to `uv`.

The configuration options include:
- **`command`**: The executable used to start the server (e.g., `npx`).
- **`args`**: An array of arguments passed to the command.
- **`env`**: An optional set of environment variables for the server.

**Note for Windows users:** On Windows, you need to start a command interpreter (e.g. cmd.exe) as the server command in order for path lookups to work as expected. The effective command line is then passed as an argument. For example:

```json
"filesystem": {
    "command": "cmd",
    "args": ["/C", "npx -y @modelcontextprotocol/server-filesystem /Users/YOUR_USERNAME/Desktop"],
    "env": {
      "CUSTOM_ENV_VAR": "custom-value"
    }
  }
```

### Starting and Stopping MCP Servers

Theia provides commands to manage MCP servers:

- **Start MCP Server**: Use the command `"MCP: Start MCP Server"` to start a server. The system displays a list of available servers to select from.
- **Stop MCP Server**: Use the command `"MCP: Stop MCP Server"` to stop a running server.

When a server starts, a notification is displayed confirming the operation, and the functions made available.
You can also set a MCP server to 'autostart' in the settings (true by default), this will take effect on the next restart of your IDE.
Please note that in a browser deployment MCP servers are scoped per connection, i.e. if you manually start them, you need to start them once per browser tab.

### Using MCP Server Functions

Once a server is running, its functions can be invoked in prompts using the following syntax:

```text
~{mcp_<server-name>_<function-name>}
```

- `mcp`: Prefix for all MCP commands.
- `<server-name>`: The unique identifier of the server (e.g., `brave-search`).
- `<function-name>`: The specific function exposed by the server (e.g., `brave_web_search`).

**Example:**

To use the `brave_web_search` function of the `brave-search` server, you can write:

```text
~{mcp_brave-search_brave_web_search}
```

This allows you to seamlessly integrate external services into your AI workflows within the Theia IDE.

## SCANOSS

The Theia IDE (and Theia AI) integrates a code scanner powered by SCANOSS, enabling developers to analyze generated code for open-source compliance and licensing. This feature helps developers understand potential licensing implications when using generated code.

**Please note:** This feature sends a hash of suggested code snippets to the SCANOSS service hosted by the [Software Transparency Foundation](https://www.softwaretransparency.org/osskb) for analysis. While the service is free to use, very high usage may trigger rate limiting (unlikely for individual developers). Additionally, neither Theia nor SCANOSS can guarantee that no license implications exist, even if no issues are detected during the scan.

### Configure SCANOSS in the Theia IDE

1. Open the **Settings** panel in the Theia IDE.
2. Navigate to **SCANOSS Mode** under the **AI Features** section.
3. Select the desired mode:
   - **Off**: Disables SCANOSS completely.
   - **Manual**: Allows users to trigger scans manually via the SCANOSS button on generated code (via the [Theia Coder Agent](/docs/theia_coder/) or directly in the Chat view.
   - **Automatic**: Automatically scans generated code snippets in the Chat view.

### Manual Scanning

To manually scan a code snippet:

1. Generate a code in the AI Chat view or via the [Theia Coder Agent](/docs/theia_coder/).
2. Click the **SCANOSS** button in the toolbar of the code renderer embedded in the Chat view or above the changeset.
3. A result icon will appear:
   - A **warning icon** if a match is found.
   - A **green check mark** if no matches are found.
4. If a warning icon is displayed, click the **SCANOSS** button again to view detailed scan results in a popup window.

This screenshot shows a SCANOSS match for code generated in the chat view:

<img src="../../scanoss.png" alt="Scanning generated code snippets in the Theia AI chat view" style="max-width: 525px">

This screenshot shows a SCANOSS match for a code change made via the Theia Coder agent:

<img src="../../scanoss-coder.png" alt="Scanning generated code snippets in the Theia AI chat view" style="max-width: 525px">

### Automatic Scanning

In **Automatic** mode, SCANOSS scans code in the background whenever they are generated in the Chat view or via the [Theia Coder Agent](/docs/theia_coder/). Results are displayed immediately, indicating whether any matches are found.

### Understanding SCANOSS Results

After a scan is completed, SCANOSS provides a detailed summary, including:

- **Match Percentage**: The degree of similarity between the scanned snippet and the code in the database.
- **Matched File**: The file or project containing the matched code.
- **Licenses**: A list of licenses associated with the matched code, including links to detailed license terms.

## AI History

The AI History view allows you to review all communications between agents and underlying LLMs. Select the corresponding agent at the top to see all its requests in the section below.

<img src="../../history-view.png" alt="AI History View in the Theia IDE" style="max-width: 800px">

## Learn more

👉 [Introducing the AI-powered Theia IDE: AI-driven coding with full Control](https://eclipsesource.com/blogs/2025/03/13/introducing-the-ai-powered-theia-ide/)

👉 [Introducing Theia AI: The Open Framework for Building AI-native Custom Tools and IDEs](https://eclipsesource.com/blogs/2025/03/13/introducing-theia-ai/)

👉 [Download the AI-powered Theia IDE](/#theiaide)