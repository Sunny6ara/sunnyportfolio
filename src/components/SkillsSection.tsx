import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { category: 'AI & Machine Learning', items: ['Artificial Intelligence', 'Machine Learning', 'TensorFlow', 'PyTorch', 'NLP', 'OpenCV'] },
  { category: 'Cloud & Infrastructure', items: ['Cloud Computing', 'AWS Architecture', 'Docker', 'Linux'] },
  { category: 'Cybersecurity', items: ['Cybersecurity', 'Network Security', 'Penetration Testing', 'Cryptography'] },
  { category: 'Core & Algorithms', items: ['Data Structures & Algorithms', 'Python', 'C++', 'SQL'] },
  { category: 'Full Stack & Web', items: ['Full Stack Development', 'React.js', 'Node.js', 'Tailwind CSS', 'JavaScript/TypeScript'] },
  { category: 'Mindset & Innovation', items: ['Innovation & Startup Mindset', 'Problem Solving', 'System Design'] }
];

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-space-dark border-t border-b border-white/5">
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-right flex flex-col items-end"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-l from-neon-purple to-white">
            <span className="text-neon-purple">02.</span> NEURAL_CAPABILITIES
          </h2>
          <div className="w-24 h-1 bg-neon-purple mt-4 shadow-[0_0_10px_#b026ff]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glassmorphism p-8 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <h3 className="text-xl font-display font-bold text-white mb-6 tracking-wide group-hover:text-neon-cyan transition-colors">
                {skillGroup.category}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 text-sm bg-black/50 border border-white/10 rounded-full text-gray-300 group-hover:border-neon-cyan/30 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
