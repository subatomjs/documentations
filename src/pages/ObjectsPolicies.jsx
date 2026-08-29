import { CodeBlock } from "../components/CodeBlock";
import { Callout } from "../components/Callout";

export const ObjectsPolicies = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Objects & Structural Policies
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          ObjectSchema provides complete control over key retention policies, transformations, structural merging, and key extractions[cite: 1, 14].
        </p>
      </div>

      <CodeBlock
        title="Object Key Policies & Composition"
        code={`const BaseUser = infer.object({
  id: infer.uuid(),
  name: infer.string(),
  role: infer.enum(["admin", "user"]),
});

// --- 1. Key Policies ---
const StrippedUser = BaseUser.strip();                  // Default: unknown keys discarded
const StrictUser   = BaseUser.strict();                 // Throws on unrecognized keys
const LooseUser    = BaseUser.passthrough();            // Retains unrecognized keys
const CatchallUser = BaseUser.catchall(infer.boolean()); // Validates unknown keys

// --- 2. Structural Composition ---
const ExtendedUser = BaseUser.extend({ email: infer.email() });
const MergedSchema = BaseUser.merge(infer.object({ traceId: infer.string() }));
const PickedName   = BaseUser.pick({ name: true });
const OmittedId    = BaseUser.omit({ id: true });

// --- 3. Optionality Modifiers ---
const PartialUser  = BaseUser.partial();     // All root properties optional
const RequiredUser = PartialUser.required(); // All root properties required
const DeepOptional = BaseUser.deepPartial(); // Recursively optional across nested objects

// --- 4. Introspection ---
const UserKeysEnum = BaseUser.keyof(); // Returns EnumSchema matching object keys`}
      />

      <Callout type="warning" title="Prototype Pollution Neutralization">
        Keys matching <code className="font-mono">__proto__</code> or <code className="font-mono">constructor</code> are explicitly skipped during key extraction to prevent object prototype pollution vulnerabilities[cite: 14].
      </Callout>
    </div>
  );
};