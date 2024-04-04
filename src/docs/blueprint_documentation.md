---
title: Extending/Adopting the Theia IDE
---

# Extending/Adopting the Theia IDE

This guide provides an overview on how to extend and customize the Theia IDE to your own custom IDE or tool. In this scenario, the Eclipse Theia IDE is an example product used as a reference on how to build desktop IDE-like products based on the Eclipse Theia framework. If you just want to use the Theia IDE, see the [user guide](../user_getting_started)

Please note that adopting the Theia IDE as a basis is just one of several ways to get started with building a Theia-based application. We recommend reading the article "[Build your own IDE/Tool](../composing_applications)" as a first step. Furthermore, this guide is focused on building a desktop app. We also provide an [experimental Docker version](https://github.com/eclipse-theia/theia-blueprint?tab=readme-ov-file#docker-build) of the Theia IDE as an alternative.

The Theia IDE assembles a selected subset of existing Theia features and extensions.
We provide installers for the Theia IDE to be downloaded (see links below).
In the [respective git repository](https://github.com/eclipse-theia/theia-blueprint) you can also find the [source code for the Theia IDE and its installers](https://github.com/eclipse-theia/theia-blueprint).

This documentation will use these sources as a template. We will explain
how to customize this template so that you can build your own custom Theia-based product including installers and packaging for installing the desktop-based version of your custom product on all major operating systems. Please note that the technical name (e.g. in the source code) for the Theia IDE is "Theia Blueprint" to avoid confusion with the generic term "IDE".

- [Building a product and installers](#building-a-product-and-installers)
- [Signing](#signing)
- [Adding/removing Features](#addingremoving-features)
- [Updating Bundled VS Code Extensions](#updating-bundled-vs-code-extensions)
- [Customizing Theia Extensions](#customizing-theia-extensions)
- [Branding](#branding)
- [Configure Publish and Update](#configure-publish-and-update)

## Building a product and installers

The Theia IDE build uses [electron-builder](https://www.electron.build/) to package the product as a desktop application.

The product can be built and packaged with [yarn](https://yarnpkg.com/).
Note that you usually can only package the product for the operating system you execute the build on.
For more information see the [electron-builder documentation on multi-platform builds](https://www.electron.build/multi-platform-build).

The following commands may be run from the root directory of the repository.

To install dependencies and build the application, simply execute `yarn`.

You can also directly run the unpackaged application, e.g. to test it during development with `yarn electron start`.

With `yarn electron package`, you package the application into an executable file for your current operating system.
The packaged application will be located in `applications/electron/dist`.
The folder `applications/electron/dist/<OS>-unpackaged` will contain the files that are bundled into the final packaged executable.
For Linux, this is an executable `.AppImage`, for Windows a `.exe` installer, and a `.dmg` disk image for macOS.

You can also just create the unpackaged content by running `yarn electron package:preview`.
This is useful to see the bundled files and saves time compared to a full package.
To publish the current version, the command `yarn electron deploy` can be used.
For more information on publishing also see section "Configure publish and update".

## Signing

[Electron-builder](https://www.electron.build/) supports signing the packaged application on Windows and macOS.
The current signing scripts for the Theia IDE are located in `applications/electron/scripts`.
The file `after-pack.js` is the current entry point for the configured signing via Eclipse infrastructure.

However, as signing is highly dependent on your setup, see the [electron builder’s signing documentation](https://www.electron.build/code-signing) on how to properly set up your own signing.

## Adding/Removing Features

The Theia IDE is based on the Theia platform, which is a flexible and adaptable platform for build tools and IDEs. Therefore, you can adapt the feature set and general appearance of the Theia IDE to your custom requirements with almost no limits. The Theia platform provides two mechanism to add your custom extensions: VS Code extensions and Theia extensions. Please have a look at the [overview about Theia extension capabilities](../extensions/) for details. When assembling a product such as the Theia IDE, you can freely decide, which VS Code extensions and Theia extensions are part of it and thereby influence the feature set of your custom product. The following two sections describe how to modify which [VS Code Extensions](#updating-bundled-vs-code-extensions) and which [Theia extensions](#customizing-theia-extensions) are part of your product. Please also note that you can allow users of a Theia-based tool to [install VS Code extensions at runtime](../user_install_vscode_extensions/).

## Updating Bundled VS Code Extensions

All VS Code extensions that are already included in the product at start-up ("built-ins"), are defined in `applications/electron/package.json`.
They are listed under the `theiaPlugins` property as key-value pairs.
The keys can be freely chosen as long as they represent a valid folder name and are unique within the `theiaPlugins` property.
We suggest using the extension’s unique identifier.
The value is the download URL of the extensions.
It will automatically be downloaded during the application’s build process.
Any new plugin will be automatically downloaded the next time one of the following npm scripts is executed:

- `install` (which is the same as just running `yarn`)
- `prepare`
- `download:plugins`

To remove an extension from the product, simply delete its entry.
If plugins were not already downloaded, no further steps are required as downloaded plugins are ignored via gitignore.
However, previously downloaded plugins are not automatically removed.
Therefore, you need to remove its folder from the `applications/electron/plugins` folder.
Alternatively, you can remove the whole `applications/electron/plugins` folder and execute `yarn electron download:plugins` to download all defined plugins.

### Extension sources

We use the [Open VSX Registry](https://open-vsx.org/) of the Eclipse Foundation to install extensions.
It is an open and community-driven VS Code extension marketplace.
More information can be found at [eclipse.org](https://www.eclipse.org/legal/open-vsx-registry-faq/).

## Customizing Theia Extensions

Eclipse Theia extensions can be added through `dependencies` in `applications/electron/package.json`.
Like any other dependency, it will be installed via yarn.
Similarly, removing an extension works by removing it from `dependencies`.
For extensions already published on npm (or your private npm registry) this is all you need to do.

An alternative approach is developing your extension inside Theia IDE’s mono repo.
The advantage of doing this is that you don’t need to publish the extension and can build the product with the local version of the extension.
This is facilitated by the lerna build already configured in the Theia IDEs’s repository.
It links the product and all extensions in the repository together during the build.

The easiest way to create a new extension is to use the [official yeoman generator](https://www.npmjs.com/package/generator-theia-extension) for Theia extensions.
Assuming you have [yeoman](https://yeoman.io/) globally installed on your system, simply create a new extension in the repository root with `yo theia-extension --standalone`.
The `--standalone` flag is used to only create an extension but not a whole Theia application frame because it is already provided by the Theia IDE.
After successfully generating the extension, add its folder name to the Theia IDEs’s root `package.json` in the workspaces property.
After adding the extension to the dependencies in `applications/electron/package.json` as described above, the new extension will be part of the built product.

## Branding

You can also add your own branding to the product by customizing the application icons and title, the welcome page and the About dialog.
In addition, some parts of the installer can be customized.

### Customizing the App

#### Application Window Title

The window title is the application’s name if no workspace is opened and `<workspace name> — <application name>` if a workspace is opened.
The application name can be adapted in `applications/electron/package.json`:
Open the file and adapt the value of property `theia.frontend.config.applicationName` to the desired name.

#### Application Icons

Application icons are located in `applications/electron/resources/`.
Simply replace them with your own icons.
Because each operating system handles icons differently, they should all be replaced to ensure proper use.
They map as follows:

- macOS: icons.icns
- Windows: icon.ico
- Linux: icons subfolder

### Customizing the Welcome Page

The Eclipse Theia welcome page can be customized by binding a custom `WidgetFactory` for Theia’s `GettingStartedWidget`.
This is done with the Theia IDE in the theia-blueprint-product extension.
The easiest way to customize the welcome page is to adapt the class `TheiaBlueprintGettingStartedWidget` in `theia-extensions/theia-blueprint-product/src/browser/theia-blueprint-getting-started-widget.tsx`.

The widget is bound in `theia-extensions/theia-blueprint-product/src/browser/theia-blueprint-frontend-module.ts` like this:

```typescript
    bind(TheiaBlueprintGettingStartedWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(context => ({
        id: GettingStartedWidget.ID,
        createWidget: () => context.container.get<TheiaBlueprintGettingStartedWidget>(TheiaBlueprintGettingStartedWidget),
    })).inSingletonScope();
```

To use another custom widget, remove this code and bind your widget correspondingly.

### Customizing the About Dialog

The Eclipse Theia about dialog can be customized by binding a custom subclass of Theia’s `AboutDialog` class to `AboutDialog`.
This is done with Theia IDE in the theia-blueprint-product extension.
The easiest way to customize the about dialog is to adapt the class `TheiaBlueprintAboutDialog` in `theia-extensions/theia-blueprint-product/src/browser/theia-blueprint-about-dialog.tsx`.

The widget is bound in `theia-extensions/theia-blueprint-product/src/browser/theia-blueprint-frontend-module.ts` like this:

```typescript
isBound(AboutDialog) ? rebind(AboutDialog).to(TheiaBlueprintAboutDialog).inSingletonScope() : bind(AboutDialog).to(TheiaBlueprintAboutDialog).inSingletonScope();
```

To use another custom dialog widget, remove this code, extend Theia’s AboutDialog class, and (re)bind it as above.

### Customizing the Preferences

The default preferences directory in Eclipse Theia IDE is `.theia-blueprint` and is located as described in the [Preferences documentation](../preferences/). You can customize this location by modifying [`theia-blueprint-variables-server.ts`](https://github.com/eclipse-theia/theia-blueprint/blob/master/theia-extensions/theia-blueprint-product/src/node/theia-blueprint-variables-server.ts).

### Customizing the Installer

The installers are created using [electron-builder](https://www.electron.build/).
The corresponding configuration file is located at `applications/electron/electron-builder.yml`.

#### Installer File Base Name

The installer files’ base names are defined by the `productName` property in `applications/electron/electron-builder.yml`.

#### Windows Installer

As is typical for Windows applications, there is an installation wizard for the Windows version of the Theia IDE.
The installer is configured in the nsis section of the configuration file.
Available customizations include settings such as:

- Icons
- Sidebar image
- License
- One click installation
- Automatic application start after installation
- Whether users can change the installation directory

More details on available options and how they can be customized can be found in the [official electron builder documentation](https://www.electron.build/configuration/nsis).
This documentation also includes information about more advanced features such as custom NSIS scripts.

## Configure Publish and Update

The Theia IDE uses [electron-builder](https://www.electron.build/) to create and publish installers.
It also uses [electron-updater](https://www.npmjs.com/package/electron-updater), developed by the electron-builder organization, to provide automatic updates of the installed application.

There are various deployment targets which can be configured in the `applications/electron/package.json` and `applications/electron/electron-builder.yml` as documented [here](https://www.electron.build/configuration/publish) in the Electron Builder documentation.
Multiple publish configurations can be configured.
Thereby, the first one is automatically used by the updater to look for available updates.
The currently used generic publishing method does not automatically publish to the specified server, but is just used as the lookup location for the updater.
