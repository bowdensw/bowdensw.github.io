import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { buttonVariants } from "@/components/ui/button";
import { entryPoints } from "./entry-points";

const bio =
  "I prioritize community and helping people, whether that’s diving into a messy system and turning it into a clean one end users can trust, or turning a sprawling score into one cast members can trust onstage in front of an audience. What’s most important to me is making people happy, and often that’s through bringing clean, manageable solutions to big problems, all with a smile on my face. I have a double degree in Computer Science and Cognitive Studies with a minor in Music from Vanderbilt! Click on these tabs below to learn a little bit more about what I do.";

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

        {/* min-w-0 + flex-1: the heading only fits on one line at full size if
            this column takes the row's free space rather than sizing to 58%. */}
        <section className="order-2 flex min-w-0 flex-col items-center text-center md:order-1 md:flex-1 md:items-start md:text-left">
          <h1 className="font-display text-display font-semibold md:whitespace-nowrap">
            Hey guys! I&rsquo;m Spencer Bowden.
          </h1>
          <p className="mt-2 mb-6 text-[13px] font-semibold tracking-[0.08em] text-ink-soft uppercase">
            Tech. Music. Joy(!)
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

                {/* --glow resolves to this entry's accent token, so one class
                    covers all four. The drop-shadow is applied on hover rather
                    than transitioned — filters aren't cheap to animate. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-full left-1/2 mt-2.5 -translate-x-1/2"
                  style={
                    {
                      width: `${entry.scale}%`,
                      maxWidth: entry.maxWidth,
                      "--glow": `var(--color-${entry.tone})`,
                    } as React.CSSProperties
                  }
                >
                  <span className="block translate-y-2.5 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <Image
                      src={entry.icon}
                      alt=""
                      width={140}
                      height={140}
                      className="w-full group-hover:animate-floatSlow group-hover:[filter:drop-shadow(0_0_8px_var(--glow))_drop-shadow(0_0_20px_var(--glow))] group-focus-within:[filter:drop-shadow(0_0_8px_var(--glow))_drop-shadow(0_0_20px_var(--glow))]"
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
