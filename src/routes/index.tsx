import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Star, MapPin, Check, Heart, Shield, Award } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Booking } from "@/components/site/Booking";
import { VoucherSection } from "@/components/site/VoucherSection";
import { Gallery } from "@/components/site/Gallery";
import { Reviews } from "@/components/site/Reviews";
import { Contact } from "@/components/site/Contact";
import { Reveal, SmartImage } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FALLBACK_PHOTOS, PHOTOS, STUDIO, TREATMENTS } from "@/components/site/site-data";

const title = "Masažų studija Kūno poezija - masažai Klaipėdoje";
const description =
  "Profesionalūs kūno ir veido masažai Klaipėdos centre. Meistrė Kristina Jasevičiūtė. Dovanų kuponai, rezervacija internetu. 5,0 įvertinimas, 178 atsiliepimai.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: PHOTOS[0]! },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: PHOTOS[0]! },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const PRINCIPLES = [
  { title: "Natūralumas", desc: "Naudojami tik aukščiausios kokybės natūralūs aliejai ir priemonės." },
  { title: "Profesionalumas", desc: "Nuolatinis tobulinimasis, anatomijos ir kūno biomechanikos išmanymas." },
  { title: "Ramybė", desc: "Jauki, lėta aplinka H. Manto gatvėje, kurioje laikas sustoja." },
  { title: "Žmogaus kūnas", desc: "Pagarba kūno riboms, dėmesys raumenų įtampoms ir fascijų atpalaidavimui." },
  { title: "Individualus dėmesys", desc: "Kiekviena technika parenkama pagal konkretaus žmogaus poreikį." },
];

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background font-body text-foreground selection:bg-accent selection:text-accent-foreground">
      <Header />

      {/* Hero */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden">
        <SmartImage
          src={PHOTOS[0]!}
          fallback={FALLBACK_PHOTOS[0]!}
          alt="Masažų studijos Kūno poezija erdvė"
          loading="eager"
          className="animate-kenburns absolute inset-0 size-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(35,32,30,0.92)_0%,rgba(35,32,30,0.65)_35%,rgba(35,32,30,0.25)_65%,rgba(35,32,30,0.1)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(35,32,30,0.6)_0%,rgba(35,32,30,0.2)_55%,rgba(35,32,30,0)_100%)]"
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 pt-32 pb-20 lg:px-8 lg:pb-28">
          <p className="text-[0.68rem] tracking-[0.2em] text-accent uppercase font-medium">
            Masažų studija Klaipėdos centre · H. Manto g. 36A
          </p>

          <h1 className="mt-4 max-w-2xl font-heading text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Profesionalūs kūno ir veido masažai{" "}
            <em className="font-heading text-accent italic font-normal">Klaipėdoje</em>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed font-light">
            Jauki ramybės erdvė pačiame mieste. Masažus atlieka patyrusi meistrė Kristina Jasevičiūtė,
            skirianti gilų individualų dėmesį jūsų kūno savijautai.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#registracija"
              className="rounded-full bg-accent px-7 py-3.5 text-xs tracking-[0.12em] text-accent-foreground uppercase font-semibold hover:bg-accent/90 transition-all shadow-sm whitespace-nowrap"
            >
              Tiesioginė registracija
            </a>
            <a
              href="#registracija"
              className="rounded-full border border-white/80 px-7 py-3.5 text-xs tracking-[0.12em] text-white uppercase font-semibold hover:bg-white/15 transition-all whitespace-nowrap"
            >
              Dovanų kuponai
            </a>
            <a
              href="#masazai"
              className="rounded-full px-5 py-3.5 text-xs tracking-[0.12em] text-white/90 uppercase hover:text-white transition-all underline underline-offset-4 whitespace-nowrap"
            >
              Masažų sąrašas ↓
            </a>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/25 px-4 py-2 text-xs tracking-[0.12em] text-white uppercase backdrop-blur-xs whitespace-nowrap">
            <Star className="size-3.5 fill-current text-accent" />
            ★ {STUDIO.rating} įvertinimas · Treatwell (178 atsiliepimai)
          </div>
        </div>
      </section>

      {/* Architectural Trust Strip */}
      <div className="relative z-10 border-y border-border/80 bg-card py-5">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/60 text-xs tracking-[0.08em] uppercase text-foreground/85 font-medium">
            <div className="flex items-center justify-center gap-2.5 py-2.5 sm:py-0 sm:px-6">
              <Star className="size-4 shrink-0 fill-current text-accent" />
              <span className="whitespace-nowrap"><strong className="text-foreground">★ {STUDIO.rating}</strong> įvertinimas · Treatwell</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 py-2.5 sm:py-0 sm:px-6">
              <Sparkles className="size-4 shrink-0 text-accent" />
              <span className="whitespace-nowrap"><strong className="text-foreground">{STUDIO.reviewCount}</strong> klientų atsiliepimai</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 py-2.5 sm:py-0 sm:px-6">
              <MapPin className="size-4 shrink-0 text-accent" />
              <span className="whitespace-nowrap normal-case font-semibold text-foreground">{STUDIO.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Treatments List - Editorial Menu de Soins */}
      <section id="masazai" className="scroll-mt-24 bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeading
            overline="Paslaugų meniu"
            ornament="01"
            title={
              <>
                Atliekami <em className="font-heading italic text-accent font-normal">masažai</em>
              </>
            }
            intro="Kiekvienas masažas atliekamas su profesionaliu dėmesiu žmogaus kūnui, parinktas pagal jūsų poreikį ir siekiamą rezultatą."
          />

          <div className="mt-12 grid gap-x-14 gap-y-0 lg:grid-cols-2">
            {TREATMENTS.map((item, i) => (
              <Reveal key={item.id} delay={i * 40}>
                <article className="group border-b border-border/70 py-7 transition-colors hover:border-accent/80">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-heading text-xl sm:text-2xl text-foreground font-medium group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-baseline gap-2 shrink-0">
                      <span className="text-xs font-mono text-foreground/60 tracking-wider">
                        {item.duration}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1.5 text-sm text-foreground/80 leading-relaxed">
                    <p>
                      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50 mr-2">Kam tinka:</span>
                      {item.forWhom}
                    </p>
                    <p className="font-serif italic text-foreground/75 text-sm">
                      <span className="font-sans not-italic text-xs font-semibold uppercase tracking-wider text-accent mr-2">Pojūtis:</span>
                      {item.feeling}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      <a
                        href="#registracija"
                        className="rounded-full bg-foreground text-background px-4 py-1.5 text-xs font-semibold hover:bg-foreground/90 transition-all whitespace-nowrap shadow-2xs"
                      >
                        Registruotis
                      </a>
                      <a
                        href="#registracija"
                        className="rounded-full border border-border/80 bg-background px-4 py-1.5 text-xs font-medium text-foreground/80 hover:bg-secondary transition-all whitespace-nowrap"
                      >
                        Kuponas
                      </a>
                    </div>
                    <span className="text-[0.68rem] tracking-widest text-foreground/35 uppercase font-mono">
                      0{i + 1}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 border-t border-border/60 pt-6 text-center text-xs text-foreground/75 flex flex-wrap items-center justify-center gap-2">
            <span>Visus masažus atlieka meistrė Kristina Jasevičiūtė.</span>
            <span className="text-foreground/40 hidden sm:inline">·</span>
            <span>Rezervuotis galima ir per</span>
            <a href="#treatwell" className="text-accent underline underline-offset-4 hover:text-foreground font-medium whitespace-nowrap">
              Treatwell programėlę
            </a>
          </div>
        </div>
      </section>

      {/* About Specialist Kristina (Expanded based on feedback) */}
      <section id="apie" className="scroll-mt-24 bg-card py-20 sm:py-28 border-y border-border/60">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <SectionHeading
              overline="Apie meistrę"
              ornament="02"
              title={
                <>
                  Dėmesys žmogaus kūnui,{" "}
                  <em className="font-heading italic text-accent font-normal">žinios ir ramybė</em>
                </>
              }
            />
            <Reveal delay={80}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
                <blockquote className="font-serif text-lg sm:text-xl italic text-foreground/90 border-l-2 border-accent pl-5 py-1">
                  „Mano tikslas - ne tiesiog atlikti procedūrą ar standartinį masažą, o pajusti žmogaus kūną,
                  įsiklausyti į esamą būklę ir parinkti individualų prisilietimą, kuris atkuria pusiausvyrą.“
                </blockquote>
                <p>
                  Masažus atlieka patyrusi meistrė <strong>Kristina Jasevičiūtė</strong>. Esu sukaupusi gilią įvairių
                  masažo technikų patirtį: nuo tonizuojančio sportinio bei giliojo audinių masažo iki švelnaus
                  limfodrenažo, terapinio raumenų atpalaidavimo ir meditatyvaus havajietiško Lomi Lomi Nui.
                </p>
                <p>
                  Nuolat mokausi ir gilinuosi į žmogaus anatomiją, raumenų grandines bei kūno biomechaniką.
                  Tikiu, kad kiekvienas kūnas pasakoja savo istoriją, todėl seansas visada prasideda nuo jūsų
                  savijautos išklausymo ir technikos pritaikymo būtent tai dienai.
                </p>
              </div>

              {/* Guiding Principles - Architectural Numbered List */}
              <div className="mt-10 border-t border-border/70 pt-8">
                <p className="text-xs tracking-[0.18em] text-foreground/60 uppercase font-semibold mb-6">
                  Veiklos filosofija ir darbo principai:
                </p>
                <div className="space-y-4">
                  {PRINCIPLES.map((p, idx) => (
                    <div key={p.title} className="flex items-baseline gap-4 border-b border-border/40 pb-3">
                      <span className="font-mono text-xs text-accent font-semibold shrink-0">
                        0{idx + 1}
                      </span>
                      <div className="text-sm">
                        <strong className="font-heading text-base font-medium text-foreground mr-2">
                          {p.title}:
                        </strong>
                        <span className="text-foreground/75 leading-relaxed">
                          {p.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#registracija"
                  className="rounded-full bg-foreground text-background px-8 py-3.5 text-xs tracking-[0.12em] uppercase font-semibold hover:bg-foreground/90 transition-all shadow-xs whitespace-nowrap"
                >
                  Tiesioginė registracija
                </a>
                <a
                  href="#registracija"
                  className="rounded-full border border-border/80 bg-background px-8 py-3.5 text-xs tracking-[0.12em] uppercase font-semibold text-foreground hover:bg-secondary transition-all whitespace-nowrap"
                >
                  Užsakyti dovanų kuponą
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal delay={120}>
              <div className="relative">
                <div className="relative overflow-hidden aspect-[3/4] rounded-2xl border border-border/80 bg-background shadow-sm">
                  <SmartImage
                    src={STUDIO.specialistPhoto}
                    fallback={PHOTOS[1]!}
                    alt="Masažų specialistė Kristina Jasevičiūtė"
                    className="size-full object-cover grayscale-[8%] contrast-[1.03]"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/85 via-black/45 to-transparent p-6 text-white">
                    <p className="rounded-full inline-block bg-accent/25 px-3 py-0.5 text-xs tracking-[0.15em] uppercase text-accent font-semibold mb-1">
                      Meistrė
                    </p>
                    <p className="font-heading text-2xl font-medium">Kristina Jasevičiūtė</p>
                    <p className="text-xs text-white/80 mt-1">Kūno terapijos ir masažų praktika Klaipėdoje</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gift Vouchers & Direct Reservation */}
      <VoucherSection />

      {/* Treatwell Online Booking */}
      <Booking />

      {/* Gallery */}
      <Gallery />

      {/* Reviews */}
      <Reviews />

      {/* Contact & Map */}
      <Contact />
    </div>
  );
}
