import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Musical",
  description:
    "Music direction, piano, and arranging — productions, training, and MainStage files.",
};

export default function MusicalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 3.5rem is <SiteNav>'s height.
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-paper-warm">{children}</div>
  );
}
