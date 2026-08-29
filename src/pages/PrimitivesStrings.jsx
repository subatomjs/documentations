import { CodeBlock } from "../components/CodeBlock";
import { Callout } from "../components/Callout";

const strMethods = `infer.string()
  // Boundary constraints
  .min(5)
  .max(100)
  .length(20)

  // Internet & Network Formats
  .email()
  .url()
  .httpUrl()
  .ipv4()
  .ipv6()
  .hostname()

  // Standard Identifier Formats
  .uuid()
  .guid()
  .cuid()
  .cuid2()
  .ulid()
  .nanoid()

  // ISO Dates & Times
  .datetime()
  .date()
  .time()
  .duration()

  // Pattern Assertions
  .regex(/^[A-Z0-9]+$/i)
  .startsWith("sub_")
  .endsWith("_node")
  .includes("@")

  // Inline Sanitizers & Mutators
  .trim()
  .toLowerCase()
  .toUpperCase()
  .normalize("NFC");`;

export const PrimitivesStrings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Primitives, Unit Types & Strings
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          Comprehensive suite of primitive schemas, unit singletons, format validators, and mutation pipelines[cite: 1, 5, 25, 30].
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CodeBlock
          title="Core Primitives & Singletons"
          code={`infer.string()
infer.number()
infer.boolean()
infer.bigint()
infer.date()
infer.symbol()
infer.undefined()
infer.null()
infer.void()
infer.any()
infer.unknown()
infer.never()
infer.nan()
infer.literal("ACTIVE")`}
        />

        <div className="space-y-4">
          <Callout type="info" title="In-place String Mutations">
            Sanitizers like <code className="font-mono">.trim()</code>, <code className="font-mono">.toLowerCase()</code>, and <code className="font-mono">.normalize()</code> mutate the string <em>during parsing</em> before succeeding validation checks are evaluated[cite: 30].
          </Callout>

          <Callout type="success" title="Date Validation">
            <code className="font-mono">infer.date()</code> ensures the input is a valid <code className="font-mono">Date</code> instance where <code className="font-mono">!isNaN(date.getTime())</code> and clones it to protect against outer reference mutation[cite: 25].
          </Callout>
        </div>
      </div>

      <CodeBlock title="String Schema Constraints & Sanitizers" code={strMethods} />
    </div>
  );
};