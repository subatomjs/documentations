> **Documentation status — public API reference**
>
> This page consolidates the detailed Subatom reference material supplied with the framework implementation examples. Treat the exported/public API surface as authoritative; internal implementation details are intentionally not presented as application APIs.

# Subatom Router

The `Router` is the part of Subatom that connects an HTTP method and URL path to the code that should handle the request.

It supports normal HTTP routes, middleware, route groups, REST-style resources, request schemas, named routes, URL generation, and request/response pipeline components such as transformers, interceptors, and serializers.

## Installation

The Router is included with `subatom`.

```ts
import { Router } from "subatom";

const router = new Router();
```

You can also type a router explicitly:

```ts
import { Router, type IRouter } from "subatom";

const router: IRouter = new Router();
```

---

# Router Methods

The public Router API covered here is:

1. `post()`
2. `get()`
3. `put()`
4. `patch()`
5. `delete()`
6. `options()`
7. `head()`
8. `trace()`
9. `connect()`
10. `query()`
11. `all()`
12. `group()`
13. `resource()`
14. `use()`
15. `transformer()`
16. `intercept()`
17. `serializer()`
18. `getRoutes()`
19. `findRouteByName()`
20. `hasRoute()`
21. `urlFor()`

The examples below use this router:

```ts
import { Router } from "subatom";

const commonRouter = new Router();
```

---

# 1. `post()`

Use `post()` to register a route that responds to HTTP `POST` requests.

```ts
commonRouter.post("/user", {
  name: "users.create",
  tags: ["Users"],
  schema: createUserSchema,
  middleware: [],
  controller: createUserController,
});
```

A route definition normally contains:

- `path` — the URL path.
- `name` — a unique name for the route.
- `tags` — optional metadata tags.
- `schema` — optional request validation/schema metadata.
- `middleware` — optional middleware array.
- `controller` — the final controller.

The `controller` is where the application decides what to return.

## Simple example

```ts
commonRouter.post("/users", {
  name: "users.create",
  controller: async (ctx) => {
    return {
      message: "User created",
    };
  },
});
```

---

# 2. `get()`

Use `get()` to register a route for HTTP `GET` requests.

```ts
commonRouter.get("/user/:id", {
  name: "user.fetch.by_id",
  tags: ["Users"],
  schema: typeGetUserSchema,
  controller: getUserController,
});

commonRouter.get("/user", {
  name: "user.fetch",
  tags: ["Users"],
  controller: getUserController,
});
```

## Route parameters

A segment beginning with `:` is a route parameter.

```ts
commonRouter.get("/users/:id", {
  name: "users.get",
  controller: async (ctx) => {
    const id = ctx.req.params.id;

    return {
      id,
    };
  },
});
```

For `/users/123`, `ctx.req.params.id` is `"123"`.

## Query parameters

Query values are available through the request query object.

For example:

```text
/users?page=2
```

can be accessed as:

```ts
ctx.req.query.page
```

Subatom's route matching separates the pathname from the query string.

---

# 3. `put()`

Use `put()` for an update operation, commonly when replacing or updating a resource.

```ts
commonRouter.put("/update/:id", {
  name: "users.update",
  tags: ["Users"],
  schema: updateUserSchema,
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
  controller: updateUserController,
});
```

A route can combine:

- route parameters,
- request schema,
- middleware,
- file middleware,
- and a controller.

The request schema can describe several request parts:

```ts
export const updateUserSchema = {
  params: {
    id: infer.uuid(),
  },
  body: {
    userName: infer.string().min(3).optional(),
    emailId: infer.string().email().optional(),
    fullName: infer.string().optional(),
    age: infer.number().int().min(18).optional(),
  },
  files: {
    avatar: infer
      .file()
      .max(5 * 1024 * 1024, "Max limit is 5 mega byte.")
      .optional(),
  },
};
```

---

# 4. `patch()`

Use `patch()` for partial updates.

```ts
commonRouter.patch("/edit/:id", {
  name: "users.edit",
  tags: ["Users"],
  schema: updateUserSchema,
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
  controller: updateUserController,
});
```

`PATCH` routes use the same route registration system as the other HTTP methods.

---

# 5. `delete()`

Use `delete()` to register an HTTP `DELETE` route.

