# Eclipse Theia – FAQ for Adopters and Users

## Is Theia just a new version of the old Eclipse IDE?

No — Theia is a completely independent project, based on a new technology stack with a modern web-based architecture.

<details> <summary>Longer answer</summary>
Theia and the classic Eclipse IDE share the Eclipse Foundation name but have entirely different architectures, technologies, and user experiences:

- Fresh foundation: Theia is built from scratch on modern web technologies (TypeScript, Node.js, browser-based components) instead of the decades-old Java/SWT stack used in the classic Eclipse IDE.

- Runs anywhere: Theia can run as a desktop app or fully in the browser; classic Eclipse IDE is a desktop-only Java application.

- VS Code extension compatibility: Theia supports VS Code extensions via Open VSX; the classic Eclipse IDE uses a completely different plugin model.

- Modern UI and UX: Theia offers a clean, responsive interface with features like detachable views, customizable toolbars, and multiple extension sources.

If you dislike the traditional Eclipse IDE, that experience does not apply to Theia — they are separate projects, built in different eras, for different goals, with different technology.

[Eclipse Theia is the Next Generation Eclipse Platform for IDEs and Tools!](https://eclipsesource.com/blogs/2022/03/09/eclipse-theia-is-the-next-generation-eclipse-platform-for-ides-and-tools/)

</details>

## Theia Platform vs Theia IDE vs Theia AI vs AI-powered Theia IDE

Theia Platform is the framework; Theia IDE is the ready-to-use IDE product built on it; Theia AI is the AI framework part of the Theia platform; AI-powered Theia IDE is Theia IDE with AI coding features.

<details>
<summary>Longer answer</summary>

- **Theia Platform** – The core *framework* for building custom cloud and desktop IDEs. It provides the extensible foundation (APIs, architecture) on which any domain-specific tool or IDE can be built.  
- **Theia IDE** – A ready-to-use *IDE application* built on the Theia Platform. It's the general-purpose IDE that you can download or run in the browser, serving as a showcase for Theia-based tools.  
- **Theia AI** – A framework (part of the Theia Platform) for adding AI capabilities to tools and IDEs. It provides building blocks for AI assistants, AI features, and model integration.  
- **AI-powered Theia IDE** – The Theia IDE bundled with AI capabilities from Theia AI (e.g. AI code completion, chat agents), giving users control and openness.

[Explore the Theia Platform →](https://theia-ide.org/theia-platform/)

[Explore the (AI-powered) Theia IDE →](https://theia-ide.org/)

[Explore Theia AI →](https://theia-ide.org/theia-ai/)
</details>

## What is the difference to VS Code?

Theia is a *platform* for building specialized IDEs and tools, with deeper customization and open governance; VS Code is an extensible code editor by Microsoft. Theia IDE is a fully open alternative to VS Code, offering similar features while providing vendor-neutrality, more flexibility and control.

<details>
<summary>Longer answer</summary>

Eclipse Theia and Microsoft's VS Code share technologies (Monaco, LSP, DAP) but are entirely different code bases and differ in purpose and philosophy:  
- Theia is a framework designed for building custom IDEs and tools, with full flexibility to change any part of the UI or backend.  
- VS Code is a powerful general-purpose editor with limited deep customization outside its extension API.  
- Theia IDE is a fully-featured development environment built on the Theia Platform that functions as an open variant to VS Code, offering similar features and compatibility with VS Code extensions.

Key differences include:
- Theia is fully open source with no proprietary components, while VS Code includes some proprietary elements
- Theia has zero telemetry by default, prioritizing user privacy
- Theia is governed by the vendor-neutral Eclipse Foundation with diverse community input
- Theia offers deeper customization through its modular architecture
- Theia IDE supports VS Code extensions via Open VSX registry
- Theia IDE provides additional features like customizable toolbars, detachable views, and multiple extension registry support

Theia is vendor-neutral (Eclipse Foundation) and runs most VS Code extensions via Open VSX.

[Compare the VS Code (OSS) and the Theia Platform →](https://eclipsesource.com/blogs/2023/09/08/eclipse-theia-vs-code-oss/)

[Compare the Theia IDE and VS Code →](https://eclipsesource.com/blogs/2024/07/12/vs-code-vs-theia-ide/)
</details>

## Can I build my own tool product based on Theia and sell it?

Yes, Theia's EPL-2.0 license allows commercial products without royalties.

<details>
<summary>Longer answer</summary>

Theia is open-source under the Eclipse Public License 2.0, a commercially friendly license. You can use and distribute Theia in your own products, including closed-source commercial offerings. Many companies already do this — for example:  
- Arduino IDE 2.0  
- Arm Mbed Studio  
- Texas Instruments Code Composer Studio  

There are no license fees. Just comply with the EPL-2.0 obligations (e.g., upstreaming changes to Theia core if modified).

Importantly, Theia's modular architecture allows you to clearly separate EPL-licensed platform code from your own custom code. This separation means you don't need to open-source your product-specific code or extensions. You can adapt and extend Theia for your product needs without changing existing platform code or forking, keeping your intellectual property protected while still benefiting from the open-source platform.

</details>

## What is the difference between adopting Theia and just providing a VS Code extension?

VS Code extension = feature in an existing IDE; Theia adoption = full control for custom IDEs or Tools.

<details>
<summary>Longer answer</summary>

- **VS Code extension:** Ideal if you want to add a single feature to an existing IDE that users already run (VS Code or Theia IDE).  
- **Theia adoption:** Ideal if you want to deliver a fully integrated product — your own IDE or domain-specific tool — with full control over UI, features, AI integration, branding, and packaging.  

Theia lets you modify the entire application; VS Code extensions cannot.

[Learn more →](/docs/extensions/)
</details>

## Is Theia just another VS Code fork?

No — Theia is not a fork of VS Code, but a separate, independently developed platform that shares a few technologies, such as Monaco, LSP, or DAP.

<details> <summary>Longer answer</summary>
While Theia and VS Code both use key open technologies like Monaco, the Language Server Protocol (LSP), and the Debug Adapter Protocol (DAP), Theia is not based on the VS Code codebase. Instead, it is:

- A separate architecture: Theia was built from scratch with a modular design that allows replacing or customizing any part of the application — from the frontend UI to the backend services.

- A platform first: Theia is primarily a framework for building custom tools and IDEs, not just a prebuilt editor.

- Governed openly: Theia is hosted by the vendor-neutral Eclipse Foundation with contributions from many companies; VS Code is controlled by Microsoft.

- Extension compatibility without forking: Theia runs most VS Code extensions via the Open VSX registry but does so without inheriting the constraints of a forked codebase.

In short, Theia gives you the flexibility of a platform, the familiarity of VS Code extensions, and the freedom of an open governance model — without the downsides of maintaining a fork.

[Is Forking VS Code a Good Idea? →](https://eclipsesource.com/blogs/2024/12/17/is-it-a-good-idea-to-fork-vs-code/)

</details>

## Why should I use Theia and not just fork VS Code?

Forking VS Code is high-maintenance and loses Marketplace access; Theia offers flexibility without the burden.

<details>
<summary>Longer answer</summary>

Forking VS Code:  
- Cuts you off from the Microsoft Marketplace (and some extensions like Live Share).  
- Creates a heavy maintenance burden to keep up with upstream changes.  

Theia:  
- Gives you deep customization without forking.  
- Maintains compatibility with VS Code extensions.
- Is actively maintained by a vendor-neutral community.

[Is Forking VS Code a Good Idea? →](https://eclipsesource.com/blogs/2024/12/17/is-it-a-good-idea-to-fork-vs-code/)
</details>

## I need support for my Theia-based tool project.

Use community resources or [professional support](/support/).

<details>
<summary>Longer answer</summary>

- **Community:** GitHub issues, forums, and documentation.  
- **Professional services:** Several contributors offer consulting, training, implementation services, sponsored development and long-term support for Theia-based tools.

[Get Theia support →](/support/)
</details>

## How can I sustain/support the project?

Contribute, sponsor, or fund Theia's development.

<details>
<summary>Longer answer</summary>

Ways to support Theia:  
- Contribute code, documentation, or feedback.  
- Sponsor development and maintanance.  
- Fund features to be added to the core.
- [Get visible as an adopter and contributor](https://eclipsesource.com/blogs/2023/11/22/how-to-become-visible-theia-adopter/)

[Professional Support for Theia →](/support/)
</details>

## Does Theia support VS Code extensions?

Yes, most extensions work; some Microsoft-proprietary ones don't (same as for all VS Code forks)

<details>
<summary>Longer answer</summary>

Theia supports most VS Code extensions, they can be installed from the Open VSX registry or any custom source.
- Works: Language servers, debuggers, themes, most tools.  
- Not available: Proprietary Microsoft extensions (e.g., Live Share, Remote Development). The same applies for all VS Code forks.

Open alternatives exist (e.g. Open Collaboration Tools and native Remote Container Support).

[Extensions in Theia →](https://open-vsx.org/)
</details>

## Who is behind Theia, and who is using it?

Theia is community-driven (hosted by the Eclipse Foundation) with major adopters like Arduino, TI, and Arm and contributors such as STMicroelectronics, Ericsson and EclipseSource.

<details>
<summary>Longer answer</summary>

Theia is developed by a diverse community hosted by the Eclipse Foundation.
This vendor-neutral governance ensures long-term stability.

[See Theia adopters →](/theia-platform/)
</details>

## Should I migrate my Eclipse Platform/RCP application to Theia?
Yes — if you want to modernize your tool or IDE, extend it to the web, or refresh its UX, Theia is definitely a platform to consider.
However, Theia is not the right choice for every general purpose RCP application, and each project should be evaluated individually based on its requirements and user needs.

<details> <summary>Longer answer</summary>
Many tools have been built on the Eclipse Tools Platform or RCP over the past two decades. While Eclipse Desktop remains a powerful desktop technology, it is limited to Java/SWT and desktop-only deployments. Today, there is growing demand for tools that can run both on the desktop and in the browser, offer a modern user experience, and integrate more easily with cloud and AI technologies.

Eclipse Theia is the next-generation Eclipse platform for IDEs and tools:

- Modern technology stack – Theia is built with TypeScript, Node.js, and web standards instead of Java/SWT, making it easier to integrate with modern services and UI frameworks.

- Runs anywhere – Your tool can run as a desktop app or in the browser with the same codebase.

- Modular and flexible – Theia’s architecture makes it easier to replace or adapt any part of the application.

- VS Code extension compatibility – You can reuse a huge ecosystem of extensions.

- AI-ready – Theia AI provides building blocks for integrating AI assistants and features into your tool.

- Open and vendor-neutral – Theia is hosted at the Eclipse Foundation, ensuring open governance, transparent processes, and long-term sustainability beyond any single vendor.

- Future-proof – Theia is actively evolving with modern development trends, including cloud workspaces, collaborative editing, and local or remote AI integration.

If you have an existing Eclipse-based tool, migrating does not always mean starting from scratch — you can reuse your domain logic, adapt your existing architecture, and incrementally replace the UI. The [Migrating Eclipse RCP Tools to Web guide](https://eclipsesource.com/blogs/2025/07/30/migrating-eclipse-rcp-tools-to-web/) explains common migration paths, strategies, and best practices. For more background on why Theia can be the successor to Eclipse RCP for certain applications — and why it’s not suited for all — see:

[Eclipse Theia is the Next Generation Eclipse Platform for IDEs and Tools →](https://eclipsesource.com/blogs/2022/03/09/eclipse-theia-is-the-next-generation-eclipse-platform-for-ides-and-tools/)


[Eclipse Theia is the Next Generation Eclipse RCP →](https://eclipsesource.com/blogs/2022/03/16/eclipse-theia-is-the-next-generation-eclipse-rcp/)

[Migrating Eclipse RCP Tools to Web guide →](https://eclipsesource.com/blogs/2025/07/30/migrating-eclipse-rcp-tools-to-web/)

</details>
