---
title: Communication via RPC
---

# Communication via RPC

In this section we will explain how you can create a backend service and
then connect to it over RPC.

We will use the task execution system as a small example of that.

## Overview

This works by creating a service exposed by the express framework and
then connecting to that over a websocket connection.

## Registering a service

So the first thing you will want to do is expose your service so that the
frontend can connect to it.

You will need to create backend server module file similar to this (`task-backend-module.ts`):

``` typescript

import { ContainerModule } from '@theia/core/shared/inversify'';
import { ConnectionHandler, RpcConnectionHandler } from '@theia/core/lib/common/messaging';
import { TaskClient, TaskServer, taskPath } from '../common/task-protocol';

    bind(ConnectionHandler).toDynamicValue(ctx =>
        new RpcConnectionHandler<TaskClient>(taskPath, client => {
            const taskServer = ctx.container.get<TaskServer>(TaskServer);
            taskServer.setClient(client);
            return taskServer;
        })
    ).inSingletonScope();
```

Let's go over that in detail:

``` typescript
import { ConnectionHandler, RpcConnectionHandler } from '@theia/core/lib/common/messaging';
```

This imports the `RpcConnectionHandler`, this factory enables you to create
a connection handler that `onConnection` creates a proxy object to the remote object that
is called in the backend over RPC and optionally exposes a local object to RPC.

We'll see more on how this is done as we go.

The `ConnectionHandler` is a simple interface that specifies the path of the
connection and what happens on connection creation.

It looks like this:

``` typescript
import { Channel } from '../message-rpc/channel';

export const ConnectionHandler = Symbol('ConnectionHandler');

export interface ConnectionHandler {
    readonly path: string;
    onConnection(connection: Channel): void;
}
```

``` typescript
import { TaskClient, TaskServer, taskPath } from '../common/task-protocol';
```

The `task-protocol.ts` file contains the interfaces that the server and the
client need to implement.

The server here means the backend object that will be called over RPC
and the client is a client object that can receive notifications from the
backend object.

We will get more into that later.

``` typescript
    bind<ConnectionHandler>(ConnectionHandler).toDynamicValue(ctx => {
```

Here a bit of magic happens, at first glance we're just saying here is an
implementation of a `ConnectionHandler`.

The magic here is that this `ConnectionHandler` type is bound to a
ContributionProvider. A central `MessagingContribution` picks up all registered connection handlers
an when this contribution is initialized it t creates a websocket channel for all bound `ConnectionHandlers`.
To save resources the hood all `MessagingContributions` are routed over one
websocket connection (multiplexing).

To dig more into ContributionProvider see this [section](Services_and_Contributions#contribution-providers).

So now:

``` typescript
   new RpcConnectionHandler<TaskClient>(taskPath, client => {
```

This does a few things if we look at this class implementation:

``` typescript
export class RpcConnectionHandler<T extends object> implements ConnectionHandler {
    constructor(
        readonly path: string,
        readonly targetFactory: (proxy: RpcProxy<T>) => any,
        readonly factoryConstructor: new () => RpcProxyFactory<T> = RpcProxyFactory
    ) { }

    onConnection(connection: Channel): void {
        const factory = new this.factoryConstructor();
        const proxy = factory.createProxy();
        factory.target = this.targetFactory(proxy);
        factory.listen(connection);
    }
}
```

We see that a websocket channel is created on the `taskPath` ("/services/task") by the extension of the `ConnectionHandler`.

And let's look at what it does `onConnection` :

``` typescript
    onConnection(connection: Channel): void {
        const factory = new this.factoryConstructor();
        const proxy = factory.createProxy();
        factory.target = this.targetFactory(proxy);
        factory.listen(connection);
    }
```

Let's go over this line by line:

``` typescript
       const factory = new this.factoryConstructor();
```

This creates a `ProxyFactory` on path "services/task".

``` typescript
        const proxy = factory.createProxy();
```

Here we create a proxy object from the factory, this will be used to call
the other end of the RPC channel using the `TaskClient` interface.

``` typescript
        factory.target = this.targetFactory(proxy);
```

This will call the function we've passed in parameter so:

``` typescript
       client => {
            const taskServer = ctx.container.get<TaskServer>(TaskServer);
            taskServer.setClient(client);
            return taskServer;
        }
```

This sets the client on the `taskServer`, in this case this is used to
run asynchronous tasks (e.g. a terminal command) in the backend.

And it returns the `taskServer` as the object that will be exposed over RPC.

``` typescript
 factory.listen(channel);
```

This connects the factory to the channel and establishes the RPC protocol.

## Connecting to a service

So now that we have a backend service let's see how to connect to it from
the frontend.

To do that you will need something like this:

(From `task-frontend-module`)

``` typescript
import { ContainerModule } from '@theia/core/shared/inversify';
import { WebSocketConnectionProvider } from '@theia/core/lib/browser/messaging';
import { TaskServer, taskPath } from '../common/task-protocol';
import { TaskWatcher } from '../common/task-watcher';

export default new ContainerModule(bind => {
    bind(TaskServer).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        const taskWatcher = ctx.container.get(TaskWatcher);
        return connection.createProxy<TaskServer>(taskPath, taskWatcher.getTaskClient());
    }).inSingletonScope();
});
```

The important bit here are those lines:

``` typescript
   bind(TaskServer).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        const taskWatcher = ctx.container.get(TaskWatcher);
        return connection.createProxy<TaskServer>(taskPath, taskWatcher.getTaskClient());
    }).inSingletonScope();

```

Let's go line by line:

``` typescript
        const connection = ctx.container.get(WebSocketConnectionProvider);
```

Here we're getting the websocket connection, this will be used to create a proxy from.

``` typescript
        const taskWatcher = ctx.container.get(TaskWatcher);
```

Here we're creating a watcher, this is used to get notified about events
from the backend by using the `taskWatcher`'s client
(`taskWatcher.getTaskClient()`)

See more information about how events work in theia [here](/docs/Events#events).

``` typescript
        return connection.createProxy<TaskServer>(taskPath, taskWatcher.getTaskClient());
```

As the second argument, we pass a local object to handle RPC messages from the remote object.
Sometimes the local object depends on the proxy and cannot be instantiated before the proxy is instantiated.
In such cases, the proxy interface should implement `RpcServer` and the local object should be provided as a client.

```ts
export type RpcServer<Client> = Disposable & {
    /**
     * If this server is a proxy to a remote server then
     * a client is used as a local object
     * to handle RPC messages from the remote server.
     */
    setClient(client: Client | undefined): void;
    getClient?(): Client | undefined;
};

export interface TaskServer extends RpcServer<TaskClient>  {
    // ...
}

const serverProxy = connection.createProxy<TaskServer>("/services/task");
const client = taskWatcher.getTaskClient();
serverProxy.setClient(client);
```

So here at the last line we're binding the `TaskServer` interface to a
RPC proxy.

Maybe you've noticed too but as far as the connection is concerned the frontend
is the server and the backend is the client. But that doesn't really
matter in our logic.

So again there's multiple things going on here what this does is that:

- it creates a JsonRpc Proxy on path "services/task".
- it exposes the `taskWatcher.getTaskClient()` object.
- it returns a proxy of type `TaskServer`.

So now instances of `TaskServer` are proxied over RPC to the
backend's `TaskServer` object.


## Complete example

If you wish to see the complete implementation of what I referred too in
this documentation see [this commit](https://github.com/eclipse-theia/theia/commit/99d191f19bd2a3e93098470ca1bb7b320ab344a1).
