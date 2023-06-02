---
title: Packaging Theia as a Docker Image
---

# Packaging Theia as a Docker Image

Eclipse Theia Blueprint is an example product used as a reference on how to build IDE-like products based on the Eclipse Theia framework.
Theia Blueprint assembles a selected subset of existing Theia features and extensions.
We provide a Docker image for Theia Blueprint.
In the respective git repository you can also find the source code for Theia Blueprint and the Dockerfile.
This documentation will use these sources as a template. We will explain
how to customize this template so you can build your own custom Theia-based product for the cloud.

## Building a Docker Image

The Docker build uses the `browser.Dockerfile` Dockerfile checked in at the root of the repository.

The build itself consists of two stages.\
In the `build-stage` we are building the workspace using `yarn` and perform some cleanup tasks to make the build results smaller.\
The `production-stage` is based on a slim node base-image. Here we create a dedicated user, which will run the application, and the user's home directory.
Additional tools required for the desired use of the application (like Git, a JDK for Java development, Maven, ...) are installed.
The build results are copied from the `build-stage` and environment variables used by Theia are set.\
Please check the comments in `browser.Dockerfile` for more detailed information about every step.

You can build the docker image running `docker build -t theia-blueprint -f browser.Dockerfile .` at the root of the repository.

You can run your image using `docker run -p=3000:3000 --rm theia-blueprint` and pointing your browser to http://localhost:3000.

## Updating Bundled VS Code Extensions

All VS Code extensions that are already included in the product at start-up, are defined in `applications/browser/package.json`.
They are listed under the `theiaPlugins` property as key-value pairs.
The keys can be freely chosen as long as they represent a valid folder name and are unique within the `theiaPlugins` property.
We suggest using the extension’s unique identifier.
The value is the download URL of the extensions.
They will be downloaded automatically during the `docker build`.

To remove an extension from the product, simply delete its entry.

### Extension sources

We use the [Open VSX Registry](https://open-vsx.org/) of the Eclipse Foundation to install extensions.
It is an open and community-driven VS Code extension marketplace.
More information can be found at [eclipse.org](https://www.eclipse.org/legal/open-vsx-registry-faq/).

## Customizing Theia Extensions

Eclipse Theia extensions can be added through `dependencies` in `applications/browser/package.json`.
Like any other dependency, it will be installed via yarn.
Similarly, removing an extension works by removing it from `dependencies`.
For extensions already published on npm (or your private npm registry) this is all you need to do.

An alternative approach is developing your extension inside Theia Blueprint’s mono repo.
The advantage of doing this is that you don’t need to publish the extension and can build the product with the local version of the extension.
This is facilitated by the lerna build already configured in the Theia Blueprint’s repository.
It links the product and all extensions in the repository together during the build.

The easiest way to create a new extension is to use the [official yeoman generator](https://www.npmjs.com/package/generator-theia-extension) for Theia extensions.
Assuming you have [yeoman](https://yeoman.io/) globally installed on your system, simply create a new extension in the repository root with `yo theia-extension --standalone`.
The `--standalone` flag is used to only create an extension but not a whole Theia application frame because it is already provided by the Theia Blueprint.
After successfully generating the extension, add its folder name to the Theia Blueprint’s root `package.json` in the workspaces property.
After adding the extension to the dependencies in `applications/browser/package.json` as described above, the new extension will be part of the built product.

## Branding

You can also add your own branding to the product by customizing the application icons and title, the welcome page and the About dialog.
In addition, some parts of the installer can be customized.

### Customizing the App

#### Application Window Title

The window title is the application’s name if no workspace is opened and `<workspace name> — <application name>` if a workspace is opened.
The application name can be adapted in `applications/browser/package.json`:
Open the file and adapt the value of property `theia.frontend.config.applicationName` to the desired name.

### Customizing the Welcome Page

The Eclipse Theia welcome page can be customized by binding a custom `WidgetFactory` for Theia’s `GettingStartedWidget`.
This is done with Theia Blueprint in the theia-blueprint-product extension.
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
This is done with Theia Blueprint in the theia-blueprint-product extension.
The easiest way to customize the about dialog is to adapt the class `TheiaBlueprintAboutDialog` in `theia-extensions/theia-blueprint-product/src/browser/theia-blueprint-about-dialog.tsx`.

The widget is bound in `theia-extensions/theia-blueprint-product/src/browser/theia-blueprint-frontend-module.ts` like this:

```typescript
isBound(AboutDialog) ? rebind(AboutDialog).to(TheiaBlueprintAboutDialog).inSingletonScope() : bind(AboutDialog).to(TheiaBlueprintAboutDialog).inSingletonScope();
```

To use another custom dialog widget, remove this code, extend Theia’s AboutDialog class, and (re)bind it as above.