```ts
commonRouter.delete("/user/:id", {
  name: "users.delete",
  tags: ["Users"],
  schema: {
    params: {
      id: infer.uuid().optional(),
    },
  },
  controller: deleteUserController,
});
```

The route parameter is available through:

```ts
ctx.req.params.id
```

---

# 6. `options()`

Use `options()` to handle HTTP `OPTIONS` requests.

This is useful when an application needs to explicitly describe allowed methods or headers.

```ts
commonRouter.options("/users", {
  name: "users.options",
  tags: ["Users"],
  middleware: [
    async (ctx, next) => {
      await next();
    },
  ],
  controller: async (ctx) => {
    ctx.res.setHeader("Allow", "GET, POST, OPTIONS");
    ctx.res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS",
    );
    ctx.res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );

    ctx.res.status(204);
    ctx.res.end();
  },
});
```

The controller can directly control the response.

---

# 7. `head()`

`HEAD` is similar to `GET`, but applications commonly use it when they need response metadata without returning a normal response body.

```ts
commonRouter.head("/files/:filename", {
  name: "files.head",
  tags: ["Files"],
  middleware: [
    async (ctx, next) => {
      // Authentication or other middleware.
      await next();
    },
  ],
  controller: async (ctx) => {
    const filename = ctx.req.params.filename;

    console.log(filename);

    ctx.res.setHeader("Content-Type", "application/pdf");
    ctx.res.setHeader("Content-Length", "1048576");
    ctx.res.setHeader(
      "Last-Modified",
      new Date().toUTCString(),
    );

    ctx.res.status(200);
    ctx.res.end();
  },
});
```

---

# 8. `trace()`

Use `trace()` when an application needs to handle HTTP `TRACE` requests, for example for diagnostics.

```ts
commonRouter.trace("/debug/echo", {
  name: "debug.trace",
  tags: ["Diagnostics"],
  middleware: [
    async (ctx, next) => {
      await next();
    },
  ],
  controller: async (ctx) => {
    const requestLine =
      `${ctx.req.method} ${ctx.req.url} HTTP/1.1\r\n`;

    const headers = Object.entries(ctx.req.headers)
      .map(([key, val]) =>
        `${key}: ${Array.isArray(val) ? val.join(", ") : val}`,
      )
      .join("\r\n");

    const messageBody = `${requestLine}${headers}\r\n`;

    ctx.res.setHeader("Content-Type", "message/http");
    ctx.res.status(200);
    ctx.res.end(messageBody);
  },
});
```

---

# 9. `connect()`

Use `connect()` to register an HTTP `CONNECT` route.

```ts
commonRouter.connect("/proxy-tunnel", {
  name: "tunnel.connect",
  tags: ["Proxy"],
  middleware: [
    async (ctx, next) => {
      // Authenticate the proxy client.
      await next();
    },
  ],
  controller: async (ctx) => {
    ctx.res.status(200);
    ctx.res.json("Connection Established.");
  },
});
```

The Router exposes `CONNECT` as a first-class route method.

---

# 10. `query()`

Use `query()` to register a route for the HTTP `QUERY` method.

```ts
commonRouter.query("/search/users", {
  name: "users.search.query",
  tags: ["Users", "Search"],
  schema: searchFilterSchema,
  controller: queryController,
});
```

A body can be used with the example request schema:

```ts
export const searchFilterSchema = {
  body: infer.object({
    filters: infer.array(
      infer.object({
        field: infer.string(),
        operator: infer.string(),
        value: infer.any(),
      }),
    ),
    sortBy: infer.string().default("createdAt"),
    limit: infer.number().default(20),
    offset: infer.number().default(0),
  }),
};
```

The `QUERY` method is treated by the Router as a normal route method.

---

# 11. `all()`

Use `all()` when one route should match requests regardless of their HTTP method.

```ts
commonRouter.all("/gateway/passthrough", {
  name: "gateway.all",
  tags: ["Gateway"],
  middleware: [
    async (ctx, next) => {
      console.log(
        `[${ctx.req.method}] incoming to ${ctx.req.url}`,
      );

      await next();
    },
  ],
  controller: async (ctx) => {
    return ctx.json({
      message: `Executed via method: ${ctx.req.method}`,
      path: ctx.req.path,
      headers: ctx.req.headers,
    });
  },
});
```

