import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import {
  BookOpen,
  Boxes,
  Cpu,
  FileCode,
  Files,
  Layers,
  ListFilter,
  ShieldAlert,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

const navigationGroups = [
  {
    title: "Overview",
    items: [
      { name: "Architecture & Engine", path: "/", icon: Cpu },
      { name: "Installation & Setup", path: "/installation", icon: Terminal },
      { name: "Execution & SafeParse", path: "/execution-engine", icon: Zap },
    ],
  },
  {
    title: "Primitives & Structures",
    items: [
      { name: "Primitives & Strings", path: "/primitives-strings", icon: FileCode },
      { name: "Numbers & BigInt", path: "/numeric-bigint", icon: ListFilter },
      { name: "Objects & Policies", path: "/objects-policies", icon: Boxes },
      { name: "Collections & Maps", path: "/collections", icon: Layers },
      { name: "File & Multi-File Schemas", path: "/file-uploads", icon: Files },
    ],
  },
  {
    title: "Advanced Composition",
    items: [
      { name: "Combinators & Specials", path: "/combinators-specials", icon: BookOpen },
      { name: "Modifiers & Pipelines", path: "/modifiers-pipelines", icon: Sparkles },
      { name: "Coercion & Error AST", path: "/coercion-errors", icon: ShieldAlert },
      { name: "Type Inference Matrix", path: "/type-inference", icon: FileCode },
    ],
  },
];

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8 py-8 w-full flex-1">
        {/* Sticky Sidebar Navigation */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-3">
          <div className="space-y-6">
            {navigationGroups.map((group, idx) => (
              <div key={idx}>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
                  {group.title}
                </div>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          end={item.path === "/"}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                              isActive
                                ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-slate-200"
                            }`
                          }
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{item.name}</span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Route Content Area */}
        <main className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-sm">
            <Outlet />
          </div>

          {/* Footer with SubAtom Logo */}
          <footer className="border-t border-slate-200 dark:border-slate-800/80 pt-6 mt-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono text-center sm:text-left">
              <div className="flex items-center gap-2">
                <img
                  src="https://res.cloudinary.com/drdfur81n/image/upload/v1786723815/SubAtom_short_logo_a3aa59.png"
                  alt="SubAtom Logo Mark"
                  width="16"
                  height="16"
                  className="h-4 w-4 object-contain"
                />
                <span>Subatom Library Architect Suite</span>
              </div>
              <div>MIT License • Strict TypeScript Architecture</div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};