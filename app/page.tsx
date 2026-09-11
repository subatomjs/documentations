import {
  CodeTabs,
  Footer,
  InstallCommand,
} from '@/components/site';
import { HomeHeader } from '@/components/site/home-header';
import { ArrowRight, Box, CheckCircle2, FileCode2, GitBranch, Layers3, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

const tsQuickStart = `import { Subatom } from "subatom";

const app = new Subatom();

app.get("/hello", {
  controller: (ctx) => {
    ctx.res.json({ message: "Hello, World!" });
  },
});

await app.listen(8080);`;

const jsQuickStart = `import { Subatom } from "subatom";

const app = new Subatom();

app.get("/hello", {
  controller: (ctx) => {
    ctx.res.json({ message: "Hello, World!" });
  },
});

await app.listen(8080);`;

const features = [
  ['Routing', 'Trie-based routing, route groups, resources, parameters, and URL generation.', GitBranch],
  ['Validation', 'Request validation with Subatom Infer and Standard Schema-oriented integrations.', ShieldCheck],
  ['OpenAPI', 'Generate an OpenAPI specification and serve an interactive Swagger UI.', FileCode2],
  ['Middleware', 'Compose global, group, route, transformer, interceptor, and serializer layers.', Layers3],
  ['File uploads', 'Multipart parsing with file helpers, storage strategies, and streaming support.', Box],
  ['Real-time', 'Integrate subatom-pulse with the same Node.js HTTP server for authenticated WebSockets, rooms, acknowledgements, and lifecycle control.', Zap],
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />

      <main>
        <section className="relative overflow-hidden border-b border-border/70">
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Subatom.js 2.x
              </div>
              <h1 className="text-balance text-5xl font-bold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Build production APIs with
                <span className="block text-primary">Subatom.js</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                A Node.js backend framework with routing, middleware, runtime validation, file uploads, OpenAPI integration, and a structured request pipeline — plus focused companion packages for validation and real-time applications.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/docs/getting-started" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5">
                  Start building <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/docs/introduction" className="inline-flex items-center justify-center rounded-xl border border-border bg-card/70 px-6 py-3.5 font-semibold transition-colors hover:bg-secondary">
                  Read the documentation
                </Link>
              </div>
            </div>

            <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-border/80 bg-card/70 p-2 shadow-2xl shadow-black/5 backdrop-blur sm:mt-16">
              <CodeTabs
                filename="index.ts / index.js"
                tabs={[
                  { label: 'TypeScript', language: 'typescript', code: tsQuickStart },
                  { label: 'JavaScript', language: 'javascript', code: jsQuickStart },
                ]}
              />
            </div>

            <div className="mx-auto mt-8 max-w-2xl">
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">Create a project</p>
              <InstallCommand baseCommand="create subatom@latest my-app" isCreate />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">Framework capabilities</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Everything developers need to build a serious backend.</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">Explore the APIs, concepts, and production patterns that make up the Subatom ecosystem.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(([title, description, Icon]) => (
              <article key={title} className="group rounded-2xl border border-border bg-card/60 p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-secondary/35">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24">
            <div>
              <p className="text-sm font-semibold text-primary">Ecosystem</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">One framework, focused companion packages.</h2>
              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">Subatom.js is the core framework. Subatom Infer handles runtime validation, while Subatom Pulse provides the WebSocket layer. Keep the main framework docs focused and jump to the dedicated package docs when you need deeper detail.</p>
            </div>
            <div className="grid gap-3">
              <a href="https://infer.subatomjs.dev" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
                <div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" /><span className="font-semibold">Subatom Infer</span></div>
                <p className="mt-2 text-sm text-muted-foreground">Runtime validation for unknown data.</p>
              </a>
              <a href="https://pulse.subatomjs.dev" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
                <div className="flex items-center gap-3"><Zap className="h-5 w-5 text-primary" /><span className="font-semibold">Subatom Pulse</span></div>
                <p className="mt-2 text-sm text-muted-foreground">WebSocket functionality for real-time applications.</p>
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to build?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">Start with create-subatom, then use the documentation as your reference from first route to production deployment.</p>
          <Link href="/docs/getting-started" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5">Open the getting started guide <ArrowRight className="h-4 w-4" /></Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
