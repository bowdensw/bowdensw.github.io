"use client";

import { useState } from "react";

interface Attribute {
    name: string;
    value: number; // 0-100
    description: string;
    icon: string;
    category: "combat" | "magic" | "utility" | "social";
}

// Your attributes - customize these!
const attributes: Attribute[] = [
    {
        name: "Problem Solving",
        value: 95,
        description: "Breaking down complex problems into elegant solutions",
        icon: "🧩",
        category: "combat"
    },
    {
        name: "Algorithm Design",
        value: 88,
        description: "Crafting efficient algorithms and data structures",
        icon: "⚔️",
        category: "combat"
    },
    {
        name: "Machine Learning",
        value: 85,
        description: "Neural networks, PyTorch, and deep learning architectures",
        icon: "🧠",
        category: "magic"
    },
    {
        name: "Systems Programming",
        value: 82,
        description: "Low-level C/C++, memory management, and performance optimization",
        icon: "⚙️",
        category: "combat"
    },
    {
        name: "Full-Stack Development",
        value: 90,
        description: "React, TypeScript, Node.js, and modern web technologies",
        icon: "🌐",
        category: "magic"
    },
    {
        name: "Game Development",
        value: 78,
        description: "Godot, Unreal, and custom game engines",
        icon: "🎮",
        category: "utility"
    },
    {
        name: "UI/UX Design",
        value: 75,
        description: "Creating intuitive and visually appealing interfaces",
        icon: "🎨",
        category: "utility"
    },
    {
        name: "Research & Analysis",
        value: 87,
        description: "Data analysis, statistical modeling, and cognitive science",
        icon: "📊",
        category: "magic"
    },
    {
        name: "Collaboration",
        value: 92,
        description: "Teamwork, git workflows, and clear communication",
        icon: "🤝",
        category: "social"
    },
    {
        name: "Learning Speed",
        value: 93,
        description: "Rapidly mastering new technologies and frameworks",
        icon: "📚",
        category: "utility"
    },
];

