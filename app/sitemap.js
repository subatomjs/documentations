import { DOCS_NAVIGATION, SITE_METADATA } from "./lib/docs-config";

export const dynamic = "force-static";

export default function sitemap() {
  const routes = [
    {
      url: SITE_METADATA.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  DOCS_NAVIGATION.forEach((section) => {
    section.items.forEach((item) => {
      routes.push({
        url: `${SITE_METADATA.siteUrl}${item.href}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  });

  return routes;
}