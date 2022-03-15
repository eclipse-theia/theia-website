---
title: Project Goals
---

# Strategic Goals of Eclipse Theia

This section describes the overall goals of the Eclipse Theia project.

## Eclipse Theia mission statement: A framework for building tools and IDEs based on web technologies

## An Open, Flexible and Extensible Tool Platform

The goal of the Eclipse Theia project is to provide a platform for efficiently developing tools and IDEs based on a modern web technology stack. The primary target group for Theia is developers implementing a custom tool for end users. As Theia-based products are typically customized, branded and labeled by its adopters, the actual end users may not even be aware of the Theia project they are using under the hood. Therefore, end users are only an indirect secondary target group of Theia. 

## Desktop & Browser, Local & Remote (Cloud)

Tools and IDEs built on Theia can run as desktop applications or in the browser. The backend of Theia can run locally (for the desktop case) or as a remote service in the cloud. Both variants currently have an equal priority.

## Platform for IDEs and Tools
Theia is targeted at building a variety of custom tools. Prominent examples of Theia-based products include IDE's, but Theia also explicitly targets tools that do not focus on textual input/editors or software development. Thus, Theia's scope also included diagram editors or form-based UI. The Theia platform hence covers the typical application scenarios of the Eclipse rich-client platform (Eclipse RCP). As a consequence, the platform aims at making as few assumptions as possible about what adopters might want to build with Theia. It explicitly allows deviation from the standard workbench layout and the removal of all default features.

## Basic Workbench Frame

Theia provides a workbench frame, i.e., a window management system permitting the display of views, editors, and menus and makes available tools and interactions allowing the user to modify of the window layout, trigger commands, and use key bindings and other concepts known from a desktop tool such as drag and drop.

## Reusable Common Tool Features

Theia optionally provides common tool features as components to be reused by adopters. Common features are generic so that may be reused in several tools. Examples for these common tool features include a file explorer, Git support and a code editor.

## Extensibility and Adaptability

Theia is an extensible and adaptable framework. Extensibility in this context means that you can easily add new features to a product built on the Theia platform (including UI and backend functionality). These new features can either be provided by the Theia project itself (common features), by other projects (e.g. Eclipse GLSP) or be custom features that are developed by an adopter. Adaptable in this context means that the workbench and all common features that are provided by the Theia project can be customized and adapted to project-specific needs. This includes changing or removing existing features and adjusting the look and feel.

## VS Code compatibility

Theia provides the ability to host VS Code extensions. This allows adopters to benefit from features that are provided as VS Code extensions and make them part of their tool offering. It also allows end users of Theia-based tools to install additional features, if the adopter providing a tool allows users to do so. When applicable, the default Theia UX aligns with the VS Code UI, although adopters can deviate from this.

## Use standards and don’t reinvent the wheel

Theia uses/reuses industrial standard technologies and practices whenever applicable. This keeps the scope of the project minimal and decreases the maintenance cost. This applies to used frameworks, development tools, but also to general concepts such as UX.

## Product Templates

The Eclipse Theia project does not primarily aim at providing products for end users, but focuses on offering a platform for building products. However, the project provides product templates, a.k.a. “Blueprints”. These blueprints serve two purposes: First, they allow to consume example Theia-based products from the view point of an end user, which enables them to evaluate the underlying platform without first creating a product based on it. Second, the blueprints serve as templates to create custom products. Therefore, the template products contain documentation on how to customize them.

## Open and Vendor Neutral Governance

Eclipse Theia is an open and vendor neutral project with a diverse community of contributors from large corporations down to small companies and even individual developers . This diverse and steadily growing community is a stable base for the ongoing development of additional features and solid maintenance of existing functionality based on a broad and balanced view on the requirements put forward by the Theia adopters. The commercial-friendly licensing and the rigorous underlying IP management ensures that adopters can safely build commercial and internal products based on Theia. Project communication is open and transparent and welcomes new adopters by keeping the barriers of contribution as low as possible. Decisions in the project are based on the principle of meritocracy meaning that the weight of contributors in decisions is solely based on their achievements for the project as recognized by their peers. This provides an important incentive for contributors to make contributions. The open governance and diverse community of Theia is one of its strongest assets for its mid- to long-term evolution and viability.
