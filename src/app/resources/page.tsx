"use client";

import * as React from "react";
import { Heart, Clock } from "lucide-react";
import { resourceCategories, getResourcesByCategory } from "@/lib/data/resources";
import type { ResourceCategory } from "@/types/content";
import { useProgress } from "@/lib/hooks/use-progress";
import { cn } from "@/lib/utils";

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = React.useState<ResourceCategory>("textbooks");
  const { savedResources, toggleSavedResource } = useProgress();
  const items = getResourcesByCategory(activeTab);

  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold tracking-tight">Resource library</h1>
      <p className="mt-2 text-muted-foreground">
        Every resource rated for difficulty and time commitment.
      </p>

      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-border">
        {resourceCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveTab(cat.key)}
            className={cn(
              "shrink-0 border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              activeTab === cat.key && "border-primary text-primary"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((resource) => {
          const isSaved = savedResources.includes(resource.id);
          return (
            <div key={resource.id} className="rounded-xl border border-border p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-sm font-semibold">
                  {resource.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold leading-snug">{resource.name}</div>
                  <div className="text-xs text-muted-foreground">{resource.author}</div>
                </div>
                <button
                  aria-label={isSaved ? "Remove from saved resources" : "Save resource"}
                  onClick={() => toggleSavedResource(resource.id)}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Heart className={cn("h-4 w-4", isSaved && "fill-destructive text-destructive")} />
                </button>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">{resource.description}</p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-0.5" aria-label={`Difficulty ${resource.difficulty} of 5`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        n <= resource.difficulty ? "bg-primary" : "bg-border"
                      )}
                    />
                  ))}
                </div>
                <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                  Best for: {resource.bestFor}
                </span>
                <span className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {resource.timeCommitment}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
