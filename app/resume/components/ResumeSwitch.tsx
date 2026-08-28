"use client";

import { useState } from "react";
import { TabList, TabPanel, type Tab } from "@/components/Tabs";
import MusicalResume from "./MusicalResume";
import TechnicalResume from "./TechnicalResume";

/**
 * /resume holds two documents. The switch sits above both of them rather than
 * inside either, because it is choosing which résumé you are reading. Each
 * résumé brings its own <h1> and contact row, so the name below the switch
 * belongs to the document rather than to the page.
 *
 * State only, with no route and no query param. The two résumés are one page
 * in the nav, and a deep link to a tab would need a second entry there.
 */
const tabs: Tab[] = [
  { id: "technical", label: "Technical" },
  { id: "musical", label: "Musical" },
];

export default function ResumeSwitch() {
  const [tab, setTab] = useState(tabs[0].id);

  return (
    <>
      <TabList
        items={tabs}
        value={tab}
        onChange={setTab}
        skin="segmented"
        label="Which résumé"
      />

      <div className="mt-8">
        <TabPanel id="technical" value={tab}>
          <TechnicalResume />
        </TabPanel>
        <TabPanel id="musical" value={tab}>
          <MusicalResume />
        </TabPanel>
      </div>
    </>
  );
}
