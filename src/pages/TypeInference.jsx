import { CodeBlock } from "../components/CodeBlock";
import { Callout } from "../components/Callout";

export const TypeInference = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          TypeScript Inference Matrix
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          Extract static compile-time input preconditions and transformed output types directly from runtime schemas[cite: 5, 36].
        </p>
      </div>

      <CodeBlock
        title="Input vs Output Static Type Extraction"
        code={`import { infer, type Infer, type Input, type Output } from "subatom-infer";

const UserRegistrationSchema = infer.object({
  id: infer.uuid(),
  age: infer.coerce.number(),
  createdAt: infer.string().transform((str) => new Date(str)),
});

// Transformed Output Type (What your application receives)
type User = Infer<typeof UserRegistrationSchema>;
// Equivalent to: Output<typeof UserRegistrationSchema>
// Result:
// {
//   id: string;
//   age: number;
//   createdAt: Date;
// }

// Precondition Input Type (What callers/HTTP requests must provide)
type UserInput = Input<typeof UserRegistrationSchema>;
// Result:
// {
//   id: string;
//   age: string | number;
//   createdAt: string;
// }`}
      />

      <Callout type="success" title="Zero Type Drift">
        By deriving all TypeScript interfaces directly from runtime schemas with <code className="font-mono">Infer&lt;typeof Schema&gt;</code>, runtime validation contracts and compile-time types always remain in lockstep[cite: 5, 36].
      </Callout>
    </div>
  );
};