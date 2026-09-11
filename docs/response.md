> **Documentation status — public API reference**
>
> This page consolidates the detailed Subatom reference material supplied with the framework implementation examples. Treat the exported/public API surface as authoritative; internal implementation details are intentionally not presented as application APIs.

# Response

The `res` object represents the HTTP response that a Subatom application sends when it receives an HTTP request.

In Subatom route handlers and controllers, the response object is accessible either directly as `ctx.res` or via delegating facade methods directly on the `ctx` ([Context](Context.md)) object.

```typescript
router.get('/user', {
  controller: (ctx) => {
    return ctx.res.status(200).json({ name: 'Kunal' });
  }
});
```

---

## Table of Contents

- [Properties](#properties)
  - [res.headersSent](#resheaderssent)
  - [res.writableEnded](#reswritableended)
  - [res.finished](#resfinished)
  - [res.statusCode](#resstatuscode)
  - [res.rawResponse](#resrawresponse)
  - [res.raw](#resraw)
  - [res.helper](#reshelper)
- [Methods](#methods)
  - [res.append()](#resappendfield-value)
  - [res.attachment()](#resattachmentfilename)
  - [res.clearCookie()](#resclearcookiename-options)
  - [res.cookie()](#rescookiename-value-options)
  - [res.download()](#resdownloadpath-filename-options)
  - [res.end()](#resendchunk-encoding-callback)
  - [res.format()](#resformatobject-requestheaders)
  - [res.get()](#resgetfield)
  - [res.html()](#reshtmlhtmlcontent)
  - [res.json()](#resjsonbody)
  - [res.location()](#reslocationurl)
  - [res.redirect()](#resredirecturl-status)
  - [res.removeHeader()](#resremoveheaderfield)
  - [res.send()](#ressendbody)
  - [res.sendFile()](#ressendfilepath-options)
  - [res.sendStream()](#ressendstreamreadablestream-options)
  - [res.set() / res.header() / res.setHeader()](#ressetfield-value)
  - [res.status()](#resstatuscode)
  - [res.stream()](#resstreamreadablestream-options)
  - [res.type() / res.contentType()](#restypetype)
  - [res.vary()](#resvaryfield)
  - [res.write()](#reswritechunk-encoding-callback)
- [Context Delegation Facade](#context-delegation-facade)

---

## Properties

### res.headersSent

Boolean property indicating whether the HTTP headers have already been sent to the client.

```typescript
ctx.res.headersSent;
// => false (prior to transmission)
```

#### Example

```typescript
router.get('/check-headers', {
  controller: (ctx) => {
    console.log(ctx.res.headersSent); // false
    ctx.res.send('Done');
    console.log(ctx.res.headersSent); // true
  }
});
```

---

### res.writableEnded

Boolean property indicating whether `res.end()` has been invoked and response generation has completed.

```typescript
ctx.res.writableEnded;
// => true or false
```

---

### res.finished

Alias of [`res.writableEnded`](#reswritableended). Returns `true` if the response has completed sending.

```typescript
ctx.res.finished;
// => true or false
```

---

### res.statusCode

Reads or inspects the outgoing HTTP response status code set on the response instance.

```typescript
ctx.res.statusCode;
// => 200
```

```typescript
router.get('/status-check', {
  controller: (ctx) => {
    ctx.res.status(202);
    console.log(ctx.res.statusCode); // 202
    return ctx.res.send('Accepted');
  }
});
```

---

### res.rawResponse

Returns the underlying Node.js native `ServerResponse` (`http.ServerResponse`) instance.

```typescript
const nativeResponse = ctx.res.rawResponse;
```

---

### res.raw

An exact reference to the underlying native Node.js `ServerResponse` instance.

```typescript
const nativeResponse = ctx.res.raw;
```

---

### res.helper

A utility helper interface (`IResponseHelper`) mounted directly on the response instance for standardized API response structures and standard HTTP error / success formatting.

```typescript
router.get('/items', {
  controller: (ctx) => {
    // Standard success / error helper payloads
    return ctx.res.helper.ok({ items: [] });
  }
});
```

---

## Methods

### res.append(field, value)

Appends the specified `value` to the HTTP response header `field`. Unlike `res.set()`, if the header already exists, `res.append()` appends the new value or turns it into an array of values without overwriting the previous entry.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `field` | `string` | The header field name. |
| `value` | `string \| string[]` | The value or array of values to append. |

```typescript
router.get('/append-headers', {
  controller: (ctx) => {
    ctx.res
      .append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
      .append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
      .append('Warning', '199 Miscellaneous "warning"');

    return ctx.res.send('Headers appended');
  }
});
```

---

### res.attachment([filename])

Sets the HTTP response `Content-Disposition` header field to `"attachment"`. If a `filename` is provided, it determines the file extension and automatically sets the `Content-Type` header (via `res.type()`), while encoding non-ASCII filenames according to RFC 5987 and sanitizing quotes against header injection.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `filename` | `string` | *(Optional)* The suggested attachment file name. |

```typescript
router.get('/download-receipt', {
  controller: (ctx) => {
    ctx.res.attachment('receipt-august-2026.pdf');
    return ctx.res.send(pdfBuffer);
  }
});
```

Produces:
```http
Content-Disposition: attachment; filename="receipt-august-2026.pdf"
Content-Type: application/pdf
```

---

### res.clearCookie(name, [options])

Clears the cookie specified by `name`. For details on the `options` object, see [res.cookie()](#rescookiename-value-options). The `path` and `domain` options must match the options passed to `res.cookie()` when the cookie was initially set.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | Name of the cookie to remove. |
| `options` | `CookieOptions` | *(Optional)* Matching options used when setting the cookie. |

```typescript
router.post('/logout', {
  controller: (ctx) => {
    ctx.res.clearCookie('session_token', { path: '/' });
    return ctx.res.status(200).send('Logged out');
  }
});
```

---

### res.cookie(name, value, [options])

Sets cookie `name` to `value`. The `value` parameter is a string.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | The name of the cookie. |
| `value` | `string` | The string value of the cookie. |
| `options` | `CookieOptions` | *(Optional)* Configuration options. |

#### `CookieOptions`

| Property | Type | Description |
| :--- | :--- | :--- |
| `maxAge` | `number` | Relative expiration time of the cookie in milliseconds from the current time. |
| `expires` | `Date` | Absolute expiration date for the cookie. |
| `httpOnly` | `boolean` | Flags the cookie to be accessible only by the web server (prevents XSS access). |
| `secure` | `boolean` | Marks the cookie to be used with HTTPS only. |
| `path` | `string` | Path for the cookie. Defaults to `'/'`. |
| `domain` | `string` | Domain name for the cookie. |
| `sameSite` | `'Strict' \| 'Lax' \| 'None' \| boolean` | Value of the `SameSite` attribute. |

```typescript
router.post('/login', {
  controller: (ctx) => {
    ctx.res.cookie('token', 'xyz987654321', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 3600000 // 1 hour
    });

    return ctx.res.json({ message: 'Authenticated' });
  }
});
```

---

### res.download(path, [filename], [options])

Transfers the file at `path` as an “attachment”. Typically, browsers will prompt the user to download the file instead of opening it inline. The browser sets the `Content-Disposition` header filename to `filename` if provided; otherwise, it defaults to the basename of the file path.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `path` | `string` | Absolute or relative path to the file. |
| `filename` | `string` | *(Optional)* Custom filename exposed to the client. |
| `options` | `DownloadOptions` | *(Optional)* Options passed down to the file handler. |

#### `DownloadOptions`
- `root`: Root directory for relative filenames. Recommended to prevent path traversal.
- `contentType`: Explicit override for the inferred `Content-Type`.
- `filename`: Filename override.

```typescript
router.get('/export-report', {
  controller: (ctx) => {
    const filePath = path.resolve('./storage/reports/monthly.xlsx');
    return ctx.res.download(filePath, 'finance-q3-2026.xlsx');
  }
});
```

---

### res.end([chunk], [encoding], [callback])

Ends the response process. This method inherits directly from Node’s native `http.ServerResponse.prototype.end()`. Use to quickly end the response without any data or to manually finalize streaming.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `chunk` | `string \| Buffer \| Uint8Array` | *(Optional)* Final payload chunk. |
| `encoding` | `BufferEncoding` | *(Optional)* Encoding if `chunk` is a string. |
| `callback` | `Function` | *(Optional)* Executed when the response stream has finished. |

```typescript
router.get('/ping', {
  controller: (ctx) => {
    ctx.res.status(200).end();
  }
});
```

---

### res.format(object, [requestHeaders])

Performs content negotiation on the `Accept` HTTP header on the request object when present. It uses the provided handlers to serve the appropriate format. If the header is not acceptable, the `default` callback is executed, or Subatom sends a `406 Not Acceptable`.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `object` | `FormatHandlers` | An object mapping MIME types or keys (`text/plain`, `text/html`, `application/json`, `default`) to execution functions. |
| `requestHeaders` | `Record<string, ...>` | *(Optional)* Custom request headers if overriding `ctx.req.headers`. |

```typescript
router.get('/feed', {
  controller: (ctx) => {
    return ctx.res.format({
      'text/plain': () => {
        ctx.res.send('Hey plain text');
      },
      'text/html': () => {
        ctx.res.html('<p>Hey HTML</p>');
      },
      'application/json': () => {
        ctx.res.json({ message: 'Hey JSON' });
      },
      default: () => {
        ctx.res.status(406).send('Not Acceptable');
      }
    }, ctx.req.headers);
  }
});
```

---

### res.get(field)

Returns the HTTP response header specified by `field`. The match is case-insensitive.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `field` | `string` | The header field to look up. |

```typescript
ctx.res.set('Content-Type', 'text/html');

ctx.res.get('Content-Type');
// => "text/html"

ctx.res.get('content-type');
// => "text/html"
```

---

### res.html(htmlContent)

Sends an HTML string response. Automatically assigns the `Content-Type` header to `text/html; charset=utf-8` if one is not already set.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `htmlContent` | `string` | The HTML body string. |

```typescript
router.get('/welcome', {
  controller: (ctx) => {
    return ctx.res.html('<h1>Welcome to Subatom Framework</h1>');
  }
});
```

---

### res.json(body)

Sends a JSON response. This method sends a response (with the correct `application/json` content-type) that is the parameter converted to a JSON string using `JSON.stringify()`.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `body` | `unknown` | Any valid JSON serializable object, array, string, boolean, or number. |

```typescript
router.get('/api/status', {
  controller: (ctx) => {
    return ctx.res.status(200).json({
      status: 'online',
      version: '1.0.0'
    });
  }
});
```

---

### res.location(url)

Sets the response `Location` HTTP header to the specified `url` parameter. Includes built-in assertions against header-injection attacks.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `url` | `string` | Target destination URL. |

```typescript
router.post('/items', {
  controller: (ctx) => {
    ctx.res.location('/items/42');
    return ctx.res.status(201).send('Created');
  }
});
```

> **Note:** `res.location()` only sets the header. To initiate an HTTP redirect, use [`res.redirect()`](#resredirecturl-status).

---

### res.redirect(url, [status])

Redirects to the URL derived from the specified `url`, with specified status code, a positive integer that corresponds to an HTTP status code. If not specified, `status` defaults to `302 Found`.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `url` | `string` | Destination URL path. |
| `status` | `number` | *(Optional)* HTTP status code. Defaults to `302`. |

```typescript
router.get('/old-route', {
  controller: (ctx) => {
    return ctx.res.redirect('/new-route', 301);
  }
});
```

> **Path Note:** If your router is mounted with a route prefix (e.g. `/api/v1`), provide the full URL path when redirecting:
> ```typescript
> return ctx.res.redirect('/api/v1/dashboard', 302);
> ```

---

### res.removeHeader(field)

Removes an HTTP header from the outgoing queue.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `field` | `string` | The header field to delete. |

```typescript
router.get('/secure-data', {
  controller: (ctx) => {
    ctx.res.set('X-Powered-By', 'Subatom');
    ctx.res.removeHeader('X-Powered-By');
    return ctx.res.send('Protected');
  }
});
```

---

### res.send([body])

Sends the HTTP response.

The `body` parameter can be a `Buffer`, a `Uint8Array`, a `string`, or an `object`.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `body` | `string \| Buffer \| Uint8Array \| object` | *(Optional)* Response content payload. |

#### Behavior by Type

- **Buffer / Uint8Array:** Sets `Content-Type` to `application/octet-stream` unless explicitly defined.
- **String:** Sets `Content-Type` to `text/html; charset=utf-8` by default if not set.
- **Object / Array:** Automatically delegated to [`res.json()`](#resjsonbody).

```typescript
// Sending a plain string
ctx.res.send('Hello Subatom');

// Sending an object (automatically parsed as JSON)
ctx.res.send({ user: 'alex' });

// Sending binary Buffer data
ctx.res.set('Content-Type', 'image/png');
ctx.res.send(imageBuffer);
```

---

### res.sendFile(path, [options])

Transfers the file at the given `path`. Sets the `Content-Type` response HTTP header field based on the filename’s extension unless overridden.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `path` | `string` | Path to the file. |
| `options` | `SendFileOptions` | *(Optional)* Configuration options. |

#### `SendFileOptions`

| Property | Type | Description |
| :--- | :--- | :--- |
| `root` | `string` | Directory that the target file must resolve inside of. Strictly recommended when path incorporates user input to prevent directory traversal attacks. |
| `contentType` | `string` | Overrides the automatically detected mime-type. |

```typescript
router.get('/static/banner.png', {
  controller: (ctx) => {
    return ctx.res.sendFile('/assets/banner.png', {
      root: process.cwd()
    });
  }
});
```

---

### res.sendStream(readableStream, [options])

Transmits a Node.js `Readable` stream using Subatom's optimized stream sender pipeline.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `readableStream` | `Readable` | The Node.js readable stream. |
| `options` | `ISendStreamOptions` | *(Optional)* Options for transmission buffer and chunking. |

```typescript
router.get('/raw-stream', {
  controller: (ctx) => {
    const stream = fs.createReadStream('./huge-log.txt');
    return ctx.res.sendStream(stream);
  }
});
```

---

### res.set(field, [value])

Sets the response HTTP header `field` to `value`. To set multiple fields at once, pass an object as the parameter.

Aliases: `res.header()`, `res.setHeader()`.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `field` | `string \| Record<string, string \| string[]>` | Header name string or dictionary of header names and values. |
| `value` | `string \| string[]` | Header value or array of values (if `field` is a string). |

```typescript
// Single header
ctx.res.set('Content-Type', 'text/plain');

// Aliases
ctx.res.header('X-App-Version', '2.0.0');
ctx.res.setHeader('X-Custom-ID', '12345');

// Multiple headers at once
ctx.res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  'ETag': '12345'
});
```

---

### res.status(code)

Sets the HTTP status for the response. Supports chainable calls to other methods.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `code` | `number` | A 3-digit standard HTTP status code integer. |

```typescript
ctx.res.status(403).end();
ctx.res.status(400).send('Bad Request');
ctx.res.status(404).sendFile('/absolute/path/to/404.png');
```

---

### res.stream(readableStream, [options])

Pipes an arbitrary Node.js readable stream to the client. Stream errors are caught automatically and converted into a `500 Internal Server Error` (if headers have not already been sent) instead of crashing the Node.js process.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `readableStream` | `NodeJS.ReadableStream` | Source readable stream. |
| `options` | `IStreamOptions` | *(Optional)* Stream piping configurations. |

```typescript
import { Readable } from 'node:stream';

router.get('/stream', {
  controller: (ctx) => {
    const stream = Readable.from(['Streaming ', 'subatom ', 'data!']);
    return ctx.res.stream(stream);
  }
});
```

---

### res.type(type)

Sets the `Content-Type` HTTP header to the MIME type specified by the `type` parameter.

Alias: `res.contentType()`.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `type` | `string` | The MIME type or format shorthand. |

```typescript
ctx.res.type('application/json');           // => 'application/json'
ctx.res.type('html');                       // => 'text/html'
ctx.res.type('txt');                        // => 'text/plain'
ctx.res.contentType('application/xml');     // => 'application/xml'
```

---

### res.vary(field)

Adds the field to the `Vary` response header if it is not already present.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `field` | `string` | Header name to add to the Vary list. |

```typescript
router.get('/cached', {
  controller: (ctx) => {
    ctx.res.vary('User-Agent').vary('Accept-Encoding');
    return ctx.res.send('Vary header configured');
  }
});
```

---

### res.write(chunk, [encoding], [callback])

Writes chunks directly to the response output stream without ending it. Used for manual chunked transfer encoding and real-time event streaming.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `chunk` | `string \| Buffer \| Uint8Array` | The data chunk to transmit. |
| `encoding` | `BufferEncoding` | *(Optional)* Encoding mode for strings. |
| `callback` | `Function` | *(Optional)* Callback on buffer flush. |

```typescript
router.get('/chunks', {
  controller: (ctx) => {
    ctx.res.status(200);
    ctx.res.set('Content-Type', 'text/plain');

    ctx.res.write('Chunk 1: Hello ');
    ctx.res.write('Chunk 2: World ');
    ctx.res.end('Chunk 3: Complete');
  }
});
```

---

## Context Delegation Facade

For cleaner and more concise syntax, the `Context` (`ctx`) object delegates common response methods directly to `ctx.res`. You can invoke these directly on `ctx`:

```typescript
router.get('/facade-example', {
  controller: (ctx) => {
    // Calling methods directly on ctx:
    return ctx
      .status(201)
      .set('X-Powered-By', 'Subatom')
      .cookie('greeted', 'true')
      .json({ success: true, user: ctx.user });
  }
});
```

### Supported Facade Methods

- `ctx.status(code)`
- `ctx.json(data)`
- `ctx.send(body)`
- `ctx.html(htmlContent)`
- `ctx.set(name, value)` / `ctx.set(headers)`
- `ctx.header(name, value)`
- `ctx.setHeader(name, value)`
- `ctx.type(contentType)`
- `ctx.contentType(contentType)`
- `ctx.cookie(name, value, options)`
- `ctx.clearCookie(name, options)`
- `ctx.redirect(url, statusCode)`
- `ctx.attachment(filename)`
- `ctx.sendFile(filePath, options)`
- `ctx.download(filePath, filename, options)`
- `ctx.stream(readableStream)`
- `ctx.end(chunk)`
- `ctx.format(handlers, requestHeaders)`

---

## License

MIT © [Kunal Chandra Das](mailto:kunal@subatomjs.dev) — [Subatom](https://subatomjs.dev)