`all()` is useful for gateway, passthrough, fallback, or method-independent endpoints.

---

# Route Options

The object form used by the HTTP methods is the recommended way to register routes.

```ts
commonRouter.post("/users", {
  name: "users.create",
  tags: ["Users"],
  schema: createUserSchema,
  middleware: [
    authMiddleware,
  ],
  controller: createUserController,
});
```

## `name`

The route name identifies a route.

```ts
name: "users.create"
```

Route names are used by methods such as:

```ts
router.findRouteByName(...)
router.hasRoute(...)
router.urlFor(...)
```

Route names must be unique inside a Router. Sub-router mounting also checks for duplicate route names.

## `tags`

Tags are metadata associated with the route.

```ts
tags: ["Users", "Admin"]
```

Multiple routes can use the same tags.

## `schema`

A schema describes request data and can be used by Subatom's validation/OpenAPI-related systems.

The supported route schema areas include:

```ts
{
  body: ...,
  query: ...,
  params: ...,
  headers: ...,
  file: ...,
  files: ...,
}
```

## `middleware`

A route can have multiple middleware functions:

```ts
middleware: [
  authMiddleware,
  permissionMiddleware,
]
```

Middleware runs before the route's final handler/controller.

## `controller`

The controller is the final route handler.

Context-style controllers look like:

```ts
controller: async (ctx) => {
  return {
    message: "Hello",
  };
}
```

---

# Controllers and Return Values

Subatom wraps context controllers into the internal request/response pipeline.

A controller can return an object:

```ts
controller: async (ctx) => {
  return {
    id: 1,
    name: "Alice",
  };
}
```

The returned object is automatically sent as JSON.

Primitive values are also handled:

```ts
controller: async () => {
  return "Hello";
}
```

```ts
controller: async () => {
  return 123;
}
```

```ts
controller: async () => {
  return true;
}
```

Objects are sent using `ctx.json()`, while strings, numbers, and booleans are sent as strings.

If the controller returns the context, request, response, or their raw HTTP objects, Subatom does not automatically serialize that value.

You can also control the response yourself:

```ts
controller: async (ctx) => {
  ctx.res.status(201);

  return {
    created: true,
  };
}
```

Or:

```ts
controller: async (ctx) => {
  ctx.res.status(204);
  ctx.res.end();
}
```

---

# Middleware

Subatom supports context middleware and legacy request/response middleware.

## Context middleware

The recommended style is:

```ts
async (ctx, next) => {
  console.log("Before");

  await next();

  console.log("After");
}
```

## Legacy request/response middleware

The Router can also adapt request/response style middleware into its internal pipeline.

The middleware normalizer identifies traditional middleware by its function signature and supports the internal file middleware configuration used by Subatom.

This allows existing request/response-oriented middleware to participate in the same Router pipeline.

---

# 12. `group()`

Use `group()` when several routes share a common URL prefix.

```ts
commonRouter.group("/users", (users) => {
  users.get("/", {
    name: "users.group.list",
    tags: ["Users"],
    controller: async () => {
      return [
        { id: "u_1", name: "Alice" },
      ];
    },
  });

  users.get("/:id", {
    name: "users.group.get_by_id",
    tags: ["Users"],
    controller: async (ctx) => {
      return {
        id: ctx.req.params.id,
        name: "Alice",
      };
    },
  });

  users.delete("/:id", {
    name: "users.group.delete",
    tags: ["Users"],
    controller: async (ctx) => {
      return {
        success: true,
        deletedId: ctx.req.params.id,
      };
    },
  });
});
```

The resulting paths are:

```text
GET    /users
GET    /users/:id
DELETE /users/:id
```

The group prefix is automatically combined with every route registered inside the group.

## Nested groups

Groups can be nested.

```ts
commonRouter.group("/api", (api) => {
  api.group("/v1", (v1) => {
    v1.group("/posts", (posts) => {
      posts.get("/", {
        name: "posts.list",
        controller: async () => {
          return [
            {
              id: "p_1",
              title: "Subatom Guide",
            },
          ];
        },
      });

      posts.group("/:postId/comments", (comments) => {
        comments.get("/", {
          name: "posts.comments.list",
          controller: async (ctx) => {
            return {
              postId: ctx.req.params.postId,
              comments: [],
            };
          },
        });
      });
    });
  });
});
```

