import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FALLBACK_PHOTOS, PHOTOS } from "./site-data";
import { Reveal, SmartImage } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const ALTS = [
  "Masažo kabinetas studijoje Kūno poezija",
  "Jauki masažo erdvė",
  "Masažo procedūros detalė",
  "Studijos interjeras",
  "Priemonės masažui",
];

function tileClass(index: number, total: number) {
  if (total === 5) {
    return index === 0
      ? "col-span-2 row-span-1 sm:col-span-1 sm:row-span-2"
      : "col-span-1 row-span-1";
  }
  return index === 0 ? "col-span-2 row-span-1" : "col-span-1 row-span-1";
}

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const total = PHOTOS.length;

  return (
    <section id="galerija" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          overline="Galerija"
          ornament="04"
          title={
            <>
              Mūsų <em className="font-heading italic text-accent">erdvė</em>
            </>
          }
          intro="Švari, šilta ir rami aplinka, kurioje viskas skirta jūsų atsipalaidavimui."
        />

        <Reveal delay={100}>
          <div className="mt-10 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[14rem]">
            {PHOTOS.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                className={`group relative overflow-hidden border border-border/80 bg-secondary shadow-2xs ${tileClass(i, total)}`}
                aria-label={`Atidaryti nuotrauką: ${ALTS[i] ?? "studijos nuotrauka"}`}
              >
                <SmartImage
                  src={src}
                  fallback={FALLBACK_PHOTOS[i] ?? FALLBACK_PHOTOS[0]!}
                  alt={ALTS[i] ?? "Studijos nuotrauka"}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Dialog open={active !== null} onOpenChange={() => setActive(null)}>
        <DialogContent className="max-w-3xl overflow-hidden border border-border/80 bg-background p-2 shadow-lg">
          <DialogTitle className="sr-only">Nuotrauka</DialogTitle>
          {active !== null && (
            <SmartImage
              src={PHOTOS[active]!}
              fallback={FALLBACK_PHOTOS[active] ?? FALLBACK_PHOTOS[0]!}
              alt={ALTS[active] ?? "Studijos nuotrauka"}
              className="w-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
