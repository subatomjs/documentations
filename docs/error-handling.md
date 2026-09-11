# Error Handling

Subatom provides operational error classes and an application-level error middleware hook. Use these primitives to keep HTTP error responses consistent.

## Throw operational errors

The supplied reference documents built-in errors including `NotFoundError`, `BadRequestError`, `UnprocessableEntityError`, `PayloadTooLargeError`, `MethodNotAllowedError`, and `FileFilterError`.

```typescript
import { NotFoundError, BadRequestError } from "subatom";

if (!user) {
  throw new NotFoundError("User not found");
}

if (!inputIsValid) {
  throw new BadRequestError("Invalid input");
}
```

## Global error handling

Register an error handler with `useError()` when you need a custom response envelope or logging policy.

```typescript
app.useError((err, req, res) => {
  console.error(err);
  return res.status(500).json({
    error: "Internal Server Error",
    path: req.path,
    method: req.method,
  });
});
```

The exact error-handler signature should follow the exported Subatom types for the installed version.

## Validation errors

Validation failures can be handled separately when the application wants a stable 4xx response envelope. The supplied documentation uses `UnprocessableEntityError` for validation-related responses.

## Error normalization

The supplied reference documents `normalizeError()` for converting thrown non-Error values into an error representation while preserving actual `Error` instances. Treat this as a public API only when it is exported by the installed package version.

## Operational vs programming errors

Operational errors are expected outcomes such as not-found or invalid input. Programming errors indicate defects. In production, log enough diagnostic information to debug programming failures without exposing stack traces or secrets to clients.

## Error response design

A production API should choose one stable envelope. A common pattern is:

```json
{
  "error": "User not found",
  "code": "NOT_FOUND",
  "statusCode": 404
}
```

Do not expose database errors, credentials, internal paths, or raw stack traces in public responses.
