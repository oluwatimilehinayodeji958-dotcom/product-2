"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Sun,
  Moon,
  Brain,
  ChevronDown,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollPosition, useScrollDirection } from "@/hooks/useScrollPosition";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    href: "/research",
    label: "Research",
    children: [
      { href: "/research", label: "All Research Areas" },
      { href: "/research#brain-computer-interfaces", label: "Brain-Computer Interfaces" },
      { href: "/research#cognitive-neuroscience", label: "Cognitive Neuroscience" },
      { href: "/research#neuroinformatics", label: "Neuroinformatics & AI" },
      { href: "/research#molecular-neurobiology", label: "Molecular Neurobiology" },
      { href: "/research#developmental-neuroscience", label: "Developmental Neuroscience" },
      { href: "/research#systems-neuroscience", label: "Systems Neuroscience" },
    ],
  },
  { href: "/team", label: "Team" },
  { href: "/publications", label: "Publications" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/join", label: "Join Us" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { y, isAtTop } = useScrollPosition();
  const scrollDirection = useScrollDirection(50);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isScrolled = y > 20;
  const isHidden = scrollDirection === "down" && y > 200 && !isMobileMenuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/80 dark:bg-eagle-slate/80 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        )}
      >
        {/* Progress bar */}
        {isScrolled && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-eagle-green to-eagle-gold"
            style={{ width: `${(y / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` }}
          />
        )}

        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                isScrolled
                  ? "bg-eagle-green text-white"
                  : "bg-white/20 text-white dark:bg-white/10 backdrop-blur-sm"
              )}>
                <Brain className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  "text-lg md:text-xl font-bold font-display tracking-tight transition-colors",
                  isScrolled
                    ? "text-eagle-slate dark:text-white"
                    : "text-white"
                )}>
                  Eagle's Lab
                </span>
                <span className={cn(
                  "text-[10px] md:text-xs font-medium tracking-widest uppercase transition-colors",
                  isScrolled
                    ? "text-eagle-gray-500 dark:text-eagle-gray-400"
                    : "text-white/70"
                )}>
                  Neuroscience Research
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1",
                      pathname === link.href || pathname.startsWith(link.href + "/")
                        ? "text-eagle-green dark:text-eagle-green-light bg-eagle-green/10 dark:bg-eagle-green/20"
                        : isScrolled
                        ? "text-eagle-gray-700 dark:text-eagle-gray-300 hover:text-eagle-green dark:hover:text-eagle-green-light hover:bg-eagle-green/5 dark:hover:bg-white/5"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        activeDropdown === link.href && "rotate-180"
                      )} />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-eagle-gray-800 rounded-xl shadow-xl border border-eagle-gray-100 dark:border-eagle-gray-700 overflow-hidden"
                      >
                        <div className="p-2">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "block px-4 py-2.5 rounded-lg text-sm transition-colors",
                                pathname === child.href
                                  ? "text-eagle-green dark:text-eagle-green-light bg-eagle-green/5 dark:bg-eagle-green/10"
                                  : "text-eagle-gray-700 dark:text-eagle-gray-300 hover:text-eagle-green dark:hover:text-eagle-green-light hover:bg-eagle-green/5 dark:hover:bg-white/5"
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <button
                className={cn(
                  "p-2 rounded-lg transition-colors hidden md:flex",
                  isScrolled
                    ? "text-eagle-gray-600 dark:text-eagle-gray-400 hover:text-eagle-green dark:hover:text-eagle-green-light hover:bg-eagle-green/5"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isScrolled
                      ? "text-eagle-gray-600 dark:text-eagle-gray-400 hover:text-eagle-green dark:hover:text-eagle-green-light hover:bg-eagle-green/5"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={theme}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === "dark" ? (
                        <Sun className="w-5 h-5" />
                      ) : (
                        <Moon className="w-5 h-5" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "lg:hidden p-2 rounded-lg transition-colors",
                  isScrolled
                    ? "text-eagle-gray-700 dark:text-eagle-gray-300 hover:text-eagle-green"
                    : "text-white hover:bg-white/10"
                )}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        pathname={pathname}
      />
    </>
  );
}