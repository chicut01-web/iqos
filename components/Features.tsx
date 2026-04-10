"use client";

import { motion, type Variants } from "framer-motion";

const features = [
  {
    number: "01",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="22" stroke="#00D1C1" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M24 12v12l8 4" stroke="#00D1C1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="24" r="3" fill="#00D1C1" />
      </svg>
    ),
    label: "HeatControl™",
    title: "Temperatura\ndi precisione",
    description:
      "La tecnologia HeatControl™ riscalda il tabacco a esattamente 350°C — mai di più. Senza combustione, senza bruciore. Solo il sapore autentico del tabacco, intatto.",
    stat: "350°C",
    statLabel: "Temperatura massima",
  },
  {
    number: "02",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 8c0 0-12 8-12 18a12 12 0 0 0 24 0C36 16 24 8 24 8z" stroke="#00D1C1" strokeWidth="1.5" />
        <path d="M24 22v8" stroke="#00D1C1" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="32" r="2" fill="#00D1C1"/>
      </svg>
    ),
    label: "Zero impatto sensoriale",
    title: "Nessuna cenere.\nNessun odore.",
    description:
      "Senza combustione non si produce cenere né fumo persistente. Il rituale si chiude con te — nessuna traccia su mani, abiti o ambienti circostanti.",
    stat: "0",
    statLabel: "Grammi di cenere prodotta",
  },
  {
    number: "03",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="10" y="18" width="28" height="20" rx="4" stroke="#00D1C1" strokeWidth="1.5"/>
        <path d="M16 18V14a8 8 0 0 1 16 0v4" stroke="#00D1C1" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="28" r="3" fill="#00D1C1"/>
        <path d="M24 31v4" stroke="#00D1C1" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Design premium",
    title: "Ingegneria\ndi lusso",
    description:
      "Materiali di qualità superiore, finiture soft-touch, LED di stato integrato. Ogni dettaglio progettato per chi non accetta compromessi tra estetica e performance.",
    stat: "192",
    statLabel: "Componenti progettati",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Features() {
  return (
    <section id="tecnologia" className="bg-[#0A0A0A] py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <p className="text-[#C8A96E] text-xs tracking-[0.35em] uppercase mb-5">Tecnologia</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/90 leading-none">
              Perché IQOS.
            </h2>
            <p className="text-white/40 text-sm md:text-base max-w-sm leading-relaxed">
              Progettato per chi non accetta compromessi. Ogni componente pensato per un&apos;esperienza autentica, senza combustione.
            </p>
          </div>
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-white/[0.08] origin-left mb-16"
        />

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.label}
              variants={cardVariants}
              className="group relative bg-[#0A0A0A] p-10 flex flex-col gap-8 hover:bg-white/[0.02] transition-colors duration-500 overflow-hidden"
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D1C1]/0 to-[#00D1C1]/0 group-hover:from-[#00D1C1]/[0.04] group-hover:to-transparent transition-all duration-700 rounded-none" />

              {/* Number */}
              <span className="text-white/10 font-bold text-7xl leading-none absolute top-6 right-8 select-none">
                {feature.number}
              </span>

              {/* Icon */}
              <div className="relative z-10">
                {feature.icon}
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1">
                <p className="text-[#C8A96E] text-[10px] tracking-[0.25em] uppercase mb-3">
                  {feature.label}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white/90 whitespace-pre-line mb-4 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Stat */}
              <div className="relative z-10 pt-6 border-t border-white/[0.08]">
                <p className="text-3xl font-bold text-[#00D1C1] tracking-tight">
                  {feature.stat}
                </p>
                <p className="text-white/30 text-xs tracking-wider mt-1">
                  {feature.statLabel}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
