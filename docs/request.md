> **Documentation status — public API reference**
>
> This page consolidates the detailed Subatom reference material supplied with the framework implementation examples. Treat the exported/public API surface as authoritative; internal implementation details are intentionally not presented as application APIs.

# Subatom Request

The `req` object gives you everything you need to work with an incoming HTTP request in **Subatom**.

If you have used Express.js, the idea is very similar:

```ts
app.get("/users/:id", (req, res) => {
  console.log(req.params.id);
});
```

In Subatom, request data is available through the context object:

```ts
import { type IContext } from "subatom";

const controller = async (ctx: IContext) => {
  console.log(ctx.req.params.id);
};
```

The `Request` object is designed as a developer-friendly wrapper around Node.js's native `IncomingMessage`. It provides parsed request data, request metadata, HTTP helpers, body readers, and streaming methods.

---

## Quick example

```ts
import { Router, type IContext } from "subatom";

const router = new Router();

router.get("/users/:id", {
  controller: async (ctx: IContext) => {
    const userId = ctx.req.params.id;
    const search = ctx.req.query.search;

    return ctx.res.json({
      userId,
      search,
    });
  },
});
```

For a request such as:

```text
GET /users/123?search=john
```

you can access:

```ts
ctx.req.params.id    // "123"
ctx.req.query.search // "john"
```

---

# Request Data

These properties contain data sent by the client or data added to the request during request processing.

| Property | Description |
| --- | --- |
| `req.body` | Parsed request body |
| `req.query` | Query-string parameters |
| `req.params` | Route parameters |
| `req.cookies` | Parsed cookies |
| `req.user` | Current user attached by your application |
| `req.locals` | Request-local application data |
| `req.file` | A single uploaded file |
| `req.files` | Uploaded files |

## `req.body`

Contains the request body.

For example, a client sends:

```json
{
  "userName": "john doe",
  "email": "johndoe@example.com"
}
```

You can read it with:

```ts
const { userName, email } = ctx.req.body;
```

Or access individual values:

```ts
ctx.req.body.userName;
ctx.req.body.email;
```

### With a schema

When a route has a schema, Subatom's types can infer the request body.

```ts
import { infer } from "subatom-infer";

const schema = {
  body: {
    userName: infer.string().min(2),
    email: infer.string().email(),
  },
};

router.post("/users", {
  schema,

  controller: async (ctx) => {
    const { userName, email } = ctx.req.body;

    return ctx.res.json({
      userName,
      email,
    });
  },
});
```

---

## `req.query`

Contains values from the URL query string.

For:

```text
GET /products?search=macBook&page=2
```

you can use:

```ts
const { search, page } = ctx.req.query;

console.log(search);
console.log(page);
```

Query values originate from the URL and are represented as strings unless your schema/inference layer resolves them to another type.

### Example schema

```ts
const schema = {
  query: {
    search: infer.string().optional(),
    page: infer.number().int().min(1).optional(),
  },
};
```

Then:

```ts
router.get("/products", {
  schema,

  controller: async (ctx) => {
    const { search, page } = ctx.req.query;

    return ctx.res.json({
      search,
      page,
    });
  },
});
```

---

## `req.params`

Contains route parameters.

Given this route:

```ts
router.get("/users/:userId/posts/:postId", {
  controller: async (ctx) => {
    const { userId, postId } = ctx.req.params;

    return ctx.res.json({
      userId,
      postId,
    });
  },
});
```

For:

```text
GET /users/123/posts/456
```

the values are:

```ts
ctx.req.params.userId // "123"
ctx.req.params.postId // "456"
```

Route parameters are strings by default.

---

## `req.cookies`

Contains cookies parsed from the request's `Cookie` header.

```ts
const { access_token, theme } = ctx.req.cookies;

console.log(access_token);
console.log(theme);
```

For example, if the client sends cookies containing:

```text
access_token=abc123; theme=dark
```

you can access them through:

```ts
ctx.req.cookies.access_token;
ctx.req.cookies.theme;
```

---

## `req.user`

`req.user` is application-defined user data.

Subatom does not require a specific user shape. Your authentication middleware can attach the authenticated user to the request.

