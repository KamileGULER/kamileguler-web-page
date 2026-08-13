import { MagneticButton } from "../components/ui/MagneticButton";
import { socials } from "../data/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="relative px-4 pb-20 pt-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8 shadow-glow sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-cyan">CONTACT</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-none tracking-[-0.06em] text-ink sm:text-6xl lg:text-7xl">
              LET&apos;S BUILD SOMETHING MEANINGFUL.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted">
              For software, AI, and quantum-focused opportunities, feel free to reach out through email or the links below.
            </p>
          </div>

          <div className="space-y-6">
            <MagneticButton
              label="START A CONVERSATION"
              href="mailto:kamile.guler32@gmail.com"
              className="w-full justify-center sm:w-auto"
            />

            <div className="grid gap-3">
              {socials.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4 transition duration-300 hover:border-cyan/30"
                  >
                    <span className="flex items-center gap-3 text-sm text-ink/85">
                      <Icon size={16} className="text-cyan" />
                      {item.label}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted transition duration-300 group-hover:text-ink">
                      Open
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
