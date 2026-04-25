"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "text", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper my-6">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border border-b-0 border-zinc-200 dark:border-zinc-700 rounded-t-lg">
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{filename}</span>
          <span className="text-xs text-zinc-400 uppercase">{language}</span>
        </div>
      )}
      <div className={`relative ${filename ? "rounded-b-lg" : "rounded-lg"}`}>
        <pre className={`overflow-x-auto p-4 text-sm leading-relaxed ${filename ? "" : "rounded-lg"}`}>
          <code className="font-mono">{code}</code>
        </pre>
        <button
          onClick={copy}
          className="code-copy-btn flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
