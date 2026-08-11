"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import PixelSprite from "@/components/PixelSprite";
import { cn } from "@/lib/utils";
import { LANE_GLYPHS } from "../data/pixel";
import { TIERS, type Tier, findSkill, lanes } from "../data/skills";

/** Tier is the whole progression model — it replaced the old `unlocked` flag. */
const marker: Record<Tier, string> = {
  3: "border-solid border-tech bg-tech text-white",
  2: "border-solid border-tech bg-tech/25 text-paper",
  1: "border-dashed border-tech/60 text-paper",
};

export default function SkillTree() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const active = findSkill(hoverId ?? selectedId ?? "");

  useEffect(() => {
    if (!selectedId) return;
    const close = (event: KeyboardEvent) =>
      event.key === "Escape" && setSelectedId(null);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [selectedId]);

  return (
    <section className="pixel-grid rounded-lg border border-ink-soft bg-ink-deep p-4 sm:p-6">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-5">
        <h2 className="font-pixel text-xl tracking-wide [text-shadow:2px_2px_0_var(--color-tech)]">
          SKILL TREE
        </h2>
        <ul className="flex gap-5 border border-ink-soft bg-ink/60 px-3.5 py-2.5">
          {([3, 2, 1] as Tier[]).map((tier) => (
            <li key={tier} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={cn("size-3.5 border-2", marker[tier])}
              />
              <span className="text-[10.5px] tracking-[0.08em] text-paper uppercase">
                {TIERS[tier]}
              </span>
            </li>
          ))}
        </ul>
      </header>

      <div className="flex items-start gap-6">
        {/* Five lanes never fit at once by design — they snap horizontally.
            The thin scrollbar and the fade at the trailing edge are what say so. */}
        <div className="relative min-w-0 flex-1">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-1 w-12 bg-linear-to-l from-ink-deep to-transparent"
          />
          <div className="flex snap-x snap-mandatory gap-7 overflow-x-auto pb-4 [scrollbar-color:var(--color-ink-soft)_transparent] [scrollbar-width:thin]">
            {lanes.map((lane) => (
              <div
                key={lane.id}
                className="min-w-[240px] flex-1 shrink-0 snap-start"
              >
                <h3 className="mb-4 flex items-center gap-2 font-pixel text-xs tracking-wide text-tech">
                  <PixelSprite
                    layers={LANE_GLYPHS[lane.id]}
                    className="size-4 shrink-0"
                  />
                  {lane.name.toUpperCase()}
                </h3>

                <ul className="relative flex flex-col gap-3">
                  {/* Dotted spine, centred behind the 40px markers. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-2 bottom-2 left-[19px] w-0.5 bg-[repeating-linear-gradient(180deg,var(--color-tech)_0_6px,transparent_6px_12px)] opacity-40"
                  />
                  {lane.skills.map((skill) => {
                    const pinned = skill.id === selectedId;
                    return (
                      <li key={skill.id} className="relative">
                        <button
                          type="button"
                          aria-pressed={pinned}
                          onClick={() =>
                            setSelectedId(pinned ? null : skill.id)
                          }
                          onPointerEnter={() => setHoverId(skill.id)}
                          onPointerLeave={() => setHoverId(null)}
                          onFocus={() => setHoverId(skill.id)}
                          onBlur={() => setHoverId(null)}
                          className={cn(
                            "flex w-full cursor-pointer items-center gap-3 py-1.5 pr-2 text-left outline-none",
                            "transition-colors duration-150 hover:bg-tech/15 focus-visible:bg-tech/15",
                            "focus-visible:ring-2 focus-visible:ring-tech-soft",
                            pinned && "bg-tech/15 ring-2 ring-tech",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "flex size-10 shrink-0 items-center justify-center border-2 font-pixel text-[11px]",
                              marker[skill.tier],
                            )}
                          >
                            {skill.abbr}
                          </span>
                          <span className="flex flex-col gap-1">
                            <span className="font-mono text-[12.5px]/[1.3] font-medium text-paper">
                              {skill.label}
                            </span>
                            <span className="font-mono text-[9.5px] tracking-[0.06em] text-tech uppercase">
                              {skill.source}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <aside className="sticky top-20 hidden w-[280px] shrink-0 border-2 border-ink-soft bg-ink p-5 lg:block">
          {active ? (
            <Detail {...active} />
          ) : (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <span
                aria-hidden="true"
                className="flex size-10 items-center justify-center border-2 border-dashed border-ink-soft font-pixel text-sm text-on-dark-soft"
              >
                ?
              </span>
              <p className="max-w-[200px] text-[13px] text-on-dark-soft">
                Hover a node to read it. Click to pin it here.
              </p>
            </div>
          )}
        </aside>
      </div>

      <p className="mt-4 font-mono text-[9.5px] tracking-[0.1em] text-on-dark-soft uppercase">
        Header sprites adapted from{" "}
        <a
          href="https://pxlkit.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm underline outline-none hover:text-tech focus-visible:ring-2 focus-visible:ring-tech"
        >
          PxlKit
        </a>
      </p>

      {/* Below lg there is no rail and no hover, so a pinned node opens here. */}
      {selectedId && active && (
        <div
          role="dialog"
          aria-label={`${active.skill.label} detail`}
          className="fixed inset-x-0 bottom-0 z-60 border-t-2 border-tech bg-ink p-5 shadow-float lg:hidden"
        >
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="float-right cursor-pointer border border-ink-soft p-1.5 text-paper outline-none hover:border-tech focus-visible:ring-2 focus-visible:ring-tech"
          >
            <X aria-hidden="true" className="size-4" />
            <span className="sr-only">Close</span>
          </button>
          <Detail {...active} />
        </div>
      )}
    </section>
  );
}

function Detail({ skill, lane }: NonNullable<ReturnType<typeof findSkill>>) {
  return (
    <>
      <p className="mb-2.5 font-mono text-[10.5px] tracking-[0.12em] text-tech uppercase">
        {lane.name}
      </p>
      <h3 className="mb-3.5 font-pixel text-[17px]/[1.35]">{skill.label}</h3>

      <p className="mb-3.5 flex items-center gap-2.5">
        <span aria-hidden="true" className="inline-flex gap-1">
          {[1, 2, 3].map((pip) => (
            <span
              key={pip}
              className={cn(
                "size-2 border",
                pip <= skill.tier ? "border-tech bg-tech" : "border-ink-soft",
              )}
            />
          ))}
        </span>
        <span className="font-mono text-[11px] font-semibold">
          {TIERS[skill.tier]}
        </span>
        <span className="font-mono text-[11px] text-on-dark-soft">
          since {skill.year}
        </span>
      </p>

      <p className="mb-4 text-sm/[1.65] text-on-dark">{skill.blurb}</p>
      <p className="inline-block border border-tech/55 px-2.5 py-1 font-mono text-[11px] text-tech">
        {skill.source}
      </p>
    </>
  );
}
