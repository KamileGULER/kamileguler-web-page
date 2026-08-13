import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect } from "react";
import type { Project } from "../../data/portfolio";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${project.id}-title`}
            className="relative max-h-[88vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(13,19,26,0.98),rgba(7,10,15,0.98))] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/25 text-ink transition duration-300 hover:border-cyan/30"
              aria-label="Close project details"
            >
              <X size={18} />
            </button>

            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-cyan">{project.number}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                    {project.category}
                  </span>
                </div>

                <div>
                  <h2 id={`${project.id}-title`} className="text-3xl font-semibold tracking-[-0.05em] text-ink sm:text-5xl">
                    {project.name}
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-ink/78">{project.description}</p>
                </div>

                <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan">TECHNOLOGY</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/82"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan">HIGHLIGHTS</p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan/80" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-5">
                {project.media && project.media.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.media.map((item, index) => (
                      <div
                        key={`${item.src}-${index}`}
                        className={`overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20 ${
                          index === 0 ? "sm:col-span-2" : ""
                        }`}
                      >
                        {item.type === "image" ? (
                          <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
                        ) : (
                          <video controls className="h-full w-full object-cover">
                            <source src={item.src} type="video/mp4" />
                          </video>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-[280px] items-center justify-center rounded-[1.6rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(92,225,230,0.1),transparent_40%),linear-gradient(180deg,rgba(9,13,18,0.92),rgba(5,7,10,1))] p-8 text-center">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.36em] text-cyan/80">{project.category}</p>
                      <p className="mt-5 font-mono text-xl tracking-[0.24em] text-ink/86">{project.note}</p>
                    </div>
                  </div>
                )}

                {project.links.length > 0 ? (
                  <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan">LINKS</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {project.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.26em] text-ink transition duration-300 hover:border-cyan/30"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight size={14} />
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
