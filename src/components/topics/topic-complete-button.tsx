"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/lib/hooks/use-progress";

export function TopicCompleteButton({ topicId }: { topicId: string }) {
  const { completedTopics, toggleTopic, loading } = useProgress();
  const done = completedTopics.has(topicId);

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={loading}
      onClick={() => toggleTopic(topicId)}
      className={done ? "border-success text-success hover:text-success" : ""}
    >
      {done ? <CheckCircle2 className="mr-1.5 h-4 w-4" /> : <Circle className="mr-1.5 h-4 w-4" />}
      {done ? "Completed" : "Mark complete"}
    </Button>
  );
}
