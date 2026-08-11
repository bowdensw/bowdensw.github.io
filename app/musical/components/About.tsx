const paragraphs = [
  "Spencer Bowden is a Nashville-based music director, pianist, arranger, and vocal coach. Born in Cincinnati, he fell in love with music at the age of five when he started piano lessons, and never stopped his musical journey since. Spencer has a diverse musical background, being trained classically but also playing keys in his local high school rock band Stonefish, performing both covers and originals. At Vanderbilt University, he studied classical piano with Jama Reagan and collaborative piano with Jennifer McGuire, and music directed countless performances.",
  "He approaches all of his sessions, gigs, lessons, and projects with earnest enthusiasm, quick adaptivity, and creativity to ensure all collaborators can get the thoroughness and aptitude required to nail the performance. He has a passion for musical theatre and musical storytelling, both classics and new works. He is probably sight reading a vocal score as we speak.",
];

const engagements = [
  "CCM Accompanist",
  "Wyoming High School Percussion Instructor and Arranger",
  "Columbus Children's Theatre Music Instructor",
  "Accompanist for many productions at Vanderbilt University",
];

export default function About() {
  return (
    <div className="mx-auto max-w-[680px]">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 32)} className="mb-5 text-base/[1.75]">
          {paragraph}
        </p>
      ))}

      <section className="mt-9 border-t border-ink-soft/15 pt-8">
        <h2 className="mb-3.5 font-score text-xl text-music-deep italic">
          Other notable engagements
        </h2>
        <ul className="grid list-disc gap-2 pl-5 text-[14.5px]/[1.6] text-ink-soft marker:text-music sm:grid-cols-2 sm:gap-x-8">
          {engagements.map((engagement) => (
            <li key={engagement}>{engagement}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
