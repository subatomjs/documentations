import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  ShieldAlert,
} from "lucide-react";

export function Callout({ type = "note", title, children }) {
  const configs = {
    note: {
      border:
        "border-blue-500/30 dark:border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20",
      text: "text-blue-900 dark:text-blue-200",
      icon: <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />,
      defaultTitle: "Note",
    },
    tip: {
      border:
        "border-leaf-500/40 dark:border-leaf-500/25 bg-leaf-50/50 dark:bg-leaf-950/20",
      text: "text-leaf-950 dark:text-leaf-200",
      icon: (
        <CheckCircle className="w-4 h-4 text-leaf-500 flex-shrink-0 mt-0.5" />
      ),
      defaultTitle: "Pro Tip",
    },
    warning: {
      border:
        "border-amber-500/40 dark:border-amber-500/25 bg-amber-50/50 dark:bg-amber-950/20",
      text: "text-amber-950 dark:text-amber-200",
      icon: (
        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
      ),
      defaultTitle: "Warning",
    },
    danger: {
      border:
        "border-rose-500/40 dark:border-rose-500/25 bg-rose-50/50 dark:bg-rose-950/20",
      text: "text-rose-950 dark:text-rose-200",
      icon: (
        <ShieldAlert className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
      ),
      defaultTitle: "Important Security Boundary",
    },
  };

  const c = configs[type] || configs.note;

  return (
    <div className={`my-6 rounded-xl border p-4 ${c.border} ${c.text}`}>
      <div className="flex items-start space-x-3">
        {c.icon}
        <div className="text-xs leading-relaxed flex-1">
          <strong className="block font-semibold mb-1 text-surface-900 dark:text-surface-100">
            {title || c.defaultTitle}
          </strong>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
