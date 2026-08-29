import { CodeBlock } from "../components/CodeBlock";


export const CombinatorsSpecials = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Combinators, Unions & Special Types
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          High-performance discriminated union dispatchers, function contract wrappers, and recursive type references[cite: 1, 11, 15].
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CodeBlock
          title="Discriminated Unions (O(1) Branch Dispatch)"
          code={`const ActionSchema = infer.discriminatedUnion("type", [
  infer.object({
    type: infer.literal("ADD_TODO"),
    text: infer.string(),
  }),
  infer.object({
    type: infer.literal("DELETE_TODO"),
    id: infer.number(),
  }),
]);`}
        />

        <CodeBlock
          title="Recursive / Lazy Schemas"
          code={`interface TreeNode {
  id: string;
  children?: TreeNode[];
}

const TreeSchema: infer.Schema<TreeNode> = infer.lazy(() =>
  infer.object({
    id: infer.string(),
    children: infer.array(TreeSchema).optional(),
  })
);`}
        />
      </div>

      <CodeBlock
        title="Function Contract Schemas"
        code={`// Wraps a function to validate incoming arguments and outgoing return types
const AddFunction = infer.function(
  infer.tuple([infer.number(), infer.number()]),
  infer.number()
);

const safeAdd = AddFunction.parse((a, b) => a + b);
safeAdd(5, 10); // Returns 15
// safeAdd("5", 10) -> Throws ValidationError`}
      />
    </div>
  );
};