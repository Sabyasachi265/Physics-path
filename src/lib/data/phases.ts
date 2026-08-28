import type { Phase } from "@/types/content";

/**
 * The three roadmap phases. Each references topic ids from topics.ts —
 * order in `topicIds` is the recommended study order within the phase.
 */
export const phases: Phase[] = [
  {
    id: "phase1",
    name: "Phase 1 — Foundations",
    goal: "Solidify mechanics and start to develop problem solving instincts",
    duration: "6–8 weeks",
    colorClass: "primary",
    topicIds: ["kinematics", "dynamics", "energy", "momentum", "rotation"],
  },
  {
    id: "phase2",
    name: "Phase 2 — Core Olympiad Topics",
    goal: "Learn every major topic area tested on F=ma and early USAPhO",
    duration: "12–16 weeks",
    colorClass: "success",
    topicIds: [
      "oscillations",
      "gravity",
      "fluids",
      "thermo",
      "electrostatics",
      "magnetism",
    ],
  },
  {
    id: "phase3",
    name: "Phase 3 — USAPhO Preparation",
    goal: "Build analytical depth and proof based problem solving",
    duration: "8–12 weeks",
    colorClass: "accent",
    topicIds: ["lagrangian", "optics", "modern"],
  },
];

export function getPhaseById(id: string): Phase | undefined {
  return phases.find((p) => p.id === id);
}
