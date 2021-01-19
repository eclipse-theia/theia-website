---
title: Packaging Theia as a Desktop Product
---

# Packaging Theia as a Desktop Product

Eclipse Theia Blueprint product is a template to showcase the capabilities of Theia as well as how to build desktop-based products based on the platform.
Theia Blueprint assembles a selected subset of existing Theia features and extensions.
We provide installers for Theia Blueprint to be downloaded (see below) from the Theia webpage.
In the respective git Repository you can also find the source code the product and its installers were built from.
This is also the starting point for this documentation that is about how to customize this template to build your own custom Theia-based product and installers and packaging for installing the Desktop-based version of your custom product on all major operating systems.

This documentation will provide you with a basic introduction how the Blueprint product and its installers/packaging are built.
We then detail how to customize the product by adjusting the built-in VS Code and Theia extensions for the product and the branding of the product.
Finally, we conclude with how to publish and update your products and their packaging and installers.

## Building a product and installers

The Theia Blueprint build uses [electron-builder](https://www.electron.build/) to package the product as a desktop application.

The product can be built and packaged with [yarn](https://yarnpkg.com/).
The following commands assume your terminal is pointing to in the root directory of the repository.
Note that you usually can only package the product for the operating system you execute the build on.
For more information see the [electron-builder documentation on multi platform builds](https://www.electron.build/multi-platform-build).

To Install dependencies and build the product’s source code just run `yarn`.

You can also directly run the unpackaged application, e.g. to test it during development with `yarn start`.

With `yarn package` you package the application into an executable file for your current operating system.
The packaged application will be located in `electron-app/dist`.
The folder `electron-app/dist/<OS>-unpackaged` will contain the files that are bundled into the final packaged executable.
For Linux, this is an executable `.AppImage`, for Windows a `.exe` installer, and a `.pkg` installer for MacOS.

You can also only create the unpackaged content by running `yarn package:preview`.
This is useful to see the bundled files and saves time compared to a full package.
To publish the current version of the product the command `yarn deploy` can be used.
For more information on publishing also see section Configure publish and update.

## Signing

[Electron-builder](https://www.electron.build/) supports signing the packaged application on Windows and MacOS.
The current signing scripts for the blueprint are located in `electron-app/scripts`.
The file `after-pack.js` is the current entry point for the configured signing via the Eclipse infrastructure.

However, as signing is highly dependent on your setup, see the [electron builder’s signing documentation](https://www.electron.build/code-signing) on how to set up your own signing properly.

## Customizing VS Code Extensions

The VS Code extensions, which are already included into the product on start-up, are defined in `electron-app/package.json`.
They are listed under the `theiaPlugins` property as key-value pairs.
The keys can be freely chosen as long as they represent a valid folder name and are unique within the `theiaPlugins` property.
We suggest using the extension’s unique identifier.
The value is the download URL of the extensions.
It will automatically be downloaded by the application’s build process.
Any new plugin will be automatically downloaded the next time one of the following npm scripts is executed:

- `install` (which is the same as just running `yarn`)
- `prepare`
- `download:plugins`

To remove an extension from the product, simply delete its entry.
If plugins were not already downloaded, no further steps are required because downloaded plugins are ignored via gitignore.
However, already downloaded plugins are not automatically removed.
Therefore, you need to remove its folder from the `electron-app/plugins` folder.
Alternatively, you can remove the whole `electron-app/plugins` folder and execute `yarn run download:plugins` to download all defined plugins.

### Extension sources

While you can technically install extensions directly from [Microsoft’s VSCode Marketplace](https://marketplace.visualstudio.com/), it is not legal to our best knowledge to use this for products other than VSCode!
Therefore, we use the [Open VSX Registry](https://open-vsx.org/) of the Eclipse Foundation.
It is an open and community-driven VSCode extension place.
More information about it can be found on [eclipse.org](https://www.eclipse.org/legal/open-vsx-registry-faq/).

## Customizing Theia Extensions

Theia extensions can be added to the product by adding them to the `dependencies` in `electron-app/package.json`.
Like any other dependency, it will be installed via yarn.
Similarly, removing an extension works by removing it from `dependencies`.
For extensions already published on npm (or your private npm registry) this is all you need to do.

An alternative approach is developing your extension inside the blueprint’s mono repo.
The advantages of this are that you don’t need to publish the extension and you can build the product with the local version of the extension.
This is facilitated by the lerna build already configured in the blueprint’s repository.
It links the product and all extensions in the repository together during the build.

The easiest way to create a new extension is to use the [official yeoman generator](https://www.npmjs.com/package/generator-theia-extension) for Theia extensions.
Assuming you have [yeoman](https://yeoman.io/) globally installed on your system, simply create a new extension in the repository root with `yo theia-extension --standalone`.
The `--standalone` flag is used to only create an extension but not a whole Theia application frame because it is already provided by the blueprint.
After successfully generating the extension, make sure to add its folder name to the blueprint’s root `package.json` in the workspaces property.
After adding the extension to the dependencies in `electron-app/package.json` as described before, the new extension will be part of the built product.

## Branding

You can also add your own branding to the product by customizing the application icons and title, the welcome page and the About dialog.
In addition some parts of the installers can be customized.

### Customizing the app

#### Application Window Title

The window title is the application’s name if no workspace is opened and `<workspace name> — <application name>` if a workspace is opened.
The application name can be adapted in `electron-app/package.json`:
Open the file and adapt the value of property `theia.frontend.config.applicationName` to the desired name.

#### Application Icons

The application’s icons are located in `electron-app/resources/`.
Just replace them with your own icons.
Because each operating system handles icons differently, you need to replace them for all of them.
They map as follows:

- MacOS: icons.icns
- Windows: icon.ico
- Linux: icons subfolder

### Customizing the welcome page

Theia’s welcome page can be customized by binding a custom `WidgetFactory` for Theia’s `GettingStartedWidget`.
This is done by the blueprint product in the theia-example-updater extension.
The easiest way to customize the welcome page is to adapt the class `TheiaInstallerGettingStartedWidget` in `theia-example-updater/src/electron-browser/customization/theia-installer-getting-started-widget.tsx`.

The widget is bound in `theia-example-updater/src/electron-browser/theia-updater-frontend-module.ts` like this:

```typescript
bind(TheiaInstallerGettingStartedWidget).toSelf();
  bind(WidgetFactory).toDynamicValue(context => ({
      id: GettingStartedWidget.ID,
      createWidget: () => context.container.get<TheiaInstallerGettingStartedWidget>(TheiaInstallerGettingStartedWidget),
  })).inSingletonScope();
```

To use another custom widget, remove this code and bind your widget correspondingly.

### Customizing the about dialog

Theia’s about dialog can be customized by binding a custom subclass of Theia’s `AboutDialog` class to `AboutDialog`.
This is done by the blueprint product in the theia-example-updater extension.
The easiest way to customize the About dialog is to adapt the class `TheiaInstallerAboutDialog` in `theia-example-updater/src/electron-browser/customization/theia-installer-about-dialog.tsx`.

The widget is bound in `theia-example-updater/src/electron-browser/theia-updater-frontend-module.ts` like this:

```typescript
isBound(AboutDialog)
  ? rebind(AboutDialog).to(TheiaInstallerAboutDialog).inSingletonScope()
  : bind(AboutDialog).to(TheiaInstallerAboutDialog).inSingletonScope();
```

To use another custom dialog widget, remove this code, extend Theia’s AboutDialog class, and (re)bind it like above.

### Customizing the installer

The installers are created using [electron-builder](https://www.electron.build/).
The corresponding configuration file is located at `electron-app/electron-builder.yml`.

#### Installer File Base Name

The installer files’ base names are defined by the `productName` property in `electron-app/electron-builder.yml`.

#### Windows Installer

As is typical for Windows applications, there is an installation wizard for the windows version of the Theia blueprint.
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

## Configure publish and update

The Theia blueprint uses [electron-builder](https://www.electron.build/) to create and publish installers.
Furthermore, it uses [electron-updater](https://www.npmjs.com/package/electron-updater), which is also developed by the electron-builder organisation, to provide automatic updates of the installed application.

There are various deployment targets which can be configured in the `electron-app/package.json` and `electron-app/electron-builder.yml` as documented [here](https://www.electron.build/configuration/publish) in the Electron Builder documentation.
Multiple publish configurations can be configured.
Thereby, the first one is automatically used by the updater to look for available updates.
The currently used generic publishing method does not automatically publish to the specified server but is just used as the lookup location for the updater.
