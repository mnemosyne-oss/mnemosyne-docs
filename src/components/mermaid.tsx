import mermaid from "mermaid";

// Initialize mermaid for server-side rendering
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "strict",
  fontFamily: "var(--font-sans), sans-serif",
});

interface MermaidDiagramProps {
  children: string;
}

export async function MermaidDiagram({ children }: MermaidDiagramProps) {
  if (!children) {
    return (
      <div className="callout callout-warning">
        <strong>Missing diagram content</strong>
      </div>
    );
  }

  try {
    const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
    const { svg } = await mermaid.render(id, children.trim());

    return (
      <div
        className="mermaid"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  } catch (err: any) {
    return (
      <div className="callout callout-danger">
        <strong>Diagram Error:</strong> {err.message || "Failed to render diagram"}
      </div>
    );
  }
}
