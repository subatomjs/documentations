/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { CopyButton } from './copy-button';

export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

interface PackageManagerTabsProps {
  commands: Partial<Record<PackageManager, string>>;
  label?: string;
}

const PM_ORDER: PackageManager[] = ['npm', 'yarn', 'pnpm', 'bun'];

export function PackageManagerTabs({ commands, label = 'Package manager' }: PackageManagerTabsProps) {
  const available = PM_ORDER.filter((pm) => commands[pm]);
  const [active, setActive] = useState<PackageManager>(available[0] || 'npm');

  useEffect(() => {
    const stored = window.localStorage.getItem('subatom-package-manager') as PackageManager | null;
    if (stored && available.includes(stored)) setActive(stored);
  }, [available.join('|')]);

  const select = (pm: PackageManager) => {
    setActive(pm);
    window.localStorage.setItem('subatom-package-manager', pm);
  };

  const cmd = commands[active] || commands[available[0]] || '';

  return (
    <div className="terminal-surface my-5 overflow-hidden rounded-xl shadow-sm">
      <div className="code-header-surface flex items-center justify-between gap-3 px-3 py-2">
        <div className="flex min-w-0 items-center gap-2" role="tablist" aria-label={label}>
          {available.map((pm) => (
            <button
              key={pm}
              type="button"
              role="tab"
              aria-selected={pm === active}
              onClick={() => select(pm)}
              className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                pm === active
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {pm}
            </button>
          ))}
        </div>
        <CopyButton text={cmd} />
      </div>
      <div className="flex min-w-0 items-center gap-3 overflow-x-auto px-4 py-4 font-mono text-sm">
        <span className="terminal-prompt shrink-0 select-none">$</span>
        <code className="whitespace-pre text-[13px] sm:text-sm">{cmd}</code>
      </div>
    </div>
  );
}

interface InstallCommandProps {
  /** Command payload without the package-manager prefix. Examples: `install subatom` or `create subatom@latest my-app`. */
  baseCommand: string;
  /** Generate create commands rather than install/add commands. */
  isCreate?: boolean;
}

function installCommands(payload: string): Partial<Record<PackageManager, string>> {
  const normalized = payload.replace(/^install\s+/, '').trim();
  const dev = normalized.startsWith('--save-dev ');
  const packageSpec = normalized.replace(/^--save-dev\s+/, '').trim();

  return {
    npm: `npm install${dev ? ' --save-dev' : ''} ${packageSpec}`,
    yarn: `yarn add${dev ? ' --dev' : ''} ${packageSpec}`,
    pnpm: `pnpm add${dev ? ' -D' : ''} ${packageSpec}`,
    bun: `bun add${dev ? ' -d' : ''} ${packageSpec}`,
  };
}

function createCommands(payload: string): Partial<Record<PackageManager, string>> {
  const normalized = payload.replace(/^create\s+/, '').trim();
  return {
    npm: `npm create ${normalized}`,
    yarn: `yarn create ${normalized}`,
    pnpm: `pnpm create ${normalized}`,
    bun: `bun create ${normalized}`,
  };
}

export function InstallCommand({ baseCommand, isCreate }: InstallCommandProps) {
  const commands = isCreate ? createCommands(baseCommand) : installCommands(baseCommand);
  return <PackageManagerTabs commands={commands} />;
}
