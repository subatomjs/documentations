"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, Cpu } from "lucide-react";

export default function HeroGraphic() {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    {
      id: 0,
      badge: "Step 01",
      title: "Unknown Runtime Payload",
      status: "Untrusted Boundary",
      code: `{\n  "id": "123e4567-e89b...",\n  "username": "  AlexDev ",\n  "age": "28",\n  "__proto__": { "hack": true }\n}`,
    },
    {
      id: 1,
      badge: "Step 02",
      title: "Subatom Infer Schema",
      status: "Defense & Spec",
      code: `const User = infer.object({\n  id: infer.uuid(),\n  username: infer.string().trim().toLowerCase(),\n  age: infer.coerce.number().int().min(18)\n}).strict();`,
    },
    {
      id: 2,
      badge: "Step 03",
      title: "Clean Validated Output",
      status: "Pollution-Free & Safe",
      code: `const result = User.safeParse(input);\n// result.success: true\n// result.data.username === "alexdev"\n// result.data.age === 28 (coerced number)`,
    },
    {
      id: 3,
      badge: "Step 04",
      title: "Static Inferred Type",
      status: "Zero Runtime Overhead",
      code: `type User = Infer<typeof User>;\n/*\n  type User = {\n    id: string;\n    username: string;\n    age: number;\n  }\n*/`,
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-4xl rounded-2xl border border-(--border-color) bg-(--bg-card) p-4 sm:p-6 shadow-xl transition-colors duration-200">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-(--border-color) pb-4">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-mono font-bold tracking-wider text-(--text-primary) uppercase">
            Data Flow Pipeline Execution
          </span>
        </div>
        <div className="flex gap-1 bg-(--bg-secondary) p-1 rounded-lg border border-(--border-color)">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`cursor-pointer px-2.5 py-1 text-xs font-mono rounded transition ${
                activeStep === idx
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/40 shadow-sm"
                  : "text-(--text-secondary) hover:text-(--text-primary)"
              }`}
            >
              0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Step details */}
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            {steps[activeStep].status}
          </span>
          <h3 className="text-xl font-bold text-(--text-primary)">{steps[activeStep].title}</h3>
          <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
            Data passes through isolated parsing contexts. Prototype injection keys like{" "}
            <code className="text-amber-700 dark:text-amber-400 font-mono font-semibold">
              __proto__
            </code>{" "}
            are strictly neutralized, transformations applied, and static type guarantees emitted.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 text-xs font-semibold text-white transition shadow-sm"
            >
              Next Phase →
            </button>
          </div>
        </div>

        {/* Right: Code display box */}
        <div className="rounded-xl border border-(--border-code) bg-(--bg-code) p-4 font-mono text-xs shadow-sm transition-colors duration-200">
          <div className="flex items-center justify-between border-b border-(--border-code) pb-2 mb-3 text-(--text-muted)">
            <span className="font-semibold">{steps[activeStep].badge}</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> verified
            </span>
          </div>
          <pre className="text-(--text-code-plain) overflow-x-auto whitespace-pre leading-relaxed font-mono">
            {steps[activeStep].code}
          </pre>
        </div>
      </div>
    </div>
  );
}