```ts
const authMiddleware = async (ctx: IContext, next: NextFunction) => {
  ctx.req.user = {
    id: "usr_1001",
    role: "admin",
    email: "admin@subatomjs.dev",
  };

  await next();
};
```

Then a controller can read it:

```ts
router.get("/profile", {
  middleware: [authMiddleware],

  controller: async (ctx) => {
    const user = ctx.req.user;

    return ctx.res.json({
      user,
    });
  },
});
```

The exact shape of `req.user` is controlled by your application's types and middleware.

---

## `req.locals`

`req.locals` is a place to store request-specific data while a request moves through middleware and controllers.

For example:

```ts
const traceMiddleware = async (ctx: IContext, next: NextFunction) => {
  ctx.req.locals.traceId = `subatom_${Date.now()}`;

  await next();
};
```

Later:

```ts
router.get("/request-info", {
  middleware: [traceMiddleware],

  controller: async (ctx) => {
    return ctx.res.json({
      traceId: ctx.req.locals.traceId,
    });
  },
});
```

Use `locals` for data that belongs to the current request and needs to be shared between middleware and the controller.

---

# File Uploads

Subatom exposes uploaded files through `req.file` and `req.files`.

These are populated when the appropriate file middleware is used.

## `req.file`

Use `req.file` for a single uploaded file.

Example route:

```ts
import { file } from "subatom";

const uploadSchema = {
  files: {
    avatar: infer.file().max(
      5 * 1024 * 1024,
      "Max file size is 5MB",
    ),
  },
};

router.post("/profile/avatar", {
  schema: uploadSchema,

  middleware: [
    file.single("avatar", {
      storage: "memory",
      allowedMimeTypes: [
        "image/webp",
        "image/jpeg",
        "image/png",
      ],
    }),
  ],

  controller: async (ctx) => {
    const uploadedFile = ctx.req.file;

    return ctx.res.json({
      fileName: uploadedFile?.filename,
      mimeType: uploadedFile?.mimetype,
      size: uploadedFile?.size,
    });
  },
});
```

Read the uploaded file with:

```ts
const file = ctx.req.file;
```

The request type exposes it as an uploaded-file value when available.

---

## `req.files`

Use `req.files` when multiple files are uploaded.

```ts
router.post("/documents", {
  middleware: [
    file.array("documents", 5, {
      storage: "memory",
      allowedMimeTypes: [
        "image/svg",
        "image/jpeg",
        "image/png",
      ],
    }),
  ],

  controller: async (ctx) => {
    const uploadedFiles = ctx.req.files;

    return ctx.res.json({
      count: Array.isArray(uploadedFiles)
        ? uploadedFiles.length
        : 0,
    });
  },
});
```

With a schema, you can describe the expected files:

```ts
const schema = {
  files: {
    documents: infer
      .files()
      .min(1)
      .max(5)
      .minEach(500)
      .maxEach(2 * 1024 * 1024)
      .mime("image/*")
      .extension(["svg", "jpeg", "jpg", "png"]),
  },
};
```

---

# Request Metadata

Subatom exposes common HTTP request metadata directly on `req`.

| Property | Description |
| --- | --- |
| `req.raw` | Native Node.js `IncomingMessage` |
| `req.method` | HTTP method |
| `req.url` | Request URL |
| `req.path` | URL pathname |
| `req.headers` | Request headers |
| `req.protocol` | `http` or `https` |
| `req.host` | Request host |
| `req.hostname` | Hostname without the port |
| `req.ip` | Resolved client IP |
| `req.secure` | Whether the request uses HTTPS |

## `req.raw`

The original Node.js request object.

```ts
const nativeRequest = ctx.req.raw;
```

Its type is:

```ts
IncomingMessage
```

Use `req.raw` when you need functionality provided directly by Node.js that is not exposed by the Subatom request API.

---

## `req.method`

The HTTP method.

```ts
ctx.req.method;
```

Examples:

```text
GET
POST
PUT
PATCH
DELETE
```

The request implementation normalizes the method to uppercase.

---

## `req.url`

The request URL.

```ts
ctx.req.url;
```

Example:

```text
/users/123?active=true
```

