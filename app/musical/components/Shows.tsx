import { ClipboardList, PenLine, Piano } from "lucide-react";
import { shows } from "../data/shows";

/** The credit tells you the job; the glyph tells you the department. */
function roleIcon(role: string) {
  const lower = role.toLowerCase();
  if (lower.includes("stage manager")) return ClipboardList;
  if (lower.includes("director") && !lower.includes("music")) return PenLine;
  return Piano;
}

const columns = "sm:grid-cols-[2fr_auto_1.7fr_1.1fr_1.2fr]";
const heading =
  "text-[11.5px] font-bold tracking-[0.06em] text-music-deep uppercase";

export default function Shows() {
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
        {shows.map((show) => {
          const Icon = roleIcon(show.role);
          return (
            /* items-start, not items-baseline: a two-line production title must
               still line up with the top of its role, company, and credit. */
            <li
              key={show.title}
              className={`grid items-start gap-0.5 border-b border-ink-soft/15 px-1 py-3 sm:gap-4 sm:py-2.5 ${columns}`}
            >
              <span className="flex items-start gap-2 font-score text-[17px]/[1.3] font-semibold text-ink italic sm:text-[15.5px]">
                <Icon
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-music-deep"
                />
                {show.title}
              </span>
              <span className="text-[13px] whitespace-nowrap text-ink-soft tabular-nums">
                <span className="sr-only">Year: </span>
                {show.year}
              </span>
              <span className="text-[13px] text-ink-soft">
                <span className="sr-only">Role: </span>
                {show.role}
              </span>
              <span className="text-[13px] text-ink-soft">
                <span className="sr-only">Company: </span>
                {show.organization}
              </span>
              <span className="text-[12.5px] text-ink-soft italic">
                {show.credit}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
