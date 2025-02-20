---
title: Message Service
---

# Message Service

The message service allows you to show messages, interactive dialogues and progress information to the user. You can get the `MessageService` injected and call either `info`, `warn` or `error` on it to report your message (see code example below):

```typescript
@inject(MessageService) private readonly messageService: MessageService
this.messageService.info('Hello World!')
```

By default, Theia will display messages as toast notifications in the bottom right corner. Below you can see screenshots of the different message types (info, warn and error). Please note that you can easily adapt Theia to implement a different behavior for displaying messages by providing a custom `MessageClient`.

Info

<img src="../../message-service-info.png" alt="Message Service - info" style="max-width: 525px">

Warn

<img src="../../message-service-warn.png" alt="Message Service - warning" style="max-width: 525px">

Error

<img src="../../message-service-error.png" alt="Message Service - error" style="max-width: 525px">

By default, notifications will be displayed until the user closes them. You can optionally define a time-out after which messages will be closed automatically:

```typescript
this.messageService.info('Say Hello with timeout',{timeout: 3000})
```

Optionally, you can also add actions that the user can execute. In case the user executes an action, the message service call will resolve to the action string which was handed over.

In the following code example, we provide the two actions “Say Hello again!” and “Cancel”. We react to the action “Say hello again!” by posting yet another message, “Cancel” will be ignored.

```typescript
@inject(MessageService) private readonly messageService: MessageService

this.messageService
 .error("Hello World!", "Say Hello again!", "Cancel")
 .then((action) => {
   if (action === "Say Hello again!")
     this.messageService.info("Hello again!");
   })
```

The corresponding toast notification will look like this:

<img src="../../message-service-user-action.png" alt="Message Service - user action" style="max-width: 525px">

When the user selects “Say Hello again”, another toast notification will be shown:

<img src="../../message-service-hello-again.png" alt="Message Service - after user action" style="max-width: 525px">

## Progress Reporting

The message service also allows you to report progress on an ongoing operation. You can incrementally update a progress bar and the message while the toast notification remains visible until the operation is done. The following example opens a progress bar and updates the status three times before it is completed. Please see the [TypeDoc of `MessageService`](https://eclipse-theia.github.io/theia/docs/next/classes/core.messageservice-1.html#showprogress) for more detailed information.

```typescript
this.messageService
 .showProgress({
   text: `Doing something`,
 })
 .then((progress) => {
   // Do something
   progress.report({
     message: "First step completed",
     work: { done: 10, total: 100 },
   });
   // Do something
   progress.report({
     message: "Next step completed",
     work: { done: 80, total: 100 },
   });
   // Do something
   progress.report({
     message: "Complete",
     work: { done: 100, total: 100 },
   });
   progress.cancel();
 })
```

Note that `progress.cancel` is also used to signal that progress is complete.
The code example above will be displayed like this:

<img src="../../message-service-progress-reporting.gif" alt="Message Service - progress reporting" style="max-width: 525px">
