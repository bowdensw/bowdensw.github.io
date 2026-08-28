import type { ParallaxLayer } from "@pxlkit/core";

/**
 * Builders for the layers of a hand-authored parallax icon.
 *
 * Every layer repeats the same four scaffolding fields, and an animated one has
 * to carry both `trigger` and the deprecated `loop`. PxlKit's docs say `trigger`
 * supersedes it, but `AnimatedPxlKitData` still types `loop` as required, so
 * omitting it fails the build. Declaring that once here keeps the icon files as
 * grids rather than as boilerplate.
 */
type Palette = Record<string, string>;

const scaffold = (name: string, tags: string[]) => ({
  name,
  size: 16 as const,
  category: "parallax",
  tags,
});

/** A layer that holds one frame: structure, not motion. */
export function still(
  depth: number,
  name: string,
  tags: string[],
  palette: Palette,
  grid: string[],
): ParallaxLayer {
  return { depth, icon: { ...scaffold(name, tags), palette, grid } };
}

/** A layer that cycles its frames forever at `frameDuration` ms apiece. */
export function animated(
  depth: number,
  name: string,
  tags: string[],
  palette: Palette,
  frameDuration: number,
  grids: string[][],
): ParallaxLayer {
  return {
    depth,
    icon: {
      ...scaffold(name, tags),
      palette,
      frameDuration,
      trigger: "loop",
      loop: true,
      frames: grids.map((grid) => ({ grid })),
    },
  };
}
