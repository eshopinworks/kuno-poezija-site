import { useState, useEffect } from "react";
import {
  Gift,
  CalendarCheck,
  CheckCircle2,
  AlertCircle,
  Send,
  ShieldCheck,
  Clock,
  Sparkles,
  User,
  Phone,
  Mail,
  Heart,
  CreditCard,
  Check,
} from "lucide-react";
import { STUDIO, TREATMENTS, Treatment } from "./site-data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function VoucherSection() {
  const [tab, setTab] = useState<"booking" | "voucher">("booking");
  const [voucherType, setVoucherType] = useState<"amount" | "service">("amount");
  const [selectedService, setSelectedService] = useState<string>(TREATMENTS[0].title);
  const [selectedVoucherService, setSelectedVoucherService] = useState<string>(TREATMENTS[0].title);
  const [voucherAmount, setVoucherAmount] = useState<string>("50");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [timePreset, setTimePreset] = useState<string>("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];

  // Listen to hash changes or custom select-service events from treatment cards
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#kuponai") {
        setTab("voucher");
      } else if (hash === "#registracija") {
        setTab("booking");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);

    const handleSelectService = (
      e: CustomEvent<{ service?: string; tab?: "booking" | "voucher" }>
    ) => {
      if (e.detail?.tab) {
        setTab(e.detail.tab);
      }
      if (e.detail?.service) {
        if (e.detail.tab === "voucher") {
          setVoucherType("service");
          setSelectedVoucherService(e.detail.service);
        } else {
          setSelectedService(e.detail.service);
        }
      }
    };

    window.addEventListener("select-service" as any, handleSelectService);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("select-service" as any, handleSelectService);
    };
  }, []);

  const currentBookingTreatment = TREATMENTS.find((t) => t.title === selectedService) || TREATMENTS[0];
  const currentVoucherTreatment = TREATMENTS.find((t) => t.title === selectedVoucherService) || TREATMENTS[0];

  const effectiveVoucherAmountDisplay =
    voucherType === "amount"
      ? voucherAmount === "custom"
        ? customAmount
          ? `${customAmount} €`
          : "- €"
        : `${voucherAmount} €`
      : currentVoucherTreatment.price || "Pagal masažą";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isVoucher = tab === "voucher";
    let finalAmount: string | undefined = undefined;
    let finalService: string | undefined = undefined;

    if (isVoucher) {
      if (voucherType === "amount") {
        finalAmount = voucherAmount === "custom" ? `${customAmount} €` : `${voucherAmount} €`;
        finalService = "Pasirinktos sumos dovanų kuponas (laisvas pasirinkimas)";
      } else {
        finalService = currentVoucherTreatment.title;
        finalAmount = currentVoucherTreatment.price || "Pagal paslaugą";
      }
    } else {
      finalService = selectedService;
    }

    const payload = {
      type: isVoucher ? "Dovanų kuponas" : "Tiesioginė registracija",
      name,
      phone,
      email: email.trim() || undefined,
      service: finalService,
      amount: finalAmount,
      recipientName: isVoucher ? recipientName.trim() || "Nenurodyta" : undefined,
      date: preferredDate || undefined,
      time: preferredTime || timePreset || undefined,
      message: message.trim() || undefined,
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

  const handleTimePresetClick = (presetText: string) => {
    setTimePreset(presetText);
    setPreferredTime(presetText);
  };

  return (
    <section id="registracija" className="scroll-mt-24 bg-card py-20 sm:py-28 border-y border-border/60">
      <span id="kuponai" className="sr-only" />
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Heading + Concierge Guide */}
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-28">
            <SectionHeading
              overline="Tiesioginis užsakymas"
              ornament="03"
              title={
                <>
                  Tiesioginė registracija ir{" "}
                  <em className="font-heading italic text-accent font-normal">dovanų kuponai</em>
                </>
              }
              intro="Rezervuokitės laiką vizitui arba užsisakykite asmeninį dovanų kuponą tiesiogiai pas meistrę Kristiną be jokių papildomų mokesčių."
            />

            <Reveal delay={80}>
              <div className="mt-8 space-y-5 border-t border-border/60 pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <span className="font-mono text-xs text-accent font-semibold shrink-0 mt-0.5">01</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Asmeninis meistrės patvirtinimas</p>
                      <p className="text-xs text-foreground/75 leading-relaxed mt-0.5">
                        Jūsų registraciją tiesiogiai peržiūri ir suderina pati specialistė Kristina Jasevičiūtė.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 border-t border-border/40 pt-3.5">
                    <span className="font-mono text-xs text-accent font-semibold shrink-0 mt-0.5">02</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Elegantiškas el. kuponas (PDF)</p>
                      <p className="text-xs text-foreground/75 leading-relaxed mt-0.5">
                        Kuponą parengiame su gavėjo vardu bei Jūsų asmeniniu palinkėjimu ir atsiunčiame el. paštu.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 border-t border-border/40 pt-3.5">
                    <span className="font-mono text-xs text-accent font-semibold shrink-0 mt-0.5">03</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Saugus atsiskaitymas SEB pavedimu</p>
                      <p className="text-xs text-foreground/75 leading-relaxed mt-0.5">
                        Sąskaita: <span className="font-mono font-medium text-foreground">{STUDIO.bankDetails.iban}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-5 text-xs text-foreground/70 space-y-2">
                  <p>Skubiam susisiekimui ar konsultacijai telefonu:</p>
                  <div className="flex flex-wrap items-center gap-3 font-semibold text-foreground">
                    <a href={`tel:${STUDIO.phone}`} className="hover:underline text-accent whitespace-nowrap">
                      {STUDIO.phoneLabel}
                    </a>
                    <span className="text-foreground/30">/</span>
                    <a href={`tel:${STUDIO.phone2}`} className="hover:underline text-accent whitespace-nowrap">
                      {STUDIO.phone2Label}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Form Suite */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="rounded-2xl border border-border/80 bg-background p-6 sm:p-9 shadow-sm">
                {/* Main Toggle Tabs */}
                <div className="flex rounded-full border border-border/80 bg-card p-1.5 gap-1">
                  <button
                    type="button"
                    onClick={() => { setTab("booking"); setSubmitted(false); }}
                    className={`flex-1 py-3 px-3 text-xs tracking-[0.08em] uppercase font-semibold transition-all flex items-center justify-center gap-2 rounded-full whitespace-nowrap ${
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
                    className={`flex-1 py-3 px-3 text-xs tracking-[0.08em] uppercase font-semibold transition-all flex items-center justify-center gap-2 rounded-full whitespace-nowrap ${
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
                      dėl vizito patvirtinimo arba elektroninio kupono parengimo.
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
                        setRecipientName("");
                        setPreferredDate("");
                        setPreferredTime("");
                        setTimePreset("");
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

                    {/* TAB 1: BOOKING */}
                    {tab === "booking" && (
                      <>
                        {/* Service Selection + Detail Card */}
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

                          {/* Selected Treatment Detail Preview Pill */}
                          <div className="mt-3 rounded-xl border border-border/60 bg-card/60 p-4 text-xs space-y-2">
                            <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
                              <span className="font-semibold text-foreground text-sm">
                                {currentBookingTreatment.title}
                              </span>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="font-mono text-foreground/70 bg-background px-2 py-0.5 rounded-full border border-border/60">
                                  {currentBookingTreatment.duration}
                                </span>
                                <span className="font-semibold text-foreground bg-accent/15 text-accent px-2.5 py-0.5 rounded-full">
                                  {currentBookingTreatment.price}
                                </span>
                              </div>
                            </div>
                            <p className="text-foreground/75 leading-relaxed">
                              <strong className="text-foreground font-medium">Paskirtis: </strong>
                              {currentBookingTreatment.forWhom}
                            </p>
                            <p className="font-serif italic text-foreground/80">
                              <strong className="font-sans not-italic text-accent font-medium">Pojūtis: </strong>
                              {currentBookingTreatment.feeling}
                            </p>
                          </div>
                        </div>

                        {/* Preferred Date & Time Selection */}
                        <div className="space-y-4 border-t border-border/60 pt-5">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase mb-2">
                                Pageidaujama data:
                              </label>
                              <input
                                type="date"
                                min={todayStr}
                                value={preferredDate}
                                onChange={(e) => setPreferredDate(e.target.value)}
                                className="w-full rounded-lg border border-border/80 bg-card px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-accent/40 transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase mb-2">
                                Tikslus laikas arba pageidavimas:
                              </label>
                              <input
                                type="text"
                                value={preferredTime}
                                onChange={(e) => {
                                  setPreferredTime(e.target.value);
                                  setTimePreset("");
                                }}
                                placeholder="Pvz.: 14:00 arba po 17:30"
                                className="w-full rounded-lg border border-border/80 bg-card px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-accent/40 transition-colors"
                              />
                            </div>
                          </div>

                          {/* Quick Time Presets */}
                          <div>
                            <span className="block text-[0.7rem] font-semibold uppercase tracking-wider text-foreground/50 mb-2">
                              Arba pasirinkite paros metą:
                            </span>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { id: "rytas", label: "Rytas", time: "08:00 - 12:00" },
                                { id: "diena", label: "Diena", time: "12:00 - 17:00" },
                                { id: "vakaras", label: "Vakaras", time: "17:00 - 20:00" },
                              ].map((preset) => (
                                <button
                                  key={preset.id}
                                  type="button"
                                  onClick={() => handleTimePresetClick(`${preset.label} (${preset.time})`)}
                                  className={`p-2 rounded-xl text-center border text-xs transition-all ${
                                    timePreset.startsWith(preset.label)
                                      ? "border-foreground bg-foreground text-background font-semibold shadow-xs"
                                      : "border-border/80 bg-card text-foreground/80 hover:border-foreground/40 hover:text-foreground"
                                  }`}
                                >
                                  <div className="font-medium">{preset.label}</div>
                                  <div className="text-[0.65rem] opacity-75 font-mono">{preset.time}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* TAB 2: VOUCHER */}
                    {tab === "voucher" && (
                      <div className="space-y-6">
                        {/* Mutually Exclusive Voucher Mode Selection */}
                        <div>
                          <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase mb-2.5">
                            Kaip norite parinkti dovanų kuponą?
                          </label>
                          <div className="grid grid-cols-2 gap-2 p-1 bg-card rounded-full border border-border/80">
                            <button
                              type="button"
                              onClick={() => setVoucherType("amount")}
                              className={`py-2.5 px-3 text-xs tracking-wide uppercase font-semibold rounded-full transition-all text-center ${
                                voucherType === "amount"
                                  ? "bg-foreground text-background shadow-xs"
                                  : "text-foreground/70 hover:text-foreground"
                              }`}
                            >
                              Pagal sumą (€)
                            </button>
                            <button
                              type="button"
                              onClick={() => setVoucherType("service")}
                              className={`py-2.5 px-3 text-xs tracking-wide uppercase font-semibold rounded-full transition-all text-center ${
                                voucherType === "service"
                                  ? "bg-foreground text-background shadow-xs"
                                  : "text-foreground/70 hover:text-foreground"
                              }`}
                            >
                              Konkrečiam masažui
                            </button>
                          </div>
                        </div>

                        {/* MODE A: AMOUNT ONLY */}
                        {voucherType === "amount" && (
                          <div className="space-y-4 rounded-xl border border-border/70 bg-card/40 p-4 sm:p-5">
                            <div className="flex items-center justify-between">
                              <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase">
                                Pasirinkite kupono sumą:
                              </label>
                              <span className="text-[0.7rem] text-accent font-medium">Laisvas pasirinkimas</span>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                              {["35", "50", "70", "100", "150"].map((sum) => (
                                <button
                                  key={sum}
                                  type="button"
                                  onClick={() => {
                                    setVoucherAmount(sum);
                                    setCustomAmount("");
                                  }}
                                  className={`py-2.5 px-2 text-center rounded-full text-sm font-semibold transition-all border ${
                                    voucherAmount === sum
                                      ? "border-foreground bg-foreground text-background shadow-xs"
                                      : "border-border/80 bg-background text-foreground hover:border-foreground/50"
                                  }`}
                                >
                                  {sum} €
                                </button>
                              ))}
                              <button
                                type="button"
                                onClick={() => setVoucherAmount("custom")}
                                className={`py-2.5 px-2 text-center rounded-full text-xs font-semibold transition-all border ${
                                  voucherAmount === "custom"
                                    ? "border-foreground bg-foreground text-background shadow-xs"
                                    : "border-border/80 bg-background text-foreground hover:border-foreground/50"
                                }`}
                              >
                                Kita suma
                              </button>
                            </div>

                            {voucherAmount === "custom" && (
                              <div className="pt-2">
                                <label className="block text-xs text-foreground/70 mb-1.5">
                                  Įveskite pageidaujamą kupono vertę (€):
                                </label>
                                <div className="relative max-w-xs">
                                  <input
                                    type="number"
                                    min="20"
                                    step="5"
                                    required={voucherAmount === "custom"}
                                    value={customAmount}
                                    onChange={(e) => setCustomAmount(e.target.value)}
                                    placeholder="Pvz.: 80"
                                    className="w-full rounded-lg border border-border/80 bg-background px-4 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground"
                                  />
                                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-foreground/60 font-semibold">
                                    €
                                  </span>
                                </div>
                              </div>
                            )}

                            <p className="text-xs text-foreground/70 pt-1 leading-relaxed">
                              Gavėjas galės šią sumą panaudoti bet kuriam norimam masažui iš studijos asortimento.
                            </p>
                          </div>
                        )}

                        {/* MODE B: SERVICE ONLY */}
                        {voucherType === "service" && (
                          <div className="space-y-4 rounded-xl border border-border/70 bg-card/40 p-4 sm:p-5">
                            <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase">
                              Pasirinkite dovanotiną masažą:
                            </label>
                            <select
                              value={selectedVoucherService}
                              onChange={(e) => setSelectedVoucherService(e.target.value)}
                              className="w-full rounded-lg border border-border/80 bg-background px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground transition-colors"
                            >
                              {TREATMENTS.map((t) => (
                                <option key={t.id} value={t.title}>
                                  {t.title} ({t.duration}, {t.price})
                                </option>
                              ))}
                            </select>

                            {/* Service detail card */}
                            <div className="rounded-lg border border-border/60 bg-background/80 p-3.5 text-xs space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-foreground">{currentVoucherTreatment.title}</span>
                                <span className="font-mono text-accent font-medium">{currentVoucherTreatment.price}</span>
                              </div>
                              <p className="text-foreground/75 leading-relaxed">{currentVoucherTreatment.forWhom}</p>
                              <p className="font-serif italic text-foreground/70">Pojūtis: {currentVoucherTreatment.feeling}</p>
                            </div>

                            <p className="text-xs text-foreground/70 leading-relaxed">
                              Kuponas bus išrašytas konkrečiai šiai procedūrai. Pageidaujant, kupono vertė eurais ant kupono gali būti nenurodoma.
                            </p>
                          </div>
                        )}

                        {/* Recipient Name */}
                        <div>
                          <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase mb-2">
                            Kam bus skirtas kuponas (gavėjo vardas ir pavardė) *:
                          </label>
                          <input
                            type="text"
                            required
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            placeholder="Pvz.: Rūta Jonaitienė"
                            className="w-full rounded-lg border border-border/80 bg-card px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-accent/40 transition-colors"
                          />
                        </div>

                        {/* Interactive Luxury Live Voucher Card Preview */}
                        <div>
                          <span className="block text-[0.7rem] font-semibold uppercase tracking-wider text-foreground/50 mb-2">
                            Kupono vizualinis pavyzdys:
                          </span>
                          <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-card via-background to-secondary/30 p-6 sm:p-7 shadow-xs">
                            <div className="absolute right-4 top-4 text-accent/20">
                              <Sparkles className="size-16 stroke-[1]" />
                            </div>
                            <div className="relative z-10 flex flex-col justify-between space-y-6">
                              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                                <div>
                                  <span className="text-[0.68rem] tracking-[0.2em] uppercase font-semibold text-accent block">
                                    Dovanų kuponas
                                  </span>
                                  <span className="font-heading text-base text-foreground font-medium">
                                    Masažų studija „Kūno poezija“
                                  </span>
                                </div>
                                <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium border border-accent/30 shrink-0">
                                  Galioja 3 mėn.
                                </span>
                              </div>

                              <div className="space-y-1 py-1">
                                <span className="text-xs text-foreground/60 uppercase tracking-wider">Dovana:</span>
                                <div className="font-heading text-2xl sm:text-3xl text-foreground font-medium">
                                  {voucherType === "amount" ? (
                                    <span>{effectiveVoucherAmountDisplay}</span>
                                  ) : (
                                    <span>{currentVoucherTreatment.title}</span>
                                  )}
                                </div>
                                <p className="text-xs text-foreground/75">
                                  {voucherType === "amount"
                                    ? "Laisvai pasirenkamoms masažo procedūroms"
                                    : `Procedūros trukmė: ${currentVoucherTreatment.duration}`}
                                </p>
                              </div>

                              <div className="border-t border-border/50 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-foreground/75">
                                <div>
                                  <span className="text-foreground/50">Gavėjas: </span>
                                  <span className="font-semibold text-foreground">
                                    {recipientName.trim() || "Jūsų artimasis"}
                                  </span>
                                </div>
                                <div className="text-[0.7rem] text-foreground/60">
                                  H. Manto g. 36A, Klaipėda · Meistrė Kristina Jasevičiūtė
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CLIENT / BUYER DETAILS (Shared for both tabs) */}
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
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase">
                            El. pašto adresas:
                          </label>
                          <span className="text-[0.68rem] text-foreground/50">
                            {tab === "voucher" ? "Būtina kupono (PDF) atsiuntimui" : "Patvirtinimui gauti"}
                          </span>
                        </div>
                        <input
                          type="email"
                          required={tab === "voucher"}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="vardas@pavyzdys.lt"
                          className="w-full rounded-lg border border-border/80 bg-card px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-accent/40 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold tracking-[0.12em] text-foreground/70 uppercase mb-2">
                          {tab === "voucher"
                            ? "Sveikinimo žodžiai arba pastabos (neprivaloma):"
                            : "Pastabos meistrei arba informacija apie kūno įtampas (neprivaloma):"}
                        </label>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={
                            tab === "voucher"
                              ? "Nurodykite palinkėjimą, kurį įrašysime į kuponą..."
                              : "Nurodykite pečių juostos, nugaros ar kitus pageidavimus meistrei..."
                          }
                          className="w-full rounded-lg border border-border/80 bg-card px-4 py-3 text-base text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-accent/40 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full xl:w-auto rounded-full bg-foreground text-background px-8 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase hover:bg-foreground/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs shrink-0"
                      >
                        {loading ? (
                          "Siunčiama..."
                        ) : (
                          <>
                            <Send className="size-4 shrink-0" />
                            <span>
                              {tab === "booking" ? "Pateikti tiesioginę registraciją" : "Užsakyti dovanų kuponą"}
                            </span>
                          </>
                        )}
                      </button>
                      <p className="text-xs text-foreground/60 flex items-center gap-1.5 self-start xl:self-auto">
                        <ShieldCheck className="size-3.5 text-accent shrink-0" />
                        <span>Tiesioginis susitarimas · Be tarpininkų mokesčių</span>
                      </p>
                    </div>
                  </form>
                )}

                {/* Subtle Treatwell Alternative Note */}
                <div className="mt-8 border-t border-border/60 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-foreground/75">
                  <span className="inline-flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500 inline-block shrink-0" />
                    <span>Registraciją patvirtina meistrė Kristina Jasevičiūtė</span>
                  </span>
                  <a
                    href="#treatwell"
                    className="hover:text-foreground underline underline-offset-4 text-accent transition-colors inline-flex items-center gap-1 font-medium self-start sm:self-auto"
                  >
                    Rezervacija per Treatwell programėlę ↓
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

