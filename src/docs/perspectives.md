---
title: Perspectives
---

# Perspectives

> **Experimental:** Perspectives were introduced in Theia 1.74 and are experimental. The API is likely to change in upcoming releases, and the feature is not yet exposed as a regular part of the UI. This page therefore only gives an overview. For the current details, see `PerspectiveService` in `@theia/core/lib/browser/perspective-service`.

A perspective is a named arrangement of views in the Theia workbench. Instead of asking users to move views around manually to get a layout that fits a certain kind of work, an application can offer a perspective that already places the relevant views in the intended shell areas.

<video controls style="max-width: 650px">
  <source src="../../perspectives.mp4" type="video/mp4">
  Switch perspectives via the command in the command palette (experimental)
</video>

## Switching Perspectives

Every application has a built-in *Default* perspective, which corresponds to the layout it starts with. Perspectives are switched with the command *Switch Perspective (Experimental)*, which opens a quick pick with all registered perspectives. While the feature is experimental, this command and *Reset Perspective (Experimental)*, which restores the original arrangement of the active perspective, are only available from the command palette and are not contributed to any menu. Layout changes a user makes are remembered per perspective.

The ID of the active perspective is available in the context key `activePerspectiveId`, so menu items, toolbar items and keybindings can be bound to a specific perspective.

## Contributing a Perspective

A perspective is contributed by implementing `PerspectiveContribution` and registering a descriptor that maps view IDs to shell areas (`main`, `left`, `right`, `bottom`).

```typescript
@injectable()
export class ReviewPerspectiveContribution implements PerspectiveContribution {

    registerPerspectives(service: PerspectiveService): void {
        service.registerPerspective({
            id: 'review',
            label: nls.localize('my-ext/perspective/review', 'Review'),
            viewPlacements: new Map<string, ApplicationShell.Area>([
                [SCM_VIEW_CONTAINER_ID, 'left'],
                [PROBLEMS_WIDGET_ID, 'bottom']
            ])
        });
    }
}
```

The contribution is bound like any other one, via `bind(PerspectiveContribution).toService(ReviewPerspectiveContribution)`. Besides the view placements, a descriptor can declare which view should end up focused in an area, which areas start collapsed, and hooks that run when the perspective is entered or left. Note that only views contributed via `AbstractViewContribution` can be placed this way, because other widgets may have side effects when being created.

Injecting `PerspectiveService` gives access to the active perspective and to a change event, and allows switching or resetting perspectives programmatically.

## Example: The AI First Perspective

The Theia IDE ships an *AI First* perspective as a practical example. It is implemented by `AIFirstPerspectiveContribution` in the `@theia/ai-ide` package, see the [end user documentation](/docs/user_ai/#ai-first-perspective) for how it looks and behaves.
