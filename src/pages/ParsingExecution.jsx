import { CodeBlock } from "../components/CodeBlock";

const parseCode = `// Importing the unified namespace
import { infer, type Infer } from "subatom-infer";

const User = infer.object({
  id: infer.uuid(),
  username: infer.string().min(3),
});

// Safe synchronous parsing
const result = User.safeParse({ id: "123e4567-e89b-12d3-a456-426614174000", username: "alex" });
if (result.success) {
  console.log(result.data.username); // Typed as string
}`;

export const ParsingExecution = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-500/20">1</span>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          Core Execution & Parsing Engine
        </h2>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-xs">
        Validation is invoked directly via synchronous and asynchronous methods attached to every schema instance.
      </p>

      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm bg-slate-50 dark:bg-slate-950/70 backdrop-blur">
        <table className="w-full text-left border-collapse min-w-[560px]">
          <thead className="bg-slate-100 dark:bg-slate-900 text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-3 font-semibold">Method</th>
              <th className="p-3 font-semibold">Return Signature</th>
              <th className="p-3 font-semibold">Behavior & Fail Mode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-xs font-sans">
            <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-900/40 transition">
              <td className="p-3 font-mono font-semibold text-indigo-600 dark:text-indigo-300">.parse(input)</td>
              <td className="p-3 font-mono text-slate-700 dark:text-slate-300 text-[11px]">TOutput</td>
              <td className="p-3 text-slate-600 dark:text-slate-400">
                Synchronous. Throws <code className="text-rose-600 dark:text-rose-400 font-mono bg-rose-50 dark:bg-rose-950/40 px-1 py-0.5 rounded border border-rose-200 dark:border-rose-900/50">ValidationError</code> on invalid input or async pipelines.
              </td>
            </tr>
            <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-900/40 transition">
              <td className="p-3 font-mono font-semibold text-indigo-600 dark:text-indigo-300">.safeParse(input)</td>
              <td className="p-3 font-mono text-slate-700 dark:text-slate-300 text-[11px]">SafeParseResult&lt;TOutput&gt;</td>
              <td className="p-3 text-slate-600 dark:text-slate-400">
                Returns <code className="font-mono text-emerald-600 dark:text-emerald-400">&#123; success: true, data &#125;</code> or <code className="font-mono text-rose-600 dark:text-rose-400">&#123; success: false, error &#125;</code>.
              </td>
            </tr>
            <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-900/40 transition">
              <td className="p-3 font-mono font-semibold text-indigo-600 dark:text-indigo-300">.parseAsync(input)</td>
              <td className="p-3 font-mono text-slate-700 dark:text-slate-300 text-[11px]">Promise&lt;TOutput&gt;</td>
              <td className="p-3 text-slate-600 dark:text-slate-400">
                Asynchronous execution. Awaits all async transformations, refinements, and sub-schemas.
              </td>
            </tr>
            <tr className="hover:bg-slate-100/50 dark:hover:bg-slate-900/40 transition">
              <td className="p-3 font-mono font-semibold text-indigo-600 dark:text-indigo-300">.safeParseAsync(input)</td>
              <td className="p-3 font-mono text-slate-700 dark:text-slate-300 text-[11px]">Promise&lt;SafeParseResult&gt;</td>
              <td className="p-3 text-slate-600 dark:text-slate-400">
                Non-throwing Promise resolving to a strongly typed discriminated union. Alias: <code className="font-mono text-slate-700 dark:text-slate-300">.spa()</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <CodeBlock code={parseCode} />
    </section>
  );
};