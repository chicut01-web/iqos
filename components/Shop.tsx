"use client";

import { motion } from "framer-motion";

const products = [
  {
    id: "one",
    tag: "Ingresso",
    name: "IQOS ILUMA One",
    tagline: "Il tuo primo passo",
    price: "49",
    description:
      "Compatto e senza compromessi. La porta d'ingresso all'ecosistema IQOS, con tutta la tecnologia HeatControl™ in un formato essenziale.",
    features: [
      "Tecnologia SMARTCORE INDUCTION™",
      "Compatibile con TEREA",
      "Design tutto-in-uno compatto",
      "Ricarica USB-C",
      "Autonomia per 20 stick",
    ],
    cta: "Scopri ILUMA One",
    highlight: false,
    accentColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  {
    id: "prime",
    tag: "Bestseller",
    name: "IQOS ILUMA Prime",
    tagline: "L'esperienza completa",
    price: "119",
    description:
      "Il massimo dell'ingegneria IQOS. Finitura premium, LED personalizzabile, cap magnetico. Tecnologia e lusso in un unico oggetto.",
    features: [
      "Tecnologia SMARTCORE INDUCTION™",
      "Compatibile con TEREA",
      "Finitura premium soft-touch",
      "LED di stato personalizzabile",
      "Cap magnetico di ricarica",
      "Autonomia estesa",
    ],
    cta: "Scopri ILUMA Prime",
    highlight: true,
    accentColor: "rgba(0,209,193,0.05)",
    borderColor: "rgba(0,209,193,0.35)",
  },
];

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#00D1C1] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Shop() {
  return (
    <section id="scopri" className="bg-[#0A0A0A] py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-[#C8A96E] text-xs tracking-[0.35em] uppercase mb-5">Gamma prodotti</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/90 mb-6 leading-none">
            Trova il tuo IQOS.
          </h2>
          <p className="text-white/40 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Due proposte, una sola tecnologia. Scegli il dispositivo che rispecchia il tuo stile.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="relative flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: p.accentColor,
                border: `1px solid ${p.borderColor}`,
                boxShadow: p.highlight
                  ? "0 0 60px rgba(0,209,193,0.07), inset 0 1px 0 rgba(0,209,193,0.15)"
                  : "inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Badge */}
              {p.highlight && (
                <div className="absolute top-0 left-0 right-0 flex justify-center">
                  <span className="bg-[#00D1C1] text-black text-[10px] font-bold px-5 py-1.5 tracking-[0.2em] uppercase rounded-b-xl">
                    {p.tag}
                  </span>
                </div>
              )}

              <div className="flex-1 flex flex-col p-8 md:p-10 pt-12">
                {/* Tag (non-highlighted) */}
                {!p.highlight && (
                  <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-4">
                    {p.tag}
                  </span>
                )}

                {/* Name & Price */}
                <div className="mb-6">
                  <p className={`text-xs tracking-[0.2em] uppercase mb-2 ${p.highlight ? "text-[#00D1C1]/70" : "text-white/40"}`}>
                    {p.tagline}
                  </p>
                  <h3 className="text-2xl font-bold text-white/90 tracking-tight mb-3">
                    {p.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white/40 text-sm">da</span>
                    <span className={`text-4xl font-bold ${p.highlight ? "text-white" : "text-white/80"}`}>
                      {p.price}€
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  {p.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-2.5 mb-10 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-sm text-white/55">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#"
                  className={`block text-center py-4 px-6 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
                    p.highlight
                      ? "bg-[#00D1C1] text-black hover:scale-[1.02]"
                      : "border border-white/20 text-white hover:bg-white/[0.07]"
                  }`}
                  style={
                    p.highlight
                      ? { boxShadow: "0 0 24px rgba(0,209,193,0.35)" }
                      : undefined
                  }
                >
                  {p.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center text-white/25 text-xs mt-10 tracking-wide"
        >
          Prezzi indicativi. Disponibile su iqos.com e presso rivenditori autorizzati.
        </motion.p>
      </div>
    </section>
  );
}
