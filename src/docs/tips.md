---
title: Advanced Tips
---

# Advanced Tips

In this section we'll outline some advanced hints and tips to get the most out of developing tools based on Eclipse Theia.

## Providing custom API to VS Code extensions in Eclipse Theia

Theia allows running VS Code extension by providing a compatible API (see [this overview](../extensions/) for details).
It is possible to extend this API to allow VS Code extensions running in Theia to access additional functionality compared to when they run within VS Code.
This allows you to provide a feature as a VS Code extension targeting VS Code and Theia. However, when running in Theia, the feature can be enhanced by using custom API only available in Theia.

The following code example shows the usage custom API which is invoked only when running in a Theia-based application. This is determined via the application name.
The API is imported asynchronously to avoid runtime errors in VS Code.

```typescript
if (vscode.env.appName === MY_THEIA_APP_NAME) {
    // Implement Theia API
    const api = await import('@mytheiaextension/mycustomapi');
    // After importing the custom API, it can be used as any other API. The following lines are using an example API.
    api.host.getMessageHandler(() => getMessage());
    api.host.onRequestMessage((actor: string) => {
        const message = getMessage(actor);
        api.host.showMessage(message);
    });
}
```

An alternative to providing a custom API is to define custom commands. Again, these commands would only be available if the VS Code extension is running in Theia (see following code example).

```typescript
if (vscode.env.appName === MY_THEIA_APP_NAME) {
    // Execute Theia custom command
    const commands = await vscode.commands.getCommands();
    if (commands.indexOf(MY_THEIA_CUSTOM_COMMAND) > -1) {
        vscode.commands.executeCommand(MY_THEIA_CUSTOM_COMMAND);
    }
}
```

An example of this technique can be seen here:

<https://github.com/thegecko/vscode-theia-extension>
