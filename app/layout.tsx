import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { DevelopmentNotice } from '@/components/site/development-notice';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.subatomjs.dev'),
  title: {
    default: 'Subatom.js Documentation',
    template: '%s — Subatom.js Documentation',
  },
  description:
    'Official Subatom.js documentation: create projects, build Node.js APIs, configure routing and middleware, validate data, generate OpenAPI docs, test, and deploy.',
  keywords: [
    'Subatom.js',
    'Node.js framework',
    'JavaScript backend',
    'TypeScript backend',
    'REST API',
    'create-subatom',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Subatom.js Documentation',
    description: 'Official documentation for the Subatom.js Node.js framework.',
    type: 'website',
  },
};

const noFlashScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored === 'dark' || (!stored && prefersDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${jetbrains.variable} font-sans`}
      >
        <ThemeProvider>
          {children}
          <DevelopmentNotice />
        </ThemeProvider>
      </body>
    </html>
  );
}