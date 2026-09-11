'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docSections, allDocs } from '@/lib/docs';
import { searchIndex } from '@/lib/search-index';
import { SubatomLogo } from '@/components/site';
import { ChevronRight, Menu, Search, X } from 'lucide-react';

export function DocsSidebar({ onNavigate }: { onNavigate?: () => void } = {}) {
  const pathname = usePathname();
  const currentSlug = pathname?.split('/').filter(Boolean).pop() || '';

  return (
    <nav aria-label="Documentation navigation" className="space-y-7 text-sm">
      {docSections.map((section) => (
        <div key={section.slug} className="space-y-2">
          <h2 className="px-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
            {section.title}
          </h2>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = currentSlug === item.slug;
              return (
                <li key={item.slug}>
                  <Link
                    href={`/docs/${item.slug}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={onNavigate}
                    className={`group flex min-h-9 items-center rounded-lg px-2.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                      isActive
                        ? 'bg-primary/10 font-medium text-primary'
                        : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 lg:hidden"
        aria-label="Open documentation navigation"
        aria-expanded={open}
        aria-controls="mobile-docs-navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Documentation navigation">
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close navigation overlay"
          />
          <aside
            id="mobile-docs-navigation"
            className="relative flex h-dvh w-[min(22rem,calc(100vw-2.5rem))] max-w-full flex-col border-r border-border bg-background shadow-2xl"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
              <Link href="/" className="flex min-w-0 items-center" aria-label="Subatom home">
                <SubatomLogo className="h-7 w-auto max-w-[12rem]" />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="shrink-0 px-4 py-4">
              <SearchBar id="mobile-docs-search" />
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-8">
              <DocsSidebar onNavigate={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export function SearchBar({ id = 'docs-search' }: { id?: string }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const listId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return searchIndex
      .map((entry) => {
        const title = entry.title.toLowerCase();
        const section = entry.section.toLowerCase();
        const keywords = entry.keywords.join(' ').toLowerCase();
        const text = entry.text.toLowerCase();

        let score = 0;
        if (title === q) score += 100;
        if (title.includes(q)) score += 50;
        if (section.includes(q)) score += 20;
        if (keywords.includes(q)) score += 15;
        if (text.includes(q)) score += 5;

        return { entry, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ entry }) => entry);
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        document.querySelector<HTMLInputElement>('input[type=\"search\"]')?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const showResults = focused && query.trim().length > 0;

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <input
          id={id}
          type="search"
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 180)}
          className="h-10 w-full rounded-lg border border-border bg-card/60 pl-9 pr-16 text-sm text-foreground placeholder:text-muted-foreground shadow-sm transition-colors focus:border-primary/60 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label="Search documentation"
          aria-expanded={showResults}
          aria-controls={showResults ? listId : undefined}
          role="combobox"
          autoComplete="off"
        />
        <div className="pointer-events-none absolute right-2 flex items-center">
          <kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        </div>
      </div>

      {showResults && (
        <div id={listId} className="absolute left-0 right-0 top-full z-[70] mt-1.5 max-h-[min(28rem,calc(100vh-7rem))] overflow-y-auto rounded-xl border border-border bg-popover p-1.5 shadow-xl">
          {results.length > 0 ? (
            results.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                onMouseDown={(event) => event.preventDefault()}
                className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary/70 focus-visible:bg-secondary/70 focus-visible:outline-none"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="min-w-0 text-sm font-medium text-foreground">{doc.title}</span>
                  <span className="shrink-0 rounded bg-secondary/80 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {doc.section}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {doc.text.slice(0, 120)}...
                </p>
              </Link>
            ))
          ) : (
            <div className="py-6 text-center text-xs text-muted-foreground">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function Breadcrumbs({ slug }: { slug: string }) {
  const doc = useMemo(() => allDocs.find((d) => d.slug === slug), [slug]);
  if (!doc) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
      <Link href="/" className="shrink-0 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
        Home
      </Link>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />
      <Link href="/docs/introduction" className="shrink-0 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
        Docs
      </Link>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />
      <span className="min-w-0 truncate font-medium text-foreground">{doc.title}</span>
    </nav>
  );
}

export function TableOfContents({ headings }: { headings: { id: string; text: string; level: number }[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!headings.length) return;
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav aria-label="On this page" className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">On this page</p>
      <ul className="space-y-1 border-l border-border/60 text-sm">
        {headings.map((heading, index) => {
          const depth = Math.max(0, heading.level - 2);
          const isActive = activeId === heading.id;
          return (
            <li key={`${heading.id}-${index}`} style={{ paddingLeft: `${depth * 10 + 12}px` }}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`block border-l-2 py-0.5 pl-2 leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  isActive ? '-ml-px border-primary text-primary' : '-ml-px border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
