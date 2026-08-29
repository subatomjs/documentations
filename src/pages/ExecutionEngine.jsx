import { ApiTable } from "../components/ApiTable";
import { CodeBlock } from "../components/CodeBlock";
import { Callout } from "../components/Callout";

const headers = ["Method", "Signature", "Async Safe", "Failure Strategy"];
const rows = [
  [
    <code className="font-mono text-indigo-500 font-semibold">.parse(input)</code>,
    <code className="font-mono text-slate-600 dark:text-slate-300">TOutput</code>,
    <span className="text-rose-500 font-semibold">No</span>,
    <span>Throws <code className="font-mono text-rose-500">ValidationError</code> on validation failure or if async refinements/transforms are triggered[cite: 1, 35].</span>,
  ],
  [
    <code className="font-mono text-indigo-500 font-semibold">.safeParse(input)</code>,
    <code className="font-mono text-slate-600 dark:text-slate-300">SafeParseResult&lt;TOutput&gt;</code>,
    <span className="text-rose-500 font-semibold">No</span>,
    <span>Returns discriminated union: <code className="font-mono text-emerald-500">&#123; success: true, data &#125;</code> or <code className="font-mono text-rose-500">&#123; success: false, error, issues &#125;</code>[cite: 1, 34].</span>,
  ],
  [
    <code className="font-mono text-indigo-500 font-semibold">.parseAsync(input)</code>,
    <code className="font-mono text-slate-600 dark:text-slate-300">Promise&lt;TOutput&gt;</code>,
    <span className="text-emerald-500 font-semibold">Yes</span>,
    <span>Evaluates all async sub-schemas, transformations, and refinements. Rejects with <code className="font-mono text-rose-500">ValidationError</code> on failure[cite: 1, 35].</span>,
  ],
  [
    <code className="font-mono text-indigo-500 font-semibold">.safeParseAsync(input) / .spa()</code>,
    <code className="font-mono text-slate-600 dark:text-slate-300">Promise&lt;SafeParseResult&gt;</code>,
    <span className="text-emerald-500 font-semibold">Yes</span>,
    <span>Returns a non-throwing Promise resolving to the strongly typed <code className="font-mono">SafeParseResult</code> discriminated union[cite: 1, 34, 35].</span>,
  ],
];

export const ExecutionEngine = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Core Execution & Parsing Engine
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          Subatom Infer provides both throwing and non-throwing execution wrappers across synchronous and asynchronous pipelines[cite: 1, 35].
        </p>
      </div>

      <ApiTable headers={headers} rows={rows} />

      <Callout type="warning" title="Sync vs Async Guardrails">
        Calling <code className="font-mono">.parse()</code> or <code className="font-mono">.safeParse()</code> on a schema containing asynchronous transformers (e.g. database lookups, password hashing) will immediately raise an error: <em>"Asynchronous validation occurred during synchronous parse()"</em>[cite: 35]. Always use <code className="font-mono">.parseAsync()</code> or <code className="font-mono">.spa()</code> for non-blocking I/O[cite: 1, 35].
      </Callout>

      <CodeBlock
        title="Safe Parse vs Async Parse Implementation"
        code={`import { infer } from "subatom-infer";

const UserSchema = infer.object({
  id: infer.uuid(),
  username: infer.string().min(3),
});

// 1. Synchronous Safe Parsing
const result = UserSchema.safeParse({ id: "123e4567-e89b-12d3-a456-426614174000", username: "alex" });
if (result.success) {
  console.log("Parsed User:", result.data);
} else {
  console.error("Validation Issues:", result.error.flatten());
}

// 2. Asynchronous Parsing
const asyncData = await UserSchema.parseAsync(req.body);`}
      />
    </div>
  );
};