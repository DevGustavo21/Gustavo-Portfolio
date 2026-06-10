"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ThreeBackground from "@/components/ThreeBackground";
import ScrambleText from "@/components/ScrambleText";
import { useLang } from "@/lib/i18n";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

function AnimatedName({ text }: { text: string }) {
  return (
    <motion.h1
      variants={itemVariants}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "var(--size-hero)",
        letterSpacing: "var(--tracking-hero)",
        lineHeight: 0.92,
        color: "var(--color-primary)",
        fontWeight: 700,
        display: "block",
        maxWidth: "100%",
      }}
    >
      {text.split("").map((char, i) => (
        <span key={`${char}-${i}`} className="glitch-letter" data-text={char} data-cursor-hover>
          {char}
        </span>
      ))}
    </motion.h1>
  );
}

export default function HeroSection() {
  const { t } = useLang();
  const [hablemosHovered, setHablemosHovered] = useState(false);

  // Ver Trabajo: green+arrow by default, muted when Hablemos hovered
  // Hablemos: muted by default, green+arrow when hovered

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col py-16 overflow-hidden"
    >
      <ThreeBackground />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.055) 2px, rgba(0,0,0,0.055) 4px)" }}
        aria-hidden="true"
      />

      {/* Side label */}
      <div
        className="fixed right-[-70px] top-1/2 hidden lg:block z-10"
        style={{ transform: "rotate(90deg) translateY(-50%)" }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.65rem", letterSpacing: "0.2em", whiteSpace: "nowrap" }}
        >
          <ScrambleText text={t.hero.sideLabel} />
        </motion.span>
      </div>

      {/* Centered 1440 container */}
      <div className="relative z-[2] flex flex-col flex-1 w-full max-w-[1600px] mx-auto px-6 md:pl-40 md:pr-16">

      {/* Hero content */}
      <div className="relative z-[2] flex flex-col justify-center flex-1">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* Label */}
          <motion.div variants={itemVariants} className="mb-8">
            <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)", fontSize: "0.75rem", letterSpacing: "0.18em" }}>
              <ScrambleText text={t.hero.label} />
            </p>
          </motion.div>

          {/* Name */}
          <div className="mb-1">
            <AnimatedName text="GUSTAVO" />
          </div>
          <div className="mb-10 md:mb-12">
            <AnimatedName text="MEJIA" />
          </div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="mb-10" style={{ height: "1px", backgroundColor: "var(--color-muted)", maxWidth: "600px" }} />

          {/* Description + CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-10 md:gap-24 items-start">
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-secondary)",
                fontSize: "var(--size-body)",
                lineHeight: "var(--leading-body)",
                maxWidth: "380px",
              }}
            >
              <ScrambleText text={t.hero.descr} />
            </p>

            <div className="flex flex-col gap-4 pt-1">
              {/* Ver trabajo — active when Hablemos NOT hovered */}
              <a
                href="#portfolio"
                className="inline-flex items-center gap-3 transition-colors duration-200"
                data-cursor-hover
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: hablemosHovered ? "var(--color-muted)" : "var(--color-accent)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.15em",
                    transition: "color 0.25s",
                  }}
                >
                  <ScrambleText text={t.hero.ctaWork} />
                </span>
                <motion.span
                  animate={{
                    x: hablemosHovered ? 0 : [0, 6, 0],
                    color: hablemosHovered ? "var(--color-muted)" : "#C8FF00",
                  }}
                  transition={hablemosHovered ? { duration: 0.25 } : { repeat: Infinity, duration: 2 }}
                  style={{ fontSize: "1rem" }}
                >
                  →
                </motion.span>
              </a>

              {/* Hablemos — active (green+arrow) when hovered */}
              <a
                href="#contact"
                className="inline-flex items-center gap-3 transition-colors duration-200"
                data-cursor-hover
                onMouseEnter={() => setHablemosHovered(true)}
                onMouseLeave={() => setHablemosHovered(false)}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: hablemosHovered ? "var(--color-accent)" : "var(--color-text-secondary)",
                    fontSize: "0.8rem",
                    letterSpacing: "0.15em",
                    transition: "color 0.25s",
                  }}
                >
                  <ScrambleText text={t.hero.ctaTalk} />
                </span>
                <motion.span
                  animate={{
                    opacity: hablemosHovered ? 1 : 0,
                    x: hablemosHovered ? [0, 6, 0] : 0,
                    color: "#C8FF00",
                  }}
                  transition={hablemosHovered ? { repeat: Infinity, duration: 2 } : { duration: 0.25 }}
                  style={{ fontSize: "1rem" }}
                >
                  →
                </motion.span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="relative z-[2] flex flex-wrap gap-10 md:gap-16 py-10 mt-8"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        {t.hero.stats.map((stat) => (
          <div key={stat.value}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                color: "var(--color-accent)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-secondary)",
                fontSize: "1rem",
                marginTop: "0.4rem",
                lineHeight: 1.4,
              }}
            >
              <ScrambleText text={stat.label} />
            </p>
          </div>
        ))}
      </motion.div>

      {/* Scroll counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="relative z-[2] flex items-center gap-4"
      >
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.7rem", letterSpacing: "0.15em" }}>
          001 / 006
        </span>
        <div style={{ height: "1px", width: "60px", backgroundColor: "var(--color-muted)" }} />
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.7rem", letterSpacing: "0.15em" }}>
          <ScrambleText text={t.hero.scroll} />
        </span>
      </motion.div>

      </div>
    </section>
  );
}
