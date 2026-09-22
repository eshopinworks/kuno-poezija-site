import { useState, useEffect } from "react";
import {
  Gift,
  CalendarCheck,
  CheckCircle2,
  AlertCircle,
  Send,
  Sparkles,
} from "lucide-react";
import { STUDIO, TREATMENTS } from "./site-data";
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
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];

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

  const currentVoucherTreatment =
    TREATMENTS.find((t) => t.title === selectedVoucherService) || TREATMENTS[0];

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
      time: preferredTime || undefined,
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

  return (
    <section id="registracija" className="scroll-mt-24 bg-card py-12 sm:py-16 border-y border-border/60">
      <span id="kuponai" className="sr-only" />
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Heading + Concierge Guide */}
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24">
            <SectionHeading
              overline="Tiesioginis užsakymas"
              ornament="03"
              title={
                <>
                  Tiesioginė registracija ir{" "}
                  <em className="font-heading italic text-accent font-normal">dovanų kuponai</em>
                </>
              }
              intro="Rezervuokitės laiką vizitui arba užsisakykite asmeninį dovanų kuponą tiesiogiai pas meistrę Kristiną."
            />

            <Reveal delay={80}>
              <div className="mt-6 space-y-4 border-t border-border/60 pt-5">
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-accent font-semibold shrink-0 mt-0.5">01</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Asmeninis dėmesys</p>
                      <p className="text-xs text-foreground/75 leading-relaxed mt-0.5">
                        Jūsų registraciją tiesiogiai peržiūri ir suderina pati meistrė Kristina Jasevičiūtė.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-border/40 pt-3">
                    <span className="font-mono text-xs text-accent font-semibold shrink-0 mt-0.5">02</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Dovanų kuponai el. formatu</p>
                      <p className="text-xs text-foreground/75 leading-relaxed mt-0.5">
                        Kuponą parengiame su gavėjo vardu bei Jūsų asmeniniu palinkėjimu ir atsiunčiame el. paštu.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-t border-border/40 pt-3">
                    <span className="font-mono text-xs text-accent font-semibold shrink-0 mt-0.5">03</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Rami erdvė centre</p>
                      <p className="text-xs text-foreground/75 leading-relaxed mt-0.5">
                        Jauki studija Klaipėdos centre, kur visas laikas skiriamas tik Jūsų poilsiui.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-4 text-xs text-foreground/70 space-y-1.5">
                  <p>Konsultacijai ar skubiam susisiekimui telefonu:</p>
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
              <div className="rounded-2xl border border-border/80 bg-background p-5 sm:p-7 shadow-sm">
                {/* Main Toggle Tabs */}
                <div className="flex rounded-full border border-border/80 bg-card p-1 gap-1">
                  <button
                    type="button"
                    onClick={() => { setTab("booking"); setSubmitted(false); }}
                    className={`flex-1 py-2.5 px-3 text-xs tracking-wider uppercase font-semibold transition-all flex items-center justify-center gap-2 rounded-full whitespace-nowrap ${
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
                    className={`flex-1 py-2.5 px-3 text-xs tracking-wider uppercase font-semibold transition-all flex items-center justify-center gap-2 rounded-full whitespace-nowrap ${
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
                  <div className="mt-6 rounded-xl border border-accent/40 bg-accent/10 p-7 text-center">
                    <CheckCircle2 className="mx-auto size-11 text-accent" />
                    <h3 className="mt-3 font-heading text-xl sm:text-2xl text-foreground font-medium">
                      Ačiū! Užklausa sėkmingai gauta
                    </h3>
                    <p className="mt-2.5 text-sm text-foreground/80 max-w-md mx-auto leading-relaxed">
                      Meistrė Kristina netrukus peržiūrės Jūsų užklausą ir susisieks nurodytu telefonu dėl
                      vizito patvirtinimo arba elektroninio kupono parengimo.
                    </p>

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
                      }}
                      className="mt-6 inline-block rounded-full border border-foreground/30 px-6 py-2 text-xs tracking-wider uppercase hover:bg-card transition-colors font-medium whitespace-nowrap"
                    >
                      Pateikti kitą užklausą
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                    {error && (
                      <div className="flex items-start gap-2.5 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                        <AlertCircle className="size-4 shrink-0 mt-0.5" />
                        <p>{error}</p>
                      </div>
                    )}

                    {/* TAB 1: BOOKING */}
                    {tab === "booking" && (
                      <>
                        {/* Service Selection */}
                        <div>
                          <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                            Pasirinkite pageidaujamą masažą
                          </label>
                          <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="w-full rounded-xl border border-border/80 bg-card px-3.5 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground transition-colors"
                          >
                            {TREATMENTS.map((t) => (
                              <option key={t.id} value={t.title}>
                                {t.title} ({t.duration}, {t.price})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Preferred Date & Time - Perfectly Aligned 2 Columns */}
                        <div className="grid sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                              Pageidaujama data
                            </label>
                            <input
                              type="date"
                              min={todayStr}
                              value={preferredDate}
                              onChange={(e) => setPreferredDate(e.target.value)}
                              className="w-full rounded-xl border border-border/80 bg-card px-3.5 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                              Pageidaujamas laikas
                            </label>
                            <input
                              type="text"
                              value={preferredTime}
                              onChange={(e) => setPreferredTime(e.target.value)}
                              placeholder="Pvz.: 14:00 arba po 17 val."
                              className="w-full rounded-xl border border-border/80 bg-card px-3.5 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground transition-colors"
                            />
                          </div>
                        </div>

                        {/* Name & Phone - Perfectly Aligned 2 Columns */}
                        <div className="grid sm:grid-cols-2 gap-3.5 border-t border-border/50 pt-3.5">
                          <div>
                            <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                              Jūsų vardas *
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Vardas Pavardė"
                              className="w-full rounded-xl border border-border/80 bg-card px-3.5 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                              Telefono numeris *
                            </label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+370 600 00000"
                              className="w-full rounded-xl border border-border/80 bg-card px-3.5 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground transition-colors"
                            />
                          </div>
                        </div>

                        {/* Email & Notes - Perfectly Aligned 2 Columns */}
                        <div className="grid sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                              El. paštas (neprivaloma)
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="vardas@pavyzdys.lt"
                              className="w-full rounded-xl border border-border/80 bg-card px-3.5 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                              Pastabos meistrei (neprivaloma)
                            </label>
                            <input
                              type="text"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Kūno įtampa, pageidavimai..."
                              className="w-full rounded-xl border border-border/80 bg-card px-3.5 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground transition-colors"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* TAB 2: VOUCHER */}
                    {tab === "voucher" && (
                      <>
                        {/* Mutually Exclusive Mode Selection */}
                        <div>
                          <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                            Kupono parinkimo tipas
                          </label>
                          <div className="grid grid-cols-2 gap-2 p-1 bg-card rounded-full border border-border/80">
                            <button
                              type="button"
                              onClick={() => setVoucherType("amount")}
                              className={`py-2 px-3 text-xs tracking-wide uppercase font-semibold rounded-full transition-all text-center ${
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
                              className={`py-2 px-3 text-xs tracking-wide uppercase font-semibold rounded-full transition-all text-center ${
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
                          <div>
                            <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                              Pasirinkite kupono sumą
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                              {["35", "50", "70", "100", "150"].map((sum) => (
                                <button
                                  key={sum}
                                  type="button"
                                  onClick={() => {
                                    setVoucherAmount(sum);
                                    setCustomAmount("");
                                  }}
                                  className={`py-2 px-2 text-center rounded-full text-xs font-semibold transition-all border ${
                                    voucherAmount === sum
                                      ? "border-foreground bg-foreground text-background shadow-xs"
                                      : "border-border/80 bg-card text-foreground hover:border-foreground/50"
                                  }`}
                                >
                                  {sum} €
                                </button>
                              ))}
                              <button
                                type="button"
                                onClick={() => setVoucherAmount("custom")}
                                className={`py-2 px-2 text-center rounded-full text-xs font-semibold transition-all border ${
                                  voucherAmount === "custom"
                                    ? "border-foreground bg-foreground text-background shadow-xs"
                                    : "border-border/80 bg-card text-foreground hover:border-foreground/50"
                                }`}
                              >
                                Kita
                              </button>
                            </div>

                            {voucherAmount === "custom" && (
                              <div className="mt-2 relative max-w-xs">
                                <input
                                  type="number"
                                  min="20"
                                  step="5"
                                  required={voucherAmount === "custom"}
                                  value={customAmount}
                                  onChange={(e) => setCustomAmount(e.target.value)}
                                  placeholder="Įveskite sumą"
                                  className="w-full rounded-xl border border-border/80 bg-card px-3.5 py-2 text-base text-foreground focus:outline-none focus:border-foreground"
                                />
                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-foreground/60 font-semibold">
                                  €
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* MODE B: SERVICE ONLY */}
                        {voucherType === "service" && (
                          <div>
                            <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                              Pasirinkite dovanotiną masažą
                            </label>
                            <select
                              value={selectedVoucherService}
                              onChange={(e) => setSelectedVoucherService(e.target.value)}
                              className="w-full rounded-xl border border-border/80 bg-card px-3.5 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground transition-colors"
                            >
                              {TREATMENTS.map((t) => (
                                <option key={t.id} value={t.title}>
                                  {t.title} ({t.duration}, {t.price})
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Recipient & Buyer Name - Perfectly Aligned 2 Columns */}
                        <div className="grid sm:grid-cols-2 gap-3.5 border-t border-border/50 pt-3.5">
                          <div>
                            <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                              Kam skirtas kuponas *
                            </label>
                            <input
                              type="text"
                              required
                              value={recipientName}
                              onChange={(e) => setRecipientName(e.target.value)}
                              placeholder="Gavėjo vardas"
                              className="w-full rounded-xl border border-border/80 bg-card px-3.5 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                              Jūsų vardas *
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Vardas Pavardė"
                              className="w-full rounded-xl border border-border/80 bg-card px-3.5 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground transition-colors"
                            />
                          </div>
                        </div>

                        {/* Phone & Email - Perfectly Aligned 2 Columns */}
                        <div className="grid sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                              Telefono numeris *
                            </label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+370 600 00000"
                              className="w-full rounded-xl border border-border/80 bg-card px-3.5 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                              El. paštas (kuponui gauti) *
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="vardas@pavyzdys.lt"
                              className="w-full rounded-xl border border-border/80 bg-card px-3.5 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground transition-colors"
                            />
                          </div>
                        </div>

                        {/* Greeting / Message */}
                        <div>
                          <label className="block text-[0.72rem] font-semibold tracking-wider text-foreground/70 uppercase mb-1.5 h-4 leading-4 truncate">
                            Sveikinimo žodžiai arba pastabos (neprivaloma)
                          </label>
                          <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Palinkėjimas ant kupono ar pastaba meistrei..."
                            className="w-full rounded-xl border border-border/80 bg-card px-3.5 py-2.5 text-base text-foreground focus:outline-none focus:border-foreground transition-colors"
                          />
                        </div>

                        {/* Compact Luxury Voucher Status Strip */}
                        <div className="rounded-xl border border-accent/40 bg-accent/5 px-3.5 py-2 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 truncate">
                            <Sparkles className="size-3.5 text-accent shrink-0" />
                            <span className="text-foreground/75 truncate">
                              <strong className="text-foreground font-semibold">
                                {voucherType === "amount" ? effectiveVoucherAmountDisplay : currentVoucherTreatment.title}
                              </strong>{" "}
                              dovanų kuponas
                              {recipientName.trim() ? (
                                <>
                                  {" "}skirtas <strong className="text-foreground font-semibold">{recipientName.trim()}</strong>
                                </>
                              ) : (
                                ""
                              )}
                            </span>
                          </div>
                          <span className="font-mono text-[0.68rem] text-accent shrink-0 font-medium bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">
                            Galioja 3 mėn.
                          </span>
                        </div>
                      </>
                    )}

                    {/* Submit Actions */}
                    <div className="pt-2 flex items-center justify-start border-t border-border/50">
                      <button
                        type="submit"
                        disabled={loading}
                        className="rounded-full bg-foreground text-background px-7 py-3 text-xs font-semibold tracking-wider uppercase hover:bg-foreground/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-xs shrink-0"
                      >
                        {loading ? (
                          "Siunčiama..."
                        ) : (
                          <>
                            <Send className="size-3.5 shrink-0" />
                            <span>
                              {tab === "booking" ? "Pateikti registraciją" : "Užsakyti dovanų kuponą"}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* Subtle Treatwell Alternative Note */}
                <div className="mt-5 border-t border-border/60 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-foreground/75">
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


