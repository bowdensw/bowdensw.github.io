/**
 * The four landing entry points. `scale` is the hover icon's width as a
 * percentage of its button. The source art is square, so it is purely how
 * large each object wants to read next to the others.
 */
export type EntryPoint = {
  href: string;
  label: string;
  tone: "tech" | "music" | "resume" | "contact";
  icon: string;
  scale: number;
  maxWidth: number;
};

export const entryPoints: EntryPoint[] = [
  {
    href: "/technical",
    label: "Technical",
    tone: "tech",
    icon: "/images/computer_hover_icon.png",
    scale: 63,
    maxWidth: 99,
  },
  {
    href: "/musical",
    label: "Musical",
    tone: "music",
    icon: "/images/piano_hover_icon.png",
    scale: 86,
    maxWidth: 140,
  },
  {
    href: "/resume",
    label: "Résumé",
    tone: "resume",
    icon: "/images/book_hover_icon.png",
    scale: 76,
    maxWidth: 126,
  },
  {
    href: "/contact",
    label: "Contact",
    tone: "contact",
    icon: "/images/phone_hover_icon.png",
    scale: 80,
    maxWidth: 133,
  },
];
