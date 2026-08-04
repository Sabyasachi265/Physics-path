"use client";

import * as React from "react";
import Link from "next/link";
import { phases } from "@/lib/data/phases";
import { topics } from "@/lib/data/topics";
import { getResourceById } from "@/lib/data/resources";
import { useProgress } from "@/lib/hooks/use-progress";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const PHASE_INDICATOR: Record<string, string> = {
  primary: "bg-primary",
  success: "bg-success",
  accent: "bg-accent",
};

export default function DashboardPage() {
  const { completedTopics, savedResources, notes, updateNotes, studyDates, isSignedIn, loading } = useProgress();
  const totalTopics = topics.length;
  const doneCount = completedTopics.size;
  const pct = totalTopics === 0 ? 0 : Math.round((doneCount / totalTopics) * 100);

  const currentPhase =
    doneCount < 5 ? "Phase 1 — Foundations" : doneCount < 11 ? "Phase 2 — Core topics" : "Phase 3 — USAPhO prep";

  // Build the last 28 days as ISO date strings, oldest first, for the streak grid.
  const last28Days = React.useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (27 - i));
      return d.toISOString().slice(0, 10);
    });
  }, []);

  // Current streak: consecutive active days counting back from today.
  const currentStreak = React.useMemo(() => {
    let streak = 0;
    const cursor = new Date();
    while (studyDates.has(cursor.toISOString().slice(0, 10))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }, [studyDates]);

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold tracking-tight">Your dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Track where you are, review saved resources, and keep notes as you go.
      </p>

      {!isSignedIn && !loading && (
        <div className="mt-4 rounded-lg border border-warning/30 bg-warning/5 px-4 py-3 text-sm">
          You're browsing as a guest — progress is saved in this browser only.{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>{" "}
          to keep it permanently and access it from any device.
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Topics completed" value={`${doneCount}/${totalTopics}`} sub={`${pct}% of roadmap`} accent="text-primary" />
        <StatCard label="Study streak" value={String(currentStreak)} sub={currentStreak === 1 ? "day" : "days"} accent="text-success" />
        <StatCard label="Saved resources" value={String(savedResources.length)} sub="bookmarked" accent="text-accent" />
        <StatCard label="Current phase" value={currentPhase.split(" — ")[0]} sub={currentPhase.split(" — ")[1]} accent="text-primary" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold">Roadmap progress</h3>
          <div className="mt-4 flex flex-col gap-4">
            {phases.map((phase) => {
              const phaseDone = phase.topicIds.filter((id) => completedTopics.has(id)).length;
              const phasePct = Math.round((phaseDone / phase.topicIds.length) * 100);
              return (
                <div key={phase.id}>
                  <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
                    <span>{phase.name.replace(" — ", " ")}</span>
                    <span>
                      {phaseDone}/{phase.topicIds.length}
                    </span>
                  </div>
                  <Progress value={phasePct} indicatorClassName={PHASE_INDICATOR[phase.colorClass]} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold">Study activity — last 28 days</h3>
          <div className="mt-4 grid grid-cols-7 gap-1">
            {last28Days.map((date) => {
              const isToday = date === new Date().toISOString().slice(0, 10);
              const active = studyDates.has(date);
              return (
                <div
                  key={date}
                  title={isToday ? "Today" : date}
                  className={cn(
                    "h-5 rounded-sm",
                    isToday ? "bg-success" : active ? "bg-primary" : "bg-secondary"
                  )}
                />
              );
            })}
          </div>
          <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-primary" /> Study day
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-success" /> Today
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold">Saved resources</h3>
          {savedResources.length === 0 ? (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              No saved resources yet.
              <br />
              Browse the library and tap the heart to save one.
            </p>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              {savedResources.map((id) => {
                const resource = getResourceById(id);
                if (!resource) return null;
                return (
                  <Link
                    key={id}
                    href="/resources"
                    className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-secondary/50"
                  >
                    <span className="flex-1 truncate">{resource.name}</span>
                    <span className="rounded bg-secondary px-1.5 py-0.5 text-[11px] text-muted-foreground capitalize">
                      {resource.category}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border p-5 md:col-span-2">
          <h3 className="text-sm font-semibold">Personal notes</h3>
          <textarea
            className="mt-4 min-h-[120px] w-full resize-none rounded-md border border-border bg-secondary/40 p-3 text-sm outline-none focus:border-primary"
            placeholder="Jot down things to review, questions you have, or your study plan..."
            value={notes}
            onChange={(e) => updateNotes(e.target.value)}
          />
          <p className="mt-1.5 text-xs text-muted-foreground">Saved automatically.</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={cn("mt-1.5 text-2xl font-bold tracking-tight", accent)}>{value}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
