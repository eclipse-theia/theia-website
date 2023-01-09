---
title: Using the dynamic Toolbar in Theia
---

# Using the dynamic Toolbar in Theia

Eclipse Theia provides a dynamic toolbar providing easy access to commonly used commands. The toolbar contains default commands and can be dynamically adapted by users based on their personal preference.

*Note: To use the toolbar in Theia, the creator of your Theia-based tool  needs to have enabled this option. The following documentation is based on Theia Blueprint, a standard product based on Theia. This might slightly differ from the Theia-based product you are using, please contact the provider of your tool if there are uncertainties and also see [here](/docs/user_getting_started/). For tool creators, please see the [toolbar adopter documentation](/docs/toolbar/).*

As a user, you can control the default visibility of the Theia toolbar using the setting "Show Toolbar" (see screenshot below). Additionally, you can toggle the toolbar using "ALT+T" or via right click on the toolbar => "Toggle Toolbar".

<img src="/theia-toolbar-visibility.gif" alt="Theia Toolbar Visibility" style="max-width: 525px">

The toolbar will show some default commands, which are configured by the provider of your Theia-based tool. As a user, you can add and remove commands. Further, you can change their position in the toolbar. To remove an existing command, right click the icon in the toolbar and select "Remove Command From Toolbar". To change the position of an existing command, simply drag it around. The toolbar supports three columns to visually structure commands ("Left", "Center" and "Right").
To add a new command to the toolbar, right click and select "Add Command to Toolbar" (see screenshot below). This will open a wizard that first allows you to select the command you want to add. In the second step, you can specify and icon that is used to display the new command in the toolbar. Finally you select the column the new command will be placed in (you can still move it around later).

<img src="/theia-toolbar.gif" alt="Theia Toolbar" style="max-width: 525px">

To restore the default commands on the toolbar, right click and select "Restore Toolbar Defaults". Please note that this will delete all custom commands you might have added.