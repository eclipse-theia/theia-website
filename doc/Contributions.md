# Contribution-Points

If an extension wants to provide a hook for others to contribute to, they
should define a _contribution-point_. A _contribution-point_ is just an
interface that many others can implement. The extension will delegate to them
when needed.

The `OpenerService`, for instance, defines a contribution point to allow others
registering `OpenHandler`s. You can have a look at the code
[here](../packages/core/src/browser/opener-service.ts).

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