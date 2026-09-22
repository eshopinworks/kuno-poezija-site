import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  overline,
  ornament,
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
      {ornament ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-8 -left-2 font-heading text-[7rem] leading-none text-accent/10 select-none sm:-top-12 sm:text-[9rem]"
        >
          {ornament}
        </span>
      ) : null}
      <div className="relative">
        <p className="text-[0.7rem] tracking-[0.15em] text-accent uppercase">{overline}</p>
        <span aria-hidden className="mt-3 block h-px w-12 bg-accent/60" />
        <h2 className="mt-4 max-w-2xl font-heading text-3xl leading-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {intro ? <p className="mt-4 max-w-xl text-base text-foreground/70">{intro}</p> : null}
      </div>
    </Reveal>
  );
}
