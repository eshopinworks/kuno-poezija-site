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
          ornament="05"
          title={
            <>
              Mūsų <em className="font-heading italic text-accent font-normal">erdvė</em>
            </>
          }
          intro="Švari, šilta ir rami aplinka Klaipėdos centre, kurioje viskas skirta Jūsų atsipalaidavimui."
        />

        <Reveal delay={100}>
          <div className="mt-12 grid auto-rows-[12rem] grid-cols-2 gap-3 sm:auto-rows-[15rem] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[18rem]">
            {PHOTOS.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                className={`group relative overflow-hidden rounded-2xl border border-border/80 bg-secondary shadow-2xs ${tileClass(i, total)} cursor-pointer`}
                aria-label={`Atidaryti nuotrauką: ${ALTS[i] ?? "studijos nuotrauka"}`}
              >
                <SmartImage
                  src={src}
                  fallback={FALLBACK_PHOTOS[i] ?? FALLBACK_PHOTOS[0]!}
                  alt={ALTS[i] ?? "Studijos nuotrauka"}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
                  <span className="text-xs text-white/95 font-medium tracking-wide">
                    {ALTS[i]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Dialog open={active !== null} onOpenChange={() => setActive(null)}>
        <DialogContent className="max-w-3xl overflow-hidden rounded-2xl border border-border/80 bg-background p-3 shadow-xl">
          <DialogTitle className="sr-only">Nuotrauka</DialogTitle>
          {active !== null && (
            <SmartImage
              src={PHOTOS[active]!}
              fallback={FALLBACK_PHOTOS[active] ?? FALLBACK_PHOTOS[0]!}
              alt={ALTS[active] ?? "Studijos nuotrauka"}
              className="w-full rounded-xl object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
