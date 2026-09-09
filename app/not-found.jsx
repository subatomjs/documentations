import Link from "next/link";
import { SubatomLogo } from "../components/Icons";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <SubatomLogo className="w-16 h-16 mb-4 animate-pulse" />
      <h1 className="text-4xl font-extrabold text-(--text-primary) mb-2">404 — Topic Not Found</h1>
      <p className="text-sm text-slate-400 max-w-md mb-8">
        The documentation page you requested does not exist or has been relocated within the Subatom
        Infer catalog.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white transition"
        >
          <Home className="h-4 w-4" /> Home
        </Link>
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 rounded-xl border border-(--border-color) px-4 py-2 text-xs font-semibold text-(--text-primary) hover:border-emerald-500 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Documentation
        </Link>
      </div>
    </div>
  );
}
