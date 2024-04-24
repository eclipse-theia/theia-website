---
title: Extensions
---

# Extensions and Plugins

Eclipse Theia is designed in a very modular and extensible way. It supports four ways of being extended/adapted to your specific requirements. These are complementary and are targeted at different use cases. You can pick the best option and even mix them within the same project.
In the following, we will give you a quick overview of the available extension mechanisms and provide more details in the sections below.

- **VS Code extensions**: Simple to write, installable at runtime, compatible with VS Code, limited to the VS Code extension API, some use cases not possible due to API restrictions => Used for adding features to existing tools. Note that you can also use existing VS Code extensions within Theia, too.
- **Theia extensions**: Install at compile time, full access to internals of Theia via dependency injection, almost no limitations in terms of accessible API => used to build custom products and for features not covered by the VS Code extension API. Note that the Theia project (including the core) is fully built using Theia extensions in a modular way.
- **Theia plugins**: Like VS Code extensions, additional access to some Theia specific APIs and the Frontend (frontend plugins), Theia specific parts are not compatible with VS Code.
- **Headless plugins**: Like VS Code extensions, simple to write and installable at runtime, but extending and interacting only with the Theia backend services.
These are not scoped to frontend connections and have no access (directly) to frontend services.

The following diagram shows the high level architecture for all four options. VS Code extensions and Theia plugins run in a dedicated process per frontend connection, can be installed at runtime, and work against a defined API. Headless plugins similarly run in a dedicated process, but only one that is not associated with any frontend connection. Theia extensions are added during compile time and become a core part of your Theia application. They can access the full API of Theia.

<img src="../../extensiontypes.svg" alt="Block diagram of Theia extension types" style="max-width: 525px">

If you would like more guidance on which mechanism to use, please also refer to [this detailed comparison between VS Code extensions and Theia extensions](https://eclipsesource.com/blogs/2021/03/24/vs-code-extensions-vs-theia-extensions/).

## VS Code Extensions

VS Code extensions are the popular mechanism to extend VS Code with new language support and other features. VS Code extensions are simple to develop and they have access to a defined and restricted API. VS Code extensions can be pre-installed (built in), but also installed at runtime (e.g. by the user). Eclipse Theia provides the same extension API as VS Code, so extensions are compatible. Therefore, to develop your own extension, please refer to the [VS Code extension documentation](https://code.visualstudio.com/api). Please also refer to this [coverage report](https://eclipse-theia.github.io/vscode-theia-comparator/status.html), highlighting which API of VS Code is covered by Theia.
Please also note that you can use existing VS Code extensions in Theia, too. A good source for installing or downloading extensions is the [Open VSX registry](https://open-vsx.org/).

## Theia Extensions

A Theia extension is a module that resides inside a Theia application and directly communicates with other modules (Theia extensions). The Theia project itself is composed of Theia extensions too. To create a Theia application, you can select a number of Theia extensions provided by the Theia project (core extensions), add your own custom Theia extensions and then compile and run the result. Your custom Theia extension will have access to the same API as the core extensions. This modularity allows you to extend, adapt or remove almost anything in Theia according to your requirements. Also, specific use cases, such as complex views are easier to develop with Theia extensions compared to VS Code extensions.
Technically, an extension is an npm package that exposes any number of DI modules (`ContainerModule`) that contribute to the creation of the DI container.
Extensions are consumed by declaring them as a `dependency` in the `package.json` of the application/extension, and are installed at compile time.
See [this section](/docs/authoring_extensions/) for more detail on how to author a Theia extension.

## Theia Plugins

Theia plugins are a special type of VS Code extensions that only run in Eclipse Theia. They share the architecture and other attributes of VS Code extensions, but they also have access to additional API that is only available in Theia, not in VS Code. Most noticeable, Theia plugins can also directly contribute to the frontend while VS Code extensions are restricted to the backend. As a consequence Theia plugins can directly manipulate the UI without going through a webview abstraction, easing the development process. Please be aware that the support for Theia Plugins is currently under discussion. We therefore recommend using VS Code extensions or Theia extensions instead of Theia Plugins.

## Headless Plugins

Headless plugins are a special type of plugin that only runs in Eclipse Theia. They are very similar architecturally and otherwise to VS Code extensions, except that they run in the Node backend outside of the scope of any frontend connection. Therefore, they are suitable for extensibility use cases involving CLI interactions where there is no browser frontend and extension of common backend services defined for application-specific purposes. Accordingly, they are not provided with a default API for access to the backend Theia services but have access only to custom APIs published explicitly to them by the application to support the extensibility of its own backend services.
