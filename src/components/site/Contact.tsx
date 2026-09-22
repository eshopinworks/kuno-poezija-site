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
          ornament="07"
          title={
            <>
              Kur mus <em className="font-heading italic text-accent font-normal">rasite</em>
            </>
          }
          intro="Masažų studija įsikūrusi patogioje vietoje Klaipėdos centre. Maloniai kviečiame apsilankyti."
        />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="rounded-2xl border border-border/80 bg-card p-7 sm:p-9 shadow-sm">
              <ul className="divide-y divide-border/50">
                <li className="pb-5 flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                    <MapPin className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.7rem] tracking-[0.16em] text-foreground/50 uppercase font-medium">
                      Adresas
                    </p>
                    <p className="mt-1 text-base text-foreground font-semibold">{STUDIO.address}</p>
                    <p className="text-xs text-foreground/60 mt-0.5">Klaipėdos centras · 2 aukštas · Patogus privažiavimas</p>
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
                        className="text-base font-semibold text-foreground underline-offset-4 hover:underline whitespace-nowrap"
                      >
                        {STUDIO.phoneLabel}
                      </a>
                      <span className="text-foreground/40 font-light">/</span>
                      <a
                        href={`tel:${STUDIO.phone2}`}
                        className="text-base font-semibold text-foreground underline-offset-4 hover:underline whitespace-nowrap"
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
                      className="mt-1 block text-base text-foreground underline-offset-4 hover:underline whitespace-nowrap"
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
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("select-service", { detail: { tab: "booking" } })
                    )
                  }
                  className="rounded-full bg-foreground text-background px-7 py-3 text-xs tracking-[0.15em] uppercase font-semibold hover:bg-foreground/90 transition-colors shadow-xs whitespace-nowrap"
                >
                  Tiesioginė registracija
                </a>
                <a
                  href="#kuponai"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("select-service", { detail: { tab: "voucher" } })
                    )
                  }
                  className="rounded-full border border-foreground/30 px-7 py-3 text-xs tracking-[0.15em] text-foreground uppercase font-semibold hover:bg-secondary transition-colors whitespace-nowrap"
                >
                  Dovanų kuponai
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-6 h-full">
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm h-full min-h-[420px]">
              <iframe
                title="Studijos vieta žemėlapyje"
                loading="lazy"
                src="https://www.google.com/maps?q=55.7168577,21.12900324&z=16&output=embed"
                style={{ border: 0, width: "100%", height: "100%", minHeight: "420px" }}
                className="block w-full"
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
