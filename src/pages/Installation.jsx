import { useState } from "react";
import { Callout } from "../components/Callout";

const cmds = {
  npm: "npm install subatom-infer",
  pnpm: "pnpm add subatom-infer",
  yarn: "yarn add subatom-infer",
  bun: "bun add subatom-infer",
};

export const Installation = () => {
  const [activeTab, setActiveTab] = useState("npm");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Installation & Setup
        </h1>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
          Install Subatom Infer via your package manager of choice. Includes dual ESM/CJS bundles and embedded `.d.ts` declaration maps[cite: 4, 6, 7].
        </p>
      </div>

      <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-950">
        <div className="flex border-b border-slate-800 px-4 pt-2 bg-slate-900/60">
          {Object.keys(cmds).map((mgr) => (
            <button
              key={mgr}
              onClick={() => setActiveTab(mgr)}
              className={`px-3 py-1.5 font-mono text-xs transition border-b-2 ${
                activeTab === mgr
                  ? "border-indigo-500 text-indigo-400 font-semibold"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              {mgr}
            </button>
          ))}
        </div>
        <div className="p-4 font-mono text-xs text-slate-200">
          <code>{cmds[activeTab]}</code>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Runtime & Compiler Requirements</h3>
        <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-400 space-y-1">
          <li><strong>Node.js:</strong> &gt;= 24.0.0 LTS[cite: 1, 4]</li>
          <li><strong>TypeScript:</strong> &gt;= 5.0 (Recommended: Target <code className="font-mono text-indigo-500">ES2022</code> with <code className="font-mono text-indigo-500">NodeNext</code> module resolution)[cite: 1, 6]</li>
          <li><strong>Environments:</strong> Node.js, Bun, Deno, Cloudflare Workers, Modern Browsers[cite: 1]</li>
        </ul>
      </div>

      <Callout type="info" title="Zero Dependencies">
        Subatom Infer operates with zero runtime dependencies, providing high resilience and minimal overhead for microservices and edge computing environments.
      </Callout>
    </div>
  );
};