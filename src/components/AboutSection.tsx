import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, ShieldAlert } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">
            <span className="text-neon-cyan">01.</span> CORE_DIRECTIVE
          </h2>
          <div className="w-24 h-1 bg-neon-cyan mt-4 shadow-[0_0_10px_#00ffff]" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-gray-300 text-lg leading-relaxed glassmorphism-dark p-8 border-l-4 border-l-neon-purple"
          >
            <p>
              I am <span className="text-white font-bold">Sunny</span>, an AI/ML engineering student at KIET Ghaziabad, operating at the intersection of machine intelligence and human ingenuity.
            </p>
            <p>
              My primary protocols involve synthesizing complex algorithms, training neural architectures, and fortifying digital perimeters. I believe in writing code that not only functions but evolves.
            </p>
            <p className="font-mono text-neon-cyan text-sm">
              &gt; STATUS: Seeking innovative startup environments.<br/>
              &gt; OBJECTIVE: Build systems that push the boundaries of reality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="glassmorphism p-6 flex flex-col items-center text-center hover:border-neon-cyan transition-colors group">
              <Cpu className="w-12 h-12 text-neon-cyan mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold mb-2">Machine Learning</h3>
              <p className="text-sm text-gray-400">TensorFlow, PyTorch, Neural Networks</p>
            </div>
            <div className="glassmorphism p-6 flex flex-col items-center text-center hover:border-neon-purple transition-colors group">
              <Code2 className="w-12 h-12 text-neon-purple mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold mb-2">Algorithmic Design</h3>
              <p className="text-sm text-gray-400">Data Structures, Competitive Coding</p>
            </div>
            <div className="glassmorphism p-6 flex flex-col items-center text-center hover:border-neon-cyan transition-colors group sm:col-span-2">
              <ShieldAlert className="w-12 h-12 text-neon-cyan mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-bold mb-2">Cybersecurity</h3>
              <p className="text-sm text-gray-400">Vulnerability Assessment, System Fortification</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
