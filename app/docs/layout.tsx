import type { ReactNode } from 'react';
import Link from 'next/link';
import { SubatomLogo, SubatomShortLogo, Footer } from '@/components/site';
import { DocsSidebar, MobileNav, SearchBar } from '@/components/docs/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Github } from 'lucide-react';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:shadow-lg">
        Skip to content
      </a>

      <nav className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex min-h-16 items-center justify-between gap-2 sm:gap-4">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <MobileNav />
              <Link href="/" className="flex h-8 min-w-0 shrink-0 items-center" aria-label="Subatom home">
                <SubatomLogo className="hidden h-7 w-auto max-w-48 sm:block" />
              </Link>
            </div>

            <div className="hidden w-full max-w-xl flex-1 lg:flex lg:justify-center lg:px-4 xl:max-w-2xl">
              <SearchBar />
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <ThemeToggle />
              <a href="https://github.com/subatomjs/subatom" target="_blank" rel="noopener noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" aria-label="GitHub repository">
                <Github className="h-5 w-5" />
              </a>
              <Link href="/docs/getting-started" className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto flex w-full max-w-7xl gap-6 px-3 sm:gap-8 sm:px-6 lg:px-8">
        <aside className="hidden w-56 shrink-0 py-8 lg:block xl:w-60">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain pb-8 pr-2">
            <DocsSidebar />
          </div>
        </aside>

        <main id="main-content" className="min-w-0 flex-1 py-6 sm:py-8 lg:max-w-none">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
