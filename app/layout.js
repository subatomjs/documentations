import "./globals.css";
import { Providers } from "./components/Providers";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { SITE_METADATA } from "./lib/docs-config";
import { InitialLoader } from "./components/InitialLoader";

export const metadata = {
  metadataBase: new URL(SITE_METADATA.siteUrl),
  title: {
    default: SITE_METADATA.title,
    template: "%s | subatom-pulse",
  },
  description: SITE_METADATA.description,
  keywords: [
    "subatom",
    "subatom-pulse",
    "websocket",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Node.js WebSocket framework",
    "real-time communication",
    "ws",
    "backpressure",
  ],
  authors: [{ name: "Kunal Chandra Das", url: "https://pulse.subatomjs.dev" }],
  creator: "Kunal Chandra Das",
  publisher: "Subatom",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: SITE_METADATA.logos.short,
    shortcut: SITE_METADATA.logos.short,
    apple: SITE_METADATA.logos.short,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_METADATA.siteUrl,
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    siteName: "subatom-pulse",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body
        suppressHydrationWarning
        className="bg-white dark:bg-surface-950 text-surface-800 dark:text-slate-300 font-sans antialiased selection:bg-leaf-500 selection:text-white min-h-screen flex flex-col"
      >
        <Providers>
          <InitialLoader />
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
