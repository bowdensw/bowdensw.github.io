export const CONTACT_EMAIL = "spencerbowden337@gmail.com";
export const PRICE = "$300";

export type Session = {
  title: string;
  meta: string;
};

/** Sorted here rather than hand-ordered, so the catalog stays alphabetical as it grows. */
export const sessions: Session[] = [
  { title: "Ride the Cyclone", meta: "Richmond & Maxwell · 1 act " },
].sort((a, b) => a.title.localeCompare(b.title));

export const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
