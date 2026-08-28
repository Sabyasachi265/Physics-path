import type { Topic } from "@/types/content";

/**
 * All roadmap topics, grouped implicitly by `phase`. To add a new topic:
 * 1. Add an entry here with a unique `id`.
 * 2. Add that `id` to the right phase's `topicIds` array in phases.ts.
 * 3. Reference real resource `id`s from resources.ts in recommendedResourceIds.
 */
export const topics: Topic[] = [
  {
    id: "kinematics",
    name: "Advanced Kinematics",
    icon: "target",
    phase: 1,
    estimatedTime: "1 week",
    overview:
      "Parametric motion, 2D relative motion, and constraints. You SHOULD derive relationships from geometry instead of memorizing formulas.",
    misconceptions: [
      {
        wrong: "Velocity is always parallel to displacement.",
        right: "Velocity is tangent to the path. Displacement connects start to end; they're different things.",
      },
      {
        wrong: "Perpendicular acceleration means circular motion.",
        right: "Perpendicular acceleration keeps speed constant. The path could be elliptical, parabolic, or anything else.",
      },
    ],
    recommendedResourceIds: ["morin-mechanics", "kleppner", "puzzling-problems"],
    practiceProblems: ["F=ma 2019 #7", "IPhO 2012 P1", "Irodov 1.13–1.20"],
    relatedTopicIds: ["dynamics", "rotation", "oscillations"],
  },
  {
    id: "dynamics",
    name: "Newtonian Dynamics",
    icon: "settings",
    phase: 1,
    estimatedTime: "1.5 weeks",
    overview:
      "Constraint equations, pseudo-forces in non-inertial frames, friction in complex setups. Analyze the systems and not individual objects.",
    misconceptions: [
      {
        wrong: "Normal force always equals mg.",
        right: "Normal force depends on acceleration, curvature, and all other forces acting.",
      },
      {
        wrong: "Static friction is weaker than kinetic friction.",
        right: "Maximum static friction is usually stronger. Static friction can be anywhere from 0 to its maximum.",
      },
    ],
    recommendedResourceIds: ["morin-mechanics", "kleppner"],
    practiceProblems: ["F=ma 2020 #4–6", "Irodov 1.101–1.120"],
    relatedTopicIds: ["kinematics", "energy", "rotation"],
  },
  {
    id: "energy",
    name: "Energy & Work",
    icon: "zap",
    phase: 1,
    estimatedTime: "1 week",
    overview:
      "Energy methods are faster than force methods for olympiad problems. Learn potential energy landscapes and the full work-energy theorem.",
    misconceptions: [
      {
        wrong: "Work-energy theorem only applies to particles.",
        right: "It applies to any system. Track work by all forces, including internal ones.",
      },
      {
        wrong: "Conservative forces do no work.",
        right: "They do work. That work is path-independent and equals negative change in potential energy.",
      },
    ],
    recommendedResourceIds: ["morin-mechanics", "kleppner"],
    practiceProblems: ["F=ma 2018 #3", "Irodov 1.134–1.155"],
    relatedTopicIds: ["dynamics", "oscillations", "thermo"],
  },
  {
    id: "momentum",
    name: "Momentum & Collisions",
    icon: "target",
    phase: 1,
    estimatedTime: "1 week",
    overview:
      "Impulse-momentum theorem, elastic and inelastic collisions in 2D, center-of-mass frames, rocket problems.",
    misconceptions: [
      {
        wrong: "Momentum conserves only in isolated systems.",
        right: "Momentum along any direction conserves when net external force along that direction is zero.",
      },
      {
        wrong: "Elastic means no energy loss.",
        right: "True, but more useful: relative velocity reverses exactly. v_rel_after = −v_rel_before.",
      },
    ],
    recommendedResourceIds: ["morin-mechanics", "kleppner"],
    practiceProblems: ["F=ma 2021 #11", "Irodov 1.156–1.180"],
    relatedTopicIds: ["dynamics", "rotation"],
  },
  {
    id: "rotation",
    name: "Rotational Motion",
    icon: "refresh-cw",
    phase: 1,
    estimatedTime: "1.5 weeks",
    overview:
      "Moment of inertia, angular momentum, torque, and rolling without slipping. The parallel axis theorem. Angular momentum conservation is really underused by AP-trained students. It often bypasses complex force analysis entirely!!",
    misconceptions: [
      {
        wrong: "An object rolling without slipping has no friction acting on it.",
        right: "Static friction acts at the contact point and does zero work, but it absolutely exists and provides the torque needed for rolling.",
      },
      {
        wrong: "Angular momentum is conserved whenever torque is zero about any point.",
        right: "It's conserved about one specific point when the net torque about THAT point is zero — the choice of point matters.",
      },
    ],
    recommendedResourceIds: ["morin-mechanics", "kleppner"],
    practiceProblems: ["F=ma 2022 #14", "Irodov 1.240–1.280"],
    relatedTopicIds: ["dynamics", "oscillations", "momentum"],
  },
  {
    id: "oscillations",
    name: "Oscillations & Waves",
    icon: "activity",
    phase: 2,
    estimatedTime: "2 weeks",
    overview:
      "Simple harmonic motion derived from the differential equation. Damped and driven oscillations qualitatively. Coupled oscillators. Wave superposition and standing waves.",
    misconceptions: [
      {
        wrong: "The period of SHM depends on amplitude.",
        right: "For ideal SHM, the period is amplitude-independent. That's essentially the definition of SHM.",
      },
      {
        wrong: "Waves transport matter from one place to another.",
        right: "Waves transport energy and information; the medium itself oscillates in place.",
      },
    ],
    recommendedResourceIds: ["morin-mechanics", "purcell-morin", "mit-803"],
    practiceProblems: ["F=ma 2019 #15", "IPhO 2015 P2", "Irodov 4.1–4.50"],
    relatedTopicIds: ["kinematics", "energy", "electrostatics"],
  },
  {
    id: "gravity",
    name: "Gravity & Orbits",
    icon: "globe",
    phase: 2,
    estimatedTime: "1 week",
    overview:
      "Gravitational potential energy, Kepler's laws derived from conservation laws, orbital mechanics, escape velocity, and the shell theorem. Work through the shell theorem proof yourself at least once.",
    misconceptions: [
      {
        wrong: "Gravitational field strength is always strongest at a planet's surface.",
        right: "For a uniform sphere, field strength does peak at the surface and decreases both above and below it — but density variation inside real planets changes this.",
      },
      {
        wrong: "Circular orbits are the typical or default case.",
        right: "Circular orbits are a special case. Every bound orbit is an ellipse, per Kepler's first law.",
      },
    ],
    recommendedResourceIds: ["morin-mechanics", "kleppner"],
    practiceProblems: ["F=ma 2020 #18", "Irodov 1.195–1.215"],
    relatedTopicIds: ["energy", "rotation"],
  },
  {
    id: "fluids",
    name: "Fluid Mechanics",
    icon: "droplet",
    phase: 2,
    estimatedTime: "1 week",
    overview:
      "Hydrostatics, buoyancy, Bernoulli's equation, and continuity. Pressure in accelerating fluids. Surface tension at a conceptual level. Fluid problems often combine several mechanics concepts at once.",
    misconceptions: [
      {
        wrong: "Bernoulli's equation only applies to horizontal flow.",
        right: "Bernoulli's equation applies along any streamline and includes a potential-energy term for height differences.",
      },
      {
        wrong: "Buoyant force always equals the weight of displaced fluid.",
        right: "That's Archimedes' principle for static fluids specifically — dynamic effects like flow change the net lift force.",
      },
    ],
    recommendedResourceIds: ["irodov"],
    practiceProblems: ["F=ma 2018 #12", "Irodov 2.1–2.50"],
    relatedTopicIds: ["dynamics", "energy"],
  },
  {
    id: "thermo",
    name: "Thermodynamics",
    icon: "flame",
    phase: 2,
    estimatedTime: "2 weeks",
    overview:
      "The ideal gas law, kinetic theory, the four thermodynamic processes, heat engines and efficiency, and entropy at a conceptual level. The first and second laws. Work through the Carnot cycle derivation.",
    misconceptions: [
      {
        wrong: "Heat and temperature are the same thing.",
        right: "Temperature measures average kinetic energy per molecule; heat is energy transferred as a result of a temperature difference.",
      },
      {
        wrong: "An adiabatic process means temperature doesn't change.",
        right: "Adiabatic means no heat is exchanged — temperature absolutely changes, following PV^γ = constant.",
      },
    ],
    recommendedResourceIds: ["irodov", "mit-8044"],
    practiceProblems: ["F=ma 2021 #16", "IPhO 2016 P3", "Irodov 2.125–2.180"],
    relatedTopicIds: ["energy"],
  },
  {
    id: "electrostatics",
    name: "Electrostatics",
    icon: "zap",
    phase: 2,
    estimatedTime: "2 weeks",
    overview:
      "Coulomb's law, electric fields and potentials, Gauss's law in full generality, capacitors, and conductors in equilibrium. Master Gauss's law: it's far more powerful than Coulomb's law for symmetric charge distributions.",
    misconceptions: [
      {
        wrong: "The electric field is zero inside any closed surface.",
        right: "It's zero inside a conducting shell in electrostatic equilibrium specifically. Gauss's law more generally relates flux through a surface to the charge it encloses.",
      },
      {
        wrong: "Capacitance depends on the charge and voltage on the plates.",
        right: "Capacitance depends only on geometry. C = Q/V is a relationship, but C itself is fixed by the shape and material of the capacitor.",
      },
    ],
    recommendedResourceIds: ["griffiths", "purcell-morin"],
    practiceProblems: ["F=ma 2022 #19", "Irodov 3.1–3.80"],
    relatedTopicIds: ["magnetism", "oscillations"],
  },
  {
    id: "magnetism",
    name: "Magnetism",
    icon: "magnet",
    phase: 2,
    estimatedTime: "2 weeks",
    overview:
      "Magnetic force, the Biot-Savart law, Ampere's law, Faraday's law, inductance, and energy stored in magnetic fields. The connection between magnetism and special relativity is elegant and worth understanding conceptually.",
    misconceptions: [
      {
        wrong: "Magnetic force does work on moving charges.",
        right: "Magnetic force is always perpendicular to velocity, so it does zero work — it changes a charge's direction, never its speed.",
      },
      {
        wrong: "Lenz's law says induced current opposes the change in current.",
        right: "Lenz's law says induced current opposes the change in magnetic flux, which is related to current but not the same quantity.",
      },
    ],
    recommendedResourceIds: ["griffiths", "purcell-morin"],
    practiceProblems: ["F=ma 2021 #20", "IPhO 2018 P2", "Irodov 3.200–3.280"],
    relatedTopicIds: ["electrostatics"],
  },
  {
    id: "lagrangian",
    name: "Lagrangian Mechanics",
    icon: "sigma",
    phase: 3,
    estimatedTime: "2 weeks",
    overview:
      "The Euler-Lagrange equation and generalized coordinates. Not strictly required for USAPhO, but it helps your ability to solve complex constraint problems and is close to essential for serious olympiad training beyond F=ma.",
    misconceptions: [
      {
        wrong: "Lagrangian mechanics is just another way to write F = ma.",
        right: "It's a genuinely different framework. You only need kinetic and potential energy, never force vectors directly.",
      },
      {
        wrong: "You need calculus of variations to use it.",
        right: "You need to know the result (the Euler-Lagrange equation) and how to apply it. The derivation helps intuition but isn't required to use the tool.",
      },
    ],
    recommendedResourceIds: ["taylor-mechanics"],
    practiceProblems: ["USAPhO 2019 A2", "BPhO Round 2 problems"],
    relatedTopicIds: ["rotation", "oscillations"],
  },
  {
    id: "optics",
    name: "Optics",
    icon: "telescope",
    phase: 3,
    estimatedTime: "1.5 weeks",
    overview:
      "Geometric optics: ray diagrams, the lensmaker's equation, mirrors — plus wave optics: interference, diffraction, and the basics of polarization. Olympiad optics problems reward good discipline and consistent SIGN CONVENTIONS!",
    misconceptions: [
      {
        wrong: "A diverging lens always produces a smaller image.",
        right: "That holds for real, distant objects. The image from a single diverging lens is always virtual and upright, but its size depends on object distance.",
      },
      {
        wrong: "Diffraction requires two slits.",
        right: "A single slit alone produces a broad central diffraction maximum; adding a second slit overlays fine interference fringes on top of it.",
      },
    ],
    recommendedResourceIds: ["hecht-optics"],
    practiceProblems: ["USAPhO 2020 B1", "IPhO 2017 P1", "F=ma 2018 #8–9"],
    relatedTopicIds: ["oscillations", "magnetism"],
  },
  {
    id: "modern",
    name: "Modern Physics",
    icon: "atom",
    phase: 3,
    estimatedTime: "1.5 weeks",
    overview:
      "Special relativity: Lorentz transforms, energy-momentum, four-vectors — plus the photoelectric effect, the de Broglie wavelength, and basic quantum numbers. F=ma tests modern physics lightly; USAPhO tests special relativity seriously.",
    misconceptions: [
      {
        wrong: "Time dilation means moving clocks run slow from every point of view.",
        right: "A clock's own rest frame always measures its proper time, the shortest possible interval. Each observer sees the OTHER's clock running slow — the effect is symmetric.",
      },
      {
        wrong: "E = mc² is the complete energy relation.",
        right: "The full relation is E² = (pc)² + (mc²)². E = mc² is the special case for an object at rest, where p = 0.",
      },
    ],
    recommendedResourceIds: ["taylor-wheeler"],
    practiceProblems: ["USAPhO 2021 B2", "IPhO 2019 P3"],
    relatedTopicIds: ["electrostatics", "oscillations"],
  },
];

export function getTopicById(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}

export function getTopicsByPhase(phase: 1 | 2 | 3): Topic[] {
  return topics.filter((t) => t.phase === phase);
}
