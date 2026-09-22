import { Reveal } from "./Reveal";
import { STUDIO } from "./site-data";
import { SectionHeading } from "./SectionHeading";

export function Booking() {
  return (
    <section id="paslaugos" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          overline="Rezervacija"
          ornament="02"
          title="Rezervuokite laiką internetu"
          intro="Pasirinkite patogią dieną ir valandą tiesioginėje Treatwell sistemoje arba užpildykite užklausą dovanų kuponui žemiau."
        />

        <Reveal delay={100}>
          <div className="mt-10 overflow-hidden border border-border/80 bg-background shadow-xs">
            <iframe
              src={STUDIO.bookingEmbedUrl}
              style={{ border: 0, width: "100%" }}
              title="Rezervacija per Treatwell"
              loading="lazy"
              className="block h-[560px] w-full md:h-[620px] lg:h-[680px]"
            />
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-foreground/70 gap-2">
            <p>
              Jei rezervacijos modulis neužsikrauna,{" "}
              <a
                href={STUDIO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline underline-offset-4 hover:text-foreground"
              >
                atidarykite tiesioginį Treatwell puslapį naujame lange
              </a>
              .
            </p>
            <a
              href="#kuponai"
              className="font-semibold text-foreground underline underline-offset-4 hover:text-accent"
            >
              Užsakyti dovanų kuponą be tarpininkų →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
