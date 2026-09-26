"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import ScrambleText from "@/components/ScrambleText";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type NavId =
  | "home"
  | "about"
  | "experience"
  | "services"
  | "portfolio"
  | "tools"
  | "skills"
  | "contact";

type NavLink = {
  id: NavId;
  /** Hash section on home, or absolute path for standalone pages */
  href: string;
  kind: "section" | "page";
};

const links: NavLink[] = [
  { href: "#home", id: "home", kind: "section" },
  { href: "#about", id: "about", kind: "section" },
  { href: "#experience", id: "experience", kind: "section" },
  { href: "#services", id: "services", kind: "section" },
  { href: "#portfolio", id: "portfolio", kind: "section" },
  { href: "#tools", id: "tools", kind: "section" },
  { href: "/skills", id: "skills", kind: "page" },
  { href: "#contact", id: "contact", kind: "section" },
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
  const router = useRouter();
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";
  const isSkills = pathname?.startsWith("/skills");

  // Track active section based on scroll position (home only)
  useEffect(() => {
    if (!isHome) {
      if (isSkills) setActive("skills");
      return;
    }

    const update = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let current = "home";
      for (const link of links) {
        if (link.kind !== "section") continue;
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= scrollY) current = link.id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isHome, isSkills]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const handleClick = (e: React.MouseEvent, link: NavLink) => {
    e.preventDefault();
    setMobileOpen(false);

    if (link.kind === "page") {
      router.push(link.href);
      return;
    }

    if (isHome) {
      scrollToSection(link.id);
      return;
    }

    router.push(`/${link.href}`);
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
                href={link.kind === "page" ? link.href : isHome ? link.href : `/${link.href}`}
                onClick={(e) => handleClick(e, link)}
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
                  ? i === 0
                    ? { rotate: 45, y: 7 }
                    : i === 1
                      ? { opacity: 0, scaleX: 0 }
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
        className="fixed inset-0 z-[55] flex flex-col md:hidden"
        style={{
          backgroundColor: "var(--color-bg)",
          paddingTop: "max(4.5rem, env(safe-area-inset-top))",
          paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
        }}
      >
        <nav
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col justify-center items-center px-6"
          style={{ WebkitOverflowScrolling: "touch" }}
          aria-label="Mobile navigation"
        >
          <div
            className="flex flex-col items-center w-full max-w-[20rem]"
            style={{ gap: "clamp(0.7rem, 2.4vh, 1.35rem)", padding: "0.5rem 0 1rem" }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.id}
                href={link.kind === "page" ? link.href : isHome ? link.href : `/${link.href}`}
                onClick={(e) => handleClick(e, link)}
                initial={{ opacity: 0, y: 16 }}
                animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: i * 0.045 + 0.08 }}
                className="w-full text-center"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.55rem, 6.5vw, 2.35rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
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
        </nav>

        <p
          className="shrink-0 text-center px-4"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-muted)",
            fontSize: "0.58rem",
            letterSpacing: "0.14em",
          }}
        >
          CRAFTED CODE HUB · MANAGUA NI
        </p>
      </motion.div>
    </>
  );
}
