"use client";

import { useState } from "react";
import { usePreferences } from "../context/PreferencesContext";
import { Check, Copy, Terminal } from "lucide-react";

export default function TerminalBlock({ commandOverride = null }) {
  const { packageManager, setPackageManager } = usePreferences();
  const [copied, setCopied] = useState(false);

  const commands = {
    npm: commandOverride || "npm install subatom-infer",
    pnpm: commandOverride
      ? commandOverride.replace("npm i", "pnpm add").replace("npm install", "pnpm add")
      : "pnpm add subatom-infer",
    yarn: commandOverride
      ? commandOverride.replace("npm i", "yarn add").replace("npm install", "yarn add")
      : "yarn add subatom-infer",
    bun: commandOverride
      ? commandOverride.replace("npm i", "bun add").replace("npm install", "bun add")
      : "bun add subatom-infer",
  };

  const currentCommand = commands[packageManager] || commands.npm;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="my-5 rounded-xl border border-(--border-terminal) bg-(--bg-terminal) shadow-md overflow-hidden font-mono text-sm transition-colors duration-200">
      {/* Chrome header */}
      <div className="flex items-center justify-between border-b border-(--border-terminal) bg-(--bg-terminal-header) px-4 py-2.5 transition-colors duration-200">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ef4444]" />
          <div className="h-3 w-3 rounded-full bg-[#eab308]" />
          <div className="h-3 w-3 rounded-full bg-[#22c55e]" />
          <span className="ml-2 text-xs font-medium text-(--text-secondary) flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-(--text-muted) cursor-pointer" />
            bash — 80x24
          </span>
        </div>

        {/* Package manager tabs */}
        <div className="flex items-center gap-1 rounded-md bg-(--bg-primary) p-0.5 border border-(--border-terminal) text-xs shadow-inner">
          {["npm", "pnpm", "yarn", "bun"].map((pm) => (
            <button
              key={pm}
              type="button"
              onClick={() => setPackageManager(pm)}
              className={`cursor-pointer rounded px-2 py-0.5 transition ${
                packageManager === pm
                  ? "bg-(--brand-glow) text-(--brand-primary) font-bold border border-(--brand-primary)/40 shadow-sm"
                  : "text-(--text-secondary) hover:text-(--text-primary)"
              }`}
            >
              {pm}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal prompt */}
      <div className="relative flex items-center justify-between p-4 text-(--text-terminal) transition-colors duration-200">
        <div className="flex items-center gap-3 overflow-x-auto">
          <span className="text-(--terminal-prompt) select-none font-bold">$</span>
          <span className="font-semibold text-sm">{currentCommand}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy install command"
          className="cursor-pointer ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-(--border-terminal) bg-(--bg-primary) text-(--text-secondary) transition hover:border-(--brand-primary) hover:text-(--brand-primary) shadow-sm"
        >
          {copied ? (
            <Check className="h-4 w-4 text-(--brand-primary) cursor-pointer" />
          ) : (
            <Copy className="h-4 w-4 cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
}
