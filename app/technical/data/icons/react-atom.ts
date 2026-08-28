import type { AnimatedPxlKitData } from "@pxlkit/core";
import { TECH_PALETTE } from "./palette";

/**
 * The React mark for the Front End lane: a nucleus inside an orbit, with an
 * electron running the track and a tail cooling behind it.
 *
 * The orbit is walked, not drawn. Sampling the ellipse produces the ring *in
 * order*, so the electron's position on frame n is just an index into that
 * ring. It cannot drift off the track, and widening the ellipse moves the
 * particle with it. Hand-placing a dot on twelve frames is the version of this
 * that goes subtly wrong and stays wrong.
 */
const { T, V, J, W } = TECH_PALETTE;

const SIZE = 16;
/** Centred between pixels, so the ellipse comes out symmetric on an even grid. */
const CENTRE = 7.5;
const RADIUS_X = 7;
const RADIUS_Y = 4.5;
const FRAMES = 12;
/** How many ring pixels behind the electron still glow. */
const TAIL = 2;

/** The ellipse as an ordered ring, oversampled then collapsed to unique pixels. */
const orbit = Array.from({ length: 180 }, (_, step) => {
  const angle = (step / 180) * Math.PI * 2;
  return [
    Math.round(CENTRE + RADIUS_Y * Math.sin(angle)),
    Math.round(CENTRE + RADIUS_X * Math.cos(angle)),
  ] as const;
}).filter(([row, column], index, all) => {
  const [previousRow, previousColumn] = all[(index - 1 + all.length) % all.length];
  return row !== previousRow || column !== previousColumn;
});

function frame(step: number): string[] {
  const cells: string[][] = Array.from({ length: SIZE }, () =>
    Array<string>(SIZE).fill("."),
  );

  // Palette keys, not colours. The grid holds one character per pixel.
  for (const [row, column] of orbit) cells[row][column] = "J";

  // Tail first, then the electron, so the head always wins its own pixel.
  const head = Math.round((step / FRAMES) * orbit.length);
  for (let back = TAIL; back >= 1; back -= 1) {
    const [row, column] = orbit[(head - back + orbit.length) % orbit.length];
    cells[row][column] = "V";
  }
  const [row, column] = orbit[head % orbit.length];
  cells[row][column] = "T";

  // Nucleus: two by two on the centre.
  for (const y of [7, 8]) for (const x of [7, 8]) cells[y][x] = "W";

  return cells.map((line) => line.join(""));
}

export const ReactAtom: AnimatedPxlKitData = {
  name: "react-atom",
  size: 16,
  category: "parallax",
  tags: ["react", "atom", "orbit", "frontend"],
  author: "spencer-bowden",
  palette: { T, V, J, W },
  frameDuration: 110,
  trigger: "loop",
  loop: true,
  frames: Array.from({ length: FRAMES }, (_, step) => ({ grid: frame(step) })),
};