This produces paths such as:

```text
GET /api/v1/posts
GET /api/v1/posts/:postId/comments
```

## Group middleware

A group can provide middleware that applies to routes inside the group.

The group API also supports group-level tags, rate limits, and route-name prefixes.

Conceptually:

```ts
router.group("/admin", {
  middleware: [authMiddleware],
  tags: ["Admin"],
  name: "admin",
}, (admin) => {
  // Routes registered here inherit the group configuration.
});
```

Group tags are combined with route tags and duplicate tags are removed.

A route-specific rate limit takes precedence over a group rate limit.

A group name can be used as a name prefix for routes that do not already use that prefix.

---

# 13. `resource()`

`resource()` generates a set of REST-style routes from a resource controller.

A resource controller is an object whose properties represent resource actions.

```ts
commonRouter.resource("/posts", {
  index: async (ctx) => {
    return [
      { id: "1", title: "Subatom Architecture" },
      { id: "2", title: "Router Guide" },
    ];
  },

  show: async (ctx) => {
    const { id } = ctx.req.params;

    return {
      id,
      title: `Post ${id}`,
    };
  },

  store: async (ctx) => {
    const body = ctx.req.body;

    ctx.res.status(201);

    return {
      success: true,
      created: body,
    };
  },

  update: async (ctx) => {
    const { id } = ctx.req.params;

    return {
      success: true,
      id,
      updated: ctx.req.body,
    };
  },

  destroy: async (ctx) => {
    const { id } = ctx.req.params;

    return {
      success: true,
      deletedId: id,
    };
  },
});
```

## Resource actions

The resource builder defines these actions:

- `index`
- `show`
- `create`
- `update`
- `patch`
- `delete`
- `destroy`

The HTTP method mapping is:

| Action | HTTP method |
|---|---|
| `index` | `GET` |
| `create` | `POST` |
| `show` | `GET` |
| `update` | `PUT` |
| `patch` | `PATCH` |
| `delete` | `DELETE` |
| `destroy` | `DELETE` |

Member actions use the configured resource parameter.

By default the parameter name is `id`.

For a plural resource, member routes therefore use:

```text
/:id
```

The exact set of generated routes depends on which actions are implemented and the resource options supplied.

## `only`

`only` limits the generated actions.

```ts
router.resource("/posts", {
  only: ["index", "show"],
  index: async () => [],
  show: async (ctx) => {
    return {
      id: ctx.req.params.id,
    };
  },
});
```

`only` cannot contain an action outside the valid resource actions, and every action requested by `only` must be implemented by the controller.

## `except`

`except` excludes actions.

```ts
router.resource("/posts", {
  except: ["delete", "destroy"],
  index: async () => [],
  show: async () => ({}),
  update: async () => ({}),
});
```

`only` and `except` are mutually exclusive.

## `param`

Change the member parameter name:

```ts
router.resource("/posts", {
  param: "postId",
  show: async (ctx) => {
    return {
      id: ctx.req.params.postId,
    };
  },
});
```

The parameter must not contain `/` or `:`.

## `singular`

A singular resource does not create an `index` action.

The generated action order for a singular resource is:

```text
create
show
update
patch
delete
destroy
```

## `allowPatch`

`allowPatch` controls the automatic PATCH alias for an `update` action.

By default it is enabled.

When `update` exists, `allowPatch` is enabled, and an explicit `patch` action is not present, the resource builder can create a `PATCH` route using the update handlers.

Set:

```ts
allowPatch: false
```

to disable that automatic alias.

## `middleware`

Resource-level middleware can be supplied as shared middleware.

```ts
router.resource("/posts", {
  middleware: [
    authMiddleware,
  ],

  index: async () => [],
  show: async () => ({}),
});
```

The shared middleware is placed before the action handlers.

## `names`

Override generated action names.

```ts
router.resource("/posts", {
  names: {
    index: "posts.list",
    show: "posts.details",
  },

  index: async () => [],
  show: async () => ({}),
});
```

## `namePrefix`

Change the prefix used for generated route names.

