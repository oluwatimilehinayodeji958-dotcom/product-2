"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Linkedin,
  Twitter,
  GraduationCap,
  Award,
  BookOpen,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { GradientCard } from "@/components/shared/GradientCard";
import { cn } from "@/lib/utils";
import { leadershipTeam, TeamMember } from "@/lib/data/team";

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <StaggerItem>
      <GradientCard
        glowOnHover
        className="group h-full"
        delay={index * 0.1}
      >
        <div className="p-6 md:p-8 h-full flex flex-col">
          {/* Avatar & Info */}
          <div className="flex items-start gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-eagle-green to-eagle-green-dark flex items-center justify-center text-white text-2xl font-bold shadow-glow-green">
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
              {member.isLeadership && (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-eagle-gold flex items-center justify-center">
                  <Award className="w-3.5 h-3.5 text-eagle-slate" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-eagle-slate dark:text-white group-hover:text-eagle-green dark:group-hover:text-eagle-green-light transition-colors">
                {member.name}
              </h3>
              <p className="text-sm text-eagle-green dark:text-eagle-green-light font-medium mb-1">
                {member.role}
              </p>
              <p className="text-xs text-eagle-gray-500 dark:text-eagle-gray-400">
                {member.department}
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-eagle-gray-600 dark:text-eagle-gray-400 leading-relaxed mb-6 flex-grow line-clamp-4">
            {member.bio}
          </p>

          {/* Research Interests */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {member.researchInterests.slice(0, 3).map((interest) => (
                <span
                  key={interest}
                  className="px-2.5 py-1 rounded-md bg-eagle-gray-100 dark:bg-eagle-gray-800 text-xs text-eagle-gray-600 dark:text-eagle-gray-400"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-6 text-sm border-t border-eagle-gray-100 dark:border-eagle-gray-700 pt-4">
            <div className="flex items-center gap-1.5 text-eagle-gray-500 dark:text-eagle-gray-400">
              <BookOpen className="w-4 h-4 text-eagle-green dark:text-eagle-green-light" />
              <span className="font-semibold text-eagle-slate dark:text-white">{member.publications}</span>
              <span>pubs</span>
            </div>
            <div className="flex items-center gap-1.5 text-eagle-gray-500 dark:text-eagle-gray-400">
              <GraduationCap className="w-4 h-4 text-eagle-gold" />
              <span>h-index: <span className="font-semibold text-eagle-slate dark:text-white">{member.hIndex}</span></span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {member.socialLinks.googleScholar && (
              <a
                href={member.socialLinks.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-eagle-green/10 text-eagle-gray-400 hover:text-eagle-green dark:hover:text-eagle-green-light transition-colors"
                aria-label="Google Scholar"
              >
                <BookOpen className="w-4 h-4" />
              </a>
            )}
            {member.socialLinks.linkedin && (
              <a
                href={member.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-eagle-green/10 text-eagle-gray-400 hover:text-eagle-green dark:hover:text-eagle-green-light transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {member.socialLinks.twitter && (
              <a
                href={member.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-eagle-green/10 text-eagle-gray-400 hover:text-eagle-green dark:hover:text-eagle-green-light transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${member.email}`}
              className="p-2 rounded-lg hover:bg-eagle-green/10 text-eagle-gray-400 hover:text-eagle-green dark:hover:text-eagle-green-light transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </GradientCard>
    </StaggerItem>
  );
}

export function Team() {
  return (
    <section className="section-padding bg-eagle-cream dark:bg-eagle-slate relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-eagle-green/20 to-transparent" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-eagle-gold/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionHeader
          subtitle="Our People"
          title="Leadership Team"
          description="Meet the visionary scientists and researchers driving innovation at Eagle's Lab."
          align="center"
          className="mx-auto mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.15}>
          {leadershipTeam.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </StaggerContainer>

        {/* Team CTA */}
        <ScrollReveal className="text-center mt-12">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-8 py-4 bg-eagle-slate dark:bg-white text-white dark:text-eagle-slate font-semibold rounded-xl hover:bg-eagle-green dark:hover:bg-eagle-green-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Meet the Full Team
            <ArrowRight className="w-5 h-5" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}