import type { MDXComponents } from "mdx/types";
import { MermaidDiagram } from "@/components/mermaid";
import { CodeBlock } from "@/components/code-block";
import { Callout } from "@/components/callout";
import { AnchorHeading } from "@/components/anchor-heading";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    MermaidDiagram,
    CodeBlock,
    Callout,
    h1: (props) => <AnchorHeading as="h1" {...props} />,
    h2: (props) => <AnchorHeading as="h2" {...props} />,
    h3: (props) => <AnchorHeading as="h3" {...props} />,
    h4: (props) => <AnchorHeading as="h4" {...props} />,
    h5: (props) => <AnchorHeading as="h5" {...props} />,
    h6: (props) => <AnchorHeading as="h6" {...props} />,
    ...components,
  };
}
