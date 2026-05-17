import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code, GitMerge, Award } from 'lucide-react';

const experiences = [
  {
    title: "Hackathon Winner",
    organization: "Smart India Hackathon",
    date: "2025",
    description: "Developed an AI-driven predictive modeling system for urban traffic optimization. Placed 1st out of 500+ teams.",
    icon: <Trophy className="w-6 h-6" />
  },
  {
    title: "Open Source Contributor",
    organization: "TensorFlow & PyTorch",
    date: "2024 - Present",
    description: "Contributed to core documentation and optimized data loading pipelines in the vision modules.",
    icon: <GitMerge className="w-6 h-6" />
  },
  {
    title: "Competitive Programmer",
    organization: "Codeforces / LeetCode",
    date: "2023 - Present",
    description: "Knight on LeetCode (Max Rating: 2100+). Solved over 1000+ algorithmic problems focusing on Graph Theory and DP.",
    icon: <Code className="w-6 h-6" />
  },
  {
    title: "Cyber Security Trainee",
    organization: "KIET Cybersecurity Club",
    date: "2023",
    description: "Conducted vulnerability assessments on university servers. Led a workshop on ethical hacking and network security.",
    icon: <Award className="w-6 h-6" />
  }
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-space-dark border-t border-b border-white/5">
      <div className="absolute left-0 top-1/2 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">
            04. TIMELINE_LOGS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan mt-4 shadow-[0_0_15px_#b026ff]" />
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-space-black border-2 border-neon-cyan flex items-center justify-center -translate-x-1/2 shadow-[0_0_15px_rgba(0,255,255,0.5)] z-10">
                  <div className="text-neon-cyan w-5 h-5 flex items-center justify-center">
                    {exp.icon}
                  </div>
                </div>

                <div className="ml-16 md:ml-0 md:w-1/2 p-4 w-full">
                  <div className={`glassmorphism p-6 rounded-xl border-l-4 ${index % 2 === 0 ? 'md:border-l-0 md:border-r-4 border-neon-purple' : 'border-neon-cyan'} hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] transition-all`}>
                    <span className="text-xs font-mono text-neon-cyan mb-2 block">{exp.date}</span>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                    <h4 className="text-sm font-display text-gray-400 mb-4">{exp.organization}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
