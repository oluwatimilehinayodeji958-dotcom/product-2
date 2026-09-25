"use client";
import { motion } from "framer-motion";
import { Images, Video, Grid3X3 } from "lucide-react";
import { galleryImages, galleryVideos, galleryCategories } from "@/lib/hooks/data/gallery";

export default function GalleryHero() {
  const stats = [
    { label: "Images", value: galleryImages.length, icon: <Images className="w-4 h-4" /> },
    { label: "Videos", value: galleryVideos.length, icon: <Video className="w-4 h-4" /> },
    { label: "Categories", value: galleryCategories.length - 1, icon: <Grid3X3 className="w-4 h-4" /> },
  ];

  return (
    <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/gallerypage.png"
          alt="Laboratory background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-indigo-950/85 to-slate-900/90" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-black tracking-[0.3em] uppercase mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
          </span>
          Visual Archive
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tight text-white mb-6"
        >
          Our{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-teal-300 to-indigo-500">
            Gallery
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Explore moments from our research journey, laboratory activities, conferences, outreach
          programs, scientific collaborations, and achievements.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center justify-center gap-8 mt-12"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-indigo-300 text-xs font-bold uppercase tracking-widest">
                {s.icon}
                {s.label}
              </div>
              <div className="text-3xl font-black text-white">{s.value}+</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
