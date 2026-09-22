import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { Reveal } from "./Reveal";
import { STUDIO } from "./site-data";

export function Booking() {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <section id="treatwell" className="scroll-mt-24 bg-cream/70 py-16 sm:py-24 border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-background p-8 sm:p-12 shadow-xs">
            {/* Background Watermark Numeral */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-8 -right-4 font-heading text-8xl sm:text-[10rem] font-extralight tracking-tighter text-foreground/[0.03] select-none leading-none z-0"
            >
              04
            </span>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-accent/80 shrink-0" aria-hidden />
                  <span className="text-[0.68rem] tracking-[0.24em] uppercase font-medium text-accent">
                    Alternatyvus būdas
                  </span>
                  <span className="text-[0.68rem] tracking-[0.16em] text-foreground/35 font-mono">
                    / 04
                  </span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl text-foreground font-normal">
                  Rezervacija per <em className="font-heading italic text-accent font-normal">Treatwell</em> sistemą
                </h3>
                <p className="text-sm text-foreground/75 leading-relaxed pt-1">
                  Jei esate įpratę naudotis Treatwell programėle, galite patogiai pasirinkti procedūros laiką ir per šią sistemą.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-stretch gap-3 shrink-0">
                <a
                  href={STUDIO.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/30 bg-card px-7 py-3.5 text-xs tracking-[0.12em] uppercase font-semibold text-foreground hover:bg-secondary transition-all shadow-2xs whitespace-nowrap"
                >
                  Atverti Treatwell
                  <ExternalLink className="size-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setShowEmbed(!showEmbed)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border/80 px-6 py-3 text-xs font-medium text-foreground/70 hover:text-foreground hover:bg-card transition-all whitespace-nowrap"
                >
                  <Calendar className="size-3.5" />
                  {showEmbed ? (
                    <>
                      Slėpti kalendorių
                      <ChevronUp className="size-3.5" />
                    </>
                  ) : (
                    <>
                      Rodyti kalendorių puslapyje
                      <ChevronDown className="size-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {showEmbed && (
              <div className="mt-8 overflow-hidden rounded-xl border border-border/80 bg-background shadow-xs">
                <iframe
                  src={STUDIO.bookingEmbedUrl}
                  style={{ border: 0, width: "100%" }}
                  title="Rezervacija per Treatwell"
                  loading="lazy"
                  className="block h-[540px] w-full sm:h-[620px]"
                />
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
