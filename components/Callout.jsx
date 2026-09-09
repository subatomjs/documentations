import { Info, AlertTriangle, ShieldAlert, Sparkles } from "lucide-react";

export default function Callout({ type = "note", title = null, children }) {
  const configs = {
    note: {
      border: "border-sky-600/40 bg-sky-500/10 text-sky-950 dark:text-sky-200",
      icon: <Info className="h-4 w-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />,
      defaultTitle: "Note",
    },
    tip: {
      border:
        "border-[var(--brand-primary)]/40 bg-[var(--brand-glow)] text-[var(--text-primary)] dark:text-emerald-200",
      icon: <Sparkles className="h-4 w-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />,
      defaultTitle: "Tip",
    },
    warning: {
      border: "border-amber-600/40 bg-amber-500/10 text-amber-950 dark:text-amber-200",
      icon: (
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      ),
      defaultTitle: "Warning",
    },
    danger: {
      border: "border-rose-600/40 bg-rose-500/10 text-rose-950 dark:text-rose-200",
      icon: <ShieldAlert className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />,
      defaultTitle: "Important",
    },
  };

  const current = configs[type] || configs.note;

  return (
    <div
      className={`my-5 flex gap-3 rounded-xl border p-4 text-xs sm:text-sm leading-relaxed ${current.border}`}
    >
      {current.icon}
      <div>
        <strong className="block font-bold mb-0.5 tracking-wide text-(--text-primary)">
          {title || current.defaultTitle}
        </strong>
        <div className="font-medium text-(--text-secondary) opacity-100">{children}</div>
      </div>
    </div>
  );
}
