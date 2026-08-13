import { Suspense, lazy, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavBar } from "./components/navigation/NavBar";
import { BootSequence } from "./components/boot/BootSequence";
import { ContactSection } from "./sections/ContactSection";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ResearchSection } from "./sections/ResearchSection";
import { WorldsSection } from "./sections/WorldsSection";
import { useActiveSection } from "./hooks/useActiveSection";
import { navItems } from "./data/portfolio";

const sectionIds = navItems.map((item) => item.id);
const UniverseScene = lazy(() => import("./three/UniverseScene"));

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  const sectionIndex = useMemo(() => {
    const currentIndex = navItems.findIndex((item) => item.id === activeSection);
    return currentIndex >= 0 ? currentIndex + 1 : 1;
  }, [activeSection]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-canvas text-ink">
      <Suspense fallback={null}>
        <UniverseScene />
      </Suspense>
      <NavBar activeSection={activeSection} sectionIndex={sectionIndex} />

      <main className="relative z-10">
        <HeroSection ready={bootComplete} />
        <WorldsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ResearchSection />
        <AboutSection />
        <ContactSection />
      </main>

      <AnimatePresence>
        {!bootComplete ? (
          <motion.div
            key="boot"
            className="fixed inset-0 z-[60]"
            exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
          >
            <BootSequence onComplete={() => setBootComplete(true)} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default App;
