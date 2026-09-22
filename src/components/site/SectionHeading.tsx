import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  overline,
  ornament,
  title,
  intro,
  className = "",
  align = "left",
}: {
  overline: string;
  ornament?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`relative ${className}`}>
      {/* Background Watermark Numeral */}
      {ornament && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-8 left-0 sm:-top-12 sm:left-1 font-heading text-8xl sm:text-[10rem] font-extralight tracking-tighter text-foreground/[0.04] select-none leading-none z-0"
        >
          {ornament}
        </span>
      )}

      <div className={`relative z-10 ${align === "center" ? "text-center mx-auto" : ""}`}>
        <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-accent/80 shrink-0" aria-hidden />
          <p className="text-[0.68rem] tracking-[0.24em] text-accent uppercase font-medium whitespace-nowrap">
            {overline}
          </p>
          {ornament && (
            <span className="text-[0.68rem] tracking-[0.16em] text-foreground/35 font-mono">
              / {ornament}
            </span>
          )}
        </div>

        <h2 className={`mt-3 max-w-2xl font-heading text-3xl leading-[1.16] text-foreground sm:text-4xl lg:text-5xl font-normal ${
          align === "center" ? "mx-auto" : ""
        }`}>
          {title}
        </h2>

        {intro ? (
          <p className={`mt-3.5 max-w-2xl text-base text-foreground/75 leading-relaxed font-light ${
            align === "center" ? "mx-auto" : ""
          }`}>
            {intro}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
