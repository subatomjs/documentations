import { CodeBlock } from "../components/CodeBlock";
import { Callout } from "../components/Callout";

export const NumericBigInt = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Numbers & BigInt Validation
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          High-precision numeric bounds, safe IEEE-754 range checks, integer assertions, and arbitrary-precision BigInt schemas[cite: 1, 5, 26, 29].
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CodeBlock
          title="Number Constraints (src/primitives/number.ts)"
          code={`infer.number()
  .int()          // Must be an integer
  .safe()         // Within Number.MIN_SAFE_INTEGER & MAX_SAFE_INTEGER
  .finite()       // Rejects Infinity / -Infinity
  .positive()     // > 0
  .nonnegative()  // >= 0
  .negative()     // < 0
  .nonpositive()  // <= 0
  .min(1)         // Lower bound (inclusive)
  .max(100)       // Upper bound (inclusive)
  .gt(0)          // Strictly greater than
  .lt(101)        // Strictly less than
  .multipleOf(5); // Float-safe precision step validation`}
        />

        <CodeBlock
          title="BigInt Constraints (src/primitives/bigint.ts)"
          code={`infer.bigint()
  .positive()     // > 0n
  .nonnegative()  // >= 0n
  .negative()     // < 0n
  .nonpositive()  // <= 0n
  .min(100n)      // >= 100n
  .max(1000000n)  // <= 1000000n
  .gt(50n)        // > 50n
  .lt(500n)       // < 500n
  .multipleOf(10n);`}
        />
      </div>

      <Callout type="info" title="Float-Safe Remainder Algorithm">
        Subatom Infer avoids floating point inaccuracies (e.g. <code className="font-mono">0.3 % 0.1 !== 0</code>) in <code className="font-mono">.multipleOf()</code> by calculating dynamic precision scalar offsets based on the decimal length of the input and step values[cite: 29].
      </Callout>
    </div>
  );
};