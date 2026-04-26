"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface MermaidDiagramProps {
  chart?: string;
  children?: string;
}

export function MermaidDiagram({ chart, children }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  const mermaidSource = chart || children || "";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mermaidSource || !containerRef.current) return;

    let cancelled = false;

    async function render() {
      const { default: mermaid } = await import("mermaid");

      const isDark = resolvedTheme === "dark";

      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "default",
        securityLevel: "strict",
        themeVariables: isDark
          ? {
              primaryColor: "#2d2d2d",
              primaryTextColor: "#e8e2db",
              primaryBorderColor: "#3a3a3a",
              lineColor: "#c4bdb6",
              secondaryColor: "#1a1a1a",
              tertiaryColor: "#111111",
              noteBkgColor: "#1a1a1a",
              noteTextColor: "#e8e2db",
              noteBorderColor: "#3a3a3a",
              actorBkg: "#1a1a1a",
              actorBorder: "#3a3a3a",
              actorTextColor: "#e8e2db",
              signalColor: "#e8e2db",
              labelBoxBkgColor: "#1a1a1a",
              labelBoxBorderColor: "#3a3a3a",
              labelTextColor: "#e8e2db",
              loopTextColor: "#e8e2db",
              activationBkgColor: "#2d2d2d",
              activationBorderColor: "#3a3a3a",
            }
          : {},
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
  }, [mermaidSource, resolvedTheme, mounted]);

  if (!mounted) {
    return <div ref={containerRef} className="mermaid"><pre>{mermaidSource}</pre></div>;
  }

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
