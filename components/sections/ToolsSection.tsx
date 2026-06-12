"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrambleText from "@/components/ScrambleText";
import { useLang } from "@/lib/i18n";

type Tool = {
  id: number;
  name: string;
  url: string;
  year: string;
  tags: string[];
  client: string;
  description: string;
};

const toolMeta = [
  { id: 1, name: "Business Scrapper", url: "https://business-scrapper-nine.vercel.app/", year: "2024", tags: ["Next.js", "Playwright", "Node.js"] },
  { id: 2, name: "Webplify", url: "https://webplify.vercel.app/", year: "2024", tags: ["Next.js", "Sharp", "WebAssembly"] },
];

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const { t } = useLang();
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLAnchorElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.a
      ref={ref}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden block group"
      style={{
        backgroundColor: hovered ? "#13160A" : "var(--color-bg-secondary)",
        border: "1px solid",
        borderColor: hovered ? "var(--color-accent)" : "var(--color-border)",
        boxShadow: hovered ? "0 0 0 1px var(--color-accent), 0 24px 60px -28px rgba(200,255,0,0.45)" : "none",
        transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        minHeight: "380px",
        padding: "2.25rem",
        textDecoration: "none",
      }}
      data-cursor-hover
    >
      {/* Accent corner glow */}
      <div
        className="absolute -top-24 -right-24 pointer-events-none"
        style={{
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,255,0,0.16), transparent 70%)",
          opacity: hovered ? 1 : 0.35,
          transition: "opacity 0.4s ease",
        }}
        aria-hidden="true"
      />

      <span
        className="absolute right-5 bottom-3 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(5rem, 11vw, 9rem)",
          color: hovered ? "rgba(200,255,0,0.10)" : "var(--color-bg)",
          fontWeight: 700,
          lineHeight: 1,
          transition: "color 0.3s",
        }}
        aria-hidden="true"
      >
        {String(tool.id).padStart(2, "0")}
      </span>

      {/* Tool badge */}
      <span
        className="absolute top-5 right-5"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--color-bg)",
          backgroundColor: "var(--color-accent)",
          fontSize: "0.58rem",
          letterSpacing: "0.18em",
          fontWeight: 700,
          padding: "4px 9px",
        }}
      >
        {t.nav.tools.toUpperCase()}
      </span>

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)", fontSize: "0.66rem", letterSpacing: "0.14em", marginBottom: "0.9rem" }}>
            <ScrambleText text={tool.client} /> — {tool.year}
          </p>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              letterSpacing: "-0.03em",
              color: hovered ? "var(--color-accent)" : "var(--color-primary)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "0.85rem",
              transition: "color 0.25s",
            }}
          >
            {tool.name}
          </h3>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)", fontSize: "1.05rem", lineHeight: "1.7", maxWidth: "460px" }}>
            <ScrambleText text={tool.description} />
          </p>
        </div>

        <div className="mt-8 flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
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

          <span
            className="ml-auto flex-shrink-0 inline-flex items-center gap-2"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)", fontSize: "0.72rem", letterSpacing: "0.12em", whiteSpace: "nowrap" }}
          >
            <ScrambleText text={t.tools.viewTool} />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function ToolsSection() {
  const { t } = useLang();
  const tools: Tool[] = toolMeta.map((tool, i) => ({
    ...tool,
    client: t.tools.items[i].client,
    description: t.tools.items[i].description,
  }));

  return (
    <section id="tools" className="md:min-h-screen max-w-[1600px] mx-auto px-6 md:pl-40 md:pr-16 py-20 md:py-32">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)", fontSize: "0.7rem", letterSpacing: "0.2em", marginBottom: "4rem" }}
      >
        <ScrambleText text={t.tools.index} />
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-16 mb-14 items-end">
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-h1)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--color-primary)", fontWeight: 700 }}
        >
          <ScrambleText text={t.tools.heading} />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-secondary)",
            fontSize: "1.05rem",
            lineHeight: "1.75",
            borderLeft: "2px solid var(--color-accent)",
            paddingLeft: "1.25rem",
          }}
        >
          <ScrambleText text={t.tools.subheading} />
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tools.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} />
        ))}
      </div>
    </section>
  );
}
