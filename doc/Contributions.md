# Contribution-Points

If an extension wants to provide a hook for others to contribute to, they
should define a _contribution-point_. A _contribution-point_ is just an
interface that many others can implement. The extension will delegate to them
when needed.

The `OpenerService`, for instance, defines a contribution point to allow others
registering `OpenHandler`s. You can have a look at the code
[here](../packages/core/src/browser/opener-service.ts).

Theia comes with an extensive list of contribution points already. A good way
to see what contribution points exist is to do a find references on
`bindContributionProvider`.

