"use client";

import { useState } from "react";

interface Show {
    title: string;
    role: string;
    organization: string;
    description?: string;
    year?: string;

}

const shows: Show[] = [
    {
        title: "Falsettos",
        role: "Music Director, Rehearsal Accompanist, Piano/Conductor",
        organization: "Vanderbilt Immersion",
        year: "Advisor: Dr. Ibby Cizmar"
    },
    {
        title: "Into the Woods",
        role: "Music Director, Rehearsal Accompanist, Piano",
        organization: "Vanderbilt Off-Broadway",
        year: "Director: Alyssa Newson"
    },
    {
        title: "Natasha, Pierre, and the Great Comet of 1812",
        role: "Music Director, Rehearsal Accompanist, Piano/Conductor/QLab DJ",
        organization: "Vanderbilt Off-Broadway",
        year: "Director: Isabella Lough"
    },
    {
        title: "Chicago",
        role: "Music Director, Rehearsal Accompanist, Piano/Conductor",
        organization: "Vanderbilt Off-Broadway",
        year: "Director: Ethan Blevins"
    },
    {
        title: "Company",
        role: "Rehearsal Accompanist, Piano",
        organization: "Vanderbilt Off-Broadway",
        year: "Director: Kate Mason"
    },
    {
        title: "The Last Five Years",
        role: "Rehearsal Accompanist, Piano",
        organization: "Vanderbilt Immersion",
        year: "Project Lead: Will Henke"
    },
    {
        title: "An American Soldier's Tale: Vonnegut and Stravinsky",
        role: "Staging Director",
        organization: "Vanderbilt Immersion",
        year: "Project Lead: Paxson Amy"
    },
    {
        title: "Heathers: the Musical",
        role: "Stage Manager",
        organization: "Vanderbilt Off-Broadway",
        year: "Director: Jakob Heiser"
    },
    {
        title: "Violet",
        role: "Assistant Stage Manager",
        organization: "Vanderbilt Off-Broadway",
        year: "Director: Brianna Stewart"
    }
];

const training = [
    {
        category: "Classical Training",
        description: "Studied under Dr. Jama Reagan at the Blair School of Music"
    },
    {
        category: "Collaborative Piano",
        description: "Trained under Dr. Jennifer McGuire at the Blair School of Music"
    },
    {
        category: "Teaching Experience",
        description: "Music Teaching Artist for Mean Girls Jr., Columbus Children's Theatre"
    },
    {
        category: "Professional Work",
        description: "Accompanist for Musical Theatre Intensive Program, Cincinnati Conservatory of Music, Preparatory Program"
    }
];

type Section = "about" | "shows" | "training";

