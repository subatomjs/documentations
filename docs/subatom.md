# Subatom Core Class

`Subatom` is the main application object used to register middleware and routes and control the HTTP server lifecycle.

## Create an application

```typescript
import { Subatom } from "subatom";

const app = new Subatom();
```

## Configuration

The supplied examples show runtime configuration through `setConfig()` and project configuration through `subatom.config.ts`. Keep those concerns separate: the project configuration drives the CLI/build workflow, while the application instance owns the runtime server configuration.

```typescript
app.setConfig({
  port: 8080,
  host: "localhost",
  maxConcurrentRequests: 1000,
});
```

The exact configuration surface should match the installed Subatom version. See [Configuration](./configuration.md).

## Middleware and routers

```typescript
app.use((req, res, next) => {
  console.log(req.method, req.path);
  return next();
});

app.use("/api/v1", router);
```

## Routes

The application exposes HTTP route methods including the methods documented in the Router reference.

```typescript
app.get("/users/:id", {
  controller: (ctx) => {
    ctx.res.json({ id: ctx.params.id });
  },
});
```

## Pipeline modifiers

Subatom supports transformers, interceptors, and serializers as separate lifecycle extension points. Use them when middleware alone is not the right abstraction.

```typescript
app.transformer({
  name: "AuditTransformer",
  priority: 10,
  beforeRequest(req, ctx) {
    ctx.state.startedAt = Date.now();
  },
  afterRequest(data, ctx) {
    return data;
  },
});
```

```typescript
app.intercept({
  name: "TimingInterceptor",
  priority: 20,
  async intercept(ctx, next) {
    const started = Date.now();
    const result = await next();
    return { result, durationMs: Date.now() - started };
  },
});
```

```typescript
app.serializer({
  name: "JsonSerializer",
  priority: 10,
  contentType: "application/json",
  async serialize(data) {
    return JSON.stringify(data);
  },
});
```

## Error handling

Register application-level error handling with `useError()` when you need a consistent error response policy. See [Error Handling](./error-handling.md).

## Start and listen

The supplied examples use both `listen()` for direct startup and `start()` when the application configuration/lifecycle is responsible for starting the server.

```typescript
await app.listen(8080);
```

```typescript
const httpServer = await app.start();
```

The returned HTTP server is useful when another subsystem, such as `subatom-pulse`, needs to attach to the same Node.js server. See [Real-Time WebSockets](./subatom-pulse.md).

## Graceful shutdown

The supplied framework examples expose `gracefulShutdown(exitCode?)`. Application shutdown should also close resources owned by the application, such as database and Redis clients, and should coordinate WebSocket shutdown when `subatom-pulse` is mounted.

## API surface

The supplied Router implementation reference demonstrates the following application-level methods: `setConfig`, `use`, `transformer`, `intercept`, `serializer`, `group`, `resource`, `useError`, HTTP route registration methods, `start`, `listen`, and `gracefulShutdown`.

Some router inspection/dispatch methods are intended for router-level usage; see the [Router API](./router.md).
