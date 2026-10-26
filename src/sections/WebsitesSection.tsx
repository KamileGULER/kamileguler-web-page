import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { websites } from "../data/portfolio";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function WebsitesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".website-card",
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="websites" ref={sectionRef} className="relative px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 lg:max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-cyan">05 / WEBSITES</p>
          <h2 className="text-3xl font-semibold tracking-[-0.06em] text-ink sm:text-5xl">LIVE ON THE WEB</h2>
          <p className="max-w-2xl text-base leading-8 text-muted">
            Websites designed, built, and deployed end to end. Each one is live and open to explore.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {websites.map((site) => (
            <article
              key={site.id}
              className="website-card group flex flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-glow transition duration-300 hover:-translate-y-1 hover:border-cyan/30"
            >
              <a
                href={site.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${site.name} live site`}
                className="m-3 mb-0 block overflow-hidden rounded-[1.1rem] border border-white/8 bg-black/30"
              >
                <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="ml-2 truncate rounded-full bg-white/[0.05] px-2.5 py-0.5 font-mono text-[9px] tracking-[0.12em] text-muted">
                    {site.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </span>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden bg-canvas">
                  {site.image ? (
                    <img
                      src={site.image}
                      alt={`${site.name} preview`}
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <iframe
                      src={site.liveUrl}
                      title={`${site.name} preview`}
                      loading="lazy"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(5,7,10,0.55))]" />
                </div>
              </a>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.26em] text-muted">
                      {site.category}
                    </span>
                    <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.26em] text-cyan">
                      LIVE
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-ink">{site.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/76">{site.summary}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {site.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/84"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-3">
                  <a
                    href={site.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink transition duration-300 hover:border-cyan/60"
                  >
                    <span>Visit Site</span>
                    <ArrowUpRight size={13} />
                  </a>
                  {site.githubUrl ? (
                    <a
                      href={site.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted transition duration-300 hover:border-white/20 hover:text-ink"
                    >
                      <FolderGit2 size={13} />
                      <span>GitHub</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
