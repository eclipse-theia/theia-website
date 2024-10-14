---
title: Authoring an Extension
---

# Authoring Theia Extensions

This guide will walk you through the process of creating Theia extensions and deploying them in your Theia-based application. Please make sure to be aware of [how to create a Theia based application](/docs/composing_applications/) and the [different available extension mechanisms](/docs/extensions/) of Theia (Plugins vs. Extensions) before you continue reading.

As an example, we are going to add a menu item _Say hello_ that displays a notification "Hello world!". This article is guiding you through all the necessary steps.

## Prerequisites

Prerequisites information are available from the [Theia repository](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites).

## Project Layout

Please refer to the [guide to create Theia applications](/docs/composing_applications/) to get familiar with the default project layout and generate a Theia project with the example 'hello world' extension using our [Yeoman Generator](https://github.com/eclipse-theia/generator-theia-extension)

## A Custom Theia Extension

Let's look at the generated code for our extension in the `hello-world` folder. Let’s start with the `package.json`. It specifies the package’s metadata, its dependencies to the  Theia core package, a few scripts and dev dependencies, and the theia-extension itself. Please note that the following listing might be outdated, please always refer to the generated examples from our [Yeoman Generator](https://github.com/eclipse-theia/generator-theia-extension)

The keyword `theia-extension` is important: It allows a Theia app to identify and install Theia extensions from `npm`.

```json
{
  "name": "hello-world",
  "keywords": [
    "theia-extension"
  ],
  "version": "0.0.0",
  "files": [
    "lib",
    "src"
  ],
  "dependencies": {
    "@theia/core": "latest"
  },
  "devDependencies": {
    "rimraf": "latest",
    "typescript": "~5.4.5"
  },
  "scripts": {
    "prepare": "yarn run clean && yarn run build",
    "clean": "rimraf lib",
    "build": "tsc",
    "watch": "tsc -w"
  },
  "theiaExtensions": [
    {
      "frontend": "lib/browser/hello-world-frontend-module"
    }
  ]
}
```
As you can see, the extension is a dedciated package that just depends on Theia. However, as the extension contributes features to our application, it needs to be wired a runtime. To achive this in a modular way, in Theia, everything is wired up via [dependency injection](/docs/services_and_contributions#dependency-injection-di). An extension defines one or more dependency injection modules. This is where it binds its contribution implementations to the respective contribution interface. The modules are listed in the `package.json` of the extension package. An extension can contribute to the frontend, e.g. providing a UI extension, as well as to the backend, e.g. contributing a language server. When the application starts, the union of all these modules is used to configure a single, global dependency injection container on each, the frontend and the backend. The runtime will then collect all contributions of a specific kind by means of a multi-inject.

The last property `theiaExtensions` in the packahe.json above is where we list the JavaScript modules that export the DI modules defining the contribution bindings of our extension. In our case, we only provide a frontend capability (a command and a menu entry). Analogously, you could also define contributions to the backend, e.g. a language contribution with a language server.

Theia defines a plethora of contribution interfaces that allow extensions to add their behaviour to various aspects of the application. Browse the documentation section 'Platform Concepts & APIs' or search for interfaces with the name `*Contribution` to get an idea. An extension implements the contribution interfaces belonging to the functionality it wants to deliver. In this example, we are going to implement a `CommandContribution` and a `MenuContribution`. Other ways for extensions to interact with a Theia application are via one of the various _services_ or _managers_.

In the frontend module we export a default object that is a [InversifyJS `ContainerModule`](https://github.com/inversify/InversifyJS/blob/master/wiki/container_modules.md) with bindings for a command contribution and a menu contribution. Please see our [dependency injection guide](/docs/services_and_contributions/) for more details.

```typescript
export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(HelloWorldCommandContribution);
    bind(MenuContribution).to(HelloWorldMenuContribution);
});
```

A command is a plain data structure defining an ID and a label. The behaviour of a command is implemented by registering a handler to its ID in a command contribution. The generator has already added a command and a handler that shows a "Hello World!" message.

```typescript
export const HelloWorldCommand = {
    id: 'HelloWorld.command',
    label: "Shows a message"
};

@injectable()
export class HelloWorldCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(HelloWorldCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}
...
```

Note how we use `@inject` in the constructor to get the `MessageService` as a property, and how we use that later in the implementation of the handler. This is the elegance of dependency injection: As a client, we neither care where these dependencies come from nor what their lifecycle is.

To make it accessible by the UI, we implement a `MenuContribution`, adding an item to the Search/Replace section of the edit menu in the menu bar.

```typescript
...
@injectable()
export class HelloWorldMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
                commandId: HelloWorldCommand.id,
                label: 'Say Hello'
            });
    }
}
```

## Adding Extensions to a Theia application

To make sure your extension is included in your Theia application, list it as a dependency in your browser or electron app, e.g. like this:

```json
{
  "private": true,
  "name": "browser-app",
  "version": "0.0.0",
  "dependencies": {
    "@theia/core": "latest",
    ...
    "hello-world": "0.0.0"
  },
  "devDependencies": {
    "@theia/cli": "latest"
  },
  "scripts": {
    "bundle": "yarn rebuild && theia build --mode development",
    "rebuild": "theia rebuild:browser --cacheRoot ..",
    "start": "theia start",
    "watch": "yarn rebuild && theia build --watch --mode development"
  },
  "theia": {
    "target": "browser"
  }
}
```

## Deploying the Extension

To run the extension, you have two options:
1. Have your extension as part of a monorepo containing a Theia-based application importing your extension (like the structure created by the Yeoman Generator)
2. Publish the extension with `yarn publish` and consume it from your Theia-based application

See [*Executing the Browser Application*](/docs/composing_applications/#executing-the-browser-application) and [*Executing the Extension in Electron* for more details*](/docs/composing_applications/#executing-the-extension-in-electron) for adding extensions to the dependencies of a Theia-based application and running it.
