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

      {/* Trust bar */}
      <div className="relative z-10 mx-auto -mt-8 max-w-5xl px-5 sm:-mt-10 lg:px-8">
        <div className="rounded-full border border-border/80 bg-card/95 px-6 py-3.5 shadow-sm backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-y-2 gap-x-6 text-xs tracking-[0.08em] uppercase text-foreground/85 font-medium">
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <Star className="size-4 shrink-0 fill-current text-accent" />
              <strong>★ {STUDIO.rating}</strong> įvertinimas
            </span>
            <span aria-hidden className="hidden sm:block h-3.5 w-px bg-border/80" />
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <Sparkles className="size-4 shrink-0 text-accent" />
              <strong>{STUDIO.reviewCount}</strong> atsiliepimai
            </span>
            <span aria-hidden className="hidden sm:block h-3.5 w-px bg-border/80" />
            <span className="inline-flex min-w-0 items-center gap-2 whitespace-nowrap">
              <MapPin className="size-4 shrink-0 text-accent" />
              <span className="normal-case">{STUDIO.address}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Treatments List (All 8 requested) */}
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

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TREATMENTS.map((item, i) => (
              <Reveal key={item.id} delay={i * 50} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 transition-all duration-300 hover:border-accent/60 hover:shadow-md">
                  <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-3.5">
                    <span className="rounded-full bg-accent/15 px-3 py-1 text-[0.68rem] tracking-[0.12em] text-accent uppercase font-bold whitespace-nowrap">
                      {item.duration}
                    </span>
                    <span className="rounded-full bg-secondary/80 px-3 py-1 text-xs font-bold text-foreground whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-xl text-foreground font-semibold">
                    {item.title}
                  </h3>

                  <div className="mt-3.5 space-y-3 flex-1 text-sm text-foreground/80 leading-relaxed">
                    <div>
                      <p className="text-[0.68rem] tracking-[0.12em] uppercase font-bold text-foreground/50">Kam skirtas:</p>
                      <p className="mt-1">{item.forWhom}</p>
                    </div>
                    <div>
                      <p className="text-[0.68rem] tracking-[0.12em] uppercase font-bold text-accent">Pojūtis:</p>
                      <p className="mt-1 italic text-foreground/75 font-serif">{item.feeling}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between gap-2">
                    <a
                      href="#registracija"
                      className="rounded-full bg-foreground text-background px-4 py-2 text-xs font-semibold hover:bg-foreground/90 transition-all whitespace-nowrap shadow-2xs"
                    >
                      Registruotis
                    </a>
                    <a
                      href="#registracija"
                      className="rounded-full border border-border/80 bg-background px-3.5 py-2 text-xs font-medium text-foreground/80 hover:bg-secondary transition-all whitespace-nowrap"
                    >
                      Kuponas
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 rounded-full border border-border/60 bg-card/80 py-3.5 px-6 text-center text-xs text-foreground/75 shadow-2xs max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-1.5">
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
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <SectionHeading
              overline="Apie meistrę"
              ornament="✦"
              title={
                <>
                  Dėmesys žmogaus kūnui,{" "}
                  <em className="font-heading italic text-accent font-normal">žinios ir ramybė</em>
                </>
              }
            />
            <Reveal delay={80}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
                <p className="font-serif text-lg italic text-foreground/90 border-l-2 border-accent pl-4">
                  „Mano tikslas - ne tiesiog atlikti procedūrą ar standartinį masažą, o pajusti žmogaus kūną,
                  įsiklausyti į esamą būklę ir parinkti individualų prisilietimą, kuris atkuria pusiausvyrą.“
                </p>
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

              {/* Guiding Principles */}
              <div className="mt-8 border-t border-border/60 pt-6">
                <p className="text-xs tracking-[0.15em] text-foreground/60 uppercase font-semibold mb-4">
                  Veiklos filosofija ir darbo principai:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {PRINCIPLES.map((p) => (
                    <div key={p.title} className="flex items-start gap-2.5 rounded-xl border border-border/40 bg-background/50 p-2.5">
                      <Check className="size-4 shrink-0 text-accent mt-0.5" />
                      <div>
                        <strong className="text-sm font-semibold text-foreground">{p.title}:</strong>
                        <span className="text-xs text-foreground/75 ml-1">{p.desc}</span>
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

          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="rounded-2xl border border-border/80 p-2.5 bg-background shadow-xs">
                <div className="relative overflow-hidden aspect-[3/4] rounded-xl">
                  <SmartImage
                    src={STUDIO.specialistPhoto}
                    fallback={PHOTOS[1]!}
                    alt="Masažų specialistė Kristina Jasevičiūtė"
                    className="size-full object-cover grayscale-[10%] contrast-[1.03]"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/85 via-black/45 to-transparent p-6 text-white">
                    <p className="rounded-full inline-block bg-accent/20 px-3 py-0.5 text-xs tracking-[0.15em] uppercase text-accent font-semibold mb-1">
                      Specialistė
                    </p>
                    <p className="font-heading text-xl font-medium">Kristina Jasevičiūtė</p>
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
