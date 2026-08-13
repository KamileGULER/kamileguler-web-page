import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "../data/portfolio";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".experience-row",
        { opacity: 0, x: -28 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="experience" ref={sectionRef} className="relative px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 lg:max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-cyan">05 / EXPERIENCE</p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-ink sm:text-5xl">
            Research, leadership, software practice, and academic progress.
          </h2>
        </div>

        <div className="relative pl-8 sm:pl-12">
          <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-cyan/70 via-white/10 to-transparent sm:left-5" />

          <div className="space-y-6">
            {experience.map((item) => {
              const Icon = item.icon;

              return (
                <article key={`${item.date}-${item.role}`} className="experience-row relative">
                  <div className="absolute left-0 top-8 flex h-6 w-6 items-center justify-center rounded-full border border-cyan/40 bg-canvas sm:left-[-4px]">
                    <div className="h-2.5 w-2.5 rounded-full bg-cyan" />
                  </div>

                  <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6 shadow-glow lg:grid lg:grid-cols-[120px_1fr] lg:gap-6">
                    <div className="mb-5 flex items-center gap-3 lg:mb-0 lg:block">
                      <span className="font-mono text-xs uppercase tracking-[0.4em] text-cyan">{item.marker}</span>
                      <Icon className="mt-3 hidden text-cyan/70 lg:block" size={18} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-semibold tracking-[-0.04em] text-ink">{item.role}</h3>
                        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">{item.date}</span>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-ink/72">{item.organization}</p>
                      <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan/80" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
