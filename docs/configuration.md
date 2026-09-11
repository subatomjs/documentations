# Configuration

Subatom configuration has two related surfaces:

1. **Application/server configuration** — runtime HTTP server settings.
2. **`subatom.config.*` project configuration** — settings consumed by the Subatom CLI/build workflow.

Keeping these distinct prevents build settings from being mistaken for framework runtime APIs.

## `subatom.config.ts`

The supplied generated application uses `defineConfig`: 

```typescript
import { defineConfig } from "subatom";

export default defineConfig({
  port: 8080,
  host: "localhost",
  outDir: "build",
  sourcemap: true,
  minify: true,
  entry: "main.ts",
  watch: {
    extensions: ["ts", "tsx", "js", "jsx"],
    debounceMs: 500,
    ignore: ["**/logs/**"],
  },
});
```

The current supplied CLI documentation identifies the core project configuration keys as `entry`, `outDir`, `port`, `host`, `sourcemap`, `minify`, and `watch`; the watch object supports `extensions`, `debounceMs`, and `ignore`.

## Environment values

Environment variables are application-specific unless the framework/CLI explicitly maps them. Do not assume arbitrary variables are automatically converted into configuration properties. The supplied production example explicitly reads application environment values for PostgreSQL, Redis, `NODE_ENV`, `PORT`, and `HOST`.

## Runtime configuration

When configuring the running application, the supplied framework examples use `setConfig()`: 

```typescript
app.setConfig({
  port: 8080,
  host: "0.0.0.0",
  maxConcurrentRequests: 500,
});
```

Use the installed package's exported types as the final authority for optional server settings such as timeouts or connection limits.

## Production rules

- Keep secrets in environment/configuration management, not source code.
- Explicitly configure the host when running inside a container or behind a load balancer.
- Treat database and Redis configuration as application infrastructure, not Subatom framework defaults.
- Test the exact generated configuration before deployment.

## Next steps

- [Getting Started](./getting-started.md)
- [Deployment](./DEPLOYMENT.md)
- [Production Example](./production-example.md)
