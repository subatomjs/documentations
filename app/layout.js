import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { PreferencesProvider } from "../context/PreferencesContext";
import { DOMAIN, generatePageMetadata, generateStructuredData } from "../lib/meta";

export const metadata = {
  metadataBase: new URL(DOMAIN),
  ...generatePageMetadata({
    title: "Subatom Infer — Production Runtime Data Validation for JS & TS",
    description:
      "Validate unknown runtime data, defend against prototype pollution, safe-parse payloads, and infer static TypeScript types with zero dependencies.",
    path: "",
  }),
  keywords: [
    "Subatom",
    "Subatom Infer",
    "subatom-infer",
    "runtime validation",
    "runtime type validation",
    "JavaScript validation",
    "TypeScript validation",
    "schema validation",
    "type inference",
    "Node.js validation",
    "Zod alternative",
  ],
};

export default function RootLayout({ children }) {
  const jsonLd = generateStructuredData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-(--bg-primary) text-(--text-primary) antialiased"
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <PreferencesProvider>{children}</PreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
