> **Documentation status — public API reference**
>
> This page consolidates the detailed Subatom reference material supplied with the framework implementation examples. Treat the exported/public API surface as authoritative; internal implementation details are intentionally not presented as application APIs.

# Subatom File Upload

Subatom provides built-in support for handling `multipart/form-data` file uploads.

The file-upload API is designed to feel simple: choose how many files you expect, choose where files should be stored, optionally validate them, and access the uploaded files from `ctx.file` or `ctx.files`.

## Quick start

```ts
import { file, type IContext, type IFileUpload, type IRouter, Router } from "subatom";

const router: IRouter = new Router();

router.post("/avatar", {
  middleware: [
    file.single("avatar", {
      storage: "memory",
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    }),
  ],

  controller: async (ctx: IContext) => {
    const avatar = ctx.file;

    if (!avatar) {
      return ctx.res.json({ error: "Avatar is required" });
    }

    const buffer = await avatar.buffer();

    return ctx.res.json({
      filename: avatar.filename,
      mimetype: avatar.mimetype,
      size: avatar.size,
      bytes: buffer.length,
    });
  },
});
```

The upload middleware parses the multipart request and creates a `FileUpload` object for each uploaded file.

---

## How file uploads work

A typical upload flow looks like this:

1. The client sends a `multipart/form-data` request.
2. Subatom parses the form.
3. Text fields are placed in `req.body`.
4. Uploaded files are stored in memory or on disk.
5. Each file is represented by an `IFileUpload`.
6. The upload middleware places files on `req.file` / `req.files`.
7. With the context API, you can access them through `ctx.file` / `ctx.files`.
8. You can read, stream, validate, or destroy the uploaded file.

---

# Upload middleware

Subatom exposes five upload modes:

| Method | Use when |
|---|---|
| `file.single()` | One file is expected from one field |
| `file.array()` | Multiple files are expected from one field |
| `file.fields()` | Different file fields have different limits |
| `file.any()` | Any file field is accepted |
| `file.none()` | Files must not be uploaded |

These APIs are intentionally similar to the familiar Express/Multer-style upload model.

---

# `file.single()`

Use `file.single()` when an endpoint accepts one file from a specific form field.

```ts
file.single("avatar")
```

Example:

```ts
router.post("/profile/avatar", {
  middleware: [
    file.single("avatar", {
      storage: "memory",
    }),
  ],

  controller: async (ctx) => {
    const avatar = ctx.file;

    if (!avatar) {
      return ctx.res.json({ error: "No avatar uploaded" });
    }

    return ctx.res.json({
      filename: avatar.filename,
      size: avatar.size,
      mimetype: avatar.mimetype,
    });
  },
});
```

The uploaded file is available as:

```ts
ctx.file
```

It is also available through the named field in:

```ts
ctx.files?.avatar
```

When a file is uploaded, `req.files` is also populated.

### Signature

```ts
file.single(
  fieldname: string,
  options?: FileUploadPipelineOptions
)
```

### Example with MIME restrictions

```ts
file.single("avatar", {
  storage: "memory",
  allowedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
  ],
})
```

---

# `file.array()`

Use `file.array()` when several files are uploaded using the same field name.

```ts
file.array("documents", 5)
```

The second argument is the maximum number of files accepted for that field.

Example:

```ts
router.post("/documents", {
  middleware: [
    file.array("documents", 5, {
      storage: "memory",
      allowedMimeTypes: [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "application/pdf",
      ],
    }),
  ],

  controller: async (ctx) => {
    const documents = Array.isArray(ctx.files)
      ? ctx.files
      : ctx.files?.documents || [];

    return ctx.res.json({
      count: documents.length,
      files: documents.map((file) => ({
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
      })),
    });
  },
});
```

The files are available through:

```ts
ctx.files
```

or, depending on the resulting request shape:

```ts
ctx.files.documents
```

### Signature

```ts
file.array(
  fieldname: string,
  maxCount?: number,
  options?: FileUploadPipelineOptions
)
```

If more files than `maxCount` are received, the upload is rejected with HTTP `413`.

---

# `file.fields()`

Use `file.fields()` when an endpoint accepts several named file fields.

For example:

- one `avatar`
- up to four `gallery` images

```ts
file.fields(
  [
    { name: "avatar", maxCount: 1 },
    { name: "gallery", maxCount: 4 },
  ],
  {
    storage: "memory",
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
    ],
  },
)
```

Example:

