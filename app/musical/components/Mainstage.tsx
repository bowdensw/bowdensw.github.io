import { buttonVariants } from "@/components/ui/button";
import { PRICE, mailto, sessions } from "../data/mainstage";

/* Rows rather than the mockup's card grid, to match the Credits table — the two
   tabs list the same kind of thing and should scan the same way. Fixed tracks
   so the header aligns with the rows; see the note in Credits.tsx. */
const columns = "sm:grid-cols-[1fr_72px_190px]";
const heading =
  "text-[11.5px] font-bold tracking-[0.06em] text-music-deep uppercase";

export default function Mainstage() {
  return (
    /* Capped narrower than the page: Credits is what sets the shell's width, and
       a three-column price list stretched to match reads as mostly gap. */
    <div className="mx-auto max-w-[820px]">
      <header className="mb-8 text-center">
        <h2 className="mb-3 font-score text-[28px] font-semibold text-music-deep italic">
          MainStage session files
        </h2>
        <p className="mx-auto max-w-130 text-[15px]/[1.7] text-ink-soft">
          From previous shows I’ve done. Programming Mainstage from scratch
          during a tech week is rough, so these session files are for sale to
          save you the trouble.
        </p>
        <p className="mx-auto mt-3 max-w-130 text-[15px]/[1.7] text-ink-soft">
          Each one is built with care in the context of my own productions,
          so some things may need shifting to fit yours, but it beats
          programming a whole show from zero. Base price is $300 per show
          &mdash;{" "}
          <a
            href={mailto("MainStage session inquiry")}
            className="rounded-sm border-b border-music font-semibold text-music-deep outline-none hover:border-music-deep focus-visible:ring-2 focus-visible:ring-music-deep focus-visible:ring-offset-2 focus-visible:ring-offset-paper-warm"
          >
            email me
          </a>{" "}
          for requests or questions!
        </p>
      </header>

      <div
        className={`hidden gap-4 border-b-2 border-music-deep px-1 pb-2.5 sm:grid ${columns}`}
        aria-hidden="true"
      >
        <span className={heading}>Production</span>
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
