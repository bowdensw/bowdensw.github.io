import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

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
  return <div className={cormorant.variable}>{children}</div>;
}
