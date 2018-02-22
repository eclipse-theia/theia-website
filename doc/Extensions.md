# Extensions

Theia is composed of extensions. An extension is an npm package that exposes
any number of DI modules (`ContainerModule`) that contribute to the creation of
the DI container.

_At the moment an extension is consumed by adding a dependency to the
npm-package and then referencing the exposed DI modules in the startup script
(see [main.ts](../examples/browser/src/client/main.ts)). In the future, we will
automate the creation of the application, based on metadata in the
`package.json` of an extension. Extensions can be installed/uninstalled at
runtime, which will trigger a recompilation and restart._

Through a DI module, the extension can provide bindings from types to concrete
implementations, i.e. provide services and contributions.
