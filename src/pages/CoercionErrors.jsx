import { CodeBlock } from "../components/CodeBlock";
import { Callout } from "../components/Callout";

export const CoercionErrors = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Coercion Engine & Error Formatting AST
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          Transform loose environment variables/query strings into strictly typed primitives, and extract structured diagnostic trees[cite: 1, 5, 27, 32].
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CodeBlock
          title="Primitive Coercion Factory (infer.coerce)"
          code={`infer.coerce.string();
infer.coerce.number().int();
infer.coerce.boolean();
infer.coerce.bigint();
infer.coerce.date();

// Query parameter parsing
const PortSchema = infer.coerce.number().min(1000).max(65535);
const port = PortSchema.parse("8080"); // Returns number: 8080`}
        />

        <CodeBlock
          title="Error Formatting APIs (src/core/error.ts)"
          code={`try {
  UserSchema.parse(invalidPayload);
} catch (err) {
  if (err instanceof ValidationError) {
    // 1. Flattened key-value record
    console.log(err.flatten());
    // { formErrors: [], fieldErrors: { "user.email": ["Invalid email"] } }

    // 2. Nested Tree Structure
    console.log(err.format());

    // 3. Human-readable CLI summary
    console.log(err.prettifyError());
  }
}`}
        />
      </div>

      <Callout type="info" title="Boolean Coercion Intelligence">
        <code className="font-mono">infer.coerce.boolean()</code> correctly handles truthy and falsy strings like <code className="font-mono">"false"</code>, <code className="font-mono">"0"</code>, and <code className="font-mono">"off"</code> converting them to <code className="font-mono">false</code>[cite: 27].
      </Callout>
    </div>
  );
};