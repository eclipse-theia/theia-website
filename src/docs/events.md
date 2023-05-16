---
title: Events
---

## Events

Events in Theia can be confusing, hopefully we can clarify things.

Let's consider this code:

(From logger-watcher.ts)

``` typescript
@injectable()
export class LoggerWatcher {

    getLoggerClient(): ILoggerClient {
        const emitter = this.onLogLevelChangedEmitter
        return {
            onLogLevelChanged(event: ILogLevelChangedEvent) {
                emitter.fire(event)
            }
        }
    }

    private onLogLevelChangedEmitter = new Emitter<ILogLevelChangedEvent>();

    get onLogLevelChanged(): Event<ILogLevelChangedEvent> {
        return this.onLogLevelChangedEmitter.event;
    }
}
```

Let's start with:

``` typescript
    private onLogLevelChangedEmitter = new Emitter<ILogLevelChangedEvent>();
```

So first what is an `Emitter`?

An Emitter is an event handler container,
it allows for event handlers to be registered on it and triggered with an
event of type X in this case an ILogLevelChangedEvent.

So here we just create an `Emitter` that will have events of type ILogLevelChangedEvent;

Next we want to be able to register an event handler on this `Emitter` to
do so we do this:

``` typescript
    get onLogLevelChanged(): Event<ILogLevelChangedEvent> {
        return this.onLogLevelChangedEmitter.event;
    }
```

What this actually returns is a function that will register an event
handler. Passing it your event handler function will
register it so that it's called when the event fires.

So you can call:

(From logger.ts)

``` typescript
 /* Update the root logger log level if it changes in the backend. */
        loggerWatcher.onLogLevelChanged(event => {
            this.id.then(id => {
                if (id === this.rootLoggerId) {
                    this._logLevel = Promise.resolve(event.newLogLevel);
                }
            });
        });
```

This registers the anonymous function passed as param on this emitter.

Next we will need to trigger this event handler by firing an event:

``` typescript
 onLogLevelChanged(event: ILogLevelChangedEvent) {
                emitter.fire(event)
            }
```

When calling this function, the emitter fires and all the event handlers
are called.

So if you need to trigger events in theia:

- Create an emitter
- Register events with the emitter.event function
- Fire events with emitter.fire(event)
