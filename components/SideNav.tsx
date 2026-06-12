"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import ScrambleText from "@/components/ScrambleText";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type NavId = "home" | "about" | "experience" | "services" | "portfolio" | "tools" | "contact";

const links: { href: string; id: NavId }[] = [
  { href: "#home", id: "home" },
  { href: "#about", id: "about" },
  { href: "#experience", id: "experience" },
  { href: "#services", id: "services" },
  { href: "#portfolio", id: "portfolio" },
  { href: "#tools", id: "tools" },
  { href: "#contact", id: "contact" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function SideNav() {
  const { t } = useLang();
  const pathname = usePathname();
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track active section based on scroll position
  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let current = "home";
      for (const { id } of links) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToSection(id);
  };

  // Hide global nav on standalone pages like the suspended-site notice.
  if (pathname?.startsWith("/suspended")) return null;

  return (
    <>
      {/* Desktop vertical nav */}
      <nav
        className="fixed top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6"
        style={{ left: "max(2rem, calc((100vw - 1600px) / 2 + 2rem))" }}
        aria-label="Main navigation"
      >
        {links.map((link, i) => {
          const isActive = active === link.id;
          return (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="flex items-center gap-3"
            >
              <motion.span
                animate={{
                  backgroundColor: isActive ? "#C8FF00" : "#606058",
                  width: isActive ? 16 : 2,
                }}
                transition={{ duration: 0.3 }}
                style={{ display: "block", height: "2px", borderRadius: "1px", minWidth: "2px" }}
              />
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.id)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: isActive ? "var(--color-accent)" : "var(--color-muted)",
                  transition: "color 0.25s",
                }}
                data-cursor-hover
              >
                <ScrambleText text={t.nav[link.id]} />
              </a>
            </motion.div>
          );
        })}
      </nav>

      {/* Desktop language switcher (top-right) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed top-8 right-10 z-50 hidden md:block"
      >
        <LanguageSwitcher />
      </motion.div>

      {/* Mobile top-right controls: language switcher + hamburger */}
      <div className="fixed top-6 right-6 z-[60] flex items-center gap-4 md:hidden">
        <LanguageSwitcher fontSize="16px" />
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex flex-col gap-[5px] p-2"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={
                mobileOpen
                  ? i === 0 ? { rotate: 45, y: 7 }
                  : i === 1 ? { opacity: 0, scaleX: 0 }
                  : { rotate: -45, y: -7 }
                  : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.25 }}
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                backgroundColor: "var(--color-primary)",
                transformOrigin: "center",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile fullscreen overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "auto" : "none" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[55] flex flex-col justify-center items-center md:hidden"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="flex flex-col items-center gap-10">
          {links.map((link, i) => (
            <motion.a
              key={link.id}
              href={link.href}
              onClick={(e) => handleClick(e, link.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.07 + 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 9vw, 3.8rem)",
                letterSpacing: "-0.03em",
                color: active === link.id ? "var(--color-accent)" : "var(--color-primary)",
                textDecoration: "none",
                fontWeight: 700,
                transition: "color 0.2s",
              }}
            >
              <ScrambleText text={t.nav[link.id]} />
            </motion.a>
          ))}
        </div>

        <p
          className="absolute bottom-10"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-muted)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
          }}
        >
          CRAFTED CODE HUB · MANAGUA NI
        </p>
      </motion.div>
    </>
  );
}
