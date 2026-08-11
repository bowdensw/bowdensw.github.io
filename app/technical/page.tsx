"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import PixelSprite, { type PixelLayer } from "@/components/PixelSprite";
import { TabList, TabPanel, type Tab } from "@/components/Tabs";
import About from "./components/About";
import Projects from "./components/Projects";
import SkillTree from "./components/SkillTree";
import { MAGIC_ORB, RETRO_TV } from "./data/pixel";

const tabs: Tab[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
];

const tags = ["Full Stack", "Game Design", "Software"];

export default function TechnicalPage() {
  const [tab, setTab] = useState(tabs[0].id);

  return (
    <PageShell width="xwide">
      <header className="mb-10 flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <Frame
          layers={MAGIC_ORB}
          label="Pixel-art magic orb"
          className="hidden md:block"
        />

        <div className="flex flex-col items-center text-center">
          <h1 className="mb-3 font-pixel text-display tracking-[0.05em] [text-shadow:4px_4px_0_var(--color-tech)]">
            TECHNICAL
          </h1>
          <span
            aria-hidden="true"
            className="mb-3.5 h-0.75 w-55 bg-[repeating-linear-gradient(90deg,var(--color-tech)_0_10px,transparent_10px_16px)]"
          />
          <ul className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-sm border border-tech px-2.5 py-1 font-mono text-[11.5px] font-bold tracking-wide text-tech"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <Frame
          layers={RETRO_TV}
          label="Pixel-art retro television"
          className="order-first md:order-0"
        />
      </header>

      <TabList
        items={tabs}
        value={tab}
        onChange={setTab}
        skin="pixel"
        label="Technical sections"
      />

      <div className="mt-8">
        <TabPanel id="about" value={tab}>
          <About />
        </TabPanel>
        <TabPanel id="projects" value={tab}>
          <Projects />
        </TabPanel>
        <TabPanel id="skills" value={tab}>
          <SkillTree />
        </TabPanel>
      </div>
    </PageShell>
  );
}

function Frame({
  layers,
  label,
  className,
}: {
  layers: PixelLayer[];
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`w-24 shrink-0 rounded-md border-2 border-ink-soft bg-ink-deep p-2.5 md:w-32 ${className ?? ""}`}
    >
      <PixelSprite layers={layers} label={label} parallax />
    </div>
  );
}
