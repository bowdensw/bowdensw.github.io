export const profile = {
  name: "Spencer Bowden",
  pronouns: "he/him/his",
  github: "https://github.com/bowdensw",
  githubLabel: "github.com/bowdensw",
  email: "spencer.w.bowden@vanderbilt.edu",
  phone: "(513) 503-9631",
  phoneHref: "tel:+15135039631",
};

export const education = {
  school: "Vanderbilt University, Peabody College — Nashville, TN",
  degree:
    "Bachelor of Science: Cognitive Studies, Computer Science, Minor in Music (Piano Performance Concentration)",
  honors: "GPA: 3.88 · Dean's List, all semesters attended",
  dates: "2022 – 2026",
  coursework:
    "Data Structures, Algorithms, Design Patterns, Game Engine Architecture, Discrete Math, Neural Networks, DBMS, Linear Algebra, Differential Equations, Probability & Statistics, Web Development/Systems, UI/UX",
};

/** A group is either one line of skills or a set of labelled sub-lines. */
export type SkillGroup = {
  label: string;
  items: string | { sub: string; text: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: "C++, JavaScript/TypeScript, Python, Java, Rust",
  },
  {
    label: "Full-Stack",
    items: [
      { sub: "Front-End", text: "React, JavaScript, TypeScript" },
      { sub: "Back-End", text: "Django, Express.js/Node.js, Firebase" },
      { sub: "Databases", text: "SQL (Postgres), MongoDB" },
    ],
  },
  {
    label: "Game Design",
    items: "C++, Unreal Engine 5, Godot Engine, C#, Rust",
  },
  {
    label: "DevOps / Tools",
    items: "Git/GitHub, AWS, Linux/Ubuntu, Docker, CI/CD, Figma",
  },
];

export const projects = [
  {
    title: "2.5D RPG Game Engine",
    stack: "Rust, wgpu, winit — In Development",
    bullets: [
      "Designing and implementing an Entity-Component System (ECS) architecture from scratch in Rust, targeting 2.5D adventure-RPG games.",
      "Integrating wgpu for cross-platform GPU-accelerated rendering and winit for windowed application lifecycle and input handling.",
      "Engineered with data-oriented design principles to prioritize cache efficiency and runtime performance.",
    ],
  },
  {
    title: "Faunology",
    stack: "React, Vite, Phaser.js, Firebase",
    bullets: [
      "Led full-stack integration on a collaborative team, owning end-to-end application architecture while teammates owned game logic and art.",
      "Developed a browser-based cozy tower defense game integrating Phaser.js within a React/Vite architecture, bridging game loop logic with in-game/out-of-game component-based UI.",
      "Implemented Firebase Auth, Firestore-backed save state persistence, and Firebase Hosting; shipped to 25+ active users.",
    ],
  },
  {
    title: "Spencer Solitaire Saga",
    stack: "React, Node.js, MongoDB, AWS (EC2, Route 53)",
    bullets: [
      "Built a full-stack solitaire app with a React front-end and Node.js REST API handling game logic, move validation, and JWT-based authentication.",
      "Persisted card states, move history, game state, and user profile data in MongoDB; designed schema to support full game session reloads.",
      "Deployed to AWS EC2 with HTTPS configured through AWS Certificate Manager and custom domain routing via Route 53.",
    ],
  },
];

export const experience = [
  {
    org: "Triton Sensors — Remote, Harrisburg, PA",
    role: "Full-Stack Summer Development Intern",
    dates: "2026",
    note: null,
    bullets: [
      "Built full-stack features on Triton's cloud dashboard (React/TypeScript + Django REST API) for a smart-sensor safety platform deployed in schools.",
      "Shipped multiple end-to-end projects, including a 12/24-hr time-format setting for clients, a permission-gated audit diff viewer for account changes, a scheduled alert report generator sent to emails, and SVG-based navigation loading animations.",
      "All features are live in production and used daily by real customers.",
    ],
  },
  {
    org: "Vanderbilt University, Peabody College — Nashville, TN",
    role: "Undergraduate Research Assistant",
    dates: "2025 – 2026",
    note: "Computational Cognitive Development Lab — PI: Dr. Deon Benton; VU Summer Research Program 2025",
    bullets: [
      "Crafted my own research regarding contrastive learning found in children's cognition through on-site psych studies and neural networks.",
      "Constructed neural networks in Python and Tcl/Tk that model learning to further understand computational nuances behind cognition.",
    ],
  },
  {
    org: "Vanderbilt University, School of Engineering — Nashville, TN",
    role: "Undergraduate Teaching Assistant",
    dates: "2024 – 2026",
    note: "CS1101: Programming and Problem Solving · CS2201: Program Design and Data Structures",
    bullets: [
      "Hosted weekly office hours for student tutoring on Computer Science course material and general Q&A; assessed exams and Java programming assignments.",
    ],
  },
];

export const leadership = {
  org: "Vanderbilt Off-Broadway (VOB) — Nashville, TN",
  roles: [
    {
      title: "President",
      dates: "2025 – 2026",
      note: null,
      bullets: [
        "Led 12 executive board members to supervise the daily operations and successful musical productions of the 100+ member organization.",
        "Oversaw officer selections, interviews, and artistic team training.",
        "Maintained VOB's constitution and campus presence by coordinating performances and ensuring annual registration.",
      ],
    },
    {
      title: "Music Director",
      dates: "2024 – 2026",
      note: "Chicago (2024) · Natasha, Pierre, and the Great Comet of 1812 (2024–25) · Into the Woods (2025–26) · Falsettos (2026)",
      bullets: [
        "Led vocal rehearsals and office hours with show casts, focusing on intermediate musical theatre vocal technique and good vocal health.",
        "Arranged and led pit orchestra rehearsals with 10+ instrumentalists, and played and conducted during performances.",
        "Collaborated with the artistic team to ensure the show's musical facets fit the director's vision, composer's intentions, and production's goals.",
      ],
    },
  ],
};
