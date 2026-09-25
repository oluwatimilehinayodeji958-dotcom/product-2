"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Research", href: "/research" },
    { name: "Publication", href: "/publications" },
    { name: "Event", href: "/events" },
    { name: "Team", href: "/team" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <nav 
        className="fixed top-0 w-full z-[100] h-20 flex items-center bg-white border-b border-slate-200"
      >
        {/* We use a relative container and absolute centering for the links to guarantee they are in the middle of the viewport */}
        <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-8 relative">
          
          {/* Left: Logo & Brand */}
          <div className="flex items-center gap-4 z-10">
            <a href="https://lautechneuro.org.ng/" target="_blank" rel="noopener noreferrer" className="shrink-0 transition-transform hover:scale-105 active:scale-95">
              <img 
                src="/lng-logo.png" 
                alt="LNG Logo" 
                className="h-16 w-auto object-contain"
              />
            </a>
            <a href="/" className="flex flex-col group">
              <div className="text-2xl font-black tracking-tighter leading-none text-slate-950 uppercase">
                EAGLE'S <span className="text-indigo-600">LAB</span>
              </div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
                Neuroscience Group
              </div>
            </a>
          </div>

          {/* Center: Navigation Links (Absolutely Centered) */}
          <div className="hidden lg:flex absolute left-[55%] -translate-x-1/2 top-[55%] -translate-y-1/2 items-center gap-7">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-indigo-600 transition-colors relative group py-2 whitespace-nowrap"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right: Action Button */}
          <div className="flex items-center gap-6 z-10">
            <a 
              href="/join" 
              className="hidden lg:block px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              Join Us
            </a>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-2 text-slate-950 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>
      <div className="h-20" aria-hidden="true" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[110] bg-white flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
              <div className="flex items-center gap-3">
                <img src="/lng-logo.png" alt="Logo" className="h-12 w-auto" />
                <div className="text-2xl font-black tracking-tighter text-slate-950 uppercase">
                  EAGLE'S <span className="text-indigo-600">LAB</span>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-950">
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-4xl font-black tracking-tighter text-slate-950 hover:text-indigo-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="/join" 
                className="mt-10 px-10 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-center text-xl shadow-xl shadow-indigo-500/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join the Lab
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
