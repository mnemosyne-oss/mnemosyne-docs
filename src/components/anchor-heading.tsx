"use client";

import { Link } from "lucide-react";
import { useState } from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 64);
}

interface AnchorHeadingProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  id?: string;
}

export function AnchorHeading({ as: Tag, children, id }: AnchorHeadingProps) {
  // Extract text from children for slug generation
  const text = extractText(children);
  const slug = id || slugify(text);
  const [showAnchor, setShowAnchor] = useState(false);

  return (
    <Tag
      id={slug}
      className="group relative scroll-mt-20"
      onMouseEnter={() => setShowAnchor(true)}
      onMouseLeave={() => setShowAnchor(false)}
    >
      <a
        href={`#${slug}`}
        className={`absolute -left-6 top-1/2 -translate-y-1/2 p-1 rounded-md text-accent-terracotta/60 hover:text-accent-terracotta transition-opacity ${
          showAnchor ? "opacity-100" : "opacity-0"
        }`}
        aria-label={`Link to ${text}`}
      >
        <Link size={16} />
      </a>
      {children}
    </Tag>
  );
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}
