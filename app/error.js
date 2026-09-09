"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "../components/BrandLogo";

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    // Log exception to diagnostic logging pipeline
    console.error("[subatom-pulse Application Crash]:", error);
  }, [error]);

  return (
    <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Brand Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" aria-label="Return home">
            <BrandLogo size="navbar" priority />
          </Link>
        </div>

        {/* Crash Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono mb-4 font-semibold">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Runtime Exception</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 dark:text-white tracking-tight mb-3">
          Something went wrong
        </h1>

        <p className="text-xs sm:text-sm text-surface-500 leading-relaxed mb-6">
          An unexpected error occurred while rendering this documentation segment. The active
          connection context has been interrupted.
        </p>

        {/* Debug Box */}
        {error?.message && (
          <div className="mb-8 text-left p-3.5 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900 overflow-x-auto">
            <p className="text-[11px] font-mono text-rose-600 dark:text-rose-400 wrap-break-word">
              {error.name || "Error"}: {error.message}
            </p>
            {error?.digest && (
              <p className="text-[10px] font-mono text-surface-400 mt-1">
                Digest ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Recovery Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-leaf-600 hover:bg-leaf-500 text-white font-semibold text-xs transition shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-900 hover:bg-surface-200 dark:hover:bg-surface-850 text-surface-700 dark:text-surface-200 font-semibold text-xs transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
