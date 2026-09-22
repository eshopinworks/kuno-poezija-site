export const PHOTOS = [
  "https://cdn1.treatwell.net/images/view/v2.i14391270.w720.h480.x6554E0EF/",
  "https://cdn1.treatwell.net/images/view/v2.i14374203.w720.h480.xE45F41FB/",
  "https://cdn1.treatwell.net/images/view/v2.i14374272.w720.h480.xEB05E713/",
  "https://cdn1.treatwell.net/images/view/v2.i14391268.w720.h480.x28BFED55/",
  "https://cdn1.treatwell.net/images/view/v2.i14374373.w720.h480.x1E7632E4/",
];

export const FALLBACK_PHOTOS = [
  "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80",
];

export const STUDIO = {
  name: "Masažų studija Kūno poezija",
  specialist: "Kristina Jasevičiūtė",
  address: "H. Manto g. 36A (2 a.), Klaipėda, 91133",
  phone: "+37062180014",
  phoneLabel: "+370 621 80014",
  email: "kunopoezija@gmail.com",
  facebookUrl: "https://www.facebook.com/share/1MqSgsijda/",
  bookingUrl: "https://book.treatwell.lt/salonas/masazu-studija-kuno-poezija/",
  bookingEmbedUrl:
    "https://book.treatwell.lt/salonas/masazu-studija-kuno-poezija/?utm_source=widget&utm_medium=partners&utm_campaign=website_embed",
  reviewCount: 178,
  rating: "5,0",
  bankDetails: {
    recipient: "Kristina Jasevičiūtė",
    bank: "SEB bankas",
    iban: "LT567044000045645353",
  },
};

export const NAV = [
  { href: "#paslaugos", label: "Masažai" },
  { href: "#apie", label: "Apie meistrę" },
  { href: "#kuponai", label: "Dovanų kuponai" },
  { href: "#galerija", label: "Galerija" },
  { href: "#atsiliepimai", label: "Atsiliepimai" },
  { href: "#kontaktai", label: "Kontaktai" },
];

export interface Treatment {
  id: string;
  title: string;
  duration?: string;
  price?: string;
  forWhom: string;
  feeling: string;
}

export const TREATMENTS: Treatment[] = [
  {
    id: "klasikinis",
    title: "Klasikinis masažas",
    duration: "60-90 min.",
    price: "nuo 35 €",
    forWhom: "Universali viso kūno arba nugaros procedūra, gerinanti kraujotaką, mažinanti raumenų nuovargį ir bendrą įtampą.",
    feeling: "Malonus raumenų atsipalaidavimas, pagerėjusi savijauta ir atgauta fizinė energija.",
  },
  {
    id: "terapinis",
    title: "Terapinis masažas",
    duration: "60-90 min.",
    price: "nuo 40 €",
    forWhom: "Tikslinis darbas su skausmingomis kūno zonomis, spazmais, pečių juostos ar nugaros pertempimais.",
    feeling: "Gilus palengvėjimas, judesių laisvė ir palaipsnis įsisenėjusio diskomforto atslūgimas.",
  },
  {
    id: "sportinis",
    title: "Sportinis masažas (Restartas)",
    duration: "60-90 min.",
    price: "nuo 40 €",
    forWhom: "Aktyviai sportuojantiems ir intensyvų fizinį krūvį patiriantiems žmonėms, raumenų paruošimui bei greitesniam atsistatymui.",
    feeling: "Intensyvus raumenų išjudinimas, elastingumo sugrąžinimas ir kūno žvalumas.",
  },
  {
    id: "giluminis",
    title: "Giluminis masažas (Kūno balansas)",
    duration: "60-90 min.",
    price: "nuo 45 €",
    forWhom: "Skirtas pasiekti gilesnius raumenų bei fascijų sluoksnius, šalinti ilgalaikį sustingimą ir atstatyti taisyklingą kūno balansą.",
    feeling: "Gilus atpalaiduojantis poveikis, ilgai išliekantis lengvumas ir atvertas laisvas kvėpavimas.",
  },
  {
    id: "modeliuojantis",
    title: "Modeliuojantis masažas",
    duration: "60-75 min.",
    price: "nuo 40 €",
    forWhom: "Kūno linijų stangrinimui, odos tonuso gerinimui ir poodinio mikrocirkuliacijos aktyvinimui.",
    feeling: "Maloni šiluma, sužadinta kraujotaka ir pastebimas kūno stangrumo pojūtis.",
  },
  {
    id: "limfodrenazinis",
    title: "Limfodrenažinis viso kūno masažas",
    duration: "60-80 min.",
    price: "nuo 40 €",
    forWhom: "Skysčių sąstoviui mažinti, toksinų šalinimui, esant kojų sunkumui ar bendram kūno patinimui.",
    feeling: "Ypatingas „lengvų kojų“ pojūtis, kūno švaros jausmas ir atslūgęs sunkumas.",
  },
  {
    id: "havajietiskas",
    title: "Havajietiškas masažas (Lomi Lomi Nui)",
    duration: "75-90 min.",
    price: "nuo 50 €",
    forWhom: "Giliai protinei bei emocinei ramybei, harmonijai ir streso paleidimui per tolygius, banguojančius judesius dilbiais.",
    feeling: "Visiškas pasinėrimas į ramybę, tarsi švelnios vandenyno bangos nuplautų visus rūpesčius.",
  },
  {
    id: "veido",
    title: "Veido masažai (Žydinti lelija)",
    duration: "45-60 min.",
    price: "nuo 30 €",
    forWhom: "Veido ovalo stangrinimui, mimikos raumenų atpalaidavimui, odos skaistumui ir švytėjimui.",
    feeling: "Pailsėję, švelnūs veido bruožai, skaisti oda ir pakylėta savijauta.",
  },
];

export const REVIEWS = [
  {
    name: "Justina",
    text: "Visiškas atradimas! Geriausias masažas, kokį teko patirti. Jaučiasi profesionalumas, atidumas ir meilė savo darbui. Labai rekomenduoju.",
  },
  {
    name: "Vilma",
    text: "Kristina yra nuoširdžiai atsidavusi į darbą. Koncentruojasi ne į laiką, o į kokybišką darbą. Ačiū už puikų masažą. Kreipiausi dėl didelės įtampos, pečių ir nugaros zonoje. Specialistė puikiai jaučia problemines vietas, dirba kruopščiai ir atsakingai.",
  },
  {
    name: "Klientė",
    text: "Atsipalaidavimas, lengvumas ir džiaugsmas. Kiekvieną kartą išeinu lyg naujai gimusi.",
  },
  {
    name: "Viktorija",
    text: "Masažas buvo nerealus, tikrai atpalaidavo ir nuėmė visą savaitės stresą. Būtinai sugrįšiu.",
  },
  {
    name: "Laima",
    text: "Nuostabi masažo patirtis, šiltas bendravimas ir tikras meistriškumas. Jau nekantrauju sugrįžti.",
  },
];
