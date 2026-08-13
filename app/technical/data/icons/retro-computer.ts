import type { ParallaxPxlKitData } from "@pxlkit/core";
import { animated, still } from "./layer";
import { TECH_PALETTE } from "./palette";

/**
 * A desk workstation, built to sit opposite the gamepad on the same five-layer
 * stack PxlKit's own parallax icons use, with the same depth ladder
 * (3 / 2 / 0 / -1 / -2) and the same idea of a lit screen behind a static bezel.
 * Drawn here rather than imported because none of the 226 icons PxlKit ships is
 * a computer.
 *
 * Reading back to front: a cool ambient glow behind the monitor, the power
 * cable, the monitor and keyboard themselves, four lines of type scrolling up
 * the screen, and a specular drifting across the glass.
 *
 * Light falls from the top left, so the chassis runs H at the top and left
 * edges through P to M and I along the bottom and right. The screen is the one
 * thing on the icon that emits rather than reflects, which is why it and the
 * glow behind it are the only places the blue arm of the ramp appears.
 */
const { W, H, P, S, M, I, B, C, J, N, K, L } = TECH_PALETTE;

const BLANK = "................";

/** Rows 3–6, columns 4–11, are the screen aperture the body leaves open. */
const SCREEN_LINES = ["WWCSS...", "SSWWCS..", "CWSS....", "BBSCW..."];

/** One frame per line of scroll, so the type walks up the screen and wraps. */
const screenFrames = SCREEN_LINES.map((_, offset) =>
  Array.from({ length: 16 }, (_, row) =>
    row >= 3 && row <= 6
      ? `....${SCREEN_LINES[(row - 3 + offset) % SCREEN_LINES.length]}....`
      : BLANK,
  ),
);

export const RetroComputer: ParallaxPxlKitData = {
  name: "retro-computer",
  size: 16,
  category: "parallax",
  tags: ["computer", "monitor", "workstation", "desktop", "3d", "parallax"],
  author: "spencer-bowden",
  layers: [
    animated(3, "retro-computer-glow", ["glow"], { B, J }, 460, [
      [
        BLANK,
        ".B............B.",
        BLANK,
        BLANK,
        "J..............J",
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
      ],
      [
        ".J............J.",
        BLANK,
        BLANK,
        "B..............B",
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
      ],
      [
        BLANK,
        BLANK,
        "B..............B",
        BLANK,
        BLANK,
        ".J............J.",
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
      ],
    ]),
    // Column 14, clear of both the monitor (cols 2–13) and the keyboard, so the
    // cable reads as a cable rather than fusing with the right end of the keys.
    // It darkens as it falls away from the light.
    still(2, "retro-computer-cable", ["cable"], { L, M, I }, [
      BLANK,
      BLANK,
      BLANK,
      BLANK,
      BLANK,
      BLANK,
      BLANK,
      BLANK,
      "..............L.",
      "..............L.",
      "..............M.",
      "..............M.",
      "..............I.",
      "..............I.",
      BLANK,
      BLANK,
    ]),
    still(
      0,
      "retro-computer-body",
      ["monitor", "keyboard"],
      { H, P, S, M, I, N, K },
      [
        BLANK,
        "..HHHHHHHHHHPM..",
        "..HKKKKKKKKKKM..",
        "..HK........KM..",
        "..PK........KI..",
        "..PK........KI..",
        "..PK........KI..",
        "..MKKKKKKKKKKI..",
        "..MIIIIIIIIIII..",
        ".....PPMMII.....",
        "......PMMI......",
        "....HPPPMMIII...",
        BLANK,
        "..HSSSSSSSSSMI..",
        "..MKMKMKMKMKNI..",
        BLANK,
      ],
    ),
    animated(
      -1,
      "retro-computer-screen",
      ["screen", "code"],
      { W, C, S, B },
      240,
      screenFrames,
    ),
    animated(-2, "retro-computer-glare", ["glare"], { W, C }, 380, [
      [
        BLANK,
        BLANK,
        BLANK,
        "....W...........",
        "....C...........",
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
      ],
      [
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        ".....W..........",
        ".....C..........",
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
      ],
    ]),
  ],
};
