import React from 'react';
import { motion } from 'framer-motion';
import { ParticleBackground } from './ParticleBackground';
import { ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      {/* Background radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-space-gray/50 via-space-black to-space-black z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-6 relative"
        >
          <div className="absolute inset-0 blur-3xl bg-neon-cyan/20 rounded-full animate-glow-pulse" />
          <img 
            src="/sunny-avatar.png" 
            alt="Sunny" 
            className="w-48 h-48 rounded-full border-4 border-neon-cyan/50 shadow-[0_0_50px_rgba(0,255,255,0.3)] object-cover relative z-10"
            onError={(e) => {
              // Fallback if image not found
              (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Sunny+KIET&background=0a0a0a&color=00ffff&size=256';
            }}
          />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold font-display mb-4 tracking-wider"
        >
          HI, I'M <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple text-glow-blue">SUNNY</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-3xl text-gray-400 font-light tracking-[0.2em] mb-8"
        >
          AI/ML ENGINEERING STUDENT @ KIET
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-2xl text-gray-400 mb-12 text-lg leading-relaxed"
        >
          Building the future through Neural Networks, Cybersecurity, and Data Structures. 
          Floating in the space between code and reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <a href="#projects" className="px-8 py-4 glassmorphism-dark border-neon-cyan text-neon-cyan font-bold tracking-widest hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all rounded-sm uppercase">
            Initialize Projects
          </a>
          <a href="#contact" className="px-8 py-4 border border-neon-purple text-neon-purple font-bold tracking-widest hover:bg-neon-purple/10 hover:shadow-[0_0_20px_rgba(176,38,255,0.3)] transition-all rounded-sm uppercase">
            Establish Link
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-10 animate-bounce"
        >
          <ChevronDown className="w-10 h-10 text-neon-cyan/50" />
        </motion.div>
      </div>
    </section>
  );
};
