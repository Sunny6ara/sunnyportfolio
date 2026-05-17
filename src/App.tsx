import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power } from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { GameSection } from './components/GameSection';
import { ContactSection } from './components/ContactSection';
import { AIAssistant } from './components/AIAssistant';

function App() {
  const [initialized, setInitialized] = useState(false);

  return (
    <div className="bg-space-black min-h-screen text-white font-sans selection:bg-neon-cyan selection:text-black">
      
      {/* Initialization Splash Screen */}
      <AnimatePresence>
        {!initialized && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          >
            {/* CRT overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20 opacity-30"></div>
            
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-widest text-white mb-12 animate-pulse text-glow-blue z-30">
              SUNNY.AI
            </h1>
            
            <button 
              type="button"
              onClick={() => setInitialized(true)}
              className="relative z-30 px-12 py-6 rounded-lg glassmorphism-dark border-2 border-neon-cyan text-neon-cyan font-bold tracking-widest hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_40px_rgba(0,255,255,0.8)] transition-all group overflow-hidden"
            >
              <div className="absolute inset-0 bg-neon-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center space-x-3">
                <Power className="w-6 h-6" />
                <span>INITIALIZE SYSTEM</span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${initialized ? 'opacity-100' : 'opacity-0 pointer-events-none h-screen overflow-hidden'}`}>
        <CustomCursor />
        <Navbar />
        
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <GameSection />
          <ContactSection />
        </main>

        <footer className="py-8 text-center border-t border-white/5 bg-space-dark mt-auto relative z-10">
          <p className="text-gray-500 font-mono text-sm">
            &copy; {new Date().getFullYear()} SUNNY.AI | System initialized at KIET.
          </p>
        </footer>

        {/* Floating Global AI Assistant */}
        <AIAssistant autoOpen={initialized} />
      </div>
    </div>
  );
}

export default App;
