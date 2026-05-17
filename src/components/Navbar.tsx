import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Play', href: '#play' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-4 glassmorphism-dark' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="text-neon-cyan w-8 h-8" />
          <span className="font-display font-bold text-xl tracking-widest text-white">
            SUNNY<span className="text-neon-cyan">.AI</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              whileHover={{ scale: 1.1, color: '#00ffff' }}
              className="text-gray-300 font-medium text-sm uppercase tracking-wider transition-colors hover:text-glow-blue"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 243, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full border border-neon-cyan text-neon-cyan font-bold text-sm tracking-wide hover:bg-neon-cyan hover:text-black transition-all duration-300"
          >
            RESUME
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glassmorphism-dark border-t border-white/10 mt-4 px-6 py-4"
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-neon-cyan font-medium text-lg uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            <button className="px-6 py-3 mt-4 rounded-full border border-neon-cyan text-neon-cyan font-bold hover:bg-neon-cyan hover:text-black transition-all">
              RESUME
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
