---
title: Dynamic Toolbar
---

# Dynamic Toolbar

Eclipse Theia provides an optional and fully dynamic toolbar to be included in your custom IDE or tool. Please also see [the documentation of the toolbar from a user point of view](/docs/user_toolbar).

To enable the toolbar, simply include the Theia extension "@theia/toolbar" into your Theia-based product (also see [the documentation on composing Theia applications](/docs/composing_applications/)).

The Theia toolbar defines some default commands that are displayed even before the user can configure the toolbar to their preferences. These defaults are defined in a `ToolbarDefaultsFactory`. See [here](https://github.com/eclipse-theia/theia/blob/master/packages/toolbar/src/browser/toolbar-defaults.ts) for the default `ToolbarDefaultsFactory` that is shipped within the toolbar extension.
To define your own default commands to the toolbar, create a custom implementation of `ToolbarDefaultsFactory` and rebind you own factory in your extension module (see following code example).

```typescript
if (isBound(ToolbarDefaultsFactory)) {
  rebind(ToolbarDefaultsFactory).toService(MyCustomToolbarDefaultsFactory);
} else {
  bind(ToolbarDefaultsFactory).toService(MyCustomToolbarDefaultsFactory);
}
```
