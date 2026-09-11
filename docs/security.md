# Security

Subatom provides the request/middleware primitives used to implement application security. Authentication, authorization, secrets management, database permissions, and most security policy remain application or infrastructure responsibilities unless a supplied package explicitly provides them.

## Validate untrusted input

Use route schemas for request data that crosses your trust boundary.

```typescript
import infer from "subatom-infer";

app.post("/users", {
  schema: {
    body: infer.object({
      email: infer.string().email(),
      name: infer.string().min(1),
    }),
  },
  controller: (ctx) => {
    ctx.res.status(201).json({ created: true, user: ctx.body });
  },
});
```

## Authentication

Authentication can be implemented as middleware or another application-level integration. A JWT library, session store, OAuth provider, or API-key service is not automatically a Subatom feature merely because it is used in an example.

```typescript
app.use("/api", async (req, res, next) => {
  // Verify your application's credential here.
  // Attach trusted identity information to request/context state.
  return next();
});
```

## Authorization

Perform authorization after establishing identity. Keep authorization rules close to the domain operation or a dedicated middleware/policy layer.

## CORS, CSRF, and headers

These are application/infrastructure policies. Configure them according to the client architecture and deployment model rather than copying a fixed header set into every application.

## Rate limiting

Rate limiting can be implemented as middleware or supplied by a dedicated infrastructure/package. In-memory examples are suitable only for single-process demonstrations; distributed deployments need a shared strategy.

## Secrets

Never commit database credentials, API keys, JWT signing secrets, or WebSocket authentication tokens. Use environment variables or a secrets manager and validate required configuration during startup.

## WebSocket security

When using `subatom-pulse`, authenticate the connection during the Pulse authentication phase and enforce event-level authorization with its packet middleware. The supplied working application demonstrates both. See [Real-Time with subatom-pulse](./subatom-pulse.md).

## Production checklist

- Validate every untrusted input.
- Authenticate before accessing protected resources.
- Authorize every privileged operation.
- Do not log credentials or bearer tokens.
- Use TLS at the public edge.
- Apply request and upload size limits.
- Apply WebSocket payload, connection, queue, and rate limits where appropriate.
- Use shared infrastructure for distributed rate limits/session state.
- Test error responses so internal stack traces and secrets are not exposed.
