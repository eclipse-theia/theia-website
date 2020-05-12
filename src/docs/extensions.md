---
title: Extensions
---

# Extensions

Theia is composed of extensions. An extension is an npm package that exposes
any number of DI modules (`ContainerModule`) that contribute to the creation of
the DI container.

An extension is consumed by adding a dependency to the
npm-package in the `package.json` of the application.
Extensions can be installed/uninstalled at
runtime, which will trigger a recompilation and restart.

Through a DI module, the extension can provide bindings from types to concrete
implementations, i.e. provide services and contributions.
