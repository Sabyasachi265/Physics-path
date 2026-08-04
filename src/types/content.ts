/**
 * Content types for the physics curriculum itself. This is separate from
 * database.ts (which describes user data like progress and notes) because
 * roadmap content is static and version-controlled in code, not stored in
 * the database. This keeps content edits as normal code changes / PRs,
 * while user progress lives in Supabase.
 */

export interface Misconception {
  wrong: string;
  right: string;
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  phase: 1 | 2 | 3;
  estimatedTime: string;
  overview: string;
  misconceptions: Misconception[];
  recommendedResourceIds: string[];
  practiceProblems: string[];
  relatedTopicIds: string[];
}

export interface Phase {
  id: string;
  name: string;
  goal: string;
  duration: string;
  colorClass: string; // Tailwind color token, e.g. "primary" | "success" | "accent"
  topicIds: string[];
}

export type ResourceCategory =
  | "textbooks"
  | "videos"
  | "problems"
  | "exams"
  | "communities"
  | "websites";

export interface Resource {
  id: string;
  name: string;
  author: string;
  category: ResourceCategory;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  bestFor: string;
  timeCommitment: string;
  url?: string;
}
