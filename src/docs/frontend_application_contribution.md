---
title: Frontend Application Contributions
---

# Frontend Application Contributions

Frontend application contributions can react to lifecycle events of the Theia frontend application to execute behavior before the frontend is started or stopped, or once the frontend’s layout is initialized.
Besides providing a generally useful startup hook, frontend application contributions are also typically used to open and arrange views, register listeners, add status bar items, or customize the layout of the application shell when the application is started.
Another use case is to react to shutdown, for instance, to persist certain application data on shutdown, e.g. using the `StorageService`.

As any other frontend contribution, frontend application contributions are also registered in a frontend module by binding an implementation of the `FrontendApplicationContribution` interface.
A typical pattern is a view that shall always be initially opened on startup.
Therefore the view implementation does not only extend the `AbstractViewContribution<MyWidget>`, but is also registered as `FrontendApplicationContribution` to open the contributed view after the application shell layout is initialized.

``` typescript
export default new ContainerModule(bind => {
   …
   bindViewContribution(bind, MyViewContribution);
   bind(FrontendApplicationContribution).toService(MyViewContribution);
}
```

Besides the view implementation itself, the view can now implement the method `initializeLayout(app: FrontendApplication)` from the `FrontendApplicationContribution` interface to open itself after the layout has been initialized.
Note that this method is only called if there is no previously stored workbench layout available, which makes it ideal to implement initial workbench layouts, as it won’t override layout changes that users already applied manually in a previous session.

``` typescript
@injectable()
export class MyViewContribution extends AbstractViewContribution<MyViewWidget> implements FrontendApplicationContribution {
   …
   async initializeLayout(app: FrontendApplication): Promise<void> {
       await this.openView();
   }
   …
}
```

If a frontend application contribution needs to be invoked every time the application is started -- and not only after initial layout when there is no previously stored layout state -- the methods `configure(app: FrontendApplication)` and `onStart(app: FrontendApplication)` can be used instead.
As these methods are invoked even before the application shell is attached or menus are initialized, you may want to use those in combination with the frontend application state service, depending on your:

``` typescript
@injectable()
export class MyViewContribution extends AbstractViewContribution<MyViewWidget> implements FrontendApplicationContribution {
   …
   @inject(FrontendApplicationStateService)
   protected readonly stateService: FrontendApplicationStateService;
   …
   async onStart(app: FrontendApplication): Promise<void> {
       this.stateService.reachedState('ready').then(
           () => this.openView({ reveal: true })
       );
   }
}
```

Another typical use case for frontend application contributions is to install listeners, e.g. to react to changes of preferences, or to add custom widgets to the application shell in the `configure(app: FrontendApplication)` and `onStart(app: FrontendApplication)` respectively.
