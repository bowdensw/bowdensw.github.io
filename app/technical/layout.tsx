import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical",
  description:
    "Software engineering work — projects, skills, and how they were used.",
};

export default function TechnicalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Technical is the one dark room in the house, and its background lives here
  // rather than on any page. 3.5rem is <SiteNav>'s height.
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-ink text-on-dark">
      {children}
    </div>
  );
}
