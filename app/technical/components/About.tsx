const paragraphs = [
  "I've always been a problem solver, opening the Sunday newspaper as a kid and working my way through the puzzles with my grandparents during holidays, but it wasn't until my dad showed me his copy of Final Fantasy XIII that I realized how powerful problem-solving can be. I discovered software could create experiences, even entire worlds, for clients, end users, and companies alike.",
  "Starting out as a Mathematics major in college, I enjoyed the problem solving but deeply desired to see these solutions in action. In other words, I wanted people to be able to use what I built and ultimately benefit from it, so I picked up where my CS minor classes gave me a jump start and raced to the finish to get a double degree in Cognitive Studies and Computer Science (with a minor in Music).",
  "As an engineer, I focus on building scalable, meaningful, and maintainable systems. I've applied this mindset through web development and game design, pairing creative problem-solving with a disciplined approach to clean, reusable, component-based code. My projects are shaped by usability, cognitive, and heuristic evaluations to ensure intuitive, user-centered experiences. Through research at Vanderbilt University, I've also applied neural network modeling to translate cognitive theory into computational systems. Whether building a product or conducting research, my goal is the same: to create technology that adapts to how people think, learn, and interact — and to continually evolve alongside it by actively learning and integrating new tools, frameworks, and technologies as they emerge.",
];

export default function About() {
  return (
    <div className="rounded-lg border border-ink-soft bg-ink-deep px-5 py-6 sm:px-12 sm:py-10">
      <div className="mx-auto max-w-[680px]">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="mb-5 text-base/[1.8] text-on-dark last:mb-0"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
