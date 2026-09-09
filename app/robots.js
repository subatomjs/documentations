import { DOMAIN } from "../lib/meta";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}