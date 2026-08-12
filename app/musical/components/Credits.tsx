import { ClipboardList, PenLine, Piano } from "lucide-react";
import { credits } from "../data/credits";

/** A credit can wear more than one hat, so each department it touches adds a glyph. */
const departments = [
  {
    id: "keys",
    test: /piano|keys|synth|accompanist|music director|instructor/,
    Icon: Piano,
  },
  { id: "production", test: /producer|stage manager/, Icon: ClipboardList },
  { id: "staging", test: /staging director/, Icon: PenLine },
];

const glyphs = (role: string) =>
  departments.filter(({ test }) => test.test(role.toLowerCase()));

/* Fixed tracks, not `auto`: the header and the rows are separate grid
   containers, so an `auto` column resolves to a different width in each and
   the headings drift off their values. */
const columns = "sm:grid-cols-[2fr_64px_1.9fr_1.6fr_1.4fr]";
const heading =
  "text-[11.5px] font-bold tracking-[0.06em] text-music-deep uppercase";

export default function Credits() {
  return (
    <div>
      <div
        className={`hidden gap-4 border-b-2 border-music-deep px-1 pb-2.5 sm:grid ${columns}`}
        aria-hidden="true"
      >
        <span className={heading}>Production</span>
        <span className={heading}>Year</span>
        <span className={heading}>Role</span>
        <span className={heading}>Company</span>
        <span className={heading}>Credit</span>
      </div>

      <ul>
        {credits.map((credit) => (
          /* items-start, not items-baseline: a two-line production title must
             still line up with the top of its role, company, and credit. */
          <li
            key={`${credit.title} ${credit.year}`}
            className={`grid items-start gap-0.5 border-b border-ink-soft/15 px-1 py-3 sm:gap-4 sm:py-2.5 ${columns}`}
          >
            <span className="flex items-start gap-2 font-score text-[17px]/[1.3] font-semibold text-ink italic sm:text-[15.5px]">
              <span aria-hidden="true" className="mt-0.5 flex shrink-0 gap-1">
                {glyphs(credit.role).map(({ id, Icon }) => (
                  <Icon key={id} className="size-4 text-music-deep" />
                ))}
              </span>
              {credit.title}
            </span>
            <span className="text-[13px] whitespace-nowrap text-ink-soft tabular-nums">
              <span className="sr-only">Year: </span>
              {credit.year}
            </span>
            <span className="text-[13px] text-ink-soft">
              <span className="sr-only">Role: </span>
              {credit.role}
            </span>
            <span className="text-[13px] text-ink-soft">
              <span className="sr-only">Company: </span>
              {credit.organization}
            </span>
            <span className="text-[12.5px] text-ink-soft italic">
              {credit.lead}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
