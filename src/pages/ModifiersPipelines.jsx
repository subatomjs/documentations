import { CodeBlock } from "../components/CodeBlock";
import { Callout } from "../components/Callout";

export const ModifiersPipelines = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Modifiers, Pipelines & Refinements
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          Transform values across multi-stage execution pipelines, apply contextual custom issue errors, and bind nominal branding tags[cite: 1, 16, 22, 23, 24].
        </p>
      </div>

      <CodeBlock
        title="Pipeline Composition & Refinements"
        code={`// 1. Modifiers & Defaults
const OptPort   = infer.number().default(3000);              // Output default if undefined
const Prefault  = infer.string().prefault("guest");          // Input default before validation
const CatchSafe = infer.number().catch(0);                   // Fallback on validation failure
const UserRole  = infer.readonly(infer.object({ role: infer.string() })); // Deep Object.freeze()

// 2. Sequential Pipeline
const NumericString = infer.pipe(
  infer.string(),
  infer.transform((s) => Number(s)),
  infer.number().int().positive()
);

// 3. SuperRefine Cross-Field Validation
const SignupSchema = infer.object({
  password: infer.string().min(8),
  confirmPassword: infer.string(),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: [...ctx.path, "confirmPassword"],
    });
  }
});

// 4. Nominal Type Branding
const UserIdSchema = infer.brand(infer.uuid(), "UserId");
type UserId = Infer<typeof UserIdSchema>; // string & { readonly [BrandSymbol]: "UserId" }`}
      />

      <Callout type="info" title="Default vs Prefault">
        <code className="font-mono">.default(val)</code> assigns the fallback directly to the output when input is <code className="font-mono">undefined</code>[cite: 17]. <code className="font-mono">.prefault(val)</code> assigns the value to the input <em>before</em> running the validation pipeline[cite: 21].
      </Callout>
    </div>
  );
};