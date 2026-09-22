import { Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { REVIEWS, STUDIO } from "./site-data";
import { SectionHeading } from "./SectionHeading";

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex shrink-0 gap-0.5 text-accent ${className}`} aria-label="5 iš 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="size-3.5 fill-current" />
      ))}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/15 font-heading text-xs text-accent-foreground font-bold">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

export function Reviews() {
  const [featured, ...rest] = REVIEWS;

  return (
    <section id="atsiliepimai" className="scroll-mt-24 bg-blush py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          overline="Klientų atsiliepimai"
          ornament="06"
          title={
            <>
              ★ {STUDIO.rating} · {STUDIO.reviewCount} atsiliepimai per{" "}
              <em className="font-heading italic text-accent font-normal">Treatwell</em>
            </>
          }
          intro="Mūsų klientų įvertinimai ir nuoširdūs patyrimai po apsilankymo."
        />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-12">
          {/* Featured Testimonial */}
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
            <figure className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-8 sm:p-10 shadow-sm flex flex-col justify-between h-full">
              <div className="space-y-5">
                <Stars className="scale-110 origin-left" />
                <blockquote className="font-heading text-2xl leading-snug text-foreground font-normal">
                  "{featured?.text}"
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-center justify-between gap-3 border-t border-border/50 pt-5">
                <div className="flex items-center gap-3">
                  <Avatar name={featured?.name ?? ""} />
                  <div>
                    <span className="block text-xs tracking-[0.15em] text-foreground uppercase font-semibold whitespace-nowrap">
                      {featured?.name}
                    </span>
                    <span className="text-[0.68rem] text-foreground/50">Patvirtintas vizitas · Treatwell</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-accent font-semibold">5.0 / 5.0</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Testimonial List with Hairline Dividers */}
          <div className="lg:col-span-7 divide-y divide-border/60">
            {rest.map((review, i) => (
              <Reveal key={review.name} delay={60 * (i + 1)}>
                <article className="py-6 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={review.name} />
                      <div>
                        <span className="text-xs tracking-[0.12em] text-foreground uppercase font-semibold whitespace-nowrap">
                          {review.name}
                        </span>
                        <span className="block text-[0.65rem] text-foreground/50">Apsilankymas studijoje</span>
                      </div>
                    </div>
                    <Stars />
                  </div>
                  <blockquote className="mt-2 text-sm leading-relaxed text-foreground/80 pl-11">
                    "{review.text}"
                  </blockquote>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
