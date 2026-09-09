"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { X } from "lucide-react";

export default function DocsLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
        <div className="flex">
          {/* Desktop Left Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Mobile Left Sidebar Drawer */}
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <button
                type="button"
                aria-label="Close sidebar"
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
                onClick={() => setMobileSidebarOpen(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Escape") {
                    setMobileSidebarOpen(false);
                  }
                }}
              />
              <div className="relative z-10 w-72 max-w-xs bg-(--bg-primary) p-4 shadow-2xl border-r border-(--border-color) h-full overflow-y-auto">
                <div className="flex items-center justify-between pb-4 border-b border-(--border-color) mb-4">
                  <span className="text-xs font-bold uppercase font-mono tracking-wider text-slate-400">
                    Documentation
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileSidebarOpen(false)}
                    className="rounded p-1 text-slate-400 hover:text-slate-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <Sidebar onItemClick={() => setMobileSidebarOpen(false)} />
              </div>
            </div>
          )}

          {/* Main Documentation Body */}
          <main className="flex-1 py-8 lg:px-8 max-w-4xl min-w-0">{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
