"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ThreeBackground from "@/components/ThreeBackground";
import ScrambleText from "@/components/ScrambleText";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLang } from "@/lib/i18n";

const EMAIL = "gustavomejiafuentes2111@gmail.com";

function buildHighlightMap(text: string, highlights: string[]) {
  const map = new Array(text.length).fill(false);
  for (const h of highlights) {
    if (!h) continue;
    let from = 0;
    let idx = text.indexOf(h, from);
    while (idx !== -1) {
      for (let i = idx; i < idx + h.length; i++) map[i] = true;
      from = idx + h.length;
      idx = text.indexOf(h, from);
    }
  }
  return map;
}

function TypedLine({
  text,
  highlights,
  visible,
  showCaret,
  isLast,
}: {
  text: string;
  highlights: string[];
  visible: number;
  showCaret: boolean;
  isLast: boolean;
}) {
  const hl = useMemo(() => buildHighlightMap(text, highlights), [text, highlights]);
  const shown = text.slice(0, visible).split("");

  return (
    <p
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        letterSpacing: "0.04em",
        lineHeight: 1.9,
        minHeight: "1.9em",
        color: isLast ? "var(--color-accent)" : "var(--color-muted)",
      }}
    >
      {shown.map((ch, i) => {
        const colored = isLast || hl[i];
        // Colored letters (green action line + red keywords) fade in fluidly,
        // letter by letter. Normal letters just appear (typewriter "loading").
        if (colored) {
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                color: isLast ? "var(--color-accent)" : "#ff2255",
                fontWeight: 700,
                whiteSpace: "pre",
              }}
            >
              {ch}
            </motion.span>
          );
        }
        return (
          <span key={i} style={{ whiteSpace: "pre" }}>
            {ch}
          </span>
        );
      })}
      {showCaret && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.7 }}
          style={{
            display: "inline-block",
            width: "7px",
            height: "0.95em",
            marginLeft: "2px",
            backgroundColor: "var(--color-accent)",
            verticalAlign: "middle",
          }}
        />
      )}
    </p>
  );
}

function TerminalBlock({ lines, highlights }: { lines: string[]; highlights: string[] }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // Reset / fast-forward when language (lines) changes.
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLineIdx(lines.length);
      setCharCount(0);
      return;
    }
    setLineIdx(0);
    setCharCount(0);
  }, [lines]);

  // Drive the typewriter: type current line char by char, then advance.
  useEffect(() => {
    if (lineIdx >= lines.length) return;
    const current = lines[lineIdx];
    if (charCount < current.length) {
      const id = setTimeout(() => setCharCount((c) => c + 1), 26);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setLineIdx((n) => n + 1);
      setCharCount(0);
    }, 380);
    return () => clearTimeout(id);
  }, [lineIdx, charCount, lines]);

  const done = lineIdx >= lines.length;

  return (
    <motion.div
      variants={itemVariants}
      className="mb-10"
      style={{
        border: "1px solid var(--color-border)",
        backgroundColor: "rgba(17,17,16,0.6)",
        padding: "1rem 1.25rem",
        minHeight: `${lines.length * 1.9 + 2}rem`,
      }}
    >
      {lines.map((line, i) => {
        if (i > lineIdx) return null;
        const isCurrent = i === lineIdx && !done;
        const visible = isCurrent ? charCount : line.length;
        return (
          <TypedLine
            key={line}
            text={line}
            highlights={highlights}
            visible={visible}
            showCaret={isCurrent}
            isLast={i === lines.length - 1}
          />
        );
      })}
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function SuspendedClient() {
  const { t } = useLang();

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <ThreeBackground />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.055) 2px, rgba(0,0,0,0.055) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Language switcher */}
      <div className="fixed top-6 right-6 z-50">
        <LanguageSwitcher fontSize="16px" />
      </div>

      {/* Top meta bar */}
      <div className="relative z-[2] w-full max-w-[1100px] mx-auto px-6 pt-8 flex items-center justify-between">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-primary)",
            fontSize: "16px",
            letterSpacing: "0.18em",
          }}
        >
          {t.suspended.metaLeft}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-[2] flex-1 flex items-center w-full max-w-[1100px] mx-auto px-6 py-20">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
          {/* Status tag */}
          <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-3">
            <span
              className="inline-block"
              style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ff2255" }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "#ff2255",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                border: "1px solid rgba(255,34,85,0.4)",
                padding: "5px 10px",
              }}
            >
              <ScrambleText text={t.suspended.statusTag} />
            </span>
          </motion.div>

          {/* Two-column: message/description (left) + terminal/actions (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
            {/* Left: 503 + title + paragraphs */}
            <div>
              <motion.p
                variants={itemVariants}
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(4.5rem, 16vw, 11rem)",
                  lineHeight: 0.9,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "transparent",
                  WebkitTextStroke: "1px var(--color-border)",
                  marginBottom: "1.5rem",
                }}
              >
                503
              </motion.p>

              <motion.h1
                variants={itemVariants}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 5vw, 3.4rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.08,
                  color: "var(--color-primary)",
                  fontWeight: 700,
                  maxWidth: "720px",
                  marginBottom: "2rem",
                }}
              >
                <ScrambleText text={t.suspended.title} />
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="space-y-5"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-secondary)",
                  fontSize: "1rem",
                  lineHeight: "1.75",
                  maxWidth: "560px",
                }}
              >
                <p>
                  <ScrambleText text={t.suspended.p1} />
                </p>
                <p>
                  <ScrambleText text={t.suspended.p2} />
                </p>
              </motion.div>
            </div>

            {/* Right: terminal block + actions */}
            <div className="w-full">
              <TerminalBlock lines={t.suspended.terminal} highlights={t.suspended.terminalHighlights} />

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 sm:items-center">
                <Link
                  href="/"
                  data-cursor-hover
                  className="inline-flex items-center gap-3 group"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-accent)",
                    fontSize: "0.82rem",
                    letterSpacing: "0.15em",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--color-accent)",
                    paddingBottom: "4px",
                    width: "fit-content",
                  }}
                >
                  <span aria-hidden="true">←</span>
                  <ScrambleText text={t.suspended.back} />
                </Link>

                <a
                  href={`mailto:${EMAIL}`}
                  data-cursor-hover
                  className="inline-flex items-center gap-3"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-text-secondary)",
                    fontSize: "0.82rem",
                    letterSpacing: "0.15em",
                    textDecoration: "none",
                    width: "fit-content",
                  }}
                >
                  <ScrambleText text={t.suspended.contactLabel} />
                  <span aria-hidden="true">↗</span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
