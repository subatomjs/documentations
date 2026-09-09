/** biome-ignore-all lint/a11y/useSemanticElements: explanation */
import Image from "next/image";
import { SITE_METADATA } from "../lib/docsData";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 dark:bg-slate-950/80 backdrop-blur-md transition-all duration-300"
      role="status"
      aria-label="Loading documentation content"
    >
      {/* Ambient Glow Orbs */}
      <div className="absolute w-72 h-72 rounded-full bg-emerald-500/10 blur-[90px] animate-pulse" />
      <div
        className="absolute w-60 h-60 rounded-full bg-cyan-500/10 blur-[80px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative flex flex-col items-center p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 shadow-2xl shadow-emerald-500/5 backdrop-blur-xl">
        {/* Animated Multi-Layered Spinner Ring */}
        <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-emerald-500 to-cyan-500 opacity-30 blur-sm animate-pulse" />

        {/* Logo Container with Smooth Spin / Pulse */}
        <div className="relative z-10 p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-inner">
          <Image
            src={SITE_METADATA.logos.short}
            alt="Loading subatom-pulse..."
            width={44}
            height={44}
            priority
            fetchPriority="high"
            loading="eager"
            className="w-11 h-11 object-contain select-none animate-bounce"
            style={{ animationDuration: "2s" }}
          />
        </div>

        {/* Technical Loading Status */}
        <div className="mt-5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400 tracking-widest uppercase select-none">
            Initializing...
          </span>
        </div>
      </div>
    </div>
  );
}
