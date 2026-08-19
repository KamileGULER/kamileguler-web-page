import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { worlds } from "../data/portfolio";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function WorldsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".world-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".world-grid",
            start: "top 78%",
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="work" ref={sectionRef} className="relative px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 lg:max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-cyan">CODE TO IDENTITY</p>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-ink sm:text-5xl">
            Software, AI, and quantum computing shape the core direction of the work.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-muted">
            The portfolio moves from code into three connected worlds, each grounded in projects, research, and
            practical technical growth.
          </p>
        </div>

        <div className="grid gap-8">
          <div className="world-grid grid items-stretch gap-5 md:grid-cols-3 md:auto-rows-fr">
            {worlds.map((world) => (
              <motion.article
                key={world.id}
                whileHover={prefersReducedMotion ? undefined : { rotateX: -2, rotateY: 2, y: -4 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="world-card group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(92,225,230,0.12),transparent_34%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full flex-col">
                  <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-cyan/80">{world.section}</p>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-ink">{world.id.toUpperCase()}</h3>
                  <p className="mt-4 text-base leading-7 text-ink/78">{world.title}</p>
                  <p className="mt-4 text-sm leading-7 text-muted">{world.statement}</p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {world.tokens.map((token) => (
                      <span
                        key={token}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/80"
                      >
                        {token}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
