# Production Example: Subatom + PostgreSQL + Redis + WebSockets

The supplied `create-test` project is the most complete end-to-end application example in the provided materials. It combines a Subatom HTTP server, Prisma/PostgreSQL, Redis, and `subatom-pulse`.

## Architecture

```text
process
│
├── PostgreSQL / Prisma
├── Redis
├── Subatom HTTP server
│   ├── /health
│   ├── /metrics
│   ├── /
│   ├── /api/v1/*
│   └── /docs
│
└── subatom-pulse
    └── /ws
```

## Server module

The supplied server module mounts an API router, health route, metrics route, root route, and OpenAPI docs:

```typescript
const server: ISubatom = new Subatom();

server.use("/api/v1", subatomRouter);

server.get("/health", async (_req, res) => {
  return res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

SubAtomDocs(server, {
  path: "/docs",
  title: "Subatom Enterprise API",
  version: "2.0.0",
});
```

## Startup sequence

The supplied `main.ts` uses this order:

1. connect Prisma/PostgreSQL
2. initialize Redis
3. start the Subatom HTTP server
4. attach Pulse to the active HTTP server

This sequence is useful because WebSockets share the same HTTP listener rather than creating an unrelated HTTP server.

## Shutdown sequence

The sample coordinates shutdown in the reverse dependency order:

1. close WebSockets
2. stop accepting HTTP traffic
3. disconnect database resources
4. exit the process

The sample also includes a hard timeout for a shutdown that fails to drain. Add Redis and any other application-owned resources to the same lifecycle in your own application.

## Redis

The sample has a dedicated Redis bootstrap/configuration layer. It supports a required/degraded-mode decision in the application configuration. This is application infrastructure, not a universal Subatom Redis feature.

## WebSocket integration

The socket module uses `subatomPulse()` with a `LocalAdapter`, connection/authentication limits, heartbeats, packet middleware, rooms, direct messages, acknowledgements, and disconnect notifications.

## Health vs readiness

Use `/health` for a lightweight liveness signal. If your deployment requires readiness, create a separate endpoint that checks dependencies and returns an appropriate non-success status when the service cannot accept application traffic.

## Metrics

The supplied sample exposes Pulse metrics from the HTTP layer. Keep operational metrics protected when they contain infrastructure details.

## What to change for a real application

The sample is intentionally a reference architecture, not a drop-in production configuration. Before deploying:

- replace example authentication with real credentials/tokens
- configure database connection secrets
- configure Redis according to your topology
- choose capacity limits from load tests
- add application-level authorization and validation
- add structured logging and tracing appropriate to your environment
- configure TLS/reverse proxy infrastructure
- add automated tests and deployment health checks

## Source reference

This guide is based on the supplied `create-test.zip` application. Use the application source as the executable example when adapting this architecture.
