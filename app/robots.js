import { DOMAIN } from "../lib/meta";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
