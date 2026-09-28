---
title: External API
---

# External API

Tools outside the application sometimes need to look into a running Theia instance or drive it: a control plane that shows what its users are working on, a dashboard, or a CLI that scripts a recurring task. The `@theia/external-api` extension provides an HTTP surface for exactly that. It is not a general-purpose remote control; it serves the endpoints that the application and its extensions explicitly contribute.

Nothing is served unless it is switched on. The extension is off by default, is configured entirely through preferences, and is meant for local tooling rather than for access from a browser page.

## Enabling the API

Four preferences control the server, and changes take effect immediately without a restart:

`externalApi.delivery` decides whether and where the API is served. With `off`, the default, there is no HTTP surface at all. With `samePort`, the endpoints are mounted on the backend server the application already runs. With `separatePort`, a dedicated server is started, which keeps the API separate from the regular application traffic and lets it be bound to a different interface.

`externalApi.port` and `externalApi.hostname` configure that dedicated server. The hostname defaults to `localhost`, so the API is only reachable from the same machine unless it is changed deliberately.

`externalApi.token` protects the endpoints with a bearer token. As long as it is empty, anybody who can reach the server can call it. Once a token is set, requests have to carry it as `Authorization: Bearer <token>`.

A typical setup for a local tool therefore looks like this:

```json
{
    "externalApi.delivery": "separatePort",
    "externalApi.port": 3100,
    "externalApi.token": "<your secret>"
}
```

Requests that carry an `Origin` header are rejected with `403`. This keeps a web page that a user happens to have open from driving the API in the background; external tools do not send that header and are unaffected.

## Discovering What Is Available

The API describes itself. `GET /api/openapi.json` returns an OpenAPI 3.1 document listing every route, its parameters, its request and response schemas and its documentation. The document can be imported into API clients such as Bruno or Postman to explore the API interactively, and it is a reasonable starting point for generated clients or for MCP tool definitions.

The document respects the token: requested without a valid one, it only reveals the endpoints that are not protected.

Responses share a single wire format, and unknown paths return a JSON `404` rather than an HTML error page, so a client can parse every answer the same way. Request bodies are validated against the declared schemas, and a rejected body comes back as `400` with the validation messages as details.

## Contributing Endpoints

An extension adds its own endpoints by binding an `ExternalApiContribution`. The contribution declares the absolute path it owns and registers its routes on the router it is handed:

```typescript
import { ExternalApiContribution, ExternalApiRouter, RestResult } from '@theia/external-api/lib/node';
import { injectable } from '@theia/core/shared/inversify';

@injectable()
export class ExampleApiContribution implements ExternalApiContribution {
    readonly path = '/api/example';

    configure(router: ExternalApiRouter): void {
        router.get('/items', { operationId: 'listItems' }, () => RestResult.ok({ items: this.list() }));
        router.post('/items', { operationId: 'createItem', bodySchema: CreateItemSchema },
            ({ body }) => RestResult.created(this.create(body)));
        router.eventStream('/events', { event: 'items', snapshot: () => ({ items: this.list() }) });
    }
}
```

```typescript
bind(ExampleApiContribution).toSelf().inSingletonScope();
bind(ExternalApiContribution).toService(ExampleApiContribution);
```

Routes registered this way are typed, validated against their `bodySchema` and published in the OpenAPI document automatically. `eventStream` registers a managed server-sent event stream that takes care of keep-alive and of coalescing bursts of updates. If a contribution needs something the typed API does not cover, the underlying express router remains accessible as an escape hatch, but those routes are not described in the OpenAPI document.

Two details are worth knowing. A contribution can set `unprotected = true` to stay reachable without the configured token, which should be reserved for endpoints that reveal nothing sensitive. And because express matches by prefix, contributions must not nest their paths inside one another; a nested contribution is skipped with a warning instead of silently shadowing its neighbour.

The uniform response format is written by `ExternalApiResponseWriter`, which an application can rebind if it needs a different envelope.

## AI Chat Sessions

The `@theia/ai-external-api` extension is the first contribution on this surface and exposes the AI chat sessions of all connected frontends under `/api/ai/sessions`. It makes it possible to see what a user's assistant is currently doing and to start or continue a conversation from outside the application.

`GET /api/ai/sessions` lists the known sessions, ordered by their last interaction, each with its title, status, workspace, pinned agent and a short plain-text preview of the conversation. `GET /api/ai/sessions/:id` returns the full conversation of one session as plain text. `GET /api/ai/sessions/events` streams changes to that list as server-sent events, so a dashboard does not have to poll.

On the writing side, `POST /api/ai/sessions` creates a session, optionally with a pinned agent and an initial prompt, and `POST /api/ai/sessions/:id/prompt` sends a prompt to an existing one. `POST /api/ai/sessions/:id/open` reveals a session in the chat view of the frontend that owns it, and `POST /api/ai/sessions/:id/restore` brings a persisted session back without stealing focus.

Sessions that several frontends know about are reported once, and actions are routed to the frontend most likely to be able to carry them out, preferring a restored session over a merely persisted one, an in-progress session over a finished one and a more recent one over an older one. If no frontend is connected at all, the endpoints answer with `503`.

The detailed endpoint reference, including all request and response fields, lives with the extension in the [Theia repository](https://github.com/eclipse-theia/theia/blob/master/packages/ai-external-api/doc/api-reference.md), and the OpenAPI document served by the running application is always authoritative.

## A Note on Deployment

The configuration is pushed from the frontend, which has two consequences in setups with more than one frontend: the frontend that writes last determines the configuration, and disconnecting a frontend does not revoke it. For products that want the API in production, it is advisable to treat this as a user-level convenience and to add a deliberate opt-in of their own on top of it.
