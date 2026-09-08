"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { useDevPreferences } from "./Providers";

export function TerminalBlock({ command = "install subatom-pulse" }) {
  const { pkgManager, setPkgManager } = useDevPreferences();
  const [copied, setCopied] = useState(false);

  const getFullCommand = (pkg) => {
    if (pkg === "npm") return `npm ${command}`;
    if (pkg === "pnpm") return `pnpm ${command.replace("install", "add")}`;
    if (pkg === "yarn") return `yarn ${command.replace("install", "add")}`;
    if (pkg === "bun") return `bun ${command.replace("install", "add")}`;
    return `npm ${command}`;
  };

  const activeCommand = getFullCommand(pkgManager);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  return (
    <div className="my-6 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-950 overflow-hidden shadow-sm transition">
      {/* macOS Terminal Window Header */}
      <div className="px-4 py-2.5 bg-surface-100/90 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[11px] font-mono text-surface-500 ml-2 flex items-center gap-1">
            <Terminal className="w-3 h-3 text-leaf-500" /> zsh — terminal
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Package Manager Selector */}
          <div className="flex items-center bg-surface-200 dark:bg-surface-850 p-0.5 rounded-md text-[11px] font-mono">
            {["npm", "pnpm", "yarn", "bun"].map((pkg) => (
              <button
                key={pkg}
                type="button"
                onClick={() => setPkgManager(pkg)}
                className={`px-2 py-0.5 rounded transition ${
                  pkgManager === pkg
                    ? "bg-white dark:bg-surface-700 text-leaf-600 dark:text-leaf-400 font-semibold shadow-sm"
                    : "text-surface-500 hover:text-surface-900 dark:hover:text-white"
                }`}
              >
                {pkg}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy terminal command"
            className="p-1 rounded text-surface-500 hover:text-surface-900 dark:hover:text-white transition"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-leaf-600 dark:text-leaf-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-xs flex items-center space-x-2.5 text-surface-800 dark:text-surface-200">
        <span className="text-leaf-600 dark:text-leaf-400 select-none font-bold">
          $
        </span>
        <span className="text-surface-900 dark:text-surface-100 font-medium">
          {activeCommand}
        </span>
      </div>
    </div>
  );
}
