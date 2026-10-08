---
title: Build your own IDE/Tool
---


# Build your own IDE/Tool

This guide will teach you how to create your own Theia-based application. The guide will demonstrate how to configure your own application composed of existing or new Theia extensions, and any VS Code extensions you want bundled in your application by default. Please get familiar with the [extension mechanisms of Theia](/docs/extensions/) in case you are not already.
We provide two entry points for creating your own Theia-based application.

- [Theia Yeoman generator](https://github.com/eclipse-theia/generator-theia-extension): Generates Theia-based applications along with example extensions.
- [Theia IDE](/#theiaide): A tool based on the Theia Platform that can be used as a template for creating installable desktop applications based on Theia with additional features such as automatic updates, branding, etc.. [Learn how to extend and adapt the Theia IDE](/docs/blueprint_documentation/).

If you are new to Theia, we recommend starting with the first option, as it is quicker and simpler to get started with. If you want to create a full product based on Theia, you can later on switch to using the Theia IDE without losing your existing work by integrating your extensions into your custom version of the Theia IDE. In this guide, we will demonstrate how to get started with the [Yeoman Generator](https://github.com/eclipse-theia/generator-theia-extension).

## Requirements

The detailed list of prerequisites is located at the main Theia repository:

- [Prerequisites](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites)

## Theia’s Architecture

A Theia app is composed of so-called Theia extensions. Each extension resides in its own npm package.
An extension provides a set of features, e.g. widgets, commands, handlers, etc. for a specific functionality. The Theia project itself ships a number of extensions for common features, e.g. for editors, terminals, the project view etc. You can reuse these existing extensions by just adding them to your custom Theia application. Additionally, you can add arbitrary VS Code extensions to your application, again for reusing existing features already available, such as Git support. Finally, you can then extend and customize your Theia application with your own features, which you can implement as [Theia extensions or VS Code extensions](/docs/extensions).

While Theia incorporates certain components from Visual Studio Code, such as the Monaco editor, it is independently developed with a modular architecture and is **NOT a [fork of VS Code](https://eclipsesource.com/blogs/2024/12/17/is-it-a-good-idea-to-fork-vs-code/)**. This distinction allows adopters to innovate and fully tailor their tools without limitations. For a deeper comparison, see [Theia IDE vs VS Code](https://eclipsesource.com/blogs/2024/07/12/vs-code-vs-theia-ide/) and [Eclipse Theia vs VS Code OSS](https://eclipsesource.com/blogs/2023/09/08/eclipse-theia-vs-code-oss/).

In this guide, we will create a Theia application with a number of existing Theia extensions and one (generated) custom Theia extension. Please also refer to our [documentation on how to create custom Theia extensions](/docs/authoring_extensions) to learn more on how to create your own Theia extensions. Finally, also see [our guide on how to add VS Code extensions to your custom Theia application](/docs/authoring_vscode_extensions).

## Project Layout

We are going to create a monorepo (a repository containing multiple npm packages) named `my-theia-app` containing three packages: `browser-app`, `electron-app` and `hello-world-extension`. The first two contain the custom Theia applications to run in browser and electron mode. The 'hello-world' package contains a generated example extension, that adds a feature to our custom Theia application. This extension can serve as a starting point for you to add your own custom features via Theia extensions.

We are going to use `yarn` instead of `npm` (Theia default). We are also going to use `lerna` to run scripts across workspaces.

To ease the setup of such a repository we have created a [Yeoman generator](https://github.com/eclipse-theia/generator-theia-extension) to scaffold the project. It will also generate the `hello-world` example extension. Run it using

```bash
npm install -g yo generator-theia-extension
mkdir my-theia-app
cd my-theia-app
yo theia-extension # select the 'Hello World' option and complete the prompts
```

After creating the project structure, the Yeoman generator will also install the required dependencies, so it might take a minute to complete.
Let's have look at the generated code now. The root `package.json` defines the workspaces, the dependency to `lerna` and some scripts to build, start and watch the project for browser or electron. Please note that the excerpt on this page might be outdated, please use the Yeoman generator to generate the files listed below to get the latest version.

```json
{
  "private": true,
  "engines": {
    "yarn": ">=1.7.0 <2",
    "node": ">=18"
  },
  "scripts": {
    "build:browser": "yarn --cwd browser-app bundle",
    "build:electron": "yarn --cwd electron-app bundle",
    "prepare": "lerna run prepare",
    "postinstall": "theia check:theia-version",
    "start:browser": "yarn --cwd browser-app start",
    "start:electron": "yarn --cwd electron-app start",
    "watch:browser": "lerna run --parallel watch --ignore electron-app",
    "watch:electron": "lerna run --parallel watch --ignore browser-app"
  },
  "devDependencies": {
    "lerna": "2.4.0"
  },
  "workspaces": [
    "hello-world", "browser-app", "electron-app"
  ]
}
```

Besides the root level artifacts, you will have three directories in your project:

- browser-app: The definitions of your custom Theia application running in the browser
- electron-app: The definitions of your custom Theia application running on the desktop (via Electron)
- hello-world: The generated example extensions, see [this guide](/docs/authoring_extensions) for more details

## Executing the Browser Application

Now we want to see our Theia application in action. For this purpose, the generator has created a `package.json` in the folder `browser-app`, which defines your Theia app. It defines a Theia browser application with a couple of statically included extensions, including our `hello-world`. These extensions are the features that will be part of our Theia application. The generated project contains a minimalistic set-up, **you can add additional features by adding more existing (or custom) extensions to this list**. The example also does not contain any VS Code extensions, see [here](/docs/authoring_vscode_extensions) on how to add them.

```json
{
  "private": true,
  "name": "browser-app",
  "version": "0.0.0",
  "dependencies": {
    "@theia/core": "latest",
    "@theia/editor": "latest",
    "@theia/filesystem": "latest",
    "@theia/markers": "latest",
    "@theia/messages": "latest",
    "@theia/monaco": "latest",
    "@theia/navigator": "latest",
    "@theia/preferences": "latest",
    "@theia/process": "latest",
    "@theia/terminal": "latest",
    "@theia/workspace": "latest",
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

Now we have all pieces together to build and run the application.
To run the browser app, enter:

```bash
yarn build:browser
yarn start:browser
```

Point your browser to <http://localhost:3000>, you will see a minimalistic custom Theia App.
As this Theia app contains the generated 'hello world' extension, you can try out the custom feature. Open the quick access bar by pressing 'F1' and enter 'say hello' and 'ENTER': A message "Hello World!" should pop up. This command is contributed by the 'hello-world' extension, see [this guide](/docs/authoring_extensions) to learn more.

## Executing the Extension In Electron

The `package.json` for the Electron app looks almost the same, except for the name and the target property.

```json
{
  "name": "electron-app",
  ...
  "theia": {
    "target": "electron"
  }
}
```

Before running the electron app, you have to rebuild some native modules:

```bash
yarn build:electron
yarn start:electron
```

### Recent Workspaces in the Windows Jump List

On Windows, Electron-based applications list the recently opened workspaces in the jump list of their task bar entry, so users can reopen a workspace without going through the application first.

The feature is contributed by an Electron frontend module of `@theia/workspace`. If your application derives its module list from the `theiaExtensions` declarations of its dependencies, as the Yeoman generator and the Theia IDE do, it is picked up automatically. Otherwise add `@theia/workspace/lib/electron-browser/electron-workspace-module` to the module list of your Electron frontend.

For the jump list to also appear in the Windows menu, set `appUserModelId` in the Electron section of your frontend configuration to the same value as the `appId` used when packaging the application:

```json
{
  "theia": {
    "frontend": {
      "config": {
        "electron": {
          "appUserModelId": "eclipse.theia"
        }
      }
    }
  }
}
```

If the two values differ, the jump list is only available on the task bar entry.

## Browser-Only Applications

A browser-only application runs entirely in the browser, without a Theia backend. Everything that would normally happen on a server either runs in the frontend or is unavailable, and the file system is backed by the browser's Origin Private File System instead of a disk.

Since Theia 1.76.0 such applications can also run VS Code extensions, as long as those extensions are bundled into the application at build time. Installing extensions from Open VSX at runtime is not possible without a backend, so the Extensions view stays read-only and lists the bundled extensions as built-in.

The extensions are prepared during the build: they are downloaded like in any other Theia application, unpacked into `lib/frontend/hostedPlugin/` and described in a generated `list.json` that the frontend loads at startup. From there they are served over a read-only `theia-plugin:` URI scheme, which is what makes color themes, icon themes, icon fonts, webview resources and `workspace.fs` reads on `extensionUri` resolve relative to the extension root. Extensions that only contribute declaratively, such as grammars or themes, are deployed to the frontend host; extensions with an entry point run in the web worker as usual. If your application wants to determine the set of extensions itself rather than relying on the generated list, bind `BrowserOnlyPluginOptions` and supply the metadata.

A few things behave differently than with a backend. Extension `globalState` and `workspaceState` are kept in the browser's local storage, which is shared with other application state and limited to a few megabytes in total; writes are serialized across tabs using the Web Locks API where available. Terminals are not supported at all, and an extension calling `window.createTerminal` gets a rejected promise while the user sees a notification explaining why.

### Config Directory Change in 1.76.0

Browser-only applications previously wrote their configuration to the root of the Origin Private File System, because the stubbed `EnvVariablesServer` returned an empty config directory URI. As of Theia 1.76.0 it returns `file:///.theia`, which matches what a backend-based application does and confines the UTF-8 encoding override to that folder instead of applying it to the whole file tree.

Existing deployments are *not* migrated automatically. After the upgrade the application looks below `/.theia`, finds nothing, and behaves like a fresh installation: settings, keymaps, the recent workspaces list, workspace metadata and the AI stores such as chat sessions and prompt customizations all appear empty. The old data is still present at the root and remains readable, so if your users' state matters, move it into `/.theia` once on first start after the upgrade.

### Moved Constant

`PluginPaths` now lives in `@theia/plugin-ext/lib/main/common/paths/const`, as it is shared between the backend and the browser-only frontend. The previous location `@theia/plugin-ext/lib/main/node/paths/const` still re-exports it but is deprecated, so deep imports should be updated.

## Bundling with esbuild

`theia build` always bundles with [esbuild](https://esbuild.github.io/). esbuild had been the default since Theia 1.72.0 for applications without a `webpack.config.js`; as of Theia 1.75.0 the webpack pipeline has been removed entirely, so there is no bundler choice left to make. On first build, `@theia/cli` generates an `esbuild.mjs` for your application, which you can then customize.

If your application still contains a `webpack.config.js`, it is no longer used. The build now warns about the leftover file and points you at the migration guide, and `theia clean` still removes the previously generated webpack files. Port any customizations you had in `webpack.config.js` over to `esbuild.mjs`.

A few related renames come with this change. On the command line, `theia build [webpack-args...]` is now `theia build [bundler-args...]`, and `--webpack-help` remains as a deprecated alias of `--bundler-help`. In `@theia/bundle-plugin` (formerly `@theia/native-webpack-plugin`), the `NativeWebpackPlugin` and `MonacoWebpackPlugin` have been replaced by `nativeDependenciesPlugin`, `monacoNlsPlugin` and `exposeModulePlugin`.

Production builds now also pre-compress their assets. The new `compressAssetsPlugin` writes a `.gz` file next to each bundled asset so the backend can serve the compressed variant directly, which noticeably reduces the amount of data sent to the browser. It runs for production builds only, so watch rebuilds stay fast, and it removes stale `.gz` files from earlier builds to make sure the backend never serves outdated content.

If you depend on the webpack setup and cannot migrate yet, the migration guide describes how to vendor it into your own repository. For the full migration steps, see the [Theia Migration Guide](https://github.com/eclipse-theia/theia/blob/master/doc/Migration.md#general).

## Conclusion

In this guide, we have demonstrated how to set-up your own custom Theia application. The next typical steps are:

- Extend your application with additional [Theia extensions](/docs/authoring_extensions/) (existing ones or developed by yourself)
- Extend your application with [VS Code Extensions](/docs/authoring_vscode_extensions/) (existing ones or developed by yourself)
- Create a deployable product for desktop, browser or both (see the [Theia IDE](/docs/blueprint_documentation/) as an example)

## Troubleshooting

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
