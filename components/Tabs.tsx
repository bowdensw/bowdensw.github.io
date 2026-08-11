import { cn } from "@/lib/utils";

/**
 * Section tabs — the second navigation tier that sits below <SiteNav>.
 * Behaviour (roving focus, arrow keys, ARIA wiring) is shared; only the skin
 * is per-section. See docs/REVAMP-SPEC.md §2.
 *
 * No "use client" here on purpose: there are no hooks, and every caller is
 * already a client component, so the boundary is inherited.
 */
export type Tab = { id: string; label: string };

const skins = {
  /* Technical: pixel chips on a dark ground. */
  pixel: {
    list: "flex flex-wrap justify-center gap-3",
    tab: "rounded-sm border-2 px-5 py-3 font-pixel text-[11px] tracking-wide transition-[color,background-color,border-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-tech-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
    active: "border-tech bg-tech text-white shadow-[0_0_12px] shadow-tech/40",
    inactive:
      "border-ink-soft text-on-dark-soft hover:border-tech-soft hover:text-on-dark active:text-white",
  },
  /* Musical: serif labels over a hairline rule. */
  underline: {
    list: "flex flex-wrap justify-center gap-6 border-b border-ink-soft/15 sm:gap-8",
    tab: "-mb-px border-b-2 px-1 pb-2.5 font-score text-lg tracking-wide transition-[color,border-color] duration-200 focus-visible:ring-2 focus-visible:ring-music-deep focus-visible:ring-offset-4 focus-visible:ring-offset-paper-warm",
    active: "border-music font-semibold text-music-deep",
    inactive:
      "border-transparent text-ink-soft hover:border-music/40 hover:text-ink active:text-music-deep",
  },
} as const;

type Props = {
  items: readonly Tab[];
  value: string;
  onChange: (id: string) => void;
  skin: keyof typeof skins;
  label: string;
};

export function TabList({ items, value, onChange, skin, label }: Props) {
  const style = skins[skin];

  const move = (event: React.KeyboardEvent, index: number) => {
    const offsets: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };
    const next =
      event.key in offsets
        ? (index + offsets[event.key] + items.length) % items.length
        : event.key === "Home"
          ? 0
          : event.key === "End"
            ? items.length - 1
            : -1;

    if (next < 0) return;
    event.preventDefault();
    onChange(items[next].id);
    document.getElementById(tabId(items[next].id))?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className={style.list}>
      {items.map((item, index) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            id={tabId(item.id)}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={panelId(item.id)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => move(event, index)}
            className={cn(
              "cursor-pointer outline-none",
              style.tab,
              selected ? style.active : style.inactive,
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({
  id,
  value,
  className,
  children,
}: {
  id: string;
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (id !== value) return null;
  return (
    <div
      role="tabpanel"
      id={panelId(id)}
      aria-labelledby={tabId(id)}
      tabIndex={0}
      className={cn("outline-none", className)}
    >
      {children}
    </div>
  );
}

const tabId = (id: string) => `tab-${id}`;
const panelId = (id: string) => `panel-${id}`;
