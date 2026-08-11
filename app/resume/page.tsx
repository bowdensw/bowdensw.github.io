"use client";

export default function Resume() {
    return (
        <main className="min-h-screen bg-[#CAC4CE] p-6">
            {/* BIG HEADER */}
            <div className="text-center mb-12">
                <h1
                    className="text-7xl font-bold text-[#242038] tracking-widest mb-4"
                    style={{
                        fontFamily: "monospace",
                        textShadow: `
        6px 6px 0px #FFD76A,
        8px 8px 0px rgba(0,0,0,0.2)
      `,
                        letterSpacing: "0.2em",
                    }}
                >
                    RÉSUMÉ
                </h1>

                <div
                    className="h-2 w-96 mx-auto"
                    style={{
                        background:
                            "repeating-linear-gradient(90deg, #FFD76A 0px, #FFD76A 16px, transparent 16px, transparent 24px)",
                        boxShadow: "0 4px 0px rgba(0,0,0,0.2)",
                    }}
                />
            </div>


            <div className="max-w-4xl mx-auto">
                {/* Download Button */}
                <div className="text-center mb-10">
                    <a
                        href="/resume.pdf"
                        download
                        className="inline-flex items-center gap-2 px-6 py-3
    bg-[#FFD76A] text-[#242038]
    rounded-sm shadow-lg
    hover:bg-[#FFBF00] hover:text-white
    transition-all duration-300"
                        style={{
                            fontFamily: "Georgia, serif",
                            letterSpacing: "0.1em",
                        }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        DOWNLOAD PDF
                    </a>
                </div>

                {/* Resume Content */}
                    <div className="mt-12 border-4 border-[#FFD76A] shadow-xl">
                        <iframe
                            src="/resume.pdf"
                            className="w-full h-[1100px]"
                            title="Spencer Bowden Resume"
                        />
                    </div>
            </div>
        </main>
    );
}