export type Show = {
  title: string;
  /** Season the production ran. "—" means Spencer still needs to supply it. */
  year: string;
  role: string;
  organization: string;
  credit: string;
};

export const shows: Show[] = [
  {
    title: "Falsettos",
    year: "2026",
    role: "Music Director, Rehearsal Accompanist, Piano/Conductor",
    organization: "Vanderbilt Immersion",
    credit: "Advisor: Dr. Ibby Cizmar",
  },
  {
    title: "Into the Woods",
    year: "2025\u201326",
    role: "Music Director, Rehearsal Accompanist, Piano",
    organization: "Vanderbilt Off-Broadway",
    credit: "Director: Alyssa Newson",
  },
  {
    title: "Natasha, Pierre, and the Great Comet of 1812",
    year: "2024\u201325",
    role: "Music Director, Rehearsal Accompanist, Piano/Conductor/QLab DJ",
    organization: "Vanderbilt Off-Broadway",
    credit: "Director: Isabella Lough",
  },
  {
    title: "Chicago",
    year: "2024",
    role: "Music Director, Rehearsal Accompanist, Piano/Conductor",
    organization: "Vanderbilt Off-Broadway",
    credit: "Director: Ethan Blevins",
  },
  {
    title: "Company",
    year: "\u2014",
    role: "Rehearsal Accompanist, Piano",
    organization: "Vanderbilt Off-Broadway",
    credit: "Director: Kate Mason",
  },
  {
    title: "The Last Five Years",
    year: "\u2014",
    role: "Rehearsal Accompanist, Piano",
    organization: "Vanderbilt Immersion",
    credit: "Project Lead: Will Henke",
  },
  {
    title: "An American Soldier's Tale: Vonnegut and Stravinsky",
    year: "\u2014",
    role: "Staging Director",
    organization: "Vanderbilt Immersion",
    credit: "Project Lead: Paxson Amy",
  },
  {
    title: "Heathers: The Musical",
    year: "\u2014",
    role: "Stage Manager",
    organization: "Vanderbilt Off-Broadway",
    credit: "Director: Jakob Heiser",
  },
  {
    title: "Violet",
    year: "\u2014",
    role: "Assistant Stage Manager",
    organization: "Vanderbilt Off-Broadway",
    credit: "Director: Brianna Stewart",
  },
];
