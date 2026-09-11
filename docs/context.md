> **Documentation status — public API reference**
>
> This page consolidates the detailed Subatom reference material supplied with the framework implementation examples. Treat the exported/public API surface as authoritative; internal implementation details are intentionally not presented as application APIs.

# Context (ctx)

The `ctx` object encapsulates the entire HTTP exchange cycle in Subatom, acting as a unified facade wrapping the incoming request (`ctx.req`) and outgoing response (`ctx.res`).

Every route handler and controller receives `ctx` as its single argument. It provides schema-inferred request data getters, connection metadata, and convenient delegation methods to manipulate headers, cookies, and responses without directly touching underlying low-level abstractions.

```typescript
router.get('/user/:id', {
  controller: (ctx) => {
    return ctx.status(200).json({
      id: ctx.params.id,
      userAgent: ctx.get('User-Agent'),
      clientIp: ctx.ip,
    });
  }
});
```

---

## Table of Contents

- [Underlying Abstractions & Aliases](#underlying-abstractions--aliases)
  - [ctx.req / ctx.request](#ctxreq--ctxrequest)
  - [ctx.res / ctx.response](#ctxres--ctxresponse)
- [Inferred Request Data Properties](#inferred-request-data-properties)
  - [ctx.params](#ctxparams)
  - [ctx.query](#ctxquery)
  - [ctx.body](#ctxbody)
  - [ctx.headers](#ctxheaders)
  - [ctx.cookies](#ctxcookies)
  - [ctx.file / ctx.files](#ctxfile--ctxfiles)
  - [ctx.user](#ctxuser)
  - [ctx.locals](#ctxlocals)
- [Request Metadata Properties](#request-metadata-properties)
  - [ctx.ip](#ctxip)
  - [ctx.method](#ctxmethod)
  - [ctx.path](#ctxpath)
  - [ctx.url](#ctxurl)
  - [ctx.protocol](#ctxprotocol)
  - [ctx.secure](#ctxsecure)
  - [ctx.host](#ctxhost)
  - [ctx.hostname](#ctxhostname)
  - [ctx.session / ctx.sessionID](#ctxsession--ctxsessionid)
- [Response Status Inspection Properties](#response-status-inspection-properties)
  - [ctx.headersSent](#ctxheaderssent)
  - [ctx.writableEnded](#ctxwritableended)
  - [ctx.statusCode](#ctxstatuscode)
  - [ctx.helper](#ctxhelper)
- [Request Facade Methods](#request-facade-methods)
  - [ctx.get()](#ctxgetheadername)
  - [ctx.accepts()](#ctxacceptstypes)
- [Response Facade Methods](#response-facade-methods)
  - [ctx.status()](#ctxstatuscode)
  - [ctx.set() / ctx.header() / ctx.setHeader()](#ctxsetname-value)
  - [ctx.type() / ctx.contentType()](#ctxtypetype)
  - [ctx.cookie()](#ctxcookiename-value-options)
  - [ctx.clearCookie()](#ctxclearcookiename-options)
  - [ctx.send()](#ctxsendbody)
  - [ctx.json()](#ctxjsondata)
  - [ctx.html()](#ctxhtmlhtmlcontent)
  - [ctx.redirect()](#ctxredirecturl-statuscode)
  - [ctx.attachment()](#ctxattachmentfilename)
  - [ctx.sendFile()](#ctxsendfilepath-options)
  - [ctx.download()](#ctxdownloadfilepath-filename-options)
  - [ctx.stream()](#ctxstreamreadablestream)
  - [ctx.format()](#ctxformathandlers-requestheaders)
  - [ctx.end()](#ctxendchunk)
- [Context Factory (`getOrCreateContext`)](#context-factory-getorcreatecontext)

---

## Underlying Abstractions & Aliases

### ctx.req / ctx.request

Points to the internal Subatom typed request abstraction (`IRequest`). `ctx.request` is an identical getter alias for `ctx.req`.

```typescript
const nativePath = ctx.req.path;
const samePath = ctx.request.path;
```

---

### ctx.res / ctx.response

Points to the Subatom response abstraction (`IResponse`). `ctx.response` is an identical getter alias for `ctx.res`.

```typescript
ctx.res.status(200);
ctx.response.send("Hello");
```

---

## Inferred Request Data Properties

Subatom leverages schema inference (supporting `subatom-infer`, Standard Schema, Zod, Valibot, and plain object definitions). Request data getters automatically infer their TypeScript types from the route schema.

### ctx.params

Contains route parameters specified in the route path (e.g. `/users/:id`). Defaults to `{}` if no parameters exist.

```typescript
// Route: /users/:id
const userId = ctx.params.id;
```

---

### ctx.query

Contains key-value pairs parsed from the URL query string (e.g. `?sort=asc&limit=10`). Defaults to `{}`.

```typescript
// GET /products?sort=asc&limit=10
const { sort, limit } = ctx.query;
```

---

### ctx.body

Contains the parsed incoming request body payload (JSON, form-data, or raw buffer).

```typescript
router.post('/login', {
  controller: (ctx) => {
    const { email, password } = ctx.body;
    return ctx.json({ status: "verifying" });
  }
});
```

---

### ctx.headers

Contains the incoming HTTP request headers dictionary as lowercase key-value pairs.

```typescript
const authHeader = ctx.headers['authorization'];
```

---

### ctx.cookies

Contains the parsed cookies sent by the client. Defaults to `{}` if no cookies were supplied.

```typescript
const sessionToken = ctx.cookies['session_token'];
```

---

### ctx.file / ctx.files

Provides access to uploaded files parsed during multipart request handling.

- `ctx.file`: Represents a single uploaded file (`IFileUpload | undefined`).
- `ctx.files`: Represents a dictionary of uploaded files (`FilesMap` or schema-inferred files).

```typescript
router.post('/avatar', {
  middleware:[
    file.single("avatar", {
  storage: "memory",
  allowedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
  ],
})
  ]
  controller: (ctx) => {
    const avatar = ctx.file as IFileUpload | undefined;
    console.log(avatar?.filename, avatar?.size);
    return ctx.status(201).json({ uploaded: true });
  }
});
```

---

### ctx.user

A mutable property reserved for holding authenticated user details. Commonly populated by authentication middleware.

```typescript
// In auth middleware:
ctx.user = { id: "usr_102", role: "admin" };

// In controller:
const currentUser = ctx.user;
```

---

### ctx.locals

A mutable dictionary reserved for passing request-scoped variables across middleware and route handlers (e.g. request IDs, timings, database transactions).

```typescript
ctx.locals.traceId = "trc_998127364";
ctx.locals.startedAt = Date.now();
```

---

## Request Metadata Properties

### ctx.ip

Returns the client's IP address (derived from connection sockets or proxy headers like `X-Forwarded-For`).

```typescript
const clientIp = ctx.ip;
```

---

### ctx.method

Returns the HTTP method of the request in uppercase (`GET`, `POST`, `PUT`, `DELETE`, etc.).

```typescript
if (ctx.method === 'POST') {
  // handle submission
}
```

---

### ctx.path

Returns the path portion of the request URL (excluding protocol, host, and query string).

```typescript
// Request: GET /api/v1/users?page=1
ctx.path; // => "/api/v1/users"
```

---

### ctx.url

Returns the full relative request URL, including query parameters.

```typescript
// Request: GET /api/v1/users?page=1
ctx.url; // => "/api/v1/users?page=1"
```

---

### ctx.protocol

Returns the HTTP protocol string: `"http"` or `"https"`.

```typescript
const isSecure = ctx.protocol === "https";
```

---

### ctx.secure

Boolean shorthand indicating whether the request is transmitted over TLS/HTTPS (`true` if `ctx.protocol === "https"`).

```typescript
if (!ctx.secure) {
  return ctx.redirect(`https://${ctx.host}${ctx.url}`, 301);
}
```

---

### ctx.host

Returns the host value derived from the `Host` HTTP header (includes hostname and port if present).

```typescript
// Host: localhost:3000
ctx.host; // => "localhost:3000"
```

---

### ctx.hostname

Returns the hostname portion of the `Host` header without the port number.

```typescript
// Host: localhost:3000
ctx.hostname; // => "localhost"
```

---

### ctx.session / ctx.sessionID

Provides access to the active session abstraction and unique session ID if a session middleware pipeline is attached.

```typescript
const id = ctx.sessionID;
ctx.session.set('visited', true);
```

---

## Response Status Inspection Properties

### ctx.headersSent

Boolean property indicating whether HTTP headers have already been sent to the client.

```typescript
if (!ctx.headersSent) {
  ctx.status(500).send("Error");
}
```

---

### ctx.writableEnded

Boolean property indicating whether `res.end()` has been invoked and response transmission has finished.

```typescript
if (ctx.writableEnded) {
  // Response completed
}
```

---

### ctx.statusCode

Inspects the current numeric HTTP status code set for the response. Defaults to `200`.

```typescript
ctx.status(202);
console.log(ctx.statusCode); // => 202
```

---

### ctx.helper

Direct facade to the Subatom standardized HTTP Response Helper (`IResponseHelper`). Allows invoking semantic status shortcuts (`ctx.helper.success()`, `ctx.helper.not_found()`, etc.).

```typescript
return ctx.helper.created({ id: 101, created: true });
```

---

## Request Facade Methods

### ctx.get(headerName)

Returns the value of the specified HTTP request header. The lookup is case-insensitive.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `headerName` | `string` | The header field to retrieve. |

```typescript
const userAgent = ctx.get('User-Agent');
const auth = ctx.get('authorization');
```

---

### ctx.accepts(...types)

Checks if the specified content types are acceptable based on the request's `Accept` HTTP header.

- When given a single string, returns `boolean` (`true` if accepted, otherwise `false`).
- When given multiple strings or an array of strings, returns the best match string, or `false`.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `types` | `string \| string[]` | MIME types or extensions to check (`'json'`, `'text/html'`, `'application/json'`). |

```typescript
// Single string check -> boolean
if (ctx.accepts('application/json')) {
  return ctx.json({ status: 'ok' });
}

// Multiple arguments -> returns best matching string or false
const match = ctx.accepts('text/html', 'application/json');

// Array parameter -> returns best matching string or false
const bestFormat = ctx.accepts(['text/plain', 'application/json']);
```

---

## Response Facade Methods

`Context` delegates standard response methods directly to `ctx.res`, enabling clean chaining and concise syntax.

### ctx.status(code)

Sets the HTTP status code for the response. Returns `this` for chaining.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `code` | `number` | A 3-digit standard HTTP status code. |

```typescript
ctx.status(404).send('Not Found');
```

---

### ctx.set(name, [value])

Sets the outgoing response HTTP header `name` to `value`. To set multiple headers at once, pass an object.

Aliases: `ctx.header()`, `ctx.setHeader()`.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string \| Record<string, string \| string[]>` | Header name string or dictionary of header names and values. |
| `value` | `string \| string[]` | Header value or array of values (if `name` is a string). |

```typescript
// Single header
ctx.set('X-Custom-Header', 'Subatom');

// Method aliases
ctx.header('X-App-Version', '1.0.0');
ctx.setHeader('X-Trace-ID', 'trc_12345');

// Multiple headers
ctx.set({
  'Cache-Control': 'no-store',
  'X-Powered-By': 'Subatom Framework'
});
```

---

### ctx.type(type)

Sets the `Content-Type` response header to the specified MIME type.

Alias: `ctx.contentType()`.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `type` | `string` | MIME type string (e.g. `'application/json'`, `'text/html'`). |

```typescript
ctx.type('application/json');
ctx.contentType('application/json; charset=utf-8');
```

---

### ctx.cookie(name, value, [options])

Sets a cookie with the specified name, value, and options. Returns `this` for chaining.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | Name of the cookie. |
| `value` | `string` | Value string of the cookie. |
| `options` | `CookieOptions` | *(Optional)* Cookie configuration options (`httpOnly`, `secure`, `sameSite`, `maxAge`, `path`, `domain`, `expires`). |

```typescript
ctx.cookie('session_token', 'xyz123', {
  httpOnly: true,
  secure: true,
  sameSite: 'Lax',
  maxAge: 3600000,
  path: '/'
});
```

---

### ctx.clearCookie(name, [options])

Clears the cookie specified by `name`. The `path` and `domain` options must match the options used when the cookie was set.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | Name of the cookie to remove. |
| `options` | `CookieOptions` | *(Optional)* Options specifying `path` and `domain`. |

```typescript
ctx.clearCookie('session_token', { path: '/' });
```

---

### ctx.send([body])

Sends the HTTP response payload. The body can be a `string`, `Buffer`, `Uint8Array`, or `object` (which automatically delegates to `ctx.json()`).

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `body` | `string \| Buffer \| Uint8Array \| object` | *(Optional)* The payload to transmit. |

```typescript
ctx.send('Hello from Subatom Context');
```

---

### ctx.json(data)

Sends a JSON response with `Content-Type: application/json`. Returns `this`.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `data` | `unknown` | Object, array, or serializable value converted using `JSON.stringify()`. |

```typescript
return ctx.status(200).json({ status: "ok", data: [1, 2, 3] });
```

---

### ctx.html(htmlContent)

Sends an HTML response with `Content-Type: text/html; charset=utf-8`. Returns `this`.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `htmlContent` | `string` | HTML markup string. |

```typescript
return ctx.html('<h1>Welcome to Subatom</h1>');
```

---

### ctx.redirect(url, [statusCode])

Redirects the client to the specified destination URL with an HTTP status code (defaults to `302 Found`).

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `url` | `string` | Destination URL path. |
| `statusCode` | `number` | *(Optional)* HTTP status code. Defaults to `302`. |

```typescript
router.get('/old-dashboard', {
  controller: (ctx) => {
    return ctx.redirect('/dashboard', 301);
  }
});
```

> **Prefix Note:** If your router is mounted with a route prefix (e.g. `/api/v1`), provide the full URL path:
> ```typescript
> return ctx.redirect('/api/v1/dashboard', 302);
> ```

---

### ctx.attachment([filename])

Sets the HTTP `Content-Disposition` header to `"attachment"`. If `filename` is given, it sets the filename attribute and configures the `Content-Type` header based on extension.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `filename` | `string` | *(Optional)* Recommended filename for download. |

```typescript
ctx.attachment('monthly-invoice.pdf');
ctx.send(pdfBuffer);
```

---

### ctx.sendFile(filePath, [options])

Transfers a file located at `filePath` inline. Sets `Content-Type` automatically based on file extension.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `filePath` | `string` | Absolute or relative path to the file. |
| `options` | `SendFileOptions` | *(Optional)* Options such as `root` (security boundary) and `contentType`. |

```typescript
const file = path.resolve('./assets/avatar.png');
ctx.sendFile(file);
```

---

### ctx.download(filePath, [filename], [options])

Transfers the file at `filePath` as a forced attachment download.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `filePath` | `string` | Absolute or relative path to file. |
| `filename` | `string` | *(Optional)* The downloaded filename presented to the client. |
| `options` | `DownloadOptions` | *(Optional)* Download configurations (`root`, `contentType`). |

```typescript
const reportPath = path.resolve('./reports/report.csv');
ctx.download(reportPath, 'annual-report.csv');
```

---

### ctx.stream(readableStream)

Pipes a Node.js `Readable` stream to the client and returns a `Promise<void>`. Stream errors are caught automatically to prevent unhandled process crashes.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `readableStream` | `NodeJS.ReadableStream` | Source readable stream to pipe. |

```typescript
import { Readable } from 'node:stream';

router.get('/stream-data', {
  controller: async (ctx) => {
    const stream = Readable.from(['Chunk 1\n', 'Chunk 2\n']);
    await ctx.stream(stream);
  }
});
```

---

### ctx.format(handlers, [requestHeaders])

Performs content negotiation based on the `Accept` request header. Matches against the provided MIME handler callbacks.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `handlers` | `FormatHandlers` | Mapping of content types (`'text/plain'`, `'text/html'`, `'application/json'`, `'default'`) to handlers. |
| `requestHeaders` | `Record<string, ...>` | *(Optional)* Custom headers to evaluate instead of `ctx.req.headers`. |

```typescript
router.get('/feed', {
  controller: (ctx) => {
    return ctx.format({
      'text/plain': () => {
        ctx.send('text format response');
      },
      'text/html': () => {
        ctx.html('<p>html format response</p>');
      },
      'application/json': () => {
        ctx.json({ format: 'json' });
      },
      default: () => {
        ctx.status(406).send('Not Acceptable');
      }
    });
  }
});
```

---

### ctx.end([chunk])

Immediately ends the response process, bypassing higher-level response formatters.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `chunk` | `unknown` | *(Optional)* Final chunk or payload to write before ending. |

```typescript
ctx.status(200);
ctx.end("Stream finalized");
```

---

## Context Factory (`getOrCreateContext`)

Subatom internally maintains a single instance of `Context` per request using a symbol key on `req` (`Symbol.for("subatom.context")`). You can obtain or instantiate the `Context` using the factory utility:

```typescript
import { getOrCreateContext } from 'subatom';

const ctx = getOrCreateContext(req, res);
```

If a `Context` instance was already created earlier in the request lifecycle (e.g. by prior middleware), `getOrCreateContext` returns the existing instance without re-instantiation.

---

## License

MIT © [Kunal Chandra Das](mailto:kunal@subatomjs.dev) — [Subatom](https://subatomjs.dev)