```ts
router.post("/gallery", {
  middleware: [
    file.fields(
      [
        { name: "avatar", maxCount: 1 },
        { name: "gallery", maxCount: 4 },
      ],
      {
        storage: "memory",
        allowedMimeTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
        ],
      },
    ),
  ],

  controller: async (ctx) => {
    const avatar = ctx.files?.avatar;
    const gallery = ctx.files?.gallery || [];

    return ctx.res.json({
      avatar,
      gallery,
    });
  },
});
```

The resulting `ctx.files` is a field map.

For example:

```ts
ctx.files.avatar
ctx.files.gallery
```

### Signature

```ts
file.fields(
  fields: Array<{
    name: string;
    maxCount?: number;
  }>,
  options?: FileUploadPipelineOptions
)
```

---

# `file.any()`

Use `file.any()` when the endpoint accepts files from any field name.

```ts
file.any({
  storage: "memory",
  allowedMimeTypes: ["*/*"],
})
```

Example:

```ts
router.post("/upload", {
  middleware: [
    file.any({
      storage: "memory",
      allowedMimeTypes: ["*/*"],
    }),
  ],

  controller: async (ctx) => {
    const files = ctx.req.files;

    return ctx.res.json({
      files,
    });
  },
});
```

With `file.any()`, files are grouped by their multipart field name.

For example, a request containing:

```text
avatar
document
gallery
gallery
```

produces a map conceptually like:

```ts
{
  avatar: [/* file */],
  document: [/* file */],
  gallery: [/* file */, /* file */],
}
```

Use `file.any()` carefully on public endpoints because it accepts arbitrary file field names.

### Signature

```ts
file.any(options?: FileUploadPipelineOptions)
```

---

# `file.none()`

Use `file.none()` when an endpoint accepts form fields but must reject uploaded files.

```ts
file.none()
```

Example:

```ts
router.post("/profile", {
  middleware: [
    file.none(),
  ],

  controller: async (ctx) => {
    const { title, description } = ctx.body;

    return ctx.res.json({
      title,
      description,
    });
  },
});
```

Text fields are still allowed.

If a multipart request contains a file, Subatom rejects the request with HTTP `400`.

The error message is:

```text
File uploads are not permitted on this endpoint
```

---

# Storage

Subatom supports two storage strategies:

```ts
storage: "memory"
```

and:

```ts
storage: "disk"
```

## Memory storage

Memory storage keeps the uploaded file in a `Buffer`.

```ts
file.single("avatar", {
  storage: "memory",
})
```

You can read the content with:

```ts
const buffer = await file.buffer();
```

You can also access the currently stored buffer through:

```ts
file.bufferContent
```

Memory storage is convenient when the application needs to process the file immediately.

Be careful with large uploads because the file contents are held in memory.

---

## Disk storage

Disk storage writes the uploaded file to the filesystem.

```ts
file.single("document", {
  storage: "disk",
})
```

You can access its path:

```ts
console.log(file.path);
```

You can read it as a buffer:

```ts
const buffer = await file.buffer();
```

Or create a readable stream:

```ts
const stream = file.stream();
```

### Custom destination

You can provide a destination directory:

```ts
file.single("document", {
  storage: "disk",
  dest: "./uploads",
})
```

If no destination is provided, the parser uses the operating system temporary directory.

The destination directory is created when necessary.

---

# `IFileUpload`

Every uploaded file is represented by an `IFileUpload`.

```ts
interface IFileUpload {
  readonly filename: string;
  readonly encoding: string;
  readonly mimetype: string;
  readonly storageType: "memory" | "disk";
  readonly path: string | undefined;
  readonly size: number | undefined;

  readonly destroyed: boolean;
  readonly bufferContent: Buffer | undefined;

  buffer(): Promise<Buffer>;
  stream(): Readable;
  destroy(): Promise<void>;
}
```

---

# File properties

## `filename`

The original uploaded filename.

```ts
console.log(file.filename);
```

Example:

```text
profile-picture.png
```

---

## `encoding`

The encoding reported for the uploaded multipart file.

```ts
console.log(file.encoding);
```

---

## `mimetype`

The resolved MIME type of the uploaded file.

```ts
console.log(file.mimetype);
```

Examples:

```text
image/png
image/jpeg
application/pdf
```

Subatom resolves generic MIME types using the filename extension when it can determine a known type.

For example, a generic binary upload whose filename ends in `.png` can be resolved to:

```text
image/png
```

SVG MIME values are normalized to:

