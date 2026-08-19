import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { codeIdentity, hero } from "../data/portfolio";
import { fadeUp } from "../animations/variants";
import { MagneticButton } from "../components/ui/MagneticButton";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type HeroSectionProps = {
  ready: boolean;
};

export function HeroSection({ ready }: HeroSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ready || prefersReducedMotion || !heroRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { y: 32, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
        },
      );
    }, heroRef);

    return () => context.revert();
  }, [prefersReducedMotion, ready]);

  return (
    <section
      id="index"
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(92,225,230,0.08),transparent_32%),radial-gradient(circle_at_70%_20%,rgba(120,108,246,0.12),transparent_30%),linear-gradient(180deg,rgba(5,7,10,0.2),rgba(5,7,10,0.92))]" />
      <div className="absolute inset-0 bg-hero-grid bg-[length:72px_72px] opacity-[0.06]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-8">
          <div className="hero-reveal space-y-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-cyan">DIGITAL UNIVERSE</p>
            <h1 className="flex flex-wrap items-baseline gap-x-6 text-[13vw] font-semibold leading-[0.88] tracking-[-0.08em] text-ink sm:text-[4.4rem] lg:text-[6rem]">
              {hero.name.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
          </div>

          <motion.div
            variants={fadeUp}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate={ready ? "visible" : "hidden"}
            className="hero-reveal max-w-3xl"
          >
            <p className="text-base leading-8 text-ink/74 sm:text-lg">{hero.statement}</p>
          </motion.div>

          <div className="hero-reveal flex flex-col items-start gap-4 sm:flex-row">
            <MagneticButton label={hero.primaryCta.label} href={hero.primaryCta.href} />
            <MagneticButton
              label={hero.secondaryCta.label}
              href={hero.secondaryCta.href}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            />
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate={ready ? "visible" : "hidden"}
          className="hero-reveal justify-self-end"
        >
          <div className="group relative mx-auto max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-3 shadow-glow">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(92,225,230,0.16),transparent_38%)] opacity-70 transition duration-500 group-hover:opacity-100" />
            <img
              src={hero.portrait}
              alt="Kamile Guler portrait"
              className="relative z-10 aspect-[4/5] w-full rounded-[1.5rem] object-cover saturate-[0.9] transition duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#work"
        variants={fadeUp}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={ready ? "visible" : "hidden"}
        className="hero-reveal absolute bottom-8 left-4 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.4em] text-muted sm:left-6 lg:left-10"
      >
        <ArrowDown size={14} className="text-cyan" />
        {hero.status}
      </motion.a>
    </section>
  );
}
