# Subatom Architecture

This page describes the application-level architecture supported by the supplied framework/reference material. It intentionally avoids presenting internal implementation classes as stable application APIs.

## Request lifecycle

Conceptually, a request moves through:

```text
Node HTTP request
      │
      ▼
 Request / Context creation
      │
      ▼
 Global/path middleware
      │
      ▼
 Route matching
      │
      ▼
 Route middleware + schema validation
      │
      ▼
 Pipeline modifiers
      │
      ▼
 Controller / handler
      │
      ▼
 Response / serialization
      │
      ▼
 Node HTTP response
```

The exact ordering between individual pipeline modifiers should be verified against the installed framework version when building lifecycle-sensitive middleware.

## Main components

### Subatom

Application composition and lifecycle.

### Router

Route registration, matching, groups, resources, middleware, route metadata, and URL generation.

### Request / Response

Typed facades over the underlying Node HTTP request and response.

### Context

The primary controller-facing facade combining request data and response operations.

### Middleware and pipeline

Middleware handles cross-cutting request processing. Transformers, interceptors, and serializers provide additional lifecycle extension points.

### Validation

Route schemas validate request body, query, params, headers, and files through the supported schema protocol.

### File uploads

Multipart upload helpers provide file metadata, memory/disk handling, streaming, cleanup, and validation.

## Companion-package boundary

WebSocket functionality in the supplied working application is implemented by `subatom-pulse`, mounted on the HTTP server returned by Subatom. This keeps the core HTTP framework and real-time transport responsibilities separate.

## Production boundary

Database connections, Redis clients, external authentication providers, reverse proxies, TLS termination, and deployment orchestration belong to the application/infrastructure layer.