```text
image/svg+xml
```

---

## `storageType`

Tells you where the file content is stored.

```ts
file.storageType
```

Possible values:

```ts
"memory"
```

or:

```ts
"disk"
```

---

## `path`

The filesystem path used for disk storage.

```ts
console.log(file.path);
```

For memory storage, this is:

```ts
undefined
```

---

## `size`

The uploaded file size in bytes.

```ts
console.log(file.size);
```

Example:

```text
204800
```

which represents 200 KiB.

---

## `destroyed`

Checks whether the file has already been destroyed.

```ts
if (file.destroyed) {
  // file is no longer available
}
```

---

## `bufferContent`

Returns the in-memory `Buffer`, when one exists.

```ts
const buffer = file.bufferContent;
```

For disk-backed files, this value is normally:

```ts
undefined
```

Use `buffer()` when you need the file contents regardless of the storage strategy.

---

# Reading file content

## `buffer()`

Reads the complete file into a `Buffer`.

```ts
const buffer = await file.buffer();
```

This works for both memory and disk storage.

For memory storage, Subatom returns the existing in-memory buffer.

For disk storage, Subatom reads the file from its path.

Example:

```ts
const avatar = ctx.file;

if (!avatar) {
  return ctx.res.status(400).json({
    error: "Avatar is required",
  });
}

const buffer = await avatar.buffer();

console.log(buffer.length);
```

If the file has already been destroyed, `buffer()` throws.

---

# Streaming a file

## `stream()`

Creates a readable stream for the file.

```ts
const stream = file.stream();
```

For memory storage, Subatom creates a readable stream from the stored buffer.

For disk storage, Subatom creates a filesystem read stream.

Example:

```ts
const uploadedFile = ctx.file;

if (!uploadedFile) {
  return ctx.res.status(400).json({
    error: "File is required",
  });
}

const stream = uploadedFile.stream();

ctx.res.sendStream(stream);
```

Streaming is useful when you do not want to manually load a disk-backed file into a buffer first.

If the file has been destroyed, `stream()` throws.

---

# Destroying an uploaded file

## `destroy()`

Use `destroy()` when the uploaded file is no longer needed.

```ts
await file.destroy();
```

For memory storage, Subatom releases the stored buffer.

For disk storage, Subatom removes the uploaded file from the filesystem.

Example:

```ts
const uploadedFile = ctx.file;

if (!uploadedFile) {
  return ctx.res.status(400).json({
    error: "File is required",
  });
}

try {
  await processFile(uploadedFile);
} finally {
  await uploadedFile.destroy();
}
```

`destroy()` is safe to call more than once.

For disk files, an already-missing file does not cause the cleanup operation to fail.

---

# File validation

Subatom's request validator supports file validation.

File schemas are defined under:

```ts
schema.files
```

For example:

```ts
const schema = {
  files: {
    avatar: infer
      .file()
      .max(2 * 1024 * 1024)
      .mime([
        "image/jpeg",
        "image/png",
        "image/webp",
      ])
      .extension([
        "jpg",
        "jpeg",
        "png",
        "webp",
      ]),
  },
};
```

A file schema can validate things such as:

- maximum file size
- MIME type
- file extension
- single-file vs multiple-file expectations
- minimum/maximum number of files
- per-file size limits

The exact fluent validation API comes from `subatom-infer`.

---

# MIME type restrictions

Upload middleware can restrict MIME types directly:

```ts
file.single("avatar", {
  allowedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
  ],
})
```

Wildcard MIME types are supported:

```ts
allowedMimeTypes: ["image/*"]
```

Allow everything:

```ts
allowedMimeTypes: ["*/*"]
```

MIME rules can also use file extensions:

```ts
allowedMimeTypes: [
  "jpg",
  "jpeg",
  "png",
  "pdf",
]
```

---

# Upload limits

The parser supports limits for:

```ts
limits: {
  fileSize: 5 * 1024 * 1024,
  files: 5,
  fields: 20,
  fieldSize: 1024 * 100,
  parts: 25,
}
```

Available limits are:

| Option | Meaning |
|---|---|
| `fileSize` | Maximum size of an individual uploaded file |
| `files` | Maximum number of uploaded files |
| `fields` | Maximum number of non-file form fields |
| `fieldSize` | Maximum size of a form field |
| `parts` | Maximum number of multipart parts |

For example:

```ts
file.any({
  storage: "disk",
  dest: "./uploads",
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 10,
  },
})
```

