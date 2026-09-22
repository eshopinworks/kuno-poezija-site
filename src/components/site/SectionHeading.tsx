import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  overline,
  title,
  intro,
  className = "",
}: {
  overline: string;
  ornament?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`relative ${className}`}>
      <div className="flex items-center gap-3">
        <span className="h-px w-6 bg-accent/70 shrink-0" aria-hidden />
        <p className="text-[0.68rem] tracking-[0.22em] text-accent uppercase font-medium whitespace-nowrap">{overline}</p>
      </div>
      <h2 className="mt-3.5 max-w-2xl font-heading text-3xl leading-[1.18] text-foreground sm:text-4xl font-normal">
        {title}
      </h2>
      {intro ? <p className="mt-3.5 max-w-2xl text-base text-foreground/75 leading-relaxed font-light">{intro}</p> : null}
    </Reveal>
  );
}
