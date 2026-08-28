export const resources: Resource[] = [
  {
    id: "morin-mechanics",
    name: "Introduction to Classical Mechanics",
    author: "David Morin",
    category: "textbooks",
    description:
      "The best mechanics book for olympiad prep. Problems range from straightforward to really hard. This is what you need for Phase 1–2.",
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
      "Builds real intuition for E&M instead of memorizing formulas. Uses Gaussian units but bridges to SI. Start here before Griffiths.",
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
      "More rigorous than Purcell, heavier on math. The go to text if you want to go deep into E&M or prep for university-level physics.",
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
      "1500 really hard problems across all of physics. Use it as a companion to Morin or Purcell, not on its own.",
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
      "Cleaner and more readable than Goldstein. Chapters 5 (oscillations) and 7 (Lagrangian) are especially strong relatively for olympiad prep.",
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
      "Beautifully curated problems with full solutions. It is a perfect starter before tackling Irodov and it also builds problem-solving instincts.",
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
      "Covers geometric and wave optics at depth. Chapters 1–9 have everything F=ma and USAPhO test, with rigorous derivations throughout.",
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
      "The best intro to special relativity. Starts with geometric intuition and spacetime diagrams, then adds the math. Worth reading even if you decide to skip the algebra.",
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
      "A solid alternative to Morin. Different problem set and explanations. It useful if a concept from Morin doesn't click.",
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
      "Famous lectures with great demos. Builds intuition and conceptual understanding, but is not for competition technique. Best for review.",
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
      "Exceptional treatment of oscillations and waves. It also goes deeper than most olympiad resources. Must-watch for Phase 2.",
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
      "The best online olympiad physics course if you are willing to pay. Covers every topic at USAPhO level with weekly problems and feedback.",
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
      "Overkill for F=ma, but the thermodynamics lectures teach entropy conceptually.",
    difficulty: 4,
    bestFor: "Deepening thermodynamics",
    timeCommitment: "8–10 hours (selective viewing)",
  },
  {
    id: "fma-exams",
    name: "F=ma Past Exams",
    author: "AAPT",
    category: "exams",
    description:
      "25 multiple-choice problems, 75 minutes. Do 2010–present under timed conditions. Do not waste these!!!! Do them after you have studied well!!!",
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
      "Self explanatory.",
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
      "International Physics Olympiad problems. Harder than USAPhO and often more creative. A worthwhile stretch goal even for students targeting F=ma only.",
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
      "The largest English-language olympiad community. The go to physics subforum has searchable discussion of past problems, resource recommendations, and study strategies.",
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
      "A question-and-answer site for conceptual and technical physics questions. Usually useful when you're stuck on a concept and a different explanation might help it click.",
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
      "An active community for olympiad preparation. It has resource recommendations, motivation, and peer comparison. Check the pinned wiki before posting a new question.",
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
      "Best used to verify an intermediate calculation and not to solve a problem outright. Checking an integral for a potential energy term is what YOU should be doing; letting it solve the whole problem defeats the purpose.",
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