---

## `req.path`

The pathname portion of the URL.

```ts
ctx.req.path;
```

For:

```text
/users/123?active=true
```

the path is:

```text
/users/123
```

---

## `req.headers`

Contains the request headers.

```ts
const contentType = ctx.req.headers["content-type"];
const userAgent = ctx.req.headers["user-agent"];
```

The type allows:

```ts
string | string[] | undefined
```

for header values.

For most common header access, prefer `req.get()`.

---

## `req.protocol`

The protocol used by the request:

```ts
ctx.req.protocol;
```

It is:

```ts
"http" | "https"
```

---

## `req.host`

The resolved request host.

```ts
ctx.req.host;
```

---

## `req.hostname`

The hostname without the port.

```ts
ctx.req.hostname;
```

For example, a host such as:

```text
example.com:3000
```

has a hostname of:

```text
example.com
```

---

## `req.ip`

The resolved client IP address.

```ts
ctx.req.ip;
```

Proxy handling can be enabled through `RequestOptions.trustProxy` or the `SUBATOM_TRUST_PROXY` environment setting.

---

## `req.secure`

A boolean indicating whether the request uses HTTPS.

```ts
if (ctx.req.secure) {
  // HTTPS request
}
```

---

# Sessions

Subatom's request object also exposes session information.

## `req.session`

Access the current session:

```ts
const session = ctx.req.session;
```

## `req.sessionID`

Access the current session ID:

```ts
const sessionId = ctx.req.sessionID;
```

The request types expose these as `ISession` and `string` respectively.

---

# HTTP Helper Methods

## `req.get(name)`

Reads a request header.

```ts
const apiKey = ctx.req.get("x-api-key");
const userAgent = ctx.req.get("user-agent");
```

It returns:

```ts
string | undefined
```

If the header does not exist, the result is `undefined`.

Example:

```ts
const apiKey = ctx.req.get("x-api-key");

if (!apiKey) {
  return ctx.res.status(401).json({
    error: "API key is required",
  });
}
```

---

## `req.accepts()`

Checks the request's `Accept` header.

### Check one type

When one string is passed, it returns a boolean:

```ts
const acceptsJson = ctx.req.accepts("application/json");

if (acceptsJson) {
  // Client accepts JSON
}
```

Return type:

```ts
boolean
```

### Check multiple types

When multiple types are provided, it returns the first matching type or `false`.

```ts
const bestMatch = ctx.req.accepts(
  "text/html",
  "application/json",
);
```

You can also pass an array:

```ts
const bestMatch = ctx.req.accepts([
  "text/html",
  "application/json",
]);
```

Return type:

```ts
string | false
```

---

# Reading the Request Body

Subatom provides methods for reading the raw request stream in different formats.

| Method | Returns |
| --- | --- |
| `req.text()` | `Promise<string>` |
| `req.json()` | `Promise<T>` |
| `req.formData()` | `Promise<URLSearchParams>` |
| `req.buffer()` | `Promise<Buffer>` |

Each method accepts an optional byte limit:

```ts
await ctx.req.text(limitInBytes);
await ctx.req.json(limitInBytes);
await ctx.req.formData(limitInBytes);
await ctx.req.buffer(limitInBytes);
```

The limit is useful when you want to restrict how much request data can be read.

---

## `req.text()`

Reads the request body as text.

```ts
const rawText = await ctx.req.text();

return ctx.res.send(
  `Received text (${rawText.length} bytes): ${rawText}`,
);
```

You can provide a maximum size:

```ts
const rawText = await ctx.req.text(
  1024 * 1024,
);
```

The example above limits the read to 1 MB.

---

## `req.json()`

Reads the request body as JSON.

```ts
const data = await ctx.req.json();

return ctx.res.json({
  received: data,
});
```

You can provide a type parameter:

```ts
type User = {
  name: string;
  email: string;
};

const user = await ctx.req.json<User>();

console.log(user.name);
console.log(user.email);
```

You can also provide a byte limit:

```ts
const data = await ctx.req.json<MyBody>(
  1024 * 1024,
);
```

---

## `req.formData()`

Reads the request body as form data.

