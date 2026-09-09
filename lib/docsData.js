export const docsNavigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction & Overview", href: "/docs", slug: "index" },
      {
        title: "Why Runtime Validation?",
        href: "/docs/why-subatom-infer",
        slug: "why-subatom-infer",
      },
      {
        title: "Installation & Setup",
        href: "/docs/installation",
        slug: "installation",
      },
      {
        title: "Quick Start Guide",
        href: "/docs/quick-start",
        slug: "quick-start",
      },
    ],
  },
  {
    title: "Schema Types",
    items: [
      {
        title: "Primitives & Literals",
        href: "/docs/primitives",
        slug: "primitives",
      },
      {
        title: "Type Coercion Suite",
        href: "/docs/coercion",
        slug: "coercion",
        badge: "coerce",
      },
      { title: "Objects & Shapes", href: "/docs/objects", slug: "objects" },
      {
        title: "Arrays & Collections",
        href: "/docs/collections",
        slug: "collections",
      },
      {
        title: "Enums & Unions",
        href: "/docs/enums-and-unions",
        slug: "enums-and-unions",
      },
    ],
  },
  {
    title: "Modifiers & Pipelines",
    items: [
      {
        title: "Modifiers & Modifiers Registry",
        href: "/docs/modifiers",
        slug: "modifiers",
      },
      {
        title: "Refinements & SuperRefine",
        href: "/docs/refinements",
        slug: "refinements",
      },
      {
        title: "Files & Upload Validation",
        href: "/docs/file-uploads",
        slug: "file-uploads",
        badge: "Uploads",
      },
      {
        title: "Functions & Promises",
        href: "/docs/functions-and-promises",
        slug: "functions-and-promises",
      },
    ],
  },
  {
    title: "Engine & Diagnostics",
    items: [
      {
        title: "Execution & Safe Parsing",
        href: "/docs/execution-and-parsing",
        slug: "execution-and-parsing",
      },
      {
        title: "Errors & Diagnostic Tree",
        href: "/docs/errors-and-diagnostics",
        slug: "errors-and-diagnostics",
      },
      {
        title: "TypeScript Type Inference",
        href: "/docs/typescript-inference",
        slug: "typescript-inference",
      },
    ],
  },
  {
    title: "Production Guides",
    items: [
      {
        title: "HTTP & API Validation",
        href: "/docs/guides-api-validation",
        slug: "guides-api-validation",
      },
      {
        title: "Environment Variables",
        href: "/docs/guides-env-validation",
        slug: "guides-env-validation",
      },
      {
        title: "Full API Reference",
        href: "/docs/api-reference",
        slug: "api-reference",
        badge: "API",
      },
    ],
  },
];

