import { Cpu, ShieldCheck, Zap, Layers } from "lucide-react";
import { Callout } from "../components/Callout";
import { CodeBlock } from "../components/CodeBlock";

export const Architecture = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-semibold mb-3">
          Core Engine Specifications
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Subatom Infer Architecture
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          Subatom Infer is an ultra high-performance TypeScript runtime schema validation and compile-time type-inference engine engineered around non-mutating AST traversal and dual-pipeline execution[cite: 1, 5].
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
            <Zap className="w-4 h-4" />
            Dual-Pipeline Execution
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            Synchronous operations never poll or block event loops[cite: 1, 5]. If an asynchronous transform or refinement is detected during a synchronous <code className="font-mono text-indigo-500">.parse()</code> call, an explicit synchronous violation error is raised[cite: 1, 35].
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
            <ShieldCheck className="w-4 h-4" />
            Bidirectional Type Signatures
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            Inherits from <code className="font-mono text-indigo-500">Schema&lt;TOutput, TInput&gt;</code>, strictly differentiating preconditions accepted at runtime from post-coercion/transformation outputs inferred by TypeScript[cite: 1, 5, 35].
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
            <Cpu className="w-4 h-4" />
            Immutable AST & Prototype Hardening
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            Object keys matching <code className="font-mono text-indigo-500">__proto__</code> and <code className="font-mono text-indigo-500">constructor</code> are discarded during parser iteration to completely neutralize Prototype Pollution vulnerabilities[cite: 10, 14].
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
            <Layers className="w-4 h-4" />
            Discriminated Error Trees
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            Context paths maintain precise array indexes and object property paths across recursive evaluations without reallocating arrays for zero GC pressure[cite: 1, 5, 31].
          </p>
        </div>
      </div>

      <Callout type="info" title="Registry Bridge Architecture">
        To prevent circular dependencies across ESM/CJS build boundaries, fluent modifiers (such as <code className="font-mono">.optional()</code>, <code className="font-mono">.refine()</code>, <code className="font-mono">.transform()</code>) delegate directly to a decoupled runtime <code className="font-mono">schemaRegistry</code> bridge[cite: 18, 35].
      </Callout>

      <CodeBlock
        title="Schema Base Architecture (src/core/schema.ts)"
        code={`export abstract class Schema<TOutput, TInput = TOutput> {
  declare readonly _output: TOutput;
  declare readonly _input: TInput;

  abstract _parse(input: unknown, ctx: ParseContext): DynamicParseReturnType<TOutput>;

  parse(input: unknown): TOutput;
  async parseAsync(input: unknown): Promise<TOutput>;
  safeParse(input: unknown): ParseResult<TOutput>;
  async safeParseAsync(input: unknown): Promise<ParseResult<TOutput>>;
}`}
      />
    </div>
  );
};