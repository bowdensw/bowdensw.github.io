"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Layered pixel art on a canvas.
 *
 * Each layer is a stack of frames drawn on its own timer, and `depth` offsets
 * the layer against the pointer to fake parallax. The mockup built this out of
 * one <div> per cell — five layers of 16×16 is 1,280 nodes re-rendering ten
 * times a second, which is not something to ship. A canvas draws the same
 * thing in a few hundred fillRects and never touches the DOM.
 *
 * Frames are rows of single characters; a character keys into `palette`, and
 * anything missing (by convention ".") is transparent.
 */
export type PixelLayer = {
  /** Pointer-parallax offset multiplier. 0 is the still plate. */
  depth: number;
  /** ms per frame; 0 holds frame 0. */
  frameDuration: number;
  palette: Record<string, string>;
  frames: string[][];
};

/** Device pixels drawn per art pixel. Sets parallax precision, not display size. */
const SCALE = 8;

type Props = {
  layers: readonly PixelLayer[];
  /** Follow the pointer. Off for decorative thumbnails. */
  parallax?: boolean;
  /** Accessible name, or omit to mark the sprite decorative. */
  label?: string;
  className?: string;
};

export default function PixelSprite({
  layers,
  parallax = false,
  label,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const rows = layers[0].frames[0].length;
  const cols = layers[0].frames[0][0].length;

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let previous = "";
    let raf = 0;

    const draw = (elapsed: number) => {
      const frames = layers.map((layer) =>
        still || !layer.frameDuration
          ? 0
          : Math.floor(elapsed / layer.frameDuration) % layer.frames.length,
      );
      const { x, y } = still ? { x: 0, y: 0 } : pointer.current;

      // Redrawing an unchanged image is the common case while idle.
      const key = `${frames.join()}|${x.toFixed(2)},${y.toFixed(2)}`;
      if (key === previous) return;
      previous = key;

      context.clearRect(0, 0, cols * SCALE, rows * SCALE);

      layers.forEach((layer, index) => {
        const shift = layer.depth * SCALE * 0.7;
        const offsetX = Math.round(x * shift);
        const offsetY = Math.round(y * shift);

        layer.frames[frames[index]].forEach((row, rowIndex) => {
          [...row].forEach((char, colIndex) => {
            const color = layer.palette[char];
            if (!color) return;
            context.fillStyle = color;
            context.fillRect(
              colIndex * SCALE + offsetX,
              rowIndex * SCALE + offsetY,
              SCALE,
              SCALE,
            );
          });
        });
      });
    };

    draw(0);
    if (still) return;

    // Anchor to the first rAF timestamp, not to performance.now(): a frame's
    // timestamp can predate the call that scheduled it, and a negative elapsed
    // makes the frame index negative too.
    let start: number | undefined;
    const tick = (now: number) => {
      start ??= now;
      draw(now - start);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [layers, rows, cols]);

  const track = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: (event.clientX - box.left) / box.width - 0.5,
      y: (event.clientY - box.top) / box.height - 0.5,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      width={cols * SCALE}
      height={rows * SCALE}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      onPointerMove={parallax ? track : undefined}
      onPointerLeave={
        parallax ? () => (pointer.current = { x: 0, y: 0 }) : undefined
      }
      className={cn("h-auto w-full", className)}
    />
  );
}
