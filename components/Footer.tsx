"use client";

import { useEffect, useRef, useState } from "react";
import ScrambleText from "@/components/ScrambleText";
import { useLang } from "@/lib/i18n";

const EMAIL = "gustavomejiafuentes2111@gmail.com";

const footerNav: { id: "home" | "about" | "services" | "portfolio" | "contact"; href: string }[] = [
  { id: "home", href: "#home" },
  { id: "about", href: "#about" },
  { id: "services", href: "#services" },
  { id: "portfolio", href: "#portfolio" },
  { id: "contact", href: "#contact" },
];

function GlitchText({ text }: { text: string }) {
  const [glitching, setGlitching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const schedule = () => {
      timerRef.current = setTimeout(() => {
        setGlitching(true);
        setTimeout(() => { setGlitching(false); schedule(); }, 380);
      }, Math.random() * 8000 + 5000);
    };
    schedule();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <span
      className="relative inline-block select-none"
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(5rem, 14vw, 11rem)",
        fontWeight: 700,
        letterSpacing: "-0.04em",
        lineHeight: 0.9,
        color: "transparent",
        WebkitTextStroke: "1px var(--color-border)",
      }}
      aria-hidden="true"
    >
      {text}
      {glitching && (
        <>
          <span
            className="absolute inset-0"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px var(--color-accent)",
              clipPath: "polygon(0 18%, 100% 18%, 100% 42%, 0 42%)",
              transform: "translateX(-5px)",
            }}
          >
            {text}
          </span>
          <span
            className="absolute inset-0"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px #ff2255",
              clipPath: "polygon(0 58%, 100% 58%, 100% 78%, 0 78%)",
              transform: "translateX(4px)",
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="relative max-w-[1600px] mx-auto px-6 md:pl-40 md:pr-16 pt-16 pb-8">
        {/* Decorative glitch initials behind content */}
        <div className="absolute inset-0 flex items-center justify-start pointer-events-none pl-6 md:pl-32 overflow-hidden opacity-60">
          <GlitchText text="GM" />
        </div>

        {/* Footer grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Identity */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.62rem", letterSpacing: "0.2em", marginBottom: "1rem" }}>
              <ScrambleText text={t.footer.identity} />
            </p>
            <p style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)", fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
              Gustavo Mejia
            </p>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)", fontSize: "16px", lineHeight: "1.7" }}>
              <ScrambleText text={t.footer.role} />
              <br />
              <ScrambleText text={t.footer.cofounder} />{" "}
              <a href="https://craftedcodehub.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)", fontWeight: 700, textDecoration: "none", borderBottom: "1px solid var(--color-border)", transition: "border-color 0.2s" }} data-cursor-hover>
                Crafted Code Hub
              </a>
              <br />
              <ScrambleText text={t.footer.location} />
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.62rem", letterSpacing: "0.2em", marginBottom: "1rem" }}>
              <ScrambleText text={t.footer.navigation} />
            </p>
            <div className="space-y-2">
              {footerNav.map(({ id, href }) => (
                <div key={href}>
                  <a
                    href={href}
                    style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)", fontSize: "0.72rem", letterSpacing: "0.12em", textDecoration: "none", transition: "color 0.2s" }}
                    className="hover:text-accent"
                    data-cursor-hover
                  >
                    <ScrambleText text={t.nav[id]} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.62rem", letterSpacing: "0.2em", marginBottom: "1rem" }}>
              <ScrambleText text={t.footer.contactLabel} />
            </p>
            <a
              href={`mailto:${EMAIL}`}
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                color: "var(--color-accent)",
                fontSize: "0.72rem",
                letterSpacing: "0.05em",
                textDecoration: "none",
                marginBottom: "1.5rem",
                wordBreak: "break-all",
              }}
              data-cursor-hover
            >
              {EMAIL}
            </a>
            <div className="flex gap-4">
              {[
                { label: "LI", href: "https://www.linkedin.com/in/gustavomejia21/", title: "LinkedIn" },
                { label: "GH", href: "https://github.com/DevGustavo21", title: "GitHub" },
                { label: "IG", href: "https://www.instagram.com/gustmejiafuentes/", title: "Instagram" },
              ].map(({ label, href, title }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-muted)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    textDecoration: "none",
                    border: "1px solid var(--color-border)",
                    padding: "6px 10px",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  className="hover:text-accent hover:border-accent"
                  data-cursor-hover
                >
                  {label}
                </a>
              ))}
            </div>
            <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.58rem", letterSpacing: "0.12em", marginTop: "1.75rem" }}>
              12.1328° N, 86.2926° W
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.62rem", letterSpacing: "0.12em" }}>
            © {year} Gustavo Mejia · Crafted Code Hub · <ScrambleText text={t.footer.rights} />
          </span>
        </div>
      </div>
    </footer>
  );
}
