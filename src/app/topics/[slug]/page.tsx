import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, ListChecks, AlertTriangle, Link2 } from "lucide-react";
import { getTopicById, topics } from "@/lib/data/topics";
import { getResourceById } from "@/lib/data/resources";
import { TopicCompleteButton } from "@/components/topics/topic-complete-button";

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.id }));
}

export default function TopicDetailPage({ params }: { params: { slug: string } }) {
  const topic = getTopicById(params.slug);
  if (!topic) notFound();

  const related = topic.relatedTopicIds
    .map((id) => getTopicById(id))
    .filter((t): t is NonNullable<typeof t> => !!t);

  return (
    <div className="container max-w-3xl py-10">
      <Link
        href="/topics"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to topics
      </Link>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{topic.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{topic.estimatedTime} estimated</p>
        </div>
        <TopicCompleteButton topicId={topic.id} />
      </div>

      <section className="mt-8">
        <h2 className="border-b border-border pb-2 text-base font-semibold">Concept overview</h2>
        <p className="mt-4 rounded-xl bg-secondary/50 p-5 text-sm leading-relaxed">{topic.overview}</p>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-1.5 border-b border-border pb-2 text-base font-semibold">
          <AlertTriangle className="h-4 w-4" /> Common misconceptions
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {topic.misconceptions.map((m) => (
            <div key={m.wrong} className="rounded-lg border border-border p-3 text-sm">
              <div className="flex gap-2 text-destructive">
                <span>✗</span>
                <span>{m.wrong}</span>
              </div>
              <div className="mt-1.5 flex gap-2 text-success">
                <span>✓</span>
                <span>{m.right}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-1.5 border-b border-border pb-2 text-base font-semibold">
          <BookOpen className="h-4 w-4" /> Recommended reading
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {topic.recommendedResourceIds.map((rid) => {
            const resource = getResourceById(rid);
            if (!resource) return null;
            return (
              <Link
                key={rid}
                href="/resources"
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:border-primary hover:text-primary"
              >
                {resource.name}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <div className="mt-4 flex flex-col gap-2">
          {topic.practiceProblems.map((p) => (
            <div
              key={p}
              className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm"
            >
              <span>{p}</span>
              <span className="text-xs text-muted-foreground">Competition problem</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-1.5 border-b border-border pb-2 text-base font-semibold">
          <Link2 className="h-4 w-4" /> Related topics
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {related.map((rt) => (
            <Link
              key={rt.id}
              href={`/topics/${rt.id}`}
              className="rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary hover:bg-primary/5 hover:text-primary"
            >
              {rt.name} →
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
