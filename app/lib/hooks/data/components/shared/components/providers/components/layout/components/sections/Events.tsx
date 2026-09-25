"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Users,
  Ticket,
  Video,
  Mic2,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/ScrollReveal";
import { GradientCard, GlassCard } from "@/components/shared/GradientCard";
import { cn, formatDate } from "@/lib/utils";
import { getFeaturedEvents, getUpcomingEvents, Event } from "@/data/events";

const typeConfig = {
  conference: { icon: Video, color: "bg-blue-500", label: "Conference" },
  workshop: { icon: Mic2, color: "bg-eagle-green", label: "Workshop" },
  seminar: { icon: Mic2, color: "bg-purple-500", label: "Seminar" },
  symposium: { icon: Users, color: "bg-eagle-gold", label: "Symposium" },
  colloquium: { icon: Users, color: "bg-rose-500", label: "Colloquium" },
  training: { icon: Ticket, color: "bg-cyan-500", label: "Training" },
};

function EventCard({ event, index, featured = false }: { event: Event; index: number; featured?: boolean }) {
  const type = typeConfig[event.type];
  const TypeIcon = type.icon;

  if (featured) {
    return (
      <StaggerItem>
        <GradientCard
          glowOnHover
          className="group h-full"
          delay={index * 0.1}
        >
          <div className="relative h-full">
            {/* Image placeholder area */}
            <div className="h-48 bg-gradient-to-br from-eagle-green/20 to-eagle-gold/20 rounded-t-2xl flex items-center justify-center">
              <TypeIcon className="w-12 h-12 text-eagle-green/40" />
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className={cn("w-2 h-2 rounded-full", type.color)} />
                <span className="text-xs font-semibold uppercase tracking-wider text-eagle-gray-500 dark:text-eagle-gray-400">
                  {type.label}
                </span>
              </div>

              <h3 className="text-xl font-bold text-eagle-slate dark:text-white mb-3 group-hover:text-eagle-green dark:group-hover:text-eagle-green-light transition-colors line-clamp-2">
                {event.title}
              </h3>

              <p className="text-sm text-eagle-gray-600 dark:text-eagle-gray-400 leading-relaxed mb-6 line-clamp-2">
                {event.description}
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-eagle-gray-500 dark:text-eagle-gray-400">
                  <Calendar className="w-4 h-4 text-eagle-green dark:text-eagle-green-light" />
                  <span>{formatDate(event.date)}</span>
                  {event.endDate && ` - ${formatDate(event.endDate)}`}
                </div>
                <div className="flex items-center gap-2 text-sm text-eagle-gray-500 dark:text-eagle-gray-400">
                  <Clock className="w-4 h-4 text-eagle-green dark:text-eagle-green-light" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-eagle-gray-500 dark:text-eagle-gray-400">
                  <MapPin className="w-4 h-4 text-eagle-green dark:text-eagle-green-light" />
                  <span>{event.venue}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-eagle-gray-100 dark:border-eagle-gray-700">
                <div className="flex items-center gap-1.5 text-sm text-eagle-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{event.registered}/{event.capacity} registered</span>
                </div>
                <Link
                  href={`/events#${event.id}`}
                  className="inline-flex items-center gap-1 text-sm text-eagle-green dark:text-eagle-green-light font-medium group/link"
                >
                  Details
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </GradientCard>
      </StaggerItem>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group flex gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-eagle-gray-800 transition-colors"
    >
      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-eagle-green/10 to-eagle-gold/10 dark:from-eagle-green/20 dark:to-eagle-gold/20 flex flex-col items-center justify-center text-eagle-slate dark:text-white">
        <span className="text-lg font-bold">{new Date(event.date).getDate()}</span>
        <span className="text-[10px] uppercase tracking-wider">
          {new Date(event.date).toLocaleString("default", { month: "short" })}
        </span>
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={cn("w-1.5 h-1.5 rounded-full", type.color)} />
          <span className="text-xs text-eagle-gray-500 dark:text-eagle-gray-400 uppercase tracking-wider">
            {type.label}
          </span>
        </div>
        <h4 className="font-semibold text-eagle-slate dark:text-white mb-1 group-hover:text-eagle-green dark:group-hover:text-eagle-green-light transition-colors truncate">
          {event.title}
        </h4>
        <div className="flex items-center gap-3 text-xs text-eagle-gray-500 dark:text-eagle-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {event.time}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {event.location}
          </span>
        </div>
      </div>
      
      <Link
        href={`/events#${event.id}`}
        className="flex-shrink-0 self-center p-2 rounded-lg hover:bg-eagle-green/10 text-eagle-gray-400 hover:text-eagle-green dark:hover:text-eagle-green-light transition-colors"
      >
        <ArrowRight className="w-5 h-5" />
      </Link>
    </motion.div>
  );
}

export function Events() {
  const featuredEvents = getFeaturedEvents().slice(0, 2);
  const upcomingEvents = getUpcomingEvents().slice(0, 4);

  return (
    <section className="section-padding bg-white dark:bg-eagle-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-eagle-green/20 to-transparent" />
      <div className="absolute top-40 -left-40 w-80 h-80 bg-eagle-gold/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <SectionHeader
          subtitle="Upcoming"
          title="Events & Workshops"
          description="Join us for conferences, workshops, and seminars that advance the frontiers of neuroscience."
          align="center"
          className="mx-auto mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Featured events */}
          <div className="lg:col-span-2">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.15}>
              {featuredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} featured />
              ))}
            </StaggerContainer>
          </div>

          {/* Upcoming events list */}
          <ScrollReveal direction="right" className="lg:col-span-1">
            <GlassCard intensity="medium" className="h-full">
              <div className="p-6">
                <h3 className="text-lg font-bold text-eagle-slate dark:text-white mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-eagle-green dark:text-eagle-green-light" />
                  Upcoming Events
                </h3>
                <div className="space-y-2">
                  {upcomingEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-eagle-gray-100 dark:border-eagle-gray-700">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 text-sm text-eagle-green dark:text-eagle-green-light font-medium hover:underline"
                  >
                    View All Events
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}