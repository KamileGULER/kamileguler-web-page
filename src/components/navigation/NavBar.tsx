import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { navItems } from "../../data/portfolio";
import { useScrollDirection } from "../../hooks/useScrollDirection";

type NavBarProps = {
  activeSection: string;
  sectionIndex: number;
};

export function NavBar({ activeSection, sectionIndex }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrollingDown = useScrollDirection();

  const navClassName = isScrollingDown
    ? "-translate-y-full opacity-0"
    : "translate-y-0 opacity-100";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${navClassName}`}
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <a
          href="#index"
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-2 font-mono text-xs tracking-[0.4em] text-ink/90 backdrop-blur"
        >
          <span>KG</span>
          <span className="hidden text-muted sm:inline">CODE SHAPES THE UNIVERSE</span>
        </a>

        <div className="hidden items-center gap-4 lg:flex">
          <nav className="rounded-full border border-white/10 bg-black/25 px-3 py-2 backdrop-blur">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = item.id === activeSection;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`inline-flex rounded-full px-4 py-2 text-xs font-medium tracking-[0.28em] transition ${
                        active ? "bg-white/10 text-ink" : "text-muted hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="whitespace-nowrap rounded-full border border-cyan/20 bg-cyan/10 px-4 py-2 font-mono text-xs tracking-[0.36em] text-cyan">
            {String(sectionIndex).padStart(2, "0")} / {String(navItems.length).padStart(2, "0")}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-ink backdrop-blur lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-4 rounded-[2rem] border border-white/10 bg-[#070B10]/95 p-4 shadow-glow backdrop-blur lg:hidden"
          >
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <span className="whitespace-nowrap font-mono text-xs tracking-[0.4em] text-cyan">
                {String(sectionIndex).padStart(2, "0")} / {String(navItems.length).padStart(2, "0")}
              </span>
              <span className="text-sm text-muted">Navigation</span>
            </div>

            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const active = item.id === activeSection;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`flex rounded-2xl px-4 py-3 text-sm tracking-[0.25em] ${
                          active ? "bg-white/10 text-ink" : "text-muted"
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
