"use client";

import { useState } from "react";
import SkillNode from "./SkillNode";
import { skills as skillsData } from "./skills";
import { connections } from "./connections";

export default function SkillTree() {
    const [skills, setSkills] = useState(skillsData);

    const unlockNode = (id: string) => {
        setSkills((prev) =>
            prev.map((node) =>
                node.id === id ? { ...node, unlocked: !node.unlocked } : node
            )
        );
    };

    return (

        <div className="w-full h-screen bg-[#242038] overflow-auto">

            {/* Legend */}
            <div className="fixed top-8 right-8 bg-[#242038] border-2 border-[#8D86C9] rounded-lg p-4 shadow-xl z-50">
                <h3 className="text-white font-bold text-lg mb-3">Skill Categories</h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border-3" style={{ borderColor: "#FFBF00", borderWidth: "3px", boxShadow: "0 0 10px #FFBF0080" }}></div>
                        <span className="text-white text-sm">Foundations</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border-3" style={{ borderColor: "#F4A261", borderWidth: "3px", boxShadow: "0 0 10px #F4A26180" }}></div>
                        <span className="text-white text-sm">Hub</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border-3" style={{ borderColor: "#9B5DE5", borderWidth: "3px", boxShadow: "0 0 10px #9B5DE580" }}></div>
                        <span className="text-white text-sm">Academic</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border-3" style={{ borderColor: "#4361EE", borderWidth: "3px", boxShadow: "0 0 10px #4361EE80" }}></div>
                        <span className="text-white text-sm">Systems/Game Design</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border-3" style={{ borderColor: "#3ECF8E", borderWidth: "3px", boxShadow: "0 0 10px #3ECF8E80" }}></div>
                        <span className="text-white text-sm">Web Dev</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border-3" style={{ borderColor: "#FF6B6B", borderWidth: "3px", boxShadow: "0 0 10px #FF6B6B80" }}></div>
                        <span className="text-white text-sm">UI/UX</span>
                    </div>
                </div>
            </div>

            <div
                className="relative w-full h-[1500px] mx-auto rounded-xl overflow-hidden"
                style={{
                    background: `
            radial-gradient(circle at 15% 20%, rgba(155, 93, 229, 0.25) 0%, transparent 35%),
            radial-gradient(circle at 85% 15%, rgba(67, 97, 238, 0.2) 0%, transparent 40%),
            radial-gradient(circle at 70% 80%, rgba(62, 207, 142, 0.18) 0%, transparent 45%),
            radial-gradient(circle at 30% 75%, rgba(255, 107, 107, 0.15) 0%, transparent 38%),
            radial-gradient(circle at 50% 50%, rgba(244, 162, 97, 0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 40% 10%, rgba(255, 255, 255, 0.03) 0%, transparent 30%),
            radial-gradient(ellipse at 80% 90%, rgba(255, 255, 255, 0.02) 0%, transparent 25%),
            linear-gradient(135deg, #0f0a1a 0%, #1a1626 25%, #242038 50%, #2d2545 75%, #1e1b2e 100%)
          `,
                    boxShadow: `
            inset 0 0 100px rgba(155, 93, 229, 0.1),
            inset 0 0 50px rgba(67, 97, 238, 0.08),
            0 0 50px rgba(0, 0, 0, 0.5)
          `,
                }}
            >
                {/* Title inside the tree container */}
                <div className="absolute top-8 left-1/8 -translate-x-1/2 z-40 text-left">
                    <h1
                        className="text-5xl font-bold text-white tracking-wider"
                        style={{
                            textShadow: `
                0 0 20px rgba(155, 93, 229, 0.8),
                0 0 40px rgba(67, 97, 238, 0.6),
                0 0 60px rgba(155, 93, 229, 0.4),
                2px 2px 4px rgba(0, 0, 0, 0.8)
              `,
                        }}
                    >
                        SKILL TREE
                    </h1>
                    <div
                        className="h-1 w-48 mt-2 rounded-full mx-auto"
                        style={{
                            background: 'linear-gradient(90deg, rgba(155, 93, 229, 0.8) 0%, rgba(67, 97, 238, 0.6) 50%, transparent 100%)',
                            boxShadow: '0 0 10px rgba(155, 93, 229, 0.6)',
                        }}
                    />
                </div>
                {/* SVG for connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    {connections.map(([a, b], index) => {
                        const nodeA = skills.find((s) => s.id === a);
                        const nodeB = skills.find((s) => s.id === b);

                        if (!nodeA || !nodeB) {
                            console.warn(`Connection not found: ${a} -> ${b}`);
                            return null;
                        }

                        // Fade connections if either node is locked
                        const bothUnlocked = nodeA.unlocked && nodeB.unlocked;
                        const color = bothUnlocked ? "#9067C6" : "#4a5568";
                        const opacity = bothUnlocked ? 0.8 : 0.3;

                        return (
                            <line
                                key={`${a}-${b}-${index}`}
                                x1={nodeA.x}
                                y1={nodeA.y}
                                x2={nodeB.x}
                                y2={nodeB.y}
                                stroke={color}
                                strokeWidth="3"
                                opacity={opacity}
                                filter={bothUnlocked ? "url(#glow)" : "none"}
                                strokeLinecap="round"
                            />
                        );
                    })}
                </svg>

                {/* Render nodes */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                    {skills.map((skill) => (
                        <SkillNode key={skill.id} data={skill} onClick={unlockNode} />
                    ))}
                </div>
            </div>
        </div>
    );
}