```ts
router.resource("/posts", {
  namePrefix: "blog.posts",

  index: async () => [],
  show: async () => ({}),
});
```

## `tags`

Resource tags are copied to generated routes.

```ts
router.resource("/posts", {
  tags: ["Posts"],

  index: async () => [],
  show: async () => ({}),
});
```

## `rateLimit`

A resource-level rate limit is copied to generated routes.

## `schemas`

Schemas can be supplied per resource action.

```ts
router.resource("/posts", {
  schemas: {
    index: listPostsSchema,
    show: showPostSchema,
    update: updatePostSchema,
  },

  index: async () => [],
  show: async () => ({}),
  update: async () => ({}),
});
```

For member routes, if an action does not provide a schema, the resource builder automatically creates a basic string schema for the configured member parameter.

---

# Multiple Resource Handlers

A resource action can be a function or an array of functions.

```ts
router.resource("/posts", {
  show: [
    authMiddleware,
    permissionMiddleware,
    showPostController,
  ],
});
```

The resource handler normalizer validates every item.

An empty handler array is rejected, and every array item must be a function.

The last handler is treated as the action's final controller; preceding functions participate as middleware-style handlers.

---

# 14. `use()`

`use()` registers middleware or mounts another router.

## Global router middleware

```ts
commonRouter.use(async (ctx, next) => {
  const start = performance.now();

  await next();

  const duration =
    (performance.now() - start).toFixed(2);

  console.log(
    `[${ctx.req.method}] ${ctx.req.url} - ${duration}ms`,
  );
});
```

Another example:

```ts
commonRouter.use(async (ctx, next) => {
  ctx.res.setHeader("X-Powered-By", "Subatom");

  await next();
});
```

Middleware registered this way can apply across the router.

## Path-specific middleware

`use()` can also receive a path and handlers.

Conceptually:

```ts
router.use("/admin", authMiddleware);
```

The middleware is registered for the path prefix.

When dispatching a request, Subatom collects matching `USE` routes before executing the final route.

## Mounting a sub-router

A Router can be mounted with `use()`:

```ts
const usersRouter = new Router();

usersRouter.get("/", {
  name: "users.list",
  controller: async () => {
    return [];
  },
});

commonRouter.use("/users", usersRouter);
```

The child router's routes are mounted under the supplied prefix.

Sub-router mounting preserves route metadata and pipeline configuration.

Route names must remain unique when routers are merged.

---

# Middleware Execution Order

For a dispatched request, Subatom builds the pipeline in this general order:

```text
Global middleware
        ↓
Matching path middleware registered with use()
        ↓
Route middleware / handlers
        ↓
Controller
```

A middleware can call:

```ts
await next();
```

to continue the pipeline.

For example:

```ts
const authMiddleware = async (ctx, next) => {
  // Check authentication.

  await next();
};
```

A middleware that does not continue the pipeline can stop later handlers from running.

---

# Route Matching

Subatom matches routes using the HTTP method and path.

Dynamic parameters use the `:name` form:

```text
/users/:id
```

For:

```text
/users/123
```

the matched parameters are:

```ts
{
  id: "123"
}
```

Parameter values are URL-decoded before being placed in `req.params`.

The matcher also supports optional parameters using `?`:

```text
/users/:id?
```

Static path segments must match exactly.

---

# Request Dispatch

The Router can dispatch a request through its registered pipeline.

During dispatch Subatom:

1. Finds matching path middleware.
2. Finds the route for the HTTP method.
3. Collects parameters.
4. Parses query values.
5. Combines global middleware, path middleware, and route handlers.
6. Executes the pipeline.

If the path exists but no route accepts the requested HTTP method, Subatom raises a method-not-allowed error.

If no matching path exists, it raises a not-found error.

---

# 15. `transformer()`

A transformer participates in request/response processing.

```ts
commonRouter.transformer({
  name: "UserTransformer",
  priority: 10,

  beforeRequest(ctx) {
    console.log(
      `[Before] ${ctx.method} | ${ctx.routePath}`,
    );
  },

  afterRequest(data, ctx) {
    if (
      data &&
      typeof data === "object" &&
      !Array.isArray(data)
    ) {
      return {
        ...(data as Record<string, unknown>),
        transformed: true,
        timestamp: Date.now(),
      };
    }

    return data;
  },
});
```

