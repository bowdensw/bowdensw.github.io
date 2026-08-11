import { buttonVariants } from "@/components/ui/button";
import { PRICE, mailto, sessions } from "../data/mainstage";

/* Rows rather than the mockup's card grid, to match the Shows table — the two
   tabs list the same kind of thing and should scan the same way. */
const columns = "sm:grid-cols-[2fr_1.7fr_auto_auto]";
const heading =
  "text-[11.5px] font-bold tracking-[0.06em] text-music-deep uppercase";

export default function Mainstage() {
  return (
    <div>
      <header className="mb-8 text-center">
        <h2 className="mb-3 font-score text-[28px] font-semibold text-music-deep italic">
          MainStage session files
        </h2>
        <p className="mx-auto max-w-130 text-[15px]/[1.7] text-ink-soft">
          Complete MainStage sessions from productions I music directed —
          patches, click tracks, and cue mapping already built and show-tested.{" "}
          {PRICE} per show, delivered as a zipped session with a setup call.
        </p>
      </header>

      <div
        className={`hidden gap-4 border-b-2 border-music-deep px-1 pb-2.5 sm:grid ${columns}`}
        aria-hidden="true"
      >
        <span className={heading}>Production</span>
        <span className={heading}>Includes</span>
        <span className={heading}>Price</span>
        <span />
      </div>

      <ul>
        {sessions.map((session) => (
          <li
            key={session.title}
            className={`grid items-start gap-3 border-b border-ink-soft/15 px-1 py-4 sm:gap-4 ${columns}`}
          >
            <div>
              <h3 className="font-score text-[17px]/[1.3] font-semibold italic sm:text-[15.5px]">
                {session.title}
              </h3>
              <p className="mt-0.5 text-[12.5px] text-ink-soft">
                {session.meta}
              </p>
            </div>

            <ul className="flex flex-wrap gap-1.5">
              {session.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-music/55 px-2.5 py-0.5 text-[11.5px] text-music-deep"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <p className="font-semibold whitespace-nowrap text-music-deep">
              {PRICE}
            </p>

            <a
              href={mailto(`MainStage session — ${session.title}`)}
              className={buttonVariants({
                tone: "music",
                size: "sm",
                className: "justify-self-start whitespace-nowrap",
              })}
            >
              Request this session
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 flex flex-wrap items-center justify-center gap-2 pt-2 text-sm text-ink-soft">
        Need a show that isn&rsquo;t listed? I build custom sessions too.
        <a
          href={mailto("Custom MainStage session")}
          className="rounded-sm border-b border-music font-semibold text-music-deep outline-none hover:border-music-deep focus-visible:ring-2 focus-visible:ring-music-deep focus-visible:ring-offset-2 focus-visible:ring-offset-paper-warm"
        >
          Ask about a custom build
        </a>
      </p>
    </div>
  );
}
