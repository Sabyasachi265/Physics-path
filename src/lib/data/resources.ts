import type { Resource, ResourceCategory } from "@/types/content";

/**
 * Every resource in the library. `id` is referenced by topics.ts
 * (recommendedResourceIds) and by the saved_resources database table, so
 * treat these ids as stable — don't rename an existing one.
 */
export const resources: Resource[] = [
  {
    id: "morin-mechanics",
    name: "Introduction to Classical Mechanics",
    author: "David Morin",
    category: "textbooks",
    description:
      "The gold standard for olympiad mechanics. Packed with problems ranging from easy to brutal, and covers everything needed for mechanics at competition level.",
    difficulty: 4,
    bestFor: "Phase 1 and 2 mechanics",
    timeCommitment: "3–4 months",
  },
  {
    id: "purcell-morin",
    name: "Electricity and Magnetism",
    author: "Purcell & Morin",
    category: "textbooks",
    description:
      "A deeply physical treatment of E&M that builds genuine intuition rather than formula recall. Bridges Gaussian units to SI. Read before attempting Griffiths.",
    difficulty: 4,
    bestFor: "Phase 2 electricity and magnetism",
    timeCommitment: "2–3 months",
  },
  {
    id: "griffiths",
    name: "Introduction to Electrodynamics",
    author: "David Griffiths",
    category: "textbooks",
    description:
      "The standard undergraduate E&M text. More mathematical than Purcell, and excellent preparation for USAPhO-level problems and university physics.",
    difficulty: 3,
    bestFor: "Phase 2–3 electricity and magnetism",
    timeCommitment: "2–3 months",
  },
  {
    id: "irodov",
    name: "Problems in General Physics",
    author: "I. E. Irodov",
    category: "textbooks",
    description:
      "1500 problems spanning all of physics, legendary for their elegance and difficulty. Best used alongside Morin or Purcell, not as a standalone textbook.",
    difficulty: 5,
    bestFor: "Problem practice across all phases",
    timeCommitment: "Ongoing",
  },
  {
    id: "taylor-mechanics",
    name: "Classical Mechanics",
    author: "John R. Taylor",
    category: "textbooks",
    description:
      "An excellent undergraduate text. Particularly strong for Lagrangian mechanics (Chapter 7) and oscillations (Chapter 5) — more readable than Goldstein.",
    difficulty: 3,
    bestFor: "Phase 3 Lagrangian mechanics",
    timeCommitment: "1–2 months (targeted reading)",
  },
  {
    id: "puzzling-problems",
    name: "200 Puzzling Physics Problems",
    author: "Gnädig, Honyek & Vigh",
    category: "textbooks",
    description:
      "Beautifully curated problems with full solutions. Excellent for building olympiad instincts before moving on to Irodov — a natural Phase 1 companion.",
    difficulty: 3,
    bestFor: "Phase 1 problem-solving fluency",
    timeCommitment: "4–6 weeks",
  },
  {
    id: "hecht-optics",
    name: "Optics",
    author: "Eugene Hecht",
    category: "textbooks",
    description:
      "A comprehensive treatment of geometric and wave optics. Chapters 1–9 cover everything F=ma and USAPhO typically test, with rigorous derivations.",
    difficulty: 3,
    bestFor: "Phase 3 optics",
    timeCommitment: "3–4 weeks",
  },
  {
    id: "taylor-wheeler",
    name: "Spacetime Physics",
    author: "Taylor & Wheeler",
    category: "textbooks",
    description:
      "The clearest introduction to special relativity available. Builds geometric intuition for spacetime diagrams before introducing the algebra.",
    difficulty: 3,
    bestFor: "Phase 3 modern physics",
    timeCommitment: "2–3 weeks",
  },
  {
    id: "kleppner",
    name: "An Introduction to Mechanics",
    author: "Kleppner & Kolenkow",
    category: "textbooks",
    description:
      "A rigorous alternative to Morin with a slightly different problem set. Useful for cross-referencing when a Morin explanation doesn't click.",
    difficulty: 4,
    bestFor: "Phase 1 mechanics, alternate explanations",
    timeCommitment: "3–4 months",
  },
  {
    id: "mit-801",
    name: "MIT 8.01 Classical Mechanics",
    author: "Walter Lewin (OpenCourseWare)",
    category: "videos",
    description:
      "Legendary lectures with memorable live demonstrations. Best for building intuition and reviewing concepts, not for learning competition-specific technique.",
    difficulty: 2,
    bestFor: "Concept review",
    timeCommitment: "20–30 hours",
  },
  {
    id: "mit-803",
    name: "MIT 8.03 Waves and Vibrations",
    author: "Yen-Jie Lee (OpenCourseWare)",
    category: "videos",
    description:
      "An outstanding treatment of oscillations and waves that goes deeper than most dedicated olympiad resources. Essential viewing during Phase 2.",
    difficulty: 3,
    bestFor: "Oscillations and waves",
    timeCommitment: "15–20 hours",
  },
  {
    id: "physicswoot",
    name: "PhysicsWOOT",
    author: "Art of Problem Solving",
    category: "videos",
    description:
      "The most respected online olympiad physics course. Covers every topic at USAPhO depth with weekly problem sets and instructor feedback. A serious time investment with serious results.",
    difficulty: 5,
    bestFor: "Complete Phase 2–3 preparation",
    timeCommitment: "8–9 months",
  },
  {
    id: "mit-8044",
    name: "MIT 8.044 Statistical Physics",
    author: "MIT OpenCourseWare",
    category: "videos",
    description:
      "Goes beyond what F=ma requires, but the early lectures on thermodynamics build real understanding of entropy that formula memorization never will.",
    difficulty: 4,
    bestFor: "Deepening thermodynamics",
    timeCommitment: "8–10 hours (selective viewing)",
  },
  {
    id: "fma-exams",
    name: "F=ma Past Exams",
    author: "AAPT / American Association of Physics Teachers",
    category: "exams",
    description:
      "25 multiple-choice problems, 75 minutes — the official qualifying exam for USAPhO. Work through 2010–present under timed conditions as your primary benchmark.",
    difficulty: 3,
    bestFor: "F=ma preparation and topic review",
    timeCommitment: "1–2 hours per exam",
  },
  {
    id: "usapho-exams",
    name: "USAPhO Past Exams",
    author: "AAPT",
    category: "exams",
    description:
      "Free-response, proof-based problems for the semi-final qualifier for the US IPhO team. Significantly harder than F=ma — start these only after Phase 3.",
    difficulty: 5,
    bestFor: "USAPhO preparation",
    timeCommitment: "3 hours per exam",
  },
  {
    id: "ipho-archive",
    name: "IPhO Problems Archive",
    author: "International Physics Olympiad",
    category: "exams",
    description:
      "International Physics Olympiad problems — harder than USAPhO and often more creative. A worthwhile stretch goal even for students targeting F=ma only.",
    difficulty: 5,
    bestFor: "Advanced, creative problem-solving",
    timeCommitment: "Selective practice",
  },
  {
    id: "aops-forum",
    name: "Art of Problem Solving (AoPS) Forums",
    author: "AoPS community",
    category: "communities",
    description:
      "The largest English-language olympiad community. The physics subforum has searchable discussion of past problems, resource recommendations, and study strategies.",
    difficulty: 1,
    bestFor: "Community discussion and problem help",
    timeCommitment: "As needed",
  },
  {
    id: "physics-stackexchange",
    name: "Physics Stack Exchange",
    author: "Stack Exchange community",
    category: "communities",
    description:
      "A question-and-answer site for conceptual and technical physics questions. Useful when you're stuck on a concept and a different explanation might help it click.",
    difficulty: 2,
    bestFor: "Concept clarification",
    timeCommitment: "As needed",
  },
  {
    id: "reddit-physicsolympiad",
    name: "r/PhysicsOlympiad",
    author: "Reddit community",
    category: "communities",
    description:
      "An active community for olympiad preparation — resource recommendations, motivation, and peer comparison. Check the pinned wiki before posting a new question.",
    difficulty: 1,
    bestFor: "Community support and resource discovery",
    timeCommitment: "As needed",
  },
  {
    id: "wolfram-alpha",
    name: "Wolfram Alpha",
    author: "Wolfram",
    category: "websites",
    description:
      "Best used to verify an intermediate calculation, not to solve a problem outright. Checking an integral for a potential energy term is fair game; letting it solve the whole problem defeats the purpose.",
    difficulty: 1,
    bestFor: "Calculation verification",
    timeCommitment: "As needed",
  },
];

export function getResourceById(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}

export function getResourcesByCategory(category: ResourceCategory): Resource[] {
  return resources.filter((r) => r.category === category);
}

export const resourceCategories: { key: ResourceCategory; label: string }[] = [
  { key: "textbooks", label: "Textbooks" },
  { key: "videos", label: "Lecture videos" },
  { key: "problems", label: "Practice problems" },
  { key: "exams", label: "Past F=ma exams" },
  { key: "communities", label: "Communities" },
  { key: "websites", label: "Useful websites" },
];
