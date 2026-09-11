import Link from 'next/link';
import { SubatomLogo } from './logo';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <SubatomLogo className="h-8 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">
              The TypeScript-first Node.js framework.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Documentation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/docs/introduction" className="hover:text-foreground transition-colors">Introduction</Link></li>
              <li><Link href="/docs/getting-started" className="hover:text-foreground transition-colors">Getting Started</Link></li>
              <li><Link href="/docs/router" className="hover:text-foreground transition-colors">Routing</Link></li>
              <li><Link href="/docs/middleware" className="hover:text-foreground transition-colors">Middleware</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Guides</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/docs/validation" className="hover:text-foreground transition-colors">Validation</Link></li>
              <li><Link href="/docs/error-handling" className="hover:text-foreground transition-colors">Error Handling</Link></li>
              <li><Link href="/docs/subatom-pulse" className="hover:text-foreground transition-colors">Real-time</Link></li>
              <li><Link href="/docs/openapi" className="hover:text-foreground transition-colors">OpenAPI</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Ecosystem</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/docs/getting-started" className="hover:text-foreground transition-colors">create-subatom</Link></li>
              <li><a href="https://pulse.subatomjs.dev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Subatom Pulse</a></li>
              <li><a href="https://infer.subatomjs.dev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Subatom Infer</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://github.com/subatomjs/subatom" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </li>
              <li><Link href="/docs/architecture" className="hover:text-foreground transition-colors">Architecture</Link></li>
              <li><Link href="/docs/production-example" className="hover:text-foreground transition-colors">Production Example</Link></li>
              <li><Link href="/docs/deployment" className="hover:text-foreground transition-colors">Deployment</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Subatom.js — Open source under the MIT License.</p>
        </div>
      </div>
    </footer>
  );
}
