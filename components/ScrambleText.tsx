"use client";

import { useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}=+*^?#·@%&";

type Props = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** Approximate animation length in frames (~60fps). */
  speed?: number;
};

/**
 * Renders text and, whenever `text` changes (e.g. language switch), morphs from
 * the previous string to the new one using a random-character "decode" effect.
 * Updates the DOM node directly to stay performant with many instances.
 */
export default function ScrambleText({ text, className, style, speed = 26 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(text);
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from = prev.current;
    const to = text;
    prev.current = to;

    if (from === to) {
      el.textContent = to;
      return;
    }

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.textContent = to;
      return;
    }

    const len = Math.max(from.length, to.length);
    const queue: { fromCh: string; toCh: string; start: number; end: number; rnd: string }[] = [];
    for (let i = 0; i < len; i++) {
      const fromCh = from[i] ?? "";
      const toCh = to[i] ?? "";
      const start = Math.floor(Math.random() * (speed * 0.5));
      const end = start + Math.floor(Math.random() * (speed * 0.5)) + Math.floor(speed * 0.35);
      queue.push({ fromCh, toCh, start, end, rnd: "" });
    }

    let frame = 0;
    const tick = () => {
      let out = "";
      let done = 0;
      for (const q of queue) {
        if (q.toCh === " " || q.toCh === "\n") {
          out += q.toCh;
          done++;
          continue;
        }
        if (frame >= q.end) {
          out += q.toCh;
          done++;
        } else if (frame >= q.start) {
          if (!q.rnd || Math.random() < 0.3) {
            q.rnd = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          out += q.rnd;
        } else {
          out += q.fromCh;
        }
      }
      el.textContent = out;
      if (done === queue.length) {
        el.textContent = to;
        return;
      }
      frame++;
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [text, speed]);

  return (
    <span ref={ref} className={className} style={style}>
      {text}
    </span>
  );
}
