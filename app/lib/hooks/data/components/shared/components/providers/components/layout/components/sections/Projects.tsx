"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Users,
  DollarSign,
  CheckCircle2,
  Clock,
  FlaskConical,
  Target,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GlassCard } from "@/components/shared/GradientCard";
import { cn } from "@/lib/utils";
import { getActiveProjects, ResearchProject } from "@/data/research";

const statusConfig = {
  active: {
    label: "Active",
    color: "bg-green-500",
    textColor: "text-green-700 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    icon: Clock,
  },
  completed: {
    label: "Completed",
    color: "bg-blue-500",
    textColor: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    icon: CheckCircle2,
  },
  planned: {
    label: "Planned",
    color: "bg-amber-500",
    textColor: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    icon: Target,
  },
};

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const activeProjects = getActiveProjects().slice(0, 4);

  return (
    <section className="section-padding bg-gradient-to-b from-eagle-cream to-white dark:from-eagle-gray-900 dark:to-eagle-slate relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-eagle-gold/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionHeader
          subtitle="Current Work"
          title="Ongoing Projects"
          description="Our active research initiatives pushing the boundaries of neuroscience and neural engineering."
          align="center"
          className="mx-auto mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {activeProjects.map((project, index) => {
            const status = statusConfig[project.status];
            const StatusIcon = status.icon;

            return (
              <ScrollReveal key={project.id} direction="up" delay={index * 0.15}>
                <GlassCard
                  intensity="medium"
                  className={cn(
                    "group relative overflow-hidden transition-all duration-300",
                    hoveredProject === project.id && "shadow-card-hover"
                  )}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
                        status.bgColor,
                        status.textColor
                      )}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", status.color)} />
                        {status.label}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-eagle-gray-500 dark:text-eagle-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(project.startDate).getFullYear()}
                        {project.endDate && ` - ${new Date(project.endDate).getFullYear()}`}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl md:text-2xl font-bold text-eagle-slate dark:text-white mb-3 group-hover:text-eagle-green dark:group-hover:text-eagle-green-light transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-eagle-gray-600 dark:text-eagle-gray-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-eagle-green dark:text-eagle-green-light" />
                        <span className="text-eagle-gray-700 dark:text-eagle-gray-300">
                          {project.funding}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-eagle-green dark:text-eagle-green-light" />
                        <span className="text-eagle-gray-700 dark:text-eagle-gray-300">
                          {project.team.length} researchers
                        </span>
                      </div>
                    </div>

                    {/* Team */}
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-xs text-eagle-gray-500 dark:text-eagle-gray-400 uppercase tracking-wider">
                        Lead:
                      </span>
                      <span className="text-sm font-medium text-eagle-slate dark:text-white">
                        {project.lead}
                      </span>
                    </div>

                    {/* Outcomes (if completed) */}
                    {project.outcomes && (
                      <div className="mb-6 p-4 rounded-lg bg-eagle-green/5 dark:bg-eagle-green/10 border border-eagle-green/10">
                        <h4 className="text-sm font-semibold text-eagle-green dark:text-eagle-green-light mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Key Outcomes
                        </h4>
                        <ul className="space-y-1">
                          {project.outcomes.map((outcome, i) => (
                            <li key={i} className="text-sm text-eagle-gray-600 dark:text-eagle-gray-400 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-eagle-gold mt-2 flex-shrink-0" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Link */}
                    <Link
                      href={`/research#${project.id}`}
                      className="inline-flex items-center gap-2 text-eagle-green dark:text-eagle-green-light font-medium text-sm group/link"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Progress bar for active projects */}
                  {project.status === "active" && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-eagle-gray-100 dark:bg-eagle-gray-800">
                      <motion.div
                        className="h-full bg-gradient-to-r from-eagle-green to-eagle-gold"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "65%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  )}
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom stats */}
        <ScrollReveal className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FlaskConical, value: "25+", label: "Active Projects" },
              { icon: DollarSign, value: "$45M", label: "Total Funding" },
              { icon: Users, value: "80+", label: "Researchers" },
              { icon: Target, value: "12", label: "Institutional Partners" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-eagle-gray-800 border border-eagle-gray-100 dark:border-eagle-gray-700"
              >
                <div className="w-12 h-12 rounded-xl bg-eagle-green/10 dark:bg-eagle-green/20 flex items-center justify-center text-eagle-green dark:text-eagle-green-light mb-3">
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-eagle-slate dark:text-white mb-1">
                  {stat.value}
                </span>
                <span className="text-sm text-eagle-gray-600 dark:text-eagle-gray-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}