Upload-size violations result in HTTP `413`.

---

# Form fields

Multipart text fields are parsed along with files.

For example, a request containing:

```text
title=My photo
published=true
count=10
```

can produce values such as:

```ts
{
  title: "My photo",
  published: true,
  count: 10,
}
```

The multipart parser also handles repeated field names as arrays.

JSON-looking field values can be parsed when they contain valid JSON.

---

# Accessing uploads from `req`

The low-level request object exposes:

```ts
req.file
```

and:

```ts
req.files
```

`req.file` represents a single file:

```ts
const file = req.file;
```

`req.files` can represent either:

```ts
IFileUpload[]
```

or a field map:

```ts
{
  avatar: IFileUpload[],
  gallery: IFileUpload[],
}
```

The exact shape depends on the upload middleware you use.

---

# Accessing uploads from `ctx`

When using Subatom's context API, the same upload data is available through:

```ts
ctx.file
```

and:

```ts
ctx.files
```

Example:

```ts
controller: async (ctx) => {
  const file = ctx.file;

  if (!file) {
    return ctx.res.status(400).json({
      error: "No file uploaded",
    });
  }

  console.log(file.filename);

  return ctx.res.json({
    filename: file.filename,
  });
}
```

For named file fields:

```ts
const avatar = ctx.files?.avatar;
const gallery = ctx.files?.gallery;
```

---

# Complete example

Here is a complete example accepting one avatar and multiple gallery images:

```ts
import {
  file,
  type IContext,
  type IRouter,
  Router,
} from "subatom";

const router: IRouter = new Router();

router.post("/profile", {
  middleware: [
    file.fields(
      [
        { name: "avatar", maxCount: 1 },
        { name: "gallery", maxCount: 4 },
      ],
      {
        storage: "memory",
        allowedMimeTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
        ],
        limits: {
          fileSize: 5 * 1024 * 1024,
        },
      },
    ),
  ],

  controller: async (ctx: IContext) => {
    const avatar = ctx.files?.avatar;
    const gallery = ctx.files?.gallery || [];

    return ctx.res.json({
      success: true,

      avatar: avatar
        ? {
            filename: avatar.filename,
            mimetype: avatar.mimetype,
            size: avatar.size,
          }
        : null,

      gallery: gallery.map((image) => ({
        filename: image.filename,
        mimetype: image.mimetype,
        size: image.size,
      })),
    });
  },
});

export default router;
```

---

# Sending an uploaded file back to the client

A `FileUpload` can provide a readable stream, which can then be sent through Subatom's response API.

```ts
const uploadedFile = ctx.file;

if (!uploadedFile) {
  return ctx.res.status(404).json({
    error: "File not found",
  });
}

ctx.res.sendStream(uploadedFile.stream());
```

For disk-backed files, you can also work with the stored path and Subatom's response file helpers:

```ts
if (!uploadedFile.path) {
  return ctx.res.status(500).json({
    error: "File does not have a disk path",
  });
}

ctx.res.sendFile(uploadedFile.path);
```

`sendFile()` sends a local file inline, while `download()` sends it as a download.

---

# Error handling

Upload parsing errors are converted into HTTP responses.

The upload pipeline currently maps errors as follows:

| Error | HTTP status |
|---|---:|
| File/request payload too large | `413` |
| Unprocessable entity | `422` |
| Bad request | `400` |
| Unknown upload error | `500` |

The response body is normally:

```json
{
  "error": "..."
}
```

For example, exceeding a configured file count or file-size limit results in `413`.

---

# Upload cleanup

Uploaded files may create temporary resources, especially when using disk storage.

Subatom cleans up files when upload processing fails.

After successfully processing a file, application code can explicitly release it:

```ts
await file.destroy();
```

A useful pattern is:

```ts
try {
  await processFile(file);
} finally {
  await file.destroy();
}
```

This is especially important when you use disk storage and no longer need the uploaded file.

---

# Choosing the right upload method

Use the simplest method that matches your endpoint.

### One file

```ts
file.single("avatar")
```

Good for:

- profile pictures
- document uploads
- one CSV file
- one PDF

### Multiple files with one field

```ts
file.array("photos", 10)
```

Good for:

- photo galleries
- multiple documents
- batch uploads

### Multiple named fields

```ts
file.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 4 },
])
```

Good for:

- profile + gallery
- document + attachments
- forms with different upload sections

### Unknown field names

```ts
file.any()
```

