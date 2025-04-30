---
title: Tree Widget
---

# The Tree Widget

Interacting with hierarchical content is an integral part of many applications. Tree UIs are a common aspect of many user interfaces. In Theia, the `@theia/core` module provides `TreeWidget`, a common implementation of tree UIs in Theia, which can be customized in many ways to let the user work with hierarchical content. This article provides an overview of `TreeWidget`, its related classes and features, and how to implement and customize them.

Note: The code snippets shown below are part of the full example available via the [Theia Extension Generator](https://github.com/eclipse-theia/generator-theia-extension/blob/master/README.md). To get started and play with the example code, generate the `TreeWidget View` example using the generator.

## Basic Building Blocks

To create a basic `TreeWidget`, we need to implement:

* the actual widget - a subclass of `TreeWidget`
* a model - a subclass of `TreeModelImpl`
* one or more tree node interfaces (extending `TreeNode` or its sub-interfaces)
* a label provider contribution - a subclass of `LabelProviderContribution`
* the view contribution - a subclass of `AbstractViewContribution`, as is usual for all widgets/views
* the widget factory, which is realized using an inversify child container

All of these are explained below in more detail. For demonstration purposes, we will create a `TreeviewExampleWidget` with some demo contents.

### The `TreeWidget` widget

The `TreeWidget` is a specialized `ReactWidget` that already implements all of the logic required to render trees and let the user interact with them. So in its simplest form, we need to just implement the constructor to initialize the id, title, and caption
of our view:

```typescript
@injectable()
export class TreeViewExampleWidget extends TreeWidget {
    static readonly ID = 'theia-examples:treeview-example-view';
    static readonly LABEL = 'Example Tree View';

    constructor(
        @inject(TreeProps) public readonly props: TreeProps,
        @inject(TreeModel) public readonly model: TreeViewExampleModel,
        @inject(ContextMenuRenderer) contextMenuRenderer: ContextMenuRenderer
    ) {
        super(props, model, contextMenuRenderer);

        this.id = TreeViewExampleWidget.ID;
        this.title.label = TreeViewExampleWidget.LABEL;
        this.title.caption = TreeViewExampleWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-smile-o';
    }
}
```

As can be seen, the constructor has three injected arguments that are passed to the `super` constructor.

`TreeProps` defines some basic configuration properties for the widget. We will see [below](#further-configuration-options) how we can use these to activate certain features of the `TreeWidget`.

`ContextMenuRenderer` will be used to render the context menu (see also [below](#providing-commands-using-a-context-menu)).

`TreeModel` is the only implementation we need to customize right now to get the first basic example running.

### Data Model, Tree Model, and Tree Nodes

Internally, the tree's state is maintained by two classes: `TreeModel` and `Tree`, where `Tree` is injected
into the `tree` property of `TreeModel`.

The responsibility of `Tree` is to manage the single tree nodes, and their UI-related states and events, whereas the `TreeModel` is responsible for initializing the tree and synchronizing its state with the underlying _business model_.

For our simple example, we implement the business model simply as:

```typescript
export interface Item {
    name: string;
    children?: Item[]; // only for category/container nodes
    quantity?: number; // only for concrete items
    backOrdered?: boolean; // will be used for a later feature
}

const EXAMPLE_DATA: Item[] = [{
    name: 'Fruits',
    children: [
        {
            name: 'Apples',
            children: [{ name: 'Golden Delicious', quantity: 4 },
            ... 
        },
        ...
    ]
}, 
...
];
```

This business model needs to be mapped to a hierarchy of tree nodes. These are objects that satisfy  the `TreeNode` interface, which primarily provides the `id` and `parent` properties. Each node in the tree is required to have an `id` that is unique within the tree _(Note: expect strange effects if your `id`s are not unique!)._ The `parent` property can be `undefined` initially, and will be managed by utiltiy functions within the `CompoiteTreeNode` namespace, which are described below.

Since the `TreeNode` interface lacks a `children` property, it is only suitable for leaves in the tree. For container nodes, we need to use the interface `CompositeTreeNode` instead.

But still, neither `TreeNode`, not `CompositeTreeNode` provide any way to reference our own data. To address this, it is common practice to define custom sub-interfaces for the tree nodes.

Let us provide these sub-interfaces along with type-checking functions:

```typescript
export interface ExampleTreeNode extends CompositeTreeNode {
    data: Item;
    type: 'node';
}
export namespace ExampleTreeNode {
    export function is(candidate: object): candidate is ExampleTreeNode {
        return CompositeTreeNode.is(candidate) && 'type' in candidate && candidate.type === 'node';
    }
}

export interface ExampleTreeLeaf extends TreeNode {
    data: Item;
    type: 'leaf';
}
export namespace ExampleTreeLeaf {
    export function is(candidate: object): candidate is ExampleTreeLeaf {
        return TreeNode.is(candidate) && 'type' in candidate && candidate.type === 'leaf';
    }
}
```

Additionally, let's create a factory that is able to create tree nodes from business model objects:

```typescript
@injectable()
export class TreeViewExampleTreeItemFactory {
    private readonly idCounter = new Map<string, number>();

    public toTreeNode(item: Item): ExampleTreeNode | ExampleTreeLeaf {
        if (item.children) {
            return <ExampleTreeNode>{
                id: this.toTreeNodeId(item),
                data: item,
                children: [],
                parent: undefined,
                type: 'node'
            };
        } else {
            return <ExampleTreeLeaf>{
                id: this.toTreeNodeId(item),
                data: item,
                parent: undefined,
                type: 'leaf',
            };
        }
    }

    private toTreeNodeId(item: Item): string {
        const key = item.name;
        let count: number;
        if (this.idCounter.has(key)) {
            count = this.idCounter.get(key)!;
        }
        else {
            count = 0;
        }

        this.idCounter.set(key, count + 1);
        return `${key}-${count}`;
    }
}
````

As noted above, the `id` property must be unique within a tree. If a unique _ID_ is present within
the business model (for example, because the business model is kept an a database), then we could
just reuse that. But in our example, there is no such _ID_ which is why we calculate one based on a
name-to-counter map in the `toTreeNodeId()` method.

Now, that we have created the necessary parts, we can implement the tree model as follows:

```typescript
export const ROOT_NODE_ID = 'treeview-example-root';

@injectable()
export class TreeViewExampleModel extends TreeModelImpl {
    @inject(TreeViewExampleTreeItemFactory) private readonly itemFactory: TreeViewExampleTreeItemFactory;

    @postConstruct()
    protected init(): void {
        super.init();
        
        const root: CompositeTreeNode = {
            id: ROOT_NODE_ID,
            parent: undefined,
            children: [],
            visible: false
        }

        this.initChildren(root, EXAMPLE_DATA);
        this.tree.root = root;
    }

    private initChildren(parent: CompositeTreeNode, items: Item[]): void {
        items.forEach(item => {
            const node = this.itemFactory.toTreeNode(item);
            CompositeTreeNode.addChild(parent, node);
            if (item.children && ExampleTreeNode.is(node)) {
                this.initChildren(node, item.children);
            }
        });
    }
}
```

In this example, we initialize the tree in the `init()` method when the class is instantiated. This is not necessarily required, but it is the simplest way for our static model. In more complex scenarios, we could also call a concrete `initModel()` method from the Tree Widget implementation, for example, in the `onAfterAttach()` event handler, or we could implement the initialization asynchonously.

To initialize the tree model, we first create the root node. This is a simple `CompositeTreeNode` with a well-known `id`, so we can identify it later. Note that we initialze `children` as `[]` since tree nodes should always be added via `CompositeTreeNode.addChild()`. This function takes care of maintaining both the `parent` and `children` properties of the affected nodes.

Next, we initialize the children recursively in `initChildren()`, so that the complete tree model is populated.

In the last step, we assign the root node to `this.tree.root`. Note that the call order matters here, because setting the root node will cause the tree-internal id-lookup map to be initialized with the root node and all its (current) children. If we assigned the root before adding its children, the id-lookup map would be incomplete, potentially breaking some tree operations.

### Label Provider

If we have a look at the `TreeNode` implementation, it becomes clear that there is no `label` property. So, how does the `TreeWidget` know how to render the text associated to the single nodes? The answer is: by consulting the `LabelProvider`, which is explained in detail [here](/docs/label_provider/).

For our simple example, we implement only the `getName()` method as follows:

```typescript
@injectable()
export class TreeViewExampleLabelProvider implements LabelProviderContribution {
    canHandle(element: object): number {
        if ((ExampleTreeNode.is(element) || ExampleTreeLeaf.is(element))) {
            return 100;
        }
        return 0;
    }

    getName(element: object): string | undefined {
        if ((ExampleTreeNode.is(element) || ExampleTreeLeaf.is(element))) {
            return element.data.name;
        }
        return undefined;
    }
}
```

### Putting it all Together

To put everything together we need to create a `ViewContribution` and register our bindings in the frontend module. The `ViewContribution` is explained in detail in its [own section](/docs/widgets/#widget-contribution) and can be implemented straightforward. The registration of the _widget factory_, on the other hand needs a bit of explanation.

As we have seen above, a tree consists of several associated classes that collaborate in order to provide the logic and features behind the tree. But since we usually have multiple `TreeWidget` implementations within our application (File Explorer, Outline, ...), a simple binding would not work. This _could_ be solved using named bindings and injections, but would require subclassing all the participating classes to get the named bindings at the respective locations. Therefore, the Theia framework uses a different approach by using an inversify child container which encapsulates all bindings relevant to the `TreeWidget` locally. To simplify the creation of this child container, the framework provides the function `createTreeContainer()` which creates such a child container with default settings that can be overridden one by one to customize only those parts of the concrete `TreeWidget` that need to be customized.

With this, the frontend module can be implemented as:

```typescript
export default new ContainerModule(bind => {
    bindViewContribution(bind, TreeviewExampleViewContribution);
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: TreeViewExampleWidget.ID,
        createWidget: () => createTreeViewExampleViewContainer(ctx.container)
            .get<TreeViewExampleWidget>(TreeViewExampleWidget)
    })).inSingletonScope();
    bind(TreeViewExampleModel).toSelf().inSingletonScope();
    bind(LabelProviderContribution).to(TreeViewExampleLabelProvider);
});

function createTreeViewExampleViewContainer(parent: interfaces.Container): Container {
    const child = createTreeContainer(parent, {
        model: TreeViewExampleModel,
        widget: TreeViewExampleWidget,
    });
    child.bind(TreeViewExampleTreeItemFactory).toSelf().inSingletonScope();
    return child;
}
```

In the next sections, we will see how we can build upon this very simple `TreeWidget` implementation and add various features and customizations.

## Expansion and Lazy Child Node Resolution

If we run the simple `TreeWidget` example, we will see a tree widget that works, but does not resemble the trees we are used to, because it is not possible to collapse or expand the tree nodes. The tree in our example is completely static and all nodes are initialized beforehand. Let us change this and make the nodes collapsible and expandable.

### Expandable/Collapsible Tree Nodes

The management of expandable/collapsible tree nodes is already built into the framework. The only thing we need to change is to make our `ExampleTreeNode` interface conform to `ExpandableTreeNode` instead of `CompositeTreeNode` and initialize the `expanded` property to `false` in the `TreeViewExampleTreeItemFactory` class.

### Lazy Child Resolution

Usually, we don't want to initialize the complete tree upfront. Instead, only the visible items, namely the children of the root node, should be initialized. All the other children should be initialized when they are needed, which is essentially when their containing parent node is expanded.

So, in the `TreeViewExampleModel.init()` method, we change the initialization to

```typescript
        ...
        EXAMPLE_DATA.map(item => this.itemFactory.toTreeNode(item))
            .forEach(node => CompositeTreeNode.addChild(root, node));
        this.tree.root = root;
````

and implement the dynamic resolution of child nodes by subclassing `TreeImpl`:

```typescript
export class TreeviewExampleTree extends TreeImpl {
    @inject(TreeViewExampleTreeItemFactory) private readonly itemFactory: TreeViewExampleTreeItemFactory;

    override async resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]> {
        // root children are initialized once and never change
        if (parent.id === ROOT_NODE_ID) {
            return [...parent.children];
        }

        // non-container classes do not have children
        if (!ExampleTreeNode.is(parent)) {
            return [];
        }

        // (optional) caching: if the children are resolved and no child was added/removed, reuse 
        if (parent.children.length === parent.data.children?.length) {
            return [...parent.children];
        }

        // simulate asynchronous loading of children
        await wait(2000);
        return (parent.data.children ?? []).map(i => this.itemFactory.toTreeNode(i));        
    }
}
```

Under the hood, the tree expansion is handled by the `TreeExpansionServiceImpl` implementation which maintains the `expanded` state of `ExpandableTreeNode`, sends events related to expanding and collapsing subtrees, and also calls `Tree.refresh()` for the expanded node. The `refresh()` method in turn calls `resolveChildren()` which can be implemented to asyncronously provide the child nodes for the given parent. As a bonus, `Tree.refresh()` marks the node as `busy` until the promise is resolved, leading to a nice busy marker in the form of a spinning circle if the promise is not resolved within a certain amount of time (800ms). This can be observed in this demo code due to the `wait(2000)` call.

## Tree Items with Checkboxes

The `TreeWidget` framework also supports presenting and maintaining checkboxes for tree items. Adding checkboxes is as simple as initializing the `checkboxInfo` property for the tree nodes in the `TreeViewExampleTreeItemFactory` class:

```typescript
    return <ExampleTreeLeaf>{
        id: this.toTreeNodeId(item),
        ...
        checkboxInfo: { checked: item.backOrdered }
    };
```

To react to the user checking/unchecking a checkbox, for example, to update the underlying model, we can override the `TreeModel.markAsChecked()` method and provide our own implementation before calling `super`:

```typescript
    override markAsChecked(node: TreeNode, checked: boolean): void {
        if (ExampleTreeLeaf.is(node)) {
            node.data.backOrdered = checked;
        }
        super.markAsChecked(node, checked);
    }
```

> **Note:** At the moment (Theia 1.60.x), there is an issue with the UI in which the
checkbox state is not properly reflected after the user clicks it.
See [this GitHub issue](https://github.com/eclipse-theia/theia/issues/15521) for details.

## Visual Customizations

This section explores various ways to customize the appearance of tree nodes.

### Rendering `LabelProvider` Icons

As discussed in the [section about LabelProviders](/docs/label_provider/), a `LabelProvider` can also provide an icon. The easiest way to do this is to return a `string` denoting a [FontAwesome](https://fontawesome.com/v4/icons/) Icon (without the `fa-` prefix) as in this example:

```typescript
    getIcon(element: object): string | undefined {
        if (ExampleTreeNode.is(element)) {
            return 'folder';
        }
        if (ExampleTreeLeaf.is(element)) {
            return 'smile-o';
        }
        return undefined;
    }
```

For some reason, however, the default `TreeWidget` implementation contains only an empty implementation for `renderIcon()`. Consequently, the icon is not rendered, unless we override this method with this implementation:

```typescript
import * as React from '@theia/core/shared/react';

export class TreeViewExampleWidget extends TreeWidget {
    [...]

    protected override renderIcon(node: TreeNode, props: NodeProps): React.ReactNode {
        const icon = this.getIconClass(this.toNodeIcon(node));
        if (icon) {
            return <div className={`${icon}`}></div>;
        }
        return super.renderIcon(node, props);
    }
}
```

In this code, the `this.toNodeIcon()` call takes care of adding the necessary `fa` class and `fa-` prefix to the icon returned by the `LabelProvider`.

### Customizing Style

If we run the example with the icon rendering code from the previous section, we notice that the spacing is not very nice. We could fix this by adding explicit inline styling to the `div` element, but for demonstration purposes, let's use a custom CSS class for the tree nodes, and an imported CSS file instead.

The `TreeWidget` base class determines the CSS classes for its nodes in the `createNodeClassNames()` method. We can override this to append our own CSS class to all nodes (or only some nodes based on some conditional logic, if that was necessary):

```typescript
protected override createNodeClassNames(node: TreeNode, props: NodeProps): string[] {
    return super.createNodeClassNames(node, props).concat('theia-example-tree-node');
}
```

To provide our styles, we import a CSS file:

```typescript
import '../../src/browser/styles/treeview-example-widget.css';
```

with the contents:

```css
.theia-example-tree-node .a {
    padding-right: 4px
}
```

### Decorations

If you are familiar with the classic _Eclipse Rich Client Platform_, you might be already aware of the concept of _decorations_. A _decoration_ is an addition or visual modification to a tree item that can take the form of a prefix or suffix text, font or color modification, or an overlay icon (for example, to add a small green check mark in one of the corners of the node's main icon).

Compared to the explicit styling approach described earlier, decorations offer cleaner syntax and better decoupling from the `TreeWidget`.

In Theia, any widget that wants to allow for decorations is expected to register its own _Contribution Point_ to which one or more decorators can be contributed (even by other Theia Extensions). More on _Contribution Points_ can be found in [this section](/docs/services_and_contributions/#defining-contribution-points).

So, the concrete steps to implement the decorator feature for a `TreeWidget` is to subclass the `AbstractTreeDecoratorService` and customize it with its own Contribution Point name:

```typescript
export const TreeviewExampleDecorator = Symbol('TreeviewExampleDecorator');

@injectable()
export class TreeviewExampleDecorationService extends AbstractTreeDecoratorService {
    constructor(@inject(ContributionProvider) @named(TreeviewExampleDecorator) protected readonly contributions: ContributionProvider<TreeDecorator>) {
        super(contributions.getContributions());
    }
}
```

Next, we contribute to this Contribution Point by implementing the `TreeDecorator` interface:

```typescript
@injectable()
export class TreeviewExampleDemoDecorator implements TreeDecorator {
    // providing a unique ID (required by the interface)
    id = 'TreeviewExampleDecorator';

    // providing an event emitter for decoration changes (required by the interface)
    protected readonly emitter = new Emitter<(tree: Tree) => Map<string, WidgetDecoration.Data>>();
    get onDidChangeDecorations(): Event<(tree: Tree) => Map<string, WidgetDecoration.Data>> {
        return this.emitter.event;
    }

    // implementation of the actual decoration
    decorations(tree: Tree): MaybePromise<Map<string, WidgetDecoration.Data>> {
        const result = new Map();

        if (tree.root === undefined) {
            return result;
        }
        for (const treeNode of new DepthFirstTreeIterator(tree.root)) {
            if (ExampleTreeLeaf.is(treeNode)) {
                const amount = treeNode.data.quantity || 0;
                if (amount > 4) {
                    result.set(treeNode.id, <WidgetDecoration.Data>{
                        iconOverlay: {
                            position: WidgetDecoration.IconOverlayPosition.BOTTOM_RIGHT,
                            iconClass: ['fa', 'fa-check-circle'],
                            color: 'green'
                        }
                    });
                } else {
                    result.set(treeNode.id, <WidgetDecoration.Data>{
                        backgroundColor: 'red',
                        captionSuffixes: [{ 
                            data: 'Warning: low stock', 
                            fontData: { style: 'italic' } }]
                    });
                }
            }
        }
        return result;
    }
}
```

As we can see from this implementation, the framework calls the `decorations()` method with the root node of the tree to decorate. We can make use of one of the provided iterator classes `DepthFirstTreeIterator`, `BreadthFirstTreeIterator`, `TopDownTreeIterator`, or `BottomUpTreeIterator`, or traverse the tree using our own iteration logic. To add a decoration to a `TreeNode` we just add the `WidgetDecoration.Data` to the resulting map with the node id as key.

> **Note:** This example doesn’t show it, but decorations can be computed asynchronously (by returning a `Promise<Map>`), and they can be updated dynamically using the `onDidChangeDecorations()` event emitter.

## Actions

In many cases, users want to trigger actions from tree items. The framework offers two main ways to implement these actions: double-clicking on a tree node (called _open_) and providing commands via a context menu. We will discuss both in the next sections.

### Opening a Tree Item

The _open_ action is invoked by double-clicking on a tree item. The `TreeWidget` framework provides an event for this for which a listener/handler can be registered. To do this, we enhance the constructor of our `TreeWidget` implementation:

```typescript
export class TreeViewExampleWidget extends TreeWidget {
    @inject(MessageService) private readonly messageService: MessageService;

    constructor(...) {
        [...]

        this.toDispose.push(this.model.onOpenNode((node: TreeNode) => {
            if (ExampleTreeLeaf.is(node) || ExampleTreeNode.is(node)) {
                this.messageService.info(`Example node ${node.data.name} was opened.`);
            }
        }));
    }
}
```

(Note: alternatively, we could have also overridden the `TreeModel.doOpenNode` method to react to the open action).

### Providing Commands Using a Context-Menu

In the `TreeWidget` framework, support for a defining a context menu is, once again, built in already. As only preconditions, a context menu path needs to be defined and configured, and the tree items for which a context menu should be available, need to be _selectable_.

The context menu path is configured in `TreeProps` object that is bound in the inversify child container containing all the bindings for our `TreeWidget`:

```typescript
export const TREEVIEW_EXAMPLE_CONTEXT_MENU: MenuPath = ['theia-examples:treeview-example-context-menu'];

function createTreeViewExampleViewContainer(parent: interfaces.Container): Container {
    return createTreeContainer(parent, {
        [...]
        props: {
            contextMenuPath: TREEVIEW_EXAMPLE_CONTEXT_MENU
        }
    });
}
```

Making the tree items selectable works similar to making them expandable and collapsible (see [above](#expandablecollapsible-tree-nodes)): we just need to add the `SelectableTreeNode` interface to our tree node interfaces and in the `TreeViewExampleTreeItemFactory` code that initializes the tree nodes, we initialize the
`selected` property to `false`.

After these preconditions have been met, we can implement a command and menu contribution as usual. This is already described in detail [here](/docs/commands_keybindings/).

```typescript
    commands.registerCommand(TreeviewExampleTreeAddItem, {
        execute: () => {
            const widget = this.tryGetWidget();
            if (widget) {
                const parent = widget.model.selectedNodes[0];
                if (parent) {
                    widget.addItem(parent);
                }
            }
        },
        isVisible: () => {
            const widget = this.tryGetWidget();
            return !!(widget && widget.model.selectedNodes.length > 0 
                && ExampleTreeNode.is(widget.model.selectedNodes[0]));
        }
    });

    [...]

    menus.registerMenuAction([...TREEVIEW_EXAMPLE_CONTEXT_MENU, '_1'], {
        commandId: TreeviewExampleTreeAddItem.id,
        label: 'Add Child'
    });
```

In this code, we call a new method `TreeViewExampleModel.addItem()`. The implementation in the model looks like this:

```typescript
    public addItem(parent: TreeNode) {
        if (ExampleTreeNode.is(parent)) {
            const newItem: Item = { name: 'Watermelon', quantity: 4 };
            parent.data.children?.push(newItem);
            this.tree.refresh(parent);            
        }
    }
```

This also demonstrates how to apply structural modifications to the tree: We modify the underlying model (in this case, `parent.data`) and then refresh the affected node. This will cause the children to be re-resolved (using our previous implementation [here](#lazy-child-resolution)) and the tree is updated accordingly.

## Supporting Drag & Drop

One feature that is, at least currently, not implemented in the `TreeWidget` base class, is Drag & Drop handling. But it is still possible to add it with a few lines of code.

Let's say we want to support moving a leaf node and attach it to a different containing node.
The code for this operation (again implemented in the `TreeViewExampleModel`) looks as follows:

```typescript
    public reparent(nodeIdToReparent: string, targetNode: ExampleTreeNode) {
        const nodeToReparent = this.tree.getNode(nodeIdToReparent);
        const sourceParent = nodeToReparent?.parent;
        if (nodeToReparent && ExampleTreeLeaf.is(nodeToReparent) 
                && sourceParent && ExampleTreeNode.is(sourceParent)) {
            const indexInCurrentParent = sourceParent.data.children!.indexOf(nodeToReparent.data);
            if (indexInCurrentParent !== -1) {
                sourceParent.data.children?.splice(indexInCurrentParent, 1);
                targetNode.data.children?.push(nodeToReparent.data);
                this.tree.refresh(sourceParent);
                this.tree.refresh(targetNode);
            }
        }
    }
```

First, we use the tree's internal id-to-node lookup to resolve the _id_ of the node we want to reparent to the actual node object. Then, we can retrieve its current parent.

Next, we remove the child from the underlying data model and add it to the new parent in the data model instead.

Finally, since we have modified both the source and target parent nodes, we refresh both of them to reflect the changes in the tree nodes and, consequently, in the UI.

The actual Drag & Drop handling is added by registering respective handler methods with the tree node HTML elements:

```typescript
    protected override createNodeAttributes(node: TreeNode, props: NodeProps): React.Attributes & React.HTMLAttributes<HTMLElement> {
        return {
            ...super.createNodeAttributes(node, props),
            ...this.getNodeDragHandlers(node)
        };
    }

    protected getNodeDragHandlers(node: TreeNode): React.Attributes & React.HtmlHTMLAttributes<HTMLElement> {
        return {
            onDragStart: event => this.handleDragStartEvent(node, event),
            onDragEnter: event => this.handleDragEnterEvent(node, event),
            onDragOver: event => this.handleDragOverEvent(node, event),
            onDragLeave: event => this.handleDragLeaveEvent(node, event),
            onDrop: event => this.handleDropEvent(node, event),
            draggable: ExampleTreeLeaf.is(node),
        };
    }
```

The `draggable` property controls whether dragging is actually possible. In our example, we only enable dragging for leaf nodes.

When starting a drag action, we need to store the data of the dragged item in a form that is recognizable to the drop target. Since we only support local Drag & Drop, we can just use an internal key and store the tree node identifier:

```typescript
    protected handleDragStartEvent(node: TreeNode, event: React.DragEvent): void {
        event.stopPropagation();
        if (event.dataTransfer) {
            event.dataTransfer.setData('tree-node', node.id);
        }
    }
```

The next event, hovering over a potential target item, is also rather simple: We just need to indicate that the drop action would be a _move_ action by setting `event.dataTransfer.dropEffect` accordingly.

But there is one caveat: If the user hovers over an _expandable_ item, they usually want the subtree to be expanded, so that they can navigate the tree while dragging. The built-in tree expansion feature does not handle this, so we must implement our own logic. And since the user could continue to drag and not hover over the expandable tree node long enough, we also need to support cancelling and disposing the corresponding timer. All of this is realized in the following implementation:

```typescript
    protected readonly toCancelNodeExpansion = new DisposableCollection();
    
    protected handleDragOverEvent(node: TreeNode | undefined, event: React.DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = 'move';

        // skip expansion if the expansion is already in progress
        if (!this.toCancelNodeExpansion.disposed) {
            return;
        }
        
        // else register a new deferred expansion
        const timer = setTimeout(() => {
            if (!!node && ExampleTreeNode.is(node) && !node.expanded) {
                this.model.expandNode(node);
            }
        }, 500);
        this.toCancelNodeExpansion.push(Disposable.create(() => clearTimeout(timer)));
    }
```

The next pair of events is `dragEnter` and `dragLeave`. (Note: _enter_ and _leave_ refer to the single tree node, not the tree widget). Upon entering or leaving a node, we want to cancel any pending deferred expansion timer scheduled in the `dragOver` event. Additionally, when we enter a tree node, we want to determine the correct target node and select it to highlight the drop target in the UI. This means that, if we drag onto a leaf node, the direct parent node would be the new containing node and thus, the drop target that should be highlighted:

```typescript
    protected handleDragEnterEvent(node: TreeNode | undefined, event: React.DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.toCancelNodeExpansion.dispose();

        let target = node;
        if (target && ExampleTreeLeaf.is(target)) {
            target = target.parent;
        }
    
        if (!!target && ExampleTreeNode.is(target) && !target.selected) {
            this.model.selectNode(target);
        }
    }

    protected handleDragLeaveEvent(node: TreeNode | undefined, event: React.DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.toCancelNodeExpansion.dispose();
    }
```

Finally, we need to implement the actual drop event handler:

```typescript
     protected async handleDropEvent(node: TreeNode | undefined, event: React.DragEvent): Promise<void> {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = 'move';

        let target = node;
        if (target && ExampleTreeLeaf.is(target)) {
            target = target.parent;
        }

        if (!!target && ExampleTreeNode.is(target)) {
            const draggedNodeId = event.dataTransfer.getData('tree-node');
            this.model.reparent(draggedNodeId, target);
        }
    }
```

As before, we determine the target node. Then we recall the dragged tree node id, and finally, we call the `reparent()` logic we have already implemented above.

## Further Configuration Options

This article has demonstrated various ways to customize and implement different aspects of the `TreeWidget`. For more options, it is advisable to have a look at the source code of `TreeWidgetImpl` and its injected services and collaborators, as well as `TreeProps` and  `TreeServices` which are used in the `createTreeContainer()` function.

For example, `TreeProps` offers several configuration options, including:

* `search` - to enable a search/filter feature for the tree (just focus on the tree and start typing a search string)
* `multiSelect` - to change the tree from single to multi-selection (using the usual CTRL and SHIFT modifier keys)
* `expandOnlyOnExpansionToggleClick` - to change the tree node expansion behavior, so that tree nodes are not expanded when they are selected, only when they are explicitly expanded
