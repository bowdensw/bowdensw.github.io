import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ChannelList from "./components/ChannelList";
import ContactForm from "./components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Spencer Bowden about a position, a project, a show, or a gig.",
};

export default function ContactPage() {
  return (
    <PageShell width="full" className="md:py-16">
      <h1 className="inline-block border-b-[3px] border-contact pb-2.5 font-display text-display font-semibold">
        Contact
      </h1>
      <p className="mt-4 mb-10 text-base text-ink-soft">
        Reach out about a position, a project, a show, a gig, or anything in
        between.
      </p>

      <div className="grid items-stretch gap-8 md:grid-cols-[1fr_1.2fr] md:gap-12">
        <ChannelList />

        <section className="flex flex-col rounded-xl border border-paper bg-surface p-7 shadow-card sm:p-11">
          <h2 className="mb-7 font-display text-2xl font-semibold">
            Send a message
          </h2>
          <ContactForm />
        </section>
      </div>
    </PageShell>
  );
}
