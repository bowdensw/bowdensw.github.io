import { Download, Link2, Mail, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  creditGroups,
  engagements,
  leadership,
  profile,
  specialSkills,
  summary,
  training,
} from "../data/musical";
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

const tone = "music" as const;

/* Fixed tracks rather than `auto`: the group heading and its rows are separate
   grid containers, so an `auto` column resolves to a different width in each
   and the columns drift apart — the same trap as musical/components/Credits. */
const columns = "sm:grid-cols-[1.5fr_64px_1.75fr_2fr]";

/* Training, then credits, engagements, and leadership — the order of
   public/SWB_RESUME_Musical.pdf. The two are the same document; reorder one and
   reorder the other. */
export default function MusicalResume() {
  return (
    <>
      <header className="mb-8 flex flex-col items-center gap-4 text-center">
        <div>
          <h1 className={`${toneOf(tone).display} text-display font-semibold`}>
            {profile.name}
          </h1>
          <p className="mt-1.5 text-[13px] tracking-[0.12em] text-ink-soft uppercase">
            {profile.title}
          </p>
        </div>

        <ContactRow>
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
          <ContactLink href={profile.siteHref} icon={<Link2 />} tone={tone}>
            {profile.site}
          </ContactLink>
        </ContactRow>

        <p className="max-w-[620px] text-[14.5px]/[1.7] text-ink-soft">
          {summary}
        </p>

        <a
          href="/SWB_RESUME_Musical.pdf"
          download
          className={buttonVariants({ tone })}
        >
          <Download aria-hidden="true" />
          Download PDF
        </a>
      </header>

      <Card title="Education & Training" tone={tone}>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div className="min-w-0 flex-1">
            <OrgLine>{training.school}</OrgLine>
            <p className="mt-0.5 text-sm/snug text-ink-soft">
              {training.degree}
            </p>
          </div>
          <Dates>{training.dates}</Dates>
        </div>

        <dl className="mt-2.5 grid gap-1 border-t border-paper pt-2.5 text-[13.5px]/[1.6] text-ink-soft sm:grid-cols-2 sm:gap-x-8">
          {training.study.map((teacher) => (
            <div key={teacher.sub}>
              <dt className="inline font-bold text-ink">{teacher.sub} —</dt>{" "}
              <dd className="inline">{teacher.text}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-2.5 border-t border-paper pt-2.5 text-[13.5px]/[1.6] text-ink-soft">
          <span className="font-bold text-ink">Special skills —</span>{" "}
          {specialSkills}
        </p>
      </Card>

      <Card title="Credits" tone={tone}>
        {creditGroups.map((group, index) => (
          <Entry key={group.label} divided={index > 0}>
            <p
              className={`text-[12.5px] font-bold tracking-[0.04em] uppercase ${toneOf(tone).accent}`}
            >
              {group.label}
            </p>

            <ul className="mt-1.5">
              {group.credits.map((credit) => (
                /* items-start, not items-baseline: a two-line production title
                   must still line up with the top of its role and company. */
                <li
                  key={`${credit.title} ${credit.year}`}
                  className={`grid items-start gap-0.5 border-b border-paper py-2 last:border-0 last:pb-0 sm:gap-4 ${columns}`}
                >
                  <span
                    className={`text-[16px]/[1.3] font-semibold text-ink sm:text-[15px] ${toneOf(tone).display}`}
                  >
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
                    <span className="block text-[12.5px] text-ink-soft italic">
                      {credit.lead}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Entry>
        ))}
      </Card>

      <Card title="Engagements & Teaching" tone={tone}>
        <ul className="mt-1">
          {engagements.map((job) => (
            <li
              key={job.role}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-paper py-2.5 last:border-0 last:pb-0"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink">{job.role}</p>
                <p className="text-[13px] text-ink-soft">
                  {job.organization}
                  {job.lead && <span className="italic"> · {job.lead}</span>}
                </p>
              </div>
              {job.dates && <Dates>{job.dates}</Dates>}
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Leadership" tone={tone} last>
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
