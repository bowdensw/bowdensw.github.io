import {
  CyberEye,
  GhostFriend,
  MagicOrb,
  PixelCrown,
  PixelHeart,
  PixelRocket,
  RetroJoystick,
  RetroTV,
} from "@pxlkit/parallax";
import { isAnimatedIcon, type ParallaxPxlKitData } from "@pxlkit/core";
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
 */
/** A parallax layer is either an animated icon (`frames`) or a still plate (`grid`). */
function toLayers(icon: ParallaxPxlKitData): PixelLayer[] {
  return icon.layers.map(({ icon: layer, depth }) =>
    isAnimatedIcon(layer)
      ? {
          depth,
          frameDuration: layer.frameDuration ?? 0,
          palette: layer.palette,
          frames: layer.frames.map((frame) => frame.grid),
        }
      : {
          depth,
          frameDuration: 0,
          palette: layer.palette,
          frames: [layer.grid],
        },
  );
}

export const HEADER_SPRITES = {
  orb: { layers: toLayers(MagicOrb), label: "Pixel-art magic orb" },
  tv: { layers: toLayers(RetroTV), label: "Pixel-art retro television" },
};

/** One animated PxlKit icon per skill lane, keyed by lane id. */
export const LANE_ICONS: Record<string, PixelLayer[]> = {
  foundations: toLayers(PixelCrown),
  frontend: toLayers(PixelRocket),
  backend: toLayers(GhostFriend),
  systems: toLayers(RetroJoystick),
  academic: toLayers(CyberEye),
  design: toLayers(PixelHeart),
};
