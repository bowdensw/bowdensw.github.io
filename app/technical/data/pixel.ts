import { SparkBurst } from "@pxlkit/effects";
import { PixelHeart, RetroJoystick } from "@pxlkit/parallax";
import { BackendStack } from "./icons/backend-stack";
import { HandheldConsole } from "./icons/handheld-console";
import { Puzzle } from "./icons/puzzle";
import { ReactAtom } from "./icons/react-atom";
import { RetroComputer } from "./icons/retro-computer";
import {
  isAnimatedIcon,
  isParallaxIcon,
  type AnyIcon,
  type ParallaxPxlKitData,
} from "@pxlkit/core";
import type { PixelLayer } from "@/components/PixelSprite";

/**
 * Pixel art for the Technical header and the skill-tree lane headings, taken
 * straight from PxlKit's parallax pack (MIT, free with attribution — see the
 * credit line in SkillTree.tsx and docs/REVAMP-SPEC.md §4).
 *
 * These layer stacks used to be transcribed into this file by hand from the
 * mockup. They are now imported, so the art updates with the package and there
 * is no second copy to drift.
 *
 * PxlKit ships its own <ParallaxPxlKitIcon>, but it has no
 * prefers-reduced-motion handling and this site leans on motion — so the data
 * goes through <PixelSprite>, which stops at frame 0 when motion is reduced.
 *
 * Two shapes arrive here. The parallax pack stacks layers for mouse-tracked
 * depth; the effects and UI packs ship one flat icon. Every pack draws on a
 * 16×16 grid, so a flat icon is just a one-layer stack at depth 0.
 */
/** An icon is either animated (`frames`) or a still plate (`grid`). */
function toLayer(icon: AnyIcon, depth: number): PixelLayer {
  return isAnimatedIcon(icon)
    ? {
        depth,
        frameDuration: icon.frameDuration ?? 0,
        palette: icon.palette,
        frames: icon.frames.map((frame) => frame.grid),
      }
    : { depth, frameDuration: 0, palette: icon.palette, frames: [icon.grid] };
}

function toLayers(icon: ParallaxPxlKitData | AnyIcon): PixelLayer[] {
  return isParallaxIcon(icon)
    ? icon.layers.map(({ icon: layer, depth }) => toLayer(layer, depth))
    : [toLayer(icon, 0)];
}

/**
 * The two objects flanking the Technical heading: the work on the left, the
 * reason for it on the right. Both are drawn in `./icons` rather than imported —
 * PxlKit ships no computer and no gamepad, and its RetroTV came in the pack's
 * grey-and-green retro palette, which never belonged over a purple page.
 */
export const HEADER_SPRITES = {
  computer: {
    layers: toLayers(RetroComputer),
    label: "Pixel-art desktop computer",
  },
  gamepad: {
    layers: toLayers(HandheldConsole),
    label: "Pixel-art game controller",
  },
};

/**
 * One animated icon per skill lane, keyed by lane id.
 *
 * The first three are drawn in `./icons` and say what the lane is: four pieces
 * locking together, an electron running React's orbit, a terminal and a database
 * and a gear. The last three are PxlKit's, kept because a joystick, an eye and a
 * heart already read as the thing.
 *
 * A lane missing from this map crashes the tree — `PixelSprite` reads
 * `layers[0]` unguarded.
 */
export const LANE_ICONS: Record<string, PixelLayer[]> = {
  foundations: toLayers(Puzzle),
  frontend: toLayers(ReactAtom),
  backend: toLayers(BackendStack),
  systems: toLayers(RetroJoystick),
  academic: toLayers(SparkBurst),
  design: toLayers(PixelHeart),
};
