import { docsPages } from "../lib/docsData";
import { DOMAIN } from "../lib/meta";

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    {
      url: `${DOMAIN}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${DOMAIN}/docs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const docRoutes = Object.keys(docsPages)
    .filter((slug) => slug !== "index")
    .map((slug) => ({
      url: `${DOMAIN}/docs/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...docRoutes];
}
