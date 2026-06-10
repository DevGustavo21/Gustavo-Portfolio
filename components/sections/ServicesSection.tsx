"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ScrambleText from "@/components/ScrambleText";
import { useLang } from "@/lib/i18n";

const serviceNumbers = ["01", "02", "03", "04", "05"];

type Service = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
};

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden"
      style={{ borderBottom: "1px solid var(--color-border)" }}
      data-cursor-hover
    >
      {/* Accent number bg — fades in */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute right-6 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(5rem, 9vw, 8rem)",
              color: "var(--color-accent)",
              fontWeight: 700,
              lineHeight: 1,
              opacity: 0.08,
            }}
            aria-hidden="true"
          >
            {service.number}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Header row — always visible */}
      <div className="flex items-center gap-4 md:gap-8 py-7 px-2 relative z-10">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            color: hovered ? "var(--color-accent)" : "var(--color-muted)",
            fontSize: "0.68rem",
            letterSpacing: "0.15em",
            transition: "color 0.25s",
            minWidth: "32px",
          }}
        >
          {service.number}
        </span>

        <div className="flex-1">
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--size-h2)",
              letterSpacing: "-0.02em",
              color: hovered ? "var(--color-accent)" : "var(--color-primary)",
              fontWeight: 600,
              lineHeight: 1.1,
              transition: "color 0.25s",
            }}
          >
            <ScrambleText text={service.title} />
          </h3>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-secondary)",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              marginTop: "0.25rem",
            }}
          >
            <ScrambleText text={service.subtitle} />
          </p>
        </div>

        <motion.span
          animate={{ x: hovered ? 6 : 0, color: hovered ? "#C8FF00" : "var(--color-muted)" }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: "1.1rem", flexShrink: 0 }}
        >
          →
        </motion.span>
      </div>

      {/* Expandable description — smooth height + fade */}
      <AnimatePresence initial={false}>
        {hovered && (
          <motion.div
            key="desc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-12 pb-7 hidden md:block">
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-secondary)",
                  fontSize: "1.05rem",
                  lineHeight: "1.75",
                  maxWidth: "560px",
                  borderLeft: "2px solid var(--color-accent)",
                  paddingLeft: "1rem",
                }}
              >
                <ScrambleText text={service.description} />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: always show description */}
      <div className="md:hidden px-2 pb-5">
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-secondary)",
            fontSize: "16px",
            lineHeight: "1.7",
          }}
        >
          <ScrambleText text={service.description} />
        </p>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const { t } = useLang();
  const services: Service[] = t.services.items.map((s, i) => ({
    ...s,
    number: serviceNumbers[i],
  }));
  return (
    <section id="services" className="md:min-h-screen max-w-[1600px] mx-auto px-6 md:pl-40 md:pr-16 py-20 md:py-32">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--color-muted)",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          marginBottom: "4rem",
        }}
      >
        <ScrambleText text={t.services.index} />
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--size-h1)",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: "var(--color-primary)",
          fontWeight: 700,
          marginBottom: "4rem",
          maxWidth: "520px",
        }}
      >
        <ScrambleText text={t.services.heading} />
      </motion.h2>

      <div style={{ borderTop: "1px solid var(--color-border)" }}>
        {services.map((s, i) => (
          <ServiceRow key={s.number} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