A transformer can have:

- `name`
- `priority`
- `beforeRequest`
- `afterRequest`

`beforeRequest` runs before the controller/route handlers.

`afterRequest` receives the outgoing result and can return a transformed value.

Example controller:

```ts
commonRouter.get("/transformer/test", {
  name: "transformer.test",

  controller: async () => {
    return {
      id: "u_101",
      name: "Alice",
      role: "admin",
    };
  },
});
```

---

# 16. `intercept()`

An interceptor wraps route execution.

```ts
commonRouter.intercept({
  name: "ExecutionTimerInterceptor",
  priority: 10,

  async intercept(ctx, next) {
    console.log(
      `[Interceptor] Started for: ${ctx.method} ${ctx.routePath}`,
    );

    const start = performance.now();

    const result = await next();

    const duration =
      (performance.now() - start).toFixed(2);

    console.log(
      `[Interceptor] Finished in ${duration}ms with result:`,
      result,
    );

    return result;
  },
});
```

The important part is:

```ts
const result = await next();
```

This lets the interceptor run logic before and after the rest of the pipeline.

An interceptor can also return a changed result.

Example:

```ts
commonRouter.get("/interceptor/test", {
  name: "test.intercept",

  controller: async () => {
    return {
      message: "Hello from controller",
    };
  },
});
```

Higher priority values are intended to run first according to the provided Router example.

---

# 17. `serializer()`

A serializer controls how a returned value is serialized for a response.

```ts
commonRouter.serializer({
  name: "CustomJsonSerializer",
  priority: 5,
  contentType: "application/json",

  async serialize(data, ctx) {
    return JSON.stringify({
      data,
      meta: {
        timestamp: Date.now(),
        path: ctx.routePath,
      },
    });
  },
});
```

A serializer receives:

```ts
data
ctx
```

and returns the finalized serialized representation.

A serializer may return a string, Buffer, or object according to the Router pipeline types.

Example:

```ts
commonRouter.get("/serializer/test", {
  name: "serializer.test",

  controller: async () => {
    return [
      {
        id: 1,
        name: "Book",
      },
    ];
  },
});
```

The serializer can then format the controller's returned data.

---

# Router-Level Pipeline Configuration

Transformers, interceptors, and serializers can be registered on the Router.

```ts
router.transformer(transformer);
router.intercept(interceptor);
router.serializer(serializer);
```

The Router maintains a pipeline configuration containing:

```ts
{
  transformers: [...],
  interceptors: [...],
  serializers: [...],
}
```

When router-level pipeline components are registered, the Router also applies the pipeline configuration to existing routes that do not already have a route-specific pipeline configuration.

---

# 18. `getRoutes()`

Use `getRoutes()` to retrieve the routes currently registered in the Router.

```ts
const routes = commonRouter.getRoutes();

console.log(routes);
```

A route contains information such as:

```ts
{
  method: "GET",
  path: "/users/:userId/posts/:postId",
  handlers: [...],
  routerPipeline: {
    transformers: [...],
    interceptors: [...],
    serializers: [...]
  },
  name: "users.posts.detail"
}
```

This is useful for inspecting the Router or building tooling around the registered routes.

---

# 19. `findRouteByName()`

Use `findRouteByName()` to retrieve a route by its name.

```ts
const route =
  commonRouter.findRouteByName(
    "users.posts.detail",
  );

console.log(route);
```

For example:

```ts
{
  method: "GET",
  path: "/users/:userId/posts/:postId",
  handlers: [...],
  routerPipeline: {
    transformers: [...],
    interceptors: [...],
    serializers: [...]
  },
  name: "users.posts.detail"
}
```

The route name is the value supplied during registration:

```ts
name: "users.posts.detail"
```

---

# 20. `hasRoute()`

Use `hasRoute()` to check whether a route name exists.

```ts
console.log(
  commonRouter.hasRoute("users.posts.detail"),
);
```

A route name returns `true` when registered:

```ts
true
```

The method checks the route name, not a raw path.

For example, this is not the same as asking whether the path string exists:

```ts
commonRouter.hasRoute(
  "/users/:userId/posts/:postId",
);
```

If the route name is:

```ts
"users.posts.detail"
```

then:

