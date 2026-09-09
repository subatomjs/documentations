export const DOMAIN = "https://infer.subatomjs.dev";

export function generatePageMetadata({ title, description, path = "" }) {
  const canonical = `${DOMAIN}${path}`;
  const fullTitle = `${title} | Subatom Infer`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: "Subatom Infer",
      images: [
        {
          url: `${DOMAIN}/og.png`,
          width: 1200,
          height: 630,
          alt: "Subatom Infer - Runtime validation and type inference for JS/TS",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${DOMAIN}/og.png`],
    },
  };
}

export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Subatom Infer",
    alternateName: "subatom-infer",
    operatingSystem: "Any",
    applicationCategory: "DeveloperApplication",
    softwareVersion: "1.4.0",
    description:
      "Production-grade runtime validation and type-inference engine for JavaScript, TypeScript, and Node.js.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Kunal Chandra Das",
      email: "kunal@subatomjs.dev",
      url: "https://infer.subatomjs.dev",
    },
  };
}
