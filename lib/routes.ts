/**
 * Single source of truth for site navigation.
 *
 * `accent` is the Tailwind color token used for the active-link underline in
 * <SiteNav>. It is the only place section color appears in the site chrome —
 * see docs/REVAMP-SPEC.md §2.
 */
export type Route = {
  href: string;
  label: string;
  accent: string;
};

export const routes: Route[] = [
  { href: "/", label: "Home", accent: "bg-paper" },
  { href: "/technical", label: "Technical", accent: "bg-tech" },
  { href: "/musical", label: "Musical", accent: "bg-music" },
  { href: "/resume", label: "Résumé", accent: "bg-resume" },
  { href: "/contact", label: "Contact", accent: "bg-contact" },
];
