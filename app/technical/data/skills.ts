/**
 * The skill tree, as lanes of tiers rather than absolute pixel coordinates.
 * Layout is computed from this shape, so nothing here is a position.
 * See docs/REVAMP-SPEC.md §6.
 *
 * Lanes and nodes mirror the Claude Design skill-tree mockup exactly, down to
 * the tier of each node and the course or project credited beneath it.
 *
 * Order inside a lane is the reading order: foundational at the top, the work
 * it enabled below it.
 *
 * `blurb` is deliberately how-and-why, never what. "React" does not say "a
 * JavaScript library", it says where it was used and what it made possible.
 */

export const TIERS = { 1: "Learning", 2: "Working", 3: "Fluent" } as const;

export type Tier = keyof typeof TIERS;

export type Skill = {
  id: string;
  /** 1–2 characters, because it has to fit the pixel marker. */
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
        id: "git",
        abbr: "GT",
        label: "Git / GitHub",
        tier: 3,
        source: "3+ projects",
        year: 2022,
        blurb:
          "Obviously useful and industry standard. Mastering GitHub throughout the years meant mastering an individual and collaborative workflow through issue tracking, PRs.",
      },
      {
        id: "java",
        abbr: "JA",
        label: "Java",
        tier: 3,
        source: "CS 1101 / 2201",
        year: 2022,
        blurb:
          "The language I learned to think in, and then the one I taught. Two years of TAing meant reviewing hundreds of other people's Java and finding the exact line where their mental model broke.  While I don’t particularly use it now for projects, it is an excellent foundation for OOP, tracing errors, and coding.",
      },
      {
        id: "oop",
        abbr: "OO",
        label: "Object-Oriented Programming",
        tier: 3,
        source: "CS 2201",
        year: 2022,
        blurb:
          "Encapsulation, Abstraction, Inheritance, and Polymorphism are crucial concepts I use daily to creating reusable, readable, clean, and maintainable code everyday, even outside of in-class PAs.",
      },
      {
        id: "dsa",
        abbr: "DS",
        label: "Data Structures & Algorithms",
        tier: 3,
        source: "CS 2201 / 3250",
        year: 2023,
        blurb:
          "Taught me trade-offs, thinking outside the box, and creative engineering. I try to do exercises with DSA (LeetCode, pseudocode problems) consistently to keep up my cognitive chops.",
      },
      {
        id: "discrete",
        abbr: "DM",
        label: "Discrete Mathematics",
        tier: 2,
        source: "CS 2212",
        year: 2023,
        blurb:
          "Essential for bridging the gap between my math framework and CS theory. Particularly helpful when working out game logic and understanding trade-offs for state machine architecture within game projects.",
      },
      {
        id: "patterns",
        abbr: "DP",
        label: "Design Patterns",
        tier: 2,
        source: "CS 3251",
        year: 2024,
        blurb:
          "Ultimately the most paramount fundamental in the age of AI and changed the way I thought about code forever. Understanding patterns of problems and architectures is the most important for engineering nowadays when code can be generated at the hit of a button. Imperative to the most important job of a software engineer nowadays → making a codebase healthy, and moreso, keeping it healthy.",
      },
      {
        id: "arch",
        abbr: "CA",
        label: "Computer Architecture",
        tier: 2,
        source: "CS 2281",
        year: 2023,
        blurb:
          "Caches, pipelines, and the cost of a branch. Fundamental for understanding how to write performant code, and how to reason about the performance of code. It is also essential for understanding how to write code that is efficient in terms of memory and CPU usage.",
      },
    ],
  },
  {
    id: "frontend",
    name: "Front End",
    skills: [
      {
        id: "html",
        abbr: "HT",
        label: "HTML",
        tier: 3,
        source: "3+ projects",
        year: 2022,
        blurb:
          "Semantics first. Most of the accessibility I get for free on this site comes from picking the right element instead of styling a div into one.",
      },
      {
        id: "css",
        abbr: "CS",
        label: "CSS",
        tier: 3,
        source: "Solitaire Saga",
        year: 2022,
        blurb:
          "I moved this portfolio's responsive behaviour out of JavaScript and into media queries, which removed an entire class of hydration bug on a static export.",
      },
      {
        id: "js",
        abbr: "JS",
        label: "JavaScript",
        tier: 3,
        source: "3+ projects",
        year: 2022,
        blurb:
          "The glue on every web project I have shipped. Phaser's game loop and React's render cycle disagree about who owns state, and reconciling them is a JavaScript problem.",
      },
      {
        id: "typescript",
        abbr: "TS",
        label: "TypeScript",
        tier: 3,
        source: "Faunology / Triton",
        year: 2024,
        blurb:
          "Working on a production dashboard used daily by schools, types were the thing that let me change shared code without breaking someone else's screen.",
      },
      {
        id: "react",
        abbr: "RE",
        label: "React",
        tier: 3,
        source: "3+ projects",
        year: 2023,
        blurb:
          "Built a permission-gated audit diff viewer and a time-format setting at Triton, both live in production. Faunology pushed me further: rendering a Phaser canvas inside a React tree without either fighting the other.",
      },
      {
        id: "nextjs",
        abbr: "NX",
        label: "Next.js",
        tier: 2,
        source: "This site / Triton",
        year: 2025,
        blurb:
          "Chosen here specifically for its static export, since GitHub Pages has no server. Every architectural decision on this site falls out of that one constraint.",
      },
      {
        id: "tailwind",
        abbr: "TW",
        label: "Tailwind CSS",
        tier: 2,
        source: "Triton Sensors",
        year: 2025,
        blurb:
          "What finally made a shared design language stick across a team. One token set in one file beats four developers each inventing a shade of grey.",
      },
      {
        id: "websockets",
        abbr: "WS",
        label: "WebSockets / Real-time",
        tier: 1,
        source: "Triton Sensors",
        year: 2026,
        blurb:
          "Sensor readings that matter are the ones you get now, not on the next poll. Still learning where a live connection earns its reconnection logic and where polling was fine.",
      },
    ],
  },
  {
    id: "backend",
    name: "Back End",
    skills: [
      {
        id: "node",
        abbr: "NO",
        label: "Node.js",
        tier: 3,
        source: "Solitaire Saga",
        year: 2023,
        blurb:
          "The REST API behind Solitaire Saga runs here — game logic, move validation, and JWT auth, all server-side so the client cannot cheat itself a win.",
      },
      {
        id: "express",
        abbr: "EX",
        label: "Express",
        tier: 3,
        source: "Solitaire Saga",
        year: 2023,
        blurb:
          "Thin routing over the game logic. Kept it deliberately boring so the interesting decisions stayed in one place instead of leaking into middleware.",
      },
      {
        id: "rest",
        abbr: "RA",
        label: "RESTful APIs",
        tier: 3,
        source: "CS 4288 / Solitaire",
        year: 2023,
        blurb:
          "Consuming Django REST endpoints at Triton and designing my own for Solitaire taught me both halves — the contract reads very differently from each side.",
      },
      {
        id: "sql",
        abbr: "SQ",
        label: "SQL / Postgres",
        tier: 3,
        source: "CS 3265 / Triton",
        year: 2024,
        blurb:
          "Modelling a Letterboxd-style review platform meant the schema had to answer questions I had not thought of yet. Normalisation stopped being an exercise and became a design tool.",
      },
      {
        id: "mongo",
        abbr: "MG",
        label: "MongoDB",
        tier: 3,
        source: "Solitaire Saga",
        year: 2023,
        blurb:
          "Card state, move history, and user profiles. The schema was shaped around one requirement: reload a session mid-game and have it be exactly where you left it.",
      },
      {
        id: "django",
        abbr: "DJ",
        label: "Django + DRF",
        tier: 2,
        source: "Triton Sensors",
        year: 2026,
        blurb:
          "The API half of every feature I shipped at Triton. Serializers are where I learned that a permission check belongs next to the data, not next to the button.",
      },
      {
        id: "redis",
        abbr: "RD",
        label: "Redis / Celery",
        tier: 2,
        source: "Solitaire / Triton",
        year: 2024,
        blurb:
          "Caching for repeated game-state reads, then queued work for the scheduled alert reports at Triton. Both cases were the same lesson: get slow work off the request.",
      },
      {
        id: "aws",
        abbr: "AW",
        label: "AWS",
        tier: 2,
        source: "Solitaire / Triton",
        year: 2023,
        blurb:
          "EC2, Certificate Manager, and Route 53 behind Solitaire Saga. Deploying it myself is what turned HTTPS and DNS from words into things I can debug.",
      },
      {
        id: "firebase",
        abbr: "FB",
        label: "Firebase",
        tier: 2,
        source: "Faunology",
        year: 2024,
        blurb:
          "Auth, Firestore save state, and hosting for 25+ players. The right call for a team that needed to ship a game, not run a backend.",
      },
      {
        id: "docker",
        abbr: "DK",
        label: "Docker",
        tier: 2,
        source: "MovieBoxd",
        year: 2024,
        blurb:
          "Comfortable running and composing containers; still sharpening how I build images I would want someone else to depend on.",
      },
      {
        id: "testing",
        abbr: "QA",
        label: "Testing / QA",
        tier: 2,
        source: "Faunology",
        year: 2024,
        blurb:
          "Shipping to real players changed what I test. I write cases for the states a user can get stuck in, not for the paths I already know work.",
      },
    ],
  },
  {
    id: "systems",
    name: "Systems / Game Design",
    skills: [
      {
        id: "assembly",
        abbr: "RV",
        label: "Assembly (RISC-V)",
        tier: 1,
        source: "CS 2281",
        year: 2023,
        blurb:
          "Enough to read compiler output and understand what a line of C actually costs. I do not write it by choice, but I am glad I can follow it.",
      },
      {
        id: "c",
        abbr: "C",
        label: "C",
        tier: 2,
        source: "CS 2281 / 3281",
        year: 2023,
        blurb:
          "Where memory stopped being an abstraction. Everything I understand about why Rust's ownership rules exist, I understand because I first wrote the bugs they prevent.",
      },
      {
        id: "cpp",
        abbr: "C+",
        label: "C++",
        tier: 2,
        source: "Pixel Lance / UE5 course",
        year: 2024,
        blurb:
          "A team pixel-art game on a custom engine. C++ is where I learned that engine code and game code want completely different things from a language.",
      },
      {
        id: "csharp",
        abbr: "C#",
        label: "C#",
        tier: 2,
        source: "Pixel Lance",
        year: 2024,
        blurb:
          "My scripting layer for engine work. Fast to iterate in, which matters more than raw speed when you are still deciding what the game is.",
      },
      {
        id: "godot",
        abbr: "GD",
        label: "Godot Engine",
        tier: 2,
        source: "Pixel Lance",
        year: 2024,
        blurb:
          "Its scene tree is the clearest composition model I have used in an engine, and it quietly changed how I structure React components too.",
      },
      {
        id: "os",
        abbr: "OS",
        label: "Operating Systems",
        tier: 1,
        source: "CS 3281",
        year: 2025,
        blurb:
          "Scheduling, virtual memory, and the syscall boundary. Mostly it has made me suspicious of any explanation of a performance problem that stops at my own code.",
      },
      {
        id: "engine",
        abbr: "GE",
        label: "Game Engine Architecture",
        tier: 2,
        source: "CS 3281 / RPG engine",
        year: 2025,
        blurb:
          "Chose an Entity-Component System over an inheritance hierarchy because behaviour on a 2.5D RPG entity changes constantly and its identity does not. Cache locality was the second reason, not the first.",
      },
      {
        id: "unreal",
        abbr: "U5",
        label: "Unreal Engine 5",
        tier: 1,
        source: "Udemy UE5 course",
        year: 2025,
        blurb:
          "Studied for its rendering and asset pipeline rather than to ship in. Useful as a reference for what a mature engine decides on your behalf.",
      },
      {
        id: "rust",
        abbr: "RS",
        label: "Rust",
        tier: 1,
        source: "Independent study / RPG engine",
        year: 2025,
        blurb:
          "Building an ECS from scratch with wgpu and winit. The borrow checker is doing the reasoning I used to have to hold in my head across a C++ codebase.",
      },
    ],
  },
  {
    id: "academic",
    name: "Academic / Research",
    skills: [
      {
        id: "multicalc",
        abbr: "MC",
        label: "Multivariable Calculus",
        tier: 2,
        source: "MATH 2300",
        year: 2022,
        blurb:
          "Gradients stopped being notation the first time I watched one drive backpropagation on a network I had written myself.",
      },
      {
        id: "linalg",
        abbr: "LA",
        label: "Linear Algebra",
        tier: 2,
        source: "MATH 2600",
        year: 2023,
        blurb:
          "The actual substrate of everything in this lane. Tensor shape errors stopped being guesswork once I could picture what the operation was doing.",
      },
      {
        id: "probstats",
        abbr: "PS",
        label: "Probability & Statistics",
        tier: 2,
        source: "MATH 2820",
        year: 2023,
        blurb:
          "Needed for the psych half of the research as much as the modelling half — running human studies means being honest about what your sample can support.",
      },
      {
        id: "numbertheory",
        abbr: "NT",
        label: "Number Theory",
        tier: 2,
        source: "The Switch",
        year: 2024,
        blurb:
          "Picked up for the cryptography behind The Switch. Modular arithmetic is one of the few places where the maths and the implementation look like each other.",
      },
      {
        id: "r",
        abbr: "R",
        label: "R",
        tier: 1,
        source: "Cognitive Studies",
        year: 2023,
        blurb:
          "Used where the lab's existing analysis scripts lived. Comfortable following and extending them; Python is where I start from scratch.",
      },
      {
        id: "data",
        abbr: "DA",
        label: "Data Analysis",
        tier: 2,
        source: "Cognitive Studies",
        year: 2023,
        blurb:
          "Turning on-site study results into something a PI can act on. The analysis is easy; deciding what the result actually licenses you to claim is not.",
      },
      {
        id: "python",
        abbr: "PY",
        label: "Python",
        tier: 2,
        source: "CLIPS",
        year: 2022,
        blurb:
          "The language my research lives in. Model, run, plot, revise — the loop is short enough that the language stays out of the way of the question.",
      },
      {
        id: "cogpsych",
        abbr: "CP",
        label: "Cognitive Psychology",
        tier: 2,
        source: "Cognitive Studies",
        year: 2022,
        blurb:
          "Half my degree, and the half that decides how I build interfaces. If a screen makes someone hold three things in working memory, that is a design bug.",
      },
      {
        id: "pytorch",
        abbr: "PT",
        label: "PyTorch",
        tier: 2,
        source: "CLIPS",
        year: 2024,
        blurb:
          "A contrastive-learning experiment on paired inputs. Most of the work was in the data pipeline and the loss, which is usually where it is.",
      },
      {
        id: "nn",
        abbr: "NN",
        label: "Neural Networks",
        tier: 2,
        source: "PSY 3650 / CLIPS",
        year: 2024,
        blurb:
          "Built to test a cognitive theory, not to hit a benchmark. The interesting result is where the model fails the same way a child does.",
      },
    ],
  },
  {
    id: "design",
    name: "UI / UX",
    skills: [
      {
        id: "figma",
        abbr: "FG",
        label: "Figma / HCI",
        tier: 2,
        source: "Faunology",
        year: 2024,
        blurb:
          "Where I argue with a layout before it costs anything to change. Building the component set first is what keeps the built version consistent.",
      },
      {
        id: "heuristics",
        abbr: "HE",
        label: "Heuristic Evaluation",
        tier: 2,
        source: "CS 4376",
        year: 2024,
        blurb:
          "A structured way to find the problems you have gone blind to on your own project. Cheaper than a user study and catches a surprising amount.",
      },
      {
        id: "usability",
        abbr: "UT",
        label: "Usability Testing",
        tier: 2,
        source: "All projects",
        year: 2024,
        blurb:
          "Watching 25 Faunology players hit the same confusing moment is worth more than any amount of internal debate about whether it was confusing.",
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
