"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  // Step 1: only enable on pointer-fine devices (no touch / mobile).
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
  }, []);

  // Step 2: once the dot is rendered, wire up movement + hover detection.
  useEffect(() => {
    if (!enabled) return;

    const el = cursorRef.current;
    if (!el) return;

    let x = -100, y = -100;
    let raf: number;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const tick = () => {
      if (el) el.style.transform = `translate(${x - 6}px, ${y - 6}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const enterHover = () => setHovering(true);
    const leaveHover = () => setHovering(false);

    window.addEventListener("mousemove", move);

    // Observe DOM for interactive elements
    const attach = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach((el) => {
        el.addEventListener("mouseenter", enterHover);
        el.addEventListener("mouseleave", leaveHover);
      });
    };
    attach();

    // Re-attach when DOM changes (Framer Motion renders new elements)
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        width: hovering ? "22px" : "12px",
        height: hovering ? "22px" : "12px",
        borderRadius: "50%",
        backgroundColor: hovering ? "transparent" : "#C8FF00",
        border: hovering ? "1.5px solid #C8FF00" : "none",
        transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border 0.2s ease",
        willChange: "transform",
        transform: "translate(-100px, -100px)",
      }}
    />
  );
}