```ts
const form = await ctx.req.formData();

const title = form.get("title");
const active = form.get("active");
```

The method returns:

```ts
URLSearchParams
```

If a validator has already consumed the request body and populated `req.body`, use `req.body` instead of attempting to read the stream again.

---

## `req.buffer()`

Reads the request body as a `Buffer`.

```ts
const buffer = await ctx.req.buffer();

console.log(buffer.byteLength);
```

You can specify a maximum size:

```ts
const buffer = await ctx.req.buffer(
  1024 * 1024,
);
```

The example limits the request body to 1 MB.

This is useful when you need the raw bytes of the request body.

---

# Request Streams

For large payloads or streaming workloads, you can work directly with the request stream instead of loading the entire body into memory.

| Method | Purpose |
| --- | --- |
| `req.onData()` | Listen for incoming data chunks |
| `req.onEnd()` | Listen for the end of the request |
| `req.pipe()` | Pipe the request into a writable stream |
| `req.stream()` | Get a readable stream |

---

## `req.onData()`

Runs a callback whenever a request data chunk arrives.

```ts
const unbind = ctx.req.onData((chunk) => {
  console.log(chunk);
});
```

The method returns an unsubscribe function:

```ts
unbind();
```

Example:

```ts
let chunks = 0;
let totalBytes = 0;

const unbind = ctx.req.onData((chunk: Buffer) => {
  chunks++;
  totalBytes += chunk.length;
});

ctx.req.onEnd(() => {
  unbind();

  console.log({
    chunks,
    totalBytes,
  });
});
```

---

## `req.onEnd()`

Runs a callback when the request stream ends.

```ts
ctx.req.onEnd(() => {
  console.log("Request finished");
});
```

It also returns an unsubscribe function:

```ts
const unbind = ctx.req.onEnd(() => {
  // ...
});

unbind();
```

---

## `req.pipe()`

Pipes the incoming request into a writable stream.

```ts
import { createWriteStream } from "node:fs";

const destination = createWriteStream(
  "./uploaded.bin",
);

ctx.req.pipe(destination);
```

Because `pipe()` uses Node.js streams, it is useful for processing large request bodies without first loading the complete body into memory.

Example:

```ts
const destination = createWriteStream(
  "./streamed_output.bin",
);

await new Promise((resolve, reject) => {
  destination.on("finish", resolve);
  destination.on("error", reject);

  ctx.req.pipe(destination);
});
```

---

## `req.stream()`

Returns the request as a Node.js readable stream.

```ts
const stream = ctx.req.stream();

stream.on("data", (chunk) => {
  console.log(chunk);
});

stream.on("end", () => {
  console.log("Request finished");
});
```

A practical example is calculating a hash while the request is streamed:

```ts
import { createHash } from "node:crypto";

const stream = ctx.req.stream();
const hash = createHash("sha256");

stream.on("data", (chunk: Buffer) => {
  hash.update(chunk);
});

stream.on("end", () => {
  console.log(hash.digest("hex"));
});
```

---

# Request vs Context

In a Subatom controller, you normally receive a `Context` object:

```ts
controller: async (ctx) => {
  // ...
}
```

The request is available as:

```ts
ctx.req
```

So:

```ts
ctx.req.body
ctx.req.query
ctx.req.params
ctx.req.headers
```

The `Context` also provides convenient request aliases:

```ts
ctx.body
ctx.query
ctx.params
ctx.headers
ctx.cookies
ctx.file
ctx.files
ctx.user
ctx.locals
```

For example:

```ts
// Explicit request access
const userId = ctx.req.params.userId;

// Context shortcut
const sameUserId = ctx.params.userId;
```

The context facade maps these values back to the underlying request.

You can also access the underlying request and response through:

```ts
ctx.request
ctx.response
```

`ctx.request` is an alias for `ctx.req`, while `ctx.response` is an alias for `ctx.res`.

---

# TypeScript

The request API is generic, so request data can be strongly typed.

The core request type accepts generic types for:

```ts
IRequest<
  Body,
  Query,
  Params,
  Cookies,
  User,
  Locals,
  Ip,
  Protocol,
  Secure,
  Hostname,
  Path,
  Files
>
```

