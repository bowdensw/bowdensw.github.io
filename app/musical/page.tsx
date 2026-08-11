"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import { TabList, TabPanel, type Tab } from "@/components/Tabs";
import About from "./components/About";
import Mainstage from "./components/Mainstage";
import Shows from "./components/Shows";

const tabs: Tab[] = [
  { id: "about", label: "About" },
  { id: "shows", label: "Shows" },
  { id: "mainstage", label: "Mainstage Files" },
];

export default function MusicalPage() {
  const [tab, setTab] = useState(tabs[0].id);

  return (
    <PageShell width="medium">
      <header className="mb-7 text-center">
        <h1 className="inline-block border-b-2 border-music pb-1 font-score text-display font-semibold text-music-deep italic">
          Musical
        </h1>
        <p className="mt-1.5 text-[13px] tracking-[0.12em] text-ink-soft uppercase">
          Pianist · Music Director · Conductor
        </p>
      </header>

      <TabList
        items={tabs}
        value={tab}
        onChange={setTab}
        skin="underline"
        label="Musical sections"
      />

      <div className="mt-10">
        <TabPanel id="about" value={tab}>
          <About />
        </TabPanel>
        <TabPanel id="shows" value={tab}>
          <Shows />
        </TabPanel>
        <TabPanel id="mainstage" value={tab}>
          <Mainstage />
        </TabPanel>
      </div>
    </PageShell>
  );
}
