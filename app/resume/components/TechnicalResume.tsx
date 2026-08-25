import { Download, Mail, Phone } from "lucide-react";
import { GithubIcon } from "@/components/icons/Brand";
import { buttonVariants } from "@/components/ui/button";
import {
  education,
  experience,
  leadership,
  profile,
  projects,
  skillGroups,
} from "../data/resume";
import {
  Bullets,
  Card,
  ContactLink,
  ContactRow,
  Dates,
  Entry,
  Note,
  OrgLine,
  toneOf,
} from "./paper";

const tone = "resume" as const;

/* The PDF used to be the page, in an <iframe> that iOS Safari refuses to
   render. It is now the download and this markup is the résumé. */
export default function TechnicalResume() {
  return (
    <>
      <header className="mb-8 flex flex-col items-center gap-4 text-center">
        <div>
          <h1 className={`${toneOf(tone).display} text-display font-semibold`}>
            {profile.name}
          </h1>
          <p className="mt-1 text-[13px] text-ink-soft">{profile.pronouns}</p>
        </div>

        <ContactRow>
          <ContactLink href={profile.github} icon={<GithubIcon />} tone={tone}>
            {profile.githubLabel}
          </ContactLink>
          <ContactLink
            href={`mailto:${profile.email}`}
            icon={<Mail />}
            tone={tone}
          >
            {profile.email}
          </ContactLink>
          <ContactLink href={profile.phoneHref} icon={<Phone />} tone={tone}>
            {profile.phone}
          </ContactLink>
        </ContactRow>

        <a
          href="/SWB_RESUME_Tech.pdf"
          download
          className={buttonVariants({ tone })}
        >
          <Download aria-hidden="true" />
          Download PDF
        </a>
      </header>

      <Card title="Education" tone={tone}>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div className="min-w-0 flex-1">
            <OrgLine>{education.school}</OrgLine>
            <p className="mt-0.5 text-sm/snug text-ink-soft">
              {education.degree}
            </p>
            <Note>{education.honors}</Note>
          </div>
          <Dates>{education.dates}</Dates>
        </div>
        <p className="mt-2.5 border-t border-paper pt-2.5 text-[13.5px]/[1.6] text-ink-soft">
          <span className="font-bold text-ink">Relevant coursework —</span>{" "}
          {education.coursework}
        </p>
      </Card>

      <Card title="Skills" tone={tone}>
        <dl className="grid gap-3 sm:grid-cols-2 sm:gap-x-8">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <dt
                className={`text-[12.5px] font-bold tracking-[0.04em] uppercase ${toneOf(tone).accent}`}
              >
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

      <Card title="Projects" tone={tone}>
        {projects.map((project, index) => (
          <Entry key={project.title} divided={index > 0}>
            <p className="font-bold text-ink">
              {project.title}{" "}
              <span className="font-medium text-ink-soft italic">
                — {project.stack}
              </span>
            </p>
            <Bullets items={project.bullets} tone={tone} />
          </Entry>
        ))}
      </Card>

      <Card title="Experience" tone={tone}>
        {experience.map((job, index) => (
          <Entry key={job.org} divided={index > 0}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div className="min-w-0 flex-1">
                <OrgLine>{job.org}</OrgLine>
                <p className="font-bold text-ink">{job.role}</p>
                {job.note && <Note>{job.note}</Note>}
              </div>
              <Dates>{job.dates}</Dates>
            </div>
            <Bullets items={job.bullets} tone={tone} />
          </Entry>
        ))}
      </Card>

      <Card title="Leadership & Activities" tone={tone} last>
        <OrgLine>{leadership.org}</OrgLine>
        {leadership.roles.map((role, index) => (
          <Entry key={role.title} divided={index > 0}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="font-bold text-ink">{role.title}</p>
              <Dates>{role.dates}</Dates>
            </div>
            {role.note && <Note>{role.note}</Note>}
            <Bullets items={role.bullets} tone={tone} />
          </Entry>
        ))}
      </Card>
    </>
  );
}
