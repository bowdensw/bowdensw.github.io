"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/**
 * The site's only navigation. Identical on every route: same background, same
 * type, same link order. Section color enters solely through the active-link
 * underline. See docs/REVAMP-SPEC.md §2 before changing anything here.
 */
export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Escape closes the panel and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !toggleRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // No padding here on purpose; callers set their own.
  const linkBase =
    "relative text-sm outline-none transition-colors duration-200 rounded-sm " +
    "focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-ink";

  return (
    <header className="sticky top-0 z-50 border-b border-white/12 bg-ink">
      <nav
        aria-label="Main"
        className="flex h-14 items-center justify-between px-4 sm:px-6 md:px-8"
      >
        <Link
          href="/"
          className={cn(
            linkBase,
            "py-2 font-display text-[19px] font-semibold tracking-tight text-white",
            "hover:text-white/80 active:text-white/60",
          )}
        >
          Spencer Bowden
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {routes.map((route) => {
            const active = isActive(route.href);
            return (
              <li key={route.href}>
                <Link
                  href={route.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    linkBase,
                    "block py-2",
                    active
                      ? "text-white"
                      : "text-white/65 hover:text-white active:text-white/80",
                  )}
                >
                  {route.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-0.75 origin-left rounded-full",
                      "transition-transform duration-200 ease-out",
                      route.accent,
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            linkBase,
            "-mr-2 p-2 text-white hover:text-white/80 active:text-white/60 md:hidden",
          )}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div
          id="site-nav-panel"
          ref={panelRef}
          className="border-t border-white/10 bg-ink md:hidden"
        >
          <ul className="px-4 py-2 sm:px-6 md:px-8">
            {routes.map((route) => {
              const active = isActive(route.href);
              return (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      linkBase,
                      "flex items-center gap-3 py-3",
                      active ? "text-white" : "text-white/65 hover:text-white",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-4 w-0.75 rounded-full",
                        active ? route.accent : "bg-transparent",
                      )}
                    />
                    {route.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
