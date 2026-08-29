import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import { Check, Copy, Terminal } from "lucide-react";

export const CodeBlock = ({ code, language = "typescript", title }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b0f19] shadow-sm overflow-hidden text-slate-800 dark:text-slate-100 transition-colors">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {title ? (
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              {title}
            </span>
          ) : (
            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
              <Terminal className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono lowercase">{language}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
          aria-label="Copy snippet"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto text-[12px] font-mono leading-relaxed bg-white dark:bg-[#0b0f19]">
        <pre className="bg-transparent! p-0! m-0!">
          <code className={`language-${language} bg-transparent!`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};