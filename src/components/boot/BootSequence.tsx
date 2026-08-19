import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const bootLines = [
  "> Hello I'm Kamile ",
];

type BootSequenceProps = {
  onComplete: () => void;
};

export function BootSequence({ onComplete }: BootSequenceProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visibleLineCount, setVisibleLineCount] = useState(prefersReducedMotion ? bootLines.length : 0);
  const [typedText, setTypedText] = useState("");

  const activeLine = useMemo(() => bootLines[visibleLineCount] ?? "", [visibleLineCount]);

  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = window.setTimeout(onComplete, 900);
      return () => window.clearTimeout(timer);
    }

    if (visibleLineCount >= bootLines.length) {
      const timer = window.setTimeout(onComplete, 450);
      return () => window.clearTimeout(timer);
    }

    const line = bootLines[visibleLineCount];
    let charIndex = 0;

    const interval = window.setInterval(() => {
      charIndex += 1;
      setTypedText(line.slice(0, charIndex));

      if (charIndex >= line.length) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setVisibleLineCount((count) => count + 1);
          setTypedText("");
        }, line.length === 0 ? 40 : 130);
      }
    }, 18);

    return () => window.clearInterval(interval);
  }, [activeLine, onComplete, prefersReducedMotion, visibleLineCount]);

  return (
    <div className="flex h-full items-center justify-center bg-[#020304] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur"
      >
        <div className="mb-6 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-white/20" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-cyan/70" />
          <span className="ml-4 font-mono text-[11px] uppercase tracking-[0.36em] text-muted">
            boot.sequence
          </span>
        </div>

        <div className="space-y-2 font-mono text-sm leading-7 text-ink/90 sm:text-base">
          {bootLines.slice(0, visibleLineCount).map((line, index) => (
            <p key={`${line}-${index}`} className={line.includes("render") ? "text-cyan" : "text-ink/85"}>
              {line || "\u00A0"}
            </p>
          ))}

          {visibleLineCount < bootLines.length ? (
            <p className={activeLine.includes("render") ? "text-cyan" : "text-ink/85"}>
              {typedText}
              <span className="ml-1 inline-block h-4 w-2 translate-y-1 bg-cyan/80 align-middle motion-safe:animate-pulse" />
            </p>
          ) : null}
        </div>

        <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      </motion.div>
    </div>
  );
}
