"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useScroll, useSpring, useTransform, motion, AnimatePresence } from "framer-motion";

// Generate the array of 192 frame paths
const TOTAL_FRAMES = 192;
const FRAMES_FOLDER = "/iqos-frames";
const generateFramePaths = (): string[] =>
  Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const index = String(i).padStart(3, "0");
    return `${FRAMES_FOLDER}/frame_${index}_delay-0.041s.jpg`;
  });

const framePaths = generateFramePaths();

interface TextBeat {
  title: string;
  subtitle: string;
  align: "left" | "center" | "right";
  start: number;
  end: number;
  cta?: { label: string; href: string };
}

const beats: TextBeat[] = [
  {
    // Beat A: visible immediately from scroll=0 (no fade-in delay)
    title: "OLTRE IL FUMO.",
    subtitle: "Tecnologia HeatControl™. Tabacco vero. Zero combustione.",
    align: "center",
    start: 0.0,
    end: 0.22,
  },
  {
    title: "CALORE.\nNON FIAMMA.",
    subtitle: "Riscaldato a 350°C. Mai bruciato. Il sapore rimane. Il fumo no.",
    align: "left",
    start: 0.25,
    end: 0.46,
  },
  {
    title: "INGEGNERIA\nINVISIBILE.",
    subtitle: "Ogni componente progettato con precisione.\nUna lama. Una batteria. Un'esperienza.",
    align: "right",
    start: 0.5,
    end: 0.71,
  },
  {
    title: "SCEGLI\nIQOS.",
    subtitle: "Un rituale diverso. Per chi vuole di più.",
    align: "center",
    start: 0.75,
    end: 0.96,
    cta: { label: "Scopri IQOS →", href: "#scopri" },
  },
];

function TextBeatOverlay({
  beat,
  scrollYProgress,
}: {
  beat: TextBeat;
  scrollYProgress: ReturnType<typeof useSpring>;
}) {
  const { start, end, title, subtitle, align, cta } = beat;

  // Beat A (start === 0) should be visible immediately with no fade-in
  const isFirstBeat = start === 0.0;
  const opacityInput = isFirstBeat
    ? [0, 0.001, end - 0.08, end]
    : [start, start + 0.08, end - 0.08, end];
  const yInput = isFirstBeat
    ? [0, 0.001, end - 0.08, end]
    : [start, start + 0.08, end - 0.08, end];

  const opacity = useTransform(
    scrollYProgress,
    opacityInput,
    isFirstBeat ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    yInput,
    isFirstBeat ? [0, 0, 0, -20] : [20, 0, 0, -20]
  );

  const alignClass =
    align === "center"
      ? "items-center text-center"
      : align === "left"
      ? "items-start text-left pl-8 md:pl-24"
      : "items-end text-right pr-8 md:pr-24";

  const titleSize =
    align === "center"
      ? "text-6xl md:text-8xl lg:text-9xl"
      : "text-5xl md:text-7xl lg:text-8xl";

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center ${alignClass} pointer-events-none px-6 sm:px-0`}
    >
      <h2
        className={`${titleSize} font-bold tracking-tighter text-white/90 whitespace-pre-line leading-none mb-5`}
        style={{ textShadow: "0 2px 40px rgba(0,0,0,0.6)" }}
      >
        {title}
      </h2>
      <p className="text-sm md:text-base text-white/60 max-w-xs whitespace-pre-line" style={{ textShadow: "0 1px 12px rgba(0,0,0,0.8)" }}>
        {subtitle}
      </p>
      {cta && (
        <motion.a
          href={cta.href}
          style={{
            pointerEvents: "auto",
            boxShadow: "0 0 24px rgba(0, 209, 193, 0.533)",
          }}
          className="mt-8 inline-block bg-[#00D1C1] text-black font-semibold px-8 py-4 rounded-full text-sm md:text-base"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {cta.label}
        </motion.a>
      )}
    </motion.div>
  );
}

export default function IQOSDevice() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll progress relative to the wrapper section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smoothed scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll indicator opacity (fades out at 10%)
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  // Draw canvas frame
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.min(cw / iw, ch / ih);
    const x = (cw - iw * scale) / 2;
    const y = (ch - ih * scale) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, iw * scale, ih * scale);
  }, []);

  // Resize canvas + redraw
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Load all frames
  useEffect(() => {
    let loadedCount = 0;
    const total = framePaths.length;
    const images: HTMLImageElement[] = new Array(total);
    imagesRef.current = images;

    framePaths.forEach((src, i) => {
      const img = new window.Image();
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / total) * 100));
        if (loadedCount === total) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / total) * 100));
        if (loadedCount === total) setIsLoaded(true);
      };
      img.src = src;
      images[i] = img;
    });
  }, []);

  // Setup canvas size listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Drive animation from smoothProgress
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (val) => {
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(val * (TOTAL_FRAMES - 1)))
      );
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = requestAnimationFrame(() => {
          drawFrame(frameIndex);
        });
      }
    });
    return () => {
      unsubscribe();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [smoothProgress, drawFrame]);

  // Initial draw when loaded
  useEffect(() => {
    if (isLoaded) {
      handleResize();
      drawFrame(0);
    }
  }, [isLoaded, drawFrame, handleResize]);

  return (
    <>
      {/* Full-screen Loader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#0A0A0A]"
          >
            <h1 className="text-white font-bold tracking-widest text-3xl mb-12">IQOS</h1>
            {/* Spinner */}
            <div className="relative w-16 h-16 mb-8">
              <div className="absolute inset-0 rounded-full border-2 border-white/10" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00D1C1] animate-spin" />
            </div>
            {/* Progress bar */}
            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00D1C1] transition-all duration-150 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="mt-4 text-white/30 text-xs tracking-widest">
              {loadingProgress}%
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollytelling section: 400vh tall */}
      <div
        ref={sectionRef}
        className="relative"
        style={{ height: "400vh", position: "relative" }}
      >
        {/* Sticky canvas viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0A]">
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: "#0A0A0A" }}
          />

          {/* Text overlays */}
          <div className="absolute inset-0 pointer-events-none">
            {beats.map((beat) => (
              <TextBeatOverlay
                key={beat.title}
                beat={beat}
                scrollYProgress={smoothProgress}
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <motion.div
            style={{ opacity: scrollIndicatorOpacity }}
            className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none"
          >
            <p className="text-white/40 text-xs tracking-widest uppercase">Scorri per scoprire</p>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <svg
                className="w-5 h-5 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
