import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Fraunces,
  Geist,
  Geist_Mono,
  Silkscreen,
} from "next/font/google";
import SiteNav from "@/components/SiteNav";
import "./globals.css";

/**
 * Every font variable is declared on <html>, not <body>, because the @theme
 * tokens that consume them (--font-sans, --font-pixel, …) are computed at
 * :root. A var() that resolves to nothing there invalidates the whole
 * declaration and silently drops the page to a serif fallback.
 *
 * Silkscreen and Cormorant belong to one section each, so they skip preload —
 * their files are fetched only on the routes that actually render them.
 */
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

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: false,
});

const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  fraunces.variable,
  silkscreen.variable,
  cormorant.variable,
].join(" ");

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
    <html lang="en" className={fontVariables}>
      <body className="antialiased">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
