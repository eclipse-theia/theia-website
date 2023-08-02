---
title: Commands/Menus/Keybindings
---

# Commands, Menus and Keybindings

Commands are runnable actions defined by an ID and the function to be executed (plus some optional parameters like a name or an icon). Commands can be triggered via the command palette, they can be bound to keybindings or menu items, and they can be called programmatically. The action that commands trigger can be context-sensitive, so that they can only be called under certain conditions (window focus, current selection etc.).

The following sections provide details about how to contribute commands, keybindings and menu items. The sections will describe how to connect the different contributions and how to use the corresponding services for managing these items.

If you are not yet familiar with contribution points in Theia or the use of dependency injection, please consider this guide on [Services and Contributions](https://theia-ide.org/docs/services_and_contributions/).

All the following code examples are from the [Theia extension generator](https://github.com/eclipse-theia/generator-theia-extension). You can get the same code set-up by installing the generator, selecting the “Hello World” example (see here) and choosing “helloworld” as the name.

## Contributing Commands

By contributing a command, you can add a custom action to Theia. A command can be triggered by the user via the command palette, a keybinding or a menu entry. It can also be called programmatically.

All commands of a Theia application are managed in the `CommandRegistry`. To contribute commands to the command registry, modules must implement the `CommandContribution` interface (see code example below).

A command is an object with an `id` and an optional, potentially user visible `label` (see HelloworldCommand in the example below). The command contribution receives the `CommandRegistry` in the `registerCommands` function as a parameter. The command can then be registered by calling `registerCommand` on this registry. Along with the command a callback needs to be provided which is executed whenever the command is triggered (`CommandHandler`). In the example, the command uses the MessageService to “say hello”.

**helloworld-contribution.ts**

```typescript
export const HelloworldCommand: Command = {
   id: 'Helloworld.command',
   label: "Say Hello"
};

@injectable()
export class HelloworldCommandContribution implements CommandContribution {

   constructor(
       @inject(MessageService) private readonly messageService: MessageService,
   ) { }

   registerCommands(registry: CommandRegistry): void {
       registry.registerCommand(HelloworldCommand, {
           execute: () => this.messageService.info('Hello World!')
       });
   }
}

```

To make the command execution context-sensitive, the `CommandHandler` can optionally implement `isEnabled` and `isVisible`. You can optionally register more than one `CommandHandler` and let the command execute one of them based on the current context. To register additional handlers for a command use the `registerHandler` function on the `CommandRegistry`
When a command is executed, the command registry checks all registered handlers. The first handler that returns true on `isEnabled` will be considered to be active, and it will be executed. Only one handler should be active (`isEnabled === true`) at the same time, though. `isVisible` controls the visibility of menu items and tool items that are connected to a command, as well as whether the command is shown in the command palette.  If the active handler returns true, the menu item will be visible and vice versa.
Finally, by implementing `isToggle` a handler can optionally specify, whether menu items connected to the commands should be toggled on or off.

### Binding the contribution to CommandContribution

To make our `CommandContribution` accessible to Theia, we need to bind the custom `HelloworldCommandContribution` to the respective contribution symbol `CommandContribution`. This is done in the `helloworld-frontend-module`, for more details see [Services and Contributions](https://theia-ide.org/docs/services_and_contributions/).

**helloworld-frontend-module.ts**

```typescript
export default new ContainerModule(bind => {
   // add your contribution bindings here
   bind(CommandContribution).to(HelloworldCommandContribution);
...
});
```

The `CommandRegistry` used to register our contributed command above, also provides an API to interact with commands. As an example, you can programmatically execute commands, you can browse through all registered commands or you can access a list of recently executed commands. Please refer to the [TypeDoc for the CommandRegistry](https://eclipse-theia.github.io/theia/docs/next/classes/core.commandregistry-1.html) for more details. To use the `CommandRegistry` outside of a contribution, you can access it via dependency injection.

In the following sections, we describe how to bind commands to menu items and keybindings.

## Contributing Menu Items

Theia allows you to contribute menu items that will be displayed in specific menus within your Theia application. Menu items are bound to commands and therefore allow the user to trigger actions (please see the section about commands above).

All the following code examples are from the [Theia extension generator](https://github.com/eclipse-theia/generator-theia-extension). You can get the same code set-up by installing the generator, selecting the “Hello World” example (see [here](https://github.com/eclipse-theia/generator-theia-extension)) and choosing “helloworld” as the name.

All menu items of a Theia application are managed in the `MenuModelRegistry`. To contribute menu items to the registry, modules must implement the ´MenuContribution´ interface (see code example below).

The registration of the command can be done in the function `registerMenus`, which will be called by the Theia framework. The function provides the `MenuModelRegistry` as a parameter. On this registry we can call `registerMenuAction`. It expects a `MenuPath` and a `MenuAction`. The `MenuPath` specifies the menu (and submenu) to place the menu item into. Please see [here for the paths of some common menus](https://eclipse-theia.github.io/theia/docs/next/modules/core.CommonMenus-1.html).

The `MenuAction` consists of a command id, specifying which command to trigger, and an optional label, specifying the label of the menu item.

**helloworld-contribution.ts**

```typescript
@injectable()
export class HelloworldMenuContribution implements MenuContribution {

   registerMenus(menus: MenuModelRegistry): void {
       menus.registerMenuAction(CommonMenus.EDIT_FIND, {
           commandId: HelloworldCommand.id,
           label: HelloworldCommand.label
       });
   }
}
```

To make our `MenuContribution` accessible to Theia, we need to bind the custom `HelloWorldMenuContribution` to the respective contribution symbol `MenuContribution`. This is done in the `helloworld-frontend-module`, for more details see [Services and Contributions](https://theia-ide.org/docs/services_and_contributions/).

**helloworld-contribution.ts**

```typescript
export default new ContainerModule(bind => {
   bind(MenuContribution).to(HelloworldMenuContribution);
      ...
});

```

Please note that you also contribute menu items without a command which allows you to create custom top level menus and sub menus. To achieve this, contribute a menu item without a command and then reference the id of this menu item as a `MenuPath` in other contributes. This will add menu items to your custom menu.

## Contributing Keybindings

Keybindings allow the user to trigger commands using specific key combinations. Keybindings can define conditions, specifying when they are active. As an example, there can be keybindings that are only active when the text editor is focused.

Please note that the following code examples are not part of the generated template, so you will need to manually add them (see previous sections).

To contribute a keybinding, implement a `KeybindingContribution` (see code example below) with which you can access the `KeybindingRegistry`, allowing you to register a keybinding. Keybindings consist of:

* `keybinding`: The key combination
* `command`: The id of the command to be triggered
* `when`(optional): The condition when the keybinding should be active

**helloworld-keybinding-contribution.ts**

```typescript
export class HelloworldKeybindingContribution implements KeybindingContribution {
    registerKeybindings(keybindings: KeybindingRegistry): void {
        keybindings.registerKeybinding({
            keybinding: "alt+enter",
            command: 'Helloworld.command',
            when: 'editorFocus && editorIsOpen'
        });
    }
}
```

The syntax for the “when” clause follows the [VS Code terminology](https://code.visualstudio.com/docs/getstarted/keybindings#_when-clause-contexts). Modifiers are platform independent, so [`Modifier.M1`](https://eclipse-theia.github.io/theia/docs/next/enums/core.keymodifier-2.html#ctrlcmd) is Command on OS X and CTRL on Windows/Linux. Key string constants can be viewed in [`Key` documentation](https://eclipse-theia.github.io/theia/docs/next/modules/core.key-2.html).

Just as you needed to bind the contributions before, keybinding contributions also need to be bound to the symbol `KeybindingContribution` to make them accessible for Theia.

**editor-frontend-module.ts**

```typescript
export default new ContainerModule(bind => {
    bind(KeybindingContribution).to(HelloworldKeybindingContribution);
    ...
});

```