```ts
commonRouter.hasRoute("users.posts.detail");
```

is the correct form.

---

# 21. `urlFor()`

Use `urlFor()` to generate a URL from a named route.

First register a named route:

```ts
commonRouter.get(
  "/users/:userId/posts/:postId",
  {
    name: "users.posts.detail",

    controller: async () => {
      return {
        success: true,
      };
    },
  },
);
```

Then generate its URL:

```ts
const postUrl = commonRouter.urlFor(
  "users.posts.detail",
  {
    userId: "101",
    postId: "42",
  },
  {
    tab: "comments",
    sort: "desc",
    active: true,
  },
);

console.log(postUrl);
```

The generated URL is equivalent to:

```text
/users/101/posts/42?tab=comments&sort=desc&active=true
```

## Path parameters

The second argument contains values for route parameters:

```ts
{
  userId: "101",
  postId: "42",
}
```

Subatom replaces:

```text
:userId
:postId
```

with those values.

Path parameter values are URL-encoded.

For example:

```ts
router.urlFor(
  "users.show",
  {
    id: "hello world",
  },
);
```

produces an encoded path value.

## Query parameters

The third argument is used for query parameters:

```ts
{
  page: 2,
  active: true,
}
```

It is converted into a query string.

Keep path parameters and query parameters separate:

```ts
router.urlFor(
  "users.show",
  { id: "123" },
  { tab: "profile" },
);
```

Do not put a query parameter inside the path-parameter object.

If you pass a parameter that does not exist in the route, `urlFor()` throws an error and tells you to use the separate `query` argument instead.

If a required route parameter is missing, `urlFor()` also throws instead of generating a URL containing `undefined`.

---

# Complete Example

Here is a small Router using several parts of the API together:

```ts
import {
  Router,
  type IContext,
} from "subatom";

const router = new Router();

router.use(async (ctx, next) => {
  console.log(
    `${ctx.req.method} ${ctx.req.url}`,
  );

  await next();
});

router.get("/users", {
  name: "users.list",
  tags: ["Users"],

  controller: async () => {
    return [
      {
        id: "1",
        name: "Alice",
      },
    ];
  },
});

router.get("/users/:id", {
  name: "users.show",
  tags: ["Users"],

  controller: async (ctx: IContext) => {
    return {
      id: ctx.req.params.id,
    };
  },
});

router.post("/users", {
  name: "users.create",
  tags: ["Users"],

  controller: async (ctx: IContext) => {
    ctx.res.status(201);

    return {
      created: true,
      body: ctx.req.body,
    };
  },
});

router.delete("/users/:id", {
  name: "users.delete",
  tags: ["Users"],

  controller: async (ctx: IContext) => {
    return {
      deleted: ctx.req.params.id,
    };
  },
});

const url = router.urlFor(
  "users.show",
  { id: "123" },
);

console.log(url);
```

---

# Named Routes

A good naming convention makes named routes easier to manage.

For example:

```text
users.list
users.show
users.create
users.update
users.delete
```

For nested resources:

```text
posts.comments.list
posts.comments.show
```

There is no requirement that you use this exact naming style, but route names should be unique.

Named routes are especially useful with:

```ts
router.findRouteByName(...)
router.hasRoute(...)
router.urlFor(...)
```

---

# Route Metadata

A registered route can contain metadata such as:

```ts
{
  name: "users.create",
  tags: ["Users"],
  schema: createUserSchema,
  rateLimit: ...,
}
```

This metadata can be consumed by other Subatom systems such as validation and API documentation generation.

---

# Route Schema

A route schema can describe different request sources.

For example:

```ts
const schema = {
  params: {
    id: infer.uuid(),
  },

  query: {
    page: infer.number().int().min(1),
  },

  body: {
    name: infer.string(),
  },

  headers: {
    authorization: infer.string(),
  },

  file: ...,

  files: ...,
};
```

When a schema is registered, Subatom inserts its request validation handler into the route pipeline before the final controller.

---

# Grouped Route Metadata

Groups can provide shared configuration.

For example, routes inside a group can inherit:

- a path prefix,
- middleware,
- tags,
- rate limiting,
- a route-name prefix.

Route-level values can add to or override group-level values where supported.

