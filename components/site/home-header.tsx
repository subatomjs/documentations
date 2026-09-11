'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { SubatomLogo, SubatomShortLogo } from '@/components/site';

const links = [
  ['/docs/introduction', 'Docs'],
  ['/docs/getting-started', 'Create a project'],
  ['/docs/production-example', 'Production example'],
];

export function HomeHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Subatom.js home" className="flex h-8 min-w-0 items-center">
          <SubatomLogo className="hidden h-8 w-auto sm:block" />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
              {label}
            </Link>
          ))}
          <a href="https://github.com/subatomjs/subatom" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
            GitHub
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/docs/getting-started" className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 sm:inline-flex">
            Get Started
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 lg:hidden"
            aria-label="Open main navigation"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Main navigation">
          <button type="button" className="absolute inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Close navigation overlay" />
          <div className="absolute right-0 top-0 flex h-dvh w-[min(24rem,calc(100vw-2rem))] flex-col border-l border-border bg-background p-5 shadow-2xl">
            <div className="flex h-10 items-center justify-between">
              <SubatomLogo className="h-7 w-auto max-w-[12rem]" />
              <button type="button" onClick={() => setOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Close main navigation">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-8 grid gap-2" aria-label="Mobile main navigation">
              {links.map(([href, label]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl border border-border px-4 py-3 text-sm font-medium hover:bg-secondary">
                  {label}
                </Link>
              ))}
              <a href="https://github.com/subatomjs/subatom" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border px-4 py-3 text-sm font-medium hover:bg-secondary">
                GitHub
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
