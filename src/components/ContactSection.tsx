import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
            05. ESTABLISH_LINK
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mt-4 shadow-[0_0_15px_#00ffff]" />
          <p className="mt-6 text-gray-400 max-w-2xl text-lg">
            Ready to build the future? Transmit a message to my secure server.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glassmorphism p-8 rounded-xl border-l-4 border-l-neon-cyan">
              <h3 className="text-2xl font-bold text-white mb-6">Comm_Channels</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-neon-cyan/10 flex items-center justify-center text-neon-cyan border border-neon-cyan/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-mono">Email.Protocol</p>
                    <a href="mailto:sunny6ara@gmail.com" className="text-white hover:text-neon-cyan transition-colors text-lg">sunny6ara@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-neon-purple/10 flex items-center justify-center text-neon-purple border border-neon-purple/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-mono">Voice.Transmission</p>
                    <a href="tel:+917654790930" className="text-white hover:text-neon-purple transition-colors text-lg">+91 7654790930</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-mono">Location.Coordinates</p>
                    <p className="text-white text-lg">KIET Group of Institutions, Ghaziabad</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex space-x-4">
                <a href="https://github.com/Sunny6ara" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full glassmorphism flex items-center space-x-2 text-gray-300 hover:text-neon-cyan hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all font-mono text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/sunny-kumar-52789232a/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full glassmorphism flex items-center space-x-2 text-gray-300 hover:text-neon-purple hover:border-neon-purple hover:shadow-[0_0_15px_rgba(176,38,255,0.5)] transition-all font-mono text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form action="https://formsubmit.co/sunny6ara@gmail.com" method="POST" className="glassmorphism p-8 rounded-xl flex flex-col space-y-6">
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_subject" value="New Transmission from Sunny.AI Portfolio!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="relative group">
                <input 
                  type="text" 
                  name="name"
                  id="name"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all peer"
                  placeholder=" "
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-4 top-3 text-gray-400 transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-neon-cyan peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs font-mono"
                >
                  ENTITY_NAME
                </label>
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  name="email"
                  id="email"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:shadow-[0_0_10px_rgba(176,38,255,0.3)] transition-all peer"
                  placeholder=" "
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-4 top-3 text-gray-400 transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-neon-purple peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs font-mono"
                >
                  RETURN_ADDRESS
                </label>
              </div>

              <div className="relative group mt-6">
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all peer resize-none"
                  placeholder=" "
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-4 top-3 text-gray-400 transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-neon-cyan peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-xs font-mono"
                >
                  PAYLOAD_CONTENT
                </label>
              </div>

              <button 
                type="submit"
                className="w-full py-4 mt-4 bg-transparent border-2 border-neon-cyan text-neon-cyan font-bold tracking-widest rounded-lg hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>TRANSMIT</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
