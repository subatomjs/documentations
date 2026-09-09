"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Cpu, Sparkles } from "lucide-react";

export default function LiveValidatorPlayground() {
  const [scenario, setScenario] = useState("valid");

  const scenarios = {
    valid: {
      label: "Valid User Payload",
      input: {
        id: "550e8400-e29b-41d4-a716-446655440000",
        username: "  DeveloperAlex ",
        email: "alex@subatomjs.dev",
        age: "26",
        role: "admin",
      },
      output: {
        success: true,
        data: {
          id: "550e8400-e29b-41d4-a716-446655440000",
          username: "developeralex",
          email: "alex@subatomjs.dev",
          age: 26,
          role: "admin",
        },
      },
    },
    coerced: {
      label: "Smart Coercion",
      input: {
        id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        username: "SarahConnor",
        email: "sarah@skynet.dev",
        age: "31",
        role: undefined,
      },
      output: {
        success: true,
        data: {
          id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
          username: "sarahconnor",
          email: "sarah@skynet.dev",
          age: 31,
          role: "member",
        },
      },
    },
    prototype: {
      label: "Prototype Injection Defense",
      input: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        username: "HackerOne",
        email: "sec@test.org",
        age: 29,
        __proto__: { isAdmin: true },
        constructor: { evil: true },
      },
      output: {
        success: true,
        data: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          username: "hackerone",
          email: "sec@test.org",
          age: 29,
          role: "member",
        },
      },
    },
    invalid: {
      label: "Constraint Violations",
      input: {
        id: "invalid-uuid-format",
        username: "al",
        email: "not-an-email",
        age: 14,
      },
      output: {
        success: false,
        error: {
          fieldErrors: {
            id: ["Invalid UUID string"],
            username: ["String must contain at least 3 character(s)"],
            email: ["Invalid email address"],
            age: ["Number must be greater than or equal to 18"],
          },
        },
      },
    },
  };

  const current = scenarios[scenario];

  return (
    <div className="relative rounded-2xl border border-(--border-color) bg-(--bg-card) p-4 sm:p-6 shadow-xl transition-colors duration-200">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--border-color) pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Cpu className="h-4 w-4" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-(--text-primary)">
            Live Runtime Sandbox
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {Object.entries(scenarios).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => setScenario(key)}
              className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                scenario === key
                  ? "bg-emerald-600 text-white font-semibold shadow-sm"
                  : "bg-(--bg-tertiary) text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        {/* Left: Input */}
        <div className="rounded-xl border border-(--border-color) bg-(--bg-secondary) p-3.5 space-y-2 transition-colors duration-200">
          <div className="flex items-center justify-between text-(--text-secondary) font-semibold pb-1 border-b border-(--border-color)">
            <span>Incoming Raw Payload</span>
            <span className="text-[10px] text-(--text-muted) font-normal">Untrusted Input</span>
          </div>
          <pre className="overflow-x-auto text-(--text-primary) leading-relaxed font-mono">
            {JSON.stringify(current.input, null, 2)}
          </pre>
        </div>

        {/* Right: Output */}
        <div className="rounded-xl border border-(--border-color) bg-(--bg-secondary) p-3.5 space-y-2 transition-colors duration-200">
          <div className="flex items-center justify-between pb-1 border-b border-(--border-color)">
            <span className="text-(--text-secondary) font-semibold">Validation Outcome</span>
            {current.output.success ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" /> 200 OK
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-rose-700 dark:text-rose-400 font-bold">
                <XCircle className="h-3.5 w-3.5" /> 422 Invalid
              </span>
            )}
          </div>
          <pre
            className={`overflow-x-auto leading-relaxed font-mono font-medium ${current.output.success ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}
          >
            {JSON.stringify(current.output, null, 2)}
          </pre>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-(--text-muted) font-mono">
        <span className="flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
          Execution time:{" "}
          <strong className="text-emerald-700 dark:text-emerald-400">~0.03ms</strong>
        </span>
        <span>Prototype-pollution protected</span>
      </div>
    </div>
  );
}
