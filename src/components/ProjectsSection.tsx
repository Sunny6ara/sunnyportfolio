import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code, ExternalLink, ShieldCheck, MessageSquareCode } from 'lucide-react';

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative h-full w-full rounded-xl cursor-crosshair perspective-1000"
    >
      <div 
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 opacity-0 transition-opacity duration-300 hover:opacity-100 blur-xl z-[-1]"
        style={{ transform: "translateZ(-50px)" }}
      />
      <div 
        className="h-full glassmorphism p-8 flex flex-col border border-white/10 hover:border-neon-cyan/50 transition-colors rounded-xl overflow-hidden"
        style={{ transform: "translateZ(50px)" }}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-neon-cyan/10 rounded-lg text-neon-cyan">
            {project.icon}
          </div>
          <div className="flex space-x-4">
            <a href={project.github} className="text-gray-400 hover:text-white transition-colors">
              <Code className="w-6 h-6" />
            </a>
            <a href={project.demo} className="text-gray-400 hover:text-neon-cyan transition-colors">
              <ExternalLink className="w-6 h-6" />
            </a>
          </div>
        </div>

        <h3 className="text-2xl font-display font-bold text-white mb-4">{project.title}</h3>
        <p className="text-gray-400 flex-grow text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((tech: string, i: number) => (
            <span key={i} className="text-xs font-mono text-neon-cyan bg-neon-cyan/10 px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const projects = [
  {
    title: "SpotFake AI",
    description: "An advanced Deepfake & AI Scam detection system utilizing ensemble learning models. Employs state-of-the-art vision transformers to analyze frame-by-frame anomalies in real-time.",
    tech: ["Python", "PyTorch", "OpenCV", "React"],
    github: "#",
    demo: "#",
    icon: <ShieldCheck className="w-8 h-8" />
  },
  {
    title: "NeuroChat AI",
    description: "A highly intelligent, context-aware chatbot designed for complex technical support. Built on a fine-tuned LLM architecture with custom vector embeddings for ultra-fast retrieval.",
    tech: ["TensorFlow", "LangChain", "Node.js", "Redis"],
    github: "#",
    demo: "#",
    icon: <MessageSquareCode className="w-8 h-8" />
  },
  {
    title: "CyberFortress",
    description: "An automated vulnerability assessment and fortification tool. Scans network typologies, identifies weak points, and suggests real-time patching protocols.",
    tech: ["Python", "Bash", "Docker", "GraphQL"],
    github: "#",
    demo: "#",
    icon: <ShieldCheck className="w-8 h-8" /> // Replace with a different icon if preferred, maybe Terminal or Lock
  }
];

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">
            <span className="text-neon-cyan">03.</span> EXECUTED_PROTOCOLS
          </h2>
          <div className="w-24 h-1 bg-neon-cyan mt-4 shadow-[0_0_10px_#00ffff]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 perspective-1000">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
