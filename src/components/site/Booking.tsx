import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { Reveal } from "./Reveal";
import { STUDIO } from "./site-data";

export function Booking() {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <section id="treatwell" className="scroll-mt-24 bg-cream/70 py-12 sm:py-16 border-b border-border/60">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Reveal>
          <div className="rounded-2xl border border-border/80 bg-background p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-1.5">
                <span className="text-[0.68rem] tracking-[0.16em] uppercase font-bold text-accent">
                  Alternatyvus būdas
                </span>
                <h3 className="font-heading text-xl sm:text-2xl text-foreground font-semibold">
                  Rezervacija per Treatwell sistemą
                </h3>
                <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed max-w-xl">
                  Jei esate įpratę naudotis Treatwell programėle, galite patogiai pasirinkti laiką ir per ją.
                  Rekomenduojame tiesioginę registraciją viršuje be papildomų tarpininkų antkainių.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-2.5 shrink-0">
                <a
                  href={STUDIO.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-foreground/30 bg-card px-5 py-3 text-xs tracking-[0.12em] uppercase font-semibold text-foreground hover:bg-secondary transition-all shadow-2xs"
                >
                  Atverti Treatwell
                  <ExternalLink className="size-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setShowEmbed(!showEmbed)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border/80 px-4 py-2.5 text-xs font-medium text-foreground/70 hover:text-foreground hover:bg-card transition-all"
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
