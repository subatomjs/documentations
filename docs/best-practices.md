# Production Best Practices

This guide combines the supplied Subatom API references with the working production-style application example. It focuses on boundaries developers must make explicit when moving from a demo to a real service.

## Recommended application structure

```text
src/
├── config/
├── router/
├── controllers/
├── models/
├── redis/
├── socket/
└── server.ts
main.ts
subatom.config.ts
```

The supplied `create-test` project follows this general separation: the server owns HTTP routes and API docs, `socket/` owns the Pulse integration, Redis has its own bootstrap/configuration modules, and `main.ts` coordinates startup and shutdown.

## Startup order

For an application with database, cache, HTTP, and WebSocket dependencies, establish a deliberate startup sequence. The supplied example connects PostgreSQL, initializes Redis, starts the Subatom HTTP server, and then mounts Pulse onto the active HTTP server.

## Request handling

Use route schemas at the boundary, keep controllers focused on application behavior, and use middleware for cross-cutting request concerns.

## Resource limits

Bound request body size, upload size, WebSocket payload size, connection count, queue size, and event rate where the workload requires it. Limits are part of application capacity planning, not universal magic defaults.

## Health checks

Expose a lightweight liveness endpoint. Keep dependency readiness checks separate when a transient database/cache failure should not cause an orchestrator to restart an otherwise healthy process.

## Graceful shutdown

The supplied production example uses a coordinated shutdown: close the WebSocket engine, stop accepting HTTP traffic, disconnect database resources, and then exit. Add Redis and any other application-owned clients to the same lifecycle.

## Observability

Use structured application logging and expose only the metrics that your deployment can consume. The supplied examples expose Pulse metrics through a protected HTTP route; they do not establish a universal Subatom metrics API.

## Performance

Do not rely on undocumented benchmark numbers. Measure your own workload with the actual Node.js version, database, payload sizes, concurrency, reverse proxy, and deployment environment.

## Next steps

- [Deployment](./DEPLOYMENT.md)
- [Security](./security.md)
- [Production Example](./production-example.md)
- [Real-Time with subatom-pulse](./subatom-pulse.md)
