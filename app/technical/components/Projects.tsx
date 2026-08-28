import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <ul className="grid gap-5 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      {projects.map((project) => (
        <li
          key={project.name}
          className="relative flex flex-col overflow-hidden rounded-lg border-2 border-ink-soft bg-ink"
        >
          <p className="absolute top-2.5 right-2.5 z-2 rounded-sm border border-ink/25 bg-tech-bright px-2.5 py-1 font-mono text-[10.5px] font-bold tracking-wide text-ink shadow-card">
            {project.category}
          </p>

          {/* No screenshots yet; the gradient is the placeholder, on purpose. */}
          <div
            aria-hidden="true"
            className="h-40 bg-linear-135 from-ink to-tech/25"
          />

          <div className="flex flex-1 flex-col p-4.5">
            <h3 className="mb-2 font-mono font-bold">{project.name}</h3>
            <p className="mb-3.5 flex-1 text-[13.5px]/[1.6] text-paper/80">
              {project.description}
            </p>

            <ul className="mb-4 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-sm border border-tech-bright/45 px-2 py-0.5 font-mono text-[11px] text-tech-bright"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                tone: "tech",
                size: "sm",
                className: "self-start font-mono",
              })}
            >
              View on GitHub
              <ArrowRight aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
