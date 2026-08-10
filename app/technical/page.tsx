"use client";

import {useState} from "react";
import Link from "next/link";
import SkillTree from "@/app/technical/components/SkillTree";
import Projects from "@/app/technical/components/Projects";


export default function Technical() {
    // Track which tab is active
    const [activeTab, setActiveTab] = useState("skillTree");

    // Map tabs → sprite animations
    const spriteMap = {
        skillTree: "/sprites/littleguy.gif",

    };

    return (
        <main className="min-h-screen bg-[#CAC6CE] p-6">

            {/* BACK BUTTON */}
            <div className="mb-6">
                <Link
                    href="/"
                    className="text-[#242038] font-semibold hover:text-[#9067C6] transition"
                >
                    ← Back to Home
                </Link>
            </div>

            {/* BIG PIXEL HEADER */}
            <div className="text-center mb-8">
                <h1
                    className="text-7xl font-bold text-[#242038] tracking-widest mb-4"
                    style={{
                        fontFamily: "monospace",
                        textShadow: `
                            6px 6px 0px #9067C6,
                            8px 8px 0px rgba(0,0,0,0.2)
                        `,
                        letterSpacing: "0.2em",
                    }}
                >
                    TECHNICAL
                </h1>
                <div
                    className="h-2 w-96 mx-auto"
                    style={{
                        background: "repeating-linear-gradient(90deg, #9067C6 0px, #9067C6 16px, transparent 16px, transparent 24px)",
                        boxShadow: "0 4px 0px rgba(0,0,0,0.2)",
                    }}
                />
            </div>

            {/* NAVBAR TABS AND SPRITE */}
            <div className="flex justify-between items-center mb-6">
                <nav className="flex gap-4">
                    {["skillTree", "projects", "about"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md capitalize font-medium transition cursor-pointer
                                ${activeTab === tab
                                ? "bg-[#9067C6] text-white shadow-md"
                                : "bg-white text-[#242038] hover:bg-[#FFD76A]"}
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
                {/* SPRITE */}
                <div className="flex justify-center w-1/2">
                    <img
                        src={spriteMap.skillTree}
                        alt="Spencer sprite animation"
                        className="w-32 h-32 pixelated drop-shadow-[0_0_10px_#9067C6]"
                    />
                </div>
            </div>

            {/* CONDITIONAL LAYOUT - Full width for SkillTree, Grid for others */}
            {activeTab === "skillTree" ? (
                <div className="bg-black p-3 rounded-xl shadow-md min-h-[800px] text-[#242038]">
                    <SkillTree />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* LEFT COLUMN — CONTENT */}
                    <section>
                        <div className="bg-white p-6 rounded-xl shadow-md min-h-[250px] text-[#242038]">
                            {activeTab === "projects" && (
                                <Projects />
                            )}
                            {activeTab === "about" && (
                                <div>
                                    <h2 className="text-2xl font-semibold mb-6">About</h2>
                                    <div className="space-y-4">
                                        <p className="text-gray-800 leading-relaxed">I’ve always been a problem solver, opening the Sunday newspaper
                                        as a kid and working my way through the puzzles with my grandparents during
                                        holidays, but it wasn’t until my dad showed me his copy of Final Fantasy XIII
                                        that I realized how powerful problem-solving can be. I discovered software could
                                        create experiences, even entire worlds, for clients, end users, and companies
                                        alike. </p>
                                        <p className="text-gray-800 leading-relaxed">Starting out as a Mathematics major in college, I enjoyed the problem solving but
                                        deeply desired to see these solutions in action. In other words, I wanted people
                                        to be able to use what I built and ultimately benefit from it, so I picked up
                                        where my CS minor classes gave me a jump start and raced to the finish to get a
                                        double degree in Cognitive Studies and Computer Science (with a minor in
                                        Music). </p>
                                        <p className="text-gray-800 leading-relaxed">As an engineer, I focus on building scalable, meaningful, and maintainable
                                        systems. I’ve applied this mindset through web development and game design,
                                        pairing creative problem-solving with a disciplined approach to clean, reusable,
                                        component-based code. My projects are shaped by usability, cognitive, and
                                        heuristic evaluations to ensure intuitive, user-centered experiences. Through
                                        research at Vanderbilt University, I’ve also applied neural network modeling to
                                        translate cognitive theory into computational systems. Whether building a
                                        product or conducting research, my goal is the same: to create technology that
                                        adapts to how people think, learn, and interact—and to continually evolve
                                        alongside it by actively learning and integrating new tools, frameworks, and
                                        technologies as they emerge.</p>

                                    </div>
                                </div>
                                )}
                        </div>
                    </section>

                    {/* RIGHT COLUMN — ADDITIONAL CONTENT (optional) */}
                    <section className="flex justify-center items-start">
                        <div className="text-[#242038]">
                            {/* You can add additional content here if needed */}
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
}