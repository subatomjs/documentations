import type { MetadataRoute } from 'next';
import { allDocs } from '@/lib/docs';

const baseUrl = 'https://docs.subatomjs.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = allDocs.map((doc) => ({
    url: `${baseUrl}/docs/${doc.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    ...docs,
  ];
}
