# Dependency Injection (DI)

Theia uses the DI framework [Inversify.js](http://inversify.io/) to wire up the
different components.

DI decouples a component from creating its dependencies. Instead, it gets them
injected on creation (as parameters of a constructor). A DI container does the
creation for you, based on some configuration you provide on startup through
so-called container modules.

For instance, the `Navigator` widget needs access to a `FileSystem` to present
folders and files in a tree. With DI the concretion of that `FileSystem`
interface is not important to the `Navigator` widget. It can safely assume that
an object consistent with the `FileSystem` interface is ready to use. In Theia,
the used `FileSystem` concretion is just a proxy sending JSON-RPC messages to
the backend, so it needs a particular configuration and treatment. The
navigator doesn't need to care as it will get injected a fully working
`FileSystem` instance.

Moreover, this decoupling of construction and use, allows extensions to provide
their very specific implementations of e.g. a `FileSystem` if needed. Still
without touching any users of the `FileSystem` interface.

DI is an integral part of Theia. Therefore, we highly recommend learning at
least the basics of [Inversify.js](http://inversify.io/).
