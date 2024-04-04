---
title: Breadcrumbs
---

# Breadcrumbs

If enabled via the preferences, Theia can show a navigation bar, often referred to as *breadcrumbs*, above the content of widgets that are located in the main area of the workbench.
This interactive navigation bar indicates the location of the widget's content in the context of an overall structure, such as the filesystem.
By default, Theia shows breadcrumbs for the location of files in the filesystem when a file is opened in the text editors.

<img src="../../breadcrumbs.png" alt="A screenshot of breadcrumbs in Theia" style="max-width: 525px">

However, Theia's breadcrumbs mechanism can also be used for any custom widget, too.
Moreover, Theia allows showing a widget's content location in an arbitrary custom logical structure, such as a custom project structure.
On this page, we describe how custom breadcrumbs work and how widgets declare their location within an overall structure.

## Breadcrumbs Contributions and Navigatable Widgets

What is being shown in the breadcrumbs of a widget is defined by breadcrumbs contributions.
Such contributions must implement the `BreadcrumbsContribution` interface and return an array of `Breadcrumbs` for a specific URI, which are then shown for any widget that specifies this URI as their content's location.
A widget declares the location of its content in the form of a URI by implementing the interface `NavigatableWidget`.

So let's look at an example widget that declares an arbitrary URI.

```typescript
@injectable()
export class CustomWidget extends ReactWidget implements NavigatableWidget {
    // ...
    getResourceUri(): URI | undefined {
        return new URI('resource://project-a/component-b/config-c');
    }
}
```

When this `CustomWidget` is opened, Theia will look for breadcrumbs contributions that return breadcrumbs for this URI.
By default, it won't find any and thus won't show any breadcrumbs.
So let's add a breadcrumbs contribution that reacts to URIs with the scheme `resource` as used by our widget above.

```typescript
export default new ContainerModule(bind => {
    bind(CustomBreadcrumbsContribution).toSelf().inSingletonScope();
    bind(BreadcrumbsContribution).toService(CustomBreadcrumbsContribution);
});

@injectable()
export class CustomBreadcrumbsContribution implements BreadcrumbsContribution {
    type: symbol = CustomBreadcrumbType;
    priority: number = 100;

    protected readonly onDidChangeBreadcrumbsEmitter = new Emitter<URI>();
    get onDidChangeBreadcrumbs(): Event<URI> {
        return this.onDidChangeBreadcrumbsEmitter.event;
    }

    computeBreadcrumbs(uri: URI): MaybePromise<Breadcrumb[]> {
        if (uri.scheme !== 'resource') {
            return [];
        }
        // uri is 'resources://project-a/component-b/config-c' for our widget above
        // but let's just hard code breadcrumbs as an example for the sake of simplicity
        return [
            {
                id: 'project',
                label: 'Project A',
                longLabel: 'The project',
                iconClass: 'codicon codicon-folder default-folder-icon file-icon',
                type: CustomBreadcrumbType
            },
            {
                id: 'component',
                label: 'Component B',
                longLabel: 'A component within a project',
                iconClass: 'codicon codicon-file default-file-icon file-icon',
                type: CustomBreadcrumbType
            },
            {
                id: 'config',
                label: 'Configuration C',
                longLabel: 'A configuration within a component',
                iconClass: 'markdown-icon medium-blue theia-file-icons-js file-icon',
                type: CustomBreadcrumbType
            }
        ];
    }

    // ...
}
```

Once the breadcrumbs contribution is registered, Theia will show the following for our custom widget.

<img src="../../breadcrumbs-custom.png" alt="A screenshot of custom breadcrumbs in Theia" style="max-width: 525px">

## Interactive Breadcrumbs

Breadcrumbs contributions also must implement the method `attachPopupContent`.
Theia invokes this method as soon as a user clicks on one of the breadcrumbs and passes a parent HTML element into which the breadcrumbs contribution can now add arbitrary HTML content, including trees, buttons, etc.
This content is consequently being shown as a popup below the clicked breadcrumbs element.
If this method returns a `Disposable`, Theia will call it, once the popup is closed, allowing to dispose resources that may have been allocated for the rendered content.

As an example, let's just return add some simple HTML to the popup, as shown below.

```typescript
@injectable()
export class CustomBreadcrumbsContribution implements BreadcrumbsContribution {
    // ...
    attachPopupContent(breadcrumb: Breadcrumb, parent: HTMLElement): Promise<Disposable | undefined> {
        parent.innerHTML = '<div style="margin-left: 10px"><h3>'
                            + breadcrumb.label
                            + '</h3><p>We can show arbitrary content here and react to clicks.</p></div>';
        return Promise.resolve(undefined);
    }
}
```

<img src="../../breadcrumbs-popup.png" alt="A screenshot of custom breadcrumbs with a popup in Theia" style="max-width: 525px">

## Priority of Breadcrumbs Contributions

As defined by the `BreadcrumbsContribution` interface, a contribution must define a `priority`.
The property is used by Theia to properly order the breadcrumbs returned by all breadcrumbs contributions.
Thus, if you have for instance three breadcrumbs contributions that return a non-empty array of breadcrumbs for a particular URI, we'll end up with a final breadcrumbs list that contains all breadcrumbs of all three contributions ordered from lowest to highest priority.
The Theia text editor uses this mechanism to append logical structures of code to a source file, for instance.
Contributions that return an empty array for a specific URI are obviously ignored.

```text
Contribution A with a priority of 10 returns [a, b]
Contribution B with a priority of 20 returns [c, d]
Contribution C with a priority of 30 returns [e, f]
=> [a, b, c, d, e, f]
```

## File URIs

Theia's filesystem extension registers a breadcrumbs contribution that returns breadcrumbs according to the directory hierarchy for any file URI, such as `file://home/user/a/b/c.txt`.
The breadcrumbs returned by that contribution are also interactive by showing a file tree on click for navigating to adjacent files.

You can also make use of the filesystem breadcrumbs in custom widgets by just returning file URIs in your implementation of `NavigatableWidget#getResourceUri()`.
If needed, you can also register additional breadcrumbs contributions with a high number as priority to append to the file URI shown in the breadcrumbs, such as for navigating to specific sections in your custom widget.

Accordingly, however, if you want to avoid showing filesystem breadcrumbs altogether and only use custom breadcrumbs, your widget must return a URI that isn't a file URI, for instance `resource://a/b/c`.
