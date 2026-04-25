"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "strict",
  fontFamily: "var(--font-sans), sans-serif",
});

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!ref.current) return;
    const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
    mermaid
      .render(id, chart.trim())
      .then(({ svg }) => setSvg(svg))
      .catch((err) => setError(err.message));
  }, [chart]);

  if (error) {
    return (
      <div className="callout callout-danger">
        <strong>Diagram Error:</strong> {error}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="mermaid"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
