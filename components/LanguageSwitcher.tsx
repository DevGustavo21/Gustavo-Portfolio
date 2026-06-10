"use client";

import { motion } from "framer-motion";
import { useLang, type Lang } from "@/lib/i18n";

const OPTIONS: Lang[] = ["es", "en"];

export default function LanguageSwitcher({
  className,
  fontSize = "0.65rem",
}: {
  className?: string;
  fontSize?: string;
}) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
      role="group"
      aria-label="Language selector"
    >
      {OPTIONS.map((opt, i) => (
        <span key={opt} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
          {i > 0 && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-border)",
                fontSize,
              }}
              aria-hidden="true"
            >
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(opt)}
            aria-pressed={lang === opt}
            data-cursor-hover
            className="relative"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px 0",
              fontFamily: "var(--font-mono)",
              fontSize,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: lang === opt ? "var(--color-accent)" : "var(--color-muted)",
              transition: "color 0.2s",
            }}
          >
            {opt}
            {lang === opt && (
              <motion.span
                layoutId="lang-underline"
                className="absolute left-0 right-0"
                style={{ bottom: -2, height: "1px", backgroundColor: "var(--color-accent)", display: "block" }}
              />
            )}
          </button>
        </span>
      ))}
    </div>
  );
}
