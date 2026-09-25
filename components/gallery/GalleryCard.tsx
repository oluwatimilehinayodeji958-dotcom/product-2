"use client";
import { motion } from "framer-motion";
import { Eye, Calendar, Tag } from "lucide-react";
import { GalleryImage } from "@/lib/hooks/data/gallery";

interface GalleryCardProps {
  image: GalleryImage;
  onClick: () => void;
  index: number;
}

export default function GalleryCard({ image, onClick, index }: GalleryCardProps) {
  const src = image.image_url || image.src || "";
  const title = image.title;
  const caption = image.caption || image.description || "";
  const date = image.event_date
    ? new Date(image.event_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-slate-100 dark:bg-slate-800 break-inside-avoid mb-4"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={image.alt || title}
          loading="lazy"
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* View icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
            <Eye className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-600/90 text-white text-[10px] font-black uppercase tracking-wider">
            <Tag className="w-2.5 h-2.5" />
            {image.category}
          </span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
          <h3 className="text-white font-black text-sm leading-snug mb-1 line-clamp-2">{title}</h3>
          {caption && (
            <p className="text-white/70 text-xs leading-relaxed line-clamp-2">{caption}</p>
          )}
          {date && (
            <div className="flex items-center gap-1 mt-2 text-white/50 text-[10px]">
              <Calendar className="w-3 h-3" />
              {date}
            </div>
          )}
        </div>
      </div>

      {/* Featured badge */}
      {image.featured && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
            ★ Featured
          </span>
        </div>
      )}
    </motion.div>
  );
}
