import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The site's button. shadcn's scaffold shipped this wired to its own neutral
 * `--primary` palette and a `transition-all`; both are project hard rules, so
 * the variants below are rebuilt on the real tokens instead. Section colour
 * arrives through `tone`. See docs/REVAMP-SPEC.md §3.
 *
 * `buttonVariants` is exported so a next/link can wear the same clothes:
 *   <Link href="/resume" className={buttonVariants({ tone: "resume" })}>
 */
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-semibold whitespace-nowrap outline-none select-none " +
    "transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 " +
    "focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      /* Ink on accent, everywhere. Every accent clears AA against --ink, and
         white does not clear it against --music or --resume. */
      tone: {
        tech: "focus-visible:ring-tech",
        music: "focus-visible:ring-music-deep",
        resume: "focus-visible:ring-resume-deep",
        contact: "focus-visible:ring-contact-deep",
      },
      variant: {
        solid: "text-ink",
        outline: "border bg-transparent",
      },
      size: {
        default: "px-5 py-3",
        sm: "px-4 py-2.5 text-[13px]",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        tone: "tech",
        class: "bg-tech shadow-[0_4px_12px] shadow-tech/25",
      },
      {
        variant: "solid",
        tone: "music",
        class: "bg-music shadow-[0_4px_12px] shadow-music-deep/25",
      },
      {
        variant: "solid",
        tone: "resume",
        class: "bg-resume shadow-[0_4px_12px] shadow-resume-deep/30",
      },
      {
        variant: "solid",
        tone: "contact",
        class: "bg-contact shadow-[0_4px_12px] shadow-contact-deep/30",
      },
      {
        variant: "outline",
        tone: "tech",
        class: "border-tech text-tech hover:bg-tech/10",
      },
      {
        variant: "outline",
        tone: "music",
        class: "border-music text-music-deep hover:bg-music/10",
      },
      {
        variant: "outline",
        tone: "resume",
        class: "border-resume text-resume-deep hover:bg-resume/15",
      },
      {
        variant: "outline",
        tone: "contact",
        class: "border-contact text-contact-deep hover:bg-contact/10",
      },
    ],
    defaultVariants: { tone: "tech", variant: "solid", size: "default" },
  },
);

type Props = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

function Button({ className, tone, variant, size, ...props }: Props) {
  return (
    <button
      className={cn(buttonVariants({ tone, variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