export default function Attributes() {
    const [hoveredAttr, setHoveredAttr] = useState<string | null>(null);

    const categoryColors: Record<string, string> = {
        combat: "#FF6B6B",    // Red - offensive/core skills
        magic: "#9B5DE5",     // Purple - advanced/technical
        utility: "#3ECF8E",   // Green - tools/support
        social: "#F4A261",    // Orange - soft skills
    };

    const categoryLabels: Record<string, string> = {
        combat: "CORE SKILLS",
        magic: "ADVANCED TECHNIQUES",
        utility: "TOOLS & CRAFTS",
        social: "FELLOWSHIP",
    };

    // Group by category
    const groupedAttributes = attributes.reduce((acc, attr) => {
        if (!acc[attr.category]) acc[attr.category] = [];
        acc[attr.category].push(attr);
        return acc;
    }, {} as Record<string, Attribute[]>);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-8 text-center">
                <h2
                    className="text-4xl font-bold mb-2 text-[#242038]"
                    style={{
                        textShadow: "4px 4px 0px rgba(0,0,0,0.3)",
                        fontFamily: "monospace",
                        letterSpacing: "0.1em",
                    }}
                >
                    ◆ CHARACTER STATS ◆
                </h2>
                <p className="text-gray-600" style={{ fontFamily: "monospace" }}>
                    ▸ Level up through experience and dedication ◂
                </p>
            </div>

            {/* Stats Grid */}
            <div className="space-y-8">
                {Object.entries(groupedAttributes).map(([category, attrs]) => (
                    <div key={category}>
                        {/* Category Header */}
                        <div
                            className="flex items-center gap-3 mb-4 pb-2"
                            style={{
                                borderBottom: `4px solid ${categoryColors[category]}`,
                                borderImage: `repeating-linear-gradient(90deg, ${categoryColors[category]} 0px, ${categoryColors[category]} 8px, transparent 8px, transparent 12px) 1`,
                            }}
                        >
                            <div
                                className="w-4 h-4"
                                style={{
                                    backgroundColor: categoryColors[category],
                                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                                }}
                            />
                            <h3
                                className="text-lg font-bold tracking-wider"
                                style={{
                                    color: categoryColors[category],
                                    fontFamily: "monospace",
                                    textShadow: "2px 2px 0px rgba(0,0,0,0.2)",
                                }}
                            >
                                ▣ {categoryLabels[category]}
                            </h3>
                        </div>

                        {/* Attributes in this category */}
                        <div className="space-y-4">
                            {attrs.map((attr) => (
                                <div
                                    key={attr.name}
                                    onMouseEnter={() => setHoveredAttr(attr.name)}
                                    onMouseLeave={() => setHoveredAttr(null)}
                                    className="relative transition-all duration-300"
                                    style={{
                                        transform: hoveredAttr === attr.name ? "translateX(8px)" : "translateX(0)",
                                    }}
                                >
                                    {/* Stat Name and Value */}
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{attr.icon}</span>
                                            <span
                                                className="font-semibold transition-colors duration-300"
                                                style={{
                                                    color: hoveredAttr === attr.name ? categoryColors[category] : "#242038",
                                                    fontFamily: "monospace",
                                                    fontSize: "1rem",
                                                }}
                                            >
                        {hoveredAttr === attr.name ? "▶ " : "▸ "}{attr.name}
                      </span>
                                        </div>
                                        <span
                                            className="font-bold text-xl tabular-nums"
                                            style={{
                                                color: categoryColors[category],
                                                textShadow: hoveredAttr === attr.name ? `0 0 10px ${categoryColors[category]}80, 2px 2px 0px rgba(0,0,0,0.3)` : "2px 2px 0px rgba(0,0,0,0.2)",
                                                fontFamily: "monospace",
                                            }}
                                        >
                      {attr.value}
                    </span>
                                    </div>

                                    {/* Stat Bar - Pixelated */}
                                    <div
                                        className="relative h-8 bg-gray-200 overflow-hidden"
                                        style={{
                                            border: "3px solid #242038",
                                            boxShadow: "4px 4px 0px rgba(0,0,0,0.2)",
                                            imageRendering: "pixelated",
                                        }}
                                    >
                                        <div
                                            className="h-full transition-all duration-700 ease-out relative"
                                            style={{
                                                width: `${attr.value}%`,
                                                backgroundColor: categoryColors[category],
                                                boxShadow: hoveredAttr === attr.name
                                                    ? `inset 0 0 0 2px rgba(255,255,255,0.4)`
                                                    : "none",
                                                backgroundImage: hoveredAttr === attr.name
                                                    ? `repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)`
                                                    : `repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.1) 8px, rgba(0,0,0,0.1) 10px)`,
                                            }}
                                        />

                                        {/* Pixel tick marks */}
                                        <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
                                            {[25, 50, 75].map((tick) => (
                                                <div
                                                    key={tick}
                                                    className="w-1 h-full bg-[#242038] opacity-40"
                                                    style={{ marginLeft: `${tick}%` }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Description (shown on hover) */}
                                    {hoveredAttr === attr.name && (
                                        <div
                                            className="mt-2 text-sm text-gray-700 pl-8 transition-opacity duration-300"
                                            style={{
                                                fontFamily: "monospace",
                                                borderLeft: `3px solid ${categoryColors[category]}`,
                                                paddingLeft: "12px",
                                            }}
                                        >
                                            » {attr.description}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Stats - Pixelated boxes */}
            <div className="mt-10 pt-6" style={{ borderTop: "4px dashed #242038" }}>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: "Total Skills", value: attributes.length, color: "#242038" },
                        { label: "Average Level", value: Math.round(attributes.reduce((sum, attr) => sum + attr.value, 0) / attributes.length), color: "#9B5DE5" },
                        { label: "Mastered (90+)", value: attributes.filter(a => a.value >= 90).length, color: "#3ECF8E" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="text-center p-4 bg-white"
                            style={{
                                border: "3px solid #242038",
                                boxShadow: "4px 4px 0px rgba(0,0,0,0.2)",
                            }}
                        >
                            <div
                                className="text-3xl font-bold mb-1"
                                style={{
                                    color: stat.color,
                                    fontFamily: "monospace",
                                    textShadow: "2px 2px 0px rgba(0,0,0,0.2)",
                                }}
                            >
                                {stat.value}
                            </div>
                            <div
                                className="text-xs text-gray-600 uppercase tracking-wide"
                                style={{ fontFamily: "monospace" }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}