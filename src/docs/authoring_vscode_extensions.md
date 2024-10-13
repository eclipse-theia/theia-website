---
title: Authoring VS Code Extensions
---

# Authoring VS Code Extensions

Alongside [Theia extensions](/docs/extensions#theia-extensions), VS Code extensions can also be used to enhance Theia applications with additional functionality, such as language support, commands, or tree views.
VS Code extensions contribute functionality through the dedicated VS Code API, which the Theia framework also supports.
This means that extensions that have been developed for VS Code are also compatible with Theia, and vice versa.
The [coverage report](https://eclipse-theia.github.io/vscode-theia-comparator/status.html) provides more details on the extent to which the VS Code API is supported by each Theia version.

While there are certain overlaps in which types of functionality can be contributed to a Theia application with a Theia extension or a VS Code extension, both have their unique advantages and disadvantages.
Please refer to the overview on [extensions and plugins](/docs/extensions) and an [in-depth comparison](https://eclipsesource.com/blogs/2021/03/24/vs-code-extensions-vs-theia-extensions/) for a more detailed discussion.

In the remainder of this page, we guide you through the process of creating VS Code extensions and deploying them in Theia.
The steps for deploying VS Code extensions apply not only to VS Code extensions you develop yourself, but also to third-party VS Code extensions from the [Theia marketplace](https://open-vsx.org/). If you use a third-party VS Code extension, you can skip the section "Creating VS Code Extensions" and "Developing VS Code Extensions in a Theia Project".

## Creating VS Code Extensions

As VS Code extensions can be used in Theia without further modification, you can refer to the [documentation on extending VS Code](https://code.visualstudio.com/api) to learn more about creating extensions for VS Code as well as for Theia.
The easiest way to get started is to use the [VS Code Extension Generator](https://www.npmjs.com/package/generator-code) and follow the [Getting Started Guide](https://code.visualstudio.com/api/get-started/your-first-extension).

As an example, let's generate the hello world extension.

```bash
npm install -g yo generator-code # install the VS Code Extension Generator
npm install -g vsce # install VS Code Extension CLI tooling

yo code # generate an extension
# take a look at the generated package.json defining a command "Hello World"
# take a look at the src/extension.ts registering a command handler
# make changes to the README and the code, if you like
vsce package # package your VS Code extension
```

As a result, a `vsix` file is generated, which can be used directly in VS Code and Theia (see below).
Please note that you can also create so-called extension packs with the VS Code extension generator that defines a collection of extensions.

## Prerequisites for Running VS Code Extensions in Theia

To enable Theia's support for VS Code extensions in order to use your own extensions or third-party VS Code extensions in your Theia application, you'll need to add `@theia/plugin-ext-vscode` as a dependency.
Typically, this is done in your browser or electron application package.

```json
{
  ...
  "name": "browser-app",
  "dependencies": {
    "@theia/core": "latest",
    ...
    "@theia/plugin-ext-vscode": "latest"
  },
  "theia": {
    "target": "browser"
  }
}
```

Next, you need to specify a *plugins location*, which is a disk location containing your VS Code extensions.
Theia will load all VS Code extensions from this location on initialization of a new user session automatically.
This location can be set either with an environment variable:

```bash
export THEIA_DEFAULT_PLUGINS=local-dir://absolute-path-to-plugins-folder
```

Or it can be provided in the command line option `--plugins` when starting Theia.

```bash
theia start --plugins=local-dir:../plugins
```

A common approach for Theia applications that include VS Code extensions is to add this command line parameter to the startup script in the browser or electron application package.

```json
{
  ...
  "name": "browser-app",
  ...
  "scripts": {
    ...
    "start": "theia start --plugins=local-dir:../plugins",
  },
  "theia": {
    "target": "browser"
  }
}
```

## Consuming VS Code Extensions

Once you've enabled VS Code extension support in your Theia application as described above and made available your or any third-party VS Code extensions that you'd like to use in your Theia application, you have two options on how to consume them:

  1. Pre-installing the VS Code extension in your Theia application
  2. Enabling your users to install your VS Code extensions at runtime

In the following, we'll provide more details on each of those options.

### Pre-installing VS Code Extensions

For pre-installing a certain set of VS Code extensions in your Theia application, all you need to do is to drop them, either as a `vsix` file or directly as a folder into the *plugins location* (see [prerequisites](#prerequisites-for-running-vs-code-extensions-in-theia)).
On start-up of a user session, Theia will load all VS Code extensions from that location automatically.

A more systematic approach, however, is to publish VS Code extensions, to [OpenVSX](https://open-vsx.org), GitHub Releases, or any other accessible location, and download them automatically at build time of the Theia application with the Theia CLI.
See [publishing extensions to OpenVSX](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions) for more details.
This approach avoids having to manually distribute VS Code extensions or adding them in the form of a build artifact to your git repository.

Therefore, you need to extend your `package.json` to

  1. specify the *plugins location* to the Theia CLI
  2. define the VS Code extensions to be downloaded
  3. add a download script for convenience

```json
{
  ...
  "scripts": {
    "prepare": "yarn run clean && yarn build && yarn run download:plugins",
    "download:plugins": "theia download:plugins",
    ...
  },
  "theiaPluginsDir": "plugins",
  "theiaPlugins": {
      "my-hello-world-extension": "https://<url-to-your-published-extension>",
      "vscode.git": "https://open-vsx.org/api/vscode/git/1.52.1/file/vscode.git-1.52.1.vsix",
      ...
  }
}
```

As a result, running `yarn` will download any listed extensions and place them into the folder specified in `theiaPluginsDir` automatically.
For more details, see also the documentation on [composing Theia applications](/docs/composing_applications/#consuming-vs-code-extensions).

### Installing VS Code Extensions at Runtime

One of the unique advantages of VS Code extensions is that they can be installed and uninstalled by users at runtime.
To enable the users of your Theia application to install VS Code extensions at runtime, you have to add `@theia/vsx-registry` as a dependency to your `package.json`.

```json
{
  ...
  "name": "browser-app",
  "dependencies": {
    "@theia/core": "latest",
    ...
    "@theia/vsx-registry": "latest"
  },
  "theia": {
    "target": "browser"
  }
}
```

This dependency will add a view *Extensions* to your application, which allows searching and installing extensions from an OpenVSX registry.
By default, the public registry at <http://open-vsx.org> is used, the registry URL be configured via the environment variable `VSX_REGISTRY_URL`.
Please confer to the [OpenVSX extension documentation](https://www.npmjs.com/package/@theia/vsx-registry) for more details.

To make your VS Code extension available, you'll need to [publish](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions) your extension to the configured registry.

## Developing VS Code Extensions in a Theia Project

In certain scenarios, you may not want to develop your VS Code extension in isolation from your Theia application, but instead you may prefer to develop both your extensions and your application in project to keep update cycles short and immediate.
This is particularly useful if you develop your extensions primarily to be part a specific Theia application, thus you want to develop, test and debug them directly in the context of your Theia app, potentially alongside other [Theia extensions](/docs/extensions#theia-extensions).

In those scenarios, you can also include VS Code extensions as part of your Theia application monorepo.
While there are several possible configuration options, probably the most straightforward approach is to follow the steps below.

Generate your VS Code extension as usual.
However, to make things easier and consistent, choose `TypeScript` as your language and `yarn` as a package manager for your VS Code extension to be aligned with a typical Theia application.

Put your VS Code extension package, let's say `your-vs-code-extension`, into your monorepo, alongside your other packages and make sure it is part of your yarn workspaces.
Let's assume, we eventually have the following a directory structure.

```text
monorepo
├── apps
│   ├── browser-app
│   └── electron-app
├── extensions
│   ├── your-theia-extension
│   └── your-vs-code-extension
├── plugins
└── package.json
```

In `your-vs-code-extension/package.json`, add `symlink` as a dev dependency to link your extension into the *plugins location* of your Theia application on each build.

```json
{
    ...
    "scripts": {
        "compile": "tsc -p ./",
        "watch": "tsc -watch -p ./",
        "prepare": "yarn run clean && yarn run build && yarn symlink",
        "symlink": "symlink-dir . ../../plugins/your-vs-code-extension",
        ...
    },
    "devDependencies": {
        "@types/vscode": "^1.32.0",
        "symlink-dir": "latest",
        ...
    }
}
```

With that, your VS Code extension will be built as part of your Theia application and directly added to the *plugins location* for automatic installation in your Theia application.
This leads to a consistent development experience, even if you have multiple VS Code extensions and Theia extensions combined in one Theia application.

If you aim at a consistent `tsconfig.json` across your VS Code extension and a typical Theia extension, you may want to change the `outDir` from `out` (default in VS Code) to `lib` (commonly used in Theia) and adjust the `package.json` accordingly.

To also enable debugging from your development IDE (VS Code), you need to setup `launch.json` to include the VS Code extension in the `outFiles` (if it is still building to the folder `out` and not `lib`) and enable source maps.

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Start Browser Backend",
            "program": "${workspaceRoot}/browser-app/src-gen/backend/main.js",
            "args": [
                "--loglevel=debug",
                "--port=3000",
                "--no-cluster",
                "--plugins=local-dir:${workspaceRoot}/plugins"
            ],
            "env": {
                "NODE_ENV": "development",
                "NODE_OPTIONS": "--enable-source-maps"
            },
            "sourceMaps": true,
            "outFiles": [
                "${workspaceRoot}/node_modules/@theia/*/lib/**/*.js",
                "${workspaceRoot}/extensions/*/lib/**/*.js",
                "${workspaceRoot}/extensions/*/out/**/*.js",
                "${workspaceRoot}/apps/*/src-gen/**/*.js"
            ],
            "smartStep": true,
            "internalConsoleOptions": "openOnSessionStart",
            "outputCapture": "std"
        },
        ...
    ]
}
```

## Troubleshooting

### Plugins not appearing

If no plugins are available in the running Theia instance, it may be that you need to tell Theia where to find the downloaded plugins.
The example above sets the `--plugins` switch in the `start` command which should be sufficient.
However, if running `theia start` directly, you can alternatively set an environment variable to achieve the same thing:

    export THEIA_DEFAULT_PLUGINS=local-dir:plugins