---
title: Services and Contributions
---

# Services and Contributions

In this section we describe how extensions can use services from other extensions
and how they can contribute to the Theia workbench.

## Dependency Injection (DI)

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

## Services

A service is just a binding for other components to use. For instance, one
extension could expose the `SelectionService` so that others can get an
instance injected and use it.

## Contribution-Points

If an extension wants to provide a hook for others to contribute to, they
should define a _contribution-point_. A _contribution-point_ is just an
interface that many others can implement. The extension will delegate to them
when needed.

The `OpenerService`, for instance, defines a contribution point to allow others
registering `OpenHandler`s. You can have a look at the code
[here](https://github.com/eclipse-theia/theia/blob/master/packages/core/src/browser/opener-service.ts).

Theia comes with an extensive list of contribution points already. A good way
to see what contribution points exist is to do a find references on
`bindContributionProvider`.

## Contribution Providers

A contribution provider is basically a container for contributions where
contributions are instances of a bound type.

It is very generic.

To bind a type to a contribution provider you can do like this:

(From messaging-module.ts)

``` typescript
export const messagingModule = new ContainerModule(bind => {
    bind<BackendApplicationContribution>(BackendApplicationContribution).to(MessagingContribution);
    bindContributionProvider(bind, ConnectionHandler)
});
```
The last line will bind a ContributionProvider to one that contains all
ConnectionHandler bound instances.


It is used as such:

(From messaging-module.ts)

``` typescript
    constructor( @inject(ContributionProvider) @named(ConnectionHandler) protected readonly handlers: ContributionProvider<ConnectionHandler>) {
    }

```

So here we're injecting a ContributionProvider with the named
ConnectionHandler value that was bound before by `bindContributionProvider`.

This enables anyone to bind a ConnectionHandler and now when the
messagingModule is started all the ConnectionHandlers will be initiated.
