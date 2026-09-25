"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap, Microscope, Heart, Globe, Cpu } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/utils";

const partners = [
  {
    name: "National Institutes of Health",
    type: "government",
    icon: Building2,
    description: "Primary funding partner supporting our core research programs in neuroscience and neural engineering.",
    since: "2010",
  },
  {
    name: "Stanford University",
    type: "academic",
    icon: GraduationCap,
    description: "Collaborative research partnership in brain-computer interfaces and neuroprosthetics development.",
    since: "2012",
  },
  {
    name: "MIT Media Lab",
    type: "academic",
    icon: Cpu,
    description: "Joint innovation lab focusing on next-generation neurotechnology and wearable brain sensors.",
    since: "2015",
  },
  {
    name: "Allen Institute",
    type: "nonprofit",
    icon: Microscope,
    description: "Data sharing and open science partnership advancing large-scale brain mapping initiatives.",
    since: "2016",
  },
  {
    name: "Howard Hughes Medical Institute",
    type: "nonprofit",
    icon: Heart,
    description: "Fellowship and research funding supporting early-career investigators and innovative projects.",
    since: "2014",
  },
  {
    name: "International Brain Initiative",
    type: "international",
    icon: Globe,
    description: "Global consortium coordinating neuroscience research across 20+ countries and institutions.",
    since: "2018",
  },
];

const typeColors = {
  government: "from-blue-500 to-blue-600",
  academic: "from-eagle-green to-eagle-green-dark",
  nonprofit: "from-eagle-gold to-amber-600",
  industry: "from-purple-500 to-purple-600",
  international: "from-cyan-500 to-teal-600",
};

export function Partners() {
  return (
    <section className="section-padding bg-eagle-cream dark:bg-eagle-slate relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-eagle-green/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-eagle-green/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionHeader
          subtitle="Collaboration"
          title="Research Partners"
          description="We collaborate with leading institutions worldwide to accelerate discoveries and maximize impact."
          align="center"
          className="mx-auto mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.1}>
          {partners.map((partner, index) => {
            const Icon = partner.icon;
            const colorClass = typeColors[partner.type as keyof typeof typeColors] || typeColors.academic;

            return (
              <StaggerItem key={partner.name}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative p-6 md:p-8 rounded-2xl bg-white dark:bg-eagle-gray-800 border border-eagle-gray-100 dark:border-eagle-gray-700 hover:border-eagle-green/30 dark:hover:border-eagle-green/30 transition-all duration-300 hover:shadow-card-hover"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg",
                      colorClass
                    )}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs text-eagle-gray-400 dark:text-eagle-gray-500 uppercase tracking-wider">
                      Since {partner.since}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-eagle-slate dark:text-white mb-2 group-hover:text-eagle-green dark:group-hover:text-eagle-green-light transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-eagle-gray-600 dark:text-eagle-gray-400 leading-relaxed mb-4">
                    {partner.description}
                  </p>

                  {/* Type badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-eagle-gray-100 dark:bg-eagle-gray-700 text-xs text-eagle-gray-600 dark:text-eagle-gray-400 capitalize">
                    {partner.type}
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Stats bar */}
        <ScrollReveal className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-gradient-to-r from-eagle-green-dark to-eagle-green text-white">
            {[
              { value: "28", label: "Active Partners" },
              { value: "15", label: "Countries" },
              { value: "$12M", label: "Joint Funding" },
              { value: "45", label: "Co-authored Papers" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <span className="block text-3xl md:text-4xl font-bold mb-1">{stat.value}</span>
                <span className="text-sm text-white/70">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}