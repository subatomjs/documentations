import Image from "next/image";
import { SITE_METADATA } from "./lib/docs-config";

export default function Loading() {
  return (
    <output
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-surface-950/80 backdrop-blur-xs transition-opacity"
      aria-label="Loading documentation content"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Radial Pulse Backdrop */}
        <div className="absolute -inset-4 rounded-full bg-leaf-500/15 animate-ping" />

        {/* Centered Short Logo Icon */}
        <div className="relative z-10 p-3 rounded-2xl bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-800 shadow-lg">
          <Image
            src={SITE_METADATA.logos.short}
            alt="Loading subatom-pulse..."
            width={40}
            height={40}
            priority
            className="w-10 h-10 object-contain select-none animate-pulse"
          />
        </div>

        {/* Polished Technical Pulse Text */}
        <span className="mt-4 text-[11px] font-mono text-surface-500 tracking-wider uppercase select-none animate-pulse">
          Connecting…
        </span>
      </div>
    </output>
  );
}