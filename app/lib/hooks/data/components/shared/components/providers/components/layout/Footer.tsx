"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const footerLinks = {
  research: [
    { label: "Brain-Computer Interfaces", href: "/research#brain-computer-interfaces" },
    { label: "Cognitive Neuroscience", href: "/research#cognitive-neuroscience" },
    { label: "Neuroinformatics", href: "/research#neuroinformatics" },
    { label: "Molecular Neurobiology", href: "/research#molecular-neurobiology" },
    { label: "Developmental Neuroscience", href: "/research#developmental-neuroscience" },
    { label: "Systems Neuroscience", href: "/research#systems-neuroscience" },
  ],
  about: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Publications", href: "/publications" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Join the Lab", href: "/join" },
  ],
  resources: [
    { label: "NeuroDataHub", href: "https://neurodatahub.org", external: true },
    { label: "Open Datasets", href: "/resources/datasets" },
    { label: "Software Tools", href: "/resources/software" },
    { label: "Educational Materials", href: "/resources/education" },
    { label: "Career Opportunities", href: "/join" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/eagleslab", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/eagleslab", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/eagleslab", label: "GitHub" },
  { icon: Youtube, href: "https://youtube.com/eagleslab", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative bg-eagle-slate dark:bg-black text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 grid-pattern" />
      </div>

      {/* Main footer */}
      <div className="relative container-custom pt-16 md:pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <ScrollReveal className="lg:col-span-4" direction="up" delay={0}>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-eagle-green flex items-center justify-center text-white">
                <Brain className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xl font-bold font-display">Eagle's Lab</span>
                <p className="text-xs text-eagle-gray-400 tracking-widest uppercase">
                  Neuroscience Research
                </p>
              </div>
            </Link>
            <p className="text-eagle-gray-400 leading-relaxed mb-6 max-w-sm">
              Advancing the frontiers of brain science through innovative research, 
              interdisciplinary collaboration, and a commitment to scientific excellence.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:info@eagleslab.edu"
                className="flex items-center gap-3 text-eagle-gray-400 hover:text-eagle-gold transition-colors group"
              >
                <Mail className="w-4 h-4" />
                <span>info@eagleslab.edu</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="tel:+15551234567"
                className="flex items-center gap-3 text-eagle-gray-400 hover:text-eagle-gold transition-colors group"
              >
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </a>
              <div className="flex items-start gap-3 text-eagle-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  1234 University Drive<br />
                  Science District, ST 12345<br />
                  United States
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Research links */}
          <ScrollReveal className="lg:col-span-2" direction="up" delay={0.1}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-eagle-gray-300 mb-4">
              Research
            </h3>
            <ul className="space-y-3">
              {footerLinks.research.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-eagle-gray-400 hover:text-eagle-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* About links */}
          <ScrollReveal className="lg:col-span-2" direction="up" delay={0.2}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-eagle-gray-300 mb-4">
              About
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-eagle-gray-400 hover:text-eagle-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Resources links */}
          <ScrollReveal className="lg:col-span-2" direction="up" delay={0.3}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-eagle-gray-300 mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-eagle-gray-400 hover:text-eagle-gold transition-colors text-sm inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Newsletter */}
          <ScrollReveal className="lg:col-span-2" direction="up" delay={0.4}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-eagle-gray-300 mb-4">
              Newsletter
            </h3>
            <p className="text-eagle-gray-400 text-sm mb-4">
              Stay updated with our latest research, events, and breakthroughs.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-eagle-gray-500 focus:outline-none focus:ring-2 focus:ring-eagle-green/50 text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-eagle-green hover:bg-eagle-green-dark text-white font-medium rounded-lg transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-eagle-gray-500">
            <span>© {new Date().getFullYear()} Eagle's Lab. All rights reserved.</span>
            <div className="hidden md:flex items-center gap-4">
              {footerLinks.legal.map((link, index) => (
                <span key={link.href} className="flex items-center gap-4">
                  {index > 0 && <span className="w-1 h-1 rounded-full bg-eagle-gray-600" />}
                  <Link
                    href={link.href}
                    className="hover:text-eagle-gray-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-eagle-gray-500 hover:text-eagle-gold hover:bg-white/5 transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}