"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrambleText from "@/components/ScrambleText";
import { useLang } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/whatsapp";

const EMAIL = "gustavomejiafuentes2111@gmail.com";

export default function ContactSection() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);
  const [waHovered, setWaHovered] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
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

        {/* Right: WhatsApp CTA (form temporarily disabled — see commented block below) */}
        <div className="flex flex-col justify-center py-4">
          <motion.a
            href={whatsappUrl(t.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            onMouseEnter={() => setWaHovered(true)}
            onMouseLeave={() => setWaHovered(false)}
            className="relative overflow-hidden block"
            data-cursor-hover
            style={{
              border: "1px solid",
              borderColor: waHovered ? "var(--color-accent)" : "var(--color-border)",
              backgroundColor: waHovered ? "#13160A" : "var(--color-bg-secondary)",
              boxShadow: waHovered ? "0 0 0 1px var(--color-accent), 0 24px 60px -28px rgba(200,255,0,0.45)" : "none",
              transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              padding: "2.25rem",
              textDecoration: "none",
            }}
          >
            <div
              className="absolute -top-24 -right-24 pointer-events-none"
              style={{
                width: "240px",
                height: "240px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(200,255,0,0.16), transparent 70%)",
                opacity: waHovered ? 1 : 0.35,
                transition: "opacity 0.4s ease",
              }}
              aria-hidden="true"
            />

            <span style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--color-accent)" aria-hidden="true">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.099zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-accent)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  border: "1px solid var(--color-accent)",
                  padding: "3px 8px",
                }}
              >
                WHATSAPP
              </span>
            </span>

            <span
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: waHovered ? "var(--color-accent)" : "var(--color-primary)",
                fontWeight: 700,
                transition: "color 0.25s",
                marginBottom: "0.75rem",
              }}
            >
              <ScrambleText text={t.contact.waCta} />
            </span>

            <span
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                color: "var(--color-text-secondary)",
                fontSize: "16px",
                lineHeight: 1.6,
                marginBottom: "1.75rem",
              }}
            >
              <ScrambleText text={t.contact.waHint} />
            </span>

            <span
              className="inline-flex items-center gap-3"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-accent)",
                fontSize: "0.82rem",
                letterSpacing: "0.15em",
                paddingBottom: "3px",
                borderBottom: "1px solid var(--color-accent)",
              }}
            >
              +505 7659 1201
              <motion.span animate={{ x: waHovered ? [0, 6, 0] : 0 }} transition={waHovered ? { repeat: Infinity, duration: 1.6 } : { duration: 0.2 }}>
                →
              </motion.span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

/*
 * Contact form — temporarily disabled in favor of the WhatsApp CTA.
 * To restore: re-add the form state/handlers (formData, sending, sent,
 * handleSubmit, inputStyle) and render this in the right column.
 *
 * <motion.form onSubmit={handleSubmit} className="space-y-8">
 *   {[
 *     { id: "name", label: t.contact.form.name, type: "text", placeholder: t.contact.form.namePh },
 *     { id: "email", label: t.contact.form.email, type: "email", placeholder: t.contact.form.emailPh },
 *   ].map((field) => (
 *     <div key={field.id}>
 *       <label htmlFor={field.id}>{field.label}</label>
 *       <input id={field.id} type={field.type} placeholder={field.placeholder}
 *         value={formData[field.id]} onChange={...} required style={inputStyle} />
 *     </div>
 *   ))}
 *   <div>
 *     <label htmlFor="message">{t.contact.form.message}</label>
 *     <textarea id="message" placeholder={t.contact.form.messagePh} rows={4}
 *       value={formData.message} onChange={...} required style={{ ...inputStyle, resize: "none" }} />
 *   </div>
 *   <motion.button type="submit" disabled={sending}>
 *     {sending ? t.contact.form.sending : t.contact.form.send}
 *   </motion.button>
 * </motion.form>
 */
