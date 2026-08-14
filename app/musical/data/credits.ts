export type Credit = {
  title: string;
  /** The season the production closed — always a single year. */
  year: number;
  role: string;
  organization: string;
  /** Who led it: the director, music director, advisor, or coordinator. */
  lead: string;
};

/** Newest first, and hand-ordered within a year — see docs/REVAMP-SPEC.md §7. */
export const credits: Credit[] = [
  {
    title: "Falsettos",
    year: 2026,
    role: "Music Director, Rehearsal Accompanist, Piano/Conductor, Producer",
    organization: "Vanderbilt Immersion",
    lead: "Advisor: Dr. Ibby Cizmar",
  },
  {
    title: "Into the Woods",
    year: 2026,
    role: "Music Director, Rehearsal Accompanist, Piano",
    organization: "Vanderbilt Off-Broadway",
    lead: "Director: Alyssa Newson",
  },
  {
    title: "Merrily We Roll Along",
    year: 2026,
    role: "Piano/Synth",
    organization: "Henderson Performing Arts Community",
    lead: "MD: Trey Lundquist",
  },
  {
    title: "Come From Away",
    year: 2026,
    role: "Keys",
    organization: "The Larry Keeton Theatre",
    lead: "MD: Trey Lundquist",
  },
  {
    title: "Ride the Cyclone",
    year: 2026,
    role: "Synthesizer",
    organization: "Vanderbilt Off-Broadway",
    lead: "MD: Lalima Sharan",
  },
  {
    title: "Natasha, Pierre, and the Great Comet of 1812",
    year: 2025,
    role: "Music Director, Rehearsal Accompanist, Piano/Conductor/QLab DJ",
    organization: "Vanderbilt Off-Broadway",
    lead: "Director: Isabella Lough",
  },
  {
    title: "Company",
    year: 2025,
    role: "Rehearsal Accompanist, Piano",
    organization: "Vanderbilt Off-Broadway",
    lead: "MD: Matthew Marcus",
  },
  {
    title: "Chicago",
    year: 2024,
    role: "Music Director, Rehearsal Accompanist, Piano/Conductor",
    organization: "Vanderbilt Off-Broadway",
    lead: "Director: Ethan Blevins",
  },
  {
    title: "An American Soldier's Tale: Vonnegut and Stravinsky",
    year: 2024,
    role: "Staging Director",
    organization: "Vanderbilt Immersion",
    lead: "Project Lead: Paxson Amy",
  },
  {
    title: "Heathers: The Musical",
    year: 2024,
    role: "Stage Manager",
    organization: "Vanderbilt Off-Broadway",
    lead: "Director: Jakob Heiser",
  },
  {
    title: "CCM Musical Theatre Intensive",
    year: 2024,
    role: "Session Accompanist",
    organization:
      "University of Cincinnati College-Conservatory of Music (CCM)",
    lead: "Director: Dee Anne Bryll",
  },
  {
    title: "Mean Girls Jr. Camp",
    year: 2024,
    role: "Music/Vocals Instructor",
    organization: "Columbus Children's Theatre (CCT)",
    lead: "Education Coordinator: Kate Mason",
  },
  {
    title: "The Last Five Years",
    year: 2023,
    role: "Rehearsal Accompanist, Piano",
    organization: "Vanderbilt Immersion",
    lead: "Project Lead: Will Henke",
  },
  {
    title: "Violet",
    year: 2023,
    role: "Assistant Stage Manager",
    organization: "Vanderbilt Off-Broadway",
    lead: "Director: Brianna Stewart",
  },
  {
    title: "CCM Musical Theatre Intensive",
    year: 2023,
    role: "Session Accompanist",
    organization:
      "University of Cincinnati College-Conservatory of Music (CCM)",
    lead: "Director: Dee Anne Bryll",
  },
];
