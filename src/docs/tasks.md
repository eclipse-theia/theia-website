---
title: Tasks
---

# Tasks

Eclipse Theia users can execute tasks to automate certain steps in their workflow.
Tasks can be invoked via the main menu *Terminal* or via the command palette.
Every task is defined by a task configuration, which specifies among other properties the task type, a label, optionally a description, whether it is a background task or not, whether it is a build or test task, its dependencies to other tasks, etc.
Tasks in Eclipse Theia are structurally compatible with Visual Studio Code tasks.
Similar to [Visual Studio Code](https://code.visualstudio.com/docs/editor/tasks), users can define tasks in a file named `tasks.json` file in the workspace or on user level.

## TaskProviders, TaskResolvers and TaskRunners

In Eclipse Theia, tasks can also be provided from and executed by custom Theia extensions.
In particular, Theia offers the three main contribution points for tasks: `TaskProvider`, `TaskResolver` and `TaskRunner`.
To better understand the purpose of those, let’s look at the flow, through the involved components, when a user selects and executes a task in the following figure.

<img src="/tasks.png" alt="Task flow overview" style="max-width: 915px">

Besides the user-defined task configurations, Eclipse Theia will also offer its users all task configurations collected from the registered task providers.
When a user selects one of the provided task configurations and executes it, the configuration will be handed over to the task service, which will first resolve the selected task configuration using a resolver that is registered for the selected task configuration’s type.
A task resolver can manipulate the task configuration before it is actually executed.
This is useful for, e.g., filling in default values and resolving custom variables in a task configuration.
Once the configuration is resolved, the task service requests the execution of the resolved task configuration on the task server, which runs on the backend.
To actually perform the resolved task configuration, the task server looks up the task runner registered for the configuration’s type.
Finally, the task runner is responsible for actually performing the task according to the specified task configuration.

Theia provides dedicated contribution points for task providers, task resolvers, and task runners.
Thus, Theia extensions can extend the list of available tasks with custom task types, handle the resolution of task configurations of custom task types, as well as implement their execution.

## Example: Task Providers and Task Resolvers

In the following example, we will contribute a custom task provider, which provides a custom task.
Further, we will add a custom task resolver that will enhance the task configuration before execution.
Finally, we will contribute a custom task runner that executes our provided task.

Task providers and task resolvers are contributed via an implementation of `TaskContribution`.
Like all contributions, it must be bound in the respective front end module as shown below.
If you are not yet familiar with contribution points in Theia or the use of dependency injection, please consider this guide on [Services and Contributions](https://theia-ide.org/docs/services_and_contributions/).

``` typescript
export default new ContainerModule(bind => {
   bind(TaskContribution).to(MyTaskContribution);
});
```

Our `TaskContribution` contributes a task provider and a task resolver (see following listing). Their implementation is shown below. By specifying a task type along with the registration, Theia will pick the right resolver and runner for our custom task type (`myTaskType`).

``` typescript
@injectable()
export class MyTaskContribution implements TaskContribution {

   registerProviders(providers: TaskProviderRegistry): void {
       providers.register('myTaskType', new MyTaskProvider())
   }

   registerResolvers(resolvers: TaskResolverRegistry): void {
       resolvers.registerTaskResolver('myTaskType', new MyTaskResolver())
   }
}
```

Our example task provider contributes exactly one task:

``` typescript
class MyTaskProvider implements TaskProvider {
   async provideTasks(): Promise<TaskConfiguration[]> {
       return [{
           label: 'My Custom Task',
           type: 'myTaskType',
           _scope: 'MyTaskProvider'
       }];
   }
}
```

Our example task resolver always sets property `myCustomValue` to the static value `42`.
In a real scenario, it would check whether it is set in the specified `taskConfig` and only add it if it is not set. Or it would resolve variables specified in the `taskConfig`.

``` typescript
class MyTaskResolver implements TaskResolver {
    async resolveTask(taskConfig: TaskConfiguration):Promise<TaskConfiguration> {
        return {...taskConfig, myCustomValue: 42 }
    }
}
```

## Example: Task Runners

Task runners are contributed via a `TaskRunnerContribution`. As we use dependency injection to create the actual task runner, we bind the contribution and the task runner itself in our module:

``` typescript
export default new ContainerModule(bind => {
   bind(MyTaskRunner).toSelf().inSingletonScope();
   bind(TaskRunnerContribution).to(MyTaskRunnerContribution);
});
```

In our `TaskRunnerContribution`, we register an instance of our custom task runner at the `TaskRunnerRegistry` along with the task type our runner is responsible for.

``` typescript
@injectable()
export class MyTaskRunnerContribution implements TaskRunnerContribution {

   @inject(MyTaskRunner)
   protected readonly myTaskRunner: MyTaskRunner;

   registerRunner(runners: TaskRunnerRegistry): void {
       runners.registerRunner('myTaskType', this.myTaskRunner);
   }
}
```

Task runners need to implement the interface `TaskRunner`.
The function `run`receives the `TaskConfiguration` when a task is triggered and is responsible for actually running the operation.
In our example, we instantiate a custom implementation of `Task` called `MyTask` and execute it with the current configuration.
Using the existing interface `Task` allows us to connect the task to the `TaskManager` which will show visual feedback in the workbench during tasks execution (see screenshot below).

``` typescript
@injectable()
export class MyTaskRunner implements TaskRunner {

   @inject(TaskManager)
   protected readonly taskManager: TaskManager;

   @inject(ILogger)
   protected readonly logger: ILogger;

   async run(config: TaskConfiguration, ctx?: string): Promise<Task> {
       const myTask = new MyTask(this.taskManager, this.logger,
                                   { config, label: 'My Custom Task' });
       myTask.execute(config.myCustomValue);
       return myTask;
   }
}
```

Finally, our custom task configuration will wait for 5000 ms and then print out the custom value we have added in our task resolver before:

``` typescript
class MyTask extends Task {
   execute(myCustomValue: number) {
       this.logger.info(`Start running custom task: ${myCustomValue}`);
       setTimeout(() => {
           this.logger.info(`Finished running custom task: ${myCustomValue}`);
           this.fireTaskExited({ taskId: this.taskId, code: 0 });
       }, 5000);
   }
   …
}
```

As you can see in the screenshot below, our custom task is running for 5000 ms (as we set a timeout in `MyTask`) and then it stops.

<img src="/running-custom-task.gif" alt="Running custom task" style="max-width: 702px">

As can be seen in console output, the task starts and finishes 5000 ms later and it prints the custom variable that has been added by the custom resolver.

```
root INFO Start running custom task: 42
root INFO Finished running custom task: 42
```

## Task Definitions

Extensions can also omit contributing a task provider, but only contribute a runner (and optionally a resolver).
As a consequence, those custom tasks are not provided automatically to users, but users can still configure tasks based on these custom task types in their `tasks.json` file.
To support users in the creation of such user-defined task configurations for custom task types, Theia provides a dedicated contribution point for *task definitions*.
A task definition essentially specifies a JSON schema defining the properties that can or need to be specified for a task of a certain custom type.
