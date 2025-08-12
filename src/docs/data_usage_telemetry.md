---
title: Data Usage and Telemetry
---

# Data Usage and Telemetry in Theia

Eclipse Theia and Theia IDE are fully open-source projects. This means you can review the source code to verify exactly how the application behaves. Transparency is a core principle - no hidden services or undisclosed data collection take place.

## No Built-in Telemetry

The Theia IDE itself does not include built-in telemetry. It does not automatically collect or transmit user activity, project details, or code.

However, tool builders who create custom products based on Theia can choose to add their own telemetry systems. If you are using a customized Theia-based product, you should consult that product's specific privacy policy and documentation for details about its data collection practices.

## Automatic Network Connections

While Theia IDE does not include telemetry, there are two automatic checks made during normal operation:

- **Update Check for Theia IDE**: The IDE may query the download servers to see if a newer version of Theia IDE is available.
- **Extension Update Check**: The IDE may query Open VSX to determine whether newer versions of installed extensions are available. This might include metadata about extensions not installed from openVSX, e.g. custom developed extensions. By using Open VSX, you agree to their [terms of use](https://open-vsx.org/terms-of-use).

These checks are limited to update metadata and do not transmit user code or workspace data.

## AI Features and Data Handling

Theia AI and related AI features are opt-in. If you do not enable them, no AI-related data is sent anywhere.

When Theia AI features are enabled:

### Manual Activation
- Most AI interactions (e.g., chat, code transformation) are triggered explicitly by the user.
- Automatic code completion is separately opt-in to prevent accidental transmission of code.
- Manual code completion is bound to a key binding (Command "Trigger Inline Suggestion"). To avoid accidental invocation, you can unbind this key binding in your preferences.

### Transparency in Data Transfer
You can inspect exactly what data is sent to AI providers using:
- The Output view
- The AI History view

### Permissions Control
Theia includes an optional permission system for tool calls. When enabled, the Chat UI will request explicit approval for file system or other tool access.

> **Note**: Autocomplete does not use tool calls, so it should be managed carefully in sensitive environments.

## Third-Party Providers

Theia integrates with the official SDKs for each AI provider (e.g., OpenAI, Anthropic, Google). Theia itself does not send your data anywhere other than the chosen provider's API endpoint.

What the provider does with your data depends on their own policies. Theia cannot inspect or control additional behavior of:
- AI model providers
- Any MCP (Model Context Protocol) servers you integrate

## Optional Integrations

### SCANOSS Integration
Theia offers an integration with SCANOSS for code analysis and compliance checks. This is also opt-in and only sends hash data to SCANOSS when explicitly enabled. By using this integration, you agree to SCANOSS's [terms of service](https://www.softwaretransparency.org/terms).

## Key Takeaways

- No telemetry in Theia and Theia IDE by default
- AI features are opt-in and transparent
- Only minimal automatic network activity (update checks)
