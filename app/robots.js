import { SITE_METADATA } from "./lib/docs-config";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_METADATA.siteUrl}/sitemap.xml`,
  };
}