export default function Musical() {
    const [activeSection, setActiveSection] = useState<Section>("shows");

    return (
        <main className="min-h-screen bg-[#CAC4CE] p-6">
            {/* BIG ELEGANT HEADER */}
            <div className="text-center mb-12">
                <h1
                    className="text-7xl mb-4 text-[#3E7A62]"
                    style={{
                        fontFamily: "Georgia, serif",
                        fontWeight: "300",
                        letterSpacing: "0.2em",
                    }}
                >
                    MUSICAL
                </h1>
                <div className="h-1 w-96 mx-auto bg-gradient-to-r from-transparent via-[#87BFA5] to-transparent" />
            </div>

            <div className="max-w-5xl mx-auto">
                {/* Subheader */}
                <div className="text-center mb-12">
                    <p
                        className="text-lg text-gray-700 tracking-widest"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        PIANIST • MUSIC DIRECTOR • CONDUCTOR
                    </p>
                </div>

                {/* Section Toggle */}
                <div className="flex justify-center gap-8 mb-10">
                    {(["about", "shows", "training"] as Section[]).map((section) => (
                        <button
                            key={section}
                            onClick={() => setActiveSection(section)}
                            className="relative pb-2 transition-all duration-300"
                            style={{
                                fontFamily: "Georgia, serif",
                                fontSize: "1.125rem",
                                letterSpacing: "0.1em",
                                color: activeSection === section ? "#3E7A62" : "#9ca3af",
                            }}
                        >
                            {section.toUpperCase()}
                            {activeSection === section && (
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#87BFA5]"
                                    style={{
                                        boxShadow: "0 0 8px rgba(62, 122, 98, 0.5)"
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* About Section */}
                {activeSection === "about" && (
                    <div className="max-w-3xl mx-auto space-y-6">
                        <p className="text-gray-800 leading-relaxed">
                            Spencer Bowden is a Nashville-based music director, pianist, arranger, and
                            vocal coach. Born in Cincinnati, he fell in love with music at the age of
                            five when he started piano lessons, and never stopped his musical journey
                            since. Spencer has a diverse musical background, being trained classically
                            but also playing keys in his local high school rock band Stonefish,
                            performing both covers and originals. At Vanderbilt University, he studied
                            classical piano with Jama Reagan and collaborative piano with Jennifer
                            McGuire, and music directed countless performances.
                        </p>
                        <p className="text-gray-800 leading-relaxed">
                            He approaches all of his sessions, gigs, lessons, and projects with earnest
                            enthusiasm, quick adaptivity, and creativity to ensure all collaborators can
                            get the thoroughness and aptitude required to nail the performance. He has a
                            passion for musical theatre and musical storytelling, both classics and new
                            works. He is probably sight reading a vocal score as we speak.
                        </p>
                        <div className="pt-4">
                            <h3 className="text-sm uppercase tracking-widest text-[#87BFA5] mb-3">
                                Other notable engagements
                            </h3>
                            <ul className="space-y-2 text-gray-800 leading-relaxed">
                                <li>CCM Accompanist</li>
                                <li>Wyoming High School Percussion Instructor and Arranger</li>
                                <li>Columbus Children&rsquo;s Theatre Music Instructor</li>
                                <li>Accompanist for many productions at Vanderbilt University</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Shows Section */}
                {activeSection === "shows" && (
                    <div className="space-y-6">
                        <h2
                            className="text-2xl text-center mb-8 text-[#3E7A62]"
                            style={{
                                fontFamily: "Georgia, serif",
                                fontWeight: "300",
                                letterSpacing: "0.1em",
                            }}
                        >
                            Productions & Performances
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {shows.map((show, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#87BFA5]"
                                >
                                    <h3
                                        className="text-xl mb-2 text-[#3E7A62]"
                                        style={{
                                            fontFamily: "Georgia, serif",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        {show.title}
                                    </h3>
                                    <p
                                        className="text-sm text-[#87BFA5] mb-2 font-semibold"
                                        style={{ fontFamily: "system-ui" }}
                                    >
                                        {show.role}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {show.organization}
                                    </p>
                                    {show.year && (
                                        <p className="text-xs text-gray-500 mt-2 italic">
                                            {show.year}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Training Section */}
                {activeSection === "training" && (
                    <div className="space-y-8">
                        <h2
                            className="text-2xl text-center mb-8 text-[#3E7A62]"
                            style={{
                                fontFamily: "Georgia, serif",
                                fontWeight: "300",
                                letterSpacing: "0.1em",
                            }}
                        >
                            Education & Training
                        </h2>

                        <div className="space-y-6">
                            {training.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-sm shadow-lg border-t-2 border-[#87BFA5]"
                                >
                                    <h3
                                        className="text-lg mb-3 text-[#3E7A62]"
                                        style={{
                                            fontFamily: "Georgia, serif",
                                            fontWeight: "500",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        {item.category}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="my-10">
                            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                        </div>

                        {/* Skills Summary */}
                        <div className="bg-gradient-to-br from-[#F4F1E8] to-white p-8 rounded-sm shadow-lg">
                            <h3
                                className="text-xl text-center mb-6 text-[#3E7A62]"
                                style={{
                                    fontFamily: "Georgia, serif",
                                    letterSpacing: "0.1em",
                                }}
                            >
                                Technical Proficiencies
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                {["Piano", "Music Direction", "QLab", "Conducting"].map((skill) => (
                                    <div key={skill} className="p-4">
                                        <div className="mb-2 flex justify-center" aria-hidden="true">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#87BFA5"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx="8" cy="18" r="3" />
                                                <line x1="11" y1="18" x2="11" y2="5" />
                                                <path d="M11 5c3 0 6 1 6 4" />
                                            </svg>
                                        </div>
                                        <p
                                            className="text-sm text-gray-700"
                                            style={{ fontFamily: "Georgia, serif" }}
                                        >
                                            {skill}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}