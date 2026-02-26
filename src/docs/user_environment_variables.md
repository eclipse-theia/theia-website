---
title: Environment Variables in the Theia IDE
---

# Environment Variables in the Theia IDE

The Theia IDE relies on environment variables for various features, such as providing API keys for [AI/LLM providers](/docs/user_ai/#llm-providers-overview), configuring tools, or passing settings to launched applications. How and where you define these variables affects whether they are available to the IDE and to processes it starts.

This page explains how to correctly set environment variables so they are picked up by the Theia IDE on different platforms.

## Table of Contents

- [Environment Variables on Linux (Desktop Launcher)](#environment-variables-on-linux-desktop-launcher)
- [Environment Variables on macOS (Desktop Launcher)](#environment-variables-on-macos-desktop-launcher)
- [Environment Variables in Launch Configurations](#environment-variables-in-launch-configurations)

## Environment Variables on Linux (Desktop Launcher)

If you launch the Theia IDE from a **desktop launcher or file manager** (rather than from a terminal), environment variables defined only in `~/.bashrc` or `~/.zshrc` will **not** be available to the application. This is because these files are only sourced by interactive shell sessions, not by desktop applications.

To make environment variables available to desktop-launched applications, define them in one of the following locations instead:

- **`~/.profile`** — sourced at login for most display managers
- **`~/.pam_environment`** — on some distributions (e.g. Ubuntu with certain display managers)
- **System-wide:** `/etc/environment`

After editing these files, you need to **log out and log back in** (or restart your session) for the changes to take effect.

**Alternatively**, you can:

- Launch the Theia IDE from a terminal where the variable is already set (the IDE inherits the terminal's environment)
- Enter settings like API keys directly in the Theia IDE preferences (settings UI)

## Environment Variables on macOS (Desktop Launcher)

On macOS, environment variables set in `~/.zshrc` or `~/.bash_profile` are similarly not available to applications launched from Finder or Spotlight. To set variables for GUI applications, use `launchctl setenv`:

```bash
launchctl setenv MY_VARIABLE "my-value"
```

Alternatively, launch the Theia IDE from a terminal.

## Environment Variables in Launch Configurations

When running or debugging applications from within the Theia IDE using launch configurations, environment variables from your system may not be automatically available to the launched process. This depends on the `console` setting in `launch.json`:

| `console` value | Env variables inherited? |
|:---|:---|
| `internalConsole` (default) | ❌ May be missing |
| `integratedTerminal` | ✅ Available |
| `externalTerminal` | ✅ Available |

**Note:** This is the same behavior as in VS Code.

To ensure specific environment variables are available regardless of the console type, explicitly forward them in your `launch.json`:

```json
{
    "type": "node",
    "request": "launch",
    "name": "My App",
    "program": "${workspaceFolder}/app.js",
    "env": {
        "MY_API_KEY": "${env:MY_API_KEY}",
        "DATABASE_URL": "${env:DATABASE_URL}"
    }
}
```

The `${env:VARIABLE_NAME}` syntax reads the variable from the Theia IDE's own process environment and passes it to the launched application.

Alternatively, switch to `integratedTerminal` to inherit the full environment:

```json
{
    "console": "integratedTerminal"
}
```
