/** biome-ignore-all lint/a11y/useSemanticElements: explanation */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SITE_METADATA } from "../lib/docs-config";

export function InitialLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dismiss loader once browser mounts
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-surface-950 transition-opacity duration-300"
      aria-label="Loading..."
      role="status"
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute -inset-4 rounded-full bg-leaf-500/15 animate-ping" />
        <div className="relative z-10 p-3 rounded-2xl bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 shadow-lg">
          <Image
            src={SITE_METADATA.logos.short}
            alt="Subatom Pulse"
            width={40}
            height={40}
            priority
            className="w-10 h-10 object-contain select-none animate-pulse"
          />
        </div>
        <span className="mt-4 text-[11px] font-mono text-surface-500 tracking-wider uppercase select-none animate-pulse">
          Connecting…
        </span>
      </div>
    </div>
  );
}