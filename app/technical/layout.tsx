import type { Metadata } from "next";
import { Silkscreen } from "next/font/google";

// Scoped here rather than in the root layout so Silkscreen only downloads on
// /technical. Same reasoning for Cormorant on /musical.
const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

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
  return <div className={silkscreen.variable}>{children}</div>;
}
