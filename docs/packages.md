# Subatom Ecosystem

The supplied materials describe four related pieces of the ecosystem. Keeping their responsibilities separate makes the documentation easier to use.

## `subatom`

The core Node.js backend framework. It owns the HTTP application, router, context/request/response APIs, middleware, lifecycle, errors, uploads, and API documentation integration described in the framework reference.

## `subatom-infer`

The runtime validation package used in the supplied examples. It provides schemas that are passed to Subatom route validation.

```typescript
import infer from "subatom-infer";

const userSchema = infer.object({
  email: infer.string().email(),
  name: infer.string().min(1),
});

app.post("/users", {
  schema: { body: userSchema },
  controller: (ctx) => {
    ctx.res.status(201).json(ctx.body);
  },
});
```

For the validator's complete API, maintain a dedicated `subatom-infer` documentation site/reference rather than duplicating its entire API into Subatom framework docs.

## `subatom-pulse`

The WebSocket companion package used by the supplied working application. It attaches to the HTTP server returned by Subatom and provides connections, events, rooms, acknowledgements, packet middleware, authentication, limits, heartbeats, metrics, and lifecycle control demonstrated in the example.

See [Real-Time with subatom-pulse](./subatom-pulse.md).

## `create-subatom`

The project scaffolding CLI. Its documentation covers prompts, package-manager detection, templates, generated files, transaction/rollback behavior, and E2E testing.

See [Getting Started](./getting-started.md), [CLI Contract](./cli-contract.md), [Templates](./templates.md), and the maintainer-oriented [Extension Guide](./extension-guide.md).

## Responsibility matrix

| Capability | Package |
|---|---|
| HTTP server | `subatom` |
| Routing | `subatom` |
| Request/Response/Context | `subatom` |
| Middleware/pipeline | `subatom` |
| Validation | `subatom` + `subatom-infer` |
| OpenAPI integration | `subatom` |
| WebSockets | `subatom-pulse` |
| Project scaffolding | `create-subatom` |
| PostgreSQL/Prisma | application integration |
| Redis | application integration and Pulse adapter strategy |
