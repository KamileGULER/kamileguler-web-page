import { ArrowUpRight, MoveRight } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import type { Project } from "../../data/portfolio";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

type ProjectPanelProps = {
  project: Project;
  reverse?: boolean;
  onOpen: (project: Project) => void;
};

const tagPositions = [
  "left-4 top-4",
  "right-4 top-10",
  "left-8 bottom-8",
  "right-10 bottom-4",
];

export function ProjectPanel({ project, reverse = false, onOpen }: ProjectPanelProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !panelRef.current || !mediaRef.current) {
      return;
    }

    const bounds = panelRef.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = ((x / bounds.width) - 0.5) * 4;
    const rotateX = (0.5 - y / bounds.height) * 4;

    panelRef.current.style.setProperty("--gx", `${x}px`);
    panelRef.current.style.setProperty("--gy", `${y}px`);
    panelRef.current.style.transform =
      `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    mediaRef.current.style.transform = `translate3d(${rotateY * 1.4}px, ${-rotateX * 1.4}px, 0px)`;

    if (imageRef.current) {
      imageRef.current.style.transform = `scale(1.04) translate3d(${rotateY * 2.2}px, ${-rotateX * 2.2}px, 0px)`;
    }
  };

  const handlePointerLeave = () => {
    if (!panelRef.current || !mediaRef.current) {
      return;
    }

    panelRef.current.style.transform = "";
    mediaRef.current.style.transform = "";
    panelRef.current.style.setProperty("--gx", "50%");
    panelRef.current.style.setProperty("--gy", "50%");
    if (imageRef.current) {
      imageRef.current.style.transform = "";
    }
  };

  return (
    <motion.article
      layout
      className={`project-panel grid gap-8 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-glow transition duration-300 lg:grid-cols-[1.1fr_0.9fr] lg:p-8 ${
        reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
      }`}
    >
      <div
        ref={panelRef}
        className="project-surface group relative overflow-hidden rounded-[1.75rem] border border-white/8 bg-black/20 transition duration-300"
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
      >
        <div className="project-glow pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" />
        <div
          ref={mediaRef}
          className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[1.65rem] bg-[radial-gradient(circle_at_top,rgba(92,225,230,0.14),transparent_36%),linear-gradient(180deg,rgba(10,15,21,0.9),rgba(7,10,15,1))] transition duration-300"
        >
          {project.image ? (
            <div ref={imageRef} className="h-full w-full transition duration-500">
              <img src={project.image} alt={project.imageAlt ?? project.name} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-8 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.38em] text-cyan/80">{project.category}</span>
              <div className="font-mono text-xl tracking-[0.26em] text-ink/88">{project.note}</div>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(5,7,10,0.18)_55%,rgba(5,7,10,0.72))]" />

          <div className="absolute inset-0 hidden lg:block">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={tech}
                className={`absolute ${tagPositions[index % tagPositions.length]} rounded-full border border-cyan/20 bg-canvas/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-cyan opacity-0 transition duration-300 group-hover:opacity-100`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-7">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-cyan">{project.number}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.26em] text-muted">
              {project.category}
            </span>
            {project.status ? (
              <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.26em] text-cyan">
                {project.status}
              </span>
            ) : null}
          </div>

          <div>
            <h3 className="text-3xl font-semibold tracking-[-0.05em] text-ink sm:text-4xl">{project.name}</h3>
            <p className="mt-4 max-w-xl text-base leading-8 text-ink/76">{project.summary}</p>
            {project.note && project.image ? <p className="mt-3 text-sm leading-7 text-muted">{project.note}</p> : null}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/84"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-3 rounded-full border border-cyan/30 bg-cyan/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ink transition duration-300 hover:border-cyan/60"
          >
            <span>Open Details</span>
            <MoveRight size={14} className="transition duration-300 group-hover:translate-x-1" />
          </button>

          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted transition duration-300 hover:border-white/20 hover:text-ink"
            >
              <span>{link.label}</span>
              <ArrowUpRight size={14} className="transition duration-300 hover:-translate-y-1 hover:translate-x-1" />
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
