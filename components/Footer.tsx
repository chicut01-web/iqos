export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contatti" className="bg-[#0A0A0A]">

      {/* Main footer */}
      <div className="border-t border-white/[0.07] max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <p className="text-white font-bold tracking-[0.3em] text-lg uppercase mb-4">IQOS</p>
            <p className="text-white/30 text-sm leading-relaxed max-w-[200px]">
              Tecnologia HeatControl™.<br />
              Tabacco vero. Zero combustione.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase mb-5">Informazioni</p>
            <nav className="flex flex-col gap-3">
              {["Privacy Policy", "Termini d'uso", "Cookie Policy", "Contatti"].map((l) => (
                <a key={l} href="#" className="text-white/40 hover:text-white text-sm transition-colors duration-200">
                  {l}
                </a>
              ))}
            </nav>
          </div>

          {/* Compliance */}
          <div>
            <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase mb-5">Accesso</p>
            <nav className="flex flex-col gap-3">
              {["Verifica età", "Dove acquistare", "Prodotti TEREA", "Assistenza"].map((l) => (
                <a key={l} href="#" className="text-white/40 hover:text-white text-sm transition-colors duration-200">
                  {l}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Gold separator */}
      <div className="h-px max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C8A96E]/30 to-transparent" />
      </div>

      {/* Legal disclaimer — mandatory tobacco compliance */}
      <div className="max-w-2xl mx-auto px-6 py-10 text-center">
        <p className="text-[11px] leading-relaxed text-white/25 tracking-wide">
          ⚠️ AVVERTENZA: Questo prodotto contiene nicotina, una sostanza che crea dipendenza.{" "}
          <strong className="font-semibold text-white/35">IQOS non è privo di rischi.</strong>{" "}
          Riservato esclusivamente agli adulti fumatori. L&apos;uso di IQOS non elimina i rischi connessi
          all&apos;utilizzo del tabacco o di altri prodotti contenenti nicotina.
        </p>
        <p className="text-[10px] text-white/15 mt-5 tracking-wider">
          © {year} Philip Morris International. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}
