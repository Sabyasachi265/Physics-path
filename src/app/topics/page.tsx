"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { topics } from "@/lib/data/topics";
import { useProgress } from "@/lib/hooks/use-progress";
import { cn } from "@/lib/utils";

const PHASE_BADGE: Record<number, string> = {
  1: "bg-primary/10 text-primary",
  2: "bg-success/10 text-success",
  3: "bg-accent/10 text-accent",
};

export default function TopicsPage() {
  const { completedTopics } = useProgress();

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold tracking-tight">Topic pages</h1>
      <p className="mt-2 text-muted-foreground">
        Deep dives into every subject area, with concept overviews, misconceptions, and curated
        practice problems.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {topics.map((topic) => {
          const done = completedTopics.has(topic.id);
          return (
            <Link
              key={topic.id}
              href={`/topics/${topic.id}`}
              className="group rounded-xl border border-border p-4 transition-colors hover:border-primary"
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    PHASE_BADGE[topic.phase]
                  )}
                >
                  Phase {topic.phase}
                </span>
                {done && <CheckCircle2 className="h-4 w-4 text-success" />}
              </div>
              <div className="mt-3 text-sm font-semibold">{topic.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{topic.estimatedTime} estimated</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
