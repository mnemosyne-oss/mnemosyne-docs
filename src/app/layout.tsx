import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Great_Vibes, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StructuredData } from "@/components/structured-data";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif-alt",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.mnemosyne.site"),
  title: {
    default: "Mnemosyne Documentation",
    template: "%s | Mnemosyne Docs",
  },
  description:
    "Mnemosyne is the native memory system for AI agents. Persistent, structured, and context-aware memory with BEAM architecture.",
  keywords: [
    "AI memory",
    "agent memory",
    "persistent memory",
    "BEAM",
    "Mnemosyne",
    "SQLite",
    "vector search",
    "Hermes plugin",
  ],
  authors: [{ name: "Abdias Moya", url: "https://github.com/axdsan" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Mnemosyne Documentation",
    description: "The native memory system for AI agents",
    type: "website",
    siteName: "Mnemosyne",
    locale: "en_US",
    url: "https://docs.mnemosyne.site",
    images: [
      {
        url: "/og-image.jpg?v=1",
        width: 1200,
        height: 630,
        alt: "Mnemosyne - AI Agent Memory System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@axdsan",
    creator: "@axdsan",
  },
  alternates: {
    canonical: "https://docs.mnemosyne.site",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream dark:bg-midnight text-charcoal dark:text-parchment transition-colors">
        <ThemeProvider>
          <StructuredData slug="/" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
