import Link from "next/link";
import { ArrowRight, Map, BookOpen, CheckCircle2, AlertTriangle, Target, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { phases } from "@/lib/data/phases";
import { topics } from "@/lib/data/topics";
import { resources } from "@/lib/data/resources";

const FEATURES = [
  {
    icon: Map,
    title: "Structured roadmap",
    body: "A clear sequence with checkpoints.",
  },
  {
    icon: BookOpen,
    title: "Honest resource ratings",
    body: "Textbooks, videos, and problem sets rated by difficulty and time commitment.",
  },
  {
    icon: CheckCircle2,
    title: "Progress tracking",
    body: "Mark topics complete, save favorites, and keep personal notes as you work through the material.",
  },
  {
    icon: AlertTriangle,
    title: "Common misconceptions",
    body: "Every topic flags common mistakes.",
  },
  {
    icon: Target,
    title: "Curated problems",
    body: "Picked practice problems tied directly to the concept you're studying.",
  },
  {
    icon: Link2,
    title: "Related topics",
    body: "See how each concept connects to others, so nothing feels isolated from the bigger picture.",
  },
];

// Tailwind needs to see full class names at build time, so dynamic
// strings like `bg-${color}/10` get silently dropped. This lookup map
// keeps every class name static and discoverable by the compiler.
const PHASE_BADGE_CLASSES: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  accent: "bg-accent/10 text-accent",
};

export default function LandingPage() {
  const phaseDurationTotal = "~9 months";

  return (
    <div>
      {/* Hero */}
      <section className="container flex flex-col items-center py-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          AP Physics → F=ma → USAPhO (come on you gotta be at least AP physics to start)
        </div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Roadmap so yall don't end up like me <span className="text-primary">competition physics</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted-foreground">
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/roadmap">
              Explore the roadmap <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/resources">Browse resources</Link>
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="container pb-16">
        <div className="grid grid-cols-2 divide-x divide-y divide-border rounded-xl border border-border sm:grid-cols-4 sm:divide-y-0">
          {[
            { label: "Core topics", value: String(topics.length) },
            { label: "Phases", value: String(phases.length) },
            { label: "Curated resources", value: `${resources.length}+` },
            { label: "To F=ma ready", value: phaseDurationTotal },
          ].map((stat) => (
            <div key={stat.label} className="p-6 text-center">
              <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured roadmap */}
      <section className="container pb-20">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          The path
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Three phases, clearly defined</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          No guessing what to study next. Each phase builds on the last.
        </p>

        <div className="mt-8 flex flex-col">
          {phases.map((phase, i) => (
            <Link
              key={phase.id}
              href="/roadmap"
              className="group flex items-start gap-4 border-b border-border py-4 last:border-b-0"
            >
              <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  PHASE_BADGE_CLASSES[phase.colorClass] ?? "bg-secondary text-foreground"
                }`}
              >
                {i + 1}
              </div>
              <div className="flex-1 transition-transform group-hover:translate-x-0.5">
                <div className="font-semibold">{phase.name}</div>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                  <span>{phase.duration}</span>
                  <span>{phase.goal}</span>
                  <span>{phase.topicIds.length} topics</span>
                </div>
              </div>
              <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      {/* Mission / features */}
      <section className="container pb-24">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Why Physics Path
        </p>
        <h2 className="text-2xl font-bold tracking-tight">I built it for the gap which is ignored.</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          AP Physics gives you a foundation. Olympiad prep requires a sort of rewiring.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-xl border border-border p-5">
              <feature.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-sm font-semibold">{feature.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
