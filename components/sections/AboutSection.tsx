"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { IconType } from "react-icons";
import ScrambleText from "@/components/ScrambleText";
import { useLang } from "@/lib/i18n";
import {
  SiVuedotjs,
  SiNextdotjs,
  SiAstro,
  SiSass,
  SiTailwindcss,
  SiWordpress,
  SiWoocommerce,
  SiLaravel,
  SiPhp,
  SiSupabase,
  SiPostgresql,
  SiOpenai,
  SiClaude,
  SiFigma,
} from "react-icons/si";

const SiCursor: IconType = ({ size = "1em", color = "currentColor", title, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
  </svg>
);

const SiAcf: IconType = ({ size = "1em", color = "currentColor", title, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <rect x="1" y="4" width="22" height="16" rx="3" fill="none" stroke={color} strokeWidth="1.6" />
    <text x="12" y="15.6" textAnchor="middle" fontFamily="monospace" fontSize="7.2" fontWeight="700" fill={color}>
      ACF
    </text>
  </svg>
);

type Skill = {
  name: string;
  level: string;
  year: string;
  color: string;
  bg: string;
  desc: string;
  icons: IconType[];
};

const skills: Skill[] = [
  { name: "WordPress / WooCommerce", level: "Expert", year: "2018", color: "#21759B", bg: "#071520", desc: "Custom themes · WooCommerce · REST API", icons: [SiWordpress, SiWoocommerce] },
  { name: "ACF Pro", level: "Expert", year: "2019", color: "#00D3AE", bg: "#04130F", desc: "Flexible content · Custom fields · Blocks", icons: [SiAcf] },
  { name: "Next.js / Astro", level: "Expert", year: "2021", color: "#E2E8F0", bg: "#0E1117", desc: "App Router · Server Components · SSG", icons: [SiNextdotjs, SiAstro] },
  { name: "Vue.js", level: "Advanced", year: "2022", color: "#42B883", bg: "#06150F", desc: "Composition API · SFC · Pinia", icons: [SiVuedotjs] },
  { name: "Laravel / PHP", level: "Advanced", year: "2019", color: "#FF2D20", bg: "#1A0706", desc: "Eloquent · Blade · REST APIs", icons: [SiLaravel, SiPhp] },
  { name: "Sass / Tailwind CSS", level: "Expert", year: "2018", color: "#38BDF8", bg: "#061726", desc: "BEM · Utility-first · Design systems", icons: [SiSass, SiTailwindcss] },
  { name: "Supabase / PostgreSQL", level: "Advanced", year: "2023", color: "#3ECF8E", bg: "#061A11", desc: "Auth · Realtime · Row-level security", icons: [SiSupabase, SiPostgresql] },
  { name: "AI-Powered Workflows", level: "Advanced", year: "2024", color: "#C8FF00", bg: "#0D1409", desc: "Cursor · Claude · OpenAI · Automation", icons: [SiCursor, SiClaude, SiOpenai] },
  { name: "Figma / UI Design", level: "Proficient", year: "2020", color: "#A259FF", bg: "#110B1A", desc: "Components · Auto-layout · Prototypes", icons: [SiFigma] },
];

function TechVisual({ skill }: { skill: Skill | null }) {
  const { t } = useLang();
  return (
    <AnimatePresence mode="wait">
      {skill ? (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full flex flex-col justify-between p-8"
          style={{ backgroundColor: skill.bg, border: "1px solid", borderColor: skill.color + "33" }}
        >
          {/* Top label */}
          <span style={{ fontFamily: "var(--font-mono)", color: skill.color, fontSize: "0.58rem", letterSpacing: "0.2em", opacity: 0.7 }}>
            {(t.about.levels[skill.level] ?? skill.level).toUpperCase()} · {skill.year}
          </span>

          {/* Brand logos */}
          <div className="flex-1 flex items-center justify-center gap-6">
            {skill.icons.map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ color: skill.color, display: "flex" }}
              >
                <Icon size={skill.icons.length >= 3 ? 52 : skill.icons.length === 2 ? 64 : 84} aria-hidden="true" />
              </motion.div>
            ))}
          </div>

          {/* Bottom info */}
          <div>
            <p style={{ fontFamily: "var(--font-display)", color: skill.color, fontSize: "0.85rem", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "0.25rem" }}>
              {skill.name}
            </p>
            <p style={{ fontFamily: "var(--font-mono)", color: skill.color, fontSize: "0.6rem", letterSpacing: "0.1em", opacity: 0.55 }}>
              {skill.desc}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SkillRow({
  skill,
  index,
  onEnter,
  onLeave,
}: {
  skill: Skill;
  index: number;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="flex items-center justify-between py-4 group"
      style={{ borderBottom: "1px dashed var(--color-border)", cursor: "default" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-cursor-hover
    >
      <span style={{ fontFamily: "var(--font-body)", color: "var(--color-primary)", fontSize: "0.95rem", transition: "color 0.2s" }}
        className="group-hover:text-accent">
        {skill.name}
      </span>
      <div className="flex items-center gap-8">
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)", fontSize: "0.68rem", letterSpacing: "0.1em" }}>
          <ScrambleText text={t.about.levels[skill.level] ?? skill.level} />
        </span>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  return (
    <section id="about" className="relative md:min-h-screen max-w-[1600px] mx-auto px-6 md:pl-40 md:pr-16 py-20 md:py-32 overflow-hidden">
      {/* Decorative "6" */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(14rem, 28vw, 24rem)", color: "var(--color-bg-secondary)", lineHeight: 1, fontWeight: 700 }}
        aria-hidden="true"
      >
        6
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.7rem", letterSpacing: "0.2em", marginBottom: "4rem" }}
      >
        <ScrambleText text={t.about.index} />
      </motion.p>

      {/* Bio + dot grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-28 mb-24">
        <div ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.6vw, 3.4rem)", letterSpacing: "-0.03em", lineHeight: 1.08, color: "var(--color-primary)", fontWeight: 700, marginBottom: "2rem" }}
          >
            <ScrambleText text={t.about.heading} />
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="space-y-5"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)", fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}
          >
            <p>
              <ScrambleText text={t.about.p1before} />
              <a
                href="https://craftedcodehub.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-primary)", fontWeight: 700, textDecoration: "none", borderBottom: "1px solid var(--color-muted)", transition: "border-color 0.2s" }}
                data-cursor-hover
              >
                <ScrambleText text={t.about.p1link} />
              </a>
              <ScrambleText text={t.about.p1after} />
            </p>
            <p>
              <ScrambleText text={t.about.p2} />
            </p>
            <p>
              <ScrambleText text={t.about.p3before} />
              <a
                href="https://sanjose.wordcamp.org/2025/speaker/gustavo-adolfo-mejia-fuentes/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-primary)", fontWeight: 700, textDecoration: "none", borderBottom: "1px solid var(--color-muted)", transition: "border-color 0.2s" }}
                data-cursor-hover
              >
                <ScrambleText text={t.about.p3strong} />
              </a>
              <ScrambleText text={t.about.p3after} />
            </p>
          </motion.div>
        </div>

        {/* Right: dot grid */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-[340px]">
            <div
              className="absolute inset-0 grid"
              style={{ gridTemplateColumns: "repeat(14, 1fr)", gridTemplateRows: "repeat(14, 1fr)", gap: "3px", padding: "3px" }}
            >
              {Array.from({ length: 196 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  style={{ backgroundColor: i % 17 === 0 ? "var(--color-accent)" : "var(--color-border)" }}
                  animate={{ opacity: [0.2, i % 7 === 0 ? 0.9 : 0.5, 0.2] }}
                  transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2, ease: "easeInOut" }}
                />
              ))}
            </div>

            <div
              className="absolute bottom-3 left-3"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)", fontSize: "0.65rem", letterSpacing: "0.15em" }}
            >
              <ScrambleText text={t.about.badge} />
            </div>
          </div>
        </div>
      </div>

      {/* Skills table + tech visual panel */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start">
        {/* Skills table */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.68rem", letterSpacing: "0.2em", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid var(--color-border)" }}
          >
            <ScrambleText text={t.about.tableHeader} />
          </motion.p>
          {skills.map((s, i) => (
            <SkillRow
              key={s.name}
              skill={s}
              index={i}
              onEnter={() => setHoveredSkill(s)}
              onLeave={() => setHoveredSkill(null)}
            />
          ))}
        </div>

        {/* Tech visual panel */}
        <div className="hidden lg:block sticky top-32" style={{ height: "320px" }}>
          <TechVisual skill={hoveredSkill} />
        </div>
      </div>
    </section>
  );
}
