import type { Metadata } from "next";
import {
  Atkinson_Hyperlegible_Mono,
  Atkinson_Hyperlegible_Next,
  Cormorant_Garamond,
  Fraunces,
  Press_Start_2P,
} from "next/font/google";
import SiteNav from "@/components/SiteNav";
import "./globals.css";

/**
 * Every font variable is declared on <html>, not <body>, because the @theme
 * tokens that consume them (--font-sans, --font-pixel, …) are computed at
 * :root. A var() that resolves to nothing there invalidates the whole
 * declaration and silently drops the page to a serif fallback.
 *
 * Press Start 2P and Cormorant belong to one section each, so they skip preload —
 * their files are fetched only on the routes that actually render them.
 *
 * The body and mono faces are Atkinson Hyperlegible, the Braille Institute's
 * low-vision family: I/l/1 and 0/O are drawn apart, bowls are asymmetric, and
 * apertures stay open. Half of Spencer's degree is Cognitive Studies and this
 * site's guardrails are already about legibility, so the face states a position
 * the way the previous `create-next-app` default never did.
 *
 * Both carry `adjustFontFallback: false` and a fallback stack of their own.
 * Next builds its metric-matched fallback @font-face from a precalculated table
 * (server/capsize-font-metrics.json), and these two families are newer than it —
 * it holds `atkinsonHyperlegible` but neither `Next` nor `Mono`. The lookup
 * throws, Next logs "Failed to find font override values" on every compile, and
 * returns undefined. Opting out changes nothing about the emitted CSS; it only
 * stops asking for a fallback that cannot be built. Drop these two lines once
 * the families reach the table.
 */
const bodySans = Atkinson_Hyperlegible_Next({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

const bodyMono = Atkinson_Hyperlegible_Mono({
  variable: "--font-body-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "monospace"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
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
  bodySans.variable,
  bodyMono.variable,
  fraunces.variable,
  pressStart.variable,
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
