---
title: Services and Contributions
---

# Services and Contributions

In this section we describe how [Theia extensions](https://theia-ide.org/docs/extensions#theia-extensions) can use services provided by the platform and by other extensions. Furthermore, we describe how extensions can contribute to the Theia workbench via contribution points.

A **service** is an object that provides functionality to it's consumers. The contract between a service and its consumers is described by an interface. Any implementation of a service must implement that interface according to the interface documentation. Any extension in Theia can provide and/or consume services. The extensions provided by the Theia platform provide a set of default services, e.g. the [`MessageService`](https://theia-ide.org/docs/message_service/). However, you can provide and consume your own custom services, too.

**Contribution points** define hooks, which allow to extend something. Contribution points are defined by an interface that the contributor is expected to implement, e.g. a `CommandContribution`. The extension defining the contribution point will then pick up the contribution, e.g. adding the contributed command to the Theia workbench.

Contribution points, like services, can be contributed to and defined by any extension. The Theia platform defines a set of default contribution points, e.g. to add commands or menus to the Theia workbench. However, you can also define your own ones.

The usage of services and contribution points requires communication between extensions. To avoid direct dependencies on the implementation classes, Theia uses dependency injection.

<img src="/dependency-injection.png" alt="Dependency Injection Overview" style="max-width: 525px">

In the following sections, we provide a quick overview of dependency injection, services, contributions and how to define contribution points.

## Dependency Injection (DI)

Theia uses the DI framework [InversifyJS](http://inversify.io/) to wire ups the difference services and contributions points.

Dependency injection decouples the consumers of services -- i.e. the dependencies of those consumers -- from the actual creation and retrieval of those services. As an example, if you want to use a service, you neither have to instantiate it, nor do you need to manually retrieve it from somewhere. Instead, the dependency injection container injects the services on creation of your component. The dependency injection container resolves the dependency for you and, if necessary, even instantiates it on the fly. With that, the consumer of services doesn’t need to worry where they come from and you can easily exchange the actual implementations of services later on without having to change the consumers. The dependency injection container works based on some configuration you provide on startup through so-called container modules.

We will provide examples on how to use dependency injection in the sections “Services” and “Contributing to contribution points” below.

Dependency injection is an integral part of Theia. Therefore, we highly recommend learning at
least the basics of [InversifyJS](http://inversify.io/). For more details, please also refer to [this article on how dependency injection works in Theia](https://eclipsesource.com/blogs/2018/11/28/how-to-inversify-in-eclipse-theia/)

## Using Services

To use a service in Theia, you can get it injected as a dependency using DI. Dependencies are usually specified via the interface of the service you want to retrieve. This way, you even avoid a dependency on any specific implementation, the caller just knows the interface. This allows the component providing the implementation to seamlessly replace the implementation of a service. You can even override the existing default implementation of a service without breaking any service consumers.

To get a parameter injected from the dependency injection container, you need to annotate it with an identifier (a string). Service providers on the other hand will publish the available services using an identifier, too. When a parameter with a specific identifier is requested via dependency injection, the dependency injection context will look it up and return an instance of the respective service. For convenience service providers usually use a Symbol as an identifier that has exactly the same name as the respective service interface itself. The following examples the '@inject(MessageService)' is the symbol (service identifier), while 'private readonly messageService: MessageService' is referring the interface of the service.

Services, or more generically, dependencies can be injected as fields, in the constructor or in initialization functions (see following code example).

```typescript
//Injection in the constructor
constructor(@inject(MessageService) private readonly messageService: MessageService) { }
 
// Injection as a field
@inject(MessageService)
protected readonly messageService!: MessageService;
 
//Injection in an initialization function (will be called after the constructor and after injecting fields
@postConstruct()
protected async init(@inject(MessageService) private readonly messageService: MessageService) { }
```

Please note that injection will only work in components that are created by the DI container. Therefore, they must be marked with `@injectable` (see code example below). Further, they must be registered in the DI context (for an example see next section).

```typescript
@injectable()
export class MyContribution implements SomeContributionInterface
```

## Contributing to Contribution Points

Contribution Points in Theia define an interface to be implemented, e.g. `CommandContribution`. A contributing extension must provide an implementation of this interface and mark it with `@injectable`, e.g.:

**mycommand-contribution.ts**
```typescript
@injectable()
export class MyCommandContribution implements CommandContribution
```

Additionally, the contribution must be bound in the DI container, so that the contribution point provider can pick up our contribution, more precisely get it injected. The binding is done in the container module of an extension. It binds the implementation to the contribution interface, or to be technically correct, to the Symbol representing the interface (see example below).

**helloworld-frontend-module.ts**
```typescript
export default new ContainerModule(bind => {
   // add your contribution bindings here
   bind(CommandContribution).to(HelloworldCommandContribution);
...
});
```

Please see [Commands/Menus/Keybindings](https://theia-ide.org/docs/commands_keybindings/) for a simple example for the usage of services and contribution points.

## Defining Contribution-Points

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
