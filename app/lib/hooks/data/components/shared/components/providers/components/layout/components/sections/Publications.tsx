"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  ExternalLink,
  FileText,
  Quote,
  Star,
  TrendingUp,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { GradientCard } from "@/components/shared/GradientCard";
import { cn } from "@/lib/utils";
import { getFeaturedPublications, getRecentPublications, Publication } from "@/data/publications";

function PublicationCard({ publication, index }: { publication: Publication; index: number }) {
  return (
    <StaggerItem>
      <GradientCard
        glowOnHover
        className="group h-full"
        delay={index * 0.1}
      >
        <div className="p-6 md:p-8 h-full flex flex-col">
          {/* Journal badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-eagle-green/10 dark:bg-eagle-green/20 text-xs font-semibold text-eagle-green dark:text-eagle-green-light">
              <BookOpen className="w-3 h-3" />
              {publication.journal}
            </span>
            <span className="text-xs text-eagle-gray-400 dark:text-eagle-gray-500">
              {publication.year}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-eagle-slate dark:text-white mb-3 line-clamp-2 group-hover:text-eagle-green dark:group-hover:text-eagle-green-light transition-colors">
            {publication.title}
          </h3>

          {/* Authors */}
          <p className="text-sm text-eagle-gray-500 dark:text-eagle-gray-400 mb-4">
            {publication.authors.join(", ")}
          </p>

          {/* Abstract preview */}
          <p className="text-sm text-eagle-gray-600 dark:text-eagle-gray-400 leading-relaxed mb-6 line-clamp-3 flex-grow">
            {publication.abstract}
          </p>

          {/* Metrics */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1 text-eagle-gray-500 dark:text-eagle-gray-400">
              <TrendingUp className="w-4 h-4 text-eagle-gold" />
              <span className="font-semibold text-eagle-slate dark:text-white">{publication.citations}</span>
              <span>citations</span>
            </div>
            <div className="flex items-center gap-1 text-eagle-gray-500 dark:text-eagle-gray-400">
              <Star className="w-4 h-4 text-eagle-gold" />
              <span>IF: {publication.impactFactor}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-eagle-gray-100 dark:border-eagle-gray-700">
            {publication.pdfUrl && (
              <a
                href={publication.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-eagle-green dark:text-eagle-green-light hover:underline"
              >
                <FileText className="w-4 h-4" />
                PDF
              </a>
            )}
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-eagle-gray-500 dark:text-eagle-gray-400 hover:text-eagle-green dark:hover:text-eagle-green-light transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              DOI
            </a>
            {publication.codeUrl && (
              <a
                href={publication.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-eagle-gray-500 dark:text-eagle-gray-400 hover:text-eagle-green dark:hover:text-eagle-green-light transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Code
              </a>
            )}
          </div>
        </div>
      </GradientCard>
    </StaggerItem>
  );
}

export function Publications() {
  const featuredPubs = getFeaturedPublications().slice(0, 3);
  const recentPubs = getRecentPublications(2);

  return (
    <section className="section-padding bg-white dark:bg-eagle-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-eagle-green/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-eagle-green/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionHeader
          subtitle="Latest Discoveries"
          title="Featured Publications"
          description="Our most impactful research published in top-tier scientific journals, advancing the frontiers of neuroscience."
          align="center"
          className="mx-auto mb-16"
        />

        {/* Featured publications grid */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16" staggerDelay={0.15}>
          {featuredPubs.map((pub, index) => (
            <PublicationCard key={pub.id} publication={pub} index={index} />
          ))}
        </StaggerContainer>

        {/* Recent publications list */}
        <ScrollReveal>
          <div className="bg-gradient-to-br from-eagle-cream to-white dark:from-eagle-gray-800 dark:to-eagle-gray-900 rounded-2xl p-8 md:p-10 border border-eagle-gray-100 dark:border-eagle-gray-700">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-eagle-slate dark:text-white mb-1">
                  Recent Publications
                </h3>
                <p className="text-eagle-gray-500 dark:text-eagle-gray-400">
                  Our latest peer-reviewed research contributions
                </p>
              </div>
              <Link
                href="/publications"
                className="hidden md:inline-flex items-center gap-2 text-eagle-green dark:text-eagle-green-light font-medium hover:underline"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-6">
              {recentPubs.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col md:flex-row md:items-start gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-eagle-gray-800 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-eagle-green/10 dark:bg-eagle-green/20 flex items-center justify-center text-eagle-green dark:text-eagle-green-light">
                    <Quote className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-eagle-slate dark:text-white mb-1 group-hover:text-eagle-green dark:group-hover:text-eagle-green-light transition-colors">
                      {pub.title}
                    </h4>
                    <p className="text-sm text-eagle-gray-500 dark:text-eagle-gray-400 mb-2">
                      {pub.authors.join(", ")} • {pub.journal} • {pub.year}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-eagle-gray-400">
                        Citations: <span className="font-semibold text-eagle-slate dark:text-white">{pub.citations}</span>
                      </span>
                      <span className="text-eagle-gray-300">|</span>
                      <span className="text-eagle-gray-400">
                        IF: <span className="font-semibold text-eagle-slate dark:text-white">{pub.impactFactor}</span>
                      </span>
                    </div>
                  </div>
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 rounded-lg hover:bg-eagle-green/10 text-eagle-gray-400 hover:text-eagle-green transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-eagle-gray-100 dark:border-eagle-gray-700 md:hidden">
              <Link
                href="/publications"
                className="inline-flex items-center gap-2 text-eagle-green dark:text-eagle-green-light font-medium"
              >
                View All Publications
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Impact metrics */}
        <ScrollReveal className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Publications", value: "147" },
              { label: "Total Citations", value: "12,847" },
              { label: "h-Index", value: "62" },
              { label: "Avg. Impact Factor", value: "45.3" },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-eagle-green/5 dark:bg-eagle-green/10 border border-eagle-green/10"
              >
                <span className="block text-3xl md:text-4xl font-bold text-eagle-green dark:text-eagle-green-light mb-1">
                  {metric.value}
                </span>
                <span className="text-sm text-eagle-gray-600 dark:text-eagle-gray-400">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}