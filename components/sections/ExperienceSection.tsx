"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrambleText from "@/components/ScrambleText";
import { useLang } from "@/lib/i18n";

const roleMeta: { id: string; companyUrl?: string }[] = [
  { id: "01" },
  { id: "02", companyUrl: "https://craftedcodehub.com/" },
  { id: "03" },
  { id: "04" },
];

type Role = {
  id: string;
  companyUrl?: string;
  title: string;
  company: string;
  period: string;
  type: string;
  description: string;
};

function RoleRow({ role, index }: { role: Role; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-y-4 lg:gap-x-12 py-10"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      {/* Left: number + title + company */}
      <div className="lg:w-56 flex-shrink-0">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-muted)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          {role.id}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
            letterSpacing: "-0.02em",
            color: "var(--color-primary)",
            fontWeight: 600,
            lineHeight: 1.2,
            marginBottom: "0.35rem",
          }}
        >
          <ScrambleText text={role.title} />
        </h3>
        {role.companyUrl ? (
          <a
            href={role.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            data-cursor-hover
            className="hover:opacity-70"
          >
            <ScrambleText text={role.company} /> ↗
          </a>
        ) : (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
            }}
          >
            <ScrambleText text={role.company} />
          </span>
        )}
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            color: "var(--color-muted)",
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            marginTop: "0.25rem",
          }}
        >
          <ScrambleText text={role.type} />
        </span>
      </div>

      {/* Center: description */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-text-secondary)",
          fontSize: "var(--size-body)",
          lineHeight: "var(--leading-body)",
          alignSelf: "center",
        }}
      >
        <ScrambleText text={role.description} />
      </p>

      {/* Right: period */}
      <div className="flex items-start lg:items-center lg:justify-end">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-muted)",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            whiteSpace: "nowrap",
          }}
        >
          <ScrambleText text={role.period} />
        </span>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const { t } = useLang();
  const roles: Role[] = t.experience.roles.map((r, i) => ({
    ...r,
    id: roleMeta[i].id,
    companyUrl: roleMeta[i].companyUrl,
  }));
  return (
    <section id="experience" className="md:min-h-screen max-w-[1600px] mx-auto px-6 md:pl-40 md:pr-16 py-20 md:py-32">
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
        <ScrambleText text={t.experience.index} />
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--size-h1)",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: "var(--color-primary)",
          fontWeight: 700,
          marginBottom: "4rem",
          maxWidth: "540px",
        }}
      >
        <ScrambleText text={t.experience.heading} />
      </motion.h2>

      <div style={{ borderTop: "1px solid var(--color-border)" }}>
        {roles.map((role, i) => (
          <RoleRow key={role.id} role={role} index={i} />
        ))}
      </div>
    </section>
  );
}
