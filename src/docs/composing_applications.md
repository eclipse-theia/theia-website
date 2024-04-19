---
title: Build your own IDE/Tool
---


# Build your own IDE/Tool

This guide will teach you how to build your own Theia-based application. The guide will demonstrate how to configure your own application composed of existing or new Theia extensions, and any VS Code extensions you want bundled in your application by default. Please get familiar with the [extension mechanisms of Theia](/docs/extensions/) in case you are not already.
This guide describes the manual steps to build a Theia-based product, there are two ways to avoid this manual set-up:

- [Theia Extension Yeoman generator](https://github.com/eclipse-theia/generator-theia-extension): Generates Theia-based products along with example extensions.
- [Theia IDE](/#theiaide): A tool based on the Theia Platform that can be used as a template for creating installable desktop applications based on Theia. [Learn how to extend and adapt the Theia IDE](/docs/blueprint_documentation/).

We still recommend reading the manual guide first, it allows you to understand the structure of a Theia-based project.

## Requirements

The detailed list of prerequisites is located at the main Theia repository:

- [Prerequisites](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites)

## Setup

Start with creating a new empty directory and moving into it:

    mkdir my-app
    cd my-app

Create `package.json` in this directory:

```json
{
  "private": true,
  "dependencies": {
    "@theia/callhierarchy": "latest",
    "@theia/file-search": "latest",
    "@theia/git": "latest",
    "@theia/markers": "latest",
    "@theia/messages": "latest",
    "@theia/mini-browser": "latest",
    "@theia/navigator": "latest",
    "@theia/outline-view": "latest",
    "@theia/plugin-ext-vscode": "latest",
    "@theia/preferences": "latest",
    "@theia/preview": "latest",
    "@theia/search-in-workspace": "latest",
    "@theia/terminal": "latest"
  },
  "devDependencies": {
    "@theia/cli": "latest"
  }
}
```

In a nutshell, Theia applications and extensions are [Node.js packages](https://nodesource.com/blog/the-basics-of-package-json-in-node-js-and-npm/). Each package has a `package.json` file that manifests package metadata,
like `name`, `version`, its runtime and build time dependencies and so on.

Let's have a look at the created package:

- Its `name` and `version` are omitted since we are not going to use it as a dependency, and
    it's marked as `private` since it is not going to be published as a Node.js package on its own.
- We've listed required extensions as runtime dependencies, e.g. `@theia/navigator`.
  - Some extensions require additional tooling installed, in such cases, please consult the corresponding extension documentation.
  - Use [this link](https://www.npmjs.com/search?q=keywords:theia-extension) to see all published extensions.
- We've listed [@theia/cli](https://www.npmjs.com/package/@theia/cli) as a build-time dependency. It provides scripts to build and run the application.

## Consuming VS Code Extensions

As part of your application, it is also possible to consume (and package) VS Code extensions.
The [Theia repository](https://github.com/eclipse-theia/theia/wiki/Consuming-Builtin-and-External-VS-Code-Extensions) contains a guide on how to
include such extensions as part of the application's `package.json`.

An example `package.json` may look like the following:

```json
{
  "private": true,
  "dependencies": {
    "@theia/callhierarchy": "latest",
    "@theia/file-search": "latest",
    "@theia/git": "latest",
    "@theia/markers": "latest",
    "@theia/messages": "latest",
    "@theia/navigator": "latest",
    "@theia/outline-view": "latest",
    "@theia/plugin-ext-vscode": "latest",
    "@theia/preferences": "latest",
    "@theia/preview": "latest",
    "@theia/search-in-workspace": "latest",
    "@theia/terminal": "latest",
    "@theia/vsx-registry": "latest"
  },
  "devDependencies": {
    "@theia/cli": "latest"
  },
  "scripts": {
    "prepare": "yarn run clean && yarn build && yarn run download:plugins",
    "clean": "theia clean",
    "build": "theia build --mode development",
    "start": "theia start --plugins=local-dir:plugins",
    "download:plugins": "theia download:plugins"
  },
  "theiaPluginsDir": "plugins",
  "theiaPlugins": {
    "vscode-builtin-extensions-pack": "https://open-vsx.org/api/eclipse-theia/builtin-extension-pack/1.50.1/file/eclipse-theia.builtin-extension-pack-1.50.1.vsix"
  },
  "theiaPluginsExcludeIds": [
    "ms-vscode.js-debug-companion",
    "vscode.extension-editing",
    "vscode.git",
    "vscode.git-ui",
    "vscode.github",
    "vscode.github-authentication",
    "vscode.microsoft-authentication"
  ]
}
```

The following properties are used to consume built-in plugins (bundled extensions):

- `theiaPluginsDir`: the relative path to deploy plugins into
- `theiaPlugins`: the collection of plugins to download (individual plugins or extension-packs) - can point to any valid download URL (ex: Open VSX, GitHub Releases, etc.)
- `theiaPluginsExcludeIds`: the list of plugin `ids` to exclude when resolving extension-packs

## Building

First, install all dependencies.

    yarn

Second, use Theia CLI to build the application.

    yarn theia build

`yarn` looks up `theia` executable provided by `@theia/cli` in the context of our application
and then executes the `build` command with `theia`.
This can take a while since the application is built in production mode by default,
i.e. obfuscated and minified.

## Running

After the build is finished, we can start the application:

    yarn theia start --plugins=local-dir:plugins

or rely on the `start` script from `package.json`:

    yarn start

You can provide a workspace path to open as a first argument
and `--hostname`, `--port` options to deploy the application on specific network interfaces and ports,
e.g. to open `/workspace` on all interfaces and port `8080`:

    yarn start /my-workspace --hostname 0.0.0.0 --port 8080

In the terminal, you should see that Theia application is up and listening:

<img class="doc-image" src="../../docs-terminal.png" alt="Terminal" style="max-width: 750px">

Open the application by entering the printed address in a new browser page.

## Troubleshooting

### Plugins not appearing

If no plugins are available in the running Theia instance, it may be that you need to tell Theia where to find the downloaded plugins.
The example above sets the `--plugins` switch in the `start` command which should be sufficient.
However, if running `theia start` directly, you can alternatively set an environment variable to achieve the same thing:

    export THEIA_DEFAULT_PLUGINS=local-dir:plugins

### Building native dependencies behind a proxy

If you run the `yarn` command behind a proxy you may encounter issues in building native dependencies (like `oniguruma`), in the last part of the build, with the following error stack:

    [4/4] Building fresh packages...
    [1/9]  XXXXX
    [2/9]  XXXXX
    [3/9]  XXXXX
    [4/9]  XXXXX
    error /theiaide/node_modules/XXXXX: Command failed.
    Exit code: 1
    Command: node-gyp rebuild
    Arguments:
    Directory: /theiaide/node_modules/XXXXX
    Output:
    gyp info it worked if it ends with ok
    gyp info using node-gyp@3.8.0
    gyp info using node@8.15.0 | linux | x64
    gyp http GET https://nodejs.org/download/release/v8.15.0/node-v8.15.0-headers.tar.gz
    gyp WARN install got an error, rolling back install
    gyp ERR! configure error
    gyp ERR! stack Error: read ECONNRESET
    gyp ERR! stack at TLSWrap.onread (net.js:622:25)
    gyp ERR! System Linux 3.10.0-862.11.6.el7.x86_64
    gyp ERR! command "/usr/bin/node" "/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
    gyp ERR! cwd /theiaide/node_modules/XXXXX
    gyp ERR! node -v v8.15.0

This happens because node-gyp does not rely on system/NPM proxy settings. In that case, download the `node-headers` file using the link provided in the error stack
(in the example above `https://nodejs.org/download/release/v8.15.0/node-v8.15.0-headers.tar.gz`) and run the build with the following command:

     npm_config_tarball=/path/to/node-v8.15.0-headers.tar.gz yarn install
