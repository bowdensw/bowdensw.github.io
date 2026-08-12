import type { Metadata } from "next";
import { Download, Mail, Phone } from "lucide-react";
import PageShell from "@/components/PageShell";
import { GithubIcon } from "@/components/icons/Brand";
import { buttonVariants } from "@/components/ui/button";
import {
  education,
  experience,
  leadership,
  profile,
  projects,
  skillGroups,
} from "./data/resume";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Spencer Bowden — education, skills, projects, experience, and leadership.",
};

/* The PDF used to be the page, in an <iframe> that iOS Safari refuses to
   render. It is now the download and this markup is the résumé. */
export default function ResumePage() {
  return (
    <PageShell width="narrow">
      <header className="mb-8 flex flex-col items-center gap-4 text-center">
        <div>
          <h1 className="font-display text-display font-semibold">
            {profile.name}
          </h1>
          <p className="mt-1 text-[13px] text-ink-soft">{profile.pronouns}</p>
        </div>

        <ul className="flex flex-col flex-wrap items-center justify-center gap-2 text-sm text-ink-soft sm:flex-row sm:gap-5">
          <ContactLink href={profile.github} icon={<GithubIcon />}>
            {profile.githubLabel}
          </ContactLink>
          <ContactLink href={`mailto:${profile.email}`} icon={<Mail />}>
            {profile.email}
          </ContactLink>
          <ContactLink href={profile.phoneHref} icon={<Phone />}>
            {profile.phone}
          </ContactLink>
        </ul>

        <a
          href="/SWB_RESUME_Tech.pdf"
          download
          className={buttonVariants({ tone: "resume" })}
        >
          <Download aria-hidden="true" />
          Download PDF
        </a>
      </header>

      <Card title="Education">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-medium tracking-wide text-ink-soft uppercase">
              {education.school}
            </p>
            <p className="mt-0.5 text-sm/snug text-ink-soft">
              {education.degree}
            </p>
            <p className="mt-1 text-xs text-ink-soft italic">
              {education.honors}
            </p>
          </div>
          <p className="text-[13px] font-semibold whitespace-nowrap text-ink-soft">
            {education.dates}
          </p>
        </div>
        <p className="mt-2.5 border-t border-paper pt-2.5 text-[13.5px]/[1.6] text-ink-soft">
          <span className="font-bold text-ink">Relevant coursework —</span>{" "}
          {education.coursework}
        </p>
      </Card>

      <Card title="Skills">
        <dl className="grid gap-3 sm:grid-cols-2 sm:gap-x-8">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <dt className="text-[12.5px] font-bold tracking-[0.04em] text-resume-deep uppercase">
                {group.label}
              </dt>
              {typeof group.items === "string" ? (
                <dd className="text-sm/normal text-ink-soft">{group.items}</dd>
              ) : (
                group.items.map((item) => (
                  <dd key={item.sub} className="text-sm/normal text-ink-soft">
                    <span className="mr-1.5 font-bold text-ink">
                      {item.sub}
                    </span>
                    {item.text}
                  </dd>
                ))
              )}
            </div>
          ))}
        </dl>
      </Card>

      <Card title="Projects">
        {projects.map((project, index) => (
          <Entry key={project.title} divided={index > 0}>
            <p className="font-bold text-ink">
              {project.title}{" "}
              <span className="font-medium text-ink-soft italic">
                — {project.stack}
              </span>
            </p>
            <Bullets items={project.bullets} />
          </Entry>
        ))}
      </Card>

      <Card title="Experience">
        {experience.map((job, index) => (
          <Entry key={job.org} divided={index > 0}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-medium tracking-wide text-ink-soft uppercase">
                  {job.org}
                </p>
                <p className="font-bold text-ink">{job.role}</p>
                {job.note && (
                  <p className="mt-1 text-xs text-ink-soft italic">
                    {job.note}
                  </p>
                )}
              </div>
              <p className="text-[13px] font-semibold whitespace-nowrap text-ink-soft">
                {job.dates}
              </p>
            </div>
            <Bullets items={job.bullets} />
          </Entry>
        ))}
      </Card>

      <Card title="Leadership & Activities" last>
        <p className="text-[13.5px] font-medium tracking-wide text-ink-soft uppercase">
          {leadership.org}
        </p>
        {leadership.roles.map((role, index) => (
          <Entry key={role.title} divided={index > 0}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="font-bold text-ink">{role.title}</p>
              <p className="text-[13px] font-semibold whitespace-nowrap text-ink-soft">
                {role.dates}
              </p>
            </div>
            {role.note && (
              <p className="mt-1 text-xs text-ink-soft italic">{role.note}</p>
            )}
            <Bullets items={role.bullets} />
          </Entry>
        ))}
      </Card>
    </PageShell>
  );
}

function ContactLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center gap-1.5 rounded-sm outline-none hover:text-ink focus-visible:ring-2 focus-visible:ring-resume-deep focus-visible:ring-offset-2 focus-visible:ring-offset-paper [&_svg]:size-4"
      >
        {icon}
        {children}
      </a>
    </li>
  );
}

function Card({
  title,
  last,
  children,
}: {
  title: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-xl border border-paper bg-surface px-5 py-4.5 shadow-card sm:px-8 sm:py-5.5 ${last ? "" : "mb-4"}`}
    >
      <h2 className="mb-3 font-display text-[19px] font-semibold tracking-tight text-resume-deep">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Successive entries inside a card are separated by a rule, not a gap. */
function Entry({
  divided,
  children,
}: {
  divided: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={divided ? "mt-4 border-t border-paper pt-4" : "mt-3"}>
      {children}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-1 list-disc space-y-1 pl-4 text-sm/normal text-ink-soft marker:text-resume-deep">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
