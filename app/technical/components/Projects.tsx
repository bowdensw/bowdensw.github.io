"use client";

import { useState } from "react";
import { getTechIcon } from "./techIcons";

interface Project {
    id: string;
    name: string;
    description: string;
    image: string;
    techStack: string[];
    githubLink: string;
    category?: string;
}

// Sample projects - replace with your actual projects
const projects: Project[] = [
    {
        id: "1",
        name: "Spencer Solitaire Saga",
        description: "Interactive web-based solitaire game with smooth animations, drag-and-drop mechanics, and classic Klondike gameplay.",
        image: "/projects/solitaire.png",
        techStack: ["React", "JavaScript", "Node.js", "MongoDB", "RESTful APIs", "Redis"],
        githubLink: "https://github.com/bowdensw/spencer-solitaire-saga",
        category: "Web"
    },
    {
        id: "2",
        name: "Pixel Lance",
        description: "Team project for CS3891 Final - a pixel art game built with C++ and custom game engine.",
        image: "/projects/pixellance.png",
        techStack: ["C++", "Godot Engine", "C#"],
        githubLink: "https://github.com/bowdensw/Pixel-Lance",
        category: "Game"
    },
    {
        id: "3",
        name: "Portfolio Website",
        description: "Personal portfolio showcasing technical skills with FFX-inspired skill tree and interactive elements.",
        image: "/projects/portfolio.png",
        techStack: ["React", "TypeScript"],
        githubLink: "https://github.com/yourusername/portfolio",
        category: "Web"
    },
    {
        id: "4",
        name: "MovieBoxd DBMS",
        description: "A SQL playground for a movie review social platform (a la LetterBoxd)",
        image: "/projects/dbms.png",
        techStack: ["SQL"],
        githubLink: "https://github.com/yourusername/portfolio",
        category: "Tool"
    },
    {
        id: "5",
        name: "CLIPS",
        description: "Python-built Neural Network for contrastive learning experiment (Vanderbilt Summer Research 2025)",
        image: "/projects/siamese.png",
        techStack: ["Python", "PyTorch"],
        githubLink: "https://github.com/bowdensw/clips-siameseNN",
        category: "AI/ML"
    },
    // Add more projects as needed
];

export default function Projects() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const categoryColors: Record<string, string> = {
        "AI/ML": "#9B5DE5",
        "Game": "#4361EE",
        "Web": "#3ECF8E",
        "System": "#F4A261",
        "Tool": "#FF6B6B",
    };

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-6 text-[#242038] pixel-text">
                PROJECTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        onMouseEnter={() => setHoveredId(project.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="relative bg-white rounded-lg overflow-hidden transition-all duration-300 cursor-pointer group"
                        style={{
                            border: `3px solid ${hoveredId === project.id ? categoryColors[project.category || "Web"] : "#242038"}`,
                            boxShadow: hoveredId === project.id
                                ? `0 0 20px ${categoryColors[project.category || "Web"]}80, 0 8px 16px rgba(0,0,0,0.2)`
                                : "0 4px 6px rgba(0,0,0,0.1)",
                            transform: hoveredId === project.id ? "translateY(-8px)" : "translateY(0)",
                        }}
                    >
                        {/* Category Badge */}
                        {project.category && (
                            <div
                                className="absolute top-2 right-2 z-10 px-3 py-1 rounded text-white text-xs font-bold"
                                style={{
                                    backgroundColor: categoryColors[project.category],
                                    boxShadow: `0 0 10px ${categoryColors[project.category]}80`,
                                }}
                            >
                                {project.category}
                            </div>
                        )}

                        {/* Screenshot */}
                        <div className="relative h-48 bg-gradient-to-br from-[#242038] to-[#9067C6] overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                onError={(e) => {
                                    // Fallback if image doesn't load
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            {/* Pixel overlay effect on hover */}
                            {hoveredId === project.id && (
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(255,255,255,0.03) 2px,
                      rgba(255,255,255,0.03) 4px
                    )`,
                                    }}
                                />
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            {/* Project Name */}
                            <h3
                                className="text-xl font-bold mb-2 transition-colors duration-300"
                                style={{
                                    color: hoveredId === project.id ? categoryColors[project.category || "Web"] : "#242038",
                                }}
                            >
                                {project.name}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                                {project.description}
                            </p>

                            {/* Tech Stack with Icons */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack.map((tech, index) => {
                                    const iconPath = getTechIcon(tech);
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-1.5 px-2 py-1 rounded transition-all duration-300"
                                            style={{
                                                backgroundColor: hoveredId === project.id ? `${categoryColors[project.category || "Web"]}20` : "#f3f4f6",
                                                border: `2px solid ${hoveredId === project.id ? categoryColors[project.category || "Web"] : "transparent"}`,
                                            }}
                                        >
                                            {iconPath && (
                                                <img
                                                    src={iconPath}
                                                    alt={tech}
                                                    className="w-4 h-4 object-contain"
                                                />
                                            )}
                                            <span
                                                className="text-xs font-semibold"
                                                style={{
                                                    color: hoveredId === project.id ? categoryColors[project.category || "Web"] : "#242038",
                                                }}
                                            >
                        {tech}
                      </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* GitHub Link */}
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold text-sm transition-all duration-300"
                                style={{
                                    backgroundColor: hoveredId === project.id ? categoryColors[project.category || "Web"] : "#242038",
                                    color: "white",
                                    boxShadow: hoveredId === project.id ? `0 0 15px ${categoryColors[project.category || "Web"]}60` : "none",
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                View on GitHub
                            </a>
                        </div>

                        {/* 8-bit corner decorations */}
                        <div
                            className="absolute top-0 left-0 w-4 h-4 transition-opacity duration-300"
                            style={{
                                backgroundColor: categoryColors[project.category || "Web"],
                                opacity: hoveredId === project.id ? 1 : 0,
                            }}
                        />
                        <div
                            className="absolute bottom-0 right-0 w-4 h-4 transition-opacity duration-300"
                            style={{
                                backgroundColor: categoryColors[project.category || "Web"],
                                opacity: hoveredId === project.id ? 1 : 0,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}