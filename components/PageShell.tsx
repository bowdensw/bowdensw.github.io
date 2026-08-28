import { cn } from "@/lib/utils";

/**
 * Centred page column. The single place page rhythm (max width, gutters,
 * vertical padding) is defined, so the five routes stay in step.
 */
const widths = {
  narrow: "max-w-[760px]", // résumé
  wide: "max-w-[1080px]", // landing, musical
  full: "max-w-[1160px]", // contact
  xwide: "max-w-[1280px]", // technical: the skill tree needs the lane room
} as const;

type Props = {
  width?: keyof typeof widths;
  className?: string;
  children: React.ReactNode;
};

export default function PageShell({
  width = "wide",
  className,
  children,
}: Props) {
  return (
    <main
      className={cn(
        "mx-auto w-full px-4 py-12 sm:px-6 md:px-8 md:py-16",
        widths[width],
        className,
      )}
    >
      {children}
    </main>
  );
}
