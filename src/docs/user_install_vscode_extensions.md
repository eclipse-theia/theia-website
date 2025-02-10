---
title: Installing VS Code Extensions in Theia
---

# Installing VS Code Extensions in Theia

You can install VS Code extensions into Theia-based products via the [Open VSX Registry](https://open-vsx.org/), aka “Theia Marketplace” or “Theia Extension Registry”.

*Note: To be able to install extensions, the creator of your Theia-based tool needs to have enabled this option. The following documentation is based on the Theia IDE, a standard product based on Theia. This might slightly differ from the Theia-based product you are using, please contact the provider of your tool if there are uncertainties and also see [here](/docs/user_getting_started/). For tool creators, please see the end of this document.*

To install new extensions into the Theia IDE, please open the Extensions View via the Menu "View => Extensions" or via the command “Toggle Extensions View”.

In the opened Extension View you can browse for available VS Code extensions using the search field on top (see screenshot below). In the list of matching extensions, you can review the details about an extension and directly install it by clicking on the “Install” button.

The Extension View also presents recommendations to be installed, if any, as well as extensions that are already installed. Here, you can uninstall extensions by clicking “Uninstall”.

<img src="../../theia-marketplace.gif" alt="Theia Marketplace / Theia Registry" style="max-width: 525px">

The last section, “Built-In”, shows VS Code extensions that are a fixed part of your Theia-based product. These are pre-installed by the creator of your tool and cannot be uninstalled.

## Compatibility

Every Theia version supports a specific VS Code extension API version, i.e. the extension API is fully provided by Theia until and including this VS Code version. In the Theia IDE, you can find the supported version in the about dialog (Menu "Help" => "About"). The [Open VSX Registry](https://open-vsx.org/) will automatically show compatible VS Code extensions only.

Extensions not listed as compatible might still work in Theia, as newer API versions are usually already partially implemented. In this case, you can manually install the extension via a VSIX file and test if it works (Use the command "Extensions: Install from VSIX...").

Please note that a few parts of the VS Code extension API are only stubbed in Theia. Extensions will be installable, but some features might not work as expected.

For details about the compatibility of Theia for VS Code extensions can be found in [this report](https://eclipse-theia.github.io/vscode-theia-comparator/status.html). This includes unsupported as well as stubbed parts of the API for all recent Theia versions.

If you are missing a specific VS Code extension or if you have issues with using a VS Code extension in Theia, please report this to the creator of your Theia-based Tool. If you are using the Theia IDE or a variant of it, please report your issues [here](https://github.com/eclipse-theia/theia/issues/new?assignees=&labels=&template=bug_report.md).

For adopters: If you are building a Theia-based product, please have a look at our overview about [extensions and plugins](/docs/extensions/) as well as at the [documentation on authoring VS Code extensions in Theia](/docs/authoring_vscode_extensions/).
