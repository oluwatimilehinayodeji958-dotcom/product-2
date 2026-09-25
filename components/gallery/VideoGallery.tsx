"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clock, Tag, Video } from "lucide-react";
import { galleryVideos as defaultVideos, GalleryVideo } from "@/lib/hooks/data/gallery";
import VideoModal from "./VideoModal";

interface VideoGalleryProps {
  videos?: GalleryVideo[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null);
  const displayVideos = videos || defaultVideos;

  if (displayVideos.length === 0) return null;

  return (
    <section className="w-full bg-slate-50 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/5 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-500 text-xs font-black uppercase tracking-[0.3em]">
              <Video className="w-3.5 h-3.5" />
              Video Archive
            </div>
            <h2 className="text-4xl font-black tracking-tight">
              Research{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-400">
                Videos
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">
              Watch documentaries, seminar recordings, outreach highlights, and lab tours from
              Eagle's Lab YouTube Channel.
            </p>
          </div>
          
          <a
            href="https://www.youtube.com/channel/UC9jI94TzJWnJmM5z7VhQJyQ"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-5 py-3.5 border border-red-500/30 bg-red-600/10 text-red-600 dark:text-red-400 dark:border-red-500/20 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-red-500/10 active:scale-95 self-start md:self-end"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.003 3.003 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.003 3.003 0 0 0 2.11-2.107c.502-1.89.502-5.837.502-5.837s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Eagle YouTube Channel
          </a>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => setActiveVideo(video)}
              className="group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-200 dark:bg-slate-800 mb-3">
                {video.thumbnail_url ? (
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-teal-500/20">
                    <Video className="w-10 h-10 text-indigo-400" />
                  </div>
                )}

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 text-indigo-600 fill-indigo-600 translate-x-0.5" />
                  </div>
                </div>

                {/* Duration badge */}
                {video.duration && (
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/70 text-white text-[10px] font-bold">
                    <Clock className="w-2.5 h-2.5" />
                    {video.duration}
                  </div>
                )}

                {/* Featured badge */}
                {video.featured && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black">
                    ★ Featured
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-wider">
                    <Tag className="w-2.5 h-2.5" />
                    {video.category}
                  </span>
                </div>
                <h3 className="text-sm font-black leading-snug line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {video.title}
                </h3>
                {video.event_date && (
                  <p className="text-slate-400 dark:text-slate-500 text-[11px]">
                    {new Date(video.event_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video modal */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  );
}
