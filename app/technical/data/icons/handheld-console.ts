import type { ParallaxPxlKitData } from "@pxlkit/core";
import { animated, still } from "./layer";
import { TECH_PALETTE } from "./palette";

/**
 * A two-grip gamepad on the same five-layer stack as RetroComputer, so the two
 * header sprites read as a pair. PxlKit's parallax pack has a RetroJoystick, but
 * that is an arcade stick and it already heads the Systems / Game Design lane,
 * so this is drawn rather than reused.
 *
 * Back to front: a glow behind the pad, the shoulder bumpers, the body and its
 * grips, the D-pad and face buttons popping forward, and a highlight travelling
 * along the body.
 *
 * Same light as the computer, from the top left: H across the top ridge and the
 * left flank, M and I down the right side, N in the crotch between the grips
 * where nothing reaches. The D-pad is cut *into* the shell, so it runs the cool
 * arm of the ramp — N and J — while the face buttons sit proud and catch W.
 */
const { W, H, P, M, I, B, C, J, N, K, L } = TECH_PALETTE;

const BLANK = "................";

export const HandheldConsole: ParallaxPxlKitData = {
  name: "handheld-console",
  size: 16,
  category: "parallax",
  tags: ["gamepad", "controller", "console", "gaming", "3d", "parallax"],
  author: "spencer-bowden",
  layers: [
    animated(3, "handheld-console-glow", ["glow"], { B, J }, 460, [
      [
        BLANK,
        "..B..........B..",
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
        "J..............J",
        BLANK,
        BLANK,
      ],
      [
        "..J..........J..",
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
        "B..............B",
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
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        "..J..........J..",
        BLANK,
        BLANK,
        BLANK,
        BLANK,
      ],
    ]),
    // Columns 4–5 and 10–11, directly over the body's top ridge (cols 4–11).
    // Set any wider and they read as two tabs floating above the pad.
    still(2, "handheld-console-shoulders", ["bumper"], { C, L, M }, [
      BLANK,
      BLANK,
      "....CL....LM....",
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
      BLANK,
    ]),
    still(0, "handheld-console-body", ["gamepad", "grip"], { H, P, M, I, N }, [
      BLANK,
      BLANK,
      BLANK,
      "....HHHHHHPM....",
      "..HHPPPPPPPPMI..",
      ".HPPPPPPPPPPPMI.",
      ".HPPPPPPPPPPPMI.",
      ".PPPPPPPPPPPPMI.",
      ".PPPPPPPPPPPPMI.",
      ".MPPPPPPPPPPPMI.",
      ".MMPP.PPPP.PPMI.",
      ".MMM...NN...MMI.",
      "..MM........MI..",
      "..MN........NI..",
      "...N........N...",
      BLANK,
    ]),
    // The D-pad is recessed, so it is drawn as a hole: N on the shaded upper
    // lip, J where light reaches the lower one. The two face buttons trade the
    // bright value back and forth, so the pad reads as being played rather than
    // as sitting on a shelf.
    animated(
      -1,
      "handheld-console-controls",
      ["dpad", "buttons"],
      { K, W, B, J, N },
      300,
      [
        [
          BLANK,
          BLANK,
          BLANK,
          BLANK,
          BLANK,
          BLANK,
          "....N......W....",
          "...NKJ..........",
          "....J.....B.....",
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
          BLANK,
          BLANK,
          "....N......B....",
          "...NKJ..........",
          "....J.....W.....",
          BLANK,
          BLANK,
          BLANK,
          BLANK,
          BLANK,
          BLANK,
          BLANK,
        ],
      ],
    ),
    // On row 4 rather than the top ridge: a two-pixel catch of light travelling
    // across the body. On row 3 it sat proud of the silhouette and read as a
    // white sticker stuck to the pad.
    animated(-2, "handheld-console-highlight", ["highlight"], { W, C }, 420, [
      [
        BLANK,
        BLANK,
        BLANK,
        BLANK,
        "....WC..........",
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
        ".....WC.........",
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
    ]),
  ],
};
