> **Documentation status — public API reference**
>
> This page consolidates the detailed Subatom reference material supplied with the framework implementation examples. Treat the exported/public API surface as authoritative; internal implementation details are intentionally not presented as application APIs.

# Response Helper (res.helper)

The `res.helper` interface (`IResponseHelper`) is a built-in convenience facade exposed on both `ctx.res.helper` and the `Response` object. It provides semantic, type-safe convenience methods corresponding to standard HTTP status codes, streamlining how you return consistent success data payloads, handle redirection responses, and dispatch structured client or server errors.

```typescript
router.get('/users/:id', {
  controller: (ctx) => {
    const user = findUser(ctx.params.id);
    if (!user) {
      return ctx.res.helper.not_found('User not found', { id: ctx.params.id });
    }
    return ctx.res.helper.success(user);
  }
});
```

---

## Table of Contents

- [Overview & Method Signatures](#overview--method-signatures)
- [Success & Informational Helpers (1xx, 2xx, 3xx)](#success--informational-helpers-1xx-2xx-3xx)
  - [1xx Informational](#1xx-informational)
  - [2xx Success](#2xx-success)
  - [3xx Redirection](#3xx-redirection)
- [Error Helpers (4xx, 5xx)](#error-helpers-4xx-5xx)
  - [4xx Client Errors](#4xx-client-errors)
  - [5xx Server Errors](#5xx-server-errors)
- [HTTP Status Registry](#http-status-registry)
- [Type Definitions](#type-definitions)

---

## Overview & Method Signatures

The helpers are partitioned into two core function signatures based on whether the HTTP status code represents an error (`isError: true`) or a non-error operation (`isError: false`):

### 1. Success & Informational Helpers (`isError: false`)
```typescript
res.helper[methodName](data?: unknown): IResponse
```
Used for `1xx`, `2xx`, and `3xx` statuses. Accepts an optional data payload or object that gets serialized into the outgoing response.

### 2. Error Helpers (`isError: true`)
```typescript
res.helper[methodName](messageOrError?: string | Error, details?: unknown): IResponse
```
Used for `4xx` and `5xx` statuses. Accepts a custom string message or native `Error` instance as the primary argument, accompanied by an optional `details` metadata object (e.g., error codes, field validation arrays, trace IDs).

---

## Success & Informational Helpers (1xx, 2xx, 3xx)

### 1xx Informational

#### res.helper.continue([data])
Sends an HTTP `100 Continue` status.

```typescript
router.get('/helper/continue', {
  controller: (ctx) => {
    return ctx.res.helper.continue();
  }
});
```

#### res.helper.switching_protocols([data])
Sends an HTTP `101 Switching Protocols` status.

```typescript
ctx.res.helper.switching_protocols();
```

#### res.helper.processing([data])
Sends an HTTP `102 Processing` status (WebDAV).

```typescript
ctx.res.helper.processing();
```

#### res.helper.early_hints([data])
Sends an HTTP `103 Early Hints` status with pre-connect or preload headers.

```typescript
ctx.res.helper.early_hints();
```

---

### 2xx Success

#### res.helper.success([data])
Sends an HTTP `200 OK` status with the supplied payload.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `data` | `unknown` | *(Optional)* The JSON payload, entity object, or array to send to the client. |

```typescript
router.get('/helper/success', {
  controller: (ctx) => {
    return ctx.res.helper.success({
      id: 'usr_101',
      name: 'Kunal Chandra Das',
      role: 'Maintainer'
    });
  }
});
```

#### res.helper.created([data])
Sends an HTTP `201 Created` status indicating that a new resource has been provisioned.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `data` | `unknown` | *(Optional)* The newly created record or resource descriptor. |

```typescript
router.post('/helper/created', {
  controller: (ctx) => {
    const newRecord = { id: 42, item: 'Subatom Configuration' };
    return ctx.res.helper.created(newRecord);
  }
});
```

#### res.helper.accepted([data])
Sends an HTTP `202 Accepted` status indicating that a request has been accepted for processing, but the processing has not completed.

```typescript
router.post('/helper/accepted', {
  controller: (ctx) => {
    return ctx.res.helper.accepted({
      jobId: 'job_9981',
      status: 'queued'
    });
  }
});
```

#### res.helper.non_authoritative_information([data])
Sends an HTTP `203 Non-Authoritative Information` status.

```typescript
ctx.res.helper.non_authoritative_information({
  mirrored: true,
  data: [1, 2, 3]
});
```

#### res.helper.no_content()
Sends an HTTP `204 No Content` status. Indicates success with no response entity body returned.

```typescript
router.delete('/helper/no-content', {
  controller: (ctx) => {
    return ctx.res.helper.no_content();
  }
});
```

#### res.helper.reset_content()
Sends an HTTP `205 Reset Content` status indicating that the agent should reset the document view which caused the request to be sent.

```typescript
ctx.res.helper.reset_content();
```

#### res.helper.partial_content([data])
Sends an HTTP `206 Partial Content` status, commonly used for chunked byte-range requests.

```typescript
ctx.res.helper.partial_content({
  range: 'bytes 0-1023/2048',
  chunk: 'SGVsbG8gU3ViYXRvbQ=='
});
```

#### res.helper.multi_status([data])
Sends an HTTP `207 Multi-Status` status (WebDAV).

```typescript
ctx.res.helper.multi_status([
  { href: '/files/1', status: 200 },
  { href: '/files/2', status: 404 }
]);
```

#### res.helper.already_reported([data])
Sends an HTTP `208 Already Reported` status (WebDAV).

```typescript
ctx.res.helper.already_reported({ synced: true });
```

#### res.helper.im_used([data])
Sends an HTTP `226 IM Used` status.

```typescript
ctx.res.helper.im_used({ delta: 'applied' });
```

---

### 3xx Redirection

#### res.helper.multiple_choices([data])
Sends an HTTP `300 Multiple Choices` status.

```typescript
ctx.res.helper.multiple_choices(['/version/v1', '/version/v2']);
```

#### res.helper.moved_permanently([data])
Sends an HTTP `301 Moved Permanently` status.

```typescript
ctx.res.helper.moved_permanently({ location: 'https://subatomjs.dev/docs/v2' });
```

#### res.helper.found([data])
Sends an HTTP `302 Found` status.

```typescript
ctx.res.helper.found({ location: '/login' });
```

#### res.helper.see_other([data])
Sends an HTTP `303 See Other` status.

```typescript
ctx.res.helper.see_other({ location: '/receipt/1029' });
```

#### res.helper.not_modified()
Sends an HTTP `304 Not Modified` status.

```typescript
ctx.res.helper.not_modified();
```

#### res.helper.use_proxy([data])
Sends an HTTP `305 Use Proxy` status.

```typescript
ctx.res.helper.use_proxy();
```

#### res.helper.temporary_redirect([data])
Sends an HTTP `307 Temporary Redirect` status.

```typescript
ctx.res.helper.temporary_redirect({ location: '/temp-endpoint' });
```

#### res.helper.permanent_redirect([data])
Sends an HTTP `308 Permanent Redirect` status.

```typescript
ctx.res.helper.permanent_redirect({ location: 'https://subatomjs.dev/canonical-path' });
```

---

## Error Helpers (4xx, 5xx)

All error helpers accept two optional parameters:
- `messageOrError`: Custom error message string or native `Error` instance.
- `details`: Supplemental context or structured diagnostics payload.

### 4xx Client Errors

#### res.helper.bad_request([messageOrError], [details])
Sends an HTTP `400 Bad Request` status.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `messageOrError` | `string \| Error` | *(Optional)* Human-readable error description. Defaults to `"Bad Request"`. |
| `details` | `unknown` | *(Optional)* Additional metadata or validation error maps. |

```typescript
router.post('/helper/bad-request', {
  controller: (ctx) => {
    return ctx.res.helper.bad_request('Invalid email address format', {
      field: 'email',
      code: 'INVALID_EMAIL'
    });
  }
});
```

#### res.helper.unauthorized([messageOrError], [details])
Sends an HTTP `401 Unauthorized` status when authentication credentials are missing or invalid.

```typescript
router.get('/helper/unauthorized', {
  controller: (ctx) => {
    return ctx.res.helper.unauthorized('Authentication token expired or missing');
  }
});
```

#### res.helper.payment_required([messageOrError], [details])
Sends an HTTP `402 Payment Required` status.

```typescript
router.post('/helper/payment-required', {
  controller: (ctx) => {
    return ctx.res.helper.payment_required('Subscription inactive', {
      upgradeUrl: '/billing/plans'
    });
  }
});
```

#### res.helper.forbidden([messageOrError], [details])
Sends an HTTP `403 Forbidden` status when client identity is recognized but access rights are denied.

```typescript
router.get('/helper/forbidden', {
  controller: (ctx) => {
    return ctx.res.helper.forbidden('Insufficient permissions for administrative area');
  }
});
```

#### res.helper.not_found([messageOrError], [details])
Sends an HTTP `404 Not Found` status.

```typescript
router.get('/helper/not-found', {
  controller: (ctx) => {
    return ctx.res.helper.not_found('Requested user resource was not found', {
      resourceId: 'usr_missing'
    });
  }
});
```

#### res.helper.method_not_allowed([messageOrError], [details])
Sends an HTTP `405 Method Not Allowed` status.

```typescript
ctx.res.helper.method_not_allowed('Method not permitted on this resource');
```

#### res.helper.not_acceptable([messageOrError], [details])
Sends an HTTP `406 Not Acceptable` status.

```typescript
ctx.res.helper.not_acceptable('Accept header does not match acceptable formats');
```

#### res.helper.proxy_authentication_required([messageOrError], [details])
Sends an HTTP `407 Proxy Authentication Required` status.

```typescript
ctx.res.helper.proxy_authentication_required('Proxy auth required');
```

#### res.helper.request_timeout([messageOrError], [details])
Sends an HTTP `408 Request Timeout` status.

```typescript
ctx.res.helper.request_timeout('Connection negotiation took too long');
```

#### res.helper.conflict([messageOrError], [details])
Sends an HTTP `409 Conflict` status, typically for unique key violations.

```typescript
router.post('/helper/conflict', {
  controller: (ctx) => {
    return ctx.res.helper.conflict('A user with this email address already exists', {
      duplicateKey: 'email'
    });
  }
});
```

#### res.helper.gone([messageOrError], [details])
Sends an HTTP `410 Gone` status indicating the resource has been permanently removed.

```typescript
ctx.res.helper.gone('This resource has been permanently purged');
```

#### res.helper.length_required([messageOrError], [details])
Sends an HTTP `411 Length Required` status.

```typescript
ctx.res.helper.length_required('Content-Length header required');
```

#### res.helper.precondition_failed([messageOrError], [details])
Sends an HTTP `412 Precondition Failed` status.

```typescript
ctx.res.helper.precondition_failed('ETag precondition failed');
```

#### res.helper.content_too_large([messageOrError], [details])
Sends an HTTP `413 Content Too Large` status.

```typescript
ctx.res.helper.content_too_large('File payload exceeds allowable 10MB limit');
```

#### res.helper.uri_too_long([messageOrError], [details])
Sends an HTTP `414 URI Too Long` status.

```typescript
ctx.res.helper.uri_too_long('URL exceeds 2048 character limit');
```

#### res.helper.unsupported_media_type([messageOrError], [details])
Sends an HTTP `415 Unsupported Media Type` status.

```typescript
ctx.res.helper.unsupported_media_type('Only application/json payloads are accepted');
```

#### res.helper.range_not_satisfiable([messageOrError], [details])
Sends an HTTP `416 Range Not Satisfiable` status.

```typescript
ctx.res.helper.range_not_satisfiable('Invalid byte range requested');
```

#### res.helper.expectation_failed([messageOrError], [details])
Sends an HTTP `417 Expectation Failed` status.

```typescript
ctx.res.helper.expectation_failed('Expect header unsatisfied');
```

#### res.helper.im_a_teapot([messageOrError], [details])
Sends an HTTP `418 I'm A Teapot` status (RFC 2324).

```typescript
ctx.res.helper.im_a_teapot('Short and stout: cannot brew coffee');
```

#### res.helper.misdirected_request([messageOrError], [details])
Sends an HTTP `421 Misdirected Request` status.

```typescript
ctx.res.helper.misdirected_request('Host mismatch');
```

#### res.helper.unprocessable_content([messageOrError], [details])
Sends an HTTP `422 Unprocessable Content` status, commonly used for validation error arrays.

```typescript
router.post('/helper/unprocessable-content', {
  controller: (ctx) => {
    return ctx.res.helper.unprocessable_content('Semantic validation failed', {
      errors: [
        { field: 'age', reason: 'Value must be positive integer' }
      ]
    });
  }
});
```

#### res.helper.locked([messageOrError], [details])
Sends an HTTP `423 Locked` status (WebDAV).

```typescript
ctx.res.helper.locked('Resource locked');
```

#### res.helper.failed_dependency([messageOrError], [details])
Sends an HTTP `424 Failed Dependency` status (WebDAV).

```typescript
ctx.res.helper.failed_dependency('Prior action failed');
```

#### res.helper.too_early([messageOrError], [details])
Sends an HTTP `425 Too Early` status.

```typescript
ctx.res.helper.too_early('Replay risk detected');
```

#### res.helper.upgrade_required([messageOrError], [details])
Sends an HTTP `426 Upgrade Required` status.

```typescript
ctx.res.helper.upgrade_required('TLS upgrade required');
```

#### res.helper.precondition_required([messageOrError], [details])
Sends an HTTP `428 Precondition Required` status.

```typescript
ctx.res.helper.precondition_required('Conditional headers missing');
```

#### res.helper.too_many_requests([messageOrError], [details])
Sends an HTTP `429 Too Many Requests` status when rate limits are exceeded.

```typescript
router.get('/helper/too-many-requests', {
  controller: (ctx) => {
    return ctx.res.helper.too_many_requests('Rate limit exceeded', {
      retryAfterSeconds: 60
    });
  }
});
```

#### res.helper.request_header_fields_too_large([messageOrError], [details])
Sends an HTTP `431 Request Header Fields Too Large` status.

```typescript
ctx.res.helper.request_header_fields_too_large('Headers exceed max size');
```

#### res.helper.unavailable_for_legal_reasons([messageOrError], [details])
Sends an HTTP `451 Unavailable For Legal Reasons` status.

```typescript
ctx.res.helper.unavailable_for_legal_reasons('Blocked per court order');
```

---

### 5xx Server Errors

#### res.helper.internal_server_error([messageOrError], [details])
Sends an HTTP `500 Internal Server Error` status. Accepts either a string description or a native `Error` object.

```typescript
router.get('/helper/internal-server-error', {
  controller: (ctx) => {
    try {
      throw new Error('Database connection pool exhausted');
    } catch (err) {
      return ctx.res.helper.internal_server_error(err as Error, {
        traceId: 'trc_982347a'
      });
    }
  }
});
```

#### res.helper.not_implemented([messageOrError], [details])
Sends an HTTP `501 Not Implemented` status.

```typescript
ctx.res.helper.not_implemented('GraphQL queries are not yet supported');
```

#### res.helper.bad_gateway([messageOrError], [details])
Sends an HTTP `502 Bad Gateway` status.

```typescript
ctx.res.helper.bad_gateway('Upstream microservice returned an invalid response');
```

#### res.helper.service_unavailable([messageOrError], [details])
Sends an HTTP `503 Service Unavailable` status.

```typescript
router.get('/helper/service-unavailable', {
  controller: (ctx) => {
    return ctx.res.helper.service_unavailable('System undergoing maintenance', {
      estimatedDurationSec: 300
    });
  }
});
```

#### res.helper.gateway_timeout([messageOrError], [details])
Sends an HTTP `504 Gateway Timeout` status.

```typescript
ctx.res.helper.gateway_timeout('Upstream database took too long to reply');
```

#### res.helper.http_version_not_supported([messageOrError], [details])
Sends an HTTP `505 HTTP Version Not Supported` status.

```typescript
ctx.res.helper.http_version_not_supported('HTTP/3 required');
```

#### res.helper.variant_also_negotiates([messageOrError], [details])
Sends an HTTP `506 Variant Also Negotiates` status.

```typescript
ctx.res.helper.variant_also_negotiates('Content negotiation loop');
```

#### res.helper.insufficient_storage([messageOrError], [details])
Sends an HTTP `507 Insufficient Storage` status (WebDAV).

```typescript
ctx.res.helper.insufficient_storage('Disk quota exceeded');
```

#### res.helper.loop_detected([messageOrError], [details])
Sends an HTTP `508 Loop Detected` status (WebDAV).

```typescript
ctx.res.helper.loop_detected('Infinite redirection loop');
```

#### res.helper.not_extended([messageOrError], [details])
Sends an HTTP `510 Not Extended` status.

```typescript
ctx.res.helper.not_extended('Mandatory extension missing');
```

#### res.helper.network_authentication_required([messageOrError], [details])
Sends an HTTP `511 Network Authentication Required` status.

```typescript
ctx.res.helper.network_authentication_required('Captive portal intercept');
```

---

## HTTP Status Registry

Subatom provides the immutable registry map `HTTP_STATUS_REGISTRY` containing status metadata, error classification, and title-cased fallback strings.

```typescript
import { HTTP_STATUS_REGISTRY } from 'subatom';

const status = HTTP_STATUS_REGISTRY.get('bad_request');
console.log(status);
// {
//   code: 400,
//   message: 'bad_request',
//   isError: true,
//   defaultMessage: 'Bad Request'
// }
```

---

## Type Definitions

```typescript
export interface IHttpStatusEntry {
  code: number;
  message: TSuccessHelperName | TErrorHelperName;
  isError: boolean;
  defaultMessage: string;
}

export type IResponseHelper = {
  [K in TSuccessHelperName]: (data?: unknown) => IResponse;
} & {
  [K in TErrorHelperName]: (
    messageOrError?: string | Error,
    details?: unknown,
  ) => IResponse;
};
```

---

## License

MIT © [Kunal Chandra Das](mailto:kunal@subatomjs.dev) — [Subatom](https://subatomjs.dev)
