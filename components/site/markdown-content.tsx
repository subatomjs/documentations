/* eslint-disable react-hooks/refs */
'use client';

import { createElement, useEffect, useRef } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { PackageManagerTabs } from './terminal-block';
import { CopyButton } from './copy-button';

function languageFromCode(code: HTMLElement) {
  const match = Array.from(code.classList).find((name) => name.startsWith('language-'));
  return match ? match.replace('language-', '') : '';
}

function commandVariants(command: string) {
  const trimmed = command.trim();
  if (/^npm create\s+/.test(trimmed)) {
    const rest = trimmed.replace(/^npm create\s+/, '');
    return {
      npm: `npm create ${rest}`,
      yarn: `yarn create ${rest}`,
      pnpm: `pnpm create ${rest}`,
      bun: `bun create ${rest}`,
    };
  }
  if (/^npm install\s+/.test(trimmed)) {
    const rest = trimmed.replace(/^npm install\s+/, '');
    const dev = rest.startsWith('--save-dev ');
    const pkg = rest.replace(/^--save-dev\s+/, '');
    return {
      npm: `npm install${dev ? ' --save-dev' : ''} ${pkg}`,
      yarn: `yarn add${dev ? ' --dev' : ''} ${pkg}`,
      pnpm: `pnpm add${dev ? ' -D' : ''} ${pkg}`,
      bun: `bun add${dev ? ' -d' : ''} ${pkg}`,
    };
  }
  return null;
}

export function MarkdownContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const activeRootsRef = useRef<Root[]>([]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const roots: Root[] = [];
    const blocks = Array.from(root.querySelectorAll('pre'));

    for (const pre of blocks) {
      if (pre.dataset.enhanced === 'true') continue;
      const code = pre.querySelector('code');
      if (!code) continue;

      pre.dataset.enhanced = 'true';
      const language = languageFromCode(code);
      const source = code.textContent ?? '';
      const header = document.createElement('div');
      header.className = 'doc-code-header';

      const label = document.createElement('span');
      label.className = 'doc-code-language';
      label.textContent = language || 'code';
      header.appendChild(label);

      const copyMount = document.createElement('span');
      copyMount.className = 'doc-code-copy';
      header.appendChild(copyMount);
      pre.insertBefore(header, pre.firstChild);

      const copyRoot = createRoot(copyMount);
      copyRoot.render(createElement(CopyButton, { text: source }));
      roots.push(copyRoot);

      const variants = language === 'bash' || language === 'shell' ? commandVariants(source) : null;
      if (variants) {
        pre.classList.add('terminal-surface');
        pre.classList.add('doc-terminal-enhanced');
        const mount = document.createElement('div');
        mount.className = 'doc-terminal-switcher';
        pre.replaceWith(mount);
        const terminalRoot = createRoot(mount);
        terminalRoot.render(createElement(PackageManagerTabs, { commands: variants }));
        roots.push(terminalRoot);
      }
    }

    activeRootsRef.current = roots;

    return () => {
      const rootsToUnmount = activeRootsRef.current;
      activeRootsRef.current = [];

      // Defer unmounting to prevent synchronous conflict with React's render loop
      queueMicrotask(() => {
        rootsToUnmount.forEach((entry) => entry.unmount());
      });
    };
  }, [html]);

  return createElement('div', {
    ref: (node: HTMLDivElement | null) => {
      ref.current = node;
    },
    className: 'prose-doc',
    dangerouslySetInnerHTML: { __html: html },
  });
}