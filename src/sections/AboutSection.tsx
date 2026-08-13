import { about, highlights } from "../data/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 shadow-glow">
            <img
              src={about.portrait}
              alt="Kamile Guler second portrait"
              className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
            />
          </div>

          <div className="space-y-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-cyan">{about.eyebrow}</p>
              <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.05em] text-ink sm:text-5xl">
                {about.title}
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.36em] text-muted">{item.label}</p>
                  <p className="mt-2 text-sm leading-7 text-ink/85">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-5 text-base leading-8 text-muted">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
