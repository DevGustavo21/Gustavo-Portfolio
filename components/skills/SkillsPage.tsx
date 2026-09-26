"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThreeBackground from "@/components/ThreeBackground";
import ScrambleText from "@/components/ScrambleText";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/i18n";
import {
  skillsCatalog,
  skillCategoryOrder,
  type SkillCategoryId,
  type SkillMeta,
} from "@/lib/skills";

type FilterId = "all" | SkillCategoryId;

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function SkillCard({
  skill,
  index,
  title,
  description,
  tags,
  categoryLabel,
  downloadLabel,
}: {
  skill: SkillMeta;
  index: number;
  title: string;
  description: string;
  tags: string[];
  categoryLabel: string;
  downloadLabel: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden flex flex-col"
      style={{
        backgroundColor: hovered ? "#13160A" : "var(--color-bg-secondary)",
        border: "1px solid",
        borderColor: hovered ? "var(--color-accent)" : "var(--color-border)",
        boxShadow: hovered
          ? "0 0 0 1px var(--color-accent), 0 24px 60px -28px rgba(200,255,0,0.45)"
          : "none",
        transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        minHeight: "340px",
        padding: "2rem",
      }}
      data-cursor-hover
    >
      <div
        className="absolute -top-24 -right-24 pointer-events-none"
        style={{
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,255,0,0.14), transparent 70%)",
          opacity: hovered ? 1 : 0.3,
          transition: "opacity 0.4s ease",
        }}
        aria-hidden="true"
      />

      <span
        className="absolute right-4 bottom-2 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4.5rem, 10vw, 7.5rem)",
          color: hovered ? "rgba(200,255,0,0.09)" : "var(--color-bg)",
          fontWeight: 700,
          lineHeight: 1,
          transition: "color 0.3s",
        }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10 flex flex-col flex-1 justify-between gap-8">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-bg)",
                backgroundColor: "var(--color-accent)",
                fontSize: "0.58rem",
                letterSpacing: "0.16em",
                fontWeight: 700,
                padding: "4px 8px",
              }}
            >
              {categoryLabel.toUpperCase()}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-muted)",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
              }}
            >
              .SKILL
            </span>
          </div>

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
              letterSpacing: "-0.03em",
              color: hovered ? "var(--color-accent)" : "var(--color-primary)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "0.85rem",
              transition: "color 0.25s",
            }}
          >
            {title}
          </h3>

          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-secondary)",
              fontSize: "1.02rem",
              lineHeight: 1.7,
              maxWidth: "420px",
            }}
          >
            {description}
          </p>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  color: hovered ? "var(--color-accent)" : "var(--color-text-secondary)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  padding: "3px 8px",
                  border: "1px solid",
                  borderColor: hovered ? "var(--color-accent)" : "var(--color-border)",
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={skill.file}
            download
            className="inline-flex items-center gap-2 flex-shrink-0"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            data-cursor-hover
          >
            <ScrambleText text={downloadLabel} />
            <motion.span
              animate={hovered ? { x: [0, 5, 0] } : { x: 0 }}
              transition={hovered ? { repeat: Infinity, duration: 1.6 } : { duration: 0.2 }}
            >
              ↓
            </motion.span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function SkillsPage() {
  const { t } = useLang();
  const [filter, setFilter] = useState<FilterId>("all");

  const categories = useMemo(() => {
    const used = new Set(skillsCatalog.map((s) => s.category));
    return skillCategoryOrder.filter((id) => used.has(id));
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return skillsCatalog;
    return skillsCatalog.filter((s) => s.category === filter);
  }, [filter]);

  const filters: { id: FilterId; label: string }[] = [
    { id: "all", label: t.skills.filterAll },
    ...categories.map((id) => ({
      id,
      label: t.skills.categories[id],
    })),
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[78vh] flex flex-col py-16 overflow-hidden">
        <ThreeBackground />

        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.055) 2px, rgba(0,0,0,0.055) 4px)",
          }}
          aria-hidden="true"
        />

        <div
          className="fixed right-[-70px] top-1/2 hidden lg:block z-10"
          style={{ transform: "rotate(90deg) translateY(-50%)" }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-muted)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              whiteSpace: "nowrap",
            }}
          >
            <ScrambleText text={t.skills.sideLabel} />
          </motion.span>
        </div>

        <div className="relative z-[2] flex flex-col flex-1 w-full max-w-[1600px] pt-16 md:pt-8 mx-auto px-6 md:pl-40 md:pr-16">
          <div className="relative z-[2] flex flex-col justify-center flex-1">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
              }}
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
                }}
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-accent)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.18em",
                  marginBottom: "2rem",
                }}
              >
                <ScrambleText text={t.skills.label} />
              </motion.p>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
                }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--size-hero)",
                  letterSpacing: "var(--tracking-hero)",
                  lineHeight: 0.92,
                  color: "var(--color-primary)",
                  fontWeight: 700,
                  marginBottom: "0.15em",
                }}
              >
                {t.skills.heading.split("").map((char, i) => (
                  <span key={`${char}-${i}`} className="glitch-letter" data-text={char} data-cursor-hover>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </motion.h1>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
                }}
                className="mb-10 mt-8"
                style={{ height: "1px", backgroundColor: "var(--color-muted)", maxWidth: "520px" }}
              />

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
                }}
                className="flex flex-col md:flex-row gap-10 md:gap-20 items-start"
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                    fontSize: "var(--size-body)",
                    lineHeight: "var(--leading-body)",
                    maxWidth: "420px",
                  }}
                >
                  <ScrambleText text={t.skills.descr} />
                </p>

                <div className="flex flex-col gap-3 pt-1">
                  <a
                    href="#catalog"
                    className="inline-flex items-center gap-3"
                    data-cursor-hover
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-accent)",
                        fontSize: "0.8rem",
                        letterSpacing: "0.15em",
                      }}
                    >
                      <ScrambleText text={t.skills.ctaBrowse} />
                    </span>
                    <motion.span
                      animate={{ x: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      style={{ color: "var(--color-accent)", fontSize: "1rem" }}
                    >
                      →
                    </motion.span>
                  </a>
                  <a
                    href="/#home"
                    className="inline-flex items-center gap-3"
                    data-cursor-hover
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-text-secondary)",
                        fontSize: "0.8rem",
                        letterSpacing: "0.15em",
                      }}
                    >
                      <ScrambleText text={t.skills.ctaHome} />
                    </span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.55 }}
            className="relative z-[2] flex flex-wrap gap-10 md:gap-16 py-10 mt-6"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            {t.skills.stats.map((stat) => (
              <div key={stat.label}>
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
        </div>
      </section>

      {/* Catalog */}
      <section
        id="catalog"
        className="max-w-[1600px] mx-auto px-6 md:pl-40 md:pr-16 py-20 md:py-28"
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-accent)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            marginBottom: "1.5rem",
          }}
        >
          <ScrambleText text={t.skills.index} />
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-16 mb-12 items-end">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--size-h1)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--color-primary)",
              fontWeight: 700,
            }}
          >
            <ScrambleText text={t.skills.catalogHeading} />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.65 }}
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              borderLeft: "2px solid var(--color-accent)",
              paddingLeft: "1.25rem",
            }}
          >
            <ScrambleText text={t.skills.catalogSub} />
          </motion.p>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label={t.skills.filterLabel}
        >
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                data-cursor-hover
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "10px 14px",
                  border: "1px solid",
                  borderColor: active ? "var(--color-accent)" : "var(--color-border)",
                  backgroundColor: active ? "rgba(200,255,0,0.08)" : "transparent",
                  color: active ? "var(--color-accent)" : "var(--color-text-secondary)",
                  cursor: "pointer",
                  transition: "color 0.2s, border-color 0.2s, background-color 0.2s",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => {
              const copy = t.skills.items[skill.id];
              return (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  index={i}
                  title={copy.title}
                  description={copy.description}
                  tags={copy.tags}
                  categoryLabel={t.skills.categories[skill.category]}
                  downloadLabel={t.skills.download}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-muted)",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              padding: "3rem 0",
            }}
          >
            <ScrambleText text={t.skills.empty} />
          </p>
        )}
      </section>

      <Footer />
    </main>
  );
}
