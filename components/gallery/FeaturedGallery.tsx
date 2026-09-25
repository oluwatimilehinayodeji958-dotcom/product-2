"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronRight, Eye } from "lucide-react";
import { getFeaturedGalleryImages, GalleryImage } from "@/lib/hooks/data/gallery";
import GalleryLightbox from "./GalleryLightbox";

interface FeaturedGalleryProps {
  images?: GalleryImage[];
}

export default function FeaturedGallery({ images }: FeaturedGalleryProps) {
  const featured = images 
    ? images.filter(img => img.featured).sort((a, b) => a.display_order - b.display_order)
    : getFeaturedGalleryImages();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (featured.length === 0) return null;

  const handlePrev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const handleNext = () =>
    setLightboxIndex((i) => (i !== null && i < featured.length - 1 ? i + 1 : i));

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      {/* Section header */}
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-500 text-xs font-black uppercase tracking-[0.3em]">
            <Star className="w-3.5 h-3.5 fill-amber-500" />
            Featured Moments
          </div>
          <h2 className="text-4xl font-black tracking-tight">
            Highlighted{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-400">
              Gallery
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">
            Curated highlights from our most impactful research activities, events, and milestones.
          </p>
        </div>
      </div>

      {/* Featured grid — hero + side tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Large hero card */}
        {featured[0] && (
          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={() => setLightboxIndex(0)}
            className="lg:col-span-2 relative rounded-3xl overflow-hidden cursor-pointer group aspect-[4/3]"
          >
            <img
              src={featured[0].image_url || featured[0].src || ""}
              alt={featured[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block mb-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider">
                ★ Featured
              </span>
              <h3 className="text-white text-2xl font-black mb-1">{featured[0].title}</h3>
              <p className="text-white/70 text-sm line-clamp-2">{featured[0].caption}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Side cards */}
        <div className="flex flex-col gap-4">
          {featured.slice(1, 3).map((img, i) => (
            <motion.div
              key={img.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setLightboxIndex(i + 1)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group flex-1 min-h-[160px]"
            >
              <img
                src={img.image_url || img.src || ""}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-sm font-black line-clamp-1">{img.title}</h3>
                <p className="text-white/60 text-xs mt-0.5 line-clamp-1">{img.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      {featured.length > 3 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {featured.slice(3, 7).map((img, i) => (
            <motion.div
              key={img.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => setLightboxIndex(i + 3)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-square"
            >
              <img
                src={img.image_url || img.src || ""}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                <p className="text-white text-xs font-black line-clamp-1">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={featured}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}
