/**
 * The shared furniture of both résumés. /resume renders two documents — the
 * technical one and the musical one — and they are the same document with a
 * different accent and a different display face, so the cards, rules, bullets,
 * and contact row live here once and take a `tone`.
 *
 * Tone is the *only* thing that varies. If a change here can't be expressed as
 * a token swap in `tones`, it belongs in the calling résumé instead.
 */
import { cn } from "@/lib/utils";

export type Tone = keyof typeof tones;

const tones = {
  /* Fraunces + the résumé yellow, per docs/REVAMP-SPEC.md §6. */
  resume: {
    display: "font-display",
    heading: "font-display text-[19px] font-semibold tracking-tight",
    accent: "text-resume-deep",
    marker: "marker:text-resume-deep",
    ring: "focus-visible:ring-resume-deep",
  },
  /* Cormorant + the musical green. Cormorant sets small for its point size, so
     the card headings run 4px larger than Fraunces at the same rank. */
  music: {
    display: "font-score italic",
    heading: "font-score text-[23px] font-semibold tracking-tight italic",
    accent: "text-music-deep",
    marker: "marker:text-music-deep",
    ring: "focus-visible:ring-music-deep",
  },
} as const;

export const toneOf = (tone: Tone) => tones[tone];

export function Card({
  title,
  tone,
  last,
  children,
}: {
  title: string;
  tone: Tone;
  last?: boolean;
  children: React.ReactNode;
}) {
  const t = tones[tone];
  return (
    <section
      className={cn(
        "rounded-xl border border-paper bg-surface px-5 py-4.5 shadow-card sm:px-8 sm:py-5.5",
        last ? "" : "mb-4",
      )}
    >
      <h2 className={cn("mb-3", t.heading, t.accent)}>{title}</h2>
      {children}
    </section>
  );
}

/** Successive entries inside a card are separated by a rule, not a gap. */
export function Entry({
  divided,
  children,
}: {
  divided: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={divided ? "mt-4 border-t border-paper pt-4" : "mt-3"}>
      {children}
    </div>
  );
}

export function Bullets({ items, tone }: { items: string[]; tone: Tone }) {
  return (
    <ul
      className={cn(
        "mt-1 list-disc space-y-1 pl-4 text-sm/normal text-ink-soft",
        tones[tone].marker,
      )}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** The small-caps organisation line that heads an experience or credit entry. */
export function OrgLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13.5px] font-medium tracking-wide text-ink-soft uppercase">
      {children}
    </p>
  );
}

export function Dates({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-semibold whitespace-nowrap text-ink-soft">
      {children}
    </p>
  );
}

export function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-ink-soft italic">{children}</p>;
}

export function ContactLink({
  href,
  icon,
  tone,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  tone: Tone;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        className={cn(
          "flex items-center gap-1.5 rounded-sm outline-none hover:text-ink",
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
          "[&_svg]:size-4",
          tones[tone].ring,
        )}
      >
        {icon}
        {children}
      </a>
    </li>
  );
}

export function ContactRow({ children }: { children: React.ReactNode }) {
  return (
    <ul className="flex flex-col flex-wrap items-center justify-center gap-2 text-sm text-ink-soft sm:flex-row sm:gap-5">
      {children}
    </ul>
  );
}
