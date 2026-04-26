"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart?: string;
  children?: string;
}

export function MermaidDiagram({ chart, children }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);

  const mermaidSource = chart || children || "";

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!mermaidSource || !containerRef.current) return;

      const { default: mermaid } = await import("mermaid");
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        securityLevel: "strict",
      });

      const id = `mermaid-${Math.random().toString(36).slice(2)}`;
      try {
        const { svg } = await mermaid.render(id, mermaidSource.trim());
        if (!cancelled) setSvg(svg);
      } catch (err) {
        console.error("Mermaid render error:", err);
        if (!cancelled) setSvg(null);
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [mermaidSource]);

  if (svg) {
    return (
      <div
        ref={containerRef}
        className="mermaid"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  return (
    <div ref={containerRef} className="mermaid">
      <pre>{mermaidSource}</pre>
    </div>
  );
}
