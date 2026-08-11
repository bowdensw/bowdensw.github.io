import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { buttonVariants } from "@/components/ui/button";
import { entryPoints } from "./entry-points";

const bio =
  "I'm a software engineer and music director, and I've stopped treating those as two separate résumés. I'm finishing a double degree in Cognitive Studies and Computer Science at Vanderbilt, with a minor in Music. Most of what I do is translation: turning a messy system into something a user trusts in one glance, or turning a score into something a cast trusts on stage. Same instinct, different material.";

export default function LandingPage() {
  return (
    <PageShell className="md:py-24">
      <div className="flex flex-col items-center gap-10 md:flex-row md:gap-16">
        <div className="order-1 w-[clamp(11.25rem,20vw,16.25rem)] shrink-0 md:order-2">
          <div className="relative aspect-square overflow-hidden rounded-full border-4 border-surface shadow-float">
            <Image
              src="/images/me.jpg"
              alt="Spencer Bowden"
              fill
              priority
              sizes="(min-width: 768px) 260px, 180px"
              className="object-cover"
            />
          </div>
        </div>

        <section className="order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left">
          <h1 className="font-display text-display font-semibold text-balance">
            Hey guys! I&rsquo;m Spencer Bowden.
          </h1>
          <p className="mt-2 mb-6 text-[13px] font-semibold tracking-[0.08em] text-ink-soft uppercase">
            Tech. Music. Joy.
          </p>
          <p className="max-w-130 text-base/[1.7] text-ink-soft md:text-lg/[1.7]">
            {bio}
          </p>

          {/* The single row exists to stage the hover icons, which no touch
              device will ever see — so small screens get a 2×2 grid of
              properly tappable targets instead of four cramped chips. */}
          <nav
            aria-label="Sections"
            className="mt-8 grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:flex-wrap"
          >
            {entryPoints.map((entry) => (
              <div key={entry.href} className="group relative">
                <Link
                  href={entry.href}
                  className={buttonVariants({
                    tone: entry.tone,
                    className:
                      "w-full px-3 text-[clamp(0.875rem,2.4vw,1rem)] font-bold sm:w-auto sm:px-5",
                  })}
                >
                  {entry.label}
                </Link>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-full left-1/2 mt-2.5 -translate-x-1/2"
                  style={{ width: `${entry.scale}%`, maxWidth: entry.maxWidth }}
                >
                  <span className="block translate-y-2.5 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <Image
                      src={entry.icon}
                      alt=""
                      width={140}
                      height={140}
                      className="w-full group-hover:animate-floatSlow"
                    />
                  </span>
                </span>
              </div>
            ))}
          </nav>
        </section>
      </div>
    </PageShell>
  );
}
