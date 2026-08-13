import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectModal } from "../components/projects/ProjectModal";
import { ProjectPanel } from "../components/projects/ProjectPanel";
import { projects, type Project } from "../data/portfolio";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      introTimeline
        .fromTo(
          ".projects-code-line",
          { opacity: 0, y: 20, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power2.out" },
        )
        .to(".projects-code-line", {
          opacity: 0,
          y: -18,
          filter: "blur(10px)",
          duration: 0.38,
          delay: 0.34,
          ease: "power2.inOut",
        })
        .fromTo(
          ".project-panel",
          { opacity: 0, y: 50, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.72,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.08",
        );
    }, sectionRef);

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <>
      <section id="projects" ref={sectionRef} className="relative px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 lg:max-w-4xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-cyan">04 / PROJECTS</p>
            <h2 className="text-3xl font-semibold tracking-[-0.06em] text-ink sm:text-5xl">SELECTED WORK</h2>
            <p className="max-w-2xl text-base leading-8 text-muted">
              A selection of real projects spanning live product work, AI experimentation, responsive interfaces, and
              systems-oriented programming.
            </p>
          </div>

          <div className="mb-10 flex min-h-[56px] items-center">
            <p className="projects-code-line font-mono text-sm uppercase tracking-[0.34em] text-cyan/85">
              projects.map(project =&gt; render(project))
            </p>
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <ProjectPanel
                key={project.id}
                project={project}
                reverse={index % 2 === 1}
                onOpen={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
