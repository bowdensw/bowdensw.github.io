import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import SiteNav from "@/components/SiteNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bowdensw.github.io"),
  title: {
    default: "Spencer Bowden",
    template: "%s · Spencer Bowden",
  },
  description:
    "Software engineer and music director. Vanderbilt University, Cognitive Studies and Computer Science with a minor in Music.",
  openGraph: {
    title: "Spencer Bowden",
    description: "Software engineer and music director.",
    url: "https://bowdensw.github.io",
    siteName: "Spencer Bowden",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
      >
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
