---
title: Data Usage and Telemetry
---

# Data Usage and Telemetry in Theia

Eclipse Theia and Theia IDE are fully open-source projects. This means you can review the source code to verify exactly how the application behaves. Transparency is a core principle - no hidden services or undisclosed data collection take place.

## No Telemetry in the Theia IDE

The Theia IDE does not collect or transmit user activity, project details, or code. This is a deliberate decision: the IDE contains no component that reports such data, and there is no setting or hidden switch that could activate any collection.

## Telemetry in Theia-Based Products

Theia 1.74 introduced a telemetry framework in the Theia platform, the framework that the Theia IDE and other tools are built on. The framework only provides the plumbing for reporting events within an application. It deliberately contains no destination to which data would be sent, and the Theia IDE does not add one.

Tool builders who create their own product based on the Theia platform can add telemetry and tailor it to their needs, which requires implementing and shipping such a destination themselves. What is collected therefore depends entirely on the product you use. If you work with a Theia-based product other than the Theia IDE, consult its privacy policy and documentation for details about its data collection practices. Two preferences let you control what such a product may report.

`telemetry.telemetryLevel` determines which kinds of events may be reported at all. It uses the same key and values as VS Code and defaults to `off`:

- **`off`**: Nothing is reported. This is the default.
- **`crash`**: Crash reports only.
- **`error`**: Crash reports and error events.
- **`all`**: Crash reports, error events, and usage events.

`telemetry.filters` allows switching off individual reporting destinations or restricting them to certain event topics. Products document which destinations they contribute and what they are called.

Adopters looking for the technical details of the framework, including how to contribute a destination, find them in [Telemetry](/docs/telemetry).

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

### External Content in Responses

Model responses can reference resources on the internet, such as images or embedded pages. The chat does not load them automatically, because that would contact the referenced server. A placeholder shows which URL would be contacted and lets you allow the content if you trust it, see [External Content in Chat Responses](/docs/user_ai/#external-content-in-chat-responses).

## Third-Party Providers

Theia integrates with the official SDKs for each AI provider (e.g., OpenAI, Anthropic, Google). Theia itself does not send your data anywhere other than the chosen provider's API endpoint.

What the provider does with your data depends on their own policies. Theia cannot inspect or control additional behavior of:

- AI model providers
- Any MCP (Model Context Protocol) servers you integrate

## Optional Integrations

### SCANOSS Integration

Theia offers an integration with SCANOSS for code analysis and compliance checks. This is also opt-in and only sends hash data to SCANOSS when explicitly enabled. By using this integration, you agree to SCANOSS's [terms of service](https://www.softwaretransparency.org/terms).

## Key Takeaways

- The Theia IDE contains no telemetry. There is nothing to switch on, as no destination for such data is shipped.
- Applications built on the Theia platform may add their own telemetry. Check the product's privacy policy and use `telemetry.telemetryLevel` and `telemetry.filters` to control what it reports.
- AI features are opt-in and transparent
- Only minimal automatic network activity (update checks)
