---
title: Enhanced Tab Bar Preview
---

# Enhanced Tab Bar Preview

To get a better overview of the widget a tab opens Theia provides functionality for enhanced tab bar preview. With this the user will be presented more information when hovering on a tab.
Since most widgets, containing a lot of information (editors for example), are opened in the main area of Theia the enhanced preview is applied to horizontal tab bars only.

## Setting to enable this feature

In order to not break the default hover behavior of Theia this feature is enabled by a preference (`window.tabbar.enhancedPreview`).

<img src="/enhanced-preview-setting.png" alt="A screenshot of the window.tabbar.enhancedPreview setting in Theia" style="max-width: 525px">

After enabling the function the preview will look like this:

<img src="/enhanced-preview.png" alt="A screenshot of the enhanced preview in Theia" style="max-width: 525px">

Note that the values are taken from the widget itself, meaning they can be easily customized. For more information about this take a look [here](#specify-caption-and-label-for-a-widget).

## Adjusting the styling of the preview

### Styling of the outer element

Adjusting the styling of the hover box (already provided by Theia) can be easily done via CSS.
If all hovers should be styled (including ones that are unaffected by the `window.tabbar.enhancedPreview` setting) the `.theia-hover` CSS class can be adjusted.
To only change the styling of the tab bars affected by the `window.tabbar.enhancedPreview` setting (horizontal ones) the `.theia-hover.extended-tab-preview` CSS class can be adjusted instead.
By default the enhanced preview for horizontal tab bars has rounded corners. This is simply achieved by adding a `border-radius` to the `.theia-hover.extended-tab-preview` CSS class:

```css
.theia-hover.extended-tab-preview {
    border-radius: 10px;
}
```

### Styling of the content element

To style the elements inside of the preview, class names are assigned to the different components.
Those are:

- `.theia-horizontal-tabBar-hover-div` (for the outer box)
- `.theia-horizontal-tabBar-hover-title` (for the title)
- `.theia-horizontal-tabBar-hover-caption` (for the caption).

If, for example, the preview should be a fixed size. This can achieved by adding a `width` to the `.theia-horizontal-tabBar-hover-div` and a `max-width` to the other two rules.
To then also ensure the text is not going over the boxes boundaries, `word-wrap: break-word` can be added to the latter two rules.

```css
.theia-horizontal-tabBar-hover-div {
  margin: 0px 4px;
  width: 100px;
}

.theia-horizontal-tabBar-hover-title {
  font-weight: bolder;
  font-size: medium;
  margin: 0px 0px;
  max-width: 100px;
  word-wrap: break-word
}

.theia-horizontal-tabBar-hover-caption {
  font-size: small;
  margin: 0px 0px;
  margin-top: 4px;
  max-width: 100px;
  word-wrap: break-word
}
```

After those rules are applied the preview will look like this:

<img src="/enhanced-preview-custom.png" alt="A screenshot of the customized enhanced preview in Theia" style="max-width: 525px">

### Changing the content element

To change the content that is being rendered inside of the preview the `TabBarRenderer` can be extended and a overwritten `renderExtendedTabBarPreview` method can be provided.
If, for example, the preview should only render the caption, the following `CustomTabBarRenderer` could be created:

```ts
export class CustomTabBarRenderer extends TabBarRenderer {
    protected override renderExtendedTabBarPreview = (title: Title<Widget>) => {
        const hoverBox = document.createElement('div');
        hoverBox.classList.add('theia-horizontal-tabBar-hover-div');
        const labelElement = document.createElement('p');
        labelElement.classList.add('theia-horizontal-tabBar-hover-title');
        labelElement.textContent = title.label;
        hoverBox.append(labelElement);
        return hoverBox;
    };
}
```

Now only the `TabBarRendererFactory` has to be bound and the preview will render the way it was specified above.

```ts
    bind(TabBarRendererFactory).toFactory(({ container }) => () => {
        const contextMenuRenderer = container.get(ContextMenuRenderer);
        const tabBarDecoratorService = container.get(TabBarDecoratorService);
        const iconThemeService = container.get(IconThemeService);
        const selectionService = container.get(SelectionService);
        const commandService = container.get<CommandService>(CommandService);
        const corePreferences = container.get<CorePreferences>(CorePreferences);
        const hoverService = container.get(HoverService);
        return new CustomTabBarRenderer(contextMenuRenderer, tabBarDecoratorService, iconThemeService, selectionService, commandService, corePreferences, hoverService);
    });
```

## Specify caption and label for a widget

When the `window.tabbar.enhancedPreview` setting is enabled, the user is displayed, on hovering the tab, with the name (label) and some additional information (caption) about the tab.
These values can be provided by the widget:

```ts
    @postConstruct()
    protected async init(): Promise<void> {
        this.id = GettingStartedWidget.ID;
        this.title.label = GettingStartedWidget.LABEL;
        this.title.caption = 'Home > Theia > Getting Started';
        this.title.closable = true;
```

The provided values will be rendered by the enhanced preview.
