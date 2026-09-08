import { SITE_METADATA } from "./lib/docs-config";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_METADATA.siteUrl}/sitemap.xml`,
  };
}
