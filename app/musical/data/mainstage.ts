export const CONTACT_EMAIL = "spencerbowden337@gmail.com";
export const PRICE = "$300";

export type Session = {
  title: string;
  meta: string;
};

/** Sorted here rather than hand-ordered, so the catalog stays alphabetical as it grows. */
export const sessions: Session[] = [
  { title: "Chicago", meta: "Kander & Ebb · 2 acts · 32 cues" },
  { title: "Falsettos", meta: "Finn · 2 acts · 40 cues" },
  { title: "Into the Woods", meta: "Sondheim · 2 acts · 45 cues" },
  {
    title: "Natasha, Pierre & the Great Comet of 1812",
    meta: "Malloy · sung-through · 60+ cues",
  },
].sort((a, b) => a.title.localeCompare(b.title));

export const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
