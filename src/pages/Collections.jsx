import { CodeBlock } from "../components/CodeBlock";

export const Collections = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Collections: Arrays, Tuples, Sets, Records & Maps
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          Strict schema validation across JavaScript native collections, length constraints, and dictionary maps[cite: 1, 10].
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CodeBlock
          title="Arrays & Fixed Tuples"
          code={`// 1. Array with bounds
const Tags = infer.array(infer.string())
  .min(1)
  .max(10)
  .nonempty();

// 2. Positional Tuples with optional elements
const Coordinate = infer.tuple([
  infer.number(),
  infer.number(),
  infer.number().optional(),
]);`}
        />

        <CodeBlock
          title="Records, Sets & Maps"
          code={`// 1. Dynamic Key-Value Dictionary
const Config = infer.record(
  infer.string().min(2),
  infer.number()
);

// 2. Native ES6 Sets
const Roles = infer.set(infer.string()).min(1);

// 3. Native ES6 Maps
const SessionLookup = infer.map(infer.uuid(), infer.boolean());`}
        />
      </div>
    </div>
  );
};