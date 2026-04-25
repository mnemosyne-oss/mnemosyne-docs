import type { MDXComponents } from "mdx/types";
import { MermaidDiagram } from "@/components/mermaid";
import { CodeBlock } from "@/components/code-block";
import { Callout } from "@/components/callout";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    MermaidDiagram,
    CodeBlock,
    Callout,
    ...components,
  };
}
