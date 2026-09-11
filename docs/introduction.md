# Subatom.js

Subatom.js is the Node.js backend framework documented in this repository. The documentation is organized around the APIs a developer needs to build, test, and operate an application in production.

## What this documentation covers

- application and server lifecycle
- HTTP routing and route composition
- request, response, and context APIs
- middleware and pipeline modifiers
- runtime validation with `subatom-infer`
- multipart file uploads
- structured error handling
- OpenAPI documentation
- configuration and deployment
- real-time integration with `subatom-pulse`
- `create-subatom` project generation

## Core application model

A typical application creates a `Subatom` instance, registers middleware and routes, optionally mounts routers and API documentation, and starts the HTTP server.

```typescript
import { Subatom } from "subatom";

const app = new Subatom();

app.get("/hello", {
  controller: (ctx) => {
    ctx.res.json({ message: "Hello, World!" });
  },
});

await app.listen(8080);
```

For generated projects, use the `create-subatom` workflow described in [Getting Started](./getting-started.md).

## Companion packages

Subatom is the core framework. The supplied project examples also use `subatom-infer` for runtime schemas and `subatom-pulse` for WebSocket functionality. These are documented separately so that framework APIs are not confused with companion-package APIs.

## Documentation authority

When examples or descriptions conflict, prefer the implementation/reference material supplied with the framework and the working sample applications over generic prose. An API is documented here as a supported application API only when the supplied material demonstrates it as part of the public framework/package surface.

## Version notes

The supplied documentation identifies the framework examples as Subatom 2.x, including examples using `SubAtomDocs(..., { version: "2.0.0" })`. Do not infer a different package version from the documentation-site version. Verify the published package metadata before release.

## Next steps

1. [Create a project](./getting-started.md)
2. [Learn the application class](./subatom.md)
3. [Learn routing](./router.md)
4. [Understand `ctx`](./context.md)
5. [Read the Request and Response references](./request.md) and [Response Helper](./response-helper.md)
6. [Add validation](./validation.md)
7. [Add WebSockets with `subatom-pulse`](./subatom-pulse.md)
8. [Follow the production example](./production-example.md)
