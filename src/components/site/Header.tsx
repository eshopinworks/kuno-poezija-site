import { useEffect, useState } from "react";
import { Phone, Gift } from "lucide-react";
import { NAV, STUDIO } from "./site-data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "border-b border-border/70 bg-background/95 shadow-xs backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <a
            href="#top"
            className={`flex items-baseline gap-2.5 transition-colors ${
              solid ? "text-foreground" : "text-white"
            }`}
          >
            <span className="font-heading text-lg sm:text-xl tracking-tight font-medium whitespace-nowrap">
              Kūno poezija
            </span>
            <span className="text-[0.65rem] tracking-[0.16em] uppercase opacity-75 hidden sm:inline whitespace-nowrap">
              Masažų studija
            </span>
          </a>

          <nav
            className={`hidden items-center gap-6 xl:gap-8 text-[0.7rem] font-medium tracking-[0.15em] uppercase lg:flex ${
              solid ? "text-foreground/80" : "text-white/90"
            }`}
          >
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="nav-link transition-colors hover:text-accent whitespace-nowrap">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="#kuponai"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("select-service", { detail: { tab: "voucher" } })
                )
              }
              className={`hidden items-center gap-1.5 border px-4 py-2 text-xs tracking-[0.1em] uppercase sm:inline-flex transition-colors rounded-full font-medium whitespace-nowrap ${
                solid
                  ? "border-border text-foreground hover:bg-secondary"
                  : "border-white/50 text-white hover:bg-white/10"
              }`}
            >
              <Gift className="size-3.5 shrink-0 text-accent" />
              Kuponai
            </a>
            <a
              href="#registracija"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("select-service", { detail: { tab: "booking" } })
                )
              }
              className="hidden bg-foreground text-background px-5 py-2 text-xs tracking-[0.1em] uppercase sm:inline-block hover:bg-foreground/90 transition-colors rounded-full font-semibold whitespace-nowrap shadow-xs"
            >
              Registruotis
            </a>
            <button
              type="button"
              aria-label={open ? "Uždaryti meniu" : "Atidaryti meniu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`relative inline-flex size-10 items-center justify-center border transition-colors rounded-full lg:hidden ${
                solid ? "border-border text-foreground" : "border-white/50 text-white"
              }`}
            >
              <span className="relative block h-4 w-5" aria-hidden>
                <span
                  className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${
                    open ? "top-1/2 rotate-45" : "top-[3px]"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-0 block h-px w-5 bg-current transition-all duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${
                    open ? "top-1/2 -rotate-45" : "top-[calc(100%-3px)]"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile panel */}
      <div
        className={`fixed inset-x-0 top-[65px] bottom-0 z-40 lg:hidden ${
          open ? "" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-foreground/30 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-0 top-0 max-h-full overflow-y-auto border-t border-border/60 bg-background px-5 pt-4 pb-8 shadow-md transition-transform duration-300 ease-out rounded-b-2xl ${
            open ? "translate-y-0" : "-translate-y-[130%]"
          }`}
        >
          <nav className="flex flex-col">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
                className={`border-b border-border/50 py-4 text-[0.72rem] tracking-[0.15em] text-foreground/80 uppercase transition-all duration-300 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="#registracija"
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(
                  new CustomEvent("select-service", { detail: { tab: "booking" } })
                );
              }}
              className="bg-foreground px-6 py-3.5 text-center text-xs tracking-[0.12em] text-background uppercase font-semibold rounded-full shadow-xs whitespace-nowrap"
            >
              Tiesioginė registracija
            </a>
            <a
              href="#kuponai"
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(
                  new CustomEvent("select-service", { detail: { tab: "voucher" } })
                );
              }}
              className="bg-accent px-6 py-3.5 text-center text-xs tracking-[0.12em] text-accent-foreground uppercase font-semibold rounded-full shadow-xs whitespace-nowrap"
            >
              Dovanų kuponai
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${STUDIO.phone}`}
                onClick={() => setOpen(false)}
                className="border border-border px-3 py-3 text-center text-[0.72rem] tracking-[0.06em] text-foreground uppercase flex items-center justify-center gap-1.5 rounded-full whitespace-nowrap"
              >
                <Phone className="size-3.5 shrink-0 text-accent" />
                {STUDIO.phoneLabel}
              </a>
              <a
                href={`tel:${STUDIO.phone2}`}
                onClick={() => setOpen(false)}
                className="border border-border px-3 py-3 text-center text-[0.72rem] tracking-[0.06em] text-foreground uppercase flex items-center justify-center gap-1.5 rounded-full whitespace-nowrap"
              >
                <Phone className="size-3.5 shrink-0 text-accent" />
                {STUDIO.phone2Label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
