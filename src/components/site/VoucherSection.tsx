import { useState } from "react";
import { Gift, CalendarCheck, CheckCircle2, AlertCircle, Send, ExternalLink, ShieldCheck } from "lucide-react";
import { STUDIO, TREATMENTS } from "./site-data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function VoucherSection() {
  const [tab, setTab] = useState<"booking" | "voucher">("booking");
  const [selectedService, setSelectedService] = useState<string>(TREATMENTS[0].title);
  const [voucherAmount, setVoucherAmount] = useState<string>("50");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      type: tab === "voucher" ? "Dovanų kuponas" : "Tiesioginė registracija",
      name,
      phone,
      email,
      service: selectedService,
      amount: tab === "voucher" ? (voucherAmount === "custom" ? `${customAmount} €` : `${voucherAmount} €`) : undefined,
      recipientName: tab === "voucher" ? recipientName : undefined,
      date: preferredDate,
      time: preferredTime,
      message,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Nepavyko išsiųsti užklausos. Bandykite dar kartą.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Įvyko nenumatyta klaida. Prašome susisiekti tiesiogiai telefonu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="registracija" className="scroll-mt-24 bg-card py-20 sm:py-28 border-y border-border/60">
      <span id="kuponai" className="sr-only" />
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <SectionHeading
          overline="Tiesioginis užsakymas"
          ornament="03"
          title={
            <>
              Tiesioginė registracija ir{" "}
              <em className="font-heading italic text-accent">dovanų kuponai</em>
            </>
          }
          intro="Rezervuokitės laiką vizitui arba užsisakykite dovanų kuponą tiesiogiai pas meistrę Kristiną be jokių tarpininkų antkainių."
        />

        <Reveal delay={80} className="mt-10">
          <div className="rounded-2xl border border-border/80 bg-background p-6 sm:p-10 shadow-sm">
            {/* Toggle Tabs */}
            <div className="flex rounded-full border border-border/80 bg-card p-1.5 gap-1 max-w-xl mx-auto">
              <button
                type="button"
                onClick={() => { setTab("booking"); setSubmitted(false); }}
                className={`flex-1 py-3 px-4 text-xs tracking-[0.08em] uppercase font-semibold transition-all flex items-center justify-center gap-2 rounded-full whitespace-nowrap ${
                  tab === "booking"
                    ? "bg-foreground text-background shadow-xs"
                    : "text-foreground/70 hover:text-foreground hover:bg-background/50"
                }`}
              >
                <CalendarCheck className="size-4 shrink-0" />
                Tiesioginė registracija
              </button>
              <button
                type="button"
                onClick={() => { setTab("voucher"); setSubmitted(false); }}
                className={`flex-1 py-3 px-4 text-xs tracking-[0.08em] uppercase font-semibold transition-all flex items-center justify-center gap-2 rounded-full whitespace-nowrap ${
                  tab === "voucher"
                    ? "bg-foreground text-background shadow-xs"
                    : "text-foreground/70 hover:text-foreground hover:bg-background/50"
                }`}
              >
                <Gift className="size-4 shrink-0" />
                Dovanų kuponas
              </button>
            </div>

            {submitted ? (
              <div className="mt-8 rounded-xl border border-accent/40 bg-accent/10 p-8 text-center">
                <CheckCircle2 className="mx-auto size-12 text-accent" />
                <h3 className="mt-4 font-heading text-2xl text-foreground font-medium">
                  Ačiū! Užklausa sėkmingai gauta
                </h3>
                <p className="mt-3 text-base text-foreground/80 max-w-lg mx-auto leading-relaxed">
                  Meistrė Kristina netrukus peržiūrės Jūsų užklausą ir susisieks nurodytu telefonu (arba el. paštu)
                  dėl vizito patvirtinimo arba elektroninio kupono išsiuntimo.
                </p>

                {tab === "voucher" && (
                  <div className="mt-6 p-6 rounded-xl border border-border/80 bg-background text-left max-w-md mx-auto text-sm shadow-2xs">
                    <p className="font-semibold text-foreground tracking-wide uppercase text-xs">Mokėjimo rekvizitai kuponui:</p>
                    <p className="mt-2 text-foreground/80">Gavėjas: <strong>{STUDIO.bankDetails.recipient}</strong></p>
                    <p className="text-foreground/80">Bankas: <strong>{STUDIO.bankDetails.bank}</strong></p>
                    <p className="text-foreground/80">Sąskaita (IBAN): <strong className="font-mono text-foreground">{STUDIO.bankDetails.iban}</strong></p>
                    <p className="mt-3 text-xs text-foreground/60 italic border-t border-border/50 pt-2">
                      Pavedimą atlikite tik suderinę detales su meistre. Kuponas parengiamas ir atsiunčiamas elektroniniu formatu.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setPhone("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="mt-8 inline-block rounded-full border border-foreground/30 px-6 py-2.5 text-xs tracking-[0.12em] uppercase hover:bg-card transition-colors font-medium whitespace-nowrap"
                >
                  Pateikti kitą užklausą
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {error && (
                  <div className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                    <AlertCircle className="size-5 shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}

                {tab === "booking" ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase mb-2">
                        Pasirinkite pageidaujamą masažą:
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full rounded-lg border border-border/80 bg-card px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-accent/40 transition-colors"
                      >
                        {TREATMENTS.map((t) => (
                          <option key={t.id} value={t.title}>
                            {t.title} ({t.duration}, {t.price})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase mb-2">
                          Pageidaujama data:
                        </label>
                        <input
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full rounded-lg border border-border/80 bg-card px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-accent/40 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase mb-2">
                          Pageidaujamas laikas:
                        </label>
                        <input
                          type="text"
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          placeholder="Pvz.: 14:00 arba vakare po darbo"
                          className="w-full rounded-lg border border-border/80 bg-card px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-accent/40 transition-colors"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase">
                        Pasirinkite dovanų kupono sumą:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {["35", "50", "70", "100"].map((sum) => (
                          <button
                            key={sum}
                            type="button"
                            onClick={() => { setVoucherAmount(sum); }}
                            className={`py-2.5 px-4 text-center rounded-full text-sm font-semibold transition-all border ${
                              voucherAmount === sum
                                ? "border-foreground bg-foreground text-background shadow-xs"
                                : "border-border/80 bg-card text-foreground hover:border-foreground/40"
                            }`}
                          >
                            {sum} €
                          </button>
                        ))}
                      </div>

                      <div className="pt-2">
                        <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase mb-2">
                          Arba konkreti paslauga:
                        </label>
                        <select
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full rounded-lg border border-border/80 bg-card px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-accent/40 transition-colors"
                        >
                          {TREATMENTS.map((t) => (
                            <option key={t.id} value={t.title}>
                              {t.title} ({t.price})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase mb-2">
                          Kam bus skirtas kuponas (gavėjo vardas):
                        </label>
                        <input
                          type="text"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="Pvz.: Laura"
                          className="w-full rounded-lg border border-border/80 bg-card px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-accent/40 transition-colors"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Buyer / Client details */}
                <div className="border-t border-border/60 pt-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase mb-2">
                        Jūsų vardas *:
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Vardas Pavardė"
                        className="w-full rounded-lg border border-border/80 bg-card px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-accent/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase mb-2">
                        Telefono numeris *:
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+370 600 00000"
                        className="w-full rounded-lg border border-border/80 bg-card px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-accent/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase mb-2">
                      El. pašto adresas:
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vardas@pavyzdys.lt"
                      className="w-full rounded-lg border border-border/80 bg-card px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-accent/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase mb-2">
                      Pastabos arba sveikinimo tekstas (neprivaloma):
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Papildomi pageidavimai, informacija apie kūno įtampas meistrei..."
                      className="w-full rounded-lg border border-border/80 bg-card px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-accent/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto rounded-full bg-foreground text-background px-9 py-4 text-xs font-semibold tracking-[0.12em] uppercase hover:bg-foreground/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
                  >
                    {loading ? (
                      "Siunčiama..."
                    ) : (
                      <>
                        <Send className="size-4" />
                        {tab === "booking" ? "Pateikti tiesioginę registraciją" : "Užsakyti dovanų kuponą"}
                      </>
                    )}
                  </button>
                  <p className="text-xs text-foreground/60 text-center sm:text-right flex items-center gap-1.5 whitespace-nowrap">
                    <ShieldCheck className="size-3.5 text-accent" />
                    Tiesioginis susitarimas · Be papildomų mokesčių
                  </p>
                </div>
              </form>
            )}

            {/* Subtle Treatwell Alternative Note */}
            <div className="mt-8 border-t border-border/60 pt-6 flex flex-wrap items-center justify-center sm:justify-between gap-y-2 gap-x-4 text-xs text-foreground/75">
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <span className="size-2 rounded-full bg-emerald-500 inline-block shrink-0" />
                Registraciją patvirtina meistrė Kristina Jasevičiūtė
              </span>
              <a
                href="#treatwell"
                className="hover:text-foreground underline underline-offset-4 text-accent transition-colors inline-flex items-center gap-1 whitespace-nowrap font-medium"
              >
                Rezervacija per Treatwell programėlę ↓
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
