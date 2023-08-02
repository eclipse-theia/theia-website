---
title: Backend Application Contributions
---

# Backend Application Contributions

A backend application contribution allows Eclipse Theia extensions to hook into the lifecycle of the Theia backend. Backend application contributions are instantiated immediately after starting the backend application, which makes them a good place for initializing backend services that are required during the entire lifespan of the backend.

To register backend application contributions, an extension needs to bind an implementation of the interface `BackendApplicationContribution` in the backend module.

``` typescript
export default new ContainerModule(bind => {
   bind(MemoryTracker).toSelf().inSingletonScope();
   bind(BackendApplicationContribution).toService(MemoryTracker);
});
```

The interface `BackendApplicationContribution` provides hooks, which are all optional so that implementations can freely choose which of those hooks they are interested in, without having to implement the others.
For initialization of backend services, the most common hook is the `initialize()` method that is invoked as soon as the Theia backend is initialized.

As an example, let’s implement a backend service that shall run during the entire lifespan of the Theia backend to track its memory usage.
For the sake of simplicity it will just print the memory to the log, whenever it changes more than a certain threshold.

Therefore, a `BackendApplicationContribution` named `MemoryTracker` is bound in the dependency injection context as shown in the code above.
The implementation of `MemoryTracker` reacts to the hook `initialize()` and executes the method `logMemory()` periodically every two seconds.
This method obtains the currently used memory, compares it to the previous memory and prints a message to the log as soon as the difference to the previous memory is above 0.1 MB.

``` typescript
@injectable()
export class MemoryTracker implements BackendApplicationContribution {

   @inject(ILogger)
   protected readonly logger: ILogger;
   protected logTimer: NodeJS.Timer;
   protected memoryUsed = 0;

   initialize(): MaybePromise<void> {
       this.logTimer = setInterval(() => this.logMemory(), 2000);
   }

   protected logMemory(): void {
       const currentMemoryUsed = this.currentRoundedMemoryUsage();
       const diff = currentMemoryUsed - this.memoryUsed;
       if (Math.abs(diff) > 0.1) {
           const timestamp = new Date().toUTCString();
           this.logger.info(
               `[${timestamp}] PID ${process.pid} uses ${currentMemoryUsed} MB (${diff > 0 ? '+' : ''}${diff.toFixed(2)})`
           );
           this.memoryUsed = currentMemoryUsed;
       }
   }

   protected currentRoundedMemoryUsage() {
       return Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100;
   }

   onStop(): void {
       if (this.logTimer) {
           clearInterval(this.logTimer);
       }
   }
}
```

Once this backend application contribution is registered and the backend is started, it starts logging an output, similar to the following:

```
root INFO Theia app listening on http://localhost:3000.
root INFO Configuration directory URI: 'file:///home/foobar/.theia'
root INFO [Fri, 20 Aug 2021 12:20:43 GMT] PID 46590 uses 18.14 MB (+18.14)
root INFO [Fri, 20 Aug 2021 12:20:47 GMT] PID 46590 uses 18.94 MB (+0.80)
root INFO [Fri, 20 Aug 2021 12:20:51 GMT] PID 46590 uses 15.25 MB (-3.69)
root INFO [Fri, 20 Aug 2021 12:21:07 GMT] PID 46590 uses 15.36 MB (+0.11)
root INFO [Fri, 20 Aug 2021 12:21:21 GMT] PID 46590 uses 15.47 MB (+0.11)
root INFO [Fri, 20 Aug 2021 12:21:41 GMT] PID 46590 uses 15.6 MB (+0.13)
root INFO [Fri, 20 Aug 2021 12:21:59 GMT] PID 46590 uses 15.71 MB (+0.11)
```

Often such backend application contributions also provide methods that can be invoked by other backend services and, for instance, start external processes that need to be available as soon as the application is started.
Examples are database connections, REST services, etc.

In addition to initializing backend services as early as the backend is started, backend application contributions can also configure and extend the HTTP server used by the Theia backend.
Therefore, the `BackendApplicationContribution` interface provides the three methods `configure(app: express.Application)`, `onStart(app: express.Application)`, and `onStop(app: express.Application)`.
Thus, the HTTP server can be configured with custom settings and even extended with additional endpoints that need to be available for the respective Theia application.

An example for configuring an additional endpoint named `/myendpoint` is given below.

``` typescript
import { injectable } from '@theia/core/shared/inversify';
import { json } from 'body-parser';
import { Application, Router } from '@theia/core/shared/express';
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';

@injectable()
export class MyCustomEndpoint implements BackendApplicationContribution {
   configure(app: Application): void {
       app.get('/myendpoint', (request, response) => {
           …
       });
   }
}
```

For more information on how to configure HTTP endpoints and handle events requests, please refer to the [Express API](https://expressjs.com/en/4x/api.html).
