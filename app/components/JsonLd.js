/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: explanation */
export function JsonLd({ schema }) {
  // Safely serialize and escape the schema to prevent script injection
  // (e.g. "</script>" breaking out of the tag), since JSON-LD requires
  // raw script content that React cannot render as plain children.
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
