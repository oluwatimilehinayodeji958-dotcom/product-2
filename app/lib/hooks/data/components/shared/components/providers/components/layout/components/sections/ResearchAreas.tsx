"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Lightbulb,
  Database,
  Dna,
  Baby,
  Network,
  ArrowRight,
  FlaskConical,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { GradientCard } from "@/components/shared/GradientCard";
import { cn } from "@/lib/utils";
import { researchAreas } from "@/data/research";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Lightbulb,
  Database,
  Dna,
  Baby,
  Network,
};

export function ResearchAreas() {
  return (
    <section className="section-padding bg-white dark:bg-eagle-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-eagle-green/20 to-transparent" />
      <div className="absolute top-40 -left-40 w-80 h-80 bg-eagle-green/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionHeader
          subtitle="Research Excellence"
          title="Our Research Areas"
          description="Six interconnected research programs spanning from molecular mechanisms to brain-computer interfaces, united by a common goal: understanding and healing the brain."
          align="center"
          className="mx-auto mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.1}>
          {researchAreas.map((area, index) => {
            const Icon = iconMap[area.icon] || FlaskConical;
            
            return (
              <StaggerItem key={area.id}>
                <GradientCard
                  glowOnHover
                  className="h-full group"
                  delay={index * 0.1}
                >
                  <Link href={`/research#${area.id}`} className="block h-full p-6 md:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={cn(
                        "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110",
                        area.color
                      )}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold text-eagle-gray-400 dark:text-eagle-gray-500 uppercase tracking-wider">
                        {area.shortTitle}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-eagle-slate dark:text-white mb-3 group-hover:text-eagle-green dark:group-hover:text-eagle-green-light transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-eagle-gray-600 dark:text-eagle-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {area.description}
                    </p>

                    {/* Stats & Tags */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <span className="text-eagle-gray-500 dark:text-eagle-gray-400">
                        <span className="font-semibold text-eagle-slate dark:text-white">{area.publications}</span> publications
                      </span>
                      <span className="text-eagle-gray-300 dark:text-eagle-gray-600">|</span>
                      <span className="text-eagle-gray-500 dark:text-eagle-gray-400">
                        <span className="font-semibold text-eagle-slate dark:text-white">{area.projects.length}</span> projects
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {area.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-eagle-gray-100 dark:bg-eagle-gray-800 text-xs text-eagle-gray-600 dark:text-eagle-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    <div className="flex items-center gap-2 text-eagle-green dark:text-eagle-green-light font-medium text-sm group/link">
                      <span>Explore Research</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </GradientCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Bottom CTA */}
        <ScrollReveal className="text-center mt-12">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 px-8 py-4 bg-eagle-slate dark:bg-white text-white dark:text-eagle-slate font-semibold rounded-xl hover:bg-eagle-green dark:hover:bg-eagle-green-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            View All Research Areas
            <ArrowRight className="w-5 h-5" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}