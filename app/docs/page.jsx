import { docsPages } from "../../lib/docsData";
import TableOfContents from "../../components/TableOfContents";
import Breadcrumbs from "../../components/Breadcrumbs";
import CodeSnippetGroup from "../../components/CodeSnippetGroup";
import Callout from "../../components/Callout";
import Pagination from "../../components/Pagination";
import { generatePageMetadata } from "../../lib/meta";

export const metadata = generatePageMetadata({
  title: "Introduction & Overview",
  description:
    "Get started with Subatom Infer: the production-grade runtime data validation engine for JavaScript and TypeScript.",
  path: "/docs",
});

export default function DocsHomePage() {
  const page = docsPages.index;

  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs category={page.category} title={page.title} />

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-(--text-primary) mb-3">
          {page.title}
        </h1>
        <p className="text-base text-(--text-secondary) leading-relaxed mb-8">{page.description}</p>

        <Callout type="tip" title="Ecosystem Compatibility">
          Subatom Infer is designed to run seamlessly across Node.js (&gt;= 24)[cite: 1, 3], Bun,
          Deno, and full-stack frameworks including Next.js, Hono, and Express.
        </Callout>

        <div className="space-y-12">
          {page.content.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-24 space-y-4">
              <h2 className="text-xl font-bold text-(--text-primary) border-b border-(--border-color) pb-2">
                {sec.title}
              </h2>
              <p className="text-sm text-(--text-secondary) leading-relaxed whitespace-pre-line">
                {sec.text}
              </p>

              {sec.codeTs && <CodeSnippetGroup ts={sec.codeTs} js={sec.codeJs} />}
            </section>
          ))}
        </div>

        <Pagination
          prev={null}
          next={{ title: "Why Runtime Validation?", href: "/docs/why-subatom-infer" }}
        />
      </div>

      <TableOfContents headings={page.headings} />
    </div>
  );
}
