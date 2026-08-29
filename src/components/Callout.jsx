import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";

const variants = {
  info: {
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/5 dark:bg-indigo-500/10",
    text: "text-indigo-900 dark:text-indigo-300",
    icon: Info,
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  warning: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5 dark:bg-amber-500/10",
    text: "text-amber-900 dark:text-amber-300",
    icon: AlertTriangle,
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  danger: {
    border: "border-rose-500/30",
    bg: "bg-rose-500/5 dark:bg-rose-500/10",
    text: "text-rose-900 dark:text-rose-300",
    icon: AlertCircle,
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  success: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
    text: "text-emerald-900 dark:text-emerald-300",
    icon: CheckCircle2,
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
};

export const Callout = ({ type = "info", title, children }) => {
  const v = variants[type] || variants.info;
  const Icon = v.icon;

  return (
    <div className={`p-4 my-4 rounded-xl border ${v.border} ${v.bg} flex gap-3.5`}>
      <Icon className={`w-5 h-5 shrink-0 ${v.iconColor} mt-0.5`} />
      <div className="space-y-1">
        {title && <h4 className={`font-semibold text-xs ${v.text}`}>{title}</h4>}
        <div className={`text-xs leading-relaxed ${v.text}`}>{children}</div>
      </div>
    </div>
  );
};