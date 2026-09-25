"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  FlaskConical,
  Award,
  Globe,
  GraduationCap,
  Microscope,
  Handshake,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { AnimatedCounter, StatsGrid } from "@/components/shared/AnimatedCounter";
import { cn } from "@/lib/utils";

const stats = [
  {
    value: 147,
    label: "Publications",
    prefix: "",
    suffix: "",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    value: 25,
    label: "Active Projects",
    prefix: "",
    suffix: "+",
    icon: <FlaskConical className="w-6 h-6" />,
  },
  {
    value: 42,
    label: "Team Members",
    prefix: "",
    suffix: "",
    icon: <Users className="w-6 h-6" />,
  },
  {
    value: 45,
    label: "Million in Funding",
    prefix: "$",
    suffix: "M",
    icon: <Microscope className="w-6 h-6" />,
  },
];

const achievements = [
  {
    icon: Award,
    value: "12",
    label: "Major Awards",
    description: "Including Nobel Prize and Breakthrough Prize",
  },
  {
    icon: Globe,
    value: "30",
    label: "Countries",
    suffix: "+",
    description: "International collaborators and partners",
  },
  {
    icon: GraduationCap,
    value: "85",
    label: "Ph.D. Graduates",
    description: "Trained the next generation of neuroscientists",
  },
  {
    icon: Handshake,
    value: "28",
    label: "Partnerships",
    description: "Industry and academic collaborations",
  },
];

export function Stats() {
  return (
    <section className="section-padding bg-gradient-to-br from-eagle-green-dark via-eagle-green to-eagle-slate relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,162,39,0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(11,107,58,0.2)_0%,_transparent_50%)]" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-eagle-gold/10 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container-custom relative z-10">
        <SectionHeader
          subtitle="Our Impact"
          title="By The Numbers"
          description="A decade of groundbreaking research, innovation, and scientific excellence."
          align="center"
          className="mx-auto mb-16"
          titleClassName="text-white"
          subtitleClassName="text-eagle-gold"
          descriptionClassName="text-white/70"
          dividerColor="from-eagle-gold to-amber-300"
        />

        {/* Main stats grid */}
        <StatsGrid stats={stats} columns={4} className="mb-20" />

        {/* Achievement cards */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className="relative p-6 md:p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-eagle-gold/20 flex items-center justify-center text-eagle-gold mb-4 group-hover:scale-110 transition-transform">
                    <achievement.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl md:text-4xl font-bold text-white">
                      {achievement.value}
                    </span>
                    {achievement.suffix && (
                      <span className="text-xl font-bold text-eagle-gold">{achievement.suffix}</span>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">{achievement.label}</h4>
                  <p className="text-sm text-white/60">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Bottom quote */}
        <ScrollReveal className="mt-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-eagle-gold to-amber-300 mb-6">
              <div className="w-12 h-12 rounded-full bg-eagle-slate flex items-center justify-center">
                <Award className="w-6 h-6 text-eagle-gold" />
              </div>
            </div>
            <blockquote className="text-xl md:text-2xl text-white/90 font-display italic leading-relaxed mb-4">
              "The brain is the most complex structure in the known universe. Understanding it 
              is not just a scientific challenge—it's a moral imperative for improving human life."
            </blockquote>
            <cite className="text-eagle-gold font-medium not-italic">
              — Dr. Jonathan Eagle, Principal Investigator
            </cite>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}