For tags, group tags and route tags are combined and duplicate tags are removed.

For rate limits, the route-specific value takes precedence over the group value.

---

# Sub-Routers

A Router can be composed from smaller Routers.

```ts
const usersRouter = new Router();

usersRouter.get("/", {
  name: "users.list",
  controller: async () => [],
});

usersRouter.get("/:id", {
  name: "users.show",
  controller: async (ctx) => {
    return {
      id: ctx.req.params.id,
    };
  },
});

commonRouter.use("/users", usersRouter);
```

This is useful for keeping large applications organized.

A sub-router's routes are merged into the parent Router with the mount prefix.

---

# Error Handling

Route and middleware errors are forwarded through the pipeline.

A controller error:

```ts
controller: async () => {
  throw new Error("Something went wrong");
}
```

is caught by the controller wrapper and passed to:

```ts
next(error);
```

The Router's request handling layer normalizes the error and passes it to Subatom's error formatter.

You therefore do not need to manually wrap every controller in a `try/catch` just to forward errors.

---

# Route Registration Validation

The Router validates route definitions while they are being registered.

Examples of invalid configurations include:

- invalid HTTP method values,
- missing/invalid handlers,
- duplicate route names,
- invalid resource options,
- invalid resource parameter names,
- empty resource handler arrays,
- unsupported `only` actions,
- `only` actions that are not implemented,
- using `only` and `except` together.

Failing during route registration makes configuration problems easier to find than failing later during a request.

---

# URL Parameter Safety

`urlFor()` deliberately fails when required route parameters are missing.

For example:

```ts
router.urlFor(
  "users.show",
  {},
);
```

does not silently create:

```text
/users/undefined
```

Instead, it throws an error explaining which parameter is missing.

Likewise, extra values in the `params` object are rejected:

```ts
router.urlFor(
  "users.show",
  {
    id: "123",
    page: 2,
  },
);
```

If `page` is intended to be a query parameter, write:

```ts
router.urlFor(
  "users.show",
  {
    id: "123",
  },
  {
    page: 2,
  },
);
```

---

# Practical Router Structure

For a larger application, a Router can be divided into smaller modules.

```text
router/
├── users.router.ts
├── posts.router.ts
├── auth.router.ts
└── index.ts
```

Then compose them:

```ts
import { Router } from "subatom";

import usersRouter from "./users.router.js";
import postsRouter from "./posts.router.js";

const router = new Router();

router.use("/users", usersRouter);
router.use("/posts", postsRouter);

export default router;
```

This keeps route definitions focused on one part of the application.

---

# Quick Reference

| Method | Purpose |
|---|---|
| `post()` | Register `POST` route |
| `get()` | Register `GET` route |
| `put()` | Register `PUT` route |
| `patch()` | Register `PATCH` route |
| `delete()` | Register `DELETE` route |
| `options()` | Register `OPTIONS` route |
| `head()` | Register `HEAD` route |
| `trace()` | Register `TRACE` route |
| `connect()` | Register `CONNECT` route |
| `query()` | Register `QUERY` route |
| `all()` | Match all HTTP methods |
| `group()` | Group routes under a prefix/configuration |
| `resource()` | Build REST-style resource routes |
| `use()` | Register middleware or mount a router |
| `transformer()` | Register request/response transformation |
| `intercept()` | Wrap route execution |
| `serializer()` | Serialize returned data |
| `getRoutes()` | Get registered routes |
| `findRouteByName()` | Find a route by name |
| `hasRoute()` | Check whether a route name exists |
| `urlFor()` | Generate a URL from a named route |

---

# Recommended Route Pattern

For most application routes, this is a good starting pattern:

```ts
router.get("/users/:id", {
  name: "users.show",
  tags: ["Users"],

  schema: {
    params: {
      id: infer.uuid(),
    },
  },

  middleware: [
    authMiddleware,
  ],

  controller: async (ctx) => {
    const user = await findUser(
      ctx.req.params.id,
    );

    return user;
  },
});
```

The important idea is simple:

```text
HTTP method
     ↓
path
     ↓
schema
     ↓
middleware
     ↓
controller
     ↓
response
```

Subatom's Router provides the pieces needed to build that pipeline while also supporting route composition, REST resources, named routes, URL generation, and response-processing components.
