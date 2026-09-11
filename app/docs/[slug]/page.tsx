import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { renderMarkdown } from '@/lib/markdown';
import { getDocBySlug, getAdjacentDocs, allDocs } from '@/lib/docs';
import { Breadcrumbs, TableOfContents } from '@/components/docs/sidebar';
import { CodeTabs, InstallCommand, MarkdownContent } from '@/components/site';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const dynamicParams = false;

export async function generateStaticParams() {
  return allDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return {};

  return {
    title: doc.title,
    description: `Learn ${doc.title} in Subatom.js. ${doc.section} documentation for building production Node.js applications.`,
    alternates: { canonical: `/docs/${doc.slug}` },
    openGraph: {
      title: doc.title,
      description: `Official Subatom.js documentation for ${doc.title}.`,
      type: 'article',
      url: `/docs/${doc.slug}`,
    },
  };
}

const quickStartTypeScript = `import { Subatom } from "subatom";

const app = new Subatom();

app.get("/hello", {
  controller: (ctx) => {
    ctx.res.json({ message: "Hello, World!" });
  },
});

await app.listen(8080);`;

const quickStartJavaScript = `import { Subatom } from "subatom";

const app = new Subatom();

app.get("/hello", {
  controller: (ctx) => {
    ctx.res.json({ message: "Hello, World!" });
  },
});

await app.listen(8080);`;

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  const docsDir = path.join(process.cwd(), 'docs');
  const filePath = path.join(docsDir, doc.file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { html, headings } = await renderMarkdown(content);
  const adjacent = getAdjacentDocs(slug);

  return (
    <div>
      <Breadcrumbs slug={slug} />
      <div className="mb-7 max-w-3xl">
        <div className="mb-3 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          {doc.section}
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{doc.title}</h1>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Official Subatom.js documentation for third-party developers.
        </p>
      </div>

      {slug === 'getting-started' && (
        <section className="mb-8 rounded-2xl border border-border bg-card/70 p-5 shadow-sm">
          <p className="mb-3 text-sm font-semibold">Create a new Subatom project</p>
          <InstallCommand baseCommand="create subatom@latest my-app" isCreate />
        </section>
      )}

      {slug === 'introduction' && (
        <section className="mb-10 rounded-2xl border border-border bg-card/70 p-5 shadow-sm">
          <div className="mb-3">
            <p className="text-sm font-semibold">A minimal Subatom server</p>
            <p className="mt-1 text-xs text-muted-foreground">Switch between TypeScript and JavaScript.</p>
          </div>
          <CodeTabs
            tabs={[
              { label: 'TypeScript', language: 'typescript', code: quickStartTypeScript },
              { label: 'JavaScript', language: 'javascript', code: quickStartJavaScript },
            ]}
            filename="index.ts / index.js"
          />
        </section>
      )}

      <div className="grid grid-cols-1 gap-8 2xl:grid-cols-[minmax(0,1fr)_15rem] 2xl:gap-10">
        <article className="min-w-0">
          <div className="min-w-0 rounded-2xl border border-border/70 bg-card/30 p-4 shadow-sm sm:p-6 lg:p-8">
            {/* MarkdownContent adds copy controls and package-manager terminals to fenced code blocks. */}
            <MarkdownContent html={html} />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
            {adjacent.prev ? (
              <Link
                href={`/docs/${adjacent.prev.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/40 hover:bg-card"
              >
                <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="text-sm font-medium">{adjacent.prev.title}</div>
                </div>
              </Link>
            ) : <div />}
            {adjacent.next ? (
              <Link
                href={`/docs/${adjacent.next.slug}`}
                className="group flex items-center justify-end gap-3 rounded-xl border border-border bg-card/50 p-4 text-right transition-colors hover:border-primary/40 hover:bg-card"
              >
                <div>
                  <div className="text-xs text-muted-foreground">Next</div>
                  <div className="text-sm font-medium">{adjacent.next.title}</div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </Link>
            ) : <div />}
          </div>
        </article>

        <aside className="hidden 2xl:block">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </div>
  );
}