export const docsPages = {
  index: {
    title: "Introduction to Subatom Infer",
    description:
      "Production-grade runtime data validation, dual sync/async parsing, prototype defense, and static type inference engine for modern JavaScript and TypeScript.",
    category: "Getting Started",
    headings: [
      {
        id: "what-is-subatom-infer",
        title: "What is Subatom Infer?",
        level: 2,
      },
      { id: "core-mental-model", title: "Core Mental Model", level: 2 },
      {
        id: "dual-engine-architecture",
        title: "Dual Engine (Sync & Async)",
        level: 2,
      },
      {
        id: "prototype-defense",
        title: "Built-In Prototype Pollution Defense",
        level: 2,
      },
    ],
    content: {
      intro:
        "Subatom Infer is an ultra-fast, modern, composable schema validation and static type inference engine built from the ground up for modern JavaScript and TypeScript runtimes. It gives you a single source of truth for your data structures at runtime, while emitting bulletproof compile-time TypeScript types without manual duplication.",
      sections: [
        {
          id: "what-is-subatom-infer",
          title: "What is Subatom Infer?",
          text: "When data enters your application—whether from HTTP request bodies, query strings, headers, environment variables, WebSocket events, database results, or file uploads—TypeScript types are erased. Subatom Infer solves this runtime trust boundary problem by verifying shapes at runtime and automatically inferring exact static types with zero overhead.",
          codeTs: `import { infer, type Infer } from "subatom-infer";

const User = infer.object({
  id: infer.string().uuid(),
  username: infer.string().min(3).max(20).toLowerCase().trim(),
  email: infer.string().email(),
  role: infer.enum(["admin", "member"]).default("member"),
  createdAt: infer.coerce.date().default(() => new Date())
});

type User = Infer<typeof User>;`,
          codeJs: `import { infer } from "subatom-infer";

const User = infer.object({
  id: infer.string().uuid(),
  username: infer.string().min(3).max(20).toLowerCase().trim(),
  email: infer.string().email(),
  role: infer.enum(["admin", "member"]).default("member"),
  createdAt: infer.coerce.date().default(() => new Date())
});`,
        },
        {
          id: "core-mental-model",
          title: "Core Mental Model",
          text: "Subatom Infer follows five core principles:\n1. Schemas are immutable objects created via factories like infer.string() or infer.object().\n2. Modifiers return a new Schema instance without mutating existing instances.\n3. Parsing evaluates a single shared ParseContext across nested paths.\n4. Safe parsing guarantees your process will never throw an uncaught exception.\n5. Inferred types (Infer<S>, Output<S>, Input<S>) mirror the transformation lifecycle exactly.",
        },
        {
          id: "dual-engine-architecture",
          title: "Dual Engine (Sync & Async)",
          text: "Subatom Infer implements an ultra-optimized synchronous engine by default, achieving millions of validations per second. When asynchronous transforms, database checks, or promises are supplied, the schema branches into an asynchronous engine via .parseAsync() or .safeParseAsync() (aliased as .spa()).",
          codeTs: `// Synchronous execution
const res1 = User.safeParse(input);

// Asynchronous execution
const res2 = await User.safeParseAsync(input);`,
          codeJs: `// Synchronous execution
const res1 = User.safeParse(input);

// Asynchronous execution
const res2 = await User.safeParseAsync(input);`,
        },
        {
          id: "prototype-defense",
          title: "Built-In Prototype Pollution Defense",
          text: "Unlike naive object mappers, Subatom Infer enforces defensive object creation across infer.object(), .passthrough(), and .merge(). Keys such as __proto__ and constructor are stripped to protect against malicious prototype injection.",
        },
      ],
    },
  },
  "why-subatom-infer": {
    title: "Why Runtime Validation?",
    description:
      "Understand the fundamental boundary between compile-time TypeScript types and real-world runtime data.",
    category: "Getting Started",
    headings: [
      {
        id: "typescript-vs-runtime",
        title: "TypeScript Types vs Runtime Reality",
        level: 2,
      },
      {
        id: "the-trust-boundary",
        title: "Crossing Trust Boundaries",
        level: 2,
      },
      {
        id: "performance-and-security",
        title: "Security & Zero Dependencies",
        level: 2,
      },
    ],
    content: {
      intro:
        "TypeScript static types only exist during compilation; when code runs in Node.js, Bun, or browsers, types completely vanish into plain JavaScript. Without runtime validation, external inputs can crash servers or trigger security vulnerabilities.",
      sections: [
        {
          id: "typescript-vs-runtime",
          title: "TypeScript Types vs Runtime Reality",
          text: "Declaring `type User = { id: string, age: number }` tells the compiler what you expect, but if an API caller passes `{ id: 123, age: 'twenty' }`, TypeScript cannot protect you at runtime. Subatom Infer acts as the runtime guardian that checks shapes and asserts types.",
          codeTs: `// Compile-time only (does NOT validate at runtime)
interface PostInput {
  title: string;
  tags: string[];
}

// Subatom Infer: Validates at runtime AND infers identical TypeScript types
const PostSchema = infer.object({
  title: infer.string().min(1),
  tags: infer.array(infer.string()).nonempty()
});
type Post = Infer<typeof PostSchema>;`,
          codeJs: `// Subatom Infer runtime schema validation
import { infer } from "subatom-infer";

const PostSchema = infer.object({
  title: infer.string().min(1),
  tags: infer.array(infer.string()).nonempty()
});`,
        },
        {
          id: "the-trust-boundary",
          title: "Crossing Trust Boundaries",
          text: "Whenever data enters from external sources—HTTP requests, JSON files, environment variables, or databases—you are at a trust boundary. Subatom Infer transforms unknown input into verified, typed domain values.",
        },
        {
          id: "performance-and-security",
          title: "Security & Zero Dependencies",
          text: "Built with zero third-party dependencies, Subatom Infer eliminates supply chain vulnerabilities while delivering minimal bundle footprint and top-tier execution speeds.",
        },
      ],
    },
  },
  installation: {
    title: "Installation & Setup",
    description: "Install subatom-infer in your Node.js, Bun, Deno, or Next.js environment.",
    category: "Getting Started",
    headings: [
      { id: "package-installation", title: "Install the Package", level: 2 },
      { id: "runtime-requirements", title: "Runtime Requirements", level: 2 },
      { id: "module-formats", title: "ESM and CommonJS Support", level: 2 },
    ],
    content: {
      intro:
        "subatom-infer is distributed via npm as a dual ESM/CommonJS package with complete TypeScript declarations.",
      sections: [
        {
          id: "package-installation",
          title: "Install the Package",
          text: "Use your preferred package manager to add subatom-infer to your project:",
          hasTerminal: true,
        },
        {
          id: "runtime-requirements",
          title: "Runtime Requirements",
          text: "Subatom Infer is targeted for modern runtimes. Recommended engines: Node.js >= 24.0.0, Bun >= 1.0, Deno >= 1.40, or modern browsers with ES2022 support.",
        },
        {
          id: "module-formats",
          title: "ESM and CommonJS Support",
          text: "The package provides explicit exports for both ECMAScript Modules (`dist/index.mjs`) and CommonJS (`dist/index.cjs`).",
          codeTs: `// ESM import
import { infer, type Infer } from "subatom-infer";

// CommonJS require
const { infer } = require("subatom-infer");`,
          codeJs: `// ESM import
import { infer } from "subatom-infer";

// CommonJS require
const { infer } = require("subatom-infer");`,
        },
      ],
    },
  },
  "quick-start": {
    title: "Quick Start Guide",
    description:
      "Learn how to define schemas, validate data, and handle errors in under 3 minutes.",
    category: "Getting Started",
    headings: [
      { id: "step-1-create-schema", title: "1. Define a Schema", level: 2 },
      {
        id: "step-2-validate-data",
        title: "2. Validate Runtime Payloads",
        level: 2,
      },
      {
        id: "step-3-infer-types",
        title: "3. Derive TypeScript Types",
        level: 2,
      },
    ],
    content: {
      intro:
        "Follow this 3-step walk-through to see how Subatom Infer combines schema definition with static inference.",
      sections: [
        {
          id: "step-1-create-schema",
          title: "1. Define a Schema",
          text: "Create a schema combining string identifiers, format constraints, numeric ranges, and defaults:",
          codeTs: `import { infer } from "subatom-infer";

const ProductSchema = infer.object({
  sku: infer.string().regex(/^[A-Z0-9]{8}$/),
  title: infer.string().min(3).trim(),
  price: infer.number().positive(),
  inStock: infer.boolean().default(true),
  tags: infer.array(infer.string()).min(1)
});`,
          codeJs: `import { infer } from "subatom-infer";

const ProductSchema = infer.object({
  sku: infer.string().regex(/^[A-Z0-9]{8}$/),
  title: infer.string().min(3).trim(),
  price: infer.number().positive(),
  inStock: infer.boolean().default(true),
  tags: infer.array(infer.string()).min(1)
});`,
        },
        {
          id: "step-2-validate-data",
          title: "2. Validate Runtime Payloads",
          text: "Use safeParse() for clean branching without throw-catch blocks:",
          codeTs: `const result = ProductSchema.safeParse({
  sku: "PROD9901",
  title: "  Subatom Core Engine  ",
  price: 49.99,
  tags: ["software", "validation"]
});

if (result.success) {
  console.log("Success:", result.data.title); // "Subatom Core Engine"
} else {
  console.error("Issues:", result.error.flatten());
}`,
          codeJs: `const result = ProductSchema.safeParse({
  sku: "PROD9901",
  title: "  Subatom Core Engine  ",
  price: 49.99,
  tags: ["software", "validation"]
});

if (result.success) {
  console.log("Success:", result.data.title);
} else {
  console.error("Issues:", result.error.flatten());
}`,
        },
        {
          id: "step-3-infer-types",
          title: "3. Derive TypeScript Types",
          text: "Use Infer<typeof schema> to automatically generate the TypeScript type:",
          codeTs: `import { type Infer } from "subatom-infer";

export type Product = Infer<typeof ProductSchema>;
/*
export type Product = {
  sku: string;
  title: string;
  price: number;
  inStock: boolean;
  tags: string[];
}
*/`,
          codeJs: `// In JavaScript, runtime validation handles all guarantees without static types.`,
        },
      ],
    },
  },
  primitives: {
    title: "Primitives & Literals",
    description: "Validate strings, numbers, bigints, booleans, dates, and unit types.",
    category: "Schema Types",
    headings: [
      {
        id: "string-validation",
        title: "String Constraints & Formats",
        level: 2,
      },
      {
        id: "number-validation",
        title: "Numbers & Floating Point Rules",
        level: 2,
      },
      { id: "bigint-validation", title: "BigInt Rules", level: 2 },
      {
        id: "other-primitives",
        title: "Booleans, Dates & Unit Types",
        level: 2,
      },
    ],
    content: {
      intro:
        "Subatom Infer includes a complete suite of primitive validators with built-in format checks and mutating transformers.",
      sections: [
        {
          id: "string-validation",
          title: "String Constraints & Formats",
          text: "Strings support bounds, prefixes, suffixes, regex checks, and standard formats (UUID, CUID, ULID, NanoID, Email, URL, IPv4, IPv6, Datetime):",
          codeTs: `infer.string().min(3).max(255);
infer.string().length(8);
infer.string().email();
infer.string().url();
infer.string().httpUrl();
infer.string().uuid();
infer.string().cuid();
infer.string().cuid2();
infer.string().ulid();
infer.string().nanoid();
infer.string().datetime();
infer.string().time();
infer.string().duration();
infer.string().ipv4();
infer.string().ipv6();
infer.string().hostname();
infer.string().trim().toLowerCase();`,
          codeJs: `infer.string().min(3).max(255);
infer.string().email();
infer.string().uuid();
infer.string().trim().toLowerCase();`,
        },
        {
          id: "number-validation",
          title: "Numbers & Floating Point Rules",
          text: "Number validators include bounds, integer checks, IEEE-754 safety checks, and step multiples:",
          codeTs: `infer.number().min(0).max(100);
infer.number().gt(0).lt(10);
infer.number().int();             // Must be integer
infer.number().safe();            // Safe within Number.MAX_SAFE_INTEGER
infer.number().finite();          // No Infinity
infer.number().positive();        // > 0
infer.number().nonnegative();     // >= 0
infer.number().multipleOf(5);     // Floating-point safe modulo`,
          codeJs: `infer.number().min(0).max(100);
infer.number().int().positive();
infer.number().multipleOf(5);`,
        },
        {
          id: "bigint-validation",
          title: "BigInt Rules",
          text: "Native BigInt validation for large integers and blockchain balances:",
          codeTs: `infer.bigint().min(100n).max(1_000_000n);
infer.bigint().positive();
infer.bigint().multipleOf(10n);`,
          codeJs: `infer.bigint().min(100n).max(1_000_000n);
infer.bigint().positive();`,
        },
        {
          id: "other-primitives",
          title: "Booleans, Dates & Unit Types",
          text: "Subatom Infer provides full support for unit and top/bottom types:",
          codeTs: `infer.boolean();
infer.date().min(new Date("2026-01-01"));
infer.literal("ACTIVE");
infer.null();
infer.undefined();
infer.void();
infer.any();
infer.unknown();
infer.never();
infer.symbol();
infer.nan();`,
          codeJs: `infer.boolean();
infer.date();
infer.literal("ACTIVE");
infer.null();
infer.undefined();
infer.any();`,
        },
      ],
    },
  },
  coercion: {
    title: "Type Coercion Suite (`infer.coerce`)",
    description:
      "Safely parse incoming strings from HTTP queries, forms, and headers into real typed values.",
    category: "Schema Types",
    headings: [
      { id: "coercion-overview", title: "Why Coercion Matters", level: 2 },
      {
        id: "supported-coercions",
        title: "Supported Coercion Methods",
        level: 2,
      },
      {
        id: "boolean-coercion-rules",
        title: "Smart Boolean Parsing",
        level: 2,
      },
    ],
    content: {
      intro:
        "Web forms and URL query strings always arrive as plain strings. The infer.coerce suite converts input values into the expected primitive before running validations.",
      sections: [
        {
          id: "coercion-overview",
          title: "Why Coercion Matters",
          text: "Rather than writing manual parsing logic across every controller, wrap fields with infer.coerce.*. If input is string '25', it becomes number 25 before schema checks run.",
          codeTs: `const QueryParams = infer.object({
  page: infer.coerce.number().int().min(1).default(1),
  limit: infer.coerce.number().int().max(100).default(20),
  activeOnly: infer.coerce.boolean(),
  startDate: infer.coerce.date(),
  balance: infer.coerce.bigint(),
  idString: infer.coerce.string()
});`,
          codeJs: `const QueryParams = infer.object({
  page: infer.coerce.number().int().min(1).default(1),
  limit: infer.coerce.number().int().max(100).default(20),
  activeOnly: infer.coerce.boolean(),
  startDate: infer.coerce.date()
});`,
        },
        {
          id: "supported-coercions",
          title: "Supported Coercion Methods",
          text: "• infer.coerce.string(): Converts any value to string using String(val) or JSON.stringify for objects.\n• infer.coerce.number(): Uses Number(val); produces issue if result is NaN.\n• infer.coerce.boolean(): Evaluates boolean truthiness with custom string rules.\n• infer.coerce.bigint(): Converts string/number to BigInt.\n• infer.coerce.date(): Parses date strings/timestamps into valid Date instances.",
        },
        {
          id: "boolean-coercion-rules",
          title: "Smart Boolean Parsing",
          text: "By default, JavaScript Boolean('false') evaluates to true. Subatom Infer's infer.coerce.boolean() correctly maps 'false', '0', and 'off' to false.",
        },
      ],
    },
  },
  objects: {
    title: "Objects & Shapes",
    description:
      "Deep object validation, strictness policies, composition, and prototype pollution defenses.",
    category: "Schema Types",
    headings: [
      { id: "object-policies", title: "Object Strictness Policies", level: 2 },
      {
        id: "composition-methods",
        title: "Extend, Merge, Pick & Omit",
        level: 2,
      },
      {
        id: "deep-nesting-partial",
        title: "Deep Partial & Required",
        level: 2,
      },
      {
        id: "records-and-dictionaries",
        title: "Dynamic Records & Dictionaries",
        level: 2,
      },
    ],
    content: {
      intro:
        "Objects are the backbone of application data models. Subatom Infer provides deep structural checking, key stripping, and strictness enforcement.",
      sections: [
        {
          id: "object-policies",
          title: "Object Strictness Policies",
          text: "Choose how undeclared keys are handled:\n• .strip() (Default): Silently removes unrecognized keys.\n• .strict() / infer.strictObject(): Fails with unrecognized_keys issue.\n• .passthrough() / infer.passthroughObject(): Preserves unrecognized keys.\n• .catchall(schema): Validates unrecognized keys against an auxiliary schema.",
          codeTs: `const User = infer.object({ id: infer.uuid() });

const StrictUser = User.strict();
const LooseUser = User.passthrough();
const CatchallUser = User.catchall(infer.boolean());`,
          codeJs: `const User = infer.object({ id: infer.uuid() });

const StrictUser = User.strict();
const LooseUser = User.passthrough();
const CatchallUser = User.catchall(infer.boolean());`,
        },
        {
          id: "composition-methods",
          title: "Extend, Merge, Pick & Omit",
          text: "Compose and reuse schemas cleanly:",
          codeTs: `const Base = infer.object({ id: infer.uuid(), name: infer.string() });

const Extended = Base.extend({ email: infer.string().email() });
const Merged = Base.merge(infer.object({ role: infer.string() }));
const Picked = Base.pick({ name: true });
const Omitted = Base.omit({ id: true });
const KeysEnum = Base.keyof(); // EnumSchema<["id", "name"]>`,
          codeJs: `const Base = infer.object({ id: infer.uuid(), name: infer.string() });

const Extended = Base.extend({ email: infer.string().email() });
const Picked = Base.pick({ name: true });
const Omitted = Base.omit({ id: true });`,
        },
        {
          id: "deep-nesting-partial",
          title: "Deep Partial & Required",
          text: "Use .partial() to make top-level properties optional, or .deepPartial() to recursively make every nested field optional for PATCH endpoints:",
          codeTs: `const OrgSchema = infer.object({
  name: infer.string(),
  owner: infer.object({
    id: infer.uuid(),
    handle: infer.string()
  })
});

const PatchOrgSchema = OrgSchema.deepPartial();`,
          codeJs: `const OrgSchema = infer.object({
  name: infer.string(),
  owner: infer.object({
    id: infer.uuid(),
    handle: infer.string()
  })
});

const PatchOrgSchema = OrgSchema.deepPartial();`,
        },
        {
          id: "records-and-dictionaries",
          title: "Dynamic Records & Dictionaries",
          text: "Validate dynamic key-value maps with infer.record(keySchema, valueSchema):",
          codeTs: `const ConfigMap = infer.record(
  infer.string().min(2),
  infer.number()
);`,
          codeJs: `const ConfigMap = infer.record(
  infer.string().min(2),
  infer.number()
);`,
        },
      ],
    },
  },
  collections: {
    title: "Arrays, Tuples, Sets & Maps",
    description: "Validate arrays, positional tuples, ES6 Sets, and native ES6 Maps.",
    category: "Schema Types",
    headings: [
      { id: "array-validation", title: "Array Schemas", level: 2 },
      { id: "tuple-validation", title: "Positional Tuples", level: 2 },
      { id: "sets-and-maps", title: "Native Sets & Maps", level: 2 },
    ],
    content: {
      intro:
        "Collections allow validation of homogeneous lists, fixed-length positional tuples, and native ES6 Set and Map instances.",
      sections: [
        {
          id: "array-validation",
          title: "Array Schemas",
          text: "Arrays validate every item and track index paths (e.g. ['items', 2, 'title']):",
          codeTs: `const Tags = infer.array(infer.string())
  .min(1)
  .max(10)
  .nonempty();`,
          codeJs: `const Tags = infer.array(infer.string())
  .min(1)
  .max(10)
  .nonempty();`,
        },
        {
          id: "tuple-validation",
          title: "Positional Tuples",
          text: "Tuples validate exact ordered sequences with optional trailing elements:",
          codeTs: `const Coordinate = infer.tuple([
  infer.number(),
  infer.number(),
  infer.number().optional() // 3D z-axis optional
]);`,
          codeJs: `const Coordinate = infer.tuple([
  infer.number(),
  infer.number(),
  infer.number().optional()
]);`,
        },
        {
          id: "sets-and-maps",
          title: "Native Sets & Maps",
          text: "First-class support for native ES6 Set and Map data structures:",
          codeTs: `const RoleSet = infer.set(infer.string()).min(1);
const CacheMap = infer.map(infer.string().uuid(), infer.boolean());`,
          codeJs: `const RoleSet = infer.set(infer.string()).min(1);
const CacheMap = infer.map(infer.string().uuid(), infer.boolean());`,
        },
      ],
    },
  },
  "enums-and-unions": {
    title: "Enums, Unions & Combinators",
    description:
      "String enums, TypeScript enums, standard unions, discriminated unions, and recursive lazy schemas.",
    category: "Schema Types",
    headings: [
      {
        id: "string-and-native-enums",
        title: "String & Native Enums",
        level: 2,
      },
      {
        id: "discriminated-unions",
        title: "O(1) Discriminated Unions",
        level: 2,
      },
      {
        id: "intersections-and-lazy",
        title: "Intersections & Recursive Lazy",
        level: 2,
      },
    ],
    content: {
      intro:
        "Combinators allow you to express algebraic data types, tagged unions, and recursive tree structures.",
      sections: [
        {
          id: "string-and-native-enums",
          title: "String & Native Enums",
          text: "Create string enums with quick property lookup and subset extraction:",
          codeTs: `// String Enum
const Roles = infer.enum(["ADMIN", "EDITOR", "VIEWER"]);
Roles.enum.ADMIN; // "ADMIN"
const SubRoles = Roles.extract(["ADMIN", "EDITOR"]);

// Native Enum
enum Status { Active = "ACTIVE", Inactive = "INACTIVE" }
const StatusSchema = infer.nativeEnum(Status);`,
          codeJs: `const Roles = infer.enum(["ADMIN", "EDITOR", "VIEWER"]);
const SubRoles = Roles.extract(["ADMIN", "EDITOR"]);`,
        },
        {
          id: "discriminated-unions",
          title: "O(1) Discriminated Unions",
          text: "Discriminated unions look up the branch by key in O(1) time without running every candidate branch:",
          codeTs: `const EventSchema = infer.discriminatedUnion("type", [
  infer.object({ type: infer.literal("click"), x: infer.number(), y: infer.number() }),
  infer.object({ type: infer.literal("hover"), target: infer.string() }),
  infer.object({ type: infer.literal("scroll"), offset: infer.number() })
]);`,
          codeJs: `const EventSchema = infer.discriminatedUnion("type", [
  infer.object({ type: infer.literal("click"), x: infer.number(), y: infer.number() }),
  infer.object({ type: infer.literal("hover"), target: infer.string() })
]);`,
        },
        {
          id: "intersections-and-lazy",
          title: "Intersections & Recursive Lazy",
          text: "Combine shapes with infer.intersection or define recursive data structures with infer.lazy:",
          codeTs: `// Recursive linked list / tree
interface TreeNode {
  value: number;
  next?: TreeNode;
}

const NodeSchema: infer.Schema<TreeNode> = infer.lazy(() =>
  infer.object({
    value: infer.number(),
    next: NodeSchema.optional()
  })
);`,
          codeJs: `const NodeSchema = infer.lazy(() =>
  infer.object({
    value: infer.number(),
    next: NodeSchema.optional()
  })
);`,
        },
      ],
    },
  },
  modifiers: {
    title: "Modifiers & Pipelines",
    description:
      "Chain optional, nullable, defaults, prefaults, transforms, pipes, catch fallbacks, and branded nominal types.",
    category: "Modifiers & Pipelines",
    headings: [
      {
        id: "optional-and-nullable",
        title: "Optional, Nullable & Nullish",
        level: 2,
      },
      {
        id: "defaults-and-prefaults",
        title: "Defaults vs Prefaults",
        level: 2,
      },
      {
        id: "transforms-and-pipes",
        title: "Transforms & Validation Pipes",
        level: 2,
      },
      { id: "branding-and-codecs", title: "Branded Types & Codecs", level: 2 },
    ],
    content: {
      intro:
        "Subatom Infer uses a fluent registry bridge allowing any schema instance to chain modifiers seamlessly without circular dependencies.",
      sections: [
        {
          id: "optional-and-nullable",
          title: "Optional, Nullable & Nullish",
          text: "Control acceptance of undefined and null values:\n• .optional(): Accepts undefined. Output: T | undefined.\n• .nullable(): Accepts null. Output: T | null.\n• .nullish(): Accepts null or undefined. Output: T | null | undefined.",
          codeTs: `const S1 = infer.string().optional();
const S2 = infer.number().nullable();
const S3 = infer.date().nullish();`,
          codeJs: `const S1 = infer.string().optional();
const S2 = infer.number().nullable();
const S3 = infer.date().nullish();`,
        },
        {
          id: "defaults-and-prefaults",
          title: "Defaults vs Prefaults",
          text: "• .default(val): Replaces undefined input with default value after inner validation.\n• .prefault(val): Injects default value before inner validation runs, ensuring the default itself is validated.",
          codeTs: `const Port = infer.number().default(3000);
const Host = infer.string().prefault("localhost");
const Timestamp = infer.date().default(() => new Date());`,
          codeJs: `const Port = infer.number().default(3000);
const Host = infer.string().prefault("localhost");`,
        },
        {
          id: "transforms-and-pipes",
          title: "Transforms & Validation Pipes",
          text: "Transforms alter output values; pipes compose multiple validation schemas in a sequential pipeline:",
          codeTs: `// Transform
const StrToDate = infer.string().transform((str) => new Date(str));

// Pipeline
const CleanEmail = infer.pipe(
  infer.string().trim().toLowerCase(),
  infer.string().email()
);`,
          codeJs: `const StrToDate = infer.string().transform((str) => new Date(str));

const CleanEmail = infer.pipe(
  infer.string().trim().toLowerCase(),
  infer.string().email()
);`,
        },
        {
          id: "branding-and-codecs",
          title: "Branded Types & Codecs",
          text: "Nominal branding prevents assigning raw strings to domain-specific IDs. Codecs support bidirectional serialization/deserialization:",
          codeTs: `// Nominal Branding
type UserId = Brand<string, "UserId">;
const UserIdSchema = infer.brand(infer.uuid(), "UserId");

// Bidirectional Codec
const Base64Codec = infer.codec(
  infer.string().transform((s) => Buffer.from(s, "base64")),
  (buf: Buffer) => buf.toString("base64")
);`,
          codeJs: `const UserIdSchema = infer.brand(infer.uuid(), "UserId");`,
        },
      ],
    },
  },
  refinements: {
    title: "Refinements & Custom Validation",
    description:
      "Write custom validation logic, cross-field assertions, and asynchronous database checks.",
    category: "Modifiers & Pipelines",
    headings: [
      {
        id: "basic-refinements",
        title: "Single Predicate: .refine()",
        level: 2,
      },
      {
        id: "contextual-super-refine",
        title: "Multi-Issue: .superRefine()",
        level: 2,
      },
      { id: "async-refinements", title: "Asynchronous Refinements", level: 2 },
    ],
    content: {
      intro:
        "When standard constraints like .min() or .email() aren't enough, refinements allow arbitrary custom validation with full path tracking.",
      sections: [
        {
          id: "basic-refinements",
          title: "Single Predicate: .refine()",
          text: "Supply a predicate returning boolean (or Promise<boolean>) and an error message:",
          codeTs: `const EvenNumber = infer.number().refine(
  (n) => n % 2 === 0,
  "Number must be even"
);`,
          codeJs: `const EvenNumber = infer.number().refine(
  (n) => n % 2 === 0,
  "Number must be even"
);`,
        },
        {
          id: "contextual-super-refine",
          title: "Multi-Issue: .superRefine()",
          text: "Use .superRefine() to report issues at specific object paths, such as password confirmation checks:",
          codeTs: `const PasswordForm = infer.object({
  password: infer.string().min(8),
  confirm: infer.string()
}).superRefine((data, ctx) => {
  if (data.password !== data.confirm) {
    ctx.addIssue({
      code: "custom",
      path: ["confirm"],
      message: "Passwords do not match"
    });
  }
});`,
          codeJs: `const PasswordForm = infer.object({
  password: infer.string().min(8),
  confirm: infer.string()
}).superRefine((data, ctx) => {
  if (data.password !== data.confirm) {
    ctx.addIssue({
      code: "custom",
      path: ["confirm"],
      message: "Passwords do not match"
    });
  }
});`,
        },
        {
          id: "async-refinements",
          title: "Asynchronous Refinements",
          text: "Refinements can return Promises (e.g. database lookups). Remember to execute async schemas with .parseAsync() or .safeParseAsync().",
          codeTs: `const UniqueUsername = infer.string().refine(
  async (username) => {
    const taken = await checkDb(username);
    return !taken;
  },
  "Username already taken"
);

const res = await UniqueUsername.safeParseAsync("alice");`,
          codeJs: `const UniqueUsername = infer.string().refine(
  async (username) => {
    const taken = await checkDb(username);
    return !taken;
  },
  "Username already taken"
);`,
        },
      ],
    },
  },
  "file-uploads": {
    title: "Files & Upload Validation",
    description:
      "Built-in schemas for single and multi-part upload validation, MIME checks, size limits, and storage policies.",
    category: "Modifiers & Pipelines",
    headings: [
      {
        id: "single-file-validation",
        title: "Single File: infer.file()",
        level: 2,
      },
      {
        id: "multi-file-validation",
        title: "Multiple Files: infer.files()",
        level: 2,
      },
    ],
    content: {
      intro:
        "Subatom Infer includes dedicated file validators tailored for Node.js multipart handlers and web upload pipelines.",
      sections: [
        {
          id: "single-file-validation",
          title: "Single File: infer.file()",
          text: "Validate file objects with size bounds, permitted MIME types, file extensions, and storage drivers:",
          codeTs: `const AvatarUpload = infer.file()
  .mime(["image/png", "image/jpeg", "image/webp"])
  .extension(["png", "jpg", "jpeg", "webp"])
  .min(1024)            // 1 KB minimum
  .max(5 * 1024 * 1024) // 5 MB maximum
  .storage("memory");   // "memory" | "disk"`,
          codeJs: `const AvatarUpload = infer.file()
  .mime(["image/png", "image/jpeg"])
  .max(5 * 1024 * 1024);`,
        },
        {
          id: "multi-file-validation",
          title: "Multiple Files: infer.files()",
          text: "Validate arrays of uploaded files with collective count limits and per-file thresholds:",
          codeTs: `const AttachmentBatch = infer.files()
  .min(1)
  .max(5)
  .mime(["application/pdf", "image/*"])
  .maxEach(10 * 1024 * 1024); // 10MB each`,
          codeJs: `const AttachmentBatch = infer.files()
  .min(1)
  .max(5);`,
        },
      ],
    },
  },
  "functions-and-promises": {
    title: "Functions & Promises",
    description:
      "Validate function arguments and returns, and unpack asynchronous Promise resolutions.",
    category: "Modifiers & Pipelines",
    headings: [
      {
        id: "function-schemas",
        title: "Function Wrappers: infer.function()",
        level: 2,
      },
      {
        id: "promise-schemas",
        title: "Promise Schemas: infer.promise()",
        level: 2,
      },
    ],
    content: {
      intro:
        "Wrap functions to enforce parameter and return type contracts, or validate the resolved value of native Promises.",
      sections: [
        {
          id: "function-schemas",
          title: "Function Wrappers: infer.function()",
          text: "Wraps a function such that incoming arguments are validated at invocation, and return values are validated before returning:",
          codeTs: `const SumFunction = infer.function(
  infer.tuple([infer.number(), infer.number()]),
  infer.number()
);

const add = SumFunction.parse((a: number, b: number) => a + b);
add(10, 20); // 30`,
          codeJs: `const SumFunction = infer.function(
  infer.tuple([infer.number(), infer.number()]),
  infer.number()
);

const add = SumFunction.parse((a, b) => a + b);
add(10, 20); // 30`,
        },
        {
          id: "promise-schemas",
          title: "Promise Schemas: infer.promise()",
          text: "Validates that the input is a Promise and parses its resolved value asynchronously:",
          codeTs: `const AsyncString = infer.promise(infer.string());
const resolved = await AsyncString.parseAsync(Promise.resolve("hello"));`,
          codeJs: `const AsyncString = infer.promise(infer.string());
const resolved = await AsyncString.parseAsync(Promise.resolve("hello"));`,
        },
      ],
    },
  },
  "execution-and-parsing": {
    title: "Execution & Safe Parsing",
    description: "Learn when to use parse(), safeParse(), parseAsync(), and safeParseAsync().",
    category: "Engine & Diagnostics",
    headings: [
      { id: "method-matrix", title: "Execution Method Matrix", level: 2 },
      { id: "safe-parsing-pattern", title: "Safe Parsing Pattern", level: 2 },
      {
        id: "async-safety-rule",
        title: "The Synchronous Safety Rule",
        level: 2,
      },
    ],
    content: {
      intro:
        "Subatom Infer provides four distinct parsing methods depending on whether you want exceptions or result objects, and whether validation is sync or async.",
      sections: [
        {
          id: "method-matrix",
          title: "Execution Method Matrix",
          text: "• .parse(data): Synchronous; returns output or throws ValidationError.\n• .safeParse(data): Synchronous; returns { success: true, data } or { success: false, error, issues }.\n• .parseAsync(data): Asynchronous; returns Promise<output> or rejects.\n• .safeParseAsync(data) / .spa(data): Asynchronous; returns Promise<ParseResult>.",
        },
        {
          id: "safe-parsing-pattern",
          title: "Safe Parsing Pattern",
          text: "Safe parsing avoids try/catch boilerplate and provides TypeScript type narrowing:",
          codeTs: `const result = UserSchema.safeParse(req.body);

if (!result.success) {
  // result.error is ValidationError
  return res.status(400).json({ errors: result.error.flatten() });
}

// result.data is strongly typed
console.log(result.data.id);`,
          codeJs: `const result = UserSchema.safeParse(req.body);

if (!result.success) {
  return res.status(400).json({ errors: result.error.flatten() });
}

console.log(result.data.id);`,
        },
        {
          id: "async-safety-rule",
          title: "The Synchronous Safety Rule",
          text: "Calling synchronous .parse() or .safeParse() on a schema containing asynchronous transforms or refinements will throw an explicit error instructing you to use .parseAsync() or .safeParseAsync().",
        },
      ],
    },
  },
  "errors-and-diagnostics": {
    title: "Errors & Diagnostic Tree",
    description:
      "Format, flatten, and prettify validation errors for API responses and CLI output.",
    category: "Engine & Diagnostics",
    headings: [
      {
        id: "validation-error-instance",
        title: "ValidationError & Issues",
        level: 2,
      },
      { id: "format-and-flatten", title: ".format() vs .flatten()", level: 2 },
      {
        id: "prettify-cli",
        title: "Terminal Friendly: .prettifyError()",
        level: 2,
      },
      { id: "issue-codes", title: "Issue Codes Reference", level: 2 },
    ],
    content: {
      intro:
        "Errors contain precise breadcrumb trails (path arrays) so users and UI forms immediately know which fields failed.",
      sections: [
        {
          id: "validation-error-instance",
          title: "ValidationError & Issues",
          text: "When validation fails, error.issues contains an immutable array of issues:",
          codeTs: `const res = UserSchema.safeParse({});
if (!res.success) {
  console.log(res.issues[0]);
  /*
  {
    code: 'invalid_type',
    expected: 'string',
    received: 'undefined',
    path: ['id'],
    message: 'Required'
  }
  */
}`,
          codeJs: `const res = UserSchema.safeParse({});
if (!res.success) {
  console.log(res.issues[0]);
}`,
        },
        {
          id: "format-and-flatten",
          title: ".format() vs .flatten()",
          text: "• error.format(): Returns a nested tree matching your object hierarchy.\n• error.flatten(): Partitions into top-level formErrors and field-specific fieldErrors:",
          codeTs: `// error.flatten() output:
{
  formErrors: [],
  fieldErrors: {
    username: ["Must contain at least 3 characters"],
    "profile.email": ["Invalid email address"]
  }
}`,
          codeJs: `const flattened = error.flatten();`,
        },
        {
          id: "prettify-cli",
          title: "Terminal Friendly: .prettifyError()",
          text: "Generates formatted CLI strings with arrow pointers, perfect for terminal debugging:",
          codeTs: `console.log(error.prettifyError());
/*
Validation Errors:
  → [username] (too_small): String must contain at least 3 character(s)
  → [profile.email] (invalid_format): Invalid email format
*/`,
          codeJs: `console.log(error.prettifyError());`,
        },
        {
          id: "issue-codes",
          title: "Issue Codes Reference",
          text: "Subatom Infer emits stable issue codes: 'invalid_type', 'invalid_value', 'invalid_format', 'too_small', 'too_big', 'unrecognized_keys', 'invalid_union', 'custom'.",
        },
      ],
    },
  },
  "typescript-inference": {
    title: "TypeScript Type Inference",
    description: "Infer exact TypeScript types from schemas using Infer, Output, and Input.",
    category: "Engine & Diagnostics",
    headings: [
      { id: "infer-and-output", title: "Infer<S> and Output<S>", level: 2 },
      {
        id: "input-types",
        title: "Input<S> (Pre-Transform & Coerce)",
        level: 2,
      },
      { id: "deep-readonly", title: "DeepReadonly Utilities", level: 2 },
    ],
    content: {
      intro:
        "Never write duplicate TypeScript interfaces again. Derive authoritative types straight from your schema definitions.",
      sections: [
        {
          id: "infer-and-output",
          title: "Infer<S> and Output<S>",
          text: "Infer<typeof schema> (aliased as Output<S>) extracts the final validated and transformed output type:",
          codeTs: `import { infer, type Infer, type Output } from "subatom-infer";

const UserSchema = infer.object({
  id: infer.uuid(),
  count: infer.number().default(0)
});

type User = Infer<typeof UserSchema>;
// { id: string; count: number }`,
          codeJs: `// Type inference is a TypeScript feature; schemas work identically in JavaScript.`,
        },
        {
          id: "input-types",
          title: "Input<S> (Pre-Transform & Coerce)",
          text: "When defaults, coercions, or transforms are applied, accepted input may differ from output. Use Input<S> to type accepted raw inputs:",
          codeTs: `import { type Input } from "subatom-infer";

type RawUserInput = Input<typeof UserSchema>;
// { id: string; count?: number | undefined }`,
          codeJs: `// Input types mirror valid raw incoming payloads before transformations.`,
        },
        {
          id: "deep-readonly",
          title: "DeepReadonly Utilities",
          text: "Use DeepReadonly<T> or schema.readonly() to recursively freeze types for immutable state managers.",
        },
      ],
    },
  },
  "guides-api-validation": {
    title: "HTTP & API Validation",
    description:
      "Production patterns for validating REST API bodies, query params, and headers in Next.js and Node.js.",
    category: "Production Guides",
    headings: [
      {
        id: "nextjs-app-router",
        title: "Next.js Route Handler Pattern",
        level: 2,
      },
      {
        id: "express-node-middleware",
        title: "Node.js HTTP Handler Pattern",
        level: 2,
      },
    ],
    content: {
      intro:
        "Learn how to validate untrusted incoming HTTP payloads safely and return structured 400/422 responses.",
      sections: [
        {
          id: "nextjs-app-router",
          title: "Next.js Route Handler Pattern",
          text: "Validate JSON payloads inside Next.js App Router route handlers:",
          codeTs: `// app/api/users/route.ts
import { infer } from "subatom-infer";
import { NextResponse } from "next/server";

const CreateUserSchema = infer.object({
  email: infer.string().email(),
  password: infer.string().min(8),
  role: infer.enum(["member", "admin"]).default("member")
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = CreateUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten() }, { status: 422 });
  }

  // parsed.data is safe and typed
  return NextResponse.json({ user: parsed.data });
}`,
          codeJs: `import { infer } from "subatom-infer";
import { NextResponse } from "next/server";

const CreateUserSchema = infer.object({
  email: infer.string().email(),
  password: infer.string().min(8)
});

export async function POST(req) {
  const body = await req.json();
  const parsed = CreateUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten() }, { status: 422 });
  }

  return NextResponse.json({ user: parsed.data });
}`,
        },
        {
          id: "express-node-middleware",
          title: "Node.js HTTP Handler Pattern",
          text: "Standard middleware pattern for generic Node.js servers and frameworks like Express, Fastify, or Hono.",
        },
      ],
    },
  },
  "guides-env-validation": {
    title: "Environment Variables Validation",
    description:
      "Validate process.env on server startup to fail fast if critical configuration is missing.",
    category: "Production Guides",
    headings: [
      {
        id: "env-schema-definition",
        title: "Defining the Env Schema",
        level: 2,
      },
      { id: "fail-fast-pattern", title: "The Fail-Fast Pattern", level: 2 },
    ],
    content: {
      intro:
        "Never start your application with missing API keys, incorrect database URLs, or invalid port numbers.",
      sections: [
        {
          id: "env-schema-definition",
          title: "Defining the Env Schema",
          text: "Coerce port numbers and check for required secret keys at boot time:",
          codeTs: `import { infer } from "subatom-infer";

const EnvSchema = infer.object({
  NODE_ENV: infer.enum(["development", "test", "production"]).default("development"),
  PORT: infer.coerce.number().int().default(3000),
  DATABASE_URL: infer.string().url(),
  API_SECRET: infer.string().min(16)
});

export const env = EnvSchema.parse(process.env);`,
          codeJs: `import { infer } from "subatom-infer";

const EnvSchema = infer.object({
  NODE_ENV: infer.enum(["development", "test", "production"]).default("development"),
  PORT: infer.coerce.number().int().default(3000),
  DATABASE_URL: infer.string().url(),
  API_SECRET: infer.string().min(16)
});

export const env = EnvSchema.parse(process.env);`,
        },
        {
          id: "fail-fast-pattern",
          title: "The Fail-Fast Pattern",
          text: "Using .parse() ensures that if an environment variable is missing, the server crashes immediately at deployment time with a clear prettified error trace instead of failing unexpectedly at 3 AM.",
        },
      ],
    },
  },
  "api-reference": {
    title: "Full API Reference",
    description: "Quick catalog of every factory, modifier, method, and utility in Subatom Infer.",
    category: "Production Guides",
    headings: [
      {
        id: "core-schema-methods",
        title: "Schema Execution Methods",
        level: 2,
      },
      { id: "primitive-factories", title: "Primitive Factories", level: 2 },
      { id: "composite-factories", title: "Composite Factories", level: 2 },
      { id: "modifier-methods", title: "Modifiers & Pipelines", level: 2 },
    ],
    content: {
      intro: "This cheat-sheet lists all functions and methods exported by subatom-infer.",
      sections: [
        {
          id: "core-schema-methods",
          title: "Schema Execution Methods",
          text: "• .parse(data): Synchronous parse; throws ValidationError on error.\n• .safeParse(data): Synchronous parse; returns { success, data } or { success, error, issues }.\n• .parseAsync(data): Asynchronous parse; returns Promise<Output>.\n• .safeParseAsync(data) / .spa(data): Non-throwing asynchronous parse.",
        },
        {
          id: "primitive-factories",
          title: "Primitive Factories",
          text: "• infer.string(): min, max, length, email, url, httpUrl, uuid, cuid, cuid2, ulid, nanoid, regex, startsWith, endsWith, includes, datetime, date, time, duration, ipv4, ipv6, hostname, trim, toLowerCase, toUpperCase, normalize.\n• infer.number(): min, max, gt, gte, lt, lte, int, safe, finite, positive, nonnegative, negative, nonpositive, multipleOf.\n• infer.bigint(): min, max, gt, gte, lt, lte, positive, nonnegative, negative, nonpositive, multipleOf.\n• infer.boolean(), infer.date().\n• infer.literal(val), infer.null(), infer.undefined(), infer.void(), infer.any(), infer.unknown(), infer.never(), infer.symbol(), infer.nan().\n• infer.coerce: string, number, boolean, bigint, date.",
        },
        {
          id: "composite-factories",
          title: "Composite Factories",
          text: "• infer.object(shape): strict, passthrough, strip, catchall, extend, merge, pick, omit, partial, required, deepPartial, keyof.\n• infer.array(schema): min, max, length, nonempty.\n• infer.tuple([s1, s2, ...]).\n• infer.set(schema): min, max, size, nonempty.\n• infer.map(keySchema, valSchema).\n• infer.record(keySchema, valSchema).\n• infer.enum(values), infer.nativeEnum(enumObj).\n• infer.union([s1, s2]), infer.discriminatedUnion(key, [s1, s2]).\n• infer.intersection(s1, s2), infer.lazy(fn).",
        },
        {
          id: "modifier-methods",
          title: "Modifiers & Pipelines",
          text: "• .optional(), .nullable(), .nullish().\n• .default(val), .prefault(val).\n• .transform(fn), .pipe(schema).\n• .refine(fn, msg), .superRefine(fn).\n• .catch(fallback), .readonly().\n• infer.brand(schema, name), infer.codec(decoder, encoder).\n• infer.file(), infer.files(), infer.function(), infer.promise().",
        },
      ],
    },
  },
};

export const SITE_METADATA = {
  title: "subatom-infer | Data validator for Node.js",
  description:
    "Production-grade Node.js WebSocket engine featuring isolated socket lifecycles, microtask backpressure memory limits, O(1) inverted rooms, and RPC acknowledgements.",
  siteUrl: "https://infer.subatomjs.dev",
  githubUrl: "https://github.com/subatomjs/subatom-infer",
  npmUrl: "https://www.npmjs.com/package/subatom-infer",
  maintainer: "Kunal Chandra Das <kunal@subatomjs.dev>",
  license: "MIT",
  version: "v1.1.0",
  logos: {
    dark: "/subatom_dark_logo.png",
    light: "/subatom_lite_logo.png",
    short: "/subatom_short_logo.png",
  },
};
