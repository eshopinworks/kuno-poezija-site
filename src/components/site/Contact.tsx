import { Clock, MapPin, Phone, Mail, Globe } from "lucide-react";
import { Reveal } from "./Reveal";
import { STUDIO } from "./site-data";
import { SectionHeading } from "./SectionHeading";

const HOURS = [
  { days: "I, III", time: "Nedirbame" },
  { days: "II, IV-VII", time: "08:00-21:00" },
];

export function Contact() {
  return (
    <section id="kontaktai" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          overline="Kontaktai"
          ornament="05"
          title={
            <>
              Kur mus <em className="font-heading italic text-accent">rasite</em>
            </>
          }
        />

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-border/80 bg-card p-7 shadow-xs sm:p-8">
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                    <MapPin className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.7rem] tracking-[0.15em] text-foreground/60 uppercase">
                      Adresas
                    </p>
                    <p className="mt-1 text-base text-foreground font-medium">{STUDIO.address}</p>
                    <p className="text-xs text-foreground/60 mt-0.5">Klaipėdos centras, patogus privažiavimas</p>
                  </div>
                </li>

                <li className="flex gap-4 border-t border-border/50 pt-6">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                    <Clock className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.7rem] tracking-[0.15em] text-foreground/60 uppercase">
                      Darbo laikas
                    </p>
                    <ul className="mt-2 space-y-1.5 text-base text-foreground/80">
                      {HOURS.map((h) => (
                        <li key={h.days} className="flex items-baseline gap-3">
                          <span className="w-24 shrink-0 text-xs tracking-[0.12em] text-foreground/60 uppercase font-medium">
                            {h.days}
                          </span>
                          <span className="text-foreground">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                <li className="flex gap-4 border-t border-border/50 pt-6">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                    <Phone className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.7rem] tracking-[0.15em] text-foreground/60 uppercase">
                      Telefonas
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <a
                        href={`tel:${STUDIO.phone}`}
                        className="text-base font-semibold text-foreground underline-offset-4 hover:underline"
                      >
                        {STUDIO.phoneLabel}
                      </a>
                      <span className="text-foreground/40 font-light">/</span>
                      <a
                        href={`tel:${STUDIO.phone2}`}
                        className="text-base font-semibold text-foreground underline-offset-4 hover:underline"
                      >
                        {STUDIO.phone2Label}
                      </a>
                    </div>
                  </div>
                </li>

                <li className="flex gap-4 border-t border-border/50 pt-6">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                    <Mail className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.7rem] tracking-[0.15em] text-foreground/60 uppercase">
                      El. paštas
                    </p>
                    <a
                      href={`mailto:${STUDIO.email}`}
                      className="mt-1 block text-base text-foreground underline-offset-4 hover:underline"
                    >
                      {STUDIO.email}
                    </a>
                  </div>
                </li>

                <li className="flex gap-4 border-t border-border/50 pt-6">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                    <Globe className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.7rem] tracking-[0.15em] text-foreground/60 uppercase">
                      Socialiniai tinklai
                    </p>
                    <a
                      href={STUDIO.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-base font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      Facebook: Masažų studija kūno poezija ↗
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#registracija"
                  className="rounded-lg bg-foreground text-background px-6 py-3 text-xs tracking-[0.15em] uppercase font-semibold hover:bg-foreground/90 transition-colors shadow-xs"
                >
                  Tiesioginė registracija
                </a>
                <a
                  href="#registracija"
                  className="rounded-lg border border-foreground/30 px-6 py-3 text-xs tracking-[0.15em] text-foreground uppercase font-semibold hover:bg-secondary transition-colors"
                >
                  Dovanų kuponai
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="overflow-hidden rounded-2xl border border-border/70 shadow-xs">
              <iframe
                title="Studijos vieta žemėlapyje"
                loading="lazy"
                src="https://www.google.com/maps?q=55.7168577,21.12900324&z=16&output=embed"
                style={{ border: 0, width: "100%" }}
                className="block h-[380px] sm:h-[450px]"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="mx-auto mt-16 max-w-6xl border-t border-border/60 px-5 pt-8 text-xs text-foreground/60 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} {STUDIO.name} · Kristina Jasevičiūtė</span>
        <span>H. Manto g. 36A, Klaipėda · Tel. {STUDIO.phoneLabel} / {STUDIO.phone2Label}</span>
      </footer>
    </section>
  );
}
