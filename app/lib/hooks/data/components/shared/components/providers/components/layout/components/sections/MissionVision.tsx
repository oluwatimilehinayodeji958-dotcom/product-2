"use client";

import { motion } from "framer-motion";
import { Target, Eye, Lightbulb, Heart, Globe, Award } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { GlassCard } from "@/components/shared/GradientCard";
import { cn } from "@/lib/utils";

const missionPoints = [
  {
    icon: Target,
    title: "Scientific Excellence",
    description: "Pushing the boundaries of neuroscience through rigorous, innovative research that meets the highest standards of scientific integrity.",
  },
  {
    icon: Heart,
    title: "Patient-Centered Impact",
    description: "Translating discoveries into tangible benefits for patients suffering from neurological and psychiatric disorders.",
  },
  {
    icon: Globe,
    title: "Global Collaboration",
    description: "Building international partnerships to accelerate brain science and share knowledge across borders and disciplines.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Discovery",
    description: "Fostering a culture of curiosity and creativity that drives breakthrough discoveries in understanding the brain.",
  },
];

const values = [
  { icon: Award, label: "Integrity", description: "Unwavering commitment to ethical research practices" },
  { icon: Heart, label: "Compassion", description: "Research driven by care for human wellbeing" },
  { icon: Globe, label: "Inclusivity", description: "Diverse perspectives strengthening our science" },
  { icon: Lightbulb, label: "Innovation", description: "Embracing novel approaches and technologies" },
];

export function MissionVision() {
  return (
    <section className="section-padding bg-eagle-cream dark:bg-eagle-slate relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-eagle-green/5 to-transparent dark:from-eagle-green/10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-eagle-gold/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Mission Section */}
        <div className="mb-24">
          <SectionHeader
            subtitle="Our Purpose"
            title="Mission & Vision"
            description="Eagle's Lab is dedicated to unraveling the mysteries of the brain and translating discoveries into therapies that improve lives."
            align="center"
            className="mx-auto mb-16"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Mission statement */}
            <ScrollReveal direction="left" className="space-y-8">
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-eagle-green to-eagle-gold rounded-full" />
                <blockquote className="pl-8">
                  <p className="text-2xl md:text-3xl font-display font-medium text-eagle-slate dark:text-white leading-relaxed italic">
                    "To advance the understanding of the brain and nervous system through 
                    innovative research, foster the next generation of neuroscientists, and 
                    translate discoveries into treatments that transform lives."
                  </p>
                  <footer className="mt-4 text-eagle-green dark:text-eagle-green-light font-medium">
                    — Eagle's Lab Mission Statement
                  </footer>
                </blockquote>
              </div>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.1}>
                {missionPoints.map((point) => (
                  <StaggerItem key={point.title}>
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-eagle-gray-800 transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-eagle-green/10 dark:bg-eagle-green/20 flex items-center justify-center text-eagle-green dark:text-eagle-green-light flex-shrink-0 group-hover:bg-eagle-green group-hover:text-white transition-all">
                        <point.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-eagle-slate dark:text-white mb-1">
                          {point.title}
                        </h4>
                        <p className="text-sm text-eagle-gray-600 dark:text-eagle-gray-400 leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </ScrollReveal>

            {/* Right: Vision card */}
            <ScrollReveal direction="right" delay={0.2}>
              <GlassCard intensity="strong" className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-eagle-green to-eagle-green-dark flex items-center justify-center text-white shadow-glow-green">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-eagle-slate dark:text-white">
                    Our Vision
                  </h3>
                </div>

                <p className="text-lg text-eagle-gray-700 dark:text-eagle-gray-300 leading-relaxed mb-8">
                  By 2030, Eagle's Lab will be recognized globally as a leading center for 
                  neuroscience research, having developed breakthrough therapies for 
                  neurodegenerative diseases, advanced brain-computer interfaces for 
                  clinical use, and trained the next generation of diverse neuroscience 
                  leaders.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-eagle-green/10 dark:bg-eagle-green/20 flex items-center justify-center text-eagle-green dark:text-eagle-green-light text-sm font-bold">
                      1
                    </div>
                    <span className="text-eagle-gray-700 dark:text-eagle-gray-300">
                      Pioneer 5 FDA-approved neurological therapies
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-eagle-green/10 dark:bg-eagle-green/20 flex items-center justify-center text-eagle-green dark:text-eagle-green-light text-sm font-bold">
                      2
                    </div>
                    <span className="text-eagle-gray-700 dark:text-eagle-gray-300">
                      Deploy BCI technology to 10,000+ patients worldwide
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-eagle-green/10 dark:bg-eagle-green/20 flex items-center justify-center text-eagle-green dark:text-eagle-green-light text-sm font-bold">
                      3
                    </div>
                    <span className="text-eagle-gray-700 dark:text-eagle-gray-300">
                      Graduate 100+ Ph.D. neuroscientists from underrepresented groups
                    </span>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>

        {/* Core Values */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-eagle-slate dark:text-white mb-4">
              Core Values
            </h3>
            <p className="text-eagle-gray-600 dark:text-eagle-gray-400 max-w-2xl mx-auto">
              The principles that guide every aspect of our research, collaboration, and community engagement.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.1}>
          {values.map((value) => (
            <StaggerItem key={value.label}>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-eagle-gray-800 border border-eagle-gray-100 dark:border-eagle-gray-700 hover:border-eagle-green/30 dark:hover:border-eagle-green/30 transition-all hover:shadow-card"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-eagle-green/10 to-eagle-gold/10 dark:from-eagle-green/20 dark:to-eagle-gold/20 flex items-center justify-center text-eagle-green dark:text-eagle-green-light mb-4">
                  <value.icon className="w-7 h-7" />
                </div>
                <h4 className="font-semibold text-eagle-slate dark:text-white mb-2">
                  {value.label}
                </h4>
                <p className="text-sm text-eagle-gray-600 dark:text-eagle-gray-400">
                  {value.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}