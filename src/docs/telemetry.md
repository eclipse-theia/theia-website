---
title: Telemetry
---

# Telemetry

Theia applications frequently need to report how a feature is used or when something goes wrong, but where that data may go differs completely from product to product. The `@theia/telemetry` extension of the Theia platform therefore only provides the plumbing: features report events through a typed service, and the application decides whether and where those events are delivered. Delivering the events is up to the adopter: an application that does not implement a destination transmits nothing, and there is no built-in destination that could be switched on instead. The Theia IDE deliberately makes no use of this, see [Data Usage and Telemetry](/docs/data_usage_telemetry). If you build your own application on the Theia platform, you can add telemetry and customize it to your needs by implementing a sink as described below.

The extension was introduced in Theia 1.74 and its API is marked as experimental, so it may still change.

## Reporting Events

Features inject `TelemetryService` and report events under a slash-separated topic. The same service is available in the frontend and in the backend; frontend events are forwarded to the backend over RPC, where the delivery policy is evaluated.

```typescript
import { TelemetryService } from '@theia/telemetry/lib/common';

@inject(TelemetryService)
protected readonly telemetry: TelemetryService;

// ...
this.telemetry.report('example/build/completed', {
    duration: 120,
    successful: true,
    targets: ['frontend', 'backend']
}, {
    kind: 'error',
    attributes: { origin: 'build-service' }
});
```

Besides the topic, an event carries a `kind` (`usage`, `error` or `crash`, defaulting to `usage`), the payload passed as `data`, optional `attributes`, a `timestamp`, and a `session` identifier. Payload and attributes accept strings, numbers, booleans and homogeneous arrays of those, and are snapshotted when reported, so later mutations cannot change what a destination sees.

The `session` is assigned by the framework and cannot be set by the reporting code: one UUID per frontend instance and a constant value for the backend. This gives a destination a stable handle to associate events with, so contextual information only has to be collected once instead of being attached to every single event.

In browser-only applications there is no backend counterpart, so the frontend binds a no-op `TelemetryService`.

## Contributing a Sink

A *sink* is the destination an application contributes in its backend to actually do something with an event, typically forwarding it through a transport the application owns.

```typescript
import { TelemetryEvent } from '@theia/telemetry/lib/common';
import { TelemetrySink } from '@theia/telemetry/lib/node';
import { injectable } from '@theia/core/shared/inversify';

@injectable()
export class ApplicationTelemetrySink implements TelemetrySink {
    readonly id = 'example/backend';
    readonly interests: readonly string[] = ['example/build/*'];
    readonly scope = 'remote';

    handle(event: TelemetryEvent): void {
        // Forward the permitted event using an application-owned transport.
    }
}
```

The `interests` declare which topics the sink cares about, either as exact topics, as an `owner/*` prefix pattern, or as `*` for everything. The `id` is what users refer to in the `telemetry.filters` preference, so it should be stable and recognizable.

An event reaches a sink only if the `telemetry.filters` preference permits the topic for that sink, one of the sink's interests matches the topic, and, for remote sinks, the configured telemetry level permits the event kind. A missing filter entry allows everything the sink declared interest in, an empty array disables the sink entirely, and a non-empty array restricts it to the listed topics.

The optional `flush()` method is awaited on backend shutdown so a sink can drain its own buffers. The framework itself performs no buffering, transport or vendor integration.

Sinks declared with `scope: 'local'` keep their data on the machine and therefore bypass user consent, although they still respect `telemetry.filters`. The `/metrics` endpoint of `@theia/metrics` is implemented this way: frontend and backend stopwatch measurements are reported as `theia/measurement/result` events and consumed by a local sink with the ID `theia/measurements`. As before, the endpoint requires the backend to run with `--log-level=debug`, and users can suppress it with `"telemetry.filters": { "theia/measurements": [] }`.

## Consent

Consent for remote sinks is expressed by the `telemetry.telemetryLevel` preference, which shares key, values and semantics with VS Code: `off` (the default), `crash`, `error` and `all`. Consent is evaluated fail-closed, meaning the level is treated as `off` until preferences are known.

Features and sinks never read this preference themselves. Instead, the framework consults a `TelemetryConsentProvider`, whose default implementation is backed by the preference:

```typescript
export interface TelemetryConsentProvider {
    readonly level: TelemetryLevel;
    readonly onDidChangeTelemetryLevel: Event<TelemetryLevel>;
}
```

Applications that obtain consent elsewhere, for example from their installer or from a corporate policy, can rebind `TelemetryConsentProvider` in the frontend and backend modules. Its `onDidChangeTelemetryLevel` event is the hook for reacting to consent changes; the framework itself does not notify sinks about opt-outs.

The backend evaluates the policy before invoking a sink and remains authoritative. The frontend applies the same check merely to avoid unnecessary RPC calls.

## Changing the Defaults

Both `telemetry.telemetryLevel` and `telemetry.filters` are read by the frontend and by the backend preference service. An application that ships different defaults must therefore register equivalent `PreferenceContribution` overrides in *both* the frontend and the backend container. Setting the values through `theia.frontend.config.preferences` in the application's `package.json` only affects the frontend and is not sufficient, because the backend decides what is delivered.

## Migrating from MeasurementNotificationService

Applications that previously consumed frontend stopwatch measurements via `MeasurementNotificationService` from `@theia/metrics` need to switch to telemetry. The service has been removed; frontend measurements now arrive as `theia/measurement/result` telemetry events, so a backend sink with a matching interest replaces the former notification client.
