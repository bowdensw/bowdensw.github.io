"use client";

import { useState } from "react";

interface SkillData {
    id: string;
    label: string;
    category: string;
    x: number;
    y: number;
    unlocked: boolean;
    img?: string; // Optional image path
}

interface SkillNodeProps {
    data: SkillData;
    onClick: (id: string) => void;
}

export default function SkillNode({ data, onClick }: SkillNodeProps) {
    const [isHovered, setIsHovered] = useState(false);

    const categoryColors: Record<string, string> = {
        foundation: "#FFBF00",
        hub: "#F4A261",
        academic: "#9B5DE5",
        systems: "#4361EE",
        web: "#3ECF8E",
        design: "#FF6B6B",
    };

    const color = categoryColors[data.category] || "#8D86C9";

    return (
        <div
            onClick={() => onClick(data.id)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ left: data.x, top: data.y }}
            className={`
        absolute flex flex-col items-center
        -translate-x-1/2 -translate-y-1/2
        cursor-pointer transition-all duration-300
        ${data.unlocked ? "opacity-100 scale-100" : "opacity-40 scale-90"}
        ${isHovered ? "scale-110" : ""}
      `}
        >
            {/* Main Sphere */}
            <div
                style={{
                    borderColor: data.unlocked ? color : "#6b7280",
                    boxShadow: data.unlocked ? `0 0 20px ${color}80` : "none",
                }}
                className={`
          w-20 h-20 rounded-full border-4 
          flex items-center justify-center
          bg-[#242038]
          transition-all duration-300
          relative
        `}
            >
                {/* Icon or Label */}
                {data.img ? (
                    <img
                        src={data.img}
                        alt={data.label}
                        className={`w-12 h-12 object-contain ${data.unlocked ? "" : "opacity-50 grayscale"}`}
                    />
                ) : (
                    <span className={`text-xs font-bold text-center px-2 ${data.unlocked ? "text-white" : "text-gray-500"}`}>
            {data.label}
          </span>
                )}
            </div>

            {/* Hover Tooltip */}
            {isHovered && (
                <div
                    className="absolute top-24 bg-[#242038] border-2 px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-50"
                    style={{
                        borderColor: color,
                        boxShadow: `0 0 15px ${color}60`,
                    }}
                >
          <span className="text-white font-semibold text-sm">
            {data.label}
          </span>
                </div>
            )}
        </div>
    );
}