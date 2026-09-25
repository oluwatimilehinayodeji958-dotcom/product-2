"use client";
import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, Tag, MapPin, User } from "lucide-react";
import { GalleryImage } from "@/lib/hooks/data/gallery";

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const image = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!image) return null;

  const src = image.image_url || image.src || "";
  const date = image.event_date
    ? new Date(image.event_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/95 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Main content — stop propagation so clicking image area doesn't close */}
        <div
          className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-10 text-white/60 text-sm font-bold">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Prev button */}
          <button
            onClick={onPrev}
            className="absolute left-2 md:left-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all disabled:opacity-30"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={onNext}
            className="absolute right-2 md:right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all disabled:opacity-30"
            disabled={currentIndex === images.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image + Info layout */}
          <div className="flex flex-col lg:flex-row items-center gap-6 max-w-6xl w-full max-h-full">
            {/* Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="flex-1 flex items-center justify-center"
            >
              <img
                src={src}
                alt={image.alt || image.title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />
            </motion.div>

            {/* Info panel */}
            <motion.div
              key={`info-${currentIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="w-full lg:w-72 shrink-0 space-y-4 text-white"
            >
              {/* Category */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-wider">
                <Tag className="w-3 h-3" />
                {image.category}
              </span>

              {/* Title */}
              <h2 className="text-2xl font-black leading-tight">{image.title}</h2>

              {/* Caption */}
              {(image.caption || image.description) && (
                <p className="text-white/70 text-sm leading-relaxed">
                  {image.caption || image.description}
                </p>
              )}

              {/* Meta */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                {date && (
                  <div className="flex items-center gap-2 text-white/50 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {date}
                  </div>
                )}
                {image.location && (
                  <div className="flex items-center gap-2 text-white/50 text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    {image.location}
                  </div>
                )}
                {image.photographer && (
                  <div className="flex items-center gap-2 text-white/50 text-xs">
                    <User className="w-3.5 h-3.5" />
                    Photo: {image.photographer}
                  </div>
                )}
              </div>

              {/* Tags */}
              {image.tags && image.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {image.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Keyboard hint */}
              <p className="text-white/25 text-[10px] pt-2">
                ← → Arrow keys to navigate · Esc to close
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
