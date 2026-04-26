import Link from "next/link";
import { ArrowRight, Zap, Shield, Database, Brain, Search, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-dark text-accent-terracotta text-sm font-medium mb-6 tracking-wide uppercase">
            <Zap size={14} />
            v2.0 — Now with Hermes Plugin Integration
          </div>
          <h1 className="text-5xl sm:text-6xl font-serif font-semibold tracking-tight text-charcoal mb-6 leading-tight">
            Memory for AI Agents
            <br />
            <span className="text-accent-gold">That Actually Works</span>
          </h1>
          <p className="text-xl text-warm-gray leading-relaxed mb-10 max-w-2xl mx-auto">
            Mnemosyne is a native memory system for AI agents. Persistent, structured, and
            context-aware — built on SQLite with vector search, full-text retrieval, and
            biological-inspired BEAM architecture.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://docs.mnemosyne.com/getting-started/quick-start"
              className="btn-primary inline-flex items-center gap-2"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
            <Link
              href="https://docs.mnemosyne.com/architecture/beam-overview"
              className="btn-ghost inline-flex items-center gap-2"
            >
              Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 px-6 border-t border-border-warm">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold text-center text-charcoal mb-12 tracking-tight">
            Why Mnemosyne?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Brain size={24} />}
              title="BEAM Architecture"
              description="Biological-inspired memory tiers: Working, Episodic, Semantic, and Scratchpad — each optimized for different access patterns."
            />
            <FeatureCard
              icon={<Search size={24} />}
              title="Hybrid Retrieval"
              description="Combine dense vector similarity with SQLite FTS5 full-text search for results that are both relevant and precise."
            />
            <FeatureCard
              icon={<Database size={24} />}
              title="SQLite Native"
              description="Zero external dependencies. Single-file database with ACID transactions, portability, and proven reliability."
            />
            <FeatureCard
              icon={<Shield size={24} />}
              title="Privacy First"
              description="All data stays local. Optional encryption at rest. No cloud required, no data exfiltration."
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title="Sub-100ms Queries"
              description="Optimized indexing and caching deliver median retrieval latency under 100ms for typical workloads."
            />
            <FeatureCard
              icon={<Rocket size={24} />}
              title="Hermes Integration"
              description="First-class plugin for the Hermes agent framework. Auto-context injection, tool schema, and seamless operation."
            />
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-6 border-t border-border-warm bg-cream-dark">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <Stat value="<100ms" label="Median Query" />
          <Stat value="4" label="Memory Tiers" />
          <Stat value="0" label="External Deps" />
          <Stat value="∞" label="Scale Potential" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-serif font-semibold text-charcoal mb-4">
            Ready to give your agent a memory?
          </h2>
          <p className="text-warm-gray mb-8">
            Start with the Quick Start guide and have Mnemosyne running in under 5 minutes.
          </p>
          <Link
            href="https://docs.mnemosyne.com/getting-started/quick-start"
            className="btn-gold inline-flex items-center gap-2"
          >
            Quick Start
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="feature-card card-lift">
      <div className="w-10 h-10 rounded-lg bg-cream-dark flex items-center justify-center text-accent-gold mb-4">
        {icon}
      </div>
      <h3 className="font-serif font-semibold text-charcoal mb-2">{title}</h3>
      <p className="text-sm text-warm-gray leading-relaxed">{description}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-serif font-bold text-accent-gold mb-1">{value}</div>
      <div className="text-sm text-warm-gray-light tracking-wide uppercase">{label}</div>
    </div>
  );
}
