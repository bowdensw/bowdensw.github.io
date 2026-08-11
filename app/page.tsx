export default function Home() {
    return (
        <main className="min-h-screen bg-[#CAC4CE] flex items-center justify-center px-6 py-10">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* LEFT SIDE — TEXT */}
                <section>
                    <h1 className="text-6xl font-bold text-[#242038] mb-4">
                        Hi, I’m <span className="text-[#242038] text-shadow-2xs text-shadow-amber-950">Spencer Bowden!</span>
                    </h1>

                    <p className="text-lg text-gray-700 leading-relaxed mb-10">
                        Software Engineer, Music Director, driven academic, lifelong advocate of learning and curiosity. I build systems, tools, and experiences that make complex things feel not only simple and seamless, but fun. Currently studying Cognitive Studies and Computer Science at Vanderbilt University with a minor in Music.
                    </p>

                    {/* LINK BUTTONS WITH HOVER ANIMATIONS */}
                    <div className="flex gap-6 mt-6">

                        {/* TECHNICAL */}
                        <div className="relative group">
                            <a
                                href="/technical"
                                className="px-5 py-3 rounded-md bg-[#8D86C9] text-black font-medium
                hover:bg-[#9067C6] hover:text-white transition"
                            >
                                Technical
                            </a>

                            {/* Hover Animation — Code Icon */}
                            <img
                                src="/images/computer_hover_icon.png"
                                alt="code icon"
                                className="
                                pointer-events-none
                                absolute left-1/2 -translate-x-1/2 w-18 mt-6
                                opacity-0 translate-y-4
                                transition-all duration-700 ease-out
                                group-hover:opacity-100
                                group-hover:translate-y-0
                                group-hover:animate-floatSlow
                                drop-shadow-[0_0_6px_#9067C6]
                                group-hover:drop-shadow-[0_0_14px_#9067C6]
  "
                            />
                        </div>

                        {/* MUSICAL */}
                        <div className="relative group">
                            <a
                                href="/musical"
                                className="px-5 py-3 rounded-md bg-[#87BFA5] text-black font-medium
                hover:bg-[#6FAF8F] hover:text-white transition"
                            >
                                Musical
                            </a>

                            {/* Hover Animation — Music Icon */}
                            <img
                                src="/images/piano_hover_icon.png"
                                alt="music icon"
                                className="
                                pointer-events-none
                                absolute left-1/2 -translate-x-1/2 w-38 mt-6
                                opacity-0 translate-y-4
                                transition-all duration-700 ease-out
                                group-hover:opacity-100
                                group-hover:translate-y-0
                                group-hover:animate-floatSlow
                                drop-shadow-[0_0_6px_ #6FAF8F]
                                group-hover:drop-shadow-[0_0_12px_#6FAF8F]
                                "
                            />
                        </div>

                        {/* RESUME */}
                        <div className="relative group">
                            <a
                                href="/resume"
                                className="px-5 py-3 rounded-md bg-[#FFD76A] text-black font-medium
                hover:bg-[#FFBF00] hover:text-white transition"
                            >
                                Résumé
                            </a>

                            {/* Hover Animation — Book Icon */}
                            <img
                                src="/images/book_hover_icon.png"
                                alt="book icon"
                                className=" pointer-events-none
                                absolute left-1/2 -translate-x-1/2 mt-3 w-24 opacity-0
                                translate-y-4
                                transition-all duration-700 ease-out
                                group-hover:opacity-100
                                group-hover:translate-y-0
                                group-hover:animate-floatSlow
                                drop-shadow-[0_0_6px_#FFBF00]
                                group-hover:drop-shadow-[0_0_14px_#FFBF00]"
                            />
                        </div>
                        {/* CONTACT */}
                        <div className="relative group">
                            <a
                                href="/contact"
                                className="group px-5 py-3 rounded-md bg-[#B56C8C]
                                text-[#242038] font-medium
                                hover:bg-[#9E5677] hover:text-white transition"
                            >
                                Contact
                            </a>
                            <img
                                src="/images/phone_hover_icon.png"
                                alt="phone icon"
                                className="
                                pointer-events-none
                                absolute left-1/2 -translate-x-1/2 mt-4 w-48
                                opacity-0 translate-y-3
                                transition-all duration-700 ease-out
                                group-hover:opacity-100
                                group-hover:translate-y-0
                                group-hover:animate-floatSlow
                                drop-shadow-[0_0_6px_#9E5677]
                                group-hover:drop-shadow-[0_0_14px_#9E5677]
                                "
                            />
                        </div>

                    </div>
                </section>

                {/* RIGHT — PHOTO */}
                <section className="relative flex justify-center">
                    <img
                        src="/images/me.jpg"
                        alt="Spencer Bowden"
                        className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-white"
                    />
                </section>

            </div>
        </main>
    );
}
