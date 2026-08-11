import { ClipboardList, PenLine, Piano } from "lucide-react";
import { shows } from "../data/shows";

/** The credit tells you the job; the glyph tells you the department. */
function roleIcon(role: string) {
  const lower = role.toLowerCase();
  if (lower.includes("stage manager")) return ClipboardList;
  if (lower.includes("director") && !lower.includes("music")) return PenLine;
  return Piano;
}

const columns = "sm:grid-cols-[2.2fr_1.8fr_1.1fr_1.2fr]";
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
        <span className={heading}>Role</span>
        <span className={heading}>Company</span>
        <span className={heading}>Credit</span>
      </div>

      <ul>
        {shows.map((show) => {
          const Icon = roleIcon(show.role);
          return (
            <li
              key={show.title}
              className={`grid items-baseline gap-0.5 border-b border-ink-soft/15 px-1 py-3 sm:gap-4 sm:py-2.5 ${columns}`}
            >
              <span className="flex items-center gap-2 font-score text-[17px] font-semibold text-ink italic sm:text-[15.5px]">
                <Icon
                  aria-hidden="true"
                  className="size-4 shrink-0 self-center text-music-deep"
                />
                {show.title}
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
