import { notFound } from "next/navigation";
import { docsPages, docsNavigation } from "../../../lib/docsData";
import TableOfContents from "../../../components/TableOfContents";
import Breadcrumbs from "../../../components/Breadcrumbs";
import CodeSnippetGroup from "../../../components/CodeSnippetGroup";
import TerminalBlock from "../../../components/TerminalBlock";
import Pagination from "../../../components/Pagination";
import { generatePageMetadata } from "../../../lib/meta";

export async function generateStaticParams() {
  return Object.keys(docsPages)
    .filter((slug) => slug !== "index")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = docsPages[slug];
  if (!page) return {};

  return generatePageMetadata({
    title: page.title,
    description: page.description,
    path: `/docs/${slug}`,
  });
}

export default async function DocTopicPage({ params }) {
  const { slug } = await params;
  const page = docsPages[slug];

  if (!page) notFound();

  const allItems = docsNavigation.flatMap((g) => g.items);
  const currentIndex = allItems.findIndex((item) => item.slug === slug);
  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs category={page.category} title={page.title} />

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-(--text-primary) mb-3">
          {page.title}
        </h1>
        <p className="text-base text-(--text-secondary) leading-relaxed mb-8">{page.description}</p>

        <div className="space-y-12">
          {page.content.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-24 space-y-4">
              <h2 className="text-xl font-bold text-(--text-primary) border-b border-(--border-color) pb-2">
                {sec.title}
              </h2>
              <p className="text-sm text-(--text-secondary) leading-relaxed whitespace-pre-line">
                {sec.text}
              </p>

              {sec.hasTerminal && <TerminalBlock />}

              {sec.codeTs && <CodeSnippetGroup ts={sec.codeTs} js={sec.codeJs} />}
            </section>
          ))}
        </div>

        <Pagination prev={prev} next={next} />
      </div>

      <TableOfContents headings={page.headings} />
    </div>
  );
}
