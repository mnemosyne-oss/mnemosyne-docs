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
        <div className="flex items-center justify-between px-4 py-2 bg-cream-dark dark:bg-charcoal border border-b-0 border-border-warm dark:border-charcoal-light rounded-t-lg">
          <span className="text-xs font-mono text-warm-gray dark:text-warm-gray-muted">{filename}</span>
          <span className="text-xs text-warm-gray-light dark:text-warm-gray uppercase tracking-wider">{language}</span>
        </div>
      )}
      <div className={`relative ${filename ? "rounded-b-lg" : "rounded-lg"}`}>
        <pre className={`code-pre overflow-x-auto p-4 text-sm leading-relaxed ${filename ? "" : "rounded-lg"}`}>
          <code className="font-mono">{code}</code>
        </pre>
        <button
          onClick={copy}
          className="code-copy-btn flex items-center gap-1 px-2 py-1 rounded-md bg-border-warm-dark dark:bg-graphite text-warm-gray-light dark:text-warm-gray-muted text-xs hover:bg-warm-gray hover:text-cream transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
