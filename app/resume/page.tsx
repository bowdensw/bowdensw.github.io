import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ResumeSwitch from "./components/ResumeSwitch";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Spencer Bowden — a technical résumé and a musical résumé. Education, skills, projects, credits, experience, and leadership.",
};

export default function ResumePage() {
  return (
    <PageShell width="narrow">
      <ResumeSwitch />
    </PageShell>
  );
}
