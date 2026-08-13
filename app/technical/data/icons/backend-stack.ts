import type { AnimatedPxlKitData } from "@pxlkit/core";
import { TECH_PALETTE } from "./palette";

/**
 * Terminal, database, gear — the Back End lane, in light blue against the dark
 * ground.
 *
 * The three parts are drawn separately and composited, because each one animates
 * on its own clock: the prompt blinks, the database lights one band at a time as
 * a write travels down it, and the gear alternates between orthogonal and
 * diagonal teeth, which is as close to a 45° turn as six pixels get. Flattening
 * them into four hand-drawn frames would have meant redrawing all three every
 * time one of them changed.
 *
 * Column 9 is kept empty down the whole grid. The terminal owns columns 1–8 and
 * the database and gear share 10–15, so the ground runs between them as a
 * one-pixel gutter and each part reads as its own object without needing an
 * outline drawn around it. They stay distinct by silhouette and by value: the
 * light blue `C` carries every edge, `B` fills the solid masses, and `W` is
 * reserved for whatever is currently doing something.
 */
const { C, B, W } = TECH_PALETTE;

const SIZE = 16;
const BLANK = "................";

/** Later parts win any pixel they claim. */
function overlay(...parts: string[][]): string[] {
  return Array.from({ length: SIZE }, (_, row) =>
    Array.from({ length: SIZE }, (_, column) => {
      for (let part = parts.length - 1; part >= 0; part -= 1) {
        const character = parts[part][row][column];
        if (character !== ".") return character;
      }
      return ".";
    }).join(""),
  );
}

/** Columns 1–8. The prompt is always lit; only the cursor blinks. */
const terminal = (cursor: boolean): string[] => [
  BLANK,
  BLANK,
  BLANK,
  ".CCCCCCCC.......",
  ".C......C.......",
  ".CW.....C.......",
  cursor ? ".C.W.WW.C......." : ".C.W....C.......",
  ".CW.....C.......",
  ".C......C.......",
  ".C......C.......",
  ".C......C.......",
  ".C......C.......",
  ".CCCCCCCC.......",
  BLANK,
  BLANK,
  BLANK,
];

/** Columns 10–15, three stacked bands. `lit` is the one taking the write. */
const database = (lit: 0 | 1 | 2): string[] => {
  const band = (index: number) =>
    `..........C${index === lit ? "WWWW" : "BBBB"}C`;
  return [
    "...........CCCC.",
    band(0),
    "...........CCCC.",
    band(1),
    "...........CCCC.",
    band(2),
    "...........CCCC.",
    ...Array<string>(9).fill(BLANK),
  ];
};

/**
 * Rows 9–14, columns 10–15. The ring never moves; only the teeth do, jumping
 * from the top and bottom to the corners. Six pixels cannot rotate, but two
 * positions read as a turn.
 */
const gear = (turned: boolean): string[] => {
  const teeth = turned ? "..........C....C" : "............CC..";
  return [
    ...Array<string>(9).fill(BLANK),
    teeth,
    "..........CCCCCC",
    "..........CC..CC",
    "..........CC..CC",
    "..........CCCCCC",
    teeth,
    BLANK,
  ];
};

/**
 * Six frames. The write walks the database once per cycle while the cursor and
 * the gear run at half that, so the three never land in step and the icon does
 * not read as one thing flashing.
 */
const steps: Array<[boolean, 0 | 1 | 2, boolean]> = [
  [true, 0, false],
  [false, 1, true],
  [true, 2, false],
  [false, 0, true],
  [true, 1, false],
  [false, 2, true],
];

export const BackendStack: AnimatedPxlKitData = {
  name: "backend-stack",
  size: 16,
  category: "parallax",
  tags: ["backend", "database", "terminal", "gear", "server"],
  author: "spencer-bowden",
  palette: { C, B, W },
  frameDuration: 320,
  trigger: "loop",
  loop: true,
  frames: steps.map(([cursor, lit, turned]) => ({
    grid: overlay(terminal(cursor), database(lit), gear(turned)),
  })),
};
