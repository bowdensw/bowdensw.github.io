export type Project = {
  name: string;
  category: "Web" | "Game" | "Tool" | "AI/ML";
  description: string;
  techStack: string[];
  githubLink: string;
};

export const projects: Project[] = [
  {
    name: "Spencer Solitaire Saga",
    category: "Web",
    description:
      "Interactive web-based solitaire game with smooth animations, drag-and-drop mechanics, and classic Klondike gameplay.",
    techStack: ["React", "JavaScript", "Node.js", "MongoDB", "Redis"],
    githubLink: "https://github.com/bowdensw/spencer-solitaire-saga",
  },
  {
    name: "Faunology",
    category: "Game",
    description:
      "A browser-based cozy tower defense game bridging game loop logic with in-game/out-of-game component-based UI.",
    techStack: ["React", "Vite", "Phaser.js", "Firebase"],
    githubLink: "https://github.com/bowdensw",
  },
  {
    name: "Pixel Lance",
    category: "Game",
    description:
      "Team project for CS3891 final — a pixel art game built with C++ and a custom game engine.",
    techStack: ["C++", "Godot Engine", "C#"],
    githubLink: "https://github.com/bowdensw/Pixel-Lance",
  },
  {
    name: "2.5D RPG Game Engine",
    category: "Game",
    description:
      "Entity-Component System architecture built from scratch in Rust, targeting 2.5D adventure-RPG games.",
    techStack: ["Rust", "wgpu", "winit"],
    githubLink: "https://github.com/bowdensw",
  },
  {
    name: "MovieBoxd DBMS",
    category: "Tool",
    description:
      "A SQL playground for a movie review social platform, à la Letterboxd.",
    techStack: ["SQL", "Postgres"],
    githubLink: "https://github.com/bowdensw",
  },
  {
    name: "CLIPS",
    category: "AI/ML",
    description:
      "Python-built neural network for a contrastive learning experiment (Vanderbilt Summer Research 2025).",
    techStack: ["Python", "PyTorch"],
    githubLink: "https://github.com/bowdensw/clips-siameseNN",
  },
];
