"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Clock, BookOpen, ListChecks, AlertTriangle, ArrowRight } from "lucide-react";
import { phases } from "@/lib/data/phases";
import { getTopicById } from "@/lib/data/topics";
import { getResourceById } from "@/lib/data/resources";
import { Checkbox } from "@/components/ui/checkbox";
import { useProgress } from "@/lib/hooks/use-progress";
import { cn } from "@/lib/utils";

const PHASE_ACCENT: Record<string, string> = {
  primary: "border-l-primary",
  success: "border-l-success",
  accent: "border-l-accent",
};

export default function RoadmapPage() {
  const { completedTopics, toggleTopic, loading } = useProgress();
  const [openPhases, setOpenPhases] = React.useState<Set<string>>(new Set(["phase1"]));
  const [openTopics, setOpenTopics] = React.useState<Set<string>>(new Set());

  function togglePhase(id: string) {
    setOpenPhases((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleTopicOpen(id: string) {
    setOpenTopics((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-3xl font-bold tracking-tight">Physics roadmap</h1>
      <p className="mt-2 text-muted-foreground">
        Work through the phases in order. Expand each phase to see individual topics,
        prerequisites, resources, and checkpoints.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {phases.map((phase) => {
          const isOpen = openPhases.has(phase.id);
          const doneCount = phase.topicIds.filter((id) => completedTopics.has(id)).length;

          return (
            <div key={phase.id} className="overflow-hidden rounded-xl border border-border">
              <button
                onClick={() => togglePhase(phase.id)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-secondary/50"
              >
                <span className="min-w-[52px] rounded-full bg-secondary px-2.5 py-1 text-center text-xs font-semibold">
                  {loading ? "…" : `${doneCount}/${phase.topicIds.length}`}
                </span>
                <span className="flex-1 font-semibold">{phase.name}</span>
                <span className="hidden gap-3 text-xs text-muted-foreground sm:flex">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {phase.duration}
                  </span>
                  <span>{phase.goal}</span>
                </span>
                <ChevronDown
                  className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")}
                />
              </button>

              {isOpen && (
                <div className={cn("border-t border-border border-l-2", PHASE_ACCENT[phase.colorClass])}>
                  {phase.topicIds.map((topicId) => {
                    const topic = getTopicById(topicId);
                    if (!topic) return null;
                    const done = completedTopics.has(topic.id);
                    const topicOpen = openTopics.has(topic.id);

                    return (
                      <div key={topic.id} className="border-b border-border last:border-b-0">
                        <div
                          className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-secondary/30"
                          onClick={() => toggleTopicOpen(topic.id)}
                        >
                          <Checkbox
                            checked={done}
                            onClick={(e) => e.stopPropagation()}
                            onCheckedChange={() => toggleTopic(topic.id)}
                            aria-label={`Mark ${topic.name} complete`}
                          />
                          <span className="flex-1 text-sm font-medium">{topic.name}</span>
                          <span className="text-xs text-muted-foreground">{topic.estimatedTime}</span>
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                              topicOpen && "rotate-180"
                            )}
                          />
                        </div>

                        {topicOpen && (
                          <div className="px-4 pb-4 pl-11 text-sm">
                            <p className="text-muted-foreground">{topic.overview}</p>

                            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              <BookOpen className="h-3.5 w-3.5" /> Recommended reading
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                              {topic.recommendedResourceIds.map((rid) => {
                                const resource = getResourceById(rid);
                                if (!resource) return null;
                                return (
                                  <Link
                                    key={rid}
                                    href="/resources"
                                    className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                                  >
                                    {resource.name}
                                  </Link>
                                );
                              })}
                            </div>

                            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              <ListChecks className="h-3.5 w-3.5" /> Practice problems
                            </div>
                            <div className="mt-1.5 flex flex-wrap gap-1.5">
                              {topic.practiceProblems.map((p) => (
                                <span key={p} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                                  {p}
                                </span>
                              ))}
                            </div>

                            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              <AlertTriangle className="h-3.5 w-3.5" /> Common misconceptions
                            </div>
                            <div className="mt-1.5 flex flex-col gap-1.5">
                              {topic.misconceptions.map((m) => (
                                <div key={m.wrong} className="rounded-md border border-warning/30 bg-warning/5 px-3 py-2 text-xs">
                                  <div className="text-warning">✗ {m.wrong}</div>
                                  <div className="mt-1 text-success">✓ {m.right}</div>
                                </div>
                              ))}
                            </div>

                            <Link
                              href={`/topics/${topic.id}`}
                              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                            >
                              Open full topic page <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
