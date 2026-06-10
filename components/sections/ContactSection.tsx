"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrambleText from "@/components/ScrambleText";
import { useLang } from "@/lib/i18n";

const EMAIL = "gustavomejiafuentes2111@gmail.com";

export default function ContactSection() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--color-border)",
    color: "var(--color-primary)",
    fontFamily: "var(--font-mono)",
    fontSize: "0.88rem",
    padding: "0.5rem 0",
    outline: "none",
    letterSpacing: "0.04em",
  };

  return (
    <section id="contact" className="md:min-h-screen max-w-[1600px] mx-auto px-6 md:pl-40 md:pr-16 py-20 md:py-32 flex flex-col">
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
        <ScrambleText text={t.contact.index} />
      </motion.p>

      <div ref={ref} className="flex-1 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24">
        {/* Left */}
        <div className="flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--size-h1)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--color-primary)",
              fontWeight: 700,
              marginBottom: "2.5rem",
            }}
          >
            <ScrambleText text={t.contact.heading} />
          </motion.h2>

          <motion.button
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            onClick={handleCopy}
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
            className="text-left mb-10"
            data-cursor-hover
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            aria-label={t.contact.copyAria}
          >
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(0.95rem, 1.8vw, 1.6rem)",
                letterSpacing: "-0.02em",
                color: emailHovered ? "var(--color-accent-light)" : "var(--color-accent)",
                fontWeight: 600,
                transition: "color 0.2s",
                wordBreak: "break-all",
              }}
            >
              {EMAIL}
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                color: copied ? "var(--color-accent)" : "var(--color-muted)",
                fontSize: "0.68rem",
                letterSpacing: "0.15em",
                marginTop: "0.3rem",
                transition: "color 0.2s",
              }}
            >
              <ScrambleText text={copied ? t.contact.copyDone : t.contact.copyIdle} />
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-muted)", fontSize: "0.65rem", letterSpacing: "0.18em", marginBottom: "0.75rem" }}>
              <ScrambleText text={t.contact.socials} />
            </p>
            {[
              { label: "LinkedIn", href: "https://linkedin.com/in/gustavomejia" },
              { label: "GitHub", href: "https://github.com/gustavomejia" },
              { label: "Instagram", href: "https://instagram.com/gustavomejia" },
            ].map(({ label, href }) => (
              <div key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-text-secondary)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  className="hover:text-accent"
                  data-cursor-hover
                >
                  {label} ↗
                </a>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: form */}
        <div className="flex flex-col justify-center py-4">
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--size-h2)",
                  color: "var(--color-accent)",
                  marginBottom: "1rem",
                }}
              >
                <ScrambleText text={t.contact.form.sentTitle} />
              </span>
              <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)", fontSize: "0.75rem", letterSpacing: "0.12em" }}>
                <ScrambleText text={t.contact.form.sentBody} />
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {[
                { id: "name", label: t.contact.form.name, type: "text", placeholder: t.contact.form.namePh },
                { id: "email", label: t.contact.form.email, type: "email", placeholder: t.contact.form.emailPh },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    style={{ display: "block", fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)", fontSize: "0.65rem", letterSpacing: "0.2em", marginBottom: "0.5rem" }}
                  >
                    <ScrambleText text={field.label} />
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={(e) => setFormData((p) => ({ ...p, [field.id]: e.target.value }))}
                    required
                    style={inputStyle}
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  style={{ display: "block", fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)", fontSize: "0.65rem", letterSpacing: "0.2em", marginBottom: "0.5rem" }}
                >
                  <ScrambleText text={t.contact.form.message} />
                </label>
                <textarea
                  id="message"
                  placeholder={t.contact.form.messagePh}
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  required
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                disabled={sending}
                data-cursor-hover
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-accent)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.15em",
                  cursor: "pointer",
                  opacity: sending ? 0.5 : 1,
                  paddingBottom: "3px",
                  borderBottom: "1px solid var(--color-accent)",
                }}
              >
                <ScrambleText text={sending ? t.contact.form.sending : t.contact.form.send} />
              </motion.button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
