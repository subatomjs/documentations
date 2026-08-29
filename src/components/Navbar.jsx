import { useState, useRef, useEffect, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Sun,
  Moon,
  Search,
  X,
  ChevronRight,
  FileText,
  Menu,
  Cpu,
  Terminal,
  Zap,
  FileCode,
  ListFilter,
  Boxes,
  Layers,
  Files,
  BookOpen,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { useTheme } from "../context/useTheme";

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
      { name: "TypeScript Inference Matrix", path: "/type-inference", icon: FileCode },
    ],
  },
];

const searchIndex = [
  { title: "Architecture & Engine", path: "/", keywords: ["pipeline", "ast", "performance", "sync", "async", "core"] },
  { title: "Installation & Setup", path: "/installation", keywords: ["npm", "pnpm", "yarn", "bun", "install", "esm", "cjs"] },
  { title: "Execution & SafeParse", path: "/execution-engine", keywords: ["parse", "safeparse", "parseasync", "spa", "validationerror"] },
  { title: "Primitives & Strings", path: "/primitives-strings", keywords: ["string", "email", "url", "uuid", "date", "regex", "trim", "cuid", "nanoid", "ipv4"] },
  { title: "Numbers & BigInt", path: "/numeric-bigint", keywords: ["number", "bigint", "int", "safe", "min", "max", "multipleof", "finite"] },
  { title: "Objects & Policies", path: "/objects-policies", keywords: ["object", "strict", "passthrough", "strip", "catchall", "extend", "merge", "pick", "omit", "partial", "keyof"] },
  { title: "Collections & Maps", path: "/collections", keywords: ["array", "tuple", "set", "record", "map", "nonempty", "length"] },
  { title: "File & Multi-File Schemas", path: "/file-uploads", keywords: ["file", "files", "mime", "extension", "storage", "upload", "bytes", "maxeach"] },
  { title: "Combinators & Specials", path: "/combinators-specials", keywords: ["union", "discriminatedunion", "intersection", "lazy", "function", "promise"] },
  { title: "Modifiers & Pipelines", path: "/modifiers-pipelines", keywords: ["transform", "refine", "superrefine", "pipe", "brand", "codec", "default", "prefault", "catch", "readonly"] },
  { title: "Coercion & Error AST", path: "/coercion-errors", keywords: ["coerce", "flatten", "format", "prettifyerror", "validationissue"] },
  { title: "TypeScript Inference Matrix", path: "/type-inference", keywords: ["infer", "input", "output", "types", "generics"] },
];

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  // Hotkey listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setMobileNavOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q))
    );
  }, [query]);

  const handleSelectSearch = (path) => {
    setIsSearchOpen(false);
    setQuery("");
    navigate(path);
  };

  const handleMobileNavClick = (path) => {
    setMobileNavOpen(false);
    navigate(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-[#07090E]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Nav Button */}
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 lg:hidden cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Subatom Brand Logos */}
            <Link to="/" onClick={() => setMobileNavOpen(false)} className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/drdfur81n/image/upload/v1787205050/subatom_lite_tpaiuf.png"
                alt="SubAtom Logo"
                width="120"
                height="36"
                className="h-8 sm:h-9 w-auto object-contain drop-shadow dark:hidden"
              />
              <img
                src="https://res.cloudinary.com/drdfur81n/image/upload/v1787205861/subatom_dark_frbair.png"
                alt="SubAtom Logo"
                width="120"
                height="36"
                className="h-8 sm:h-9 w-auto object-contain drop-shadow hidden dark:block"
              />
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              subatom-infer
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(true);
                setTimeout(() => searchInputRef.current?.focus(), 50);
              }}
              className="flex items-center justify-between w-36 sm:w-48 md:w-64 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-400 hover:border-indigo-500/50 transition cursor-pointer"
            >
              <span className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Search docs...</span>
              </span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700">
                Ctrl K
              </kbd>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 transition cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE DRAWER SLIDEOUT --- */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileNavOpen(false)}
          />

          {/* Drawer Sidebar */}
          <div className="relative w-80 max-w-[85vw] bg-white dark:bg-[#07090E] border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full overflow-y-auto shadow-2xl z-50">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">Documentation</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  v1.3.7
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 flex-1">
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
                            onClick={() => handleMobileNavClick(item.path)}
                            className={({ isActive }) =>
                              `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                                isActive
                                  ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold"
                                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-slate-200"
                              }`
                            }
                          >
                            <Icon className="w-4 h-4" />
                            <span>{item.name}</span>
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- SEARCH MODAL --- */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800 gap-3 bg-slate-50 dark:bg-slate-900/40">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search methods, types, schemas (e.g. uuid, strict, coerce)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none font-sans"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((item) => (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() => handleSelectSearch(item.path)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-left transition group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">
                            {item.keywords.join(", ")}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
                    </button>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No documentation found matching "<strong>{query}</strong>"
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400">
                  Type a keyword or method name to search the Subatom Infer manual.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};