"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "> initializing gustavo-mejia.dev",
  "> loading assets... [████████████] 100%",
  "> compiling experience & projects",
  "> mounting components",
  "> boot sequence complete",
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      onComplete();
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setVisibleLines((prev) => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 400);
      }
    }, 320);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-center items-start px-8 md:px-24"
          style={{ backgroundColor: "var(--color-bg)" }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8">
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-muted)",
              }}
            >
              GUSTAVO MEJIA / PORTFOLIO / v2.0
            </span>
          </div>
          <div className="space-y-2">
            {visibleLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  color: i === visibleLines.length - 1
                    ? "var(--color-accent)"
                    : "var(--color-muted)",
                  fontSize: "0.875rem",
                }}
              >
                {line}
              </motion.p>
            ))}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.7 }}
              style={{
                display: "inline-block",
                width: "10px",
                height: "1.1em",
                backgroundColor: "var(--color-accent)",
                verticalAlign: "middle",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
