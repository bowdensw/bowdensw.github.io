/**
 * Musical résumé! Fits performing arts resume conventions.
 *
 * This file and public/SWB_RESUME_Musical.pdf are the same document. The PDF is
 * what gets emailed to a school, this is what the site renders.
 *
 * Credits are the /musical page's `credits.ts` re-cut by department and with the
 * role strings shortened to one line each. The credits page keeps the full
 * multi-hat wording because it is the complete list, not a selection.
 */

export const profile = {
  name: "Spencer Bowden",
  pronouns: "he/him/his",
  email: "spencerbowden337@gmail.com",
  phone: "(513) 503-9631",
  phoneHref: "tel:+15135039631",
  site: "bowdensw.github.io/musical",
  siteHref: "/musical",
};

export type CreditGroup = {
  label: string;
  credits: {
    title: string;
    year: string;
    role: string;
    organization: string;
    lead: string;
  }[];
};

export const creditGroups: CreditGroup[] = [
  {
    label: "Music Direction",
    credits: [
      {
        title: "Falsettos",
        year: "2026",
        role: "Music Director, Piano/Conductor, Producer",
        organization: "Vanderbilt Immersion",
        lead: "Adv: Dr. Ibby Cizmar",
      },
      {
        title: "Into the Woods",
        year: "2026",
        role: "Music Director, Piano",
        organization: "Vanderbilt Off-Broadway",
        lead: "Dir: Alyssa Newson",
      },
      {
        title: "Natasha, Pierre, and the Great Comet of 1812",
        year: "2025",
        role: "Music Director, Piano/Conductor",
        organization: "Vanderbilt Off-Broadway",
        lead: "Dir: Isabella Lough",
      },
      {
        title: "Chicago",
        year: "2024",
        role: "Music Director, Piano/Conductor",
        organization: "Vanderbilt Off-Broadway",
        lead: "Dir: Ethan Blevins",
      },
    ],
  },
  {
    label: "Pit & Accompaniment",
    credits: [
      {
        title: "Merrily We Roll Along",
        year: "2026",
        role: "Piano / Synth",
        organization: "Henderson Performing Arts Community",
        lead: "MD: Trey Lundquist",
      },
      {
        title: "Come From Away",
        year: "2026",
        role: "Keys",
        organization: "The Larry Keeton Theatre",
        lead: "MD: Trey Lundquist",
      },
      {
        title: "Ride the Cyclone",
        year: "2026",
        role: "Synthesizer",
        organization: "Vanderbilt Off-Broadway",
        lead: "MD: Lalima Sharan",
      },
      {
        title: "Company",
        year: "2025",
        role: "Rehearsal Accompanist, Piano",
        organization: "Vanderbilt Off-Broadway",
        lead: "MD: Matthew Marcus",
      },
      {
        title: "The Last Five Years",
        year: "2023",
        role: "Rehearsal Accompanist, Piano",
        organization: "Vanderbilt Immersion",
        lead: "Lead: Will Henke",
      },
    ],
  },
  {
    label: "Staging & Production",
    credits: [
      {
        title: "An American Soldier's Tale: Vonnegut and Stravinsky",
        year: "2024",
        role: "Staging Director",
        organization: "Vanderbilt Immersion",
        lead: "Lead: Paxson Amy",
      },
      {
        title: "Heathers: The Musical",
        year: "2024",
        role: "Stage Manager",
        organization: "Vanderbilt Off-Broadway",
        lead: "Dir: Jakob Heiser",
      },
      {
        title: "Violet",
        year: "2023",
        role: "Assistant Stage Manager",
        organization: "Vanderbilt Off-Broadway",
        lead: "Dir: Brianna Stewart",
      },
    ],
  },
];

/** Listings, not bullets: everything here is checkable against a person. */
export const engagements = [
  {
    role: "Session Accompanist, Musical Theatre Intensive",
    organization: "University of Cincinnati, College-Conservatory of Music",
    lead: "Director: Dee Anne Bryll",
    dates: "2023, 2024",
  },
  {
    role: "Music & Vocals Instructor",
    organization: "Columbus Children's Theatre, Mean Girls Jr. Camp",
    lead: "Education Coordinator: Kate Mason",
    dates: "2024",
  },
  {
    role: "Percussion Instructor & Arranger",
    organization: "Wyoming High School, Wyoming, OH",
    lead: "Band Director: Paul Vickous",
    dates: "",
  },
];

export const leadership = {
  org: "Vanderbilt Off-Broadway (VOB) — Vanderbilt University, Nashville, TN",
  roles: [
    {
      title: "President",
      dates: "2025 – 2026",
      note: null,
      bullets: [
        "Led a 12-member executive board overseeing daily operations, officer selection, artistic-team training, and the productions of a 100+ member organization.",
      ],
    },
    {
      title: "Music Director",
      dates: "2024 – 2026",
      note: "Chicago (2024) · Natasha, Pierre, and the Great Comet of 1812 (2024–25) · Into the Woods (2025–26) · Falsettos (2026)",
      bullets: [
        "Led vocal rehearsals and cast office hours across four productions; arranged and led pit orchestra rehearsals with 10+ instrumentalists, and played and conducted in performance.",
      ],
    },
  ],
};

export const training = {
  school: "Vanderbilt University, Peabody College — Nashville, TN",
  degree:
    "Bachelor of Science: Cognitive Studies, Computer Science, Minor in Music (Piano Performance Concentration) · GPA 3.88, Dean's List",
  dates: "2022 – 2026",
  study: [
    { sub: "Classical piano", text: "Jama Reagan" },
    { sub: "Collaborative piano", text: "Jennifer McGuire" },
  ],
};

export const specialSkills =
  "Classical and collaborative piano · sight-reading · rehearsal accompaniment · MainStage programming · conducting · vocal coaching · arranging · QLab";