When a route schema is supplied, the context type can infer types for body, query, params, headers, and files.

For example:

```ts
const schema = {
  body: {
    name: infer.string(),
    age: infer.number(),
  },

  query: {
    page: infer.number().optional(),
  },

  params: {
    id: infer.string(),
  },
};
```

The controller can then use the inferred request properties:

```ts
router.get("/users/:id", {
  schema,

  controller: async (ctx) => {
    const id = ctx.req.params.id;
    const page = ctx.req.query.page;

    // ...
  },
});
```

Subatom's context inference supports standard-schema-style output types and several common schema inference patterns. The exact runtime validation behavior depends on the schema/validator used by the route.

---

# Complete Example

Here is a small example showing several request features together:

```ts
import {
  Router,
  type IContext,
  type NextFunction,
} from "subatom";
import { infer } from "subatom-infer";

const router = new Router();

const schema = {
  body: {
    name: infer.string().min(2),
    email: infer.string().email(),
  },

  query: {
    page: infer.number().int().min(1).optional(),
  },

  params: {
    userId: infer.string().min(1),
  },

  headers: {
    "user-agent": infer.string().optional(),
  },
};

const middleware = async (
  ctx: IContext,
  next: NextFunction,
) => {
  ctx.req.locals.requestId =
    `req_${Date.now()}`;

  await next();
};

router.post("/users/:userId", {
  schema,
  middleware: [middleware],

  controller: async (ctx) => {
    const {
      userId,
    } = ctx.req.params;

    const {
      name,
      email,
    } = ctx.req.body;

    const page =
      ctx.req.query.page;

    const userAgent =
      ctx.req.get("user-agent");

    return ctx.res.json({
      userId,
      name,
      email,
      page,
      userAgent,
      requestId:
        ctx.req.locals.requestId,
    });
  },
});

export default router;
```

---

# API Reference

## Request Data

```text
req.body
req.query
req.params
req.cookies
req.user
req.locals
req.file
req.files
```

## Request Metadata

```text
req.raw
req.method
req.url
req.path
req.headers
req.protocol
req.host
req.hostname
req.ip
req.secure
req.session
req.sessionID
```

## HTTP Helpers

```text
req.get()
req.accepts()
```

## Body Readers

```text
req.text()
req.json()
req.formData()
req.buffer()
```

## Stream Methods

```text
req.onData()
req.onEnd()
req.pipe()
req.stream()
```

---

# When should I use each method?

### Need normal JSON/body data?

Use:

```ts
ctx.req.body
```

### Need query parameters?

Use:

```ts
ctx.req.query
```

### Need a route parameter?

Use:

```ts
ctx.req.params
```

### Need a header?

Use:

```ts
ctx.req.get("header-name")
```

### Need to read raw text?

Use:

```ts
await ctx.req.text()
```

### Need raw bytes?

Use:

```ts
await ctx.req.buffer()
```

### Need JSON directly from the request stream?

Use:

```ts
await ctx.req.json()
```

### Need form data?

Use:

```ts
await ctx.req.formData()
```

### Need to process a large request without loading it all into memory?

Use:

```ts
ctx.req.stream()
```

or:

```ts
ctx.req.pipe(destination)
```

### Need to inspect individual chunks?

Use:

```ts
ctx.req.onData(...)
```

and:

```ts
ctx.req.onEnd(...)
```

---

# Summary

The Subatom `req` object gives you a single, consistent API for working with HTTP requests:

```ts
ctx.req.body
ctx.req.query
ctx.req.params
ctx.req.cookies

ctx.req.headers
ctx.req.method
ctx.req.url
ctx.req.path
ctx.req.ip
ctx.req.protocol

ctx.req.get(...)
ctx.req.accepts(...)

await ctx.req.text()
await ctx.req.json()
await ctx.req.formData()
await ctx.req.buffer()

ctx.req.onData(...)
ctx.req.onEnd(...)
ctx.req.pipe(...)
ctx.req.stream()
```

For most application code, you will primarily use `body`, `query`, `params`, `headers`, `cookies`, `user`, and `locals`. Use the body-reader and stream APIs when you need direct control over the incoming request data.
