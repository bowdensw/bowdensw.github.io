export const CONTACT_EMAIL = "spencerbowden337@gmail.com";
export const PRICE = "$300";

export type Session = {
  title: string;
  meta: string;
  tags: string[];
};

export const sessions: Session[] = [
  {
    title: "Into the Woods",
    meta: "Sondheim · 2 acts · 45 cues",
    tags: ["Click tracks", "Full patch set", "Cue map"],
  },
  {
    title: "Natasha, Pierre & the Great Comet of 1812",
    meta: "Malloy · sung-through · 60+ cues",
    tags: ["Click tracks", "QLab-synced", "Full patch set"],
  },
  {
    title: "Chicago",
    meta: "Kander & Ebb · 2 acts · 32 cues",
    tags: ["Click tracks", "Vamp handling", "Cue map"],
  },
  {
    title: "Falsettos",
    meta: "Finn · 2 acts · 40 cues",
    tags: ["Click tracks", "Reduced-band patches", "Cue map"],
  },
];

export const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
