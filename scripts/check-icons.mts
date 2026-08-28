/**
 * Validates every hand-authored parallax icon against PxlKit's own runtime
 * validator.
 *
 * PxlKit ships a pre-flight checker (`check-icon.mjs` in its Claude Code plugin)
 * that parses icon files as *text*, because it assumes a consumer project has no
 * TypeScript build step to hand. That parser only recognizes literal palettes
 * (`palette: { "P": "#9067c6" }`), so it reads our shared `TECH_PALETTE`
 * shorthand as an empty palette and reports every character as missing. Its own
 * spec calls `validateIconData()` the normative, stricter validator, so that is
 * what runs here: it checks resolved values rather than source text, which also
 * catches a bad hex coming out of the palette module itself.
 *
 *   npm run check:icons
 */
import { registerHooks } from "node:module";
import {
  isAnimatedIcon,
  isParallaxIcon,
  validateIconData,
  type AnyIcon,
  type ParallaxPxlKitData,
} from "@pxlkit/core";

// The icon files import `./palette` the way every other file in app/ does, with
// no extension. Next resolves that; bare Node does not, so teach it to.
registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith(".") && !/\.[a-z]+$/.test(specifier))
      return next(`${specifier}.ts`, context);
    return next(specifier, context);
  },
});

const icons: Array<ParallaxPxlKitData | AnyIcon> = await Promise.all(
  [
    "retro-computer",
    "handheld-console",
    "puzzle",
    "react-atom",
    "backend-stack",
  ].map(async (file) => {
    const loaded = await import(`../app/technical/data/icons/${file}.ts`);
    return Object.values(loaded)[0] as ParallaxPxlKitData | AnyIcon;
  }),
);

/**
 * `validateIconData` only knows static icons. It reads `icon.grid` and throws on
 * an animated one. Frames are validated independently, each as the static icon it
 * would be, with any per-frame palette merged over the base the way the renderer
 * merges it.
 */
function check(icon: AnyIcon): string[] {
  if (!isAnimatedIcon(icon))
    return validateIconData(icon).map((error) => error.message);

  return icon.frames.flatMap((frame, index) =>
    validateIconData({
      ...icon,
      grid: frame.grid,
      palette: { ...icon.palette, ...frame.palette },
    }).map((error) => `frame ${index}: ${error.message}`),
  );
}

let failed = false;

for (const icon of icons) {
  // A flat icon is one layer with nothing to reconcile; the stack checks below
  // only mean anything for a parallax one.
  const problems = isParallaxIcon(icon)
    ? icon.layers.flatMap((layer, index) =>
        check(layer.icon).map(
          (message) => `layer ${index} (${layer.icon.name}): ${message}`,
        ),
      )
    : check(icon);

  if (isParallaxIcon(icon)) {
    // The layers composite, so they have to agree on a grid: PixelSprite sizes
    // the canvas from the first one and draws the rest into it.
    const sizes = new Set(icon.layers.map((layer) => layer.icon.size));
    if (sizes.size > 1)
      problems.push(`mixed layer sizes: ${[...sizes].join(", ")}`);

    if (!icon.layers.some((layer) => layer.depth === 0))
      problems.push("no layer at depth 0 to anchor the stack");
  }

  console.log(`${problems.length ? "FAIL" : "ok  "}  ${icon.name}`);
  for (const problem of problems) console.log(`        ${problem}`);
  failed ||= problems.length > 0;
}

process.exit(failed ? 1 : 0);
