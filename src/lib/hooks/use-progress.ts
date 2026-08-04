"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";

const LOCAL_KEY = "physics-path-progress";

interface LocalState {
  completedTopics: string[];
  savedResources: string[];
  notes: string;
}

function readLocal(): LocalState {
  if (typeof window === "undefined") return { completedTopics: [], savedResources: [], notes: "" };
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (!raw) return { completedTopics: [], savedResources: [], notes: "" };
    return JSON.parse(raw);
  } catch {
    return { completedTopics: [], savedResources: [], notes: "" };
  }
}

function writeLocal(state: LocalState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
}

/**
 * Central place for all "did the user do this" state: completed topics,
 * saved resources, and notes.
 *
 * Signed-out visitors get a fully working experience backed by
 * localStorage, so nobody hits a login wall just to try the app.
 * Signed-in users get the same state persisted to Supabase instead, so it
 * follows them across devices. This hook hides that distinction from
 * every page that uses it.
 */
export function useProgress() {
  const supabase = createClient();
  const [userId, setUserId] = React.useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = React.useState<Set<string>>(new Set());
  const [savedResources, setSavedResources] = React.useState<string[]>([]);
  const [notes, setNotes] = React.useState("");
  const [studyDates, setStudyDates] = React.useState<Set<string>>(new Set());
  const [loading, setLoading] = React.useState(true);

  // Load whichever data source applies, and watch for sign-in/sign-out.
  React.useEffect(() => {
    let active = true;

    async function load() {
      const { data } = await supabase.auth.getUser();
      const uid = data.user?.id ?? null;
      if (!active) return;
      setUserId(uid);

      if (!uid) {
        const local = readLocal();
        setCompletedTopics(new Set(local.completedTopics));
        setSavedResources(local.savedResources);
        setNotes(local.notes);
        setStudyDates(new Set());
        setLoading(false);
        return;
      }

      const progressRes = await supabase
        .from("topic_progress")
        .select("topic_id")
        .eq("user_id", uid)
        .eq("completed", true);
      const savedRes = await supabase.from("saved_resources").select("resource_id").eq("user_id", uid);
      const noteRes = await supabase
        .from("topic_notes")
        .select("content")
        .eq("user_id", uid)
        .is("topic_id", null)
        .maybeSingle();
      const activityRes = await supabase.from("study_activity").select("activity_date").eq("user_id", uid);

      if (!active) return;
      setCompletedTopics(new Set((progressRes.data ?? []).map((r) => r.topic_id)));
      setSavedResources((savedRes.data ?? []).map((r) => r.resource_id));
      setNotes(noteRes.data?.content ?? "");
      setStudyDates(new Set((activityRes.data ?? []).map((r) => r.activity_date)));
      setLoading(false);
    }

    load();
    const { data: listener } = supabase.auth.onAuthStateChange(() => load());
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function recordActivity(uid: string) {
    const today = new Date().toISOString().slice(0, 10);
    setStudyDates((prev) => new Set(prev).add(today));
    await supabase.from("study_activity").upsert(
      { user_id: uid, activity_date: today },
      { onConflict: "user_id,activity_date" }
    );
  }

  async function toggleTopic(topicId: string) {
    const next = new Set(completedTopics);
    const willComplete = !next.has(topicId);
    if (willComplete) next.add(topicId);
    else next.delete(topicId);
    setCompletedTopics(next);

    if (!userId) {
      writeLocal({ completedTopics: [...next], savedResources, notes });
      return;
    }

    if (willComplete) {
      await supabase.from("topic_progress").upsert(
        { user_id: userId, topic_id: topicId, completed: true, completed_at: new Date().toISOString() },
        { onConflict: "user_id,topic_id" }
      );
      await recordActivity(userId);
    } else {
      await supabase.from("topic_progress").delete().eq("user_id", userId).eq("topic_id", topicId);
    }
  }

  async function toggleSavedResource(resourceId: string) {
    const isSaved = savedResources.includes(resourceId);
    const next = isSaved ? savedResources.filter((r) => r !== resourceId) : [...savedResources, resourceId];
    setSavedResources(next);

    if (!userId) {
      writeLocal({ completedTopics: [...completedTopics], savedResources: next, notes });
      return;
    }

    if (isSaved) {
      await supabase.from("saved_resources").delete().eq("user_id", userId).eq("resource_id", resourceId);
    } else {
      await supabase.from("saved_resources").insert({ user_id: userId, resource_id: resourceId });
      await recordActivity(userId);
    }
  }

  async function updateNotes(content: string) {
    setNotes(content);

    if (!userId) {
      writeLocal({ completedTopics: [...completedTopics], savedResources, notes: content });
      return;
    }

    await supabase.from("topic_notes").upsert(
      { user_id: userId, topic_id: null, content, updated_at: new Date().toISOString() },
      { onConflict: "user_id,topic_id" }
    );
  }

  return {
    loading,
    isSignedIn: !!userId,
    completedTopics,
    savedResources,
    notes,
    studyDates,
    toggleTopic,
    toggleSavedResource,
    updateNotes,
  };
}
