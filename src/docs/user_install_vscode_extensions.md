---
title: Installing VS Code Extensions in Theia
---

# Installing VS Code Extensions in Theia

You can install VS Code extensions into Theia-based products via the [Open VSX Registry](https://open-vsx.org/), aka “Theia Marketplace” or “Theia Extension Registry”.

*Note: To be able to install extensions, the creator of your Theia-based tool has to have enabled this option. The following documentation is based on Theia Blueprint, as a standard product based on Theia. This might slightly differ from the Theia-based product you are using, please contact the provider of your tool if there are uncertainties and also see [here](/docs/user_getting_started/). For tool creators, please see the end of this document.*

To install new extensions into Theia Blueprint, please open the Extensions View via the Menu "View => Extensions" or via the command “Toggle Extensions View”.

In the opened Extension View you can browse for available VS Code extensions using the search field on top (see screenshot below). In the list of matching extensions, you can review the details about an extension and directly install it by clicking on the “Install” button.

The Extension View also presents recommendations to be installed, if any, as well as extensions that are already installed. Here, you can uninstall extensions by clicking “Uninstall”.

<img src="/theia-marketplace.gif" alt="Theia Marketplace / Theia Registry" style="max-width: 525px">

The last section, “Built-In” shows VS Code extensions that are a fix part of your Theia-based product. This means the creator of your tool has installed them already for you and you can also not uninstall them.

If you are missing a specific VS Code extension or if you have issues with using a VS Code extension in Theia, please report this to the creator of your Theia-based Tool. If you are using Theia Blueprint or a variant of it, please report your issue [here](https://github.com/eclipse-theia/theia/issues/new?assignees=&labels=&template=bug_report.md).

For adopters: If you are building a Theia-based product, please have a look at our overview about [extensions and plugins](/docs/extensions/) as well as at the [documentation on authoring VS Code extensions in Theia](/docs/authoring_vscode_extensions/).
