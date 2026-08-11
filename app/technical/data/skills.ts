/**
 * The skill tree, as lanes of tiers rather than absolute pixel coordinates —
 * layout is computed from this shape, so nothing here is a position.
 * See docs/REVAMP-SPEC.md §6.
 *
 * Order inside a lane is the reading order: foundational at the top, the work
 * it enabled below it.
 *
 * `blurb` is deliberately how-and-why, never what. "React" does not say "a
 * JavaScript library" — it says where it was used and what it made possible.
 * These are drafts from the résumé and project list; Spencer edits.
 */

export const TIERS = { 1: "Learning", 2: "Working", 3: "Fluent" } as const;

export type Tier = keyof typeof TIERS;

export type Skill = {
  id: string;
  /** 2–4 characters — it has to fit the pixel marker. */
  abbr: string;
  label: string;
  tier: Tier;
  /** The course, job, or project that earned it. */
  source: string;
  year: number;
  blurb: string;
};

export type Lane = {
  id: string;
  name: string;
  skills: Skill[];
};

export const lanes: Lane[] = [
  {
    id: "foundations",
    name: "Foundations",
    skills: [
      {
        id: "java",
        abbr: "JAVA",
        label: "Java",
        tier: 3,
        source: "CS1101 · CS2201",
        year: 2022,
        blurb:
          "The language I learned to think in, and then the one I taught. Two years of TAing meant reading hundreds of other people's Java and finding the exact line where their mental model broke.",
      },
      {
        id: "oop",
        abbr: "OOP",
        label: "Object-Oriented Programming",
        tier: 3,
        source: "CS2201",
        year: 2022,
        blurb:
          "Where I stopped writing programs and started writing systems. It is the reason I reach for a boundary before I reach for a feature.",
      },
      {
        id: "dsa",
        abbr: "DSA",
        label: "Data Structures & Algorithms",
        tier: 3,
        source: "CS2201 · CS3250",
        year: 2023,
        blurb:
          "Less about interview puzzles than about knowing the cost of a choice before making it. It is why the solitaire move validator runs in constant time instead of rescanning the board.",
      },
      {
        id: "discrete",
        abbr: "DISC",
        label: "Discrete Mathematics",
        tier: 2,
        source: "Discrete Structures",
        year: 2023,
        blurb:
          "Gave me the vocabulary for proving a thing is correct rather than testing until it seems correct. Shows up most when I am reasoning about state machines and game rules.",
      },
      {
        id: "patterns",
        abbr: "PTRN",
        label: "Design Patterns",
        tier: 3,
        source: "CS3252 Design Patterns",
        year: 2024,
        blurb:
          "The course that changed how I read other people's code. I use patterns as names for problems I have already seen, not as a checklist to satisfy.",
      },
      {
        id: "git",
        abbr: "GIT",
        label: "Git / GitHub",
        tier: 3,
        source: "Every project since 2022",
        year: 2022,
        blurb:
          "Running Faunology's integration branch for a four-person team taught me that a clean history is a communication tool, not bookkeeping.",
      },
    ],
  },
  {
    id: "web",
    name: "Web",
    skills: [
      {
        id: "html",
        abbr: "HTML",
        label: "HTML",
        tier: 3,
        source: "Web Development",
        year: 2022,
        blurb:
          "Semantics first. Most of the accessibility I get for free on this site comes from picking the right element instead of styling a div into one.",
      },
      {
        id: "css",
        abbr: "CSS",
        label: "CSS",
        tier: 3,
        source: "Web Development · this site",
        year: 2022,
        blurb:
          "I moved this portfolio's responsive behaviour out of JavaScript and into media queries, which removed an entire class of hydration bug on a static export.",
      },
      {
        id: "js",
        abbr: "JS",
        label: "JavaScript",
        tier: 3,
        source: "Solitaire Saga · Faunology",
        year: 2022,
        blurb:
          "The glue on every web project I have shipped. Phaser's game loop and React's render cycle disagree about who owns state, and reconciling them is a JavaScript problem.",
      },
      {
        id: "typescript",
        abbr: "TS",
        label: "TypeScript",
        tier: 3,
        source: "Triton Sensors",
        year: 2024,
        blurb:
          "Working on a production dashboard used daily by schools, types were the thing that let me change shared code without breaking someone else's screen.",
      },
      {
        id: "react",
        abbr: "RCT",
        label: "React",
        tier: 3,
        source: "Triton Sensors · Faunology",
        year: 2023,
        blurb:
          "Built a permission-gated audit diff viewer and a time-format setting at Triton, both live in production. Faunology pushed me further: rendering a Phaser canvas inside a React tree without either fighting the other.",
      },
      {
        id: "nextjs",
        abbr: "NEXT",
        label: "Next.js",
        tier: 2,
        source: "This site",
        year: 2025,
        blurb:
          "Chosen here specifically for its static export, since GitHub Pages has no server. Every architectural decision on this site falls out of that one constraint.",
      },
      {
        id: "node",
        abbr: "NODE",
        label: "Node.js",
        tier: 3,
        source: "Spencer Solitaire Saga",
        year: 2023,
        blurb:
          "The REST API behind Solitaire Saga runs here — game logic, move validation, and JWT auth, all server-side so the client cannot cheat itself a win.",
      },
      {
        id: "express",
        abbr: "EXPR",
        label: "Express",
        tier: 2,
        source: "Spencer Solitaire Saga",
        year: 2023,
        blurb:
          "Thin routing over the game logic. Kept it deliberately boring so the interesting decisions stayed in one place instead of leaking into middleware.",
      },
      {
        id: "rest",
        abbr: "REST",
        label: "RESTful APIs",
        tier: 3,
        source: "Triton Sensors · Solitaire Saga",
        year: 2023,
        blurb:
          "Consuming Django REST endpoints at Triton and designing my own for Solitaire taught me both halves — the contract reads very differently from each side.",
      },
      {
        id: "sql",
        abbr: "SQL",
        label: "SQL (Postgres)",
        tier: 2,
        source: "MovieBoxd DBMS",
        year: 2024,
        blurb:
          "Modelling a Letterboxd-style review platform meant the schema had to answer questions I had not thought of yet. Normalisation stopped being an exercise and became a design tool.",
      },
      {
        id: "mongo",
        abbr: "MNGO",
        label: "MongoDB",
        tier: 2,
        source: "Spencer Solitaire Saga",
        year: 2023,
        blurb:
          "Card state, move history, and user profiles. The schema was shaped around one requirement: reload a session mid-game and have it be exactly where you left it.",
      },
      {
        id: "testing",
        abbr: "TEST",
        label: "Testing / QA",
        tier: 2,
        source: "Triton Sensors",
        year: 2024,
        blurb:
          "Shipping to real customers changed what I test. I write cases for the states a user can get stuck in, not for the paths I already know work.",
      },
      {
        id: "docker",
        abbr: "DOCK",
        label: "Docker",
        tier: 1,
        source: "DevOps coursework",
        year: 2025,
        blurb:
          "Comfortable running and composing containers; still learning how to build images I would want someone else to depend on.",
      },
      {
        id: "redis",
        abbr: "RDIS",
        label: "Redis",
        tier: 1,
        source: "Spencer Solitaire Saga",
        year: 2024,
        blurb:
          "Added for session caching once repeated game-state reads became the slow path. Enough to be useful, not yet enough to be opinionated.",
      },
    ],
  },
  {
    id: "systems",
    name: "Systems / Game Design",
    skills: [
      {
        id: "c",
        abbr: "C",
        label: "C",
        tier: 2,
        source: "Computer Architecture",
        year: 2023,
        blurb:
          "Where memory stopped being an abstraction. Everything I understand about why Rust's ownership rules exist, I understand because I first wrote the bugs they prevent.",
      },
      {
        id: "arch",
        abbr: "ARCH",
        label: "Computer Architecture",
        tier: 2,
        source: "CS3281",
        year: 2023,
        blurb:
          "Caches, pipelines, and the cost of a branch. This is the course that makes data-oriented design feel obvious rather than clever.",
      },
      {
        id: "assembly",
        abbr: "ASM",
        label: "Assembly (RISC-V)",
        tier: 1,
        source: "Computer Architecture",
        year: 2023,
        blurb:
          "Enough to read compiler output and understand what a line of C actually costs. I do not write it by choice, but I am glad I can follow it.",
      },
      {
        id: "cpp",
        abbr: "C++",
        label: "C++",
        tier: 3,
        source: "Pixel Lance · CS3891",
        year: 2024,
        blurb:
          "A team pixel-art game on a custom engine. C++ is where I learned that engine code and game code want completely different things from a language.",
      },
      {
        id: "csharp",
        abbr: "C#",
        label: "C#",
        tier: 2,
        source: "Godot · Unreal work",
        year: 2024,
        blurb:
          "My scripting layer for engine work. Fast to iterate in, which matters more than raw speed when you are still deciding what the game is.",
      },
      {
        id: "godot",
        abbr: "GDOT",
        label: "Godot Engine",
        tier: 2,
        source: "Pixel Lance",
        year: 2024,
        blurb:
          "Its scene tree is the clearest composition model I have used in an engine, and it quietly changed how I structure React components too.",
      },
      {
        id: "unreal",
        abbr: "UE5",
        label: "Unreal Engine 5",
        tier: 1,
        source: "Game Engine Architecture",
        year: 2025,
        blurb:
          "Studied for its rendering and asset pipeline rather than to ship in. Useful as a reference for what a mature engine decides on your behalf.",
      },
      {
        id: "rust",
        abbr: "RUST",
        label: "Rust",
        tier: 2,
        source: "2.5D RPG Game Engine",
        year: 2025,
        blurb:
          "Building an Entity-Component System from scratch with wgpu and winit. The borrow checker is doing the reasoning I used to have to hold in my head across a C++ codebase.",
      },
      {
        id: "ecs",
        abbr: "ECS",
        label: "Entity-Component Systems",
        tier: 2,
        source: "2.5D RPG Game Engine",
        year: 2025,
        blurb:
          "Chose it over an inheritance hierarchy because behaviour on a 2.5D RPG entity changes constantly and its identity does not. Cache locality was the second reason, not the first.",
      },
    ],
  },
  {
    id: "ml",
    name: "ML / Academic",
    skills: [
      {
        id: "cogpsych",
        abbr: "COG",
        label: "Cognitive Psychology",
        tier: 3,
        source: "Cognitive Studies degree",
        year: 2022,
        blurb:
          "Half my degree, and the half that decides how I build interfaces. If a screen makes someone hold three things in working memory, that is a design bug.",
      },
      {
        id: "python",
        abbr: "PY",
        label: "Python",
        tier: 3,
        source: "Vanderbilt research",
        year: 2022,
        blurb:
          "The language my research lives in. Model, run, plot, revise — the loop is short enough that the language stays out of the way of the question.",
      },
      {
        id: "multicalc",
        abbr: "CALC",
        label: "Multivariable Calculus",
        tier: 2,
        source: "MATH 2300",
        year: 2022,
        blurb:
          "Gradients stopped being notation the first time I watched one drive backpropagation on a network I had written myself.",
      },
      {
        id: "linalg",
        abbr: "LNAL",
        label: "Linear Algebra",
        tier: 2,
        source: "MATH 2410",
        year: 2023,
        blurb:
          "The actual substrate of everything in this lane. Tensor shape errors stopped being guesswork once I could picture what the operation was doing.",
      },
      {
        id: "probstats",
        abbr: "PROB",
        label: "Probability & Statistics",
        tier: 2,
        source: "Research methods",
        year: 2023,
        blurb:
          "Needed for the psych half of the research as much as the modelling half — running human studies means being honest about what your sample can support.",
      },
      {
        id: "nn",
        abbr: "NN",
        label: "Neural Networks",
        tier: 2,
        source: "CLIPS · VU Summer Research 2025",
        year: 2024,
        blurb:
          "Built to test a cognitive theory, not to hit a benchmark. The interesting result is where the model fails the same way a child does.",
      },
      {
        id: "pytorch",
        abbr: "TRCH",
        label: "PyTorch",
        tier: 2,
        source: "CLIPS siamese network",
        year: 2024,
        blurb:
          "A contrastive-learning experiment on paired inputs. Most of the work was in the data pipeline and the loss, which is usually where it is.",
      },
      {
        id: "data",
        abbr: "DATA",
        label: "Data Analysis",
        tier: 2,
        source: "Computational Cognitive Development Lab",
        year: 2023,
        blurb:
          "Turning on-site study results into something a PI can act on. The analysis is easy; deciding what the result actually licenses you to claim is not.",
      },
      {
        id: "r",
        abbr: "R",
        label: "R",
        tier: 1,
        source: "Research methods",
        year: 2023,
        blurb:
          "Used where the lab's existing analysis scripts lived. Comfortable following and extending them; Python is where I start from scratch.",
      },
    ],
  },
  {
    id: "design",
    name: "UI / UX",
    skills: [
      {
        id: "figma",
        abbr: "FIGM",
        label: "Figma",
        tier: 2,
        source: "UI/UX coursework",
        year: 2024,
        blurb:
          "Where I argue with a layout before it costs anything to change. Building the component set first is what keeps the built version consistent.",
      },
      {
        id: "heuristics",
        abbr: "HEUR",
        label: "Heuristic Evaluation",
        tier: 2,
        source: "UI/UX coursework",
        year: 2024,
        blurb:
          "A structured way to find the problems you have gone blind to on your own project. Cheaper than a user study and catches a surprising amount.",
      },
      {
        id: "usability",
        abbr: "USER",
        label: "Usability Testing",
        tier: 2,
        source: "Faunology · coursework",
        year: 2024,
        blurb:
          "Watching 25 Faunology players hit the same confusing moment is worth more than any amount of internal debate about whether it was confusing.",
      },
      {
        id: "systems-design",
        abbr: "SYS",
        label: "Design Systems",
        tier: 2,
        source: "This site · Triton Sensors",
        year: 2025,
        blurb:
          "One token set, one spacing scale, one place colour is defined. It is the difference between a site that stays coherent as it grows and one that does not.",
      },
      {
        id: "a11y",
        abbr: "A11Y",
        label: "Accessibility",
        tier: 2,
        source: "This site · Triton Sensors",
        year: 2025,
        blurb:
          "Keyboard paths, focus order, and contrast checked as I build rather than audited at the end. The cognitive-science half of my degree makes this feel like the same job as usability.",
      },
    ],
  },
];

const index = new Map(
  lanes.flatMap((lane) =>
    lane.skills.map((skill) => [skill.id, { skill, lane }]),
  ),
);

export const findSkill = (id: string) => index.get(id);
