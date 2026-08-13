import type { AnimatedPxlKitData } from "@pxlkit/core";
import { SECTION_PALETTE } from "./palette";

/**
 * Four puzzle pieces locking together and coming apart again, for the
 * Foundations lane.
 *
 * The pieces are the four section accents — Musical, Contact, Technical,
 * Résumé — because the lane is about the parts a whole is assembled from, and
 * those are the four parts of this site. It is the one icon that borrows the
 * site palette rather than the Technical shading ramp.
 *
 * The grids are computed from a single `gap` rather than drawn four times. Each
 * frame is the same four 6×6 pieces pushed `gap` pixels out along their
 * diagonals, so the shape can only ever be consistent between frames, and a
 * change to the piece size or the tabs lands in every frame at once.
 */
const SIZE = 16;
const PIECE = 6;

type Piece = {
  /** Top-left corner of the piece when the puzzle is closed. */
  top: number;
  left: number;
  /** Direction it travels as the puzzle opens. */
  dy: number;
  dx: number;
  /** The edge its tab sticks out of, toward the neighbour it locks into. */
  tab: "right" | "down" | "up" | "left";
  /** Palette keys, not colours — the grid holds one character per pixel. */
  fill: keyof typeof SECTION_PALETTE;
  shade: keyof typeof SECTION_PALETTE;
};

const pieces: Piece[] = [
  { top: 2, left: 2, dy: -1, dx: -1, tab: "right", fill: "G", shade: "g" },
  { top: 2, left: 8, dy: -1, dx: 1, tab: "down", fill: "R", shade: "r" },
  { top: 8, left: 2, dy: 1, dx: -1, tab: "up", fill: "U", shade: "u" },
  { top: 8, left: 8, dy: 1, dx: 1, tab: "left", fill: "Y", shade: "y" },
];

/** Where a tab sits relative to its piece: two pixels centred on one edge. */
const tabCells: Record<Piece["tab"], Array<[number, number]>> = {
  right: [
    [2, PIECE],
    [3, PIECE],
  ],
  left: [
    [2, -1],
    [3, -1],
  ],
  down: [
    [PIECE, 2],
    [PIECE, 3],
  ],
  up: [
    [-1, 2],
    [-1, 3],
  ],
};

function frame(gap: number): string[] {
  const cells: string[][] = Array.from({ length: SIZE }, () =>
    Array<string>(SIZE).fill("."),
  );

  const paint = (row: number, column: number, colour: string) => {
    if (row >= 0 && row < SIZE && column >= 0 && column < SIZE)
      cells[row][column] = colour;
  };

  for (const piece of pieces) {
    const top = piece.top + piece.dy * gap;
    const left = piece.left + piece.dx * gap;

    for (let y = 0; y < PIECE; y += 1)
      for (let x = 0; x < PIECE; x += 1)
        // Bottom and right edges fall away from the light, same as the two
        // header sprites.
        paint(
          top + y,
          left + x,
          y === PIECE - 1 || x === PIECE - 1 ? piece.shade : piece.fill,
        );

    // Tabs go on after every body, so a closed puzzle shows them biting into
    // the neighbouring piece rather than being covered by it.
    for (const [y, x] of tabCells[piece.tab])
      paint(top + y, left + x, piece.fill);
  }

  return cells.map((row) => row.join(""));
}

/** Closed, ajar, apart, ajar — so the loop reads as assembling and undoing. */
export const Puzzle: AnimatedPxlKitData = {
  name: "puzzle-assemble",
  size: 16,
  category: "parallax",
  tags: ["puzzle", "foundations", "assemble"],
  author: "spencer-bowden",
  palette: SECTION_PALETTE,
  frameDuration: 520,
  trigger: "loop",
  loop: true,
  frames: [0, 1, 2, 1].map((gap) => ({ grid: frame(gap) })),
};
