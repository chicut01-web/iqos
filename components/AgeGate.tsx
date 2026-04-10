"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgeGate() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const hasConsented = sessionStorage.getItem("iqos-age-verified");
    if (hasConsented === "true") {
      setIsVisible(false);
    } else {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleApprove = () => {
    sessionStorage.setItem("iqos-age-verified", "true");
    document.body.style.overflow = "";
    setIsVisible(false);
  };

  const handleDeny = () => {
    setErrorVisible(true);
  };

  if (!isClient) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A] px-4"
        >
          <div className="max-w-md w-full text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
              IQOS
            </h1>
            
            <p className="text-white/60 mb-8 border-b border-white/10 pb-8 text-sm md:text-base">
              Questo sito contiene informazioni su prodotti senza combustione e utilizza i cookie necessari per garantirne il corretto e sicuro funzionamento.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              Sei un adulto fumatore?
            </h2>

            {!errorVisible ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleApprove}
                  className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors uppercase tracking-widest text-sm"
                >
                  Sì, ho più di 18 anni
                </button>
                <button
                  onClick={handleDeny}
                  className="px-8 py-3 bg-transparent border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors uppercase tracking-widest text-sm"
                >
                  No
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/60 text-sm"
              >
                Devi essere un adulto fumatore o utente di altri prodotti contenenti nicotina per accedere a questo sito.
              </motion.div>
            )}

            <p className="mt-12 text-xs text-white/30">
              AVVERTENZA: Questo prodotto contiene nicotina, una sostanza che crea dipendenza. <br />
              Riservato esclusivamente agli adulti fumatori.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
