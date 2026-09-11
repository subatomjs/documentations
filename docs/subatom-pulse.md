# Real-Time with `subatom-pulse`

`subatom-pulse` is the companion package used by the supplied working applications for WebSocket functionality. The integration attaches Pulse to the Node.js HTTP server returned by the Subatom application.

## Installation

```bash
npm install subatom subatom-pulse
```

## Attach Pulse to Subatom

The supplied application starts Subatom first and then passes the active HTTP server to `subatomPulse()`.

```typescript
import { LocalAdapter, subatomPulse } from "subatom-pulse";

const httpServer = await app.start();

const io = subatomPulse({
  server: httpServer,
  path: "/ws",
  nodeId: process.env.NODE_ID ?? `node-${process.pid}`,
  adapter: new LocalAdapter(),
});
```

This is the documented integration pattern from the supplied working example. Do not confuse it with the older exploratory `server.group(...).ws(...)` example in the reference material; the working application uses `subatom-pulse` directly.

## Connection authentication

Pulse accepts an authenticator in the supplied example. The authenticator returns an authenticated identity and metadata that become available to the socket.

```typescript
authenticator: async (req) => {
  const token = req.headers.authorization;
  if (token !== "Bearer example-token") {
    return { authenticated: false };
  }

  return {
    authenticated: true,
    userId: "user-123",
    metadata: { role: "member" },
  };
},
```

The token above is only a documentation example. Use your real authentication system in production.

## Connection handlers

```typescript
io.onConnection((socket) => {
  socket.join("global");
  socket.emit("system.welcome", { connectionId: socket.id });

  socket.on("ping.ack", (data, ack) => {
    ack?.({
      pong: true,
      clientTimestamp: data?.timestamp,
      serverTimestamp: Date.now(),
    });
  });
});
```

## Rooms

The supplied application demonstrates `join`, `leave`, and room-targeted messaging.

```typescript
socket.join("global");
socket.join(`user:${userId}`);
socket.leave("global");
socket.to("global").emit("announcement", { message: "Hello" });
```

## Direct messaging

A useful pattern is to give each connection its own room and use `socket.to(target)` for direct messages. The supplied example joins `socket.id` and then targets that room.

## Packet middleware

Pulse supports packet middleware through `io.use()`. The supplied application uses it to enforce an administrator role for `admin.broadcast`.

```typescript
io.use((packet, context, next) => {
  if (packet.type === "event" && packet.event === "admin.broadcast" && context.metadata?.role !== "admin") {
    next(new Error("Admin role required"));
    return;
  }
  next();
});
```

## Capacity and memory controls

The working examples configure: 

- `maxPayloadBytes`
- `maxConnections`
- `rateLimitPerSec`
- `maxQueueMessages`
- `maxQueueBytes`
- `overflowPolicy`
- `heartbeatIntervalMs`
- `heartbeatTimeoutMs`
- `authTimeoutMs`

Tune these values using measured workload characteristics.

## Adapters and multi-node deployments

The supplied application uses `LocalAdapter`. Its source comments indicate that a shared adapter can be substituted for multi-replica deployments. Verify the exact adapter package/API before documenting a production Redis adapter as a guaranteed feature.

## Metrics

The working application exposes `io.getMetrics()` through an HTTP `/metrics` route. This is a concrete example of using the Pulse instance from the HTTP application.

## Graceful shutdown

Close Pulse before closing the underlying HTTP server:

```typescript
await io.close();
await new Promise<void>((resolve, reject) => {
  httpServer.close((error) => error ? reject(error) : resolve());
});
```

Also close database, Redis, and other application-owned resources during the same shutdown sequence.

## Production event model

The supplied working application demonstrates these event categories:

| Event | Purpose |
|---|---|
| `system.welcome` | identify the connection |
| `room.join` | join a room |
| `room.leave` | leave a room |
| `room.message` | room broadcast |
| `message.direct` | direct message |
| `admin.broadcast` | privileged broadcast |
| `ping.ack` | acknowledgement/latency check |
| `disconnect` | cleanup/broadcast presence |

Use your own event names and validate event payloads at the application boundary.

## Canonical example

See [Production Example](./production-example.md) for the complete PostgreSQL + Redis + Subatom + Pulse startup architecture supplied in `create-test.zip`.
