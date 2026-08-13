import { writingLinks } from "../data/portfolio";

export function ResearchSection() {
  return (
    <section id="research" className="relative px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-cyan">RESEARCH & WRITING</p>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-ink sm:text-5xl">
            Writing and research interests that extend the work beyond implementation.
          </h2>
        </div>

        <div className="grid gap-4">
          {writingLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-cyan/30 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted">{item.title}</p>
                  <p className="mt-3 max-w-2xl text-base leading-8 text-ink/80">{item.description}</p>
                </div>
                <item.icon className="mt-1 text-cyan transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
