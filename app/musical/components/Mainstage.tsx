import { buttonVariants } from "@/components/ui/button";
import { CONTACT_EMAIL, PRICE, mailto, sessions } from "../data/mainstage";

export default function Mainstage() {
  return (
    <div className="mx-auto max-w-[680px]">
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

      <ul className="grid gap-4 sm:grid-cols-2">
        {sessions.map((session) => (
          <li
            key={session.title}
            className="flex flex-col gap-3.5 rounded-xl border border-music/35 bg-surface p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-score text-[19px]/[1.25] font-semibold italic">
                  {session.title}
                </h3>
                <p className="mt-1 text-[12.5px] text-ink-soft">
                  {session.meta}
                </p>
              </div>
              <p className="shrink-0 font-semibold text-music-deep">{PRICE}</p>
            </div>

            <ul className="mt-auto flex flex-wrap gap-1.5">
              {session.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-music/55 px-2.5 py-0.5 text-[11.5px] text-music-deep"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <a
              href={mailto(`MainStage session — ${session.title}`)}
              className={buttonVariants({
                tone: "music",
                size: "sm",
                className: "w-full",
              })}
            >
              Request this session
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-ink-soft/15 pt-6 text-sm text-ink-soft">
        Need a show that isn&rsquo;t listed? I build custom sessions too.
        <a
          href={mailto("Custom MainStage session")}
          className="rounded-sm border-b border-music font-semibold text-music-deep outline-none hover:border-music-deep focus-visible:ring-2 focus-visible:ring-music-deep focus-visible:ring-offset-2 focus-visible:ring-offset-paper-warm"
        >
          Ask about a custom build
        </a>
      </p>

      <p className="mt-4 text-center text-xs text-ink-soft">
        Sessions are delivered by hand — email{" "}
        <a
          href={mailto("MainStage sessions")}
          className="rounded-sm underline underline-offset-2 outline-none hover:text-music-deep focus-visible:ring-2 focus-visible:ring-music-deep"
        >
          {CONTACT_EMAIL}
        </a>{" "}
        and I&rsquo;ll send the file and book a setup call.
      </p>
    </div>
  );
}
