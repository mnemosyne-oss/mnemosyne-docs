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
  children: string;
}

export function MermaidDiagram({ children }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!ref.current || !children) return;
    const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
    mermaid
      .render(id, children.trim())
      .then(({ svg }) => setSvg(svg))
      .catch((err) => setError(err.message));
  }, [children]);

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
