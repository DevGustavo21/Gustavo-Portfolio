"use client";

import { useState, useRef, forwardRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ScrambleText from "@/components/ScrambleText";
import { useLang } from "@/lib/i18n";

type Project = {
  id: number;
  name: string;
  url: string;
  client: string;
  year: string;
  category: string;
  tags: string[];
  description: string;
  size: string;
};

const projectMeta = [
  { id: 1, name: "Remote Talent LatAm", url: "https://remotetalentlatam.com/", year: "2024", category: "site", tags: ["Next.js", "Supabase", "Tailwind"], size: "large" },
  { id: 2, name: "Finger Foods Farm", url: "https://www.fingerfoodsfarm.com/", year: "2024", category: "site", tags: ["WordPress", "WooCommerce", "GSAP"], size: "small" },
  { id: 3, name: "CrossGo", url: "https://www.crossgo.com/", year: "2023", category: "site", tags: ["Next.js", "TypeScript", "Framer Motion"], size: "medium" },
  { id: 4, name: "Chile Perro Bravo", url: "https://chile-perro-bravo.vercel.app/", year: "2024", category: "site", tags: ["Next.js", "Framer Motion", "Tailwind"], size: "small" },
  { id: 5, name: "Momentum Construction", url: "https://momentumconstructionutah.com/", year: "2023", category: "site", tags: ["WordPress", "Elementor Pro", "GSAP"], size: "medium" },
  { id: 6, name: "Business Scrapper", url: "https://business-scrapper-nine.vercel.app/", year: "2024", category: "tool", tags: ["Next.js", "TypeScript", "Playwright"], size: "large" },
  { id: 7, name: "Webplify", url: "https://webplify.vercel.app/", year: "2024", category: "tool", tags: ["Next.js", "TypeScript", "Sharp"], size: "medium" },
];

const sizeSpan: Record<string, string> = {
  large: "md:col-span-2",
  medium: "md:col-span-1",
  small: "md:col-span-1",
};

const sizeHeight: Record<string, string> = {
  large: "320px",
  medium: "280px",
  small: "260px",
};

const ProjectCard = forwardRef<HTMLElement, { project: Project }>(function ProjectCard({ project }, forwardedRef) {
  const { t } = useLang();
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const setRefs = (node: HTMLElement | null) => {
    ref.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <motion.article
      ref={setRefs}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden ${sizeSpan[project.size]}`}
      style={{
        backgroundColor: hovered ? "#141413" : "var(--color-bg-secondary)",
        border: "1px solid",
        borderColor: hovered ? "var(--color-accent)" : "var(--color-border)",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
        minHeight: sizeHeight[project.size],
        padding: "1.75rem",
        cursor: "pointer",
      }}
      data-cursor-hover
    >
      <span
        className="absolute right-4 bottom-3 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 8vw, 6.5rem)",
          color: hovered ? "var(--color-border)" : "var(--color-bg)",
          fontWeight: 700,
          lineHeight: 1,
          transition: "color 0.3s",
        }}
        aria-hidden="true"
      >
        {String(project.id).padStart(2, "0")}
      </span>

      {project.category === "tool" && (
        <span
          className="absolute top-4 right-4"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-accent)",
            fontSize: "0.58rem",
            letterSpacing: "0.15em",
            border: "1px solid var(--color-accent)",
            padding: "2px 6px",
          }}
        >
          TOOL
        </span>
      )}

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)", fontSize: "0.65rem", letterSpacing: "0.14em", marginBottom: "0.6rem" }}>
            <ScrambleText text={project.client} /> — {project.year}
          </p>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--size-h3)",
              letterSpacing: "-0.02em",
              color: hovered ? "var(--color-accent)" : "var(--color-primary)",
              fontWeight: 600,
              lineHeight: 1.2,
              marginBottom: "0.5rem",
              transition: "color 0.25s",
            }}
          >
            {project.name}
          </h3>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)", fontSize: "1rem", lineHeight: "1.65" }}>
            <ScrambleText text={project.description} />
          </p>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
                className="flex flex-wrap gap-2"
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)", fontSize: "0.58rem", letterSpacing: "0.1em", padding: "2px 7px", border: "1px solid var(--color-accent)" }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex-shrink-0"
            style={{ fontFamily: "var(--font-mono)", color: hovered ? "var(--color-accent)" : "var(--color-muted)", fontSize: "0.68rem", letterSpacing: "0.12em", textDecoration: "none", transition: "color 0.2s", whiteSpace: "nowrap" }}
            data-cursor-hover
          >
            <ScrambleText text={t.portfolio.viewSite} />
          </a>
        </div>
      </div>
    </motion.article>
  );
});

export default function PortfolioSection() {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState("all");
  const projects: Project[] = projectMeta.map((p, i) => ({
    ...p,
    client: t.portfolio.projects[i].client,
    description: t.portfolio.projects[i].description,
  }));
  const filters = t.portfolio.filters;
  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="md:min-h-screen max-w-[1600px] mx-auto px-6 md:pl-40 md:pr-16 py-20 md:py-32">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.7rem", letterSpacing: "0.2em", marginBottom: "4rem" }}
      >
        <ScrambleText text={t.portfolio.index} />
      </motion.p>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-h1)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--color-primary)", fontWeight: 700 }}
        >
          <ScrambleText text={t.portfolio.heading} />
        </motion.h2>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex gap-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className="relative pb-1"
              style={{
                fontFamily: "var(--font-mono)",
                color: activeFilter === f.value ? "var(--color-accent)" : "var(--color-text-secondary)",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              data-cursor-hover
            >
              <ScrambleText text={f.label} />
              {activeFilter === f.value && (
                <motion.span
                  layoutId="filter-line"
                  className="absolute -bottom-0 left-0 right-0"
                  style={{ height: "1px", backgroundColor: "var(--color-accent)", display: "block" }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-3" style={{ gridAutoFlow: "dense" }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
