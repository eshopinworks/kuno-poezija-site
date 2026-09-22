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
    <span className="grid size-8 shrink-0 place-items-center border border-accent/40 bg-accent/15 font-heading text-xs text-accent-foreground font-bold">
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
          ornament="✦"
          title={
            <>
              ★ {STUDIO.rating} · {STUDIO.reviewCount} atsiliepimai per{" "}
              <em className="font-heading italic text-accent font-normal">Treatwell</em>
            </>
          }
          intro="Mūsų klientų įvertinimai ir nuoširdūs patyrimai po apsilankymo."
        />

        <div className="mt-12 grid items-start gap-4 sm:gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <figure className="relative overflow-hidden border border-border/80 bg-card p-8 shadow-xs sm:p-10">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-10 right-4 font-heading text-[10rem] leading-none text-accent/10 select-none sm:text-[13rem]"
              >
                &rdquo;
              </span>
              <blockquote className="relative font-heading text-xl leading-snug text-foreground sm:text-2xl font-normal">
                "{featured?.text}"
              </blockquote>
              <figcaption className="relative mt-6 flex items-center gap-3 border-t border-border/50 pt-4">
                <Avatar name={featured?.name ?? ""} />
                <span className="text-xs tracking-[0.15em] text-foreground/80 uppercase font-semibold">
                  {featured?.name}
                </span>
                <Stars />
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid gap-4 lg:col-span-2">
            {rest.slice(0, 2).map((review, i) => (
              <SmallReview key={review.name} review={review} index={i} />
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
            {rest.slice(2).map((review, i) => (
              <SmallReview key={review.name} review={review} index={i + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SmallReview({
  review,
  index,
}: {
  review: { name: string; text: string };
  index: number;
}) {
  return (
    <Reveal delay={80 * (index + 1)} className="h-full">
      <figure
        className={`flex h-full flex-col border border-border/80 p-6 transition-all duration-300 hover:border-foreground/30 ${
          index % 2 === 0 ? "bg-card" : "bg-card/70"
        }`}
      >
        <blockquote className="flex-1 text-sm leading-relaxed text-foreground/85">
          "{review.text}"
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3 border-t border-border/50 pt-4">
          <Avatar name={review.name} />
          <span className="text-xs tracking-[0.12em] text-foreground/70 uppercase font-medium">
            {review.name}
          </span>
          <Stars />
        </figcaption>
      </figure>
    </Reveal>
  );
}