Use when the endpoint intentionally accepts arbitrary file fields.

### No files

```ts
file.none()
```

Use when the endpoint accepts multipart form fields but must reject attachments.

---

# Recommended production pattern

For a public upload endpoint, combine:

1. an explicit upload mode
2. a storage strategy
3. MIME restrictions
4. file-count limits
5. file-size limits
6. schema validation when needed
7. cleanup after processing

Example:

```ts
file.array("documents", 5, {
  storage: "disk",
  dest: "./uploads",

  allowedMimeTypes: [
    "application/pdf",
    "image/jpeg",
    "image/png",
  ],

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
})
```

Then validate the uploaded files with your route schema when you need application-level rules.

---

# API reference

## `file.single()`

```ts
file.single(
  fieldname: string,
  options?: FileUploadPipelineOptions,
)
```

Accepts a single file from one multipart field.

---

## `file.array()`

```ts
file.array(
  fieldname: string,
  maxCount?: number,
  options?: FileUploadPipelineOptions,
)
```

Accepts multiple files from one multipart field.

---

## `file.fields()`

```ts
file.fields(
  fields: Array<{
    name: string;
    maxCount?: number;
  }>,
  options?: FileUploadPipelineOptions,
)
```

Accepts multiple named file fields.

---

## `file.any()`

```ts
file.any(
  options?: FileUploadPipelineOptions,
)
```

Accepts files from any field.

---

## `file.none()`

```ts
file.none(
  options?: FileUploadPipelineOptions,
)
```

Rejects file uploads while still allowing form fields.

---

# `FileUploadPipelineOptions`

The upload pipeline accepts:

```ts
interface FileUploadPipelineOptions {
  storage: "memory" | "disk";
  dest?: string;

  allowedMimeTypes?: string[];

  limits?: {
    fileSize?: number;
    files?: number;
    fields?: number;
    fieldSize?: number;
    parts?: number;
  };
}
```

`fieldname` is also part of the internal upload option type.

---

# `IFileUpload` API

| Property / method | Description |
|---|---|
| `filename` | Original uploaded filename |
| `encoding` | Multipart file encoding |
| `mimetype` | Resolved MIME type |
| `storageType` | `"memory"` or `"disk"` |
| `path` | Disk path, when disk storage is used |
| `size` | File size in bytes |
| `destroyed` | Whether the file has been destroyed |
| `bufferContent` | In-memory buffer, when available |
| `buffer()` | Reads the complete file as a `Buffer` |
| `stream()` | Returns a readable stream |
| `destroy()` | Releases memory or removes the disk file |

---

# Important notes

### `file` middleware only processes multipart requests

The upload middleware checks whether the request content type is `multipart/form-data`.

For non-multipart requests, the upload middleware continues to the next middleware.

### `file.none()` is different

`file.none()` allows form fields but rejects file parts.

### Memory vs disk

Choose memory storage for files that are small enough to safely process in memory.

Choose disk storage when you want the upload to exist as a filesystem file or want to avoid keeping the entire uploaded file in application memory.

### Always validate public uploads

Do not rely only on a client-provided filename or MIME type. Configure upload restrictions and application-level validation appropriate for your endpoint.

---

# Quick reference

```ts
// One file
file.single("avatar");

// Multiple files from one field
file.array("photos", 10);

// Multiple named fields
file.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 4 },
]);

// Any file fields
file.any();

// No files
file.none();
```

Storage:

```ts
{
  storage: "memory",
}
```

or:

```ts
{
  storage: "disk",
  dest: "./uploads",
}
```

Restrictions:

```ts
{
  allowedMimeTypes: [
    "image/jpeg",
    "image/png",
  ],

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
}
```

Access:

```ts
ctx.file
ctx.files
```

Read:

```ts
await ctx.file?.buffer();
ctx.file?.stream();
```

Cleanup:

```ts
await ctx.file?.destroy();
```

---

## Summary

Subatom's file-upload API gives you a small set of predictable building blocks:

```text
file.single()  → one named file
file.array()   → many files from one field
file.fields()  → multiple named file fields
file.any()     → arbitrary file fields
file.none()    → no files allowed
```

Every uploaded file is represented by `IFileUpload`, giving you:

```text
metadata → filename, mimetype, size, storageType
content  → buffer()
stream   → stream()
cleanup  → destroy()
```

For most applications, start with `file.single()` or `file.array()`, add MIME and size limits, and use `destroy()` when a temporary uploaded file is no longer